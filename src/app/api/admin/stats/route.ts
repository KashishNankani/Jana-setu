import { NextResponse } from 'next/server';
import {
  DEMO_DASHBOARD_STATS,
  DEMO_CATEGORY_STATS,
  DEMO_WARD_DATA,
  DEMO_TREND_DATA,
  DEMO_INSTANCES,
} from '@/lib/demo-data';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      stats: DEMO_DASHBOARD_STATS,
      categories: DEMO_CATEGORY_STATS,
      wards: DEMO_WARD_DATA,
      trends: DEMO_TREND_DATA,
      recent_instances_count: DEMO_INSTANCES.length,
    },
  });
}
