"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import PortalSidebar from "@/components/portal/PortalSidebar";
import {
  formatCurrency,
  getPhaseLabel,
  getBudgetStatusLabel,
  getTimelineStatusLabel,
} from "@/lib/utils";
import {
  MapPin,
  ChevronRight,
  Clock,
  TrendingUp,
  AlertCircle,
  FileText,
  CheckSquare,
} from "lucide-react";

function StatusChip({
  status,
  type,
}: {
  status: string;
  type: "budget" | "timeline";
}) {
  const colors = {
    budget: {
      on_budget: "bg-emerald-100 text-emerald-700",
      watch: "bg-amber-100 text-amber-700",
      over_budget: "bg-red-100 text-red-700",
    },
    timeline: {
      on_track: "bg-emerald-100 text-emerald-700",
      delayed: "bg-amber-100 text-amber-700",
      critical: "bg-red-100 text-red-700",
    },
  };

  const colorClass =
    type === "budget"
      ? colors.budget[status as keyof typeof colors.budget] || "bg-gray-100 text-gray-600"
      : colors.timeline[status as keyof typeof colors.timeline] || "bg-gray-100 text-gray-600";

  const label =
    type === "budget"
      ? getBudgetStatusLabel(status)
      : getTimelineStatusLabel(status);

  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
      {label}
    </span>
  );
}

export default function PortalDashboard() {
  const { user } = useAuth();
  const projects = MOCK_PROJECTS.filter((p) => p.client_id === user?.id);
  if (!user) return null;

  const pendingApprovals = 3;
  return (
    <div className="flex min-h-screen">
      <PortalSidebar />
      <PortalContent user={user} projects={projects} pendingApprovals={pendingApprovals} />
    </div>
  );
}

function PortalContent({ user, projects, pendingApprovals }: { user: import("@/lib/types").User; projects: import("@/lib/types").Project[]; pendingApprovals: number; }) {
  const openIssues = 4;
  const unreadReports = 1;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Owner Portal
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33] mb-1">
          Welcome, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-[#667085] text-sm">
          Manage your asset. From anywhere in the world.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          {
            label: "Active Projects",
            value: projects.length,
            icon: <TrendingUp className="w-4 h-4" />,
            color: "text-[#2563FF]",
            bg: "bg-[#EEF2FF]",
          },
          {
            label: "Pending Approvals",
            value: pendingApprovals,
            icon: <CheckSquare className="w-4 h-4" />,
            color: "text-[#C58A1C]",
            bg: "bg-amber-50",
          },
          {
            label: "Open Issues",
            value: openIssues,
            icon: <AlertCircle className="w-4 h-4" />,
            color: "text-[#C64B4B]",
            bg: "bg-red-50",
          },
          {
            label: "New Reports",
            value: unreadReports,
            icon: <FileText className="w-4 h-4" />,
            color: "text-[#1F8A62]",
            bg: "bg-emerald-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#EDE8E0] rounded-xl p-4"
          >
            <div
              className={`w-8 h-8 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-3`}
            >
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-[#0B1F33]">{stat.value}</p>
            <p className="text-[#667085] text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Portal headline */}
      <div className="bg-[#0B1F33] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-lg mb-1">
            Stop relying on WhatsApp messages and blurry photos.
          </h2>
          <p className="text-white/55 text-sm">
            Structured weekly reporting, approvals, documents, photos, budget tracking and issue control — all in one premium owner portal.
          </p>
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0B1F33]">Your Projects</h2>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Cover */}
              {project.cover_image && (
                <div
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.cover_image})` }}
                />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-[#0B1F33] text-base mb-1">
                      {project.project_name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[#667085] text-xs">
                      <MapPin className="w-3 h-3" />
                      {project.property_location}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <StatusChip status={project.budget_status} type="budget" />
                    <StatusChip status={project.timeline_status} type="timeline" />
                  </div>
                </div>

                {/* Phase + Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">
                        Phase:
                      </span>
                      <span className="text-xs font-semibold text-[#2563FF]">
                        {getPhaseLabel(project.current_phase)}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0B1F33]">
                      {project.overall_progress_percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.overall_progress_percent}%` }}
                    />
                  </div>
                </div>

                {/* Budget metrics */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Approved Budget
                    </p>
                    <p className="text-sm font-bold text-[#0B1F33]">
                      {formatCurrency(project.approved_budget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Paid to Date
                    </p>
                    <p className="text-sm font-bold text-[#0B1F33]">
                      {formatCurrency(project.paid_amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                      Forecast Final
                    </p>
                    <p className="text-sm font-bold text-[#1F8A62]">
                      {formatCurrency(project.forecast_final)}
                    </p>
                  </div>
                </div>

                {project.next_site_visit && (
                  <div className="flex items-center gap-2 text-xs text-[#667085] mb-5">
                    <Clock className="w-3.5 h-3.5" />
                    Next site visit:{" "}
                    <span className="font-semibold text-[#1F2937]">
                      {new Date(project.next_site_visit).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <Link
                  href={`/portal/project/${project.id}`}
                  className="flex items-center justify-center gap-2 bg-[#0B1F33] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#1F2937] transition-colors"
                >
                  View Project Portal
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
