import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES, DEMO_DEPARTMENTS } from '@/lib/demo-data';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { department_id, assigned_by_name } = body;

    const problem = DEMO_INSTANCES.find(
      (p) => p.id === params.id || p.code === params.id
    );

    if (!problem) {
      return NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
    }

    const dept = DEMO_DEPARTMENTS.find((d) => d.id === department_id);
    if (!dept) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    problem.assigned_department_id = dept.id;
    problem.department_id = dept.id;
    problem.current_status = 'DEPT_ASSIGNED';
    problem.status = 'DEPT_ASSIGNED' as any;

    const nowIso = new Date().toISOString();
    problem.audit_log.push({
      id: `aud-${Date.now()}`,
      status: 'DEPT_ASSIGNED',
      notes: `Problem routed to ${dept.name} with standard ${dept.sla_hours}h SLA.`,
      actor_role: 'ADMIN',
      actor_name: assigned_by_name || 'Municipal Admin',
      hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
      created_at: nowIso,
    });

    return NextResponse.json({
      status: 'success',
      message: `Assigned to ${dept.name}`,
      data: problem,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Department assignment failed' },
      { status: 500 }
    );
  }
}
