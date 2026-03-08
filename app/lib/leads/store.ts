import { neon } from '@neondatabase/serverless';
import type { ConversionPayload, ConversionFormType, ConversionLocale, ConversionPageType, ConversionVertical } from '@/app/lib/forms/types';
import { randomUUID } from 'crypto';
import { computeLeadScore, scoreToPriority, type LeadPriority } from '@/app/lib/leads/scoring';

export type LeadDeliveryStatus = 'new' | 'delivered' | 'failed';
export type SalesStatus = 'new' | 'contacted' | 'qualified' | 'booked' | 'won' | 'lost';

export type LeadFilters = Partial<{
  formType: ConversionFormType;
  locale: ConversionLocale;
  vertical: ConversionVertical;
  deliveryStatus: LeadDeliveryStatus;
  priority: LeadPriority;
  salesStatus: SalesStatus;
}>;

export type LeadSortKey = 'created_at' | 'lead_score' | 'priority' | 'sales_status' | 'form_type' | 'vertical' | 'locale';
export type LeadSortDir = 'asc' | 'desc';

export type LeadRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadDeliveryStatus; // delivery status
  attempts: number;
  lastAttemptAt: string | null;
  deliveredAt: string | null;
  leadScore: number;
  priority: LeadPriority;
  salesStatus: SalesStatus;
  notes: string | null;
  formType: ConversionFormType;
  locale: ConversionLocale;
  vertical: ConversionVertical;
  pageType: ConversionPageType;
  slug: string | null;
  sourceSection: string | null;
  ctaType: string | null;
  ctaVariant: string | null;
  webhook: {
    ok: boolean | null;
    status: number | null;
    durationMs: number | null;
    responseSnippet: string | null;
    error: string | null;
    contentType: string | null;
    requestId: string | null;
  };
  payload: ConversionPayload;
};

type WebhookResult = {
  ok: boolean;
  status: number | null;
  durationMs: number | null;
  responseSnippet: string | null;
  contentType: string | null;
  requestId: string | null;
  error: string | null;
};

let sqlClient: ReturnType<typeof neon> | null = null;

function resolveDatabaseUrl() {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.POSTGRES_PRISMA_URL?.trim() ||
    process.env.POSTGRES_URL_NON_POOLING?.trim() ||
    ''
  );
}

function db() {
  if (sqlClient) return sqlClient;
  const url = resolveDatabaseUrl();
  if (!url) {
    throw new Error('DATABASE_URL (or POSTGRES_URL) is not configured for lead storage.');
  }
  sqlClient = neon(url);
  return sqlClient;
}

let ensured: Promise<void> | null = null;

async function ensureSchema() {
  if (ensured) return ensured;
  ensured = (async () => {
    const sql = db();
    await sql`
      create table if not exists lead_submissions (
        id uuid primary key,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now(),
        status text not null check (status in ('new','delivered','failed')),
        attempts integer not null default 0,
        last_attempt_at timestamptz,
        delivered_at timestamptz,

        lead_score integer not null default 0,
        priority text not null default 'low',
        sales_status text not null default 'new',
        notes text,

        form_type text not null,
        locale text not null,
        vertical text not null,
        page_type text not null,
        slug text,
        source_section text,
        cta_type text,
        cta_variant text,

        payload jsonb not null,

        webhook_ok boolean,
        webhook_status integer,
        webhook_duration_ms integer,
        webhook_response_snippet text,
        webhook_error text,
        webhook_content_type text,
        webhook_request_id text
      );
    `;

    // Lightweight migrations for existing installs
    await sql`alter table lead_submissions add column if not exists lead_score integer not null default 0;`;
    await sql`alter table lead_submissions add column if not exists priority text not null default 'low';`;
    await sql`alter table lead_submissions add column if not exists sales_status text not null default 'new';`;
    await sql`alter table lead_submissions add column if not exists notes text;`;

    await sql`create index if not exists lead_submissions_created_at_idx on lead_submissions (created_at desc);`;
    await sql`create index if not exists lead_submissions_filter_idx on lead_submissions (form_type, locale, vertical, status);`;
    await sql`create index if not exists lead_submissions_status_created_at_idx on lead_submissions (status, created_at desc);`;
    await sql`create index if not exists lead_submissions_sales_status_idx on lead_submissions (sales_status, created_at desc);`;
    await sql`create index if not exists lead_submissions_priority_idx on lead_submissions (priority, lead_score desc, created_at desc);`;
  })();
  return ensured;
}

