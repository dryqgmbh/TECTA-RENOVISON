"use client";

import Link from "next/link";
import { MOCK_PROJECTS, MOCK_ISSUES, MOCK_APPROVALS } from "@/lib/mock-data";
import {
  formatCurrency,
  getPhaseLabel,
  getBudgetStatusLabel,
  getTimelineStatusLabel,
} from "@/lib/utils";
import {
  Users,
  Home,
  TrendingUp,
  AlertTriangle,
  CheckSquare,
  FileText,
  ChevronRight,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const totalProjects = MOCK_PROJECTS.length;
  const activeProjects = MOCK_PROJECTS.filter((p) => p.current_phase !== "completed").length;
  const openIssues = MOCK_ISSUES.filter((i) => i.status !== "resolved").length;
  const pendingApprovals = MOCK_APPROVALS.filter((a) => a.status === "pending").length;
  const totalBudget = MOCK_PROJECTS.reduce((s, p) => s + p.approved_budget, 0);

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Admin Control Centre
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">TECTA Admin Dashboard</h1>
        <p className="text-[#667085] text-sm mt-1">
          Overview of all active projects, client accounts, issues and approvals.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Projects", value: totalProjects, icon: <Home className="w-4 h-4" />, color: "text-[#2563FF]", bg: "bg-[#EEF2FF]" },
          { label: "Active Projects", value: activeProjects, icon: <TrendingUp className="w-4 h-4" />, color: "text-[#1F8A62]", bg: "bg-emerald-50" },
          { label: "Open Issues", value: openIssues, icon: <AlertTriangle className="w-4 h-4" />, color: "text-[#C58A1C]", bg: "bg-amber-50" },
          { label: "Pending Approvals", value: pendingApprovals, icon: <CheckSquare className="w-4 h-4" />, color: "text-[#C64B4B]", bg: "bg-red-50" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white border border-[#EDE8E0] rounded-xl p-5">
            <div className={`w-9 h-9 ${kpi.bg} ${kpi.color} rounded-lg flex items-center justify-center mb-3`}>
              {kpi.icon}
            </div>
            <p className="text-2xl font-bold text-[#0B1F33]">{kpi.value}</p>
            <p className="text-xs text-[#667085] mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Total portfolio */}
      <div className="bg-[#0B1F33] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalBudget)}</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Committed</p>
            <p className="text-3xl font-bold text-[#2563FF]">
              {formatCurrency(MOCK_PROJECTS.reduce((s, p) => s + p.committed_spend, 0))}
            </p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Total Paid Out</p>
            <p className="text-3xl font-bold text-[#1F8A62]">
              {formatCurrency(MOCK_PROJECTS.reduce((s, p) => s + p.paid_amount, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "New Report", icon: <FileText className="w-4 h-4" />, href: "/admin/report-builder", color: "bg-[#2563FF] text-white" },
          { label: "All Projects", icon: <Home className="w-4 h-4" />, href: "/admin/projects", color: "bg-white text-[#0B1F33] border border-[#EDE8E0]" },
          { label: "Open Issues", icon: <AlertTriangle className="w-4 h-4" />, href: "/admin/projects/proj_001/issues", color: "bg-white text-[#0B1F33] border border-[#EDE8E0]" },
          { label: "Approvals", icon: <CheckSquare className="w-4 h-4" />, href: "/admin/projects/proj_001/approvals", color: "bg-white text-[#0B1F33] border border-[#EDE8E0]" },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`${action.color} rounded-xl p-4 flex items-center gap-2 text-sm font-semibold hover:shadow-md transition-shadow`}
          >
            {action.icon}
            {action.label}
          </Link>
        ))}
      </div>

      {/* Projects table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0B1F33]">All Projects</h2>
          <Link href="/admin/projects" className="text-xs text-[#2563FF] font-semibold hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Phase</th>
                <th>Progress</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PROJECTS.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div>
                      <p className="font-semibold text-[#0B1F33] text-xs leading-tight">{project.project_name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#667085]" />
                        <p className="text-[10px] text-[#667085]">{project.property_location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-[#1F2937]">{project.client_name}</td>
                  <td>
                    <span className="text-xs font-semibold text-[#2563FF] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                      {getPhaseLabel(project.current_phase)}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[#EDE8E0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2563FF] rounded-full"
                          style={{ width: `${project.overall_progress_percent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#1F2937]">
                        {project.overall_progress_percent}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      project.budget_status === "on_budget" ? "bg-emerald-100 text-emerald-700" :
                      project.budget_status === "watch" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {getBudgetStatusLabel(project.budget_status)}
                    </span>
                  </td>
                  <td>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      project.timeline_status === "on_track" ? "bg-emerald-100 text-emerald-700" :
                      project.timeline_status === "delayed" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {getTimelineStatusLabel(project.timeline_status)}
                    </span>
                  </td>
                  <td>
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-xs font-semibold text-[#2563FF] hover:underline flex items-center gap-1"
                    >
                      Manage <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
