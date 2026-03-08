export type ConversionLocale = 'uk' | 'en';

// Keep this broader than analytics to allow future verticals (e.g. flowers)
export type ConversionVertical = 'beauty' | 'flowers' | 'general' | 'real_estate' | 'ecommerce';

export type ConversionPageType = 'pillar' | 'blog_article' | 'blog_list' | 'service' | 'home' | 'other';

export type ConversionFormType = 'lead-magnet' | 'audit-request' | 'contact' | 'booking' | 'chat-lead';

export type CtaType = 'checklist' | 'roi' | 'audit' | 'generic';
export type CtaVariant = 'primary' | 'secondary' | 'unknown';

export type ConversionAttribution = {
  locale: ConversionLocale;
  vertical: ConversionVertical;
  pageType: ConversionPageType;
  /**
   * Slug or path-like identifier (e.g. blog slug, or pathname).
   * Do not assume this is a DB ID.
   */
  slug?: string;
  sourceSection?: string;
  ctaType?: CtaType;
  ctaVariant?: CtaVariant;
};

export type PageInfo = {
  path?: string;
  url?: string;
  referer?: string;
};

export type UTMParams = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term', string>>;

export type RequestContext = {
  ip?: string;
  userAgent?: string;
};

export type TelegramPayload = {
  message: string;
};

export type ConversionPayload = {
  schemaVersion: '2026-03-08';
  submittedAt: string;
  form: {
    type: ConversionFormType;
  };
  attribution: ConversionAttribution;
  page: PageInfo;
  utm?: UTMParams;
  lead: Record<string, unknown>;
  context: RequestContext;
  telegram?: TelegramPayload;
};

export type SubmitResponse =
  | { ok: true }
  | { ok: false; error: 'validation_error'; message: string; fields?: Record<string, string> }
  | { ok: false; error: 'config_error'; message: string }
  | { ok: false; error: 'webhook_error'; message: string };

