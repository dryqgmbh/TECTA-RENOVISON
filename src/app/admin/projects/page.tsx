"use client";

import Link from "next/link";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatCurrency, getPhaseLabel, getBudgetStatusLabel, getTimelineStatusLabel } from "@/lib/utils";
import { MapPin, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_PROJECTS.filter(
    (p) =>
      p.project_name.toLowerCase().includes(search.toLowerCase()) ||
      p.client_name.toLowerCase().includes(search.toLowerCase()) ||
      p.property_location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">Projects</p>
          <h1 className="text-2xl font-bold text-[#0B1F33]">All Projects</h1>
          <p className="text-[#667085] text-sm mt-1">{MOCK_PROJECTS.length} active projects</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2563FF] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1D50D4] transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects, clients, locations..."
          className="input-field max-w-sm"
        />
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="bg-white border border-[#EDE8E0] rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex items-stretch">
              {project.cover_image && (
                <div
                  className="w-40 flex-shrink-0 bg-cover bg-center hidden md:block"
                  style={{ backgroundImage: `url(${project.cover_image})` }}
                />
              )}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-[#0B1F33] text-sm mb-1">{project.project_name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-[#667085]">
                        <MapPin className="w-3 h-3" />{project.property_location}
                      </span>
                      <span className="text-xs text-[#667085]">·</span>
                      <span className="text-xs text-[#667085]">{project.client_name}</span>
                      <span className="font-mono text-[9px] text-[#D8CBB8]">#{project.id.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      project.budget_status === "on_budget" ? "bg-emerald-100 text-emerald-700" :
                      project.budget_status === "watch" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {getBudgetStatusLabel(project.budget_status)}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      project.timeline_status === "on_track" ? "bg-emerald-100 text-emerald-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {getTimelineStatusLabel(project.timeline_status)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#667085] uppercase tracking-wider">Phase:</span>
                    <span className="text-xs font-semibold text-[#2563FF]">{getPhaseLabel(project.current_phase)}</span>
                  </div>
                  <div className="flex-1 max-w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#EDE8E0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2563FF] rounded-full" style={{ width: `${project.overall_progress_percent}%` }} />
                      </div>
                      <span className="text-xs font-bold text-[#1F2937]">{project.overall_progress_percent}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] text-[#667085]">Budget</p>
                      <p className="text-xs font-bold text-[#0B1F33]">{formatCurrency(project.approved_budget)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#667085]">Forecast</p>
                      <p className="text-xs font-bold text-[#1F8A62]">{formatCurrency(project.forecast_final)}</p>
                    </div>
                  </div>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center gap-1.5 bg-[#0B1F33] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#1F2937] transition-colors"
                  >
                    Manage Project <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
