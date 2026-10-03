import { NextRequest, NextResponse } from 'next/server';
import { DEMO_OFFICERS, DEMO_INSTANCES } from '@/lib/demo-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const instanceId = searchParams.get('instance_id');

  const problem = DEMO_INSTANCES.find(
    (p) => p.id === instanceId || p.code === instanceId
  );

  const category = problem ? problem.category : 'garbage';

  // Filter officers matching expertise, then sort by availability and history score
  const matchingOfficers = DEMO_OFFICERS.map((officer) => {
    let matchScore = 50;

    // Expertise match
    if (officer.expertise.includes(category)) {
      matchScore += 30;
    }

    // Availability bonus
    if (officer.availability_status === 'available') {
      matchScore += 15;
    }

    // Low active assignments bonus
    matchScore -= officer.active_assignments * 5;

    // History score influence
    matchScore += Math.floor((officer.history_score - 70) / 2);

    return {
      officer,
      matchScore: Math.max(10, Math.min(99, matchScore)),
      recommendationReason: `High domain expertise in ${category.replace('_', ' ')} with ${officer.verification_pass_rate}% past verification pass rate and ${officer.active_assignments} active assignments.`,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  return NextResponse.json({
    status: 'success',
    problem_category: category,
    suggestions: matchingOfficers,
  });
}
