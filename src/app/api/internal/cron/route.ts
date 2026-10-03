import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES } from '@/lib/demo-data';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'janasetu_cron_secret';

    // Allow local or secret-authenticated runs
    if (authHeader && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized cron trigger' }, { status: 401 });
    }

    const now = new Date();
    let breachedCount = 0;
    let autoClosedCount = 0;

    // 1. Deadline sweep: Find tasks past deadline that are not closed
    DEMO_INSTANCES.forEach((problem) => {
      const deadline = new Date(problem.deadline_at);
      if (
        now > deadline &&
        problem.current_status !== 'CLOSED' &&
        problem.current_status !== 'DEADLINE_BREACHED'
      ) {
        problem.current_status = 'DEADLINE_BREACHED';
        problem.status = 'DEADLINE_BREACHED' as any;
        breachedCount++;

        problem.audit_log.push({
          id: `aud-${Date.now()}`,
          status: 'DEADLINE_BREACHED',
          notes: `Automated SLA Cron: 48h deadline exceeded. Officer escalation badge triggered (§16).`,
          actor_role: 'SYSTEM',
          actor_name: 'JanaSetu SLA Monitor',
          hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
          created_at: now.toISOString(),
        });
      }
    });

    // 2. Verification window sweep: 72h citizen window expiry (docx §21)
    DEMO_INSTANCES.forEach((problem) => {
      if (problem.current_status === 'PENDING_CITIZEN_VERIFICATION') {
        const lastEvent = problem.audit_log[problem.audit_log.length - 1];
        if (lastEvent) {
          const eventTime = new Date(lastEvent.created_at).getTime();
          const hoursSinceVerificationSent = (now.getTime() - eventTime) / (1000 * 60 * 60);

          if (hoursSinceVerificationSent > 72) {
            problem.current_status = 'CLOSED';
            problem.status = 'CLOSED' as any;
            problem.citizen_verified = false;
            autoClosedCount++;

            problem.audit_log.push({
              id: `aud-${Date.now()}`,
              status: 'CLOSED',
              notes: 'Automated Policy Closure: 72-hour citizen verification window elapsed without response (§21).',
              actor_role: 'SYSTEM',
              actor_name: 'Policy Engine',
              hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
              created_at: now.toISOString(),
            });
          }
        }
      }
    });

    return NextResponse.json({
      status: 'success',
      timestamp: now.toISOString(),
      processed: {
        sla_deadline_breaches_detected: breachedCount,
        verification_timeouts_closed: autoClosedCount,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Cron job failed' }, { status: 500 });
  }
}
