"use client";

import { use } from "react";
import { MOCK_WEEKLY_REPORTS } from "@/lib/mock-data";
import { Camera } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PhotosPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reports = MOCK_WEEKLY_REPORTS.filter((r) => r.project_id === id);
  const allPhotos = reports.flatMap((r) => r.photos.map((p) => ({ ...p, week: r.week_number, date: r.report_date })));

  const categories = [...new Set(allPhotos.map((p) => p.category))];

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">
          Photo Log
        </p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Photo Documentation</h1>
        <p className="text-[#667085] text-sm mt-1">
          All site photographs documented by TECTA, organised by week and category.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{allPhotos.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Total Photos</p>
        </div>
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{reports.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Weekly Reports</p>
        </div>
        <div className="bg-white border border-[#EDE8E0] rounded-xl p-4">
          <p className="text-2xl font-bold text-[#0B1F33]">{categories.length}</p>
          <p className="text-xs text-[#667085] mt-0.5">Categories</p>
        </div>
      </div>

      {/* Photo grid by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-4 h-4 text-[#2563FF]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085]">{cat}</h2>
            <span className="text-[10px] bg-[#EEF2FF] text-[#2563FF] px-2 py-0.5 rounded-full font-semibold">
              {allPhotos.filter((p) => p.category === cat).length} photos
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allPhotos
              .filter((p) => p.category === cat)
              .map((photo) => (
                <div key={photo.id} className="group relative rounded-xl overflow-hidden bg-[#F4F1EA] aspect-video">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
                      <p className="text-white/60 text-[10px] mt-1">
                        Week {photo.week} · {formatDate(photo.date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* All photos by week */}
      <div className="bg-[#0B1F33] rounded-2xl p-6">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-5">
          All Photos — By Week
        </p>
        {reports.map((report) => (
          <div key={report.id} className="mb-6 last:mb-0">
            <p className="text-white/60 text-xs font-semibold mb-3">
              Week {report.week_number} — {formatDate(report.report_date)}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {report.photos.map((photo) => (
                <div key={photo.id} className="relative rounded-xl overflow-hidden aspect-video">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-[10px]">{photo.caption.substring(0, 50)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
