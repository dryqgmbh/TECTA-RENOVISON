"use client";

import { use, useState } from "react";
import { MOCK_ISSUES } from "@/lib/mock-data";
import { Issue } from "@/lib/types";
import { AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";
import { formatDate } from "@/lib/utils";

const SEVERITY_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export default function IssuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const issues = MOCK_ISSUES.filter((i) => i.project_id === id)
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  const filtered = issues.filter((i) => {
    if (filter === "open") return i.status !== "resolved";
    if (filter === "resolved") return i.status === "resolved";
    return true;
  });

  const open = issues.filter((i) => i.status !== "resolved").length;
  const resolved = issues.filter((i) => i.status === "resolved").length;
  const critical = issues.filter((i) => i.severity === "critical" || i.severity === "high").length;

  const severityConfig = {
    critical: { label: "Critical", bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
    high: { label: "High", bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
    medium: { label: "Medium", bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
    low: { label: "Low", bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  };

  const statusConfig = {
    open: { label: "Open", bg: "bg-amber-100", text: "text-amber-700" },
    in_progress: { label: "In Progress", bg: "bg-blue-100", text: "text-blue-700" },
    resolved: { label: "Resolved", bg: "bg-emerald-100", text: "text-emerald-700" },
    rejected: { label: "Rejected", bg: "bg-gray-100", text: "text-gray-600" },
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Issue Tracker
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Issues & Quality Control</h1>
        <p className="text-[#667085] text-sm mt-1">
          Issues detected, documented and resolved by TECTA on your project.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-700">{open}</p>
          <p className="text-xs text-amber-600 mt-0.5">Open Issues</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">{resolved}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Resolved</p>
        </div>
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#2563FF]">{critical}</p>
          <p className="text-xs text-[#2563FF] mt-0.5">High/Critical</p>
        </div>
      </div>

      {/* TECTA note */}
      <div className="bg-[#0B1F33] rounded-2xl p-5 mb-6 flex items-start gap-4">
        <div className="w-9 h-9 bg-[#2563FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-[#2563FF]" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm mb-1">TECTA Issue Detection</p>
          <p className="text-white/55 text-xs leading-relaxed">
            All issues below were detected by TECTA site reviews before causing damage or cost impact. Prevented remediation costs are documented where applicable. This register provides full traceability.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5">
        {[["all", "All Issues"], ["open", "Open"], ["resolved", "Resolved"]].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val as "all" | "open" | "resolved")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === val
                ? "bg-[#2563FF] text-white"
                : "bg-white border border-[#EDE8E0] text-[#667085] hover:bg-[#F4F1EA]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        {filtered.map((issue) => {
          const sev = severityConfig[issue.severity];
          const st = statusConfig[issue.status];
          return (
            <div
              key={issue.id}
              className={`bg-white border rounded-2xl overflow-hidden ${sev.border}`}
            >
              {/* Severity stripe */}
              <div className={`${sev.bg} border-b ${sev.border} px-6 py-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-4 h-4 ${sev.text} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="font-bold text-[#1F2937] text-base">{issue.title}</h3>
                      <p className="text-[#667085] text-xs mt-0.5">
                        Detected: {formatDate(issue.detected_at)} by {issue.detected_by}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${sev.bg} ${sev.text}`}>
                      {sev.label}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${st.bg} ${st.text}`}>
                      {st.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-3">
                <p className="text-sm text-[#1F2937] leading-relaxed">{issue.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {issue.risk_if_ignored && (
                    <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C64B4B] mb-1">
                        Risk if Undetected
                      </p>
                      <p className="text-xs text-[#1F2937]">{issue.risk_if_ignored}</p>
                    </div>
                  )}
                  {issue.recommended_correction && (
                    <div className="bg-[#F4F1EA] rounded-xl p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#667085] mb-1">
                        Correction Applied
                      </p>
                      <p className="text-xs text-[#1F2937]">{issue.recommended_correction}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {issue.responsible_party && (
                    <span className="text-xs text-[#667085] bg-[#F4F1EA] px-3 py-1 rounded-lg">
                      Responsible: <strong>{issue.responsible_party}</strong>
                    </span>
                  )}
                  {issue.prevented_cost && (
                    <span className="text-xs text-[#1F8A62] bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      Remediation avoided: <strong>{issue.prevented_cost}</strong>
                    </span>
                  )}
                  {issue.resolved_at && (
                    <span className="flex items-center gap-1 text-xs text-[#1F8A62]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Resolved {formatDate(issue.resolved_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#667085]">
          <CheckCircle className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p>No {filter !== "all" ? filter : ""} issues for this project.</p>
        </div>
      )}
    </div>
  );
}
