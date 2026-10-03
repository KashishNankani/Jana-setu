import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES, DEMO_DEPARTMENTS } from '@/lib/demo-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  const problem = DEMO_INSTANCES.find(
    (p) => p.tracking_token === token || p.code === token || p.id === token
  );

  if (!problem) {
    return NextResponse.json(
      { error: 'Tracking record not found for provided token' },
      { status: 404 }
    );
  }

  const dept = DEMO_DEPARTMENTS.find(
    (d) => d.id === (problem.assigned_department_id || problem.department_id)
  );

  // Return strictly privacy-filtered projection (DPDP Act 2023 compliance, docx §12)
  // Mask citizen PII: only return count of reporters, not phone numbers or identity
  const publicView = {
    id: problem.id,
    code: problem.code,
    category: problem.category,
    summary: problem.ai_summary,
    description: problem.description,
    status: problem.current_status,
    reported_at: problem.created_at,
    deadline_at: problem.deadline_at,
    sla_hours: problem.sla_hours,
    reporter_count: problem.reporter_count,
    approx_area: problem.location.formatted_address,
    ward_number: problem.location.ward_number,
    department: dept ? { name: dept.name, email: dept.contact_email } : null,
    officer: problem.assigned_officer_name
      ? { name: problem.assigned_officer_name, designation: 'Field Officer' }
      : null,
    original_photos: problem.original_photos,
    resolution_photo: problem.resolution_photo,
    ai_verification: problem.ai_verification,
    citizen_verified: problem.citizen_verified,
    timeline: problem.audit_log.map((log) => ({
      status: log.status,
      notes: log.notes,
      actor_role: log.actor_role,
      actor_name: log.actor_name,
      timestamp: log.created_at,
      hash_signature: log.hash_signature,
    })),
  };

  return NextResponse.json({
    status: 'success',
    data: publicView,
  });
}
