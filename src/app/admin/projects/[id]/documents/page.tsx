"use client";

import { use, useState } from "react";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { FolderOpen, Download, FileText, File, Camera, ClipboardList, Upload } from "lucide-react";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  quote: <FileText className="w-4 h-4 text-[#2563FF]" />,
  invoice: <FileText className="w-4 h-4 text-[#C58A1C]" />,
  report: <ClipboardList className="w-4 h-4 text-[#1F8A62]" />,
  plan: <File className="w-4 h-4 text-[#667085]" />,
  photo: <Camera className="w-4 h-4 text-[#667085]" />,
  contract: <FileText className="w-4 h-4 text-[#C64B4B]" />,
  material_spec: <File className="w-4 h-4 text-[#2563FF]" />,
  vision_board: <File className="w-4 h-4 text-[#2563FF]" />,
  weekly_report: <ClipboardList className="w-4 h-4 text-[#1F8A62]" />,
  handover: <File className="w-4 h-4 text-[#1F8A62]" />,
};

const TYPE_LABELS: Record<string, string> = {
  quote: "Contractor Quote",
  invoice: "Invoice",
  report: "Report",
  plan: "Floor Plan",
  photo: "Photo",
  contract: "Contract",
  material_spec: "Material Spec",
  vision_board: "Vision Board",
  weekly_report: "Weekly Report",
  handover: "Handover Report",
};

export default function DocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filter, setFilter] = useState("all");
  const docs = MOCK_DOCUMENTS.filter((d) => d.project_id === id);

  const types = ["all", ...new Set(docs.map((d) => d.type))];
  const filtered = filter === "all" ? docs : docs.filter((d) => d.type === filter);

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Document Center
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33]">Project Documents</h1>
            <p className="text-[#667085] text-sm mt-1">{docs.length} documents stored</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Documents", value: docs.length, color: "text-[#0B1F33]", bg: "bg-white" },
          { label: "Reports", value: docs.filter((d) => d.type === "weekly_report").length, color: "text-[#1F8A62]", bg: "bg-emerald-50" },
          { label: "Quotes", value: docs.filter((d) => d.type === "quote").length, color: "text-[#2563FF]", bg: "bg-[#EEF2FF]" },
          { label: "Contracts", value: docs.filter((d) => d.type === "contract").length, color: "text-[#C64B4B]", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border border-[#EDE8E0] rounded-xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#667085] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === type
                ? "bg-[#2563FF] text-white"
                : "bg-white border border-[#EDE8E0] text-[#667085] hover:bg-[#F4F1EA]"
            }`}
          >
            {type === "all" ? "All" : TYPE_LABELS[type] || type}
          </button>
        ))}
      </div>

      {/* Documents */}
      <div className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden">
        {filtered.map((doc, i) => (
          <div
            key={doc.id}
            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#F4F1EA] transition-colors ${
              i < filtered.length - 1 ? "border-b border-[#F4F1EA]" : ""
            }`}
          >
            <div className="w-9 h-9 bg-[#F4F1EA] rounded-lg flex items-center justify-center flex-shrink-0">
              {TYPE_ICONS[doc.type] || <File className="w-4 h-4 text-[#667085]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1F2937] truncate">{doc.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-[#667085] bg-[#F4F1EA] px-2 py-0.5 rounded">
                  {TYPE_LABELS[doc.type] || doc.type}
                </span>
                <span className="text-[10px] text-[#667085]">{formatDate(doc.created_at)}</span>
                {doc.file_size && (
                  <span className="text-[10px] text-[#D8CBB8]">{doc.file_size}</span>
                )}
              </div>
            </div>
            <p className="text-xs text-[#667085] flex-shrink-0 hidden md:block">{doc.uploaded_by}</p>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#2563FF] bg-[#EEF2FF] px-3 py-2 rounded-lg hover:bg-[#C7D2FE] transition-colors flex-shrink-0">
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[#667085]">
            <FolderOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p>No documents found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
