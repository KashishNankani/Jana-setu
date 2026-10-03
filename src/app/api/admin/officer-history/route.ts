import { NextRequest, NextResponse } from 'next/server';
import { DEMO_OFFICERS, DEMO_INSTANCES } from '@/lib/demo-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const officerId = searchParams.get('officer_id');

  if (!officerId) {
    return NextResponse.json({
      status: 'success',
      officers: DEMO_OFFICERS.map((o) => ({
        id: o.id,
        name: o.name,
        designation: o.designation,
        phone: o.phone,
        history_score: o.history_score,
        verification_pass_rate: o.verification_pass_rate,
        completed_count: o.completed_count,
        rejected_evidence_count: o.rejected_evidence_count,
        active_assignments: o.active_assignments,
      })),
    });
  }

  const officer = DEMO_OFFICERS.find((o) => o.id === officerId);
  if (!officer) {
    return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
  }

  // Assigned and past tasks
  const tasks = DEMO_INSTANCES.filter(
    (p) => p.assigned_officer_id === officerId
  );

  return NextResponse.json({
    status: 'success',
    officer,
    reassignment_guard: {
      can_be_assigned_recurring: officer.rejected_evidence_count < 2,
      warning:
        officer.rejected_evidence_count >= 2
          ? 'Anti-False-Resolution Warning (§22): Previous evidence rejections detected. Supervisory oversight recommended.'
          : null,
    },
    tasks,
  });
}
