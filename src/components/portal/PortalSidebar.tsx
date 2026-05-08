"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  FileText,
  Camera,
  AlertTriangle,
  DollarSign,
  CheckSquare,
  FolderOpen,
  BarChart3,
  LogOut,
  ChevronRight,
  Home,
  Users,
  Settings,
  ClipboardList,
  Layers,
} from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface PortalSidebarProps {
  projectId?: string;
  isAdmin?: boolean;
}

export default function PortalSidebar({ projectId, isAdmin }: PortalSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const basePortalLinks: SidebarLink[] = isAdmin
    ? [
        { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: "All Projects", href: "/admin/projects", icon: <Home className="w-4 h-4" /> },
        { label: "Clients", href: "/admin/clients", icon: <Users className="w-4 h-4" /> },
        { label: "Report Builder", href: "/admin/report-builder", icon: <ClipboardList className="w-4 h-4" /> },
      ]
    : [
        { label: "My Projects", href: "/portal", icon: <LayoutDashboard className="w-4 h-4" /> },
      ];

  const projectLinks: SidebarLink[] = projectId
    ? [
        {
          label: "Overview",
          href: isAdmin ? `/admin/projects/${projectId}` : `/portal/project/${projectId}`,
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          label: "Weekly Reports",
          href: isAdmin ? `/admin/projects/${projectId}/reports` : `/portal/project/${projectId}/reports`,
          icon: <FileText className="w-4 h-4" />,
        },
        {
          label: "Material Board",
          href: isAdmin ? `/admin/projects/${projectId}/materials` : `/portal/project/${projectId}/materials`,
          icon: <Layers className="w-4 h-4" />,
        },
        {
          label: "Approvals",
          href: isAdmin ? `/admin/projects/${projectId}/approvals` : `/portal/project/${projectId}/approvals`,
          icon: <CheckSquare className="w-4 h-4" />,
        },
        {
          label: "Budget Tracker",
          href: isAdmin ? `/admin/projects/${projectId}/budget` : `/portal/project/${projectId}/budget`,
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          label: "Issue Tracker",
          href: isAdmin ? `/admin/projects/${projectId}/issues` : `/portal/project/${projectId}/issues`,
          icon: <AlertTriangle className="w-4 h-4" />,
        },
        {
          label: "Photo Log",
          href: isAdmin ? `/admin/projects/${projectId}/photos` : `/portal/project/${projectId}/photos`,
          icon: <Camera className="w-4 h-4" />,
        },
        {
          label: "Documents",
          href: isAdmin ? `/admin/projects/${projectId}/documents` : `/portal/project/${projectId}/documents`,
          icon: <FolderOpen className="w-4 h-4" />,
        },
        ...(isAdmin
          ? [
              {
                label: "Contractor Quotes",
                href: `/admin/projects/${projectId}/quotes`,
                icon: <BarChart3 className="w-4 h-4" />,
              },
            ]
          : []),
      ]
    : [];

  const isActive = (href: string) => {
    if (href === "/portal" || href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 bg-[#0B1F33] min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href={isAdmin ? "/admin" : "/portal"} className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/10 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">T</span>
          </div>
          <div>
            <span className="font-bold text-white text-xs">TECTA</span>
            <span className="text-[#2563FF] font-semibold text-xs ml-1">
              {isAdmin ? "Admin" : "Portal"}
            </span>
          </div>
        </Link>
      </div>

      {/* User */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#2563FF]/20 flex items-center justify-center text-[#2563FF] text-sm font-bold">
            {user?.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.name}</p>
            <p className="text-white/40 text-[10px] uppercase tracking-wider">
              {isAdmin ? "TECTA Admin" : "Property Owner"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Base links */}
        <div className="mb-4">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">
            {isAdmin ? "Management" : "Overview"}
          </p>
          <div className="space-y-0.5">
            {basePortalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive(link.href)
                    ? "bg-[#2563FF]/20 text-white"
                    : "text-white/55 hover:text-white hover:bg-white/8"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Project links */}
        {projectLinks.length > 0 && (
          <div>
            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">
              This Project
            </p>
            <div className="space-y-0.5">
              {projectLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                    isActive(link.href)
                      ? "bg-[#2563FF]/20 text-white"
                      : "text-white/55 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/8 transition-all"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-[#C64B4B] hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
