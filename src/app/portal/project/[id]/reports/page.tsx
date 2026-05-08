"use client";

import { use, useState } from "react";
import { MOCK_WEEKLY_REPORTS } from "@/lib/mock-data";
import { getPhaseLabel, getBudgetStatusLabel, getTimelineStatusLabel } from "@/lib/utils";
import { FileText, ChevronRight, Camera, CheckCircle, AlertTriangle, CheckSquare, TrendingUp } from "lucide-react";

export default function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reports = MOCK_WEEKLY_REPORTS.filter((r) => r.project_id === id);
  const [selectedReport, setSelectedReport] = useState(reports[0]);

  if (!selectedReport) {
    return (
      <div className="p-8">
        <p className="text-[#667085]">No reports available yet for this project.</p>
      </div>
    );
  }

  const r = selectedReport;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Weekly Reports
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Project Reports</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report list */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#EDE8E0] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EDE8E0]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                All Reports
              </p>
            </div>
            {reports.map((rep) => (
              <button
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`w-full text-left px-4 py-4 border-b border-[#F4F1EA] last:border-none transition-colors ${
                  rep.id === r.id ? "bg-[#EEF2FF]" : "hover:bg-[#F4F1EA]"
                }`}
              >
                <p className={`text-xs font-bold mb-0.5 ${rep.id === r.id ? "text-[#2563FF]" : "text-[#0B1F33]"}`}>
                  Week {rep.week_number}
                </p>
                <p className="text-[10px] text-[#667085]">
                  {new Date(rep.report_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${rep.budget_status === "on_budget" ? "bg-[#1F8A62]" : "bg-[#C58A1C]"}`} />
                  <p className="text-[9px] text-[#667085]">{getBudgetStatusLabel(rep.budget_status)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report detail */}
        <div className="lg:col-span-3 space-y-5">
          {/* Header */}
          <div className="bg-[#0B1F33] rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  TECTA Renovision — Weekly Site Report
                </p>
                <h2 className="text-xl font-bold">
                  Week {r.week_number} — Site Report
                </h2>
                <p className="text-white/55 text-sm mt-0.5">
                  {new Date(r.report_date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · {getPhaseLabel(r.phase)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#2563FF]">{r.overall_progress_percent}%</p>
                <p className="text-white/40 text-xs">Overall Progress</p>
              </div>
            </div>

            {/* Status indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Budget</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${
                  r.budget_status === "on_budget" ? "text-[#1F8A62]" : "text-[#C58A1C]"
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  {getBudgetStatusLabel(r.budget_status)}
                </div>
              </div>
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Timeline</p>
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${
                  r.timeline_status === "on_track" ? "text-[#1F8A62]" : "text-[#C58A1C]"
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  {getTimelineStatusLabel(r.timeline_status)}
                </div>
              </div>
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Phase</p>
                <p className="text-white text-xs font-semibold">{getPhaseLabel(r.phase)}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
                Overall Project Progress
              </p>
              <p className="text-xl font-bold text-[#0B1F33]">{r.overall_progress_percent}%</p>
            </div>
            <div className="progress-bar h-4">
              <div className="progress-fill h-full" style={{ width: `${r.overall_progress_percent}%` }} />
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#2563FF]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">1. Executive Summary</p>
            </div>
            <p className="text-sm text-[#1F2937] leading-relaxed">{r.executive_summary}</p>
          </div>

          {/* Completed / In Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-[#1F8A62]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Completed This Week</p>
              </div>
              <ul className="space-y-2.5">
                {r.completed_this_week.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-[#1F8A62] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1F2937]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded-full border-2 border-[#2563FF] flex-shrink-0" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">In Progress</p>
              </div>
              <ul className="space-y-2.5">
                {r.in_progress.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#2563FF] flex-shrink-0 mt-0.5" />
                    <span className="text-[#1F2937]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Issues Prevented */}
          {r.issues_and_prevented_mistakes.length > 0 && (
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-[#C58A1C]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Issues Prevented / Risks Managed</p>
              </div>
              {r.issues_and_prevented_mistakes.map((issue) => (
                <div key={issue.id} className={`rounded-xl p-4 border ${
                  issue.severity === "critical" ? "bg-red-50 border-red-200" :
                  issue.severity === "high" ? "bg-orange-50 border-orange-200" :
                  "bg-amber-50 border-amber-200"
                }`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-sm text-[#1F2937]">{issue.title}</p>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        issue.severity === "critical" ? "bg-red-200 text-red-800" :
                        issue.severity === "high" ? "bg-orange-200 text-orange-800" :
                        "bg-amber-200 text-amber-800"
                      }`}>
                        {issue.severity}
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#667085] mb-2">{issue.description}</p>
                  {issue.risk_if_ignored && (
                    <p className="text-xs text-[#C64B4B]">
                      <span className="font-semibold">If undetected: </span>{issue.risk_if_ignored}
                    </p>
                  )}
                  {issue.prevented_cost && (
                    <p className="text-xs text-[#1F8A62] mt-1">
                      <span className="font-semibold">Remediation avoided: </span>{issue.prevented_cost}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* QC Notes */}
          {r.quality_control_notes.length > 0 && (
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-4 h-4 text-[#2563FF]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Quality Control</p>
              </div>
              <div className="space-y-3">
                {r.quality_control_notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                      note.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                      note.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {note.status === "approved" ? "✓ Approved" : note.status === "rejected" ? "✗ Rejected" : "⚠ Rework"}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#1F2937]">{note.category}</p>
                      <p className="text-xs text-[#667085]">{note.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Owner Actions */}
          {r.owner_actions_required.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare className="w-4 h-4 text-amber-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Owner Actions Required</p>
              </div>
              {r.owner_actions_required.map((action) => (
                <div key={action.id} className="bg-white rounded-xl p-4 border border-amber-200">
                  <p className="font-semibold text-sm text-[#1F2937] mb-1">{action.title}</p>
                  <p className="text-xs text-[#667085] mb-3">{action.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {action.cost_impact && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">
                        Cost: {action.cost_impact}
                      </span>
                    )}
                    {action.deadline && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-lg">
                        Deadline: {new Date(action.deadline).toLocaleDateString("en-GB")}
                      </span>
                    )}
                  </div>
                  <a
                    href={`/portal/project/${id}/approvals`}
                    className="text-xs font-semibold text-[#2563FF] hover:underline flex items-center gap-1"
                  >
                    Go to Approvals <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Photos */}
          {r.photos.length > 0 && (
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-4 h-4 text-[#667085]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Photo Documentation</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {r.photos.map((photo) => (
                  <div key={photo.id} className="relative rounded-xl overflow-hidden">
                    <img src={photo.url} alt={photo.caption} className="w-full h-28 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-white text-[10px] font-medium">{photo.caption.substring(0, 40)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Week Plan */}
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-4 h-4 text-[#2563FF]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Next Week Plan</p>
            </div>
            <ul className="space-y-2.5">
              {r.next_week_plan.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EEF2FF] border-2 border-[#2563FF] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1F2937]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
