// ============================================================
// JanaSetu MVP — Complete Type Definitions
// ============================================================

// ---- Status Machine ----
export type ProblemStatus =
  | 'REGISTERED'
  | 'DEPT_CLASSIFIED'
  | 'PRIORITIZED'
  | 'DEPT_ASSIGNED'
  | 'OFFICER_ASSIGNED'
  | 'WORK_STARTED'
  | 'EVIDENCE_SUBMITTED'
  | 'EVIDENCE_VALIDATION'
  | 'PENDING_CITIZEN_VERIFICATION'
  | 'CLOSED'
  | 'REOPENED'
  | 'ESCALATED'
  | 'DEADLINE_BREACHED'
  | 'EXTENDED';

export type ProblemCategory =
  | 'road_pothole'
  | 'drainage'
  | 'sewer'
  | 'garbage'
  | 'water_leak'
  | 'contaminated_water'
  | 'streetlight'
  | 'public_infrastructure'
  | 'other';

export type Priority = 'high' | 'medium' | 'low';

export type ConversationState =
  | 'NEW'
  | 'CLASSIFIED_AWAITING_CONFIRM'
  | 'LOCATION_AWAITING'
  | 'REGISTERED'
  | 'VERIFY_AWAITING'
  | 'CLOSED'
  | 'REOPENED';

export type GovUserRole = 'admin' | 'dept_head' | 'officer' | 'viewer';

export type VerificationType = 'ai_evidence' | 'ai_location' | 'citizen';

export type OfficerOutcome =
  | 'resolved_verified'
  | 'reopened'
  | 'breached'
  | 'extension_approved';

export type MediaSource = 'citizen' | 'officer_camera' | 'officer_gallery';

export type EvidenceKind = 'original_evidence' | 'resolution_evidence' | 'counter_evidence';

// ---- Database Entities ----
export interface Citizen {
  id: string;
  wa_phone: string;
  name: string | null;
  language: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  citizen_id: string;
  state: ConversationState;
  context: Record<string, unknown>;
  current_instance_id: string | null;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  wa_message_id: string;
  direction: 'inbound' | 'outbound';
  msg_type: string;
  body: string | null;
  media_id: string | null;
  ai_meta: Record<string, unknown> | null;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  r2_key: string;
  sha256: string;
  mime: string;
  bytes: number;
  source: MediaSource;
  captured_lat: number | null;
  captured_lng: number | null;
  location_verified: boolean;
  created_at: string;
}

export interface ProblemInstance {
  id: string;
  code: string;
  category: ProblemCategory;
  description: string;
  lat: number;
  lng: number;
  location_text: string;
  approx_area: string;
  department_id: string | null;
  status: ProblemStatus;
  priority_score: number | null;
  priority_breakdown: PriorityBreakdown | null;
  reporter_count: number;
  tracking_token: string;
  deadline_at: string;
  reopened_count: number;
  assigned_officer_id: string | null;
  assigned_at: string | null;
  created_by_complaint_id: string;
  created_at: string;
  // Joined fields
  department?: Department;
  officer?: Officer;
  complaints?: Complaint[];
  status_events?: StatusEvent[];
  verifications?: Verification[];
  media?: InstanceMedia[];
}

export interface PriorityBreakdown {
  reporter_count: { value: number; weight: number; score: number };
  severity: { value: number; weight: number; score: number };
  population_affected: { value: number; weight: number; score: number };
  duration: { value: number; weight: number; score: number };
  geo_impact: { value: number; weight: number; score: number };
  total_score: number;
}

export interface Complaint {
  id: string;
  instance_id: string;
  citizen_id: string;
  role: 'original' | 'additional';
  raw_text: string | null;
  language: string;
  created_at: string;
  citizen?: Citizen;
}

export interface InstanceMedia {
  id: string;
  instance_id: string;
  media_asset_id: string;
  kind: EvidenceKind;
  ai_check: Record<string, unknown> | null;
  created_at: string;
  media_asset?: MediaAsset;
}

