import type { Metadata } from 'next';
import RetryButton from './RetryButton';
import NotesEditor from './NotesEditor';
import SalesStatusSelect from './SalesStatusSelect';
import { listLeadSubmissions, type LeadDeliveryStatus, type LeadFilters, type LeadSortDir, type LeadSortKey, type SalesStatus } from '@/app/lib/leads/store';
import type { LeadPriority } from '@/app/lib/leads/scoring';
import type { ConversionFormType, ConversionLocale, ConversionVertical } from '@/app/lib/forms/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin • Leads',
  robots: { index: false, follow: false },
};

const FORM_TYPES: Array<ConversionFormType> = ['lead-magnet', 'audit-request', 'contact', 'booking', 'chat-lead'];
const LOCALES: Array<ConversionLocale> = ['uk', 'en'];
const VERTICALS: Array<ConversionVertical> = ['beauty', 'flowers', 'general', 'real_estate', 'ecommerce'];
const DELIVERY_STATUSES: Array<LeadDeliveryStatus> = ['new', 'delivered', 'failed'];
const PRIORITIES: LeadPriority[] = ['high', 'medium', 'low'];
const SALES_STATUSES: SalesStatus[] = ['new', 'contacted', 'qualified', 'booked', 'won', 'lost'];
const SORT_KEYS: Array<{ key: LeadSortKey; label: string }> = [
  { key: 'created_at', label: 'Created' },
  { key: 'lead_score', label: 'Lead score' },
  { key: 'priority', label: 'Priority' },
  { key: 'sales_status', label: 'Sales status' },
  { key: 'form_type', label: 'Form type' },
  { key: 'vertical', label: 'Vertical' },
  { key: 'locale', label: 'Locale' },
];
const SORT_DIRS: Array<{ dir: LeadSortDir; label: string }> = [
  { dir: 'desc', label: 'Desc' },
  { dir: 'asc', label: 'Asc' },
];

function asEnum<T extends string>(value: unknown, allowed: readonly T[]): T | undefined {
  if (typeof value !== 'string') return undefined;
  const v = value.trim() as T;
  return (allowed as readonly string[]).includes(v) ? v : undefined;
}

function formatLeadPreview(payload: any) {
  const lead = (payload?.lead && typeof payload.lead === 'object') ? payload.lead : {};
  const parts: string[] = [];
  if (lead.name) parts.push(String(lead.name));
  if (lead.email) parts.push(String(lead.email));
  if (lead.phone) parts.push(String(lead.phone));
  if (lead.contact) parts.push(String(lead.contact));
  if (lead.company) parts.push(String(lead.company));
  if (lead.salonSize) parts.push(`size:${String(lead.salonSize)}`);
  if (lead.monthlyBookings) parts.push(`bookings:${String(lead.monthlyBookings)}`);
  if (lead.date && lead.time) parts.push(`${String(lead.date)} ${String(lead.time)}`);
  return parts.slice(0, 5).join(' • ');
}

function statusBadge(status: LeadDeliveryStatus) {
  if (status === 'delivered') return 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100';
  if (status === 'failed') return 'border-rose-400/30 bg-rose-500/10 text-rose-100';
  return 'border-sky-400/30 bg-sky-500/10 text-sky-100';
}

