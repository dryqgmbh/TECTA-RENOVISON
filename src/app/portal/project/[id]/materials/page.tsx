"use client";

import { use, useState } from "react";
import { MOCK_MATERIAL_BOARDS } from "@/lib/mock-data";
import { MaterialItem } from "@/lib/types";
import { CheckCircle, Clock, XCircle, CheckSquare, Info } from "lucide-react";

const COST_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  premium: "Premium",
  luxury: "Luxury",
};

const STATUS_CONFIG = {
  approved: {
    label: "Freigegeben",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending_approval: {
    label: "Ausstehend",
    icon: <Clock className="w-3.5 h-3.5" />,
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  rejected: {
    label: "Abgelehnt",
    icon: <XCircle className="w-3.5 h-3.5" />,
    classes: "bg-red-50 text-red-700 border-red-200",
  },
  draft: {
    label: "Entwurf",
    icon: <Info className="w-3.5 h-3.5" />,
    classes: "bg-gray-50 text-gray-500 border-gray-200",
  },
};

export default function MaterialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const board = MOCK_MATERIAL_BOARDS.find((b) => b.project_id === id);
  const [items, setItems] = useState<MaterialItem[]>(board?.items || []);
  const [selected, setSelected] = useState<MaterialItem | null>(null);

  if (!board)
    return (
      <div className="p-8 text-[#667085]">Kein Materialboard gefunden.</div>
    );

  const approvedCount = items.filter((i) => i.approval_status === "approved").length;
  const pendingCount = items.filter((i) => i.approval_status === "pending_approval").length;

  const handleApprove = (itemId: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, approval_status: "approved" } : i
      )
    );
    if (selected?.id === itemId)
      setSelected((prev) => prev ? { ...prev, approval_status: "approved" } : null);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Materialboard
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33]">
              Material & Oberflächen · V{board.board_version}
            </h1>
            <p className="text-[#667085] text-sm mt-1">{board.style_direction}</p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
              board.status === "approved"
                ? STATUS_CONFIG.approved.classes
                : board.status === "pending_approval"
                ? STATUS_CONFIG.pending_approval.classes
                : STATUS_CONFIG.draft.classes
            }`}
          >
            {board.status === "approved"
              ? "Board freigegeben"
              : board.status === "pending_approval"
              ? "Freigabe ausstehend"
              : "Entwurf"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-700">{approvedCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Freigegeben</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
          <p className="text-xs text-amber-600 mt-0.5">Ausstehend</p>
        </div>
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{items.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Positionen gesamt</p>
        </div>
      </div>

      {/* Board grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {items.map((item) => {
          const cfg =
            STATUS_CONFIG[item.approval_status as keyof typeof STATUS_CONFIG] ||
            STATUS_CONFIG.draft;
          return (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all text-left ${
                selected?.id === item.id
                  ? "border-[#2563FF] shadow-lg shadow-[#2563FF]/10"
                  : "border-transparent hover:border-[#EDE8E0]"
              }`}
            >
              {/* Image */}
              <div className="relative aspect-square bg-[#F4F1EA]">
                {item.texture_image ? (
                  <img
                    src={item.texture_image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: item.color_hex || "#F4F1EA" }}
                  />
                )}
                {/* Status badge */}
                <div
                  className={`absolute top-2 right-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border backdrop-blur-sm ${cfg.classes}`}
                >
                  {cfg.icon}
                  {cfg.label}
                </div>
                {/* Pending overlay */}
                {item.approval_status === "pending_approval" && (
                  <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/0 transition-colors" />
                )}
              </div>

              {/* Info */}
              <div className="bg-white p-3">
                <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                  {item.category}
                </p>
                <p className="text-xs font-semibold text-[#0B1F33] leading-snug line-clamp-2">
                  {item.name}
                </p>
                {item.supplier && (
                  <p className="text-[10px] text-[#667085] mt-1 truncate">
                    {item.supplier}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video md:aspect-auto min-h-[240px] bg-[#F4F1EA]">
              {selected.texture_image ? (
                <img
                  src={selected.texture_image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: selected.color_hex || "#F4F1EA" }}
                />
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                {selected.color_hex && (
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: selected.color_hex }}
                  />
                )}
                <span className="bg-white/90 backdrop-blur text-[10px] font-semibold text-[#667085] px-2 py-0.5 rounded-full">
                  {COST_LABELS[selected.cost_class]}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">
                    {selected.category}
                  </p>
                  <h3 className="font-bold text-[#0B1F33] text-base leading-snug">
                    {selected.name}
                  </h3>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1.5 rounded-full border flex-shrink-0 ${
                    STATUS_CONFIG[
                      selected.approval_status as keyof typeof STATUS_CONFIG
                    ]?.classes || STATUS_CONFIG.draft.classes
                  }`}
                >
                  {STATUS_CONFIG[selected.approval_status as keyof typeof STATUS_CONFIG]?.icon}
                  {STATUS_CONFIG[selected.approval_status as keyof typeof STATUS_CONFIG]?.label}
                </span>
              </div>

              <p className="text-sm text-[#667085] leading-relaxed mb-4">
                {selected.description}
              </p>

              {selected.technical_note && (
                <div className="bg-[#F4F1EA] rounded-lg p-3 mb-4">
                  <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                    Technische Hinweise
                  </p>
                  <p className="text-xs text-[#1F2937] leading-relaxed">
                    {selected.technical_note}
                  </p>
                </div>
              )}

              {selected.supplier && (
                <p className="text-xs text-[#667085] mb-4">
                  <span className="font-semibold">Lieferant:</span>{" "}
                  {selected.supplier}
                </p>
              )}

              {selected.approval_status === "pending_approval" && (
                <button
                  onClick={() => handleApprove(selected.id)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1F8A62] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#17775A] transition-colors"
                >
                  <CheckSquare className="w-4 h-4" />
                  Material freigeben
                </button>
              )}

              {selected.approval_status === "approved" && (
                <div className="flex items-center gap-2 text-sm text-[#1F8A62] font-semibold bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4" />
                  Material freigegeben
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
