import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES } from '@/lib/demo-data';

interface ExtensionRecord {
  id: string;
  instance_id: string;
  problem_code: string;
  requested_by_officer_id: string;
  officer_name: string;
  reason: string;
  old_deadline: string;
  requested_deadline: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  decided_by?: string;
  decision_notes?: string;
  created_at: string;
}

const EXTENSIONS: ExtensionRecord[] = [
  {
    id: 'ext-001',
    instance_id: 'inst-003',
    problem_code: 'JS-2026-0517-1020',
    requested_by_officer_id: 'off-003',
    officer_name: 'Amit Patel',
    reason: 'Heavy monsoon downpour prevented asphalt curing. Need 24h for dry weather bitumen binding.',
    old_deadline: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    requested_deadline: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
    status: 'PENDING',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    status: 'success',
    extensions: EXTENSIONS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { instance_id, reason, officer_id, officer_name, additional_hours } = body;

    if (!instance_id || !reason) {
      return NextResponse.json(
        { error: 'instance_id and reason are required' },
        { status: 400 }
      );
    }

    const problem = DEMO_INSTANCES.find((p) => p.id === instance_id || p.code === instance_id);
    const oldDeadline = problem ? problem.deadline_at : new Date().toISOString();
    const extraMs = (additional_hours || 24) * 60 * 60 * 1000;
    const requestedDeadline = new Date(new Date(oldDeadline).getTime() + extraMs).toISOString();

    const newExt: ExtensionRecord = {
      id: `ext-${Date.now()}`,
      instance_id: problem ? problem.id : instance_id,
      problem_code: problem ? problem.code : instance_id,
      requested_by_officer_id: officer_id || 'off-001',
      officer_name: officer_name || 'Field Officer',
      reason,
      old_deadline: oldDeadline,
      requested_deadline: requestedDeadline,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    };

    EXTENSIONS.unshift(newExt);

    return NextResponse.json({
      status: 'success',
      message: 'Extension request submitted. Awaiting human supervisory approval (§16).',
      data: newExt,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Extension request failed' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { extension_id, action, decided_by, notes } = body;

    const ext = EXTENSIONS.find((e) => e.id === extension_id);
    if (!ext) {
      return NextResponse.json({ error: 'Extension not found' }, { status: 404 });
    }

    if (action === 'APPROVE') {
      ext.status = 'APPROVED';
      ext.decided_by = decided_by || 'Department Head';
      ext.decision_notes = notes || 'Extension granted per civic weather guidelines.';

      // Extend deadline on problem instance
      const problem = DEMO_INSTANCES.find((p) => p.id === ext.instance_id);
      if (problem) {
        problem.deadline_at = ext.requested_deadline;
        problem.audit_log.push({
          id: `aud-${Date.now()}`,
          status: 'EXTENDED',
          notes: `Extension approved by ${ext.decided_by}: ${ext.reason}`,
          actor_role: 'DEPT_HEAD',
          actor_name: ext.decided_by || 'Department Head',
          hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
          created_at: new Date().toISOString(),
        });
      }
    } else {
      ext.status = 'REJECTED';
      ext.decided_by = decided_by || 'Department Head';
      ext.decision_notes = notes || 'Unsatisfactory reason. Standard 48h SLA maintained.';
    }

    return NextResponse.json({
      status: 'success',
      data: ext,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Extension update failed' }, { status: 500 });
  }
}
