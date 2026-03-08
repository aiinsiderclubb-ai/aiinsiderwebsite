import { NextRequest, NextResponse } from 'next/server';
import { updateLeadSalesFields, type SalesStatus } from '@/app/lib/leads/store';

function isUuid(v: unknown) {
  if (typeof v !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.trim());
}

const SALES_STATUSES: SalesStatus[] = ['new', 'contacted', 'qualified', 'booked', 'won', 'lost'];

function asSalesStatus(v: unknown): SalesStatus | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim() as SalesStatus;
  return (SALES_STATUSES as string[]).includes(s) ? s : undefined;
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

  const salesStatus = body?.salesStatus !== undefined ? asSalesStatus(body?.salesStatus) : undefined;
  if (body?.salesStatus !== undefined && !salesStatus) {
    return NextResponse.json({ ok: false, error: 'invalid_sales_status' }, { status: 400 });
  }

  let notes: string | null | undefined = undefined;
  if (body?.notes !== undefined) {
    if (body.notes === null) notes = null;
    else if (typeof body.notes === 'string') {
      const trimmed = body.notes.trim();
      notes = trimmed ? trimmed.slice(0, 5000) : null;
    } else {
      return NextResponse.json({ ok: false, error: 'invalid_notes' }, { status: 400 });
    }
  }

  await updateLeadSalesFields({ id, salesStatus, notes });
  return NextResponse.json({ ok: true }, { status: 200 });
}

