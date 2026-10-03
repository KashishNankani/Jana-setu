// ============================================================
// JanaSetu — Demo/Seed Data for Development
// Realistic Indian civic complaint data (Indore, MP)
// ============================================================

import type {
  ProblemInstance, Department, Officer, StatusEvent,
  DashboardStats, CategoryStats, ProblemCategory, GovUser,
  OfficerHistory,
} from './types';

// ---- Departments (extended for all pages) ----
export const DEMO_DEPARTMENTS: (Department & {
  code: string;
  head_name: string;
  contact_phone: string;
  email: string;
  officer_count: number;
})[] = [
  {
    id: 'dept-001', name: 'Waste Management Department', code: 'WMD',
    categories: ['garbage'], sla_hours: 48,
    contact_email: 'waste@indoremc.gov.in', active: true,
    head_name: 'Rajesh Gupta', contact_phone: '+91 731 2534001',
    email: 'waste@indoremc.gov.in', officer_count: 12,
  },
  {
    id: 'dept-002', name: 'Water Supply Department', code: 'WSD',
    categories: ['water_leak', 'contaminated_water'], sla_hours: 48,
    contact_email: 'water@indoremc.gov.in', active: true,
    head_name: 'Sunita Verma', contact_phone: '+91 731 2534002',
    email: 'water@indoremc.gov.in', officer_count: 8,
  },
  {
    id: 'dept-003', name: 'Roads & Infrastructure', code: 'RID',
    categories: ['road_pothole', 'public_infrastructure'], sla_hours: 72,
    contact_email: 'roads@indoremc.gov.in', active: true,
    head_name: 'Amit Patel', contact_phone: '+91 731 2534003',
    email: 'roads@indoremc.gov.in', officer_count: 15,
  },
  {
    id: 'dept-004', name: 'Drainage & Sewerage', code: 'DSD',
    categories: ['drainage', 'sewer'], sla_hours: 48,
    contact_email: 'drainage@indoremc.gov.in', active: true,
    head_name: 'Priya Singh', contact_phone: '+91 731 2534004',
    email: 'drainage@indoremc.gov.in', officer_count: 10,
  },
  {
    id: 'dept-005', name: 'Electrical Department', code: 'ELD',
    categories: ['streetlight'], sla_hours: 24,
    contact_email: 'electric@indoremc.gov.in', active: true,
    head_name: 'Vijay Kumar', contact_phone: '+91 731 2534005',
    email: 'electric@indoremc.gov.in', officer_count: 6,
  },
];

// ---- Officers (extended for officer portal & roster pages) ----
export const DEMO_OFFICERS: (Officer & {
  role: string;
  active_tasks_count: number;
  completed_count: number;
  verification_pass_rate: number;
  rejected_evidence_count: number;
})[] = [
  {
    id: 'off-001', department_id: 'dept-001', name: 'Rakesh Sharma',
    designation: 'Field Officer', phone: '+919876543210',
    expertise: ['garbage', 'waste_collection'], availability_status: 'available',
    active_assignments: 3, history_score: 88,
    role: 'Field Officer', active_tasks_count: 3, completed_count: 47,
    verification_pass_rate: 92, rejected_evidence_count: 1,
  },
  {
    id: 'off-002', department_id: 'dept-002', name: 'Sunita Verma',
    designation: 'Junior Engineer', phone: '+919876543211',
    expertise: ['water_leak', 'pipeline'], availability_status: 'available',
    active_assignments: 2, history_score: 92,
    role: 'Junior Engineer', active_tasks_count: 2, completed_count: 62,
    verification_pass_rate: 96, rejected_evidence_count: 0,
  },
  {
    id: 'off-003', department_id: 'dept-003', name: 'Amit Patel',
    designation: 'Site Engineer', phone: '+919876543212',
    expertise: ['road_pothole', 'concrete'], availability_status: 'busy',
    active_assignments: 5, history_score: 75,
    role: 'Site Engineer', active_tasks_count: 5, completed_count: 38,
    verification_pass_rate: 78, rejected_evidence_count: 3,
  },
  {
    id: 'off-004', department_id: 'dept-004', name: 'Priya Singh',
    designation: 'Field Supervisor', phone: '+919876543213',
    expertise: ['drainage', 'sewer'], availability_status: 'available',
    active_assignments: 1, history_score: 95,
    role: 'Field Supervisor', active_tasks_count: 1, completed_count: 55,
    verification_pass_rate: 98, rejected_evidence_count: 0,
  },
  {
    id: 'off-005', department_id: 'dept-005', name: 'Vijay Kumar',
    designation: 'Electrician', phone: '+919876543214',
    expertise: ['streetlight', 'electrical'], availability_status: 'available',
    active_assignments: 4, history_score: 82,
    role: 'Electrician', active_tasks_count: 4, completed_count: 41,
    verification_pass_rate: 85, rejected_evidence_count: 2,
  },
  {
    id: 'off-006', department_id: 'dept-001', name: 'Meena Devi',
    designation: 'Sanitation Inspector', phone: '+919876543215',
    expertise: ['garbage', 'sanitation'], availability_status: 'available',
    active_assignments: 2, history_score: 90,
    role: 'Sanitation Inspector', active_tasks_count: 2, completed_count: 53,
    verification_pass_rate: 94, rejected_evidence_count: 0,
  },
];

