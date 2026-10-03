import { NextRequest, NextResponse } from 'next/server';
import { DEMO_INSTANCES } from '@/lib/demo-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const dept = searchParams.get('department');

  let results = [...DEMO_INSTANCES];

  if (status && status !== 'ALL') {
    results = results.filter((p) => p.current_status === status);
  }

  if (dept && dept !== 'ALL') {
    results = results.filter((p) => p.assigned_department_id === dept);
  }

  return NextResponse.json({
    total: results.length,
    instances: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, description, location_text, reporter_phone, reporter_name } = body;

    const newCode = `JS-2026-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newToken = `token-indore-${Math.random().toString(36).substring(2, 9)}`;
    const nowIso = new Date().toISOString();
    const deadlineIso = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const newProblem = {
      id: `inst-${Date.now()}`,
      code: newCode,
      category: category || 'garbage',
      description: description || 'Civic complaint registered via JanaSetu',
      ai_summary: description ? description.substring(0, 50) : 'Civic Complaint',
      ai_category: category || 'garbage',
      ai_severity: 3,
      ai_confidence: 0.95,
      ai_reasoning: 'Classified automatically based on reported symptoms.',
      current_status: 'REGISTERED',
      status: 'REGISTERED' as any,
      assigned_department_id: null,
      department_id: null,
      assigned_officer_id: null,
      assigned_officer_name: null,
      assigned_at: null,
      original_photos: body.photos || [],
      original_text: description || null,
      original_voice_url: null,
      resolution_photo: null,
      citizen_verified: false,
      sla_hours: 48,
      lat: body.lat || 22.7196,
      lng: body.lng || 75.8577,
      location_text: location_text || 'Braj Vihar Ward 12, Indore',
      approx_area: 'Ward 12',
      location: {
        formatted_address: location_text || 'Braj Vihar Ward 12, Indore',
        ward_number: 12,
        ward_name: 'Braj Vihar',
        lat: body.lat || 22.7196,
        lng: body.lng || 75.8577,
      },
      reporter_count: 1,
      reporters: [
        {
          id: `rep-${Date.now()}`,
          name: reporter_name || 'Citizen (Anonymous)',
          phone: reporter_phone || '+91 98260 00000',
          timestamp: nowIso,
        },
      ],
      audit_log: [
        {
          id: `aud-${Date.now()}`,
          status: 'REGISTERED',
          notes: 'Complaint registered officially into municipal queue.',
          actor_role: 'CITIZEN',
          actor_name: reporter_name || 'Citizen',
          hash_signature: `hash-${Math.random().toString(36).substring(2, 10)}`,
          created_at: nowIso,
        },
      ],
      ai_verification: null,
      priority_score: 72,
      priority_breakdown: {
        base_weight: 40,
        severity_score: 20,
        duplicate_bonus: 5,
        aging_multiplier: 1.0,
        recurrence_penalty: 0,
        reporter_count: { value: 1, weight: 0.3, score: 20 },
        severity: { value: 4, weight: 0.35, score: 28 },
        population_affected: { value: 100, weight: 0.15, score: 12 },
        duration: { value: 1, weight: 0.1, score: 6 },
        geo_impact: { value: 1, weight: 0.1, score: 6 },
        total_score: 72,
      },
      tracking_token: newToken,
      deadline_at: deadlineIso,
      reopened_count: 0,
      created_by_complaint_id: `comp-${Date.now()}`,
      created_at: nowIso,
    };

    DEMO_INSTANCES.unshift(newProblem as any);

    return NextResponse.json({
      status: 'success',
      data: newProblem,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create problem instance' },
      { status: 500 }
    );
  }
}

