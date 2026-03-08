import { NextRequest, NextResponse } from 'next/server';
import { retryLeadSubmission } from '@/app/lib/leads/retry';
import { getLeadSubmission } from '@/app/lib/leads/store';

function isUuid(v: unknown) {
  if (typeof v !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.trim());
}

export async function POST(request: NextRequest) {
  let body: any = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const id = body?.id;
  if (!isUuid(id)) {
    return NextResponse.json({ ok: false, error: 'invalid_id' }, { status: 400 });
  }

  const existing = await getLeadSubmission(id);
  if (!existing) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const result = await retryLeadSubmission(id);
  return NextResponse.json(
    { ok: result.ok, status: result.status, webhookStatus: result.webhookStatus },
    { status: result.ok ? 200 : 502 }
  );
}

