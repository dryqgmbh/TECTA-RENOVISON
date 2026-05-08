"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_ISSUES, MOCK_APPROVALS } from "@/lib/mock-data";
import {
  formatCurrency,
  getPhaseLabel,
  getBudgetStatusLabel,
  getTimelineStatusLabel,
} from "@/lib/utils";
import {
  MapPin,
  Calendar,
  FileText,
  AlertTriangle,
  CheckSquare,
  ChevronRight,
  Edit,
  Plus,
  TrendingUp,
  Clock,
} from "lucide-react";

const PHASES = ["vision", "budget", "contractor_scope", "execution", "handover"];

export default function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  const openIssues = MOCK_ISSUES.filter((i) => i.project_id === id && i.status !== "resolved");
  const pendingApprovals = MOCK_APPROVALS.filter((a) => a.project_id === id && a.status === "pending");
  const [progress, setProgress] = useState(project?.overall_progress_percent || 0);

  if (!project) return <div className="p-8 text-[#667085]">Project not found.</div>;

  const currentPhaseIdx = PHASES.indexOf(project.current_phase);
  const budgetUsed = (project.paid_amount / project.approved_budget) * 100;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#667085] mb-4">
        <Link href="/admin" className="hover:text-[#1F2937]">Admin</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/admin/projects" className="hover:text-[#1F2937]">Projects</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1F2937] font-medium truncate">{project.project_name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33] mb-1">{project.project_name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#667085]">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.property_location}</span>
            <span className="font-mono text-[9px] bg-[#F4F1EA] px-2 py-1 rounded">#{project.id.toUpperCase()}</span>
            <span>{project.client_name}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/report-builder?project=${id}`}
            className="flex items-center gap-2 bg-[#2563FF] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#1D50D4] transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Report
          </Link>
          <button className="flex items-center gap-2 bg-white text-[#1F2937] font-semibold text-sm px-4 py-2.5 rounded-xl border border-[#EDE8E0] hover:bg-[#F4F1EA] transition-colors">
            <Edit className="w-4 h-4" />
            Edit Project
          </button>
        </div>
      </div>

      {/* Status chips */}
      <div className="flex gap-2 mb-6">
        {[
          {
            label: getBudgetStatusLabel(project.budget_status),
            color: project.budget_status === "on_budget" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
          },
          {
            label: getTimelineStatusLabel(project.timeline_status),
            color: project.timeline_status === "on_track" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700",
          },
          {
            label: getPhaseLabel(project.current_phase),
            color: "bg-[#EEF2FF] text-[#2563FF]",
          },
        ].map((chip) => (
          <span key={chip.label} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${chip.color}`}>
            {chip.label}
          </span>
        ))}
      </div>

      {/* Phase Timeline */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 mb-5">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">Phase Timeline</p>
          <button className="text-xs text-[#2563FF] font-semibold hover:underline">
            Advance Phase
          </button>
        </div>
        <div className="flex items-center">
          {PHASES.map((phase, idx) => {
            const isCompleted = idx < currentPhaseIdx;
            const isActive = idx === currentPhaseIdx;
            return (
              <div key={phase} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    isCompleted ? "bg-[#1F8A62] text-white" :
                    isActive ? "bg-[#2563FF] text-white ring-4 ring-[#EEF2FF]" :
                    "bg-[#EDE8E0] text-[#667085]"
                  }`}>
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  <p className={`text-[10px] font-semibold text-center leading-tight ${
                    isActive ? "text-[#2563FF]" : isCompleted ? "text-[#1F8A62]" : "text-[#D8CBB8]"
                  }`}>
                    {getPhaseLabel(phase)}
                  </p>
                </div>
                {idx < PHASES.length - 1 && (
                  <div className={`flex-1 h-0.5 -mt-5 ${idx < currentPhaseIdx ? "bg-[#1F8A62]" : "bg-[#EDE8E0]"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress editor */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085]">Overall Progress</p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-xl font-bold text-[#0B1F33] w-12 text-right">{progress}%</span>
          </div>
        </div>
        <div className="progress-bar h-3">
          <div className="progress-fill h-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-[#667085] mt-2">Drag slider to update progress (admin only)</p>
      </div>

      {/* Budget */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Approved Budget", value: project.approved_budget, color: "text-[#0B1F33]" },
          { label: "Committed", value: project.committed_spend, color: "text-[#2563FF]" },
          { label: "Paid", value: project.paid_amount, color: "text-[#1F8A62]" },
          { label: "Forecast Final", value: project.forecast_final, color: project.forecast_final <= project.approved_budget ? "text-[#1F8A62]" : "text-[#C58A1C]" },
        ].map((b) => (
          <div key={b.label} className="bg-white border border-[#EDE8E0] rounded-xl p-4">
            <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">{b.label}</p>
            <p className={`text-base font-bold ${b.color}`}>{formatCurrency(b.value)}</p>
          </div>
        ))}
      </div>

      {/* Alert grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {openIssues.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <p className="text-sm font-semibold text-amber-800">{openIssues.length} open issues</p>
            </div>
            <Link href={`/admin/projects/${id}/issues`} className="text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg hover:bg-amber-200">
              View <ChevronRight className="w-3 h-3 inline" />
            </Link>
          </div>
        )}
        {pendingApprovals.length > 0 && (
          <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-[#2563FF]" />
              <p className="text-sm font-semibold text-[#2563FF]">{pendingApprovals.length} awaiting client approval</p>
            </div>
            <Link href={`/admin/projects/${id}/approvals`} className="text-xs font-semibold text-[#2563FF] bg-white border border-[#C7D2FE] px-3 py-1.5 rounded-lg hover:bg-[#EEF2FF]">
              View <ChevronRight className="w-3 h-3 inline" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Weekly Reports", href: `/admin/projects/${id}/reports`, color: "bg-[#EEF2FF] text-[#2563FF]" },
          { label: "Material Board", href: `/admin/projects/${id}/materials`, color: "bg-[#F4F1EA] text-[#667085]" },
          { label: "Budget Tracker", href: `/admin/projects/${id}/budget`, color: "bg-emerald-50 text-emerald-700" },
          { label: "Contractor Quotes", href: `/admin/projects/${id}/quotes`, color: "bg-[#F4F1EA] text-[#667085]" },
          { label: "Issue Tracker", href: `/admin/projects/${id}/issues`, color: "bg-amber-50 text-amber-700" },
          { label: "Approvals", href: `/admin/projects/${id}/approvals`, color: "bg-[#EEF2FF] text-[#2563FF]" },
          { label: "Photo Log", href: `/admin/projects/${id}/photos`, color: "bg-[#F4F1EA] text-[#667085]" },
          { label: "Documents", href: `/admin/projects/${id}/documents`, color: "bg-[#F4F1EA] text-[#667085]" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`${item.color} rounded-xl p-4 text-xs font-semibold hover:shadow-md transition-shadow flex items-center justify-between`}
          >
            {item.label}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
