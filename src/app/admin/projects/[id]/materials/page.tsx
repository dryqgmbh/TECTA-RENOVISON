"use client";

import { use, useState } from "react";
import { MOCK_MATERIAL_BOARDS } from "@/lib/mock-data";
import { MaterialItem } from "@/lib/types";
import { Save, CheckCircle, Clock, XCircle, Info } from "lucide-react";

const COST_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid-Range",
  premium: "Premium",
  luxury: "Luxury",
};

const STATUS_OPTIONS: { value: MaterialItem["approval_status"]; label: string }[] = [
  { value: "draft", label: "Entwurf" },
  { value: "pending_approval", label: "Zur Freigabe" },
  { value: "approved", label: "Freigegeben" },
  { value: "rejected", label: "Abgelehnt" },
];

const STATUS_ICON: Record<string, React.ReactNode> = {
  approved: <CheckCircle className="w-3.5 h-3.5 text-[#1F8A62]" />,
  pending_approval: <Clock className="w-3.5 h-3.5 text-[#C58A1C]" />,
  rejected: <XCircle className="w-3.5 h-3.5 text-[#C64B4B]" />,
  draft: <Info className="w-3.5 h-3.5 text-[#667085]" />,
};

export default function AdminMaterialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const board = MOCK_MATERIAL_BOARDS.find((b) => b.project_id === id);
  const [items, setItems] = useState<MaterialItem[]>(board?.items || []);
  const [saved, setSaved] = useState(false);
  const [selected, setSelected] = useState<MaterialItem | null>(null);

  if (!board)
    return (
      <div className="p-8 text-[#667085]">Kein Materialboard gefunden.</div>
    );

  const handleStatusChange = (
    itemId: string,
    newStatus: MaterialItem["approval_status"]
  ) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, approval_status: newStatus } : i
      )
    );
    if (selected?.id === itemId)
      setSelected((prev) => prev ? { ...prev, approval_status: newStatus } : null);
  };

  const approvedCount = items.filter((i) => i.approval_status === "approved").length;
  const pendingCount = items.filter((i) => i.approval_status === "pending_approval").length;

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
            Materialboard — Admin
          </p>
          <h1 className="text-2xl font-bold text-[#0B1F33]">
            Material & Oberflächen V{board.board_version}
          </h1>
          <p className="text-[#667085] text-sm mt-1">{board.style_direction}</p>
        </div>
        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className={`flex items-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors ${
            saved
              ? "bg-[#1F8A62] text-white"
              : "bg-[#2563FF] text-white hover:bg-[#1D50D4]"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Gespeichert!" : "Board speichern"}
        </button>
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
          <p className="text-xs text-[#667085] mt-0.5">Gesamt</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className={`group relative rounded-2xl overflow-hidden border-2 transition-all text-left ${
              selected?.id === item.id
                ? "border-[#2563FF] shadow-lg"
                : "border-transparent hover:border-[#EDE8E0]"
            }`}
          >
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
              <div className="absolute top-2 right-2">
                {STATUS_ICON[item.approval_status]}
              </div>
            </div>
            <div className="bg-white p-3">
              <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-0.5">
                {item.category}
              </p>
              <p className="text-xs font-semibold text-[#0B1F33] leading-snug line-clamp-2">
                {item.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Edit panel */}
      {selected && (
        <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
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

            <div className="p-6">
              <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">
                {selected.category}
              </p>
              <h3 className="font-bold text-[#0B1F33] text-base mb-1 leading-snug">
                {selected.name}
              </h3>
              <p className="text-sm text-[#667085] leading-relaxed mb-4">
                {selected.description}
              </p>
              {selected.technical_note && (
                <div className="bg-[#F4F1EA] rounded-lg p-3 mb-4">
                  <p className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">
                    Technische Hinweise
                  </p>
                  <p className="text-xs text-[#1F2937]">{selected.technical_note}</p>
                </div>
              )}
              {selected.supplier && (
                <p className="text-xs text-[#667085] mb-4">
                  <span className="font-semibold">Lieferant:</span> {selected.supplier}
                </p>
              )}
              <div>
                <p className="text-xs font-semibold text-[#667085] mb-2">
                  Status ändern:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleStatusChange(selected.id, opt.value)}
                      className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                        selected.approval_status === opt.value
                          ? "bg-[#2563FF] text-white border-[#2563FF]"
                          : "bg-white text-[#667085] border-[#EDE8E0] hover:border-[#2563FF] hover:text-[#2563FF]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