// ---- Gov Users ----
export const DEMO_GOV_USERS: GovUser[] = [
  {
    id: 'gu-001', auth_user_id: 'auth-001', role: 'admin',
    department_id: null, officer_id: null,
    name: 'Amit Choudhary', active: true,
  },
  {
    id: 'gu-002', auth_user_id: 'auth-002', role: 'dept_head',
    department_id: 'dept-001', officer_id: null,
    name: 'Rajesh Gupta', active: true,
  },
  {
    id: 'gu-003', auth_user_id: 'auth-003', role: 'officer',
    department_id: 'dept-001', officer_id: 'off-001',
    name: 'Rakesh Sharma', active: true,
  },
];

// ---- Helper Functions ----
const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const hoursLater = (h: number) => new Date(now.getTime() + h * 60 * 60 * 1000).toISOString();

// Reporter type for problem detail page
interface DemoReporter {
  id: string;
  name: string | null;
  phone: string;
  timestamp: string;
}

// Audit log entry for timeline
interface DemoAuditLog {
  id: string;
  status: string;
  notes: string;
  actor_role: string;
  actor_name: string;
  hash_signature: string;
  created_at: string;
}

// AI verification result
interface DemoAIVerification {
  match_confidence: number;
  detected_changes: string[];
}

// Priority breakdown for detail page
interface DemoPriorityBreakdown {
  base_weight: number;
  severity_score: number;
  duplicate_bonus: number;
  aging_multiplier: number;
  recurrence_penalty: number;
  // Original typed fields
  reporter_count: { value: number; weight: number; score: number };
  severity: { value: number; weight: number; score: number };
  population_affected: { value: number; weight: number; score: number };
  duration: { value: number; weight: number; score: number };
  geo_impact: { value: number; weight: number; score: number };
  total_score: number;
}

// Location type for detail pages
interface DemoLocation {
  formatted_address: string;
  ward_number: number;
  ward_name: string;
  lat: number;
  lng: number;
}

// Extended Problem Instance with all fields needed by every page
export interface DemoProblemInstance extends ProblemInstance {
  // Extended fields used by problems list, detail, tracking, and officer pages
  ai_summary: string;
  ai_category: string;
  ai_severity: number;
  ai_confidence: number;
  ai_reasoning: string;
  current_status: string;
  assigned_department_id: string | null;
  assigned_officer_id: string | null;
  assigned_officer_name: string | null;
  original_photos: string[];
  original_text: string | null;
  original_voice_url: string | null;
  resolution_photo: string | null;
  citizen_verified: boolean;
  sla_hours: number;
  location: DemoLocation;
  reporters: DemoReporter[];
  audit_log: DemoAuditLog[];
  ai_verification: DemoAIVerification | null;
  priority_breakdown: DemoPriorityBreakdown;
}

