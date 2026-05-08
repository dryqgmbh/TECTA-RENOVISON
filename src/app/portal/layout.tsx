"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    if (!isLoading && user?.role === "admin") router.push("/admin");
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#EDE8E0] border-t-[#2563FF] rounded-full spin" />
      </div>
    );
  }

  return <>{children}</>;
}
