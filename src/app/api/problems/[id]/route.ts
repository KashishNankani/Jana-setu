import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES } from '@/lib/demo-data';

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

  return NextResponse.json({
    status: 'success',
    data: problem,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const problemIndex = DEMO_INSTANCES.findIndex(
      (p) => p.id === params.id || p.code === params.id
    );

    if (problemIndex === -1) {
      return NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
    }

    const problem = DEMO_INSTANCES[problemIndex];

    // Handle updates: status, department, officer
    if (body.status) {
      problem.current_status = body.status;
      problem.status = body.status;
    }
    if (body.department_id) {
      problem.assigned_department_id = body.department_id;
      problem.department_id = body.department_id;
    }
    if (body.officer_id) {
      problem.assigned_officer_id = body.officer_id;
      if (body.officer_name) problem.assigned_officer_name = body.officer_name;
    }

    // Append audit log event if provided
    if (body.note || body.status) {
      const nowIso = new Date().toISOString();
      problem.audit_log.push({
        id: `aud-${Date.now()}`,
        status: body.status || problem.current_status,
        notes: body.note || `Status updated to ${body.status || problem.current_status}`,
        actor_role: body.actor_role || 'ADMIN',
        actor_name: body.actor_name || 'System Official',
        hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
        created_at: nowIso,
      });
    }

    return NextResponse.json({
      status: 'success',
      data: problem,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to update problem instance' },
      { status: 500 }
    );
  }
}
