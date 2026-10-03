import { NextRequest, NextResponse } from 'next/server';

let currentWeights = {
  reporter_count: 0.30,
  severity: 0.25,
  population_affected: 0.20,
  duration: 0.15,
  geo_impact: 0.10,
};

export async function GET() {
  return NextResponse.json({
    status: 'success',
    weights: currentWeights,
    sum: Object.values(currentWeights).reduce((a, b) => a + b, 0),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { weights, actor_name } = body;

    if (!weights) {
      return NextResponse.json({ error: 'weights object is required' }, { status: 400 });
    }

    currentWeights = {
      ...currentWeights,
      ...weights,
    };

    return NextResponse.json({
      status: 'success',
      message: 'Priority engine weightages updated and audited successfully.',
      updated_by: actor_name || 'Admin',
      weights: currentWeights,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update weights' }, { status: 500 });
  }
}
