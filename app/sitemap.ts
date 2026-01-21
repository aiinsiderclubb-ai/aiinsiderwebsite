import type { MetadataRoute } from 'next';
import { casesData } from './lib/casesData';
import { getSiteUrl } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: new URL('/', siteUrl).toString(), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: new URL('/about', siteUrl).toString(), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: new URL('/cases', siteUrl).toString(), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: new URL('/projects', siteUrl).toString(), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = casesData
    .filter((c) => c.slug !== 'sweezy') // dedicated page exists at /cases/sweezy
    .map((c) => ({
      url: new URL(`/cases/${c.slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const dedicatedCaseRoutes: MetadataRoute.Sitemap = [
    { url: new URL('/cases/sweezy', siteUrl).toString(), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  const projectSlugs = [
    'voiceflow-pro',
    'autoscale-crm',
    'supportbot-360',
    'predictai-analytics',
    'meetingmaster-ai',
    'workflowx-engine',
    'sweezy',
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: new URL(`/projects/${slug}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...dedicatedCaseRoutes, ...caseRoutes, ...projectRoutes];
}