function priorityBadge(priority: LeadPriority) {
  if (priority === 'high') return 'border-orange-400/30 bg-orange-500/10 text-orange-100';
  if (priority === 'medium') return 'border-amber-400/30 bg-amber-500/10 text-amber-100';
  return 'border-slate-400/30 bg-slate-500/10 text-slate-100';
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const formType = asEnum(Array.isArray(sp.formType) ? sp.formType[0] : sp.formType, FORM_TYPES);
  const locale = asEnum(Array.isArray(sp.locale) ? sp.locale[0] : sp.locale, LOCALES);
  const vertical = asEnum(Array.isArray(sp.vertical) ? sp.vertical[0] : sp.vertical, VERTICALS);
  const delivery = asEnum(Array.isArray(sp.delivery) ? sp.delivery[0] : sp.delivery, DELIVERY_STATUSES);
  const priority = asEnum(Array.isArray(sp.priority) ? sp.priority[0] : sp.priority, PRIORITIES);
  const salesStatus = asEnum(Array.isArray(sp.salesStatus) ? sp.salesStatus[0] : sp.salesStatus, SALES_STATUSES);
  const sortKey = asEnum(Array.isArray(sp.sortKey) ? sp.sortKey[0] : sp.sortKey, SORT_KEYS.map((x) => x.key)) || 'created_at';
  const sortDir = asEnum(Array.isArray(sp.sortDir) ? sp.sortDir[0] : sp.sortDir, SORT_DIRS.map((x) => x.dir)) || 'desc';

  const filters: LeadFilters = {
    ...(formType ? { formType } : {}),
    ...(locale ? { locale } : {}),
    ...(vertical ? { vertical } : {}),
    ...(delivery ? { deliveryStatus: delivery } : {}),
    ...(priority ? { priority } : {}),
    ...(salesStatus ? { salesStatus } : {}),
  };

  let leads: Awaited<ReturnType<typeof listLeadSubmissions>> = [];
  let loadError: string | null = null;
  try {
    leads = await listLeadSubmissions({ filters, limit: 200, offset: 0, sort: { key: sortKey, dir: sortDir } });
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Failed to load leads.';
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Leads</h1>
          <p className="text-sm text-white/60">
            Internal lead ops: persisted submissions + webhook delivery status.
          </p>
        </div>

        <form className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-4 lg:grid-cols-8">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Form</span>
            <select name="formType" defaultValue={formType || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {FORM_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Locale</span>
            <select name="locale" defaultValue={locale || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {LOCALES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Vertical</span>
            <select name="vertical" defaultValue={vertical || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {VERTICALS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Delivery</span>
            <select name="delivery" defaultValue={delivery || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {DELIVERY_STATUSES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Priority</span>
            <select name="priority" defaultValue={priority || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {PRIORITIES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Sales</span>
            <select name="salesStatus" defaultValue={salesStatus || ''} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              <option value="">All</option>
              {SALES_STATUSES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Sort</span>
            <select name="sortKey" defaultValue={sortKey} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              {SORT_KEYS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/60">Dir</span>
            <select name="sortDir" defaultValue={sortDir} className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
              {SORT_DIRS.map((t) => (
                <option key={t.dir} value={t.dir}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-100"
            >
              Apply
            </button>
          </div>
        </form>

        {loadError ? (
          <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100">
            <div className="font-semibold">Lead store is not available</div>
            <div className="mt-1 text-xs text-rose-100/80 break-all">{loadError}</div>
          </div>
        ) : null}

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs text-white/70">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Delivery</th>
                  <th className="px-4 py-3">Form</th>
                  <th className="px-4 py-3">Locale</th>
                  <th className="px-4 py-3">Vertical</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Sales</th>
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Notes</th>
                  <th className="px-4 py-3">Webhook</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-10 text-center text-white/60">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="bg-black/40">
                      <td className="px-4 py-3 whitespace-nowrap text-white/70">
                        {new Date(lead.createdAt).toLocaleString('en-GB')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusBadge(lead.status)}`}>
                          {lead.status}
                        </span>
                        <div className="mt-1 text-[10px] text-white/40">Attempts: {lead.attempts}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold">{lead.formType}</div>
                        <div className="text-[10px] text-white/40">{lead.pageType}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{lead.locale}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{lead.vertical}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-white/80">
                        <div className="font-semibold">{lead.leadScore}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityBadge(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <SalesStatusSelect id={lead.id} value={lead.salesStatus} />
                      </td>
                      <td className="px-4 py-3 min-w-[260px]">
                        <div className="text-white/90">{formatLeadPreview(lead.payload)}</div>
                        <div className="mt-1 text-[10px] text-white/40 break-all">
                          {lead.slug || '—'} {lead.sourceSection ? `• ${lead.sourceSection}` : ''}{' '}
                          {lead.ctaType ? `• ${lead.ctaType}` : ''} {lead.ctaVariant ? `(${lead.ctaVariant})` : ''}
                        </div>
                      </td>
                      <td className="px-4 py-3 min-w-[220px]">
                        <NotesEditor id={lead.id} initialNotes={lead.notes} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white/80">
                          {lead.webhook.ok === null ? '—' : lead.webhook.ok ? 'OK' : 'FAIL'}{' '}
                          {lead.webhook.status ? `• ${lead.webhook.status}` : ''}
                        </div>
                        <div className="mt-1 text-[10px] text-white/40">
                          {lead.webhook.durationMs ? `${lead.webhook.durationMs}ms` : ''}{' '}
                          {lead.webhook.requestId ? `• ${lead.webhook.requestId}` : ''}
                        </div>
                        {lead.webhook.error ? (
                          <div className="mt-1 text-[10px] text-rose-200/80">{lead.webhook.error}</div>
                        ) : null}
                        {lead.webhook.responseSnippet ? (
                          <div className="mt-1 text-[10px] text-white/40 max-w-[420px] truncate">
                            {lead.webhook.responseSnippet}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <RetryButton id={lead.id} disabled={lead.status !== 'failed'} />
                        <div className="mt-2 text-[10px] text-white/30 break-all">{lead.id}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

