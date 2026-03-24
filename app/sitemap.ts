import type { MetadataRoute } from 'next';
import { casesData } from './lib/casesData';
import { getSiteUrl } from './lib/site';
import { SUPPORTED_LANGS, withLang } from './lib/i18n';
import { servicesData } from './lib/servicesData';
import { getPublishedBlogArticles } from './lib/blogData';
import { PROGRAMMATIC_PAGES } from './lib/programmaticSeo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  /* ── Static pages ────────────────────────────────────────── */
  const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/cases', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/projects', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/ai-content-creation', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/content-factory', changeFrequency: 'monthly', priority: 0.95 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/solutions', changeFrequency: 'weekly', priority: 0.8 },
    // SEO landing pages
    { path: '/ai-automation-for-business', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-chatbots-for-business', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-voice-agents', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-receptionist', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-sdr', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-proposal-generator', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-automation-for-ecommerce', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/ai-automation-for-saas', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/custom-ai-agents', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/content-factory-for-coaches', changeFrequency: 'monthly', priority: 0.85 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    staticPages.map(({ path, changeFrequency, priority }) => ({
      url: new URL(withLang(lang, path), siteUrl).toString(),
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );

  /* ── Cases ───────────────────────────────────────────────── */
  const caseRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    casesData
      .filter((c) => c.slug !== 'sweezy')
      .map((c) => ({
        url: new URL(withLang(lang, `/cases/${c.slug}`), siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  );

  const dedicatedCaseRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.map((lang) => ({
    url: new URL(withLang(lang, '/cases/sweezy'), siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ── Projects ────────────────────────────────────────────── */
  const projectSlugs = [
    'voiceflow-pro',
    'autoscale-crm',
    'supportbot-360',
    'predictai-analytics',
    'meetingmaster-ai',
    'workflowx-engine',
    'sweezy',
  ];

  const projectRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    projectSlugs.map((slug) => ({
      url: new URL(withLang(lang, `/projects/${slug}`), siteUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  /* ── Service detail pages ────────────────────────────────── */
  const serviceRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    servicesData.map((s) => ({
      url: new URL(withLang(lang, `/services/${s.slug}`), siteUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  /* ── Blog articles ─────────────────────────────────────────── */
  const publishedArticles = getPublishedBlogArticles();
  const blogRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    publishedArticles.map((a) => ({
      url: new URL(withLang(lang, `/blog/${a.slug}`), siteUrl).toString(),
      lastModified: new Date(a.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  /* ── Programmatic SEO pages (solutions) ─────────────────────── */
  const solutionRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    PROGRAMMATIC_PAGES.map((p) => ({
      url: new URL(withLang(lang, `/solutions/${p.slug}`), siteUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  const ukOnlyRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl.toString().replace(/\/$/, '')}/uk/avtomatizaciya-salonu-krasy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl.toString().replace(/\/$/, '')}/uk/avtomatizaciya-nerukhomosti`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...solutionRoutes,
    ...ukOnlyRoutes,
    ...dedicatedCaseRoutes,
    ...caseRoutes,
    ...projectRoutes,
  ];
}
