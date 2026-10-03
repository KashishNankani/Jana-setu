-- ============================================================
-- JanaSetu MVP — Supabase Postgres Production Schema
-- Designed for India Municipal Corporations & DPDP Act 2023
-- ============================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. Citizens & WhatsApp State Machine
CREATE TABLE IF NOT EXISTS citizens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wa_phone TEXT UNIQUE NOT NULL,
  name TEXT,
  language TEXT DEFAULT 'hi',
  green_points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  citizen_id UUID REFERENCES citizens(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'NEW',
  context JSONB DEFAULT '{}'::jsonb,
  current_instance_id UUID,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  wa_message_id TEXT UNIQUE,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  msg_type TEXT NOT NULL, -- text, image, audio, video, location, button, interactive
  body TEXT,
  media_id UUID,
  ai_meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Media Assets (Evidence Photos, Videos, Audio Notes)
CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  r2_key TEXT NOT NULL,
  sha256 TEXT NOT NULL,
  mime TEXT NOT NULL,
  bytes INT,
  source TEXT CHECK (source IN ('citizen', 'officer_camera', 'officer_gallery')),
  captured_lat NUMERIC(10, 7),
  captured_lng NUMERIC(10, 7),
  location_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Municipal Departments & Officers
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  head_name TEXT,
  categories TEXT[] NOT NULL DEFAULT '{}',
  sla_hours INT DEFAULT 48,
  contact_email TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS officers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  designation TEXT,
  phone TEXT UNIQUE NOT NULL,
  ward_number INT,
  expertise TEXT[] DEFAULT '{}',
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'on_leave')),
  active_assignments INT DEFAULT 0,
  history_score NUMERIC(5, 2) DEFAULT 95.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS officer_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  officer_id UUID REFERENCES officers(id) ON DELETE CASCADE,
  instance_id UUID,
  event_type TEXT NOT NULL CHECK (event_type IN ('assigned', 'evidence_submitted', 'evidence_rejected', 'resolved', 'reopened_by_citizen', 'sla_breached')),
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Problem Instances (One Physical Problem = One Problem ID = One Tracking Link)
CREATE TABLE IF NOT EXISTS problem_instances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,                      -- e.g. SV-IND-1042
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  lat NUMERIC(10, 7) NOT NULL,
  lng NUMERIC(10, 7) NOT NULL,
  location_text TEXT,
  approx_area TEXT,
  ward_number INT,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'REGISTERED',
  priority_score NUMERIC(6, 2) DEFAULT 50.0,
  priority_breakdown JSONB DEFAULT '{}'::jsonb,
  reporter_count INT DEFAULT 1,
  status_embedding vector(384),
  tracking_token TEXT UNIQUE NOT NULL,            -- /t/<token>
  deadline_at TIMESTAMPTZ NOT NULL,               -- registration + 48 hours
  reopened_count INT DEFAULT 0,
  assigned_officer_id UUID REFERENCES officers(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_instances_geo ON problem_instances(lat, lng);
CREATE INDEX IF NOT EXISTS idx_instances_status ON problem_instances(status);
CREATE INDEX IF NOT EXISTS idx_instances_dept ON problem_instances(department_id);
CREATE INDEX IF NOT EXISTS idx_instances_token ON problem_instances(tracking_token);

-- 6. Complaints & Citizen Reporters
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES problem_instances(id) ON DELETE CASCADE,
  citizen_id UUID REFERENCES citizens(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('original', 'additional')) DEFAULT 'original',
  raw_text TEXT,
  language TEXT DEFAULT 'hi',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Instance Media Link
CREATE TABLE IF NOT EXISTS instance_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES problem_instances(id) ON DELETE CASCADE,
  media_asset_id UUID REFERENCES media_assets(id) ON DELETE CASCADE,
  kind TEXT CHECK (kind IN ('original_evidence', 'resolution_evidence', 'counter_evidence')),
  ai_check JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Status Events & Cryptographic Audit Trail (Tamper-Evident)
CREATE TABLE IF NOT EXISTS status_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES problem_instances(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  actor TEXT CHECK (actor IN ('citizen', 'ai', 'system', 'officer', 'dept_head', 'admin')),
  actor_id UUID,
  note TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  actor_id TEXT,
  payload JSONB,
  previous_hash TEXT,
  entry_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Evidence Verifications (AI Evidence + Citizen Verification)
CREATE TABLE IF NOT EXISTS verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES problem_instances(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('ai_evidence', 'ai_location', 'citizen')),
  verdict TEXT NOT NULL, -- PASSED, REJECTED, RESOLVED, NOT_RESOLVED
  detail JSONB DEFAULT '{}'::jsonb,
  responded_citizen_id UUID REFERENCES citizens(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SLA Extensions (Human Approval Gate)
CREATE TABLE IF NOT EXISTS extensions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES problem_instances(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  requested_by UUID REFERENCES officers(id) ON DELETE CASCADE,
  approved_by UUID,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  extension_hours INT DEFAULT 24,
  old_deadline TIMESTAMPTZ NOT NULL,
  new_deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 11. Configurable Priority Engine Weights
CREATE TABLE IF NOT EXISTS priority_weights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  severity_multiplier NUMERIC(4, 2) DEFAULT 20.0,
  duplicate_reporter_weight NUMERIC(4, 2) DEFAULT 15.0,
  aging_hours_multiplier NUMERIC(4, 2) DEFAULT 1.5,
  recurrence_penalty NUMERIC(4, 2) DEFAULT 25.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Asynchronous Job Queue (₹0 Cloud Native Queue)
CREATE TABLE IF NOT EXISTS job_queue (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- classify, embed, geocode, verify_evidence, send_template
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  run_after TIMESTAMPTZ DEFAULT NOW(),
  attempts INT DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Haversine Distance Helper Function for Clustering (Radius in meters)
CREATE OR REPLACE FUNCTION haversine_distance(
  lat1 NUMERIC, lon1 NUMERIC,
  lat2 NUMERIC, lon2 NUMERIC
) RETURNS NUMERIC AS $$
DECLARE
  R NUMERIC := 6371000; -- Earth radius in meters
  dLat NUMERIC := radians(lat2 - lat1);
  dLon NUMERIC := radians(lon2 - lon1);
  a NUMERIC;
  c NUMERIC;
BEGIN
  a := sin(dLat / 2) * sin(dLat / 2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dLon / 2) * sin(dLon / 2);
  c := 2 * atan2(sqrt(a), sqrt(1 - a));
  RETURN R * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 14. Reassignment Guard Check (Docx §22: Never reassign recurring problem to same officer)
CREATE OR REPLACE FUNCTION check_reassignment_guard(
  p_officer_id UUID,
  p_category TEXT,
  p_lat NUMERIC,
  p_lng NUMERIC
) RETURNS BOOLEAN AS $$
DECLARE
  v_count INT;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM problem_instances pi
  JOIN officer_history oh ON oh.instance_id = pi.id
  WHERE oh.officer_id = p_officer_id
    AND oh.event_type = 'reopened_by_citizen'
    AND pi.category = p_category
    AND haversine_distance(pi.lat, pi.lng, p_lat, p_lng) < 150;

  -- Return TRUE if safe to assign, FALSE if blocked by reassignment guard
  RETURN (v_count = 0);
END;
$$ LANGUAGE plpgsql STABLE;
