import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES, DEMO_OFFICERS } from '@/lib/demo-data';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { officer_id, assigned_by_name } = body;

    const problem = DEMO_INSTANCES.find(
      (p) => p.id === params.id || p.code === params.id
    );

    if (!problem) {
      return NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
    }

    const officer = DEMO_OFFICERS.find((o) => o.id === officer_id);
    if (!officer) {
      return NextResponse.json({ error: 'Officer not found' }, { status: 404 });
    }

    // Anti-False-Resolution check (docx §22): Check history before assigning
    if (officer.rejected_evidence_count >= 3) {
      return NextResponse.json(
        {
          error: `Cannot assign officer ${officer.name}. Reassignment guard triggered: Officer has ${officer.rejected_evidence_count} rejected evidence submissions on record (§22).`,
        },
        { status: 400 }
      );
    }

    problem.assigned_officer_id = officer.id;
    problem.assigned_officer_name = officer.name;
    problem.current_status = 'OFFICER_ASSIGNED';
    problem.status = 'OFFICER_ASSIGNED' as any;
    problem.assigned_at = new Date().toISOString();

    const nowIso = new Date().toISOString();
    problem.audit_log.push({
      id: `aud-${Date.now()}`,
      status: 'OFFICER_ASSIGNED',
      notes: `Assigned to ${officer.name} (${officer.designation}, ${officer.phone}). SLA countdown started.`,
      actor_role: 'DEPT_HEAD',
      actor_name: assigned_by_name || 'Department Head',
      hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
      created_at: nowIso,
    });

    return NextResponse.json({
      status: 'success',
      message: `Assigned to ${officer.name}`,
      data: problem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Officer assignment failed' },
      { status: 500 }
    );
  }
}
