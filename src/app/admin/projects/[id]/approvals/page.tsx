"use client";

import { use, useState } from "react";
import { MOCK_APPROVALS } from "@/lib/mock-data";
import { Approval } from "@/lib/types";
import { CheckCircle, XCircle, MessageSquare, AlertCircle, Clock } from "lucide-react";

export default function ApprovalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [approvals, setApprovals] = useState<Approval[]>(
    MOCK_APPROVALS.filter((a) => a.project_id === id)
  );
  const [comments, setComments] = useState<Record<string, string>>({});
  const [actionDone, setActionDone] = useState<Record<string, string>>({});

  const handleAction = (approvalId: string, action: "approved" | "rejected" | "change_requested") => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? { ...a, status: action, client_comment: comments[approvalId] || "" }
          : a
      )
    );
    setActionDone((prev) => ({ ...prev, [approvalId]: action }));
  };

  const pending = approvals.filter((a) => a.status === "pending");
  const decided = approvals.filter((a) => a.status !== "pending");

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Owner Approvals
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Approval Workflow</h1>
        <p className="text-[#667085] text-sm mt-1">
          Review and approve material selections, quotes and change orders for your project.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-700">{pending.length}</p>
          <p className="text-xs text-amber-600 mt-0.5">Pending Decisions</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">
            {approvals.filter((a) => a.status === "approved").length}
          </p>
          <p className="text-xs text-emerald-600 mt-0.5">Approved</p>
        </div>
        <div className="bg-[#F4F1EA] border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#667085]">{decided.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Total Reviewed</p>
        </div>
      </div>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-[#0B1F33] uppercase tracking-wider mb-4">
            Pending Your Decision
          </h2>
          <div className="space-y-4">
            {pending.map((approval) => (
              <div
                key={approval.id}
                className={`bg-white border rounded-2xl overflow-hidden ${
                  actionDone[approval.id] ? "opacity-75 border-[#EDE8E0]" : "border-amber-300"
                }`}
              >
                {/* Header */}
                <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-[#0B1F33] text-base">{approval.title}</h3>
                      <p className="text-xs text-[#667085] mt-0.5 uppercase tracking-wider">
                        {approval.item_type}
                      </p>
                    </div>
                    {approval.deadline && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        Deadline: {new Date(approval.deadline).toLocaleDateString("en-GB")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-5">
                  <p className="text-sm text-[#1F2937] leading-relaxed mb-4">{approval.description}</p>

                  {/* Impact */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {approval.cost_impact && (
                      <div className="bg-[#F4F1EA] rounded-xl p-3">
                        <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Cost Impact</p>
                        <p className="text-sm font-semibold text-[#1F2937]">{approval.cost_impact}</p>
                      </div>
                    )}
                    {approval.timeline_impact && (
                      <div className="bg-[#F4F1EA] rounded-xl p-3">
                        <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">Timeline Impact</p>
                        <p className="text-sm font-semibold text-[#1F2937]">{approval.timeline_impact}</p>
                      </div>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-2">
                      Your Comment (Optional)
                    </label>
                    <textarea
                      value={comments[approval.id] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({ ...prev, [approval.id]: e.target.value }))
                      }
                      placeholder="Add a note or request changes..."
                      rows={2}
                      className="input-field resize-none text-sm"
                    />
                  </div>

                  {/* Action buttons */}
                  {actionDone[approval.id] ? (
                    <div className={`flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold ${
                      actionDone[approval.id] === "approved" ? "bg-emerald-100 text-emerald-700" :
                      actionDone[approval.id] === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-purple-100 text-purple-700"
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {actionDone[approval.id] === "approved" ? "Approved" :
                       actionDone[approval.id] === "rejected" ? "Rejected" :
                       "Change Requested"} — Response sent to TECTA
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAction(approval.id, "approved")}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#1F8A62] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#17775A] transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(approval.id, "change_requested")}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#667085] font-semibold text-sm py-3 rounded-xl hover:bg-[#EDE8E0] transition-colors border border-[#EDE8E0]"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Request Change
                      </button>
                      <button
                        onClick={() => handleAction(approval.id, "rejected")}
                        className="flex items-center justify-center gap-2 bg-red-50 text-[#C64B4B] font-semibold text-sm py-3 px-4 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decided */}
      {decided.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[#667085] uppercase tracking-wider mb-4">
            Previously Decided
          </h2>
          <div className="space-y-3">
            {decided.map((approval) => (
              <div key={approval.id} className="bg-white border border-[#EDE8E0] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#1F2937]">{approval.title}</p>
                  <p className="text-xs text-[#667085] mt-0.5">{approval.item_type}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                  approval.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                  approval.status === "rejected" ? "bg-red-100 text-red-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {approval.status === "approved" ? "Approved" :
                   approval.status === "rejected" ? "Rejected" :
                   "Change Requested"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pending.length === 0 && decided.length === 0 && (
        <div className="text-center py-12 text-[#667085]">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p>No approvals for this project yet.</p>
        </div>
      )}
    </div>
  );
}
