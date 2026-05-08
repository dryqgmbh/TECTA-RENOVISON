"use client";

import { use } from "react";
import { MOCK_PROJECTS, MOCK_BUDGET_ITEMS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

export default function BudgetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = MOCK_PROJECTS.find((p) => p.id === id);
  const items = MOCK_BUDGET_ITEMS.filter((b) => b.project_id === id);

  if (!project) return <div className="p-8 text-[#667085]">Project not found.</div>;

  const totalPlanned = items.reduce((s, i) => s + i.planned_amount, 0);
  const totalQuoted = items.reduce((s, i) => s + i.quoted_amount, 0);
  const totalApproved = items.reduce((s, i) => s + i.approved_amount, 0);
  const totalPaid = items.reduce((s, i) => s + i.paid_amount, 0);
  const totalVariance = totalQuoted - totalPlanned;
  const paidPct = (totalPaid / project.approved_budget) * 100;
  const committedPct = (project.committed_spend / project.approved_budget) * 100;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Budget Tracker
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Budget Overview</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Approved Budget", value: project.approved_budget, color: "text-[#0B1F33]", bg: "bg-white" },
          { label: "Committed Spend", value: project.committed_spend, color: "text-[#2563FF]", bg: "bg-[#EEF2FF]" },
          { label: "Paid to Date", value: project.paid_amount, color: "text-[#0B1F33]", bg: "bg-white" },
          { label: "Forecast Final", value: project.forecast_final, color: project.forecast_final <= project.approved_budget ? "text-[#1F8A62]" : "text-[#C58A1C]", bg: "bg-white" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-[#EDE8E0] rounded-xl p-4`}>
            <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{formatCurrency(s.value)}</p>
          </div>
        ))}
      </div>

      {/* Budget bar */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085]">Budget Utilisation</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#2563FF]" /> Paid ({paidPct.toFixed(0)}%)</span>
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#C7D2FE]" /> Committed ({committedPct.toFixed(0)}%)</span>
            <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#EDE8E0]" /> Remaining</span>
          </div>
        </div>
        <div className="relative h-6 bg-[#EDE8E0] rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#C7D2FE] rounded-full" style={{ width: `${Math.min(committedPct, 100)}%` }} />
          <div className="absolute top-0 left-0 h-full bg-[#2563FF] rounded-full" style={{ width: `${Math.min(paidPct, 100)}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-[#667085]">
          <span>€0</span>
          <span className="font-semibold text-[#0B1F33]">
            Remaining: {formatCurrency(project.approved_budget - project.committed_spend)}
          </span>
          <span>{formatCurrency(project.approved_budget)}</span>
        </div>

        {/* Variance indicator */}
        <div className="mt-4 pt-4 border-t border-[#EDE8E0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.forecast_final <= project.approved_budget ? (
                <TrendingDown className="w-4 h-4 text-[#1F8A62]" />
              ) : (
                <TrendingUp className="w-4 h-4 text-[#C58A1C]" />
              )}
              <span className="text-sm font-semibold text-[#1F2937]">
                Forecast vs Budget
              </span>
            </div>
            <span className={`text-sm font-bold ${
              project.forecast_final <= project.approved_budget ? "text-[#1F8A62]" : "text-[#C58A1C]"
            }`}>
              {project.forecast_final <= project.approved_budget ? "−" : "+"}
              {formatCurrency(Math.abs(project.forecast_final - project.approved_budget))}
              {" "}
              {project.forecast_final <= project.approved_budget ? "under budget" : "over budget"}
            </span>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#EDE8E0]">
          <h2 className="text-sm font-bold text-[#0B1F33]">Budget by Category</h2>
        </div>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Planned</th>
              <th>Quoted</th>
              <th>Approved</th>
              <th>Paid</th>
              <th>Variance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="font-semibold text-[#1F2937]">{item.category}</td>
                <td className="text-[#667085]">{formatCurrency(item.planned_amount)}</td>
                <td className="text-[#1F2937]">{formatCurrency(item.quoted_amount)}</td>
                <td className="text-[#1F2937]">{formatCurrency(item.approved_amount)}</td>
                <td>
                  <div>
                    <p className="font-semibold text-[#0B1F33]">{formatCurrency(item.paid_amount)}</p>
                    <div className="w-16 h-1 bg-[#EDE8E0] rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-[#2563FF] rounded-full"
                        style={{ width: `${item.approved_amount > 0 ? Math.min((item.paid_amount / item.approved_amount) * 100, 100) : 0}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className={item.variance > 0 ? "text-[#C58A1C] font-semibold" : "text-[#1F8A62] font-semibold"}>
                  {item.variance > 0 ? "+" : ""}{formatCurrency(item.variance)}
                </td>
                <td>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    item.status === "within_budget"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "watch"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {item.status === "within_budget" ? "On Budget" : item.status === "watch" ? "Watch" : "Over"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#F4F1EA]">
              <td className="font-bold text-[#0B1F33]">Total</td>
              <td className="font-bold text-[#0B1F33]">{formatCurrency(totalPlanned)}</td>
              <td className="font-bold text-[#0B1F33]">{formatCurrency(totalQuoted)}</td>
              <td className="font-bold text-[#0B1F33]">{formatCurrency(totalApproved)}</td>
              <td className="font-bold text-[#0B1F33]">{formatCurrency(totalPaid)}</td>
              <td className={`font-bold ${totalVariance > 0 ? "text-[#C58A1C]" : "text-[#1F8A62]"}`}>
                {totalVariance > 0 ? "+" : ""}{formatCurrency(totalVariance)}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
