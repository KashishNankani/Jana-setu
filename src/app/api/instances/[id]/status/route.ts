import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES } from '@/lib/demo-data';
import type { ProblemStatus } from '@/lib/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status, actor_role, actor_name, note } = body;

    const problem = DEMO_INSTANCES.find(
      (p) => p.id === params.id || p.code === params.id
    );

    if (!problem) {
      return NextResponse.json({ error: 'Problem instance not found' }, { status: 404 });
    }

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const previousStatus = problem.current_status;
    problem.current_status = status;
    problem.status = status as ProblemStatus;

    if (status === 'REOPENED') {
      problem.reopened_count = (problem.reopened_count || 0) + 1;
    }

    const nowIso = new Date().toISOString();
    problem.audit_log.push({
      id: `aud-${Date.now()}`,
      status: status,
      notes: note || `Status transitioned from ${previousStatus} to ${status}.`,
      actor_role: actor_role || 'SYSTEM',
      actor_name: actor_name || 'System Worker',
      hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
      created_at: nowIso,
    });

    return NextResponse.json({
      status: 'success',
      previous_status: previousStatus,
      new_status: status,
      data: problem,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Status transition failed' }, { status: 500 });
  }
}
