"use client";

import { use, useState } from "react";
import { MOCK_ROOM_MATERIAL_BOARDS } from "@/lib/mock-data";
import { ProjectRoom, RoomSurface, MaterialOption } from "@/lib/types";
import {
  CheckCircle,
  Clock,
  Info,
  Save,
  Upload,
  Plus,
  Sparkles,
  X,
  RotateCcw,
} from "lucide-react";

const COST_LABELS: Record<string, string> = {
  budget: "Budget",
  mid: "Mid",
  premium: "Premium",
  luxury: "Luxury",
};

const STATUS_OPTIONS = [
  { value: "draft", label: "Entwurf" },
  { value: "pending_approval", label: "Zur Freigabe senden" },
  { value: "approved", label: "Freigegeben" },
  { value: "rejected", label: "Abgelehnt" },
] as const;

// ─── AI Preview (read-only admin view) ───────────────────────────────────────
function AdminAIModal({
  room,
  surface,
  option,
  onClose,
}: {
  room: ProjectRoom;
  surface: RoomSurface;
  option: MaterialOption;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"setup" | "generating" | "result">("setup");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8E0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2563FF]" />
            </div>
            <div>
              <p className="text-[10px] text-[#667085] uppercase tracking-wider">Admin — KI Vorschau</p>
              <p className="font-bold text-[#0B1F33] text-sm">{room.emoji} {room.name} · {surface.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F4F1EA] flex items-center justify-center hover:bg-[#EDE8E0]">
            <X className="w-4 h-4 text-[#667085]" />
          </button>
        </div>
        <div className="p-5">
          {phase === "setup" && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-2">Aktueller Raum</p>
                  <div className="rounded-xl overflow-hidden aspect-video bg-[#F4F1EA]">
                    {room.current_photo
                      ? <img src={room.current_photo} alt={room.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center"><Upload className="w-5 h-5 text-[#D8CBB8]" /></div>}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#667085] uppercase tracking-wider mb-2">Material</p>
                  <div className="rounded-xl overflow-hidden aspect-video bg-[#F4F1EA]">
                    {option.texture_image
                      ? <img src={option.texture_image} alt={option.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full" style={{ backgroundColor: option.color_hex || "#F4F1EA" }} />}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setPhase("generating"); setTimeout(() => setPhase("result"), 3000); }}
                className="w-full flex items-center justify-center gap-2 bg-[#2563FF] text-white font-semibold py-3 rounded-xl hover:bg-[#1D50D4] transition-colors"
              >
                <Sparkles className="w-4 h-4" /> KI-Vorschau generieren
              </button>
            </>
          )}
          {phase === "generating" && (
            <div className="py-10 text-center">
              <div className="w-10 h-10 border-4 border-[#EDE8E0] border-t-[#2563FF] rounded-full mx-auto mb-4 animate-spin" />
              <p className="font-bold text-[#0B1F33] mb-1">Generiere Vorschau…</p>
              <p className="text-[#667085] text-sm">Raum + Material + Platzierung werden verarbeitet</p>
            </div>
          )}
          {phase === "result" && option.ai_result_image && (
            <>
              <div className="rounded-xl overflow-hidden mb-3">
                <img src={option.ai_result_image} alt="KI Vorschau" className="w-full object-cover max-h-60" />
              </div>
              <p className="text-[10px] text-[#667085] mb-4">KI-Vorschau: {option.name} in {room.name}</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPhase("setup")} className="flex items-center justify-center gap-2 bg-[#F4F1EA] text-[#1F2937] font-semibold text-sm py-2.5 rounded-xl hover:bg-[#EDE8E0]">
                  <RotateCcw className="w-3.5 h-3.5" /> Neu
                </button>
                <button onClick={onClose} className="flex items-center justify-center gap-2 bg-[#0B1F33] text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-[#1F2937]">
                  Schließen
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminMaterialsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const board = MOCK_ROOM_MATERIAL_BOARDS.find((b) => b.project_id === id);

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, RoomSurface["approval_status"]>>({});
  const [saved, setSaved] = useState(false);
  const [previewState, setPreviewState] = useState<{
    room: ProjectRoom; surface: RoomSurface; option: MaterialOption;
  } | null>(null);

  if (!board) return <div className="p-8 text-[#667085]">Kein Materialboard gefunden.</div>;

  const rooms = board.rooms;
  const activeRoom = rooms.find((r) => r.id === activeRoomId) ?? rooms[0];

  const getSurfaceStatus = (surface: RoomSurface) =>
    statuses[surface.id] ?? surface.approval_status;

  const allSurfaces = rooms.flatMap((r) => r.surfaces);
  const approvedCount = allSurfaces.filter((s) => getSurfaceStatus(s) === "approved").length;
  const pendingCount = allSurfaces.filter((s) => getSurfaceStatus(s) === "pending_approval").length;

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-8 py-5 border-b border-[#EDE8E0] bg-white">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-1">Materialboard — Admin</p>
            <h1 className="text-xl font-bold text-[#0B1F33]">Material & Oberflächen V{board.board_version}</h1>
            <p className="text-[#667085] text-sm mt-0.5">{board.style_direction} · {rooms.length} Räume</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl border border-[#EDE8E0] bg-white text-[#667085] hover:bg-[#F4F1EA] transition-colors">
              <Plus className="w-4 h-4" /> Raum hinzufügen
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors ${saved ? "bg-[#1F8A62] text-white" : "bg-[#2563FF] text-white hover:bg-[#1D50D4]"}`}
            >
              <Save className="w-4 h-4" />
              {saved ? "Gespeichert!" : "Speichern"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-emerald-700">{approvedCount}</p>
            <p className="text-[10px] text-emerald-600">Freigegeben</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-amber-700">{pendingCount}</p>
            <p className="text-[10px] text-amber-600">Ausstehend</p>
          </div>
          <div className="bg-white border border-[#EDE8E0] rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-[#0B1F33]">{allSurfaces.length}</p>
            <p className="text-[10px] text-[#667085]">Oberflächen</p>
          </div>
        </div>
      </div>

      {/* Room tabs */}
      <div className="px-6 md:px-8 py-3 border-b border-[#EDE8E0] bg-white overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {rooms.map((room) => {
            const isActive = activeRoom.id === room.id;
            return (
              <button key={room.id} onClick={() => setActiveRoomId(room.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${isActive ? "bg-[#0B1F33] text-white" : "bg-[#F4F1EA] text-[#667085] hover:bg-[#EDE8E0]"}`}
              >
                <span>{room.emoji}</span>
                <span>{room.name}</span>
                {room.area_sqm && <span className={`text-[10px] ${isActive ? "text-white/40" : "text-[#D8CBB8]"}`}>{room.area_sqm}m²</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room content */}
      <div className="flex-1 p-6 md:p-8 max-w-4xl space-y-5">

        {/* Room photo upload area */}
        <div className="relative rounded-2xl overflow-hidden group">
          {activeRoom.current_photo ? (
            <>
              <img src={activeRoom.current_photo} alt={activeRoom.name} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-[#0B1F33]/50" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center gap-2 bg-white text-[#0B1F33] font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg">
                  <Upload className="w-4 h-4" /> Foto ersetzen
                </button>
              </div>
              <div className="absolute bottom-3 left-4">
                <p className="text-white font-bold">{activeRoom.emoji} {activeRoom.name}</p>
                {activeRoom.area_sqm && <p className="text-white/60 text-xs">{activeRoom.area_sqm} m²</p>}
              </div>
            </>
          ) : (
            <div className="h-32 bg-[#F4F1EA] border-2 border-dashed border-[#D8CBB8] rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#EDE8E0] transition-colors">
              <Upload className="w-6 h-6 text-[#D8CBB8]" />
              <p className="text-sm text-[#667085] font-medium">Raumfoto hochladen</p>
              <p className="text-xs text-[#D8CBB8]">JPG, PNG — für KI-Vorschau</p>
            </div>
          )}
        </div>

        {/* Surfaces */}
        {activeRoom.surfaces.map((surface) => {
          const status = getSurfaceStatus(surface);
          return (
            <div key={surface.id} className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
              {/* Surface header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#F4F1EA]">
                <div>
                  <h3 className="font-bold text-[#0B1F33] text-sm">{surface.name}</h3>
                  <p className="text-[#667085] text-xs mt-0.5">{surface.options.length} Optionen</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={status}
                    onChange={(e) => setStatuses((prev) => ({ ...prev, [surface.id]: e.target.value as RoomSurface["approval_status"] }))}
                    className="text-xs border border-[#EDE8E0] rounded-lg px-2.5 py-1.5 bg-white text-[#1F2937] focus:border-[#2563FF] outline-none"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                    status === "approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                    status === "pending_approval" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                    "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}>
                    {status === "approved" ? <><CheckCircle className="w-3 h-3" /> Freigegeben</> :
                     status === "pending_approval" ? <><Clock className="w-3 h-3" /> Ausstehend</> :
                     <><Info className="w-3 h-3" /> Entwurf</>}
                  </span>
                </div>
              </div>

              {/* Options grid */}
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {surface.options.map((option) => {
                    const isSelected = option.id === (surface.selected_option_id ?? null);
                    return (
                      <div key={option.id} className={`relative rounded-xl overflow-hidden border-2 ${isSelected ? "border-[#2563FF]" : "border-[#EDE8E0]"}`}>
                        {/* Image */}
                        <div className="relative aspect-square bg-[#F4F1EA]">
                          {option.texture_image
                            ? <img src={option.texture_image} alt={option.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full" style={{ backgroundColor: option.color_hex || "#F4F1EA" }} />}
                          {isSelected && (
                            <div className="absolute top-2 left-2 bg-[#2563FF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              Eigentümer-Wahl
                            </div>
                          )}
                          <div className="absolute top-2 right-2 bg-white/90 text-[#667085] text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                            {COST_LABELS[option.cost_class]}
                          </div>
                          {option.price_per_sqm && (
                            <div className="absolute bottom-2 left-2 bg-[#0B1F33]/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              €{option.price_per_sqm}/m²
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="bg-white p-2.5">
                          <p className="text-xs font-semibold text-[#0B1F33] leading-snug line-clamp-2 mb-0.5">{option.name}</p>
                          {option.supplier && <p className="text-[10px] text-[#667085] truncate">{option.supplier}</p>}
                          {option.ai_result_image && (
                            <button
                              onClick={() => setPreviewState({ room: activeRoom, surface, option })}
                              className="mt-1.5 flex items-center gap-1 text-[10px] text-[#2563FF] font-semibold hover:underline"
                            >
                              <Sparkles className="w-3 h-3" /> KI Vorschau
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Add option placeholder */}
                  <button className="rounded-xl border-2 border-dashed border-[#EDE8E0] aspect-square flex flex-col items-center justify-center gap-2 hover:border-[#2563FF] hover:bg-[#F4F1EA] transition-all group">
                    <Plus className="w-5 h-5 text-[#D8CBB8] group-hover:text-[#2563FF]" />
                    <span className="text-[10px] text-[#D8CBB8] group-hover:text-[#2563FF] font-medium">Option hinzufügen</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Modal */}
      {previewState && (
        <AdminAIModal
          room={previewState.room}
          surface={previewState.surface}
          option={previewState.option}
          onClose={() => setPreviewState(null)}
        />
      )}
    </div>
  );
}
