"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MOCK_WEEKLY_REPORTS } from "@/lib/mock-data";
import { getPhaseLabel, getBudgetStatusLabel, getTimelineStatusLabel, formatDate } from "@/lib/utils";
import { FileText, Plus, Eye, CheckCircle, AlertTriangle, CheckSquare, TrendingUp, Camera, ChevronRight } from "lucide-react";

export default function AdminReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reports = MOCK_WEEKLY_REPORTS.filter((r) => r.project_id === id);
  const [selectedReport, setSelectedReport] = useState(reports[0]);

  if (reports.length === 0) {
    return (
      <div className="p-8 text-center">
        <FileText className="w-10 h-10 mx-auto mb-4 text-[#D8CBB8]" />
        <p className="text-[#667085] mb-4">No reports yet.</p>
        <Link href={`/admin/report-builder?project=${id}`} className="bg-[#2563FF] text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
          Create First Report
        </Link>
      </div>
    );
  }

  const r = selectedReport;

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">Weekly Reports</p>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Project Reports</h1>
        </div>
        <Link
          href={`/admin/report-builder?project=${id}`}
          className="flex items-center gap-2 bg-[#2563FF] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#1D50D4] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Report
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#EDE8E0] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#EDE8E0]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Reports</p>
            </div>
            {reports.map((rep) => (
              <button key={rep.id} onClick={() => setSelectedReport(rep)}
                className={`w-full text-left px-4 py-4 border-b border-[#F4F1EA] last:border-none transition-colors ${rep.id === r.id ? "bg-[#EEF2FF]" : "hover:bg-[#F4F1EA]"}`}>
                <p className={`text-xs font-bold ${rep.id === r.id ? "text-[#2563FF]" : "text-[#0B1F33]"}`}>Week {rep.week_number}</p>
                <p className="text-[10px] text-[#667085]">{formatDate(rep.report_date)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0B1F33] rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">TECTA Weekly Report</p>
                <h2 className="text-xl font-bold">Week {r.week_number}</h2>
                <p className="text-white/55 text-sm mt-0.5">{formatDate(r.report_date)} · {getPhaseLabel(r.phase)}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#2563FF]">{r.overall_progress_percent}%</p>
                <p className="text-white/40 text-xs">Progress</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-[10px] mb-1 uppercase tracking-wider">Budget</p>
                <p className={`text-xs font-semibold ${r.budget_status === "on_budget" ? "text-[#1F8A62]" : "text-[#C58A1C]"}`}>
                  {getBudgetStatusLabel(r.budget_status)}
                </p>
              </div>
              <div className="bg-white/8 rounded-xl p-3">
                <p className="text-white/40 text-[10px] mb-1 uppercase tracking-wider">Timeline</p>
                <p className={`text-xs font-semibold ${r.timeline_status === "on_track" ? "text-[#1F8A62]" : "text-[#C58A1C]"}`}>
                  {getTimelineStatusLabel(r.timeline_status)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#2563FF]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Executive Summary</p>
            </div>
            <p className="text-sm text-[#1F2937] leading-relaxed">{r.executive_summary}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-[#1F8A62]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Completed</p>
              </div>
              <ul className="space-y-2">
                {r.completed_this_week.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-[#1F8A62] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-3">In Progress</p>
              <ul className="space-y-2">
                {r.in_progress.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full border-2 border-[#2563FF] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {r.issues_and_prevented_mistakes.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Issues Detected</p>
              </div>
              {r.issues_and_prevented_mistakes.map((iss) => (
                <div key={iss.id} className="bg-white rounded-xl p-3 mb-2 border border-amber-200">
                  <p className="text-xs font-bold text-[#1F2937]">{iss.title}</p>
                  <p className="text-xs text-[#667085] mt-1">{iss.description}</p>
                  {iss.prevented_cost && (
                    <p className="text-xs text-[#1F8A62] mt-1 font-medium">Prevented: {iss.prevented_cost}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {r.photos.length > 0 && (
            <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4 text-[#667085]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Photos</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {r.photos.map((photo) => (
                  <div key={photo.id} className="relative rounded-lg overflow-hidden aspect-video">
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
