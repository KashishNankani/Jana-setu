import { NextRequest, NextResponse } from 'next/server';
import { verifyResolutionEvidence } from '@/lib/gemini';
import { DEMO_INSTANCES } from '@/lib/demo-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      instance_id,
      before_photo_base64,
      after_photo_base64,
      before_photo_url,
      after_photo_url,
      category,
      location_verified,
    } = body;

    // If instance_id is provided, resolve instance details
    let resolvedBeforePhoto = before_photo_base64 || '';
    let resolvedCategory = category;

    if (instance_id) {
      const problem = DEMO_INSTANCES.find(
        (p) => p.id === instance_id || p.code === instance_id
      );
      if (problem) {
        if (!resolvedBeforePhoto && problem.original_photos?.length > 0) {
          resolvedBeforePhoto = problem.original_photos[0];
        }
        if (!resolvedCategory) {
          resolvedCategory = problem.category;
        }
      }
    }

    if (!resolvedBeforePhoto && before_photo_url) {
      resolvedBeforePhoto = before_photo_url;
    }

    const resolvedAfterPhoto = after_photo_base64 || after_photo_url;

    if (!resolvedAfterPhoto) {
      return NextResponse.json(
        { error: 'after_photo_base64 or after_photo_url is required' },
        { status: 400 }
      );
    }

    // Call Gemini AI Evidence Verification (Module F)
    const verificationResult = await verifyResolutionEvidence(
      resolvedBeforePhoto,
      resolvedAfterPhoto
    );

    // Build complete compliant response matching docx §18 & Appendix A.3
    const fullVerdict = {
      usable: !verificationResult.is_blank_or_vague,
      relevant_to_problem: verificationResult.is_valid,
      blank_or_vague: verificationResult.is_blank_or_vague,
      duplicate_suspect: verificationResult.is_duplicate,
      before_after_consistent: verificationResult.is_valid && !verificationResult.is_duplicate,
      location_consistent: location_verified !== undefined ? location_verified : true,
      verdict: verificationResult.is_valid ? 'resolved' : 'not_resolved',
      match_confidence: verificationResult.match_confidence,
      resolution_percentage: verificationResult.resolution_percentage,
      detected_changes: verificationResult.detected_changes,
      rejection_reason: verificationResult.rejection_reason,
      recommended_action: verificationResult.recommended_action,
      verified_category: resolvedCategory || 'civic_issue',
      policy_notice: 'Docx Principle §18: AI verification runs regardless of location result. Uploading photo alone does not stop accountability timer until verified.',
    };

    return NextResponse.json({
      status: 'success',
      data: fullVerdict,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Evidence verification failed' },
      { status: 500 }
    );
  }
}
