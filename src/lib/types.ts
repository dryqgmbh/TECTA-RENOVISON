export type UserRole = "public" | "client" | "admin" | "contractor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  country?: string;
  avatar?: string;
}

export type ProjectPhase =
  | "inquiry"
  | "vision"
  | "budget"
  | "contractor_scope"
  | "execution"
  | "handover"
  | "completed";

export type BudgetStatus = "on_budget" | "watch" | "over_budget";
export type TimelineStatus = "on_track" | "delayed" | "critical";

export interface Project {
  id: string;
  client_id: string;
  client_name: string;
  project_name: string;
  property_location: string;
  property_type: string;
  purchase_status: string;
  target_use: string;
  current_phase: ProjectPhase;
  overall_progress_percent: number;
  budget_status: BudgetStatus;
  timeline_status: TimelineStatus;
  approved_budget: number;
  committed_spend: number;
  paid_amount: number;
  forecast_final: number;
  next_site_visit?: string;
  created_at: string;
  updated_at: string;
  cover_image?: string;
}

export interface WeeklyReport {
  id: string;
  project_id: string;
  week_number: number;
  report_date: string;
  phase: ProjectPhase;
  overall_progress_percent: number;
  budget_status: BudgetStatus;
  timeline_status: TimelineStatus;
  executive_summary: string;
  completed_this_week: string[];
  in_progress: string[];
  issues_and_prevented_mistakes: Issue[];
  quality_control_notes: QCNote[];
  owner_actions_required: OwnerAction[];
  next_week_plan: string[];
  photos: Photo[];
  created_by: string;
}

export interface Issue {
  id: string;
  project_id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "rejected";
  phase?: string;
  detected_by: string;
  responsible_party: string;
  risk_if_ignored?: string;
  recommended_correction?: string;
  prevented_cost?: string;
  photos?: string[];
  detected_at: string;
  resolved_at?: string;
}

export interface QCNote {
  category: string;
  status: "approved" | "rejected" | "pending" | "rework_required";
  note: string;
}

export interface OwnerAction {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  cost_impact?: string;
  timeline_impact?: string;
  status: "pending" | "approved" | "rejected" | "change_requested";
  client_comment?: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: string;
  is_before?: boolean;
  is_after?: boolean;
  uploaded_at: string;
}

export type MaterialStatus = "approved" | "pending_approval" | "rejected" | "draft";
export type CostClass = "budget" | "mid" | "premium" | "luxury";

export interface MaterialItem {
  id: string;
  category: string;
  name: string;
  description: string;
  technical_note?: string;
  color_hex?: string;
  texture_image?: string;
  supplier?: string;
  cost_class: CostClass;
  approval_status: MaterialStatus;
}

export interface MaterialBoard {
  id: string;
  project_id: string;
  board_version: number;
  status: MaterialStatus;
  style_direction: string;
  items: MaterialItem[];
  created_at: string;
  updated_at: string;
}

export interface BudgetItem {
  id: string;
  project_id: string;
  category: string;
  planned_amount: number;
  quoted_amount: number;
  approved_amount: number;
  paid_amount: number;
  variance: number;
  status: "within_budget" | "watch" | "over_budget";
}

export interface Document {
  id: string;
  project_id: string;
  type:
    | "quote"
    | "invoice"
    | "report"
    | "plan"
    | "photo"
    | "contract"
    | "material_spec"
    | "vision_board"
    | "weekly_report"
    | "handover";
  title: string;
  file_url: string;
  uploaded_by: string;
  file_size?: string;
  created_at: string;
}

export interface Approval {
  id: string;
  project_id: string;
  item_type: string;
  item_id: string;
  title: string;
  description: string;
  cost_impact?: string;
  timeline_impact?: string;
  status: "pending" | "approved" | "rejected" | "change_requested";
  client_comment?: string;
  approved_at?: string;
  files?: string[];
  deadline?: string;
}

export interface ContractorQuote {
  id: string;
  project_id: string;
  contractor_name: string;
  trade: string;
  quote_amount: number;
  scope_included: string[];
  scope_excluded: string[];
  status: "received" | "reviewed" | "recommended" | "rejected" | "approved";
  document_url?: string;
  notes?: string;
  reviewed_by_tecta?: string;
  recommendation?: string;
  risk_notes?: string;
}

export interface AIVisionRequest {
  id: string;
  user_id?: string;
  uploaded_image_url: string;
  room_area: string;
  style_direction: string;
  objective: string;
  budget_preference: string;
  generated_image_url?: string;
  budget_band?: string;
  impact_level?: string;
  status: "pending" | "processing" | "complete" | "error";
  created_at: string;
}
