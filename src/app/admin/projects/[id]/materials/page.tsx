"use client";

import { use, useState } from "react";
import { MOCK_MATERIAL_BOARDS } from "@/lib/mock-data";
import { MaterialItem } from "@/lib/types";
import { Layers, Plus, Save } from "lucide-react";

const COST_CLASS_LABELS: Record<string, string> = {
  budget: "Budget", mid: "Mid-Range", premium: "Premium", luxury: "Luxury",
};

export default function AdminMaterialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const board = MOCK_MATERIAL_BOARDS.find((b) => b.project_id === id);
  const [items, setItems] = useState<MaterialItem[]>(board?.items || []);
  const [saved, setSaved] = useState(false);

  if (!board) return <div className="p-8 text-[#667085]">No material board found.</div>;

  const handleStatusChange = (itemId: string, newStatus: MaterialItem["approval_status"]) => {
    setItems((prev) => prev.map((i) => i.id === itemId ? { ...i, approval_status: newStatus } : i));
  };

  const categories = [...new Set(items.map((i) => i.category))];
  const approvedCount = items.filter((i) => i.approval_status === "approved").length;
  const pendingCount = items.filter((i) => i.approval_status === "pending_approval").length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">Material Board — Admin</p>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Material & Finish Board V{board.board_version}</h1>
          <p className="text-[#667085] text-sm mt-1">{board.style_direction}</p>
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`flex items-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors ${saved ? "bg-[#1F8A62] text-white" : "bg-[#2563FF] text-white hover:bg-[#1D50D4]"}`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Board"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">{approvedCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Approved</p>
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

      <div className="bg-[#0B1F33] rounded-2xl p-6 mb-6">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Palette Overview</p>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {items.filter((i) => i.color_hex).map((item) => (
            <div key={item.id} className="text-center">
              <div className="w-full h-10 rounded-lg mb-1.5 border border-white/10" style={{ backgroundColor: item.color_hex }} />
              <p className="text-white/40 text-[9px]">{item.category}</p>
            </div>
          ))}
        </div>
      </div>

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
                  <div className="w-14 h-14 rounded-xl flex-shrink-0 border border-[#EDE8E0]"
                    style={{ backgroundColor: item.color_hex || "#F4F1EA" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-bold text-[#0B1F33] text-sm">{item.name}</h3>
                      <select
                        value={item.approval_status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as MaterialItem["approval_status"])}
                        className="text-xs border border-[#EDE8E0] rounded-lg px-2 py-1 bg-white flex-shrink-0"
                      >
                        <option value="draft">Draft</option>
                        <option value="pending_approval">Send for Approval</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <p className="text-xs text-[#667085] mb-1.5 leading-relaxed">{item.description}</p>
                    {item.technical_note && (
                      <p className="text-[10px] text-[#667085] bg-[#F4F1EA] px-2.5 py-1.5 rounded-lg">
                        <span className="font-semibold">Technical: </span>{item.technical_note}
                      </p>
                    )}
                    <span className="inline-block mt-2 text-[10px] bg-[#F4F1EA] text-[#667085] px-2 py-0.5 rounded-full">
                      {COST_CLASS_LABELS[item.cost_class]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
