import { NextRequest, NextResponse } from 'next/server';
import { classifyComplaint } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, image_base64, mime_type } = body;

    if (!text && !image_base64) {
      return NextResponse.json(
        { error: 'Either text or image_base64 is required for classification' },
        { status: 400 }
      );
    }

    const classificationResult = await classifyComplaint(text || '', image_base64, mime_type || 'image/jpeg');

    return NextResponse.json({
      status: 'success',
      data: classificationResult,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'AI Classification Failed' }, { status: 500 });
  }
}
