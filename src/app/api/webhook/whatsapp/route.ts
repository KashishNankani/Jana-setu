import { NextRequest, NextResponse } from 'next/server';
import { classifyComplaint } from '@/lib/gemini';
import { DEMO_INSTANCES } from '@/lib/demo-data';

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'janasetu_webhook_secret_2026';

/**
 * GET Handler: Meta WhatsApp Webhook Verification handshake
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] Handshake verified successfully.');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

/**
 * POST Handler: Process incoming WhatsApp messages (Text, Photo, Voice, Location)
 * Runs state machine logic: REPORT -> CONFIRM CLASSIFICATION -> GET LOCATION -> REGISTER
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if this is a valid Meta WhatsApp message payload
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 'ignored_non_message_event' });
    }

    const message = messages[0];
    const fromPhone = message.from;
    const msgType = message.type; // text, image, audio, location

    console.log(`[WhatsApp Inbound] Received ${msgType} message from ${fromPhone}`);

    // Mock processing response logic
    let replyText = '';

    if (msgType === 'text') {
      const userText = message.text.body;
      replyText = `🤖 *JanaSetu AI Bot*: Thank you for reporting! We analyzed your text: "${userText}".\n\nAI Classified Category: *POTHOLE (Roads Dept)*\nSeverity: *4/5*\n\nPlease reply *YES* to confirm this classification or *NO* to describe manually.`;
    } else if (msgType === 'image') {
      replyText = `📸 *JanaSetu AI Bot*: Photo received! Gemini AI visual inspector analyzing damaged road/infrastructure...\n\nExtracted Category: *DRAINAGE / OVERFLOWING SEWER*\nSeverity: *3/5*\n\nPlease send your *Current Location Pin* on WhatsApp to attach GPS coordinates.`;
    } else if (msgType === 'audio') {
      replyText = `🎙️ *JanaSetu AI Bot*: Voice note received! Audio transcribed from Kannada/Hindi:\n"Near MG Road bus stop, streetlights broken and dark."\n\nCategory: *STREETLIGHT*\nTracking ID: *JS-8849-BAN*`;
    } else if (msgType === 'location') {
      const lat = message.location.latitude;
      const lng = message.location.longitude;
      replyText = `📍 *JanaSetu AI Bot*: Location pinned! GPS: (${lat}, ${lng}).\nWard #112 detected.\n\nYour civic problem is now officially registered!\n\n🔗 *Track Live Status*: http://localhost:3000/t/JS-8849-BAN`;
    } else {
      replyText = `🤖 *JanaSetu AI Bot*: Hello! Please send a Photo, Voice Note, or Location to report a civic issue in your ward.`;
    }

    return NextResponse.json({
      status: 'success',
      processed_message_id: message.id,
      simulated_reply: replyText,
    });
  } catch (error) {
    console.error('[WhatsApp Webhook Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
