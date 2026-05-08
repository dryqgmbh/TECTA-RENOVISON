"use client";

import { use } from "react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_WEEKLY_REPORTS, MOCK_ISSUES, MOCK_APPROVALS } from "@/lib/mock-data";
import { formatCurrency, getPhaseLabel, getBudgetStatusLabel, getTimelineStatusLabel } from "@/lib/utils";
import {
  MapPin,
  Calendar,
  FileText,
  AlertTriangle,
  CheckSquare,
  ChevronRight,
  TrendingUp,
  Clock,
  Camera,
  FolderOpen,
  DollarSign,
} from "lucide-react";

const PHASES = ["vision", "budget", "contractor_scope", "execution", "handover"];

export default function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  const latestReport = MOCK_WEEKLY_REPORTS.filter((r) => r.project_id === id)[0];
  const openIssues = MOCK_ISSUES.filter((i) => i.project_id === id && i.status !== "resolved");
  const pendingApprovals = MOCK_APPROVALS.filter((a) => a.project_id === id && a.status === "pending");

  if (!project) {
    return (
      <div className="p-8 text-center text-[#667085]">Project not found.</div>
    );
  }

  const currentPhaseIdx = PHASES.indexOf(project.current_phase);
  const budgetUsed = (project.paid_amount / project.approved_budget) * 100;
  const budgetCommitted = (project.committed_spend / project.approved_budget) * 100;

  const budgetVariance = project.forecast_final - project.approved_budget;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-[#667085] mb-3">
          <Link href="/portal" className="hover:text-[#1F2937]">My Projects</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F2937] font-medium">{project.project_name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33] mb-1">{project.project_name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#667085]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {project.property_location}
              </span>
              <span className="text-[#EDE8E0]">|</span>
              <span className="font-mono text-[10px] bg-[#F4F1EA] px-2 py-1 rounded">
                #{project.id.toUpperCase()}
              </span>
              <span className="text-[#EDE8E0]">|</span>
              <span>{project.property_type}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                project.budget_status === "on_budget"
                  ? "bg-emerald-100 text-emerald-700"
                  : project.budget_status === "watch"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {getBudgetStatusLabel(project.budget_status)}
            </span>
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                project.timeline_status === "on_track"
                  ? "bg-emerald-100 text-emerald-700"
                  : project.timeline_status === "delayed"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {getTimelineStatusLabel(project.timeline_status)}
            </span>
          </div>
        </div>
      </div>

      {/* Phase Timeline */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] mb-4">
          Project Phase Timeline
        </p>
        <div className="flex items-center gap-0">
          {PHASES.map((phase, idx) => {
            const isCompleted = idx < currentPhaseIdx;
            const isActive = idx === currentPhaseIdx;
            return (
              <div key={phase} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                      isCompleted
                        ? "bg-[#1F8A62] text-white"
                        : isActive
                        ? "bg-[#2563FF] text-white ring-4 ring-[#EEF2FF]"
                        : "bg-[#EDE8E0] text-[#667085]"
                    }`}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  <p
                    className={`text-[10px] font-semibold text-center leading-tight ${
                      isActive ? "text-[#2563FF]" : isCompleted ? "text-[#1F8A62]" : "text-[#D8CBB8]"
                    }`}
                  >
                    {getPhaseLabel(phase)}
                  </p>
                </div>
                {idx < PHASES.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 -mt-5 ${
                      idx < currentPhaseIdx ? "bg-[#1F8A62]" : "bg-[#EDE8E0]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress + Budget row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Overall Progress */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">
              Overall Progress
            </p>
            <span className="text-2xl font-bold text-[#0B1F33]">
              {project.overall_progress_percent}%
            </span>
          </div>
          <div className="progress-bar h-3 mb-4">
            <div
              className="progress-fill h-full"
              style={{ width: `${project.overall_progress_percent}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-[#667085] mb-0.5">Current Phase</p>
              <p className="text-sm font-semibold text-[#2563FF]">
                {getPhaseLabel(project.current_phase)}
              </p>
            </div>
            {project.next_site_visit && (
              <div>
                <p className="text-[10px] text-[#667085] mb-0.5">Next Site Visit</p>
                <p className="text-sm font-semibold text-[#1F2937] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.next_site_visit).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Budget Summary */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">
              Budget Status
            </p>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                project.budget_status === "on_budget"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {getBudgetStatusLabel(project.budget_status)}
            </span>
          </div>
          {/* Budget bar: paid / committed / approved */}
          <div className="relative h-3 bg-[#EDE8E0] rounded-full mb-3 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#EEF2FF] rounded-full"
              style={{ width: `${Math.min(budgetCommitted, 100)}%` }}
            />
            <div
              className="absolute top-0 left-0 h-full bg-[#2563FF] rounded-full"
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-[#667085] mb-0.5">Approved Budget</p>
              <p className="text-sm font-bold text-[#0B1F33]">
                {formatCurrency(project.approved_budget)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#667085] mb-0.5">Paid to Date</p>
              <p className="text-sm font-bold text-[#2563FF]">
                {formatCurrency(project.paid_amount)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#667085] mb-0.5">Forecast Final</p>
              <p className="text-sm font-bold text-[#1F8A62]">
                {formatCurrency(project.forecast_final)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#667085] mb-0.5">Variance</p>
              <p className={`text-sm font-bold ${budgetVariance <= 0 ? "text-[#1F8A62]" : "text-[#C58A1C]"}`}>
                {budgetVariance <= 0 ? "" : "+"}{formatCurrency(budgetVariance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert cards */}
      {pendingApprovals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-800 text-sm">
                {pendingApprovals.length} decision{pendingApprovals.length > 1 ? "s" : ""} pending your approval
              </p>
              <p className="text-amber-600 text-xs">Some decisions have deadlines this week.</p>
            </div>
          </div>
          <Link
            href={`/portal/project/${id}/approvals`}
            className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-2 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1"
          >
            Review
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Quick navigation grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
        {[
          {
            label: "Weekly Reports",
            icon: <FileText className="w-5 h-5" />,
            href: `/portal/project/${id}/reports`,
            badge: latestReport ? "Week " + latestReport.week_number : undefined,
            color: "bg-[#EEF2FF] text-[#2563FF]",
          },
          {
            label: "Pending Approvals",
            icon: <CheckSquare className="w-5 h-5" />,
            href: `/portal/project/${id}/approvals`,
            badge: pendingApprovals.length > 0 ? `${pendingApprovals.length} pending` : undefined,
            badgeColor: "bg-amber-100 text-amber-700",
            color: "bg-amber-50 text-amber-600",
          },
          {
            label: "Open Issues",
            icon: <AlertTriangle className="w-5 h-5" />,
            href: `/portal/project/${id}/issues`,
            badge: openIssues.length > 0 ? `${openIssues.length} open` : undefined,
            badgeColor: "bg-red-100 text-red-700",
            color: "bg-red-50 text-red-600",
          },
          {
            label: "Budget Tracker",
            icon: <DollarSign className="w-5 h-5" />,
            href: `/portal/project/${id}/budget`,
            color: "bg-emerald-50 text-emerald-600",
          },
          {
            label: "Photo Log",
            icon: <Camera className="w-5 h-5" />,
            href: `/portal/project/${id}/photos`,
            color: "bg-[#F4F1EA] text-[#667085]",
          },
          {
            label: "Documents",
            icon: <FolderOpen className="w-5 h-5" />,
            href: `/portal/project/${id}/documents`,
            color: "bg-[#F4F1EA] text-[#667085]",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white border border-[#EDE8E0] rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
          >
            <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center`}>
              {item.icon}
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[#0B1F33]">{item.label}</p>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.badgeColor || "bg-[#EEF2FF] text-[#2563FF]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Latest report summary */}
      {latestReport && (
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] mb-1">
                Latest Weekly Report
              </p>
              <h3 className="font-bold text-[#0B1F33]">
                Week {latestReport.week_number} — {new Date(latestReport.report_date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
              </h3>
            </div>
            <Link
              href={`/portal/project/${id}/reports`}
              className="text-xs text-[#2563FF] font-semibold hover:underline flex items-center gap-1"
            >
              View Full Report
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-sm text-[#667085] leading-relaxed mb-4">
            {latestReport.executive_summary.substring(0, 280)}...
          </p>
          <div className="flex flex-wrap gap-2">
            {latestReport.completed_this_week.slice(0, 3).map((item) => (
              <span
                key={item}
                className="text-xs bg-[#F4F1EA] text-[#667085] px-3 py-1 rounded-full"
              >
                ✓ {item.substring(0, 50)}{item.length > 50 ? "…" : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