function toIso(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === 'string') return v;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function asJson<T>(value: unknown): T {
  if (!value) return value as T;
  if (typeof value === 'object') return value as T;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }
  return value as T;
}

export async function createLeadSubmission(payload: ConversionPayload): Promise<string> {
  await ensureSchema();
  const sql = db();
  const id = randomUUID();
  const leadScore = computeLeadScore(payload);
  const priority = scoreToPriority(leadScore);
  const salesStatus: SalesStatus = 'new';

  await sql`
    insert into lead_submissions (
      id,
      status,
      lead_score,
      priority,
      sales_status,
      notes,
      form_type,
      locale,
      vertical,
      page_type,
      slug,
      source_section,
      cta_type,
      cta_variant,
      payload
    ) values (
      ${id}::uuid,
      'new',
      ${leadScore},
      ${priority},
      ${salesStatus},
      ${null},
      ${payload.form.type},
      ${payload.attribution.locale},
      ${payload.attribution.vertical},
      ${payload.attribution.pageType},
      ${payload.attribution.slug ?? null},
      ${payload.attribution.sourceSection ?? null},
      ${payload.attribution.ctaType ?? null},
      ${payload.attribution.ctaVariant ?? null},
      ${JSON.stringify(payload)}::jsonb
    );
  `;

  return id;
}

export async function recordLeadDeliveryResult(input: {
  id: string;
  status: LeadDeliveryStatus;
  incrementAttempt: boolean;
  webhook: WebhookResult;
}): Promise<void> {
  await ensureSchema();
  const sql = db();

  await sql`
    update lead_submissions
    set
      updated_at = now(),
      status = ${input.status},
      attempts = attempts + (case when ${input.incrementAttempt} then 1 else 0 end),
      last_attempt_at = (case when ${input.incrementAttempt} then now() else last_attempt_at end),
      delivered_at = (case when ${input.status} = 'delivered' then now() else delivered_at end),
      webhook_ok = ${input.webhook.ok},
      webhook_status = ${input.webhook.status},
      webhook_duration_ms = ${input.webhook.durationMs},
      webhook_response_snippet = ${input.webhook.responseSnippet},
      webhook_error = ${input.webhook.error},
      webhook_content_type = ${input.webhook.contentType},
      webhook_request_id = ${input.webhook.requestId}
    where id = ${input.id}::uuid;
  `;
}

