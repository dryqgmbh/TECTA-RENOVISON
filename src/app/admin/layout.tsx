"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    if (!isLoading && user && user.role !== "admin") router.push("/portal");
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#EDE8E0] border-t-[#2563FF] rounded-full spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <PortalSidebar isAdmin />
      <main className="flex-1 bg-[#FCFBF8] overflow-auto">{children}</main>
    </div>
  );
}
