export type AnalyticsPageType = 'pillar' | 'blog_article' | 'blog_list' | 'service' | 'other';
export type AnalyticsVertical = 'beauty' | 'real_estate' | 'ecommerce' | 'general' | 'flowers';
export type AnalyticsLocale = 'uk' | 'en';

export type AnalyticsEventName =
  | 'aiinsider_cta_click'
  | 'aiinsider_roi_interaction'
  | 'aiinsider_form_view'
  | 'aiinsider_form_submit'
  | 'aiinsider_form_success'
  | 'aiinsider_form_error'
  | 'aiinsider_cluster_article_click'
  | 'aiinsider_scroll_depth';

export type AnalyticsContext = {
  pageType: AnalyticsPageType;
  vertical: AnalyticsVertical;
  locale: AnalyticsLocale;
};

type Primitive = string | number | boolean | null | undefined;

export type AnalyticsParams = Record<string, Primitive>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void;
    posthog?: { capture?: (event: string, properties?: Record<string, unknown>) => void };
  }
}

let ctx: AnalyticsContext | null = null;

export function setAnalyticsContext(next: AnalyticsContext) {
  ctx = next;
}

function getBaseParams(): AnalyticsParams {
  return ctx
    ? {
        page_type: ctx.pageType,
        vertical: ctx.vertical,
        locale: ctx.locale,
      }
    : {};
}

function safeString(v: unknown): string | undefined {
  if (typeof v === 'string') return v;
  return undefined;
}

function toParams(input: AnalyticsParams): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  Object.entries(input).forEach(([k, v]) => {
    if (v === undefined) return;
    out[k] = v;
  });
  return out;
}

function ga4Dispatch(eventName: string, params: AnalyticsParams) {
  if (typeof window === 'undefined') return;
  const payload = toParams(params);
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

function posthogDispatch(eventName: string, params: AnalyticsParams) {
  if (typeof window === 'undefined') return;
  if (window.posthog?.capture) {
    window.posthog.capture(eventName, toParams(params));
  }
}

export function track(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  const merged: AnalyticsParams = { ...getBaseParams(), ...params };
  ga4Dispatch(eventName, merged);
  posthogDispatch(eventName, merged);
}

export function trackCtaClick(input: {
  cta: string;
  href?: string;
  text?: string;
  sourceSection?: string;
  pageType?: AnalyticsPageType;
  vertical?: AnalyticsVertical;
  locale?: AnalyticsLocale;
}) {
  if (input.pageType && input.vertical && input.locale) {
    setAnalyticsContext({ pageType: input.pageType, vertical: input.vertical, locale: input.locale });
  }
  track('aiinsider_cta_click', {
    cta: input.cta,
    href: input.href,
    text: input.text,
    source_section: input.sourceSection,
  });
}

export function trackRoiInteraction(input: { action: 'start' | 'change'; field?: string; sourceSection?: string }) {
  track('aiinsider_roi_interaction', {
    action: input.action,
    field: input.field,
    source_section: input.sourceSection,
  });
}

export function trackFormSubmit(input: { formType: 'lead-magnet' | 'audit-request'; status: 'success' | 'error'; sourceSection?: string }) {
  // Back-compat: previously used after redirect status param.
  trackFormEvent({
    action: input.status === 'success' ? 'success' : 'error',
    formType: input.formType,
    sourceSection: input.sourceSection,
  });
}

export type FormEventAction = 'view' | 'submit' | 'success' | 'error';

const LAST_CTA_STORAGE_KEY = 'aiinsider:last_cta';

export function saveLastCtaAttribution(input: {
  cta?: string;
  href?: string;
  text?: string;
  sourceSection?: string;
  ctaType?: string;
  ctaVariant?: string;
}) {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      ts: Date.now(),
      cta: input.cta,
      href: input.href,
      text: input.text,
      source_section: input.sourceSection,
      cta_type: input.ctaType,
      cta_variant: input.ctaVariant,
    };
    window.sessionStorage.setItem(LAST_CTA_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function getLastCtaAttribution(): { ctaType?: string; ctaVariant?: string; sourceSection?: string } {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(LAST_CTA_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as any;
    return {
      ctaType: safeString(parsed?.cta_type),
      ctaVariant: safeString(parsed?.cta_variant),
      sourceSection: safeString(parsed?.source_section),
    };
  } catch {
    return {};
  }
}

export function trackFormEvent(input: {
  action: FormEventAction;
  formType: string;
  slug?: string;
  sourceSection?: string;
  ctaType?: string;
  ctaVariant?: string;
  pageType?: AnalyticsPageType;
  vertical?: AnalyticsVertical;
  locale?: AnalyticsLocale;
}) {
  const eventName: AnalyticsEventName =
    input.action === 'view'
      ? 'aiinsider_form_view'
      : input.action === 'submit'
        ? 'aiinsider_form_submit'
        : input.action === 'success'
          ? 'aiinsider_form_success'
          : 'aiinsider_form_error';

  track(eventName, {
    page_type: input.pageType,
    vertical: input.vertical,
    locale: input.locale,
    form_type: input.formType,
    slug: input.slug,
    source_section: input.sourceSection,
    cta_type: input.ctaType,
    cta_variant: input.ctaVariant,
  });
}

export function trackClusterArticleClick(input: { articleSlug: string; clusterGroup?: string; sourceSection?: string }) {
  track('aiinsider_cluster_article_click', {
    article_slug: input.articleSlug,
    cluster_group: input.clusterGroup,
    source_section: input.sourceSection,
  });
}

export function trackScrollDepth(milestone: 25 | 50 | 75 | 90) {
  track('aiinsider_scroll_depth', { milestone });
}

export function getCtaFromElement(el: Element): {
  cta?: string;
  sourceSection?: string;
  href?: string;
  text?: string;
  article?: string;
  group?: string;
  ctaType?: string;
  ctaVariant?: string;
} {
  const target = el instanceof HTMLElement ? el : null;
  if (!target) return {};
  const ctaEl = target.closest<HTMLElement>('[data-cta]');
  if (!ctaEl) return {};

  const cta = safeString(ctaEl.dataset.cta);
  const article = safeString(ctaEl.dataset.article);
  const group = safeString(ctaEl.dataset.group);
  const ctaType = safeString(ctaEl.dataset.ctaType);
  const ctaVariant = safeString(ctaEl.dataset.ctaVariant);

  const sourceSectionEl = ctaEl.closest<HTMLElement>('[data-source-section]');
  const sourceSection = safeString(sourceSectionEl?.dataset.sourceSection);

  const href = ctaEl.getAttribute('href') || (ctaEl instanceof HTMLAnchorElement ? ctaEl.href : undefined);
  const text = ctaEl.textContent?.trim();

  return { cta, sourceSection, href, text, article, group, ctaType, ctaVariant };
}