export async function getLeadSubmission(id: string): Promise<LeadRecord | null> {
  await ensureSchema();
  const sql = db();
  const res = await sql`
    select
      id::text as id,
      created_at,
      updated_at,
      status,
      attempts,
      last_attempt_at,
      delivered_at,
      lead_score,
      priority,
      sales_status,
      notes,
      form_type,
      locale,
      vertical,
      page_type,
      slug,
      source_section,
      cta_type,
      cta_variant,
      webhook_ok,
      webhook_status,
      webhook_duration_ms,
      webhook_response_snippet,
      webhook_error,
      webhook_content_type,
      webhook_request_id,
      payload
    from lead_submissions
    where id = ${id}::uuid
    limit 1;
  `;
  const rows = Array.isArray(res) ? res : ((res as any)?.rows as any[] | undefined) || [];
  const row = rows?.[0] as any;
  if (!row) return null;

  return {
    id: String(row.id),
    createdAt: toIso(row.created_at) || new Date().toISOString(),
    updatedAt: toIso(row.updated_at) || new Date().toISOString(),
    status: row.status as LeadDeliveryStatus,
    attempts: Number(row.attempts || 0),
    lastAttemptAt: toIso(row.last_attempt_at),
    deliveredAt: toIso(row.delivered_at),
    leadScore: Number(row.lead_score || 0),
    priority: (row.priority || 'low') as LeadPriority,
    salesStatus: (row.sales_status || 'new') as SalesStatus,
    notes: row.notes ? String(row.notes) : null,
    formType: row.form_type as ConversionFormType,
    locale: row.locale as ConversionLocale,
    vertical: row.vertical as ConversionVertical,
    pageType: row.page_type as ConversionPageType,
    slug: row.slug ? String(row.slug) : null,
    sourceSection: row.source_section ? String(row.source_section) : null,
    ctaType: row.cta_type ? String(row.cta_type) : null,
    ctaVariant: row.cta_variant ? String(row.cta_variant) : null,
    webhook: {
      ok: row.webhook_ok === null || row.webhook_ok === undefined ? null : Boolean(row.webhook_ok),
      status: row.webhook_status === null || row.webhook_status === undefined ? null : Number(row.webhook_status),
      durationMs: row.webhook_duration_ms === null || row.webhook_duration_ms === undefined ? null : Number(row.webhook_duration_ms),
      responseSnippet: row.webhook_response_snippet ? String(row.webhook_response_snippet) : null,
      error: row.webhook_error ? String(row.webhook_error) : null,
      contentType: row.webhook_content_type ? String(row.webhook_content_type) : null,
      requestId: row.webhook_request_id ? String(row.webhook_request_id) : null,
    },
    payload: asJson<ConversionPayload>(row.payload),
  };
}

