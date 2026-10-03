import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES, DEMO_DEPARTMENTS, DEMO_OFFICERS } from '@/lib/demo-data';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const problem = DEMO_INSTANCES.find(
    (p) => p.id === params.id || p.code === params.id || p.tracking_token === params.id
  );

  if (!problem) {
    return NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
  }

  const dept = DEMO_DEPARTMENTS.find(
    (d) => d.id === (problem.assigned_department_id || problem.department_id)
  );

  const officer = DEMO_OFFICERS.find(
    (o) => o.id === problem.assigned_officer_id
  );

  // Compile official government evidence report dossier (docx §8)
  const reportDossier = {
    report_title: 'OFFICIAL CIVIC PROBLEM DOSSIER & EVIDENCE REPORT',
    issuing_authority: 'Indore Municipal Corporation (IMC)',
    generated_at: new Date().toISOString(),
    problem_code: problem.code,
    tracking_token: problem.tracking_token,
    category: problem.category,
    summary: problem.ai_summary,
    description: problem.description,
    current_status: problem.current_status,
    reported_at: problem.created_at,
    deadline_at: problem.deadline_at,
    sla_compliance: {
      sla_hours: problem.sla_hours,
      deadline_breached: new Date() > new Date(problem.deadline_at),
    },
    location: {
      address: problem.location.formatted_address,
      ward_number: problem.location.ward_number,
      ward_name: problem.location.ward_name,
      gps_coordinates: `${problem.location.lat}, ${problem.location.lng}`,
    },
    reporter_metrics: {
      total_reporters_linked: problem.reporter_count,
      estimated_population_impact: (problem.priority_breakdown?.population_affected?.value || 300),
    },
    priority_assessment: {
      total_score: problem.priority_score,
      factors: problem.priority_breakdown,
    },
    administration: {
      assigned_department: dept ? dept.name : 'Unassigned',
      assigned_officer: officer
        ? `${officer.name} (${officer.designation}, Phone: ${officer.phone})`
        : 'Awaiting Officer Assignment',
    },
    evidence: {
      original_photos: problem.original_photos,
      resolution_photo: problem.resolution_photo,
      ai_verification_passed: problem.ai_verification ? problem.ai_verification.match_confidence >= 80 : false,
      ai_match_confidence: problem.ai_verification?.match_confidence,
      citizen_verified: problem.citizen_verified,
    },
    tamper_evident_audit_trail: problem.audit_log.map((log) => ({
      status: log.status,
      action_note: log.notes,
      actor: `${log.actor_name} (${log.actor_role})`,
      timestamp: log.created_at,
      cryptographic_hash: log.hash_signature,
    })),
  };

  return NextResponse.json({
    status: 'success',
    dossier: reportDossier,
  });
}
