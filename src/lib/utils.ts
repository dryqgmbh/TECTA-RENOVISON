import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getPhaseLabel(phase: string): string {
  const labels: Record<string, string> = {
    inquiry: "Inquiry",
    vision: "Vision",
    budget: "Budget",
    contractor_scope: "Contractor Scope",
    execution: "Execution",
    handover: "Handover",
    completed: "Completed",
  };
  return labels[phase] || phase;
}

export function getPhaseIndex(phase: string): number {
  const phases = [
    "inquiry",
    "vision",
    "budget",
    "contractor_scope",
    "execution",
    "handover",
    "completed",
  ];
  return phases.indexOf(phase);
}

export function getBudgetStatusColor(status: string): string {
  switch (status) {
    case "on_budget":
      return "text-success";
    case "watch":
      return "text-amber-tecta";
    case "over_budget":
      return "text-risk";
    default:
      return "text-slate-tecta";
  }
}

export function getBudgetStatusLabel(status: string): string {
  switch (status) {
    case "on_budget":
      return "On Budget";
    case "watch":
      return "Watch";
    case "over_budget":
      return "Over Budget";
    default:
      return status;
  }
}

export function getTimelineStatusLabel(status: string): string {
  switch (status) {
    case "on_track":
      return "On Track";
    case "delayed":
      return "Delayed";
    case "critical":
      return "Critical";
    default:
      return status;
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "low":
      return "bg-blue-100 text-blue-700";
    case "medium":
      return "bg-amber-100 text-amber-700";
    case "high":
      return "bg-orange-100 text-orange-700";
    case "critical":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export function getApprovalStatusColor(status: string): string {
  switch (status) {
    case "approved":
      return "bg-emerald-100 text-emerald-700";
    case "pending_approval":
    case "pending":
      return "bg-amber-100 text-amber-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    case "draft":
      return "bg-gray-100 text-gray-600";
    case "change_requested":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
