"use client";

import { use, useState } from "react";
import { MOCK_QUOTES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { ContractorQuote } from "@/lib/types";
import { CheckCircle, XCircle, Star, AlertTriangle, Plus, Upload } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  received: { label: "Received", bg: "bg-gray-100", text: "text-gray-600" },
  reviewed: { label: "Reviewed", bg: "bg-blue-100", text: "text-blue-700" },
  recommended: { label: "Recommended", bg: "bg-emerald-100", text: "text-emerald-700" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-700" },
  approved: { label: "Approved", bg: "bg-[#EEF2FF]", text: "text-[#2563FF]" },
};

export default function QuotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quotes, setQuotes] = useState<ContractorQuote[]>(
    MOCK_QUOTES.filter((q) => q.project_id === id)
  );

  const trades = [...new Set(quotes.map((q) => q.trade))];

  const totalApproved = quotes
    .filter((q) => q.status === "approved" || q.status === "recommended")
    .reduce((s, q) => s + q.quote_amount, 0);

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
            Contractor Quotes
          </p>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Quote Management</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#2563FF] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#1D50D4] transition-colors">
          <Plus className="w-4 h-4" />
          Add Quote
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{quotes.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Total Quotes</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">
            {quotes.filter((q) => q.status === "recommended" || q.status === "approved").length}
          </p>
          <p className="text-xs text-emerald-600 mt-0.5">Recommended / Approved</p>
        </div>
        <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl p-4">
          <p className="text-lg font-bold text-[#2563FF]">{formatCurrency(totalApproved)}</p>
          <p className="text-xs text-[#2563FF] mt-0.5">Committed Value</p>
        </div>
      </div>

      {/* Comparison table by trade */}
      {trades.map((trade) => {
        const tradeQuotes = quotes.filter((q) => q.trade === trade);
        const lowestQuote = tradeQuotes.reduce((min, q) => q.quote_amount < min.quote_amount ? q : min, tradeQuotes[0]);

        return (
          <div key={trade} className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3 flex items-center gap-2">
              <div className="w-1.5 h-4 bg-[#2563FF] rounded-full" />
              {trade}
            </h2>

            {/* Comparison table */}
            <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden mb-3">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Contractor</th>
                    <th>Quote Amount</th>
                    <th>Status</th>
                    <th>TECTA Assessment</th>
                    <th>Recommendation</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeQuotes.map((q) => (
                    <tr key={q.id} className={q.status === "recommended" ? "bg-emerald-50/50" : q.status === "rejected" ? "bg-red-50/30" : ""}>
                      <td>
                        <div className="flex items-center gap-2">
                          {q.status === "recommended" && <Star className="w-3.5 h-3.5 text-[#1F8A62]" />}
                          <p className="font-semibold text-[#1F2937] text-sm">{q.contractor_name}</p>
                        </div>
                        {q.id === lowestQuote.id && (
                          <span className="text-[10px] text-[#1F8A62] font-semibold">Lowest quote</span>
                        )}
                      </td>
                      <td>
                        <p className={`font-bold text-base ${q.status === "rejected" ? "text-[#C64B4B] line-through" : "text-[#0B1F33]"}`}>
                          {formatCurrency(q.quote_amount)}
                        </p>
                      </td>
                      <td>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CONFIG[q.status]?.bg} ${STATUS_CONFIG[q.status]?.text}`}>
                          {STATUS_CONFIG[q.status]?.label}
                        </span>
                      </td>
                      <td className="max-w-xs">
                        {q.risk_notes && (
                          <p className="text-xs text-[#667085] leading-tight">{q.risk_notes}</p>
                        )}
                      </td>
                      <td>
                        {q.recommendation && (
                          <p className={`text-xs font-medium leading-tight ${q.status === "recommended" ? "text-[#1F8A62]" : "text-[#C64B4B]"}`}>
                            {q.recommendation}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detailed view of recommended quote */}
            {tradeQuotes.filter((q) => q.status === "recommended" || q.status === "approved").map((q) => (
              <div key={q.id} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    TECTA Recommended — {q.contractor_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Scope Included</p>
                    <ul className="space-y-1">
                      {q.scope_included.map((s) => (
                        <li key={s} className="flex items-center gap-1.5 text-xs text-[#1F2937]">
                          <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Scope Excluded</p>
                    <ul className="space-y-1">
                      {q.scope_excluded.map((s) => (
                        <li key={s} className="flex items-center gap-1.5 text-xs text-[#667085]">
                          <XCircle className="w-3 h-3 text-[#C64B4B] flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
