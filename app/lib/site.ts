export const SITE_NAME = 'AI Insider';

export const DEFAULT_TITLE = 'AI Insider | AI Automation & Voice Agent Studio';
export const TITLE_TEMPLATE = '%s | AI Insider';
export const DEFAULT_DESCRIPTION =
  'We build AI systems that think, speak and act — chatbots, voice agents, and automation for your business. Based in Switzerland, working globally.';

export const DEFAULT_KEYWORDS = [
  'AI automation',
  'AI lead generation',
  'AI voice agent',
  'AI chatbot for business',
  'AI automation for real estate',
  'voice agents',
  'AI chatbots',
  'workflow automation',
  'AI studio',
  'custom AI',
  'Switzerland',
  'Zurich',
].join(', ');

/**
 * Best-effort site URL resolution for metadataBase/canonicals/sitemap.
 * Configure `NEXT_PUBLIC_SITE_URL` in Vercel (e.g. https://aiinsider.ch).
 */
export function getSiteUrl(): URL {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) return new URL(envUrl);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return new URL(`https://${vercelUrl}`);

  return new URL('http://localhost:3000');
}