export interface StatusEvent {
  id: string;
  instance_id: string;
  from_status: ProblemStatus | null;
  to_status: ProblemStatus;
  actor: 'citizen' | 'ai' | 'system' | 'officer' | 'dept_head' | 'admin';
  note: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
}

export interface Verification {
  id: string;
  instance_id: string;
  type: VerificationType;
  verdict: string;
  detail: Record<string, unknown>;
  responded_citizen_id: string | null;
  created_at: string;
}

export interface Extension {
  id: string;
  instance_id: string;
  reason: string;
  requested_by: string;
  approved_by: string | null;
  status: 'pending' | 'approved' | 'rejected';
  old_deadline: string;
  new_deadline: string | null;
}

export interface Department {
  id: string;
  name: string;
  categories: ProblemCategory[];
  sla_hours: number;
  contact_email: string | null;
  active: boolean;
}

export interface GovUser {
  id: string;
  auth_user_id: string;
  role: GovUserRole;
  department_id: string | null;
  officer_id: string | null;
  name: string;
  active: boolean;
}

export interface Officer {
  id: string;
  department_id: string;
  name: string;
  designation: string;
  phone: string;
  expertise: string[];
  availability_status: 'available' | 'busy' | 'offline';
  active_assignments: number;
  history_score: number;
  department?: Department;
}

export interface OfficerHistory {
  id: string;
  officer_id: string;
  instance_id: string;
  outcome: OfficerOutcome;
  recorded_at: string;
  instance?: ProblemInstance;
}

export interface PriorityWeight {
  id: string;
  department_id: string;
  factor: 'reporter_count' | 'population_affected' | 'severity' | 'geo_impact' | 'duration';
  weight: number;
  config: Record<string, unknown>;
}

export interface AuditLog {
  id: number;
  actor_auth_id: string | null;
  action: string;
  entity: string;
  entity_id: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  ip: string | null;
  prev_hash: string | null;
  this_hash: string;
  created_at: string;
}

export interface JobQueue {
  id: number;
  type: string;
  payload: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'dead';
  run_after: string;
  attempts: number;
  last_error: string | null;
}

export interface NotificationLog {
  id: number;
  channel: string;
  to_ref: string;
  template: string;
  instance_id: string | null;
  wa_message_id: string | null;
  status: string;
  created_at: string;
}

// ---- AI Response Types ----
export interface AIClassificationResult {
  category: ProblemCategory;
  confidence: number;
  language: string;
  description: string;
  location_hints: string[];
  unreadable?: boolean;
  severity_level?: number;
  summary?: string;
  detailed_description?: string;
  extracted_location_hints?: string | null;
  detected_language?: string;
  reasoning?: string;
}

export interface AIEvidenceVerification {
  usable: boolean;
  relevant_to_problem: boolean;
  blank_or_vague: boolean;
  duplicate_suspect: boolean;
  before_after_consistent: boolean;
  location_consistent: boolean | null;
  verdict: 'resolved' | 'not_resolved' | 'inconclusive';
  reason: string;
}

export interface AIVerificationResult {
  is_valid: boolean;
  match_confidence: number;
  is_blank_or_vague: boolean;
  is_duplicate: boolean;
  resolution_percentage: number;
  detected_changes: string[];
  rejection_reason: string | null;
  recommended_action: 'APPROVE' | 'REJECT_SUSPICIOUS' | 'REQUEST_RESHOT' | 'NEEDS_HUMAN_REVIEW';
}

export interface AILocationExtraction {
  landmark: string | null;
  area: string | null;
  city: string | null;
  coords_if_numeric: { lat: number; lng: number } | null;
}

export interface AIOfficerSuggestion {
  officer_id: string;
  score: number;
  reasons: string[];
}

export interface AIResolutionRecommendation {
  suggested_actions: string[];
  equipment_needed: string[];
  estimated_hours: number;
  manpower_note: string;
}

