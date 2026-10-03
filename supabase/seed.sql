-- ============================================================
-- JanaSetu MVP — Municipal Corporation Initial Seed Data
-- ============================================================

-- 1. Departments
INSERT INTO departments (id, code, name, head_name, categories, sla_hours, contact_email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'PWD', 'Public Works Department (PWD)', 'Er. R. K. Sharma', ARRAY['pothole', 'broken_infrastructure'], 48, 'pwd@indore.gov.in'),
  ('22222222-2222-2222-2222-222222222222', 'WSS', 'Water Supply & Sewerage Board', 'Er. Meenakshi Soni', ARRAY['water_leakage', 'sewer_overflow'], 24, 'water@indore.gov.in'),
  ('33333333-3333-3333-3333-333333333333', 'SWM', 'Solid Waste Management (Swachh)', 'Dr. Vikramaditya Rathore', ARRAY['garbage_dump'], 24, 'swachh@indore.gov.in'),
  ('44444444-4444-4444-4444-444444444444', 'ELE', 'Street Lighting & Energy Cell', 'Er. Alok Verma', ARRAY['streetlight'], 36, 'light@indore.gov.in')
ON CONFLICT (code) DO NOTHING;

-- 2. Officers
INSERT INTO officers (id, department_id, name, designation, phone, ward_number, expertise, availability_status, active_assignments, history_score) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Suresh Kumar', 'Assistant Engineer — Roads', '+919876543210', 14, ARRAY['pothole', 'asphalt_patching'], 'available', 3, 98.4),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Anita Joshi', 'Junior Engineer — Water Pipeline', '+919876543211', 22, ARRAY['water_leakage', 'pressure_valves'], 'available', 2, 94.1),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'Rajesh Patidar', 'Sanitary Inspector — Swachh Cell', '+919876543212', 18, ARRAY['garbage_dump', 'bulk_collection'], 'busy', 5, 91.0),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Vikram Sen', 'Electrical Supervisor', '+919876543213', 31, ARRAY['streetlight', 'phase_lines'], 'available', 1, 99.2)
ON CONFLICT (phone) DO NOTHING;

-- 3. Sample Problem Instances
INSERT INTO problem_instances (
  id, code, category, description, lat, lng, location_text, approx_area, ward_number,
  department_id, status, priority_score, reporter_count, tracking_token, deadline_at, assigned_officer_id
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'SV-IND-1042',
    'pothole',
    'Deep dangerous crater pothole on Rajwada Main Market Road causing vehicle jams and accidents.',
    22.7196, 75.8577,
    'Rajwada Chowk, Near Gopal Mandir',
    'Ward 14 (Rajwada Central)', 14,
    '11111111-1111-1111-1111-111111111111',
    'OFFICER_ASSIGNED', 88.5, 4,
    'token-indore-001',
    NOW() + INTERVAL '28 hours',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'SV-IND-1043',
    'water_leakage',
    'High pressure municipal main pipeline rupture flooding Palasia Square service road.',
    22.7244, 75.8839,
    'Old Palasia Main Road, Near Industry House',
    'Ward 22 (Palasia East)', 22,
    '22222222-2222-2222-2222-222222222222',
    'EVIDENCE_VALIDATION', 92.0, 7,
    'token-indore-002',
    NOW() + INTERVAL '12 hours',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'SV-IND-1044',
    'garbage_dump',
    'Illegal construction debris and municipal waste accumulated opposite 56 Dukan food zone.',
    22.7212, 75.8770,
    'Chappan Dukan Lane 3',
    'Ward 18 (Tukoganj)', 18,
    '33333333-3333-3333-3333-333333333333',
    'WORK_STARTED', 74.0, 3,
    'token-indore-003',
    NOW() + INTERVAL '18 hours',
    'cccccccc-cccc-cccc-cccc-cccccccccccc'
  )
ON CONFLICT (code) DO NOTHING;
