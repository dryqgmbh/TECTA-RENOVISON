"use client";

import PortalSidebar from "@/components/portal/PortalSidebar";
import { use } from "react";

export default function AdminProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="flex min-h-screen">
      <PortalSidebar projectId={id} isAdmin />
      <main className="flex-1 bg-[#FCFBF8] overflow-auto">{children}</main>
    </div>
  );
}