export async function listLeadSubmissions(input: {
  filters?: LeadFilters;
  limit?: number;
  offset?: number;
  sort?: { key: LeadSortKey; dir: LeadSortDir };
}): Promise<LeadRecord[]> {
  await ensureSchema();
  const sql = db();
  const limit = Math.min(Math.max(input.limit ?? 100, 1), 500);
  const offset = Math.max(input.offset ?? 0, 0);

  const formType = input.filters?.formType ?? null;
  const locale = input.filters?.locale ?? null;
  const vertical = input.filters?.vertical ?? null;
  const deliveryStatus = input.filters?.deliveryStatus ?? null;
  const priority = input.filters?.priority ?? null;
  const salesStatus = input.filters?.salesStatus ?? null;

  const sortKey: LeadSortKey = input.sort?.key ?? 'created_at';
  const sortDir: LeadSortDir = input.sort?.dir ?? 'desc';

  const res = await sql`
    select
      id::text as id,
      created_at,
      updated_at,
      status,
      attempts,
      last_attempt_at,
      delivered_at,
      lead_score,
      priority,
      sales_status,
      notes,
      form_type,
      locale,
      vertical,
      page_type,
      slug,
      source_section,
      cta_type,
      cta_variant,
      webhook_ok,
      webhook_status,
      webhook_duration_ms,
      webhook_response_snippet,
      webhook_error,
      webhook_content_type,
      webhook_request_id,
      payload
    from lead_submissions
    where (${formType}::text is null or form_type = ${formType})
      and (${locale}::text is null or locale = ${locale})
      and (${vertical}::text is null or vertical = ${vertical})
      and (${deliveryStatus}::text is null or status = ${deliveryStatus})
      and (${priority}::text is null or priority = ${priority})
      and (${salesStatus}::text is null or sales_status = ${salesStatus})
    order by
      -- created_at
      case when ${sortKey} = 'created_at' and ${sortDir} = 'asc' then created_at end asc,
      case when ${sortKey} = 'created_at' and ${sortDir} = 'desc' then created_at end desc,

      -- lead_score
      case when ${sortKey} = 'lead_score' and ${sortDir} = 'asc' then lead_score end asc,
      case when ${sortKey} = 'lead_score' and ${sortDir} = 'desc' then lead_score end desc,

      -- priority (high > medium > low)
      case
        when ${sortKey} = 'priority' and ${sortDir} = 'asc'
          then case priority when 'high' then 3 when 'medium' then 2 when 'low' then 1 else 0 end
        end asc,
      case
        when ${sortKey} = 'priority' and ${sortDir} = 'desc'
          then case priority when 'high' then 3 when 'medium' then 2 when 'low' then 1 else 0 end
        end desc,

      -- sales_status (pipeline order)
      case
        when ${sortKey} = 'sales_status' and ${sortDir} = 'asc'
          then case sales_status
            when 'new' then 1
            when 'contacted' then 2
            when 'qualified' then 3
            when 'booked' then 4
            when 'won' then 5
            when 'lost' then 6
            else 99
          end
        end asc,
      case
        when ${sortKey} = 'sales_status' and ${sortDir} = 'desc'
          then case sales_status
            when 'new' then 1
            when 'contacted' then 2
            when 'qualified' then 3
            when 'booked' then 4
            when 'won' then 5
            when 'lost' then 6
            else 99
          end
        end desc,

      -- alpha fields
      case when ${sortKey} = 'form_type' and ${sortDir} = 'asc' then form_type end asc,
      case when ${sortKey} = 'form_type' and ${sortDir} = 'desc' then form_type end desc,
      case when ${sortKey} = 'vertical' and ${sortDir} = 'asc' then vertical end asc,
      case when ${sortKey} = 'vertical' and ${sortDir} = 'desc' then vertical end desc,
      case when ${sortKey} = 'locale' and ${sortDir} = 'asc' then locale end asc,
      case when ${sortKey} = 'locale' and ${sortDir} = 'desc' then locale end desc,

      created_at desc
    limit ${limit}
    offset ${offset};
  `;

  const rows = Array.isArray(res) ? res : ((res as any)?.rows as any[] | undefined) || [];
  return (rows as any[]).map((row) => ({
    id: String(row.id),
    createdAt: toIso(row.created_at) || new Date().toISOString(),
    updatedAt: toIso(row.updated_at) || new Date().toISOString(),
    status: row.status as LeadDeliveryStatus,
    attempts: Number(row.attempts || 0),
    lastAttemptAt: toIso(row.last_attempt_at),
    deliveredAt: toIso(row.delivered_at),
    leadScore: Number(row.lead_score || 0),
    priority: (row.priority || 'low') as LeadPriority,
    salesStatus: (row.sales_status || 'new') as SalesStatus,
    notes: row.notes ? String(row.notes) : null,
    formType: row.form_type as ConversionFormType,
    locale: row.locale as ConversionLocale,
    vertical: row.vertical as ConversionVertical,
    pageType: row.page_type as ConversionPageType,
    slug: row.slug ? String(row.slug) : null,
    sourceSection: row.source_section ? String(row.source_section) : null,
    ctaType: row.cta_type ? String(row.cta_type) : null,
    ctaVariant: row.cta_variant ? String(row.cta_variant) : null,
    webhook: {
      ok: row.webhook_ok === null || row.webhook_ok === undefined ? null : Boolean(row.webhook_ok),
      status: row.webhook_status === null || row.webhook_status === undefined ? null : Number(row.webhook_status),
      durationMs: row.webhook_duration_ms === null || row.webhook_duration_ms === undefined ? null : Number(row.webhook_duration_ms),
      responseSnippet: row.webhook_response_snippet ? String(row.webhook_response_snippet) : null,
      error: row.webhook_error ? String(row.webhook_error) : null,
      contentType: row.webhook_content_type ? String(row.webhook_content_type) : null,
      requestId: row.webhook_request_id ? String(row.webhook_request_id) : null,
    },
    payload: asJson<ConversionPayload>(row.payload),
  }));
}

export async function updateLeadSalesFields(input: {
  id: string;
  salesStatus?: SalesStatus;
  notes?: string | null;
}): Promise<void> {
  await ensureSchema();
  const sql = db();

  const applySales = input.salesStatus !== undefined;
  const applyNotes = input.notes !== undefined;

  await sql`
    update lead_submissions
    set
      updated_at = now(),
      sales_status = (case when ${applySales} then ${input.salesStatus ?? null} else sales_status end),
      notes = (case when ${applyNotes} then ${input.notes ?? null} else notes end)
    where id = ${input.id}::uuid;
  `;
}

