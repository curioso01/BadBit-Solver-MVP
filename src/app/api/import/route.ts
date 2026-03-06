import { NextResponse } from 'next/server';
import { parseHandHistory } from '@/lib/parsers/hand-parser';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as { rawText?: string; source?: string };
  if (!body.rawText || body.rawText.length < 10) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }
  const parsed = parseHandHistory(body.rawText);

  return NextResponse.json({ ok: true, platform: parsed.platform, parsed });
}
