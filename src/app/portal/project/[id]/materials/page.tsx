"use client";

import { use, useState } from "react";
import { MOCK_ROOM_MATERIAL_BOARDS } from "@/lib/mock-data";
import {
  ProjectRoom,
  RoomSurface,
  MaterialOption,
} from "@/lib/types";
import {
  CheckCircle,
  Sparkles,
  X,
  RotateCcw,
  ZoomIn,
  Clock,
  Info,
  Upload,
} from "lucide-react";

const COST_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid",
  premium: "Premium",
  luxury: "Luxury",
};

const STATUS_PILL = {
  approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending_approval: "bg-amber-50 text-amber-700 border border-amber-200",
  draft: "bg-gray-50 text-gray-500 border border-gray-200",
  rejected: "bg-red-50 text-red-700 border border-red-200",
};

// ─── AI Preview Modal ─────────────────────────────────────────────────────────
function AIPreviewModal({
  room,
  surface,
  option,
  onClose,
  onConfirm,
}: {
  room: ProjectRoom;
  surface: RoomSurface;
  option: MaterialOption;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [phase, setPhase] = useState<"setup" | "generating" | "result">("setup");

  const placementLabel: Record<string, string> = {
    floor: "Boden",
    wall: "Wand",
    ceiling: "Decke",
    fronts: "Küchenfronten",
    worktop: "Arbeitsplatte",
    fixture: "Sanitärobjekt",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8E0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2563FF]" />
            </div>
            <div>
              <p className="text-[10px] text-[#667085] uppercase tracking-wider">
                KI-Materialvorschau
              </p>
              <p className="font-bold text-[#0B1F33] text-sm">
                {room.emoji} {room.name} — {surface.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4F1EA] flex items-center justify-center hover:bg-[#EDE8E0] transition-colors"
          >
            <X className="w-4 h-4 text-[#667085]" />
          </button>
        </div>

        <div className="p-5">
          {/* Setup */}
          {phase === "setup" && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-2">
                    Aktueller Raum
                  </p>
                  <div className="rounded-xl overflow-hidden aspect-video bg-[#F4F1EA]">
                    {room.current_photo ? (
                      <img
                        src={room.current_photo}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-[#D8CBB8]" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-2">
                    Ausgewähltes Material
                  </p>
                  <div className="rounded-xl overflow-hidden aspect-video bg-[#F4F1EA]">
                    {option.texture_image ? (
                      <img
                        src={option.texture_image}
                        alt={option.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: option.color_hex || "#F4F1EA" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F1EA] rounded-xl p-3.5 mb-4">
                <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-1">
                  KI-Anweisung
                </p>
                <p className="text-sm text-[#1F2937]">
                  <span className="font-semibold">{option.name}</span> als{" "}
                  {placementLabel[surface.placement] || surface.placement} im{" "}
                  <span className="font-semibold">{room.name}</span> applizieren.
                </p>
              </div>

              <button
                onClick={() => {
                  setPhase("generating");
                  setTimeout(() => setPhase("result"), 3200);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#2563FF] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1D50D4] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                KI-Vorschau generieren
              </button>
            </>
          )}

          {/* Generating */}
          {phase === "generating" && (
            <div className="py-10 text-center">
              <div className="w-12 h-12 border-4 border-[#EDE8E0] border-t-[#2563FF] rounded-full mx-auto mb-5 animate-spin" />
              <p className="font-bold text-[#0B1F33] mb-1">Vorschau wird generiert…</p>
              <p className="text-[#667085] text-sm mb-6">
                KI verarbeitet Raum + Material + Platzierung
              </p>
              <div className="space-y-2 text-left max-w-[220px] mx-auto">
                {[
                  { label: "Raumbild analysiert", done: true },
                  { label: "Materialtextur extrahiert", done: true },
                  { label: "Rendering wird erstellt…", done: false },
                ].map((step) => (
                  <div key={step.label} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        step.done
                          ? "bg-[#1F8A62]"
                          : "bg-[#2563FF] animate-pulse"
                      }`}
                    />
                    <span
                      className={step.done ? "text-[#1F2937]" : "text-[#2563FF] font-medium"}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {phase === "result" && option.ai_result_image && (
            <>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#1F8A62]" />
                <p className="text-xs font-semibold text-[#1F8A62]">
                  Vorschau generiert
                </p>
              </div>
              <div className="rounded-xl overflow-hidden mb-3">
                <img
                  src={option.ai_result_image}
                  alt="KI Vorschau"
                  className="w-full object-cover max-h-64"
                />
              </div>
              <p className="text-[10px] text-[#667085] mb-4">
                KI-generierte Vorschau — {option.name} als{" "}
                {placementLabel[surface.placement] || surface.placement} im {room.name}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPhase("setup")}
                  className="flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#1F2937] font-semibold text-sm py-3 rounded-xl hover:bg-[#EDE8E0] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Anderes Material
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 bg-[#1F8A62] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#17775A] transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Material wählen
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Surface Card ─────────────────────────────────────────────────────────────
function SurfaceCard({
  surface,
  room,
  selections,
  onSelect,
  onPreview,
}: {
  surface: RoomSurface;
  room: ProjectRoom;
  selections: Record<string, string>;
  onSelect: (surfaceId: string, optionId: string) => void;
  onPreview: (room: ProjectRoom, surface: RoomSurface, option: MaterialOption) => void;
}) {
  const selectedId =
    selections[surface.id] ?? surface.selected_option_id ?? null;
  const selectedOption = surface.options.find((o) => o.id === selectedId);

  const statusCls =
    STATUS_PILL[surface.approval_status as keyof typeof STATUS_PILL] ||
    STATUS_PILL.draft;

  return (
    <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
      {/* Surface header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4F1EA]">
        <div>
          <h3 className="font-bold text-[#0B1F33] text-sm">{surface.name}</h3>
          <p className="text-[#667085] text-xs mt-0.5">
            {surface.options.length} Optionen verfügbar
          </p>
        </div>
        <div className="flex items-center gap-2">
          {surface.approval_status === "approved" ? (
            <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusCls}`}>
              <CheckCircle className="w-3 h-3" /> Freigegeben
            </span>
          ) : surface.approval_status === "pending_approval" ? (
            <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusCls}`}>
              <Clock className="w-3 h-3" /> Ausstehend
            </span>
          ) : (
            <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusCls}`}>
              <Info className="w-3 h-3" /> Entwurf
            </span>
          )}
        </div>
      </div>

      {/* Options grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {surface.options.map((option) => {
            const isSelected = option.id === selectedId;
            return (
              <button
                key={option.id}
                onClick={() => onSelect(surface.id, option.id)}
                className={`relative rounded-xl overflow-hidden border-2 text-left transition-all group ${
                  isSelected
                    ? "border-[#2563FF] shadow-md shadow-[#2563FF]/15 scale-[1.01]"
                    : "border-[#EDE8E0] hover:border-[#D8CBB8]"
                }`}
              >
                {/* Material visual */}
                <div className="relative aspect-square bg-[#F4F1EA]">
                  {option.texture_image ? (
                    <img
                      src={option.texture_image}
                      alt={option.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: option.color_hex || "#F4F1EA" }}
                    />
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#2563FF]/10 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#2563FF] rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-1.5 right-1.5">
                    <span className="text-[9px] font-semibold bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-full text-[#667085]">
                      {COST_LABELS[option.cost_class]}
                    </span>
                  </div>
                  {option.price_per_sqm && (
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="text-[9px] font-bold bg-[#0B1F33]/80 text-white px-1.5 py-0.5 rounded-full">
                        €{option.price_per_sqm}/m²
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="bg-white p-2.5">
                  <p className="text-xs font-semibold text-[#0B1F33] leading-snug line-clamp-2 mb-0.5">
                    {option.name}
                  </p>
                  {option.supplier && (
                    <p className="text-[10px] text-[#667085] truncate">
                      {option.supplier}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected option detail + KI preview */}
        {selectedOption && (
          <div className="mt-3 bg-[#F4F1EA] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0B1F33] mb-1">
                  ✓ {selectedOption.name}
                </p>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {selectedOption.description}
                </p>
                {selectedOption.technical_note && (
                  <p className="text-[10px] text-[#667085] mt-1.5 italic">
                    {selectedOption.technical_note}
                  </p>
                )}
              </div>
              {selectedOption.ai_result_image && (
                <button
                  onClick={() => onPreview(room, surface, selectedOption)}
                  className="flex items-center gap-1.5 bg-[#2563FF] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#1D50D4] transition-colors flex-shrink-0 whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  KI Vorschau
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MaterialsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const board = MOCK_ROOM_MATERIAL_BOARDS.find((b) => b.project_id === id);

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [previewState, setPreviewState] = useState<{
    room: ProjectRoom;
    surface: RoomSurface;
    option: MaterialOption;
  } | null>(null);

  if (!board)
    return (
      <div className="p-8 text-[#667085]">Kein Materialboard gefunden.</div>
    );

  const rooms = board.rooms;
  const activeRoom = rooms.find((r) => r.id === activeRoomId) ?? rooms[0];

  const allSurfaces = rooms.flatMap((r) => r.surfaces);
  const approvedCount = allSurfaces.filter(
    (s) => s.approval_status === "approved"
  ).length;
  const pendingCount = allSurfaces.filter(
    (s) => s.approval_status === "pending_approval"
  ).length;

  const handleSelect = (surfaceId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [surfaceId]: optionId }));
  };

  const handlePreview = (
    room: ProjectRoom,
    surface: RoomSurface,
    option: MaterialOption
  ) => {
    setPreviewState({ room, surface, option });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page header */}
      <div className="px-6 md:px-8 py-5 border-b border-[#EDE8E0] bg-white">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-1">
          Materialboard
        </p>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#0B1F33]">
              Material & Oberflächen · V{board.board_version}
            </h1>
            <p className="text-[#667085] text-sm mt-0.5">
              {board.style_direction} · {rooms.length} Räume ·{" "}
              {approvedCount} freigegeben · {pendingCount} ausstehend
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Freigabe ausstehend
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-emerald-700">{approvedCount}</p>
            <p className="text-[10px] text-emerald-600">Freigegeben</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-amber-700">{pendingCount}</p>
            <p className="text-[10px] text-amber-600">Ausstehend</p>
          </div>
          <div className="bg-white border border-[#EDE8E0] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-[#0B1F33]">
              {allSurfaces.length}
            </p>
            <p className="text-[10px] text-[#667085]">Oberflächen</p>
          </div>
        </div>
      </div>

      {/* Room tabs */}
      <div className="px-6 md:px-8 py-3 border-b border-[#EDE8E0] bg-white overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {rooms.map((room) => {
            const roomApproved = room.surfaces.filter(
              (s) => s.approval_status === "approved"
            ).length;
            const isActive = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#0B1F33] text-white"
                    : "bg-[#F4F1EA] text-[#667085] hover:bg-[#EDE8E0]"
                }`}
              >
                <span>{room.emoji}</span>
                <span>{room.name}</span>
                {room.area_sqm && (
                  <span
                    className={`text-[10px] ${
                      isActive ? "text-white/40" : "text-[#D8CBB8]"
                    }`}
                  >
                    {room.area_sqm} m²
                  </span>
                )}
                {roomApproved === room.surfaces.length &&
                  room.surfaces.length > 0 && (
                    <CheckCircle
                      className={`w-3.5 h-3.5 ${
                        isActive ? "text-emerald-400" : "text-[#1F8A62]"
                      }`}
                    />
                  )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room content */}
      <div className="flex-1 p-6 md:p-8 max-w-4xl space-y-5">
        {/* Room photo */}
        {activeRoom.current_photo && (
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={activeRoom.current_photo}
              alt={activeRoom.name}
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5">
              <p className="text-white font-bold text-lg">
                {activeRoom.emoji} {activeRoom.name}
              </p>
              {activeRoom.area_sqm && (
                <p className="text-white/60 text-sm">
                  {activeRoom.area_sqm} m² · {activeRoom.surfaces.length}{" "}
                  Oberflächen
                </p>
              )}
            </div>
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 text-white text-xs">
              <ZoomIn className="w-3 h-3" />
              Aktueller Zustand
            </div>
          </div>
        )}

        {/* Surfaces */}
        {activeRoom.surfaces.map((surface) => (
          <SurfaceCard
            key={surface.id}
            surface={surface}
            room={activeRoom}
            selections={selections}
            onSelect={handleSelect}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* AI Preview Modal */}
      {previewState && (
        <AIPreviewModal
          room={previewState.room}
          surface={previewState.surface}
          option={previewState.option}
          onClose={() => setPreviewState(null)}
          onConfirm={() => {
            handleSelect(previewState.surface.id, previewState.option.id);
          }}
        />
      )}
    </div>
  );
}
