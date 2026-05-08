"use client";

import { use, useState } from "react";
import { MOCK_MATERIAL_BOARDS } from "@/lib/mock-data";
import { MaterialItem } from "@/lib/types";
import { Layers, CheckCircle, Clock, XCircle, CheckSquare } from "lucide-react";
import { getApprovalStatusColor } from "@/lib/utils";

const COST_CLASS_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  premium: "Premium",
  luxury: "Luxury",
};

export default function MaterialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const board = MOCK_MATERIAL_BOARDS.find((b) => b.project_id === id);
  const [items, setItems] = useState<MaterialItem[]>(board?.items || []);
  const [approvedLocally, setApprovedLocally] = useState<Record<string, string>>({});

  if (!board) return <div className="p-8 text-[#667085]">No material board found.</div>;

  const approvedCount = items.filter((i) => i.approval_status === "approved").length;
  const pendingCount = items.filter((i) => i.approval_status === "pending_approval").length;

  const categories = [...new Set(items.map((i) => i.category))];

  const handleApprove = (itemId: string) => {
    setItems((prev) => prev.map((i) => i.id === itemId ? { ...i, approval_status: "approved" } : i));
    setApprovedLocally((prev) => ({ ...prev, [itemId]: "approved" }));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-3.5 h-3.5 text-[#1F8A62]" />;
      case "pending_approval": return <Clock className="w-3.5 h-3.5 text-[#C58A1C]" />;
      case "rejected": return <XCircle className="w-3.5 h-3.5 text-[#C64B4B]" />;
      default: return <div className="w-3.5 h-3.5 rounded-full bg-[#D8CBB8]" />;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Material Board
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33]">
              Material & Finish Board V{board.board_version}
            </h1>
            <p className="text-[#667085] text-sm mt-1">{board.style_direction}</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${getApprovalStatusColor(board.status)}`}>
            {board.status === "pending_approval" ? "Pending Approval" :
             board.status === "approved" ? "Board Approved" :
             board.status === "draft" ? "Draft" : board.status}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">{approvedCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Items Approved</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
          <p className="text-xs text-amber-600 mt-0.5">Pending Approval</p>
        </div>
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{items.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Total Items</p>
        </div>
      </div>

      {/* Color palette overview */}
      <div className="bg-[#0B1F33] rounded-2xl p-6 mb-6">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-5">
          Colour & Material Palette Overview
        </p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {items.filter((i) => i.color_hex).map((item) => (
            <div key={item.id} className="text-center">
              <div
                className="w-full h-12 rounded-lg mb-2 border border-white/10"
                style={{ backgroundColor: item.color_hex }}
              />
              <p className="text-white/40 text-[9px] leading-tight">{item.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Items by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#2563FF]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085]">{cat}</h2>
          </div>
          <div className="space-y-3">
            {items.filter((i) => i.category === cat).map((item) => (
              <div key={item.id} className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  {/* Swatch */}
                  <div
                    className="w-16 h-16 rounded-xl flex-shrink-0 border border-[#EDE8E0]"
                    style={{ backgroundColor: item.color_hex || "#F4F1EA" }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-bold text-[#0B1F33] text-sm">{item.name}</h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {statusIcon(item.approval_status)}
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getApprovalStatusColor(item.approval_status)}`}>
                          {item.approval_status === "approved" ? "Approved" :
                           item.approval_status === "pending_approval" ? "Pending" :
                           item.approval_status === "draft" ? "Draft" :
                           item.approval_status === "rejected" ? "Rejected" : item.approval_status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#667085] mb-2 leading-relaxed">{item.description}</p>
                    {item.technical_note && (
                      <p className="text-[10px] text-[#667085] bg-[#F4F1EA] px-2.5 py-1.5 rounded-lg mb-2">
                        <span className="font-semibold">Technical: </span>{item.technical_note}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] bg-[#F4F1EA] text-[#667085] px-2 py-0.5 rounded-full">
                        {COST_CLASS_LABELS[item.cost_class]}
                      </span>
                      {item.supplier && (
                        <span className="text-[10px] text-[#667085]">Supplier: {item.supplier}</span>
                      )}
                    </div>
                  </div>

                  {/* Approve button (for pending items) */}
                  {item.approval_status === "pending_approval" && !approvedLocally[item.id] && (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="flex items-center gap-1.5 bg-[#1F8A62] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#17775A] transition-colors flex-shrink-0"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
