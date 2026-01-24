import type { MetadataRoute } from 'next';
import { casesData } from './lib/casesData';
import { getSiteUrl } from './lib/site';
import { SUPPORTED_LANGS, withLang } from './lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPaths = ['/', '/about', '/cases', '/projects', '/solutions/real-estate'] as const;

  const staticRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    staticPaths.map((path) => ({
      url: new URL(withLang(lang, path), siteUrl).toString(),
      lastModified: now,
      changeFrequency: path === '/' || path === '/cases' || path === '/solutions/real-estate' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : path === '/cases' || path === '/solutions/real-estate' ? 0.9 : 0.8,
    }))
  );

  const caseRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    casesData
      .filter((c) => c.slug !== 'sweezy') // dedicated page exists at /cases/sweezy
      .map((c) => ({
        url: new URL(withLang(lang, `/cases/${c.slug}`), siteUrl).toString(),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
  );

  const dedicatedCaseRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.map((lang) => ({
    url: new URL(withLang(lang, '/cases/sweezy'), siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

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
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...dedicatedCaseRoutes, ...caseRoutes, ...projectRoutes];
}