// ---- Problem Instances (unified schema for all pages) ----
export const DEMO_INSTANCES: DemoProblemInstance[] = [
  {
    id: 'inst-001', code: 'JS-2026-0517-1024',
    category: 'garbage',
    description: 'Large garbage dump accumulation near Braj Vihar market causing foul smell and blocking pedestrian path.',
    ai_summary: 'Garbage Dump in Braj Vihar Area',
    ai_category: 'garbage', ai_severity: 4, ai_confidence: 0.96,
    ai_reasoning: 'Gemini 2.0 Flash detected garbage accumulation from uploaded photo and Hindi voice note. Confidence: 96%. Category: Waste Management. Severity graded 4/5 due to proximity to residential area and market.',
    lat: 22.7196, lng: 75.8577,
    location_text: 'Braj Vihar, Ward 12', approx_area: 'Braj Vihar, Indore',
    location: { formatted_address: 'Braj Vihar, Ward 12, Indore', ward_number: 12, ward_name: 'Braj Vihar', lat: 22.7196, lng: 75.8577 },
    department_id: 'dept-001', assigned_department_id: 'dept-001',
    status: 'WORK_STARTED', current_status: 'WORK_STARTED',
    priority_score: 78,
    priority_breakdown: {
      base_weight: 20, severity_score: 16, duplicate_bonus: 31, aging_multiplier: 6, recurrence_penalty: 5,
      reporter_count: { value: 31, weight: 0.30, score: 0.62 },
      severity: { value: 4, weight: 0.25, score: 0.80 },
      population_affected: { value: 300, weight: 0.20, score: 0.60 },
      duration: { value: 36, weight: 0.15, score: 0.21 },
      geo_impact: { value: 4, weight: 0.10, score: 0.80 },
      total_score: 78,
    },
    reporter_count: 31, tracking_token: 'JS-2026-0517-1024',
    deadline_at: hoursLater(12), reopened_count: 0,
    assigned_officer_id: 'off-001', assigned_officer_name: 'Rakesh Sharma',
    assigned_at: hoursAgo(12),
    created_by_complaint_id: 'comp-001', created_at: hoursAgo(36),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Bahut zyada kachra jamaa ho gaya hai Braj Vihar market ke paas. Bahut badbu aa rahi hai.',
    original_voice_url: null,
    resolution_photo: null,
    citizen_verified: false,
    ai_verification: null,
    reporters: [
      { id: 'rep-001', name: 'Citizen Reporter', phone: '+91 98765 XXXXX', timestamp: hoursAgo(36) },
      { id: 'rep-002', name: null, phone: '+91 87654 XXXXX', timestamp: hoursAgo(34) },
      { id: 'rep-003', name: 'Aman Sharma', phone: '+91 76543 XXXXX', timestamp: hoursAgo(30) },
    ],
    audit_log: [
      { id: 'al-001', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp (Hindi voice + photo)', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'a3f8c2...e91b', created_at: hoursAgo(36) },
      { id: 'al-002', status: 'DEPT_CLASSIFIED', notes: 'AI auto-classified to Waste Management Department', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'b7d1a4...f82c', created_at: hoursAgo(36) },
      { id: 'al-003', status: 'PRIORITIZED', notes: 'Priority score: 78 (High) — 31 linked reporters', actor_role: 'system', actor_name: 'Priority Engine', hash_signature: 'c2e5b8...a41d', created_at: hoursAgo(35) },
      { id: 'al-004', status: 'DEPT_ASSIGNED', notes: 'Assigned to Waste Management Department by Admin', actor_role: 'admin', actor_name: 'Amit Choudhary', hash_signature: 'd9f3c7...b52e', created_at: hoursAgo(34) },
      { id: 'al-005', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Rakesh Sharma (Field Officer)', actor_role: 'dept_head', actor_name: 'Rajesh Gupta', hash_signature: 'e1a4d6...c63f', created_at: hoursAgo(12) },
      { id: 'al-006', status: 'WORK_STARTED', notes: 'Officer started work on site', actor_role: 'officer', actor_name: 'Rakesh Sharma', hash_signature: 'f2b5e7...d74a', created_at: hoursAgo(6) },
    ],
    department: DEMO_DEPARTMENTS[0],
    officer: DEMO_OFFICERS[0],
  },
  {
    id: 'inst-002', code: 'JS-2026-0517-1023',
    category: 'water_leak',
    description: 'Water pipeline leaking continuously on MG Road causing waterlogging and traffic obstruction.',
    ai_summary: 'Water Pipeline Leakage on MG Road',
    ai_category: 'water_leak', ai_severity: 3, ai_confidence: 0.91,
    ai_reasoning: 'Gemini detected water pipeline leakage from photo evidence. Location confirmed via GPS pin and text description. Water pooling visible on road surface.',
    lat: 22.7196, lng: 75.8626,
    location_text: 'MG Road, Ward 5', approx_area: 'MG Road, Indore',
    location: { formatted_address: 'MG Road, Ward 5, Indore', ward_number: 5, ward_name: 'MG Road', lat: 22.7196, lng: 75.8626 },
    department_id: 'dept-002', assigned_department_id: 'dept-002',
    status: 'PENDING_CITIZEN_VERIFICATION', current_status: 'PENDING_CITIZEN_VERIFICATION',
    priority_score: 65,
    priority_breakdown: {
      base_weight: 18, severity_score: 12, duplicate_bonus: 23, aging_multiplier: 4, recurrence_penalty: 8,
      reporter_count: { value: 23, weight: 0.30, score: 0.46 },
      severity: { value: 3, weight: 0.25, score: 0.60 },
      population_affected: { value: 250, weight: 0.20, score: 0.50 },
      duration: { value: 24, weight: 0.15, score: 0.14 },
      geo_impact: { value: 4, weight: 0.10, score: 0.80 },
      total_score: 65,
    },
    reporter_count: 23, tracking_token: 'JS-2026-0517-1023',
    deadline_at: hoursLater(24), reopened_count: 0,
    assigned_officer_id: 'off-002', assigned_officer_name: 'Sunita Verma',
    assigned_at: hoursAgo(18),
    created_by_complaint_id: 'comp-002', created_at: hoursAgo(24),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'MG Road par paani ka pipe toot gaya hai. Paani beh raha hai aur traffic jam ho raha hai.',
    original_voice_url: null,
    resolution_photo: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    citizen_verified: false,
    ai_verification: {
      match_confidence: 0.91,
      detected_changes: ['Pipeline repair visible', 'No water pooling', 'Road surface cleared'],
    },
    reporters: [
      { id: 'rep-004', name: 'Deepak Singh', phone: '+91 98765 XXXXX', timestamp: hoursAgo(24) },
      { id: 'rep-005', name: null, phone: '+91 87654 XXXXX', timestamp: hoursAgo(22) },
    ],
    audit_log: [
      { id: 'al-010', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp photo + text', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'g3h6i9...j12k', created_at: hoursAgo(24) },
      { id: 'al-011', status: 'DEPT_CLASSIFIED', notes: 'AI auto-classified to Water Supply Department', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'h4i7j0...k23l', created_at: hoursAgo(24) },
      { id: 'al-012', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Sunita Verma (Junior Engineer)', actor_role: 'dept_head', actor_name: 'Sunita Verma', hash_signature: 'i5j8k1...l34m', created_at: hoursAgo(18) },
      { id: 'al-013', status: 'WORK_STARTED', notes: 'Officer en route to location', actor_role: 'officer', actor_name: 'Sunita Verma', hash_signature: 'j6k9l2...m45n', created_at: hoursAgo(12) },
      { id: 'al-014', status: 'EVIDENCE_SUBMITTED', notes: 'Resolution evidence submitted via portal camera', actor_role: 'officer', actor_name: 'Sunita Verma', hash_signature: 'k7l0m3...n56o', created_at: hoursAgo(6) },
      { id: 'al-015', status: 'EVIDENCE_VALIDATION', notes: 'AI verification: APPROVED (91% match)', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'l8m1n4...o67p', created_at: hoursAgo(5) },
      { id: 'al-016', status: 'PENDING_CITIZEN_VERIFICATION', notes: 'WhatsApp verification sent to 23 linked citizens', actor_role: 'system', actor_name: 'System', hash_signature: 'm9n2o5...p78q', created_at: hoursAgo(5) },
    ],
    department: DEMO_DEPARTMENTS[1],
    officer: DEMO_OFFICERS[1],
  },
  {
    id: 'inst-003', code: 'JS-2026-0517-1022',
    category: 'streetlight',
    description: 'Multiple streetlights not working near Vijay Nagar main road creating safety hazard at night.',
    ai_summary: 'Street Light Not Working in Vijay Nagar',
    ai_category: 'streetlight', ai_severity: 3, ai_confidence: 0.88,
    ai_reasoning: 'Multiple streetlights detected as non-functional from nighttime photo. Location verified via WhatsApp GPS. Safety hazard classification applied due to busy road.',
    lat: 22.7535, lng: 75.8937,
    location_text: 'Vijay Nagar, Ward 10', approx_area: 'Vijay Nagar, Indore',
    location: { formatted_address: 'Vijay Nagar Main Road, Ward 10, Indore', ward_number: 10, ward_name: 'Vijay Nagar', lat: 22.7535, lng: 75.8937 },
    department_id: 'dept-005', assigned_department_id: 'dept-005',
    status: 'OFFICER_ASSIGNED', current_status: 'OFFICER_ASSIGNED',
    priority_score: 52,
    priority_breakdown: {
      base_weight: 15, severity_score: 12, duplicate_bonus: 14, aging_multiplier: 7, recurrence_penalty: 4,
      reporter_count: { value: 14, weight: 0.30, score: 0.28 },
      severity: { value: 3, weight: 0.25, score: 0.60 },
      population_affected: { value: 200, weight: 0.20, score: 0.40 },
      duration: { value: 48, weight: 0.15, score: 0.29 },
      geo_impact: { value: 3, weight: 0.10, score: 0.60 },
      total_score: 52,
    },
    reporter_count: 14, tracking_token: 'JS-2026-0517-1022',
    deadline_at: hoursLater(0), reopened_count: 0,
    assigned_officer_id: 'off-005', assigned_officer_name: 'Vijay Kumar',
    assigned_at: hoursAgo(6),
    created_by_complaint_id: 'comp-003', created_at: hoursAgo(48),
    sla_hours: 24,
    original_photos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: null, original_voice_url: null,
    resolution_photo: null, citizen_verified: false, ai_verification: null,
    reporters: [
      { id: 'rep-006', name: null, phone: '+91 98765 XXXXX', timestamp: hoursAgo(48) },
    ],
    audit_log: [
      { id: 'al-020', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp nighttime photo', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'n0o3p6...q89r', created_at: hoursAgo(48) },
      { id: 'al-021', status: 'DEPT_CLASSIFIED', notes: 'AI classified to Electrical Department', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'o1p4q7...r90s', created_at: hoursAgo(48) },
      { id: 'al-022', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Vijay Kumar (Electrician)', actor_role: 'dept_head', actor_name: 'Vijay Kumar', hash_signature: 'p2q5r8...s01t', created_at: hoursAgo(6) },
    ],
    department: DEMO_DEPARTMENTS[4],
    officer: DEMO_OFFICERS[4],
  },
  {
    id: 'inst-004', code: 'JS-2026-0517-1021',
    category: 'drainage',
    description: 'Open drain overflow near Scheme No. 54 causing sewage water on road and health hazard.',
    ai_summary: 'Open Drain Overflow in Scheme No. 54',
    ai_category: 'drainage', ai_severity: 5, ai_confidence: 0.94,
    ai_reasoning: 'Severe open drain overflow detected. Health hazard classification due to sewage water on pedestrian walkway. Severity 5/5 — immediate health risk to nearby residents.',
    lat: 22.7463, lng: 75.8921,
    location_text: 'Scheme No. 54, Ward 18', approx_area: 'Scheme No. 54, Indore',
    location: { formatted_address: 'Scheme No. 54, Ward 18, Indore', ward_number: 18, ward_name: 'Scheme No. 54', lat: 22.7463, lng: 75.8921 },
    department_id: 'dept-004', assigned_department_id: 'dept-004',
    status: 'WORK_STARTED', current_status: 'WORK_STARTED',
    priority_score: 72,
    priority_breakdown: {
      base_weight: 22, severity_score: 20, duplicate_bonus: 18, aging_multiplier: 5, recurrence_penalty: 7,
      reporter_count: { value: 18, weight: 0.30, score: 0.36 },
      severity: { value: 5, weight: 0.25, score: 1.00 },
      population_affected: { value: 350, weight: 0.20, score: 0.70 },
      duration: { value: 30, weight: 0.15, score: 0.18 },
      geo_impact: { value: 3, weight: 0.10, score: 0.60 },
      total_score: 72,
    },
    reporter_count: 18, tracking_token: 'JS-2026-0517-1021',
    deadline_at: hoursLater(18), reopened_count: 0,
    assigned_officer_id: 'off-004', assigned_officer_name: 'Priya Singh',
    assigned_at: hoursAgo(8),
    created_by_complaint_id: 'comp-004', created_at: hoursAgo(30),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Scheme 54 mein naali overflow ho gayi hai, sadak par sewage paani beh raha hai.', original_voice_url: null,
    resolution_photo: null, citizen_verified: false, ai_verification: null,
    reporters: [
      { id: 'rep-007', name: 'Kavita Devi', phone: '+91 76543 XXXXX', timestamp: hoursAgo(30) },
      { id: 'rep-008', name: null, phone: '+91 65432 XXXXX', timestamp: hoursAgo(28) },
    ],
    audit_log: [
      { id: 'al-030', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'q3r6s9...t12u', created_at: hoursAgo(30) },
      { id: 'al-031', status: 'DEPT_CLASSIFIED', notes: 'AI classified to Drainage & Sewerage', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'r4s7t0...u23v', created_at: hoursAgo(30) },
      { id: 'al-032', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Priya Singh (Field Supervisor)', actor_role: 'dept_head', actor_name: 'Priya Singh', hash_signature: 's5t8u1...v34w', created_at: hoursAgo(8) },
      { id: 'al-033', status: 'WORK_STARTED', notes: 'Officer started drain clearing work', actor_role: 'officer', actor_name: 'Priya Singh', hash_signature: 't6u9v2...w45x', created_at: hoursAgo(4) },
    ],
    department: DEMO_DEPARTMENTS[3],
    officer: DEMO_OFFICERS[3],
  },
  {
    id: 'inst-005', code: 'JS-2026-0517-1020',
    category: 'road_pothole',
    description: 'Large pothole on Rau main road causing vehicle damage and accidents, needs urgent repair.',
    ai_summary: 'Road Pothole / Damage on Rau Road',
    ai_category: 'road_pothole', ai_severity: 3, ai_confidence: 0.89,
    ai_reasoning: 'Large pothole detected on main arterial road. Vehicle damage risk assessed as moderate. Multiple citizens reported vehicle tire punctures.',
    lat: 22.6627, lng: 75.8287,
    location_text: 'Rau, Ward 17', approx_area: 'Rau, Indore',
    location: { formatted_address: 'Rau Main Road, Ward 17, Indore', ward_number: 17, ward_name: 'Rau', lat: 22.6627, lng: 75.8287 },
    department_id: 'dept-003', assigned_department_id: 'dept-003',
    status: 'CLOSED', current_status: 'CLOSED',
    priority_score: 45,
    priority_breakdown: {
      base_weight: 15, severity_score: 12, duplicate_bonus: 11, aging_multiplier: 4, recurrence_penalty: 3,
      reporter_count: { value: 11, weight: 0.30, score: 0.22 },
      severity: { value: 3, weight: 0.25, score: 0.60 },
      population_affected: { value: 150, weight: 0.20, score: 0.30 },
      duration: { value: 72, weight: 0.15, score: 0.43 },
      geo_impact: { value: 3, weight: 0.10, score: 0.60 },
      total_score: 45,
    },
    reporter_count: 11, tracking_token: 'JS-2026-0517-1020',
    deadline_at: hoursAgo(24), reopened_count: 0,
    assigned_officer_id: 'off-003', assigned_officer_name: 'Amit Patel',
    assigned_at: hoursAgo(60),
    created_by_complaint_id: 'comp-005', created_at: hoursAgo(96),
    sla_hours: 72,
    original_photos: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Rau road par bada pothole hai, gaadi ka tire phat gaya.', original_voice_url: null,
    resolution_photo: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    citizen_verified: true,
    ai_verification: {
      match_confidence: 0.94,
      detected_changes: ['Road cavity filled with bitumen asphalt', 'Surface leveled', 'GPS location verified'],
    },
    reporters: [
      { id: 'rep-009', name: 'Ravi Kumar', phone: '+91 54321 XXXXX', timestamp: hoursAgo(96) },
    ],
    audit_log: [
      { id: 'al-040', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp photo', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'u7v0w3...x56y', created_at: hoursAgo(96) },
      { id: 'al-041', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Amit Patel (Site Engineer)', actor_role: 'dept_head', actor_name: 'Admin', hash_signature: 'v8w1x4...y67z', created_at: hoursAgo(60) },
      { id: 'al-042', status: 'EVIDENCE_SUBMITTED', notes: 'Resolution evidence submitted', actor_role: 'officer', actor_name: 'Amit Patel', hash_signature: 'w9x2y5...z78a', created_at: hoursAgo(30) },
      { id: 'al-043', status: 'CLOSED', notes: 'Citizen confirmed YES — issue resolved and closed', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'x0y3z6...a89b', created_at: hoursAgo(24) },
    ],
    department: DEMO_DEPARTMENTS[2],
    officer: DEMO_OFFICERS[2],
  },
  {
    id: 'inst-006', code: 'JS-2026-0517-1019',
    category: 'garbage',
    description: 'Garbage not collected for 5 days near Shiv Mandir area. Stray animals scattering waste.',
    ai_summary: 'Garbage Accumulation near Shiv Mandir',
    ai_category: 'garbage', ai_severity: 3, ai_confidence: 0.92,
    ai_reasoning: 'Garbage accumulation confirmed from photo evidence. Stray dogs visible in image. 5-day non-collection duration escalates severity.',
    lat: 22.7254, lng: 75.8612,
    location_text: 'Near Shiv Mandir, Ward 12', approx_area: 'Braj Vihar, Indore',
    location: { formatted_address: 'Near Shiv Mandir, Ward 12, Indore', ward_number: 12, ward_name: 'Braj Vihar', lat: 22.7254, lng: 75.8612 },
    department_id: 'dept-001', assigned_department_id: 'dept-001',
    status: 'EVIDENCE_SUBMITTED', current_status: 'EVIDENCE_SUBMITTED',
    priority_score: 58,
    priority_breakdown: {
      base_weight: 18, severity_score: 12, duplicate_bonus: 8, aging_multiplier: 12, recurrence_penalty: 8,
      reporter_count: { value: 8, weight: 0.30, score: 0.16 },
      severity: { value: 3, weight: 0.25, score: 0.60 },
      population_affected: { value: 200, weight: 0.20, score: 0.40 },
      duration: { value: 56, weight: 0.15, score: 0.33 },
      geo_impact: { value: 3, weight: 0.10, score: 0.60 },
      total_score: 58,
    },
    reporter_count: 8, tracking_token: 'JS-2026-0517-1019',
    deadline_at: hoursAgo(8), reopened_count: 0,
    assigned_officer_id: 'off-006', assigned_officer_name: 'Meena Devi',
    assigned_at: hoursAgo(40),
    created_by_complaint_id: 'comp-006', created_at: hoursAgo(56),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Shiv Mandir ke paas 5 din se kachra nahi uthaya gaya hai.', original_voice_url: null,
    resolution_photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    citizen_verified: false,
    ai_verification: {
      match_confidence: 0.87,
      detected_changes: ['Area cleaned', 'Dustbins placed', 'No visible garbage'],
    },
    reporters: [
      { id: 'rep-010', name: null, phone: '+91 43210 XXXXX', timestamp: hoursAgo(56) },
    ],
    audit_log: [
      { id: 'al-050', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'y1z4a7...b90c', created_at: hoursAgo(56) },
      { id: 'al-051', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Meena Devi (Sanitation Inspector)', actor_role: 'dept_head', actor_name: 'Rajesh Gupta', hash_signature: 'z2a5b8...c01d', created_at: hoursAgo(40) },
      { id: 'al-052', status: 'EVIDENCE_SUBMITTED', notes: 'Resolution evidence submitted via portal camera', actor_role: 'officer', actor_name: 'Meena Devi', hash_signature: 'a3b6c9...d12e', created_at: hoursAgo(8) },
    ],
    department: DEMO_DEPARTMENTS[0],
    officer: DEMO_OFFICERS[5],
  },
  {
    id: 'inst-007', code: 'JS-2026-0517-1018',
    category: 'contaminated_water',
    description: 'Yellowish water coming from taps in Rajendra Nagar area. Residents complaining of stomach issues.',
    ai_summary: 'Contaminated Water Supply in Rajendra Nagar',
    ai_category: 'contaminated_water', ai_severity: 5, ai_confidence: 0.97,
    ai_reasoning: 'CRITICAL: Contaminated water detected. Photo shows yellowish discoloration. Multiple health complaints reported. Maximum severity due to public health emergency.',
    lat: 22.7301, lng: 75.8645,
    location_text: 'Rajendra Nagar, Ward 8', approx_area: 'Rajendra Nagar, Indore',
    location: { formatted_address: 'Rajendra Nagar, Ward 8, Indore', ward_number: 8, ward_name: 'Rajendra Nagar', lat: 22.7301, lng: 75.8645 },
    department_id: 'dept-002', assigned_department_id: 'dept-002',
    status: 'ESCALATED', current_status: 'ESCALATED',
    priority_score: 88,
    priority_breakdown: {
      base_weight: 25, severity_score: 20, duplicate_bonus: 21, aging_multiplier: 10, recurrence_penalty: 12,
      reporter_count: { value: 42, weight: 0.30, score: 0.84 },
      severity: { value: 5, weight: 0.25, score: 1.00 },
      population_affected: { value: 450, weight: 0.20, score: 0.90 },
      duration: { value: 60, weight: 0.15, score: 0.36 },
      geo_impact: { value: 4, weight: 0.10, score: 0.80 },
      total_score: 88,
    },
    reporter_count: 42, tracking_token: 'JS-2026-0517-1018',
    deadline_at: hoursAgo(12), reopened_count: 1,
    assigned_officer_id: 'off-002', assigned_officer_name: 'Sunita Verma',
    assigned_at: hoursAgo(48),
    created_by_complaint_id: 'comp-007', created_at: hoursAgo(60),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Rajendra Nagar mein nalon se peela paani aa raha hai. Log beemar pad rahe hain.',
    original_voice_url: 'https://example.com/voice-note.ogg',
    resolution_photo: null, citizen_verified: false, ai_verification: null,
    reporters: [
      { id: 'rep-011', name: 'Sanjay Tiwari', phone: '+91 32109 XXXXX', timestamp: hoursAgo(60) },
      { id: 'rep-012', name: 'Geeta Bai', phone: '+91 21098 XXXXX', timestamp: hoursAgo(58) },
      { id: 'rep-013', name: null, phone: '+91 10987 XXXXX', timestamp: hoursAgo(55) },
    ],
    audit_log: [
      { id: 'al-060', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp — health emergency', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'b4c7d0...e23f', created_at: hoursAgo(60) },
      { id: 'al-061', status: 'DEPT_CLASSIFIED', notes: 'AI classified as Contaminated Water — CRITICAL', actor_role: 'system', actor_name: 'Gemini AI', hash_signature: 'c5d8e1...f34g', created_at: hoursAgo(60) },
      { id: 'al-062', status: 'OFFICER_ASSIGNED', notes: 'Assigned to Sunita Verma (Junior Engineer)', actor_role: 'admin', actor_name: 'Amit Choudhary', hash_signature: 'd6e9f2...g45h', created_at: hoursAgo(48) },
      { id: 'al-063', status: 'DEADLINE_BREACHED', notes: '48-hour deadline breached — escalated to supervisor', actor_role: 'system', actor_name: 'Deadline Service', hash_signature: 'e7f0g3...h56i', created_at: hoursAgo(12) },
      { id: 'al-064', status: 'ESCALATED', notes: 'Escalated to Department Head for immediate action', actor_role: 'system', actor_name: 'System', hash_signature: 'f8g1h4...i67j', created_at: hoursAgo(12) },
    ],
    department: DEMO_DEPARTMENTS[1],
    officer: DEMO_OFFICERS[1],
  },
  {
    id: 'inst-008', code: 'JS-2026-0517-1017',
    category: 'sewer',
    description: 'Sewer pipe broken near bus stand causing sewage overflow on public road.',
    ai_summary: 'Broken Sewer Pipe near Bus Stand',
    ai_category: 'sewer', ai_severity: 4, ai_confidence: 0.90,
    ai_reasoning: 'Broken sewer pipe detected from photo. Sewage overflow on public road near bus stand — high foot traffic area. Urgent classification applied.',
    lat: 22.7180, lng: 75.8560,
    location_text: 'Near Bus Stand, Ward 15', approx_area: 'Indore City Center',
    location: { formatted_address: 'Near Bus Stand, Ward 15, Indore', ward_number: 15, ward_name: 'City Center', lat: 22.7180, lng: 75.8560 },
    department_id: 'dept-004', assigned_department_id: 'dept-004',
    status: 'REGISTERED', current_status: 'REGISTERED',
    priority_score: 41,
    priority_breakdown: {
      base_weight: 18, severity_score: 16, duplicate_bonus: 5, aging_multiplier: 1, recurrence_penalty: 1,
      reporter_count: { value: 5, weight: 0.30, score: 0.10 },
      severity: { value: 4, weight: 0.25, score: 0.80 },
      population_affected: { value: 100, weight: 0.20, score: 0.20 },
      duration: { value: 4, weight: 0.15, score: 0.024 },
      geo_impact: { value: 3, weight: 0.10, score: 0.60 },
      total_score: 41,
    },
    reporter_count: 5, tracking_token: 'JS-2026-0517-1017',
    deadline_at: hoursLater(44), reopened_count: 0,
    assigned_officer_id: null, assigned_officer_name: null,
    assigned_at: null,
    created_by_complaint_id: 'comp-008', created_at: hoursAgo(4),
    sla_hours: 48,
    original_photos: [
      'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80',
    ],
    original_text: 'Bus stand ke paas sewer pipe toot gaya hai.', original_voice_url: null,
    resolution_photo: null, citizen_verified: false, ai_verification: null,
    reporters: [
      { id: 'rep-014', name: null, phone: '+91 09876 XXXXX', timestamp: hoursAgo(4) },
    ],
    audit_log: [
      { id: 'al-070', status: 'REGISTERED', notes: 'Complaint registered via WhatsApp — awaiting department classification', actor_role: 'citizen', actor_name: 'Citizen', hash_signature: 'g9h2i5...j78k', created_at: hoursAgo(4) },
    ],
    department: DEMO_DEPARTMENTS[3],
  },
];

// ---- Timeline Events ----
export const DEMO_TIMELINE: StatusEvent[] = [
  {
    id: 'evt-001', instance_id: 'inst-001', from_status: null, to_status: 'REGISTERED',
    actor: 'citizen', note: 'Complaint registered via WhatsApp', meta: null,
    created_at: hoursAgo(36),
  },
  {
    id: 'evt-002', instance_id: 'inst-001', from_status: 'REGISTERED', to_status: 'DEPT_CLASSIFIED',
    actor: 'system', note: 'Auto-classified to Waste Management Department', meta: null,
    created_at: hoursAgo(36),
  },
  {
    id: 'evt-003', instance_id: 'inst-001', from_status: 'DEPT_CLASSIFIED', to_status: 'PRIORITIZED',
    actor: 'system', note: 'Priority score: 78 (High)', meta: null,
    created_at: hoursAgo(35),
  },
  {
    id: 'evt-004', instance_id: 'inst-001', from_status: 'PRIORITIZED', to_status: 'DEPT_ASSIGNED',
    actor: 'admin', note: 'Assigned to Waste Management Department', meta: null,
    created_at: hoursAgo(34),
  },
  {
    id: 'evt-005', instance_id: 'inst-001', from_status: 'DEPT_ASSIGNED', to_status: 'OFFICER_ASSIGNED',
    actor: 'dept_head', note: 'Assigned to Rakesh Sharma (Field Officer)', meta: null,
    created_at: hoursAgo(12),
  },
  {
    id: 'evt-006', instance_id: 'inst-001', from_status: 'OFFICER_ASSIGNED', to_status: 'WORK_STARTED',
    actor: 'officer', note: 'Officer started work on site', meta: null,
    created_at: hoursAgo(6),
  },
];

// ---- Dashboard Stats ----
export const DEMO_DASHBOARD_STATS: DashboardStats = {
  total_complaints: 1248,
  verified_issues: 842,
  in_progress: 326,
  resolved: 692,
  avg_resolution_hours: 18.6,
  sla_breach_rate: 8.2,
  reopen_rate: 4.5,
  complaints_trend: 18,
  verified_trend: 22,
  progress_trend: 15,
  resolved_trend: 25,
};

// ---- Category Stats (extended for departments page) ----
export const DEMO_CATEGORY_STATS: (CategoryStats & {
  open: number;
  resolved: number;
  avg_hours: number;
})[] = [
  { category: 'garbage', count: 524, percentage: 42, open: 18, resolved: 506, avg_hours: 14 },
  { category: 'water_leak', count: 250, percentage: 20, open: 12, resolved: 238, avg_hours: 22 },
  { category: 'drainage', count: 187, percentage: 15, open: 8, resolved: 179, avg_hours: 18 },
  { category: 'road_pothole', count: 125, percentage: 10, open: 15, resolved: 110, avg_hours: 32 },
  { category: 'streetlight', count: 100, percentage: 8, open: 6, resolved: 94, avg_hours: 12 },
  { category: 'other', count: 62, percentage: 5, open: 4, resolved: 58, avg_hours: 20 },
];

// ---- Ward Data (extended for analytics page) ----
export const DEMO_WARD_DATA: {
  ward: string;
  ward_number: number;
  ward_name: string;
  total: number;
  resolved: number;
  rate: number;
  score: number;
  complaints_count: number;
  resolved_count: number;
  avg_resolution_hours: number;
}[] = [
  { ward: 'Ward 12', ward_number: 12, ward_name: 'Braj Vihar', total: 152, resolved: 120, rate: 79, score: 84, complaints_count: 152, resolved_count: 120, avg_resolution_hours: 16 },
  { ward: 'Ward 5', ward_number: 5, ward_name: 'MG Road', total: 128, resolved: 96, rate: 75, score: 78, complaints_count: 128, resolved_count: 96, avg_resolution_hours: 20 },
  { ward: 'Ward 10', ward_number: 10, ward_name: 'Vijay Nagar', total: 110, resolved: 78, rate: 71, score: 74, complaints_count: 110, resolved_count: 78, avg_resolution_hours: 22 },
  { ward: 'Ward 18', ward_number: 18, ward_name: 'Scheme No. 54', total: 98, resolved: 70, rate: 71, score: 72, complaints_count: 98, resolved_count: 70, avg_resolution_hours: 24 },
  { ward: 'Ward 17', ward_number: 17, ward_name: 'Rau', total: 85, resolved: 62, rate: 73, score: 70, complaints_count: 85, resolved_count: 62, avg_resolution_hours: 28 },
];

// ---- Trend Data (extended for analytics page) ----
export const DEMO_TREND_DATA: {
  date: string;
  month: string;
  garbage: number;
  water: number;
  drainage: number;
  streetlight: number;
  registered: number;
  resolved: number;
}[] = [
  { date: '11 Oct', month: 'May 2026', garbage: 95, water: 45, drainage: 32, streetlight: 18, registered: 190, resolved: 162 },
  { date: '12 Oct', month: 'Jun 2026', garbage: 110, water: 52, drainage: 28, streetlight: 22, registered: 212, resolved: 185 },
  { date: '13 Oct', month: 'Jul 2026', garbage: 85, water: 38, drainage: 35, streetlight: 15, registered: 173, resolved: 150 },
  { date: '14 Oct', month: 'Aug 2026', garbage: 120, water: 48, drainage: 30, streetlight: 20, registered: 218, resolved: 198 },
  { date: '15 Oct', month: 'Sep 2026', garbage: 105, water: 55, drainage: 38, streetlight: 25, registered: 223, resolved: 204 },
  { date: '16 Oct', month: 'Oct 2026', garbage: 95, water: 42, drainage: 25, streetlight: 18, registered: 180, resolved: 168 },
  { date: '17 Oct', month: 'Nov 2026', garbage: 130, water: 60, drainage: 40, streetlight: 28, registered: 258, resolved: 232 },
];

// ---- Officer History ----
export const DEMO_OFFICER_HISTORY: OfficerHistory[] = [
  {
    id: 'oh-001', officer_id: 'off-001', instance_id: 'inst-005',
    outcome: 'resolved_verified', recorded_at: hoursAgo(120),
  },
  {
    id: 'oh-002', officer_id: 'off-001', instance_id: 'inst-006',
    outcome: 'resolved_verified', recorded_at: hoursAgo(96),
  },
  {
    id: 'oh-003', officer_id: 'off-002', instance_id: 'inst-007',
    outcome: 'reopened', recorded_at: hoursAgo(60),
  },
];

// ---- Wards export for filter dropdowns ----
export const DEMO_WARDS = DEMO_WARD_DATA.map(w => ({
  number: w.ward_number,
  name: w.ward_name,
  label: `${w.ward} (${w.ward_name})`,
}));
