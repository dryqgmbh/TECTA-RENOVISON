"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import {
  CheckCircle,
  Plus,
  Trash2,
  Camera,
  Save,
  Send,
  AlertTriangle,
} from "lucide-react";

interface ReportItem {
  id: string;
  text: string;
}

interface IssueItem {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  responsible: string;
  prevented: string;
}

interface OwnerAction {
  id: string;
  title: string;
  description: string;
  deadline: string;
  cost_impact: string;
}

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function ReportBuilderPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") || "";

  const [projectSel, setProjectSel] = useState(projectId);
  const [weekNumber, setWeekNumber] = useState("12");
  const [reportDate, setReportDate] = useState(new Date().toISOString().split("T")[0]);
  const [phase, setPhase] = useState("execution");
  const [progress, setProgress] = useState(42);
  const [budgetStatus, setBudgetStatus] = useState("on_budget");
  const [timelineStatus, setTimelineStatus] = useState("on_track");
  const [summary, setSummary] = useState("");
  const [completed, setCompleted] = useState<ReportItem[]>([{ id: uid(), text: "" }]);
  const [inProgress, setInProgress] = useState<ReportItem[]>([{ id: uid(), text: "" }]);
  const [nextWeek, setNextWeek] = useState<ReportItem[]>([{ id: uid(), text: "" }]);
  const [issues, setIssues] = useState<IssueItem[]>([]);
  const [ownerActions, setOwnerActions] = useState<OwnerAction[]>([]);
  const [published, setPublished] = useState(false);

  const addItem = (setter: React.Dispatch<React.SetStateAction<ReportItem[]>>) => {
    setter((prev) => [...prev, { id: uid(), text: "" }]);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<ReportItem[]>>, id: string, text: string) => {
    setter((prev) => prev.map((i) => i.id === id ? { ...i, text } : i));
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<ReportItem[]>>, id: string) => {
    setter((prev) => prev.filter((i) => i.id !== id));
  };

  const addIssue = () => {
    setIssues((prev) => [...prev, {
      id: uid(), title: "", description: "", severity: "medium",
      status: "resolved", responsible: "", prevented: "",
    }]);
  };

  const updateIssue = (id: string, field: string, value: string) => {
    setIssues((prev) => prev.map((i) => i.id === id ? { ...i, [field]: value } : i));
  };

  const addOwnerAction = () => {
    setOwnerActions((prev) => [...prev, {
      id: uid(), title: "", description: "", deadline: "", cost_impact: "",
    }]);
  };

  const updateOwnerAction = (id: string, field: string, value: string) => {
    setOwnerActions((prev) => prev.map((a) => a.id === id ? { ...a, [field]: value } : a));
  };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const selectedProject = MOCK_PROJECTS.find((p) => p.id === projectSel);

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-[#2563FF] text-xs font-semibold uppercase tracking-wider mb-2">Admin — Report Builder</p>
        <h1 className="text-2xl font-bold text-[#0B1F33]">Weekly Report Builder</h1>
        <p className="text-[#667085] text-sm mt-1">
          Create and publish a structured weekly site report to the client portal.
        </p>
      </div>

      <div className="space-y-5">
        {/* Report Header */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#0B1F33] mb-5 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2563FF] text-white flex items-center justify-center text-[10px] font-bold">1</div>
            Report Header
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Project
              </label>
              <select
                value={projectSel}
                onChange={(e) => setProjectSel(e.target.value)}
                className="input-field"
              >
                <option value="">Select project...</option>
                {MOCK_PROJECTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.project_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Week Number
              </label>
              <input
                type="number"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                className="input-field"
                min={1}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Report Date
              </label>
              <input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Phase
              </label>
              <select value={phase} onChange={(e) => setPhase(e.target.value)} className="input-field">
                <option value="vision">Vision</option>
                <option value="budget">Budget</option>
                <option value="contractor_scope">Contractor Scope</option>
                <option value="execution">Execution</option>
                <option value="handover">Handover</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                Overall Progress %
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-[#0B1F33] font-bold text-sm w-10 text-right">{progress}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                  Budget Status
                </label>
                <select value={budgetStatus} onChange={(e) => setBudgetStatus(e.target.value)} className="input-field">
                  <option value="on_budget">On Budget</option>
                  <option value="watch">Watch</option>
                  <option value="over_budget">Over Budget</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1F2937] uppercase tracking-wider mb-1.5">
                  Timeline Status
                </label>
                <select value={timelineStatus} onChange={(e) => setTimelineStatus(e.target.value)} className="input-field">
                  <option value="on_track">On Track</option>
                  <option value="delayed">Delayed</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <h2 className="text-sm font-bold text-[#0B1F33] mb-4 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#2563FF] text-white flex items-center justify-center text-[10px] font-bold">2</div>
            Executive Summary
          </h2>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summarise this week's progress, key milestones, risks and owner context. Write for the property owner — clear, precise, professional."
            rows={5}
            className="input-field resize-none"
          />
        </div>

        {/* Completed / In Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Completed */}
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#0B1F33] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#1F8A62]" />
                Completed This Week
              </h2>
              <button onClick={() => addItem(setCompleted)} className="text-[#2563FF] hover:text-[#1D50D4]">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {completed.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#D8CBB8] flex-shrink-0" />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateItem(setCompleted, item.id, e.target.value)}
                    placeholder="Completed work item..."
                    className="input-field text-sm py-2"
                  />
                  <button onClick={() => removeItem(setCompleted, item.id)} className="text-[#D8CBB8] hover:text-[#C64B4B]">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white border border-[#EDE8E0] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#0B1F33] flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-[#2563FF]" />
                In Progress
              </h2>
              <button onClick={() => addItem(setInProgress)} className="text-[#2563FF] hover:text-[#1D50D4]">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {inProgress.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D8CBB8] flex-shrink-0" />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateItem(setInProgress, item.id, e.target.value)}
                    placeholder="In progress item..."
                    className="input-field text-sm py-2"
                  />
                  <button onClick={() => removeItem(setInProgress, item.id)} className="text-[#D8CBB8] hover:text-[#C64B4B]">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issues */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-[#0B1F33] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C58A1C]" />
              Issues Detected & Prevented
            </h2>
            <button
              onClick={addIssue}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#2563FF] bg-[#EEF2FF] px-3 py-2 rounded-lg hover:bg-[#C7D2FE]"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Issue
            </button>
          </div>

          {issues.length === 0 ? (
            <div className="border-2 border-dashed border-[#EDE8E0] rounded-xl p-6 text-center text-[#667085] text-sm">
              No issues to document. Click &ldquo;Add Issue&rdquo; to document a detected issue.
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Issue Title</label>
                      <input
                        type="text"
                        value={issue.title}
                        onChange={(e) => updateIssue(issue.id, "title", e.target.value)}
                        placeholder="E.g. Incorrect tile slope — Bathroom shower"
                        className="input-field text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Description</label>
                      <textarea
                        value={issue.description}
                        onChange={(e) => updateIssue(issue.id, "description", e.target.value)}
                        placeholder="What did TECTA detect?"
                        rows={2}
                        className="input-field text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Severity</label>
                      <select
                        value={issue.severity}
                        onChange={(e) => updateIssue(issue.id, "severity", e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Status</label>
                      <select
                        value={issue.status}
                        onChange={(e) => updateIssue(issue.id, "status", e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Responsible Party</label>
                      <input
                        type="text"
                        value={issue.responsible}
                        onChange={(e) => updateIssue(issue.id, "responsible", e.target.value)}
                        placeholder="E.g. Wet Works Contractor"
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Prevented Cost / Risk</label>
                      <input
                        type="text"
                        value={issue.prevented}
                        onChange={(e) => updateIssue(issue.id, "prevented", e.target.value)}
                        placeholder="E.g. €3,200–€5,500 remediation"
                        className="input-field text-sm"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setIssues((prev) => prev.filter((i) => i.id !== issue.id))}
                    className="text-xs text-[#C64B4B] hover:underline"
                  >
                    Remove issue
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Owner Actions */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-[#0B1F33] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#C58A1C]" />
              Owner Actions Required
            </h2>
            <button
              onClick={addOwnerAction}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#C58A1C] bg-amber-50 px-3 py-2 rounded-lg hover:bg-amber-100"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Action
            </button>
          </div>
          {ownerActions.length === 0 ? (
            <p className="text-[#667085] text-sm text-center py-4">No owner actions needed this week.</p>
          ) : (
            <div className="space-y-3">
              {ownerActions.map((action) => (
                <div key={action.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Action Title</label>
                    <input
                      type="text"
                      value={action.title}
                      onChange={(e) => updateOwnerAction(action.id, "title", e.target.value)}
                      placeholder="What decision is needed?"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      value={action.description}
                      onChange={(e) => updateOwnerAction(action.id, "description", e.target.value)}
                      rows={2}
                      className="input-field text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Deadline</label>
                    <input type="date" value={action.deadline} onChange={(e) => updateOwnerAction(action.id, "deadline", e.target.value)} className="input-field text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-[#667085] uppercase tracking-wider mb-1">Cost Impact</label>
                    <input type="text" value={action.cost_impact} onChange={(e) => updateOwnerAction(action.id, "cost_impact", e.target.value)} placeholder="E.g. +€1,800 for Option B" className="input-field text-sm" />
                  </div>
                  <button onClick={() => setOwnerActions((prev) => prev.filter((a) => a.id !== action.id))} className="text-xs text-[#C64B4B] hover:underline col-span-2">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Week Plan */}
        <div className="bg-white border border-[#EDE8E0] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#0B1F33]">Next Week Plan</h2>
            <button onClick={() => addItem(setNextWeek)} className="text-[#2563FF] hover:text-[#1D50D4]">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {nextWeek.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EEF2FF] border-2 border-[#2563FF] flex-shrink-0" />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => updateItem(setNextWeek, item.id, e.target.value)}
                  placeholder="Planned activity next week..."
                  className="input-field text-sm py-2"
                />
                <button onClick={() => removeItem(setNextWeek, item.id)} className="text-[#D8CBB8] hover:text-[#C64B4B]">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview / Publish */}
        <div className="bg-[#0B1F33] rounded-2xl p-6">
          {selectedProject && (
            <div className="mb-5 p-4 bg-white/8 rounded-xl">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Report Preview</p>
              <p className="text-white font-bold">{selectedProject.project_name}</p>
              <p className="text-white/55 text-sm">
                Week {weekNumber} · {reportDate} · {phase} · {progress}%
              </p>
              <div className="flex gap-2 mt-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${budgetStatus === "on_budget" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {budgetStatus === "on_budget" ? "On Budget" : budgetStatus === "watch" ? "Watch" : "Over Budget"}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${timelineStatus === "on_track" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {timelineStatus === "on_track" ? "On Track" : "Delayed"}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePublish}
              disabled={!projectSel || !summary}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all ${
                published
                  ? "bg-[#1F8A62] text-white"
                  : projectSel && summary
                  ? "bg-[#2563FF] text-white hover:bg-[#1D50D4]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              {published ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Report Published to Client Portal!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publish to Client Portal
                </>
              )}
            </button>
            <button className="bg-white/10 text-white font-semibold px-5 py-3.5 rounded-xl hover:bg-white/15 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
          {!projectSel && (
            <p className="text-white/40 text-xs mt-2 text-center">Select a project to publish</p>
          )}
        </div>
      </div>
    </div>
  );
}