// ---- Dashboard / API Types ----
export interface DashboardStats {
  total_complaints: number;
  verified_issues: number;
  in_progress: number;
  resolved: number;
  avg_resolution_hours: number;
  sla_breach_rate: number;
  reopen_rate: number;
  complaints_trend: number;
  verified_trend: number;
  progress_trend: number;
  resolved_trend: number;
}

export interface DepartmentStats {
  department: Department;
  total: number;
  resolved: number;
  resolution_rate: number;
  avg_resolution_hours: number;
}

export interface CategoryStats {
  category: ProblemCategory;
  count: number;
  percentage: number;
}

export interface TrackingPageData {
  code: string;
  category: ProblemCategory;
  description: string;
  approx_area: string;
  department_name: string | null;
  officer_name: string | null;
  officer_designation: string | null;
  status: ProblemStatus;
  reporter_count: number;
  priority: Priority;
  deadline_at: string;
  created_at: string;
  timeline: StatusEvent[];
  has_evidence: boolean;
  ai_verification_status: string | null;
  citizen_verification_status: string | null;
  escalation_status: string | null;
}

// ---- Category Labels & Icons ----
export const CATEGORY_LABELS: Record<ProblemCategory, string> = {
  road_pothole: 'Road / Pothole',
  drainage: 'Drainage',
  sewer: 'Sewer Leakage',
  garbage: 'Garbage / Waste',
  water_leak: 'Water Pipeline Leakage',
  contaminated_water: 'Contaminated Water',
  streetlight: 'Streetlight',
  public_infrastructure: 'Public Infrastructure',
  other: 'Other Civic Issue',
};

export const STATUS_LABELS: Record<ProblemStatus, string> = {
  REGISTERED: 'Registered',
  DEPT_CLASSIFIED: 'Classified',
  PRIORITIZED: 'Prioritized',
  DEPT_ASSIGNED: 'Dept. Assigned',
  OFFICER_ASSIGNED: 'Officer Assigned',
  WORK_STARTED: 'Work Started',
  EVIDENCE_SUBMITTED: 'Evidence Submitted',
  EVIDENCE_VALIDATION: 'Verifying Evidence',
  PENDING_CITIZEN_VERIFICATION: 'Awaiting Citizen Verification',
  CLOSED: 'Resolved & Closed',
  REOPENED: 'Reopened',
  ESCALATED: 'Escalated',
  DEADLINE_BREACHED: 'Deadline Breached',
  EXTENDED: 'Extended',
};

export const STATUS_COLORS: Record<ProblemStatus, string> = {
  REGISTERED: 'bg-blue-50 text-blue-700 border-blue-200',
  DEPT_CLASSIFIED: 'bg-blue-50 text-blue-700 border-blue-200',
  PRIORITIZED: 'bg-purple-50 text-purple-700 border-purple-200',
  DEPT_ASSIGNED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  OFFICER_ASSIGNED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  WORK_STARTED: 'bg-amber-50 text-amber-700 border-amber-200',
  EVIDENCE_SUBMITTED: 'bg-amber-50 text-amber-700 border-amber-200',
  EVIDENCE_VALIDATION: 'bg-orange-50 text-orange-700 border-orange-200',
  PENDING_CITIZEN_VERIFICATION: 'bg-purple-50 text-purple-700 border-purple-200',
  CLOSED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REOPENED: 'bg-rose-50 text-rose-700 border-rose-200',
  ESCALATED: 'bg-rose-50 text-rose-700 border-rose-200',
  DEADLINE_BREACHED: 'bg-rose-100 text-rose-800 border-rose-300',
  EXTENDED: 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

export const SEVERITY_COLORS: Record<string, string> = {
  1: 'bg-green-50 text-green-700',
  2: 'bg-blue-50 text-blue-700',
  3: 'bg-amber-50 text-amber-700',
  4: 'bg-orange-50 text-orange-700',
  5: 'bg-rose-50 text-rose-800',
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
