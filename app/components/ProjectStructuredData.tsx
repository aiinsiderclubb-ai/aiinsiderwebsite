'use client';

import { getProjectBySlug, getProjectDescription } from '@/app/lib/projectsData';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { withLang } from '@/app/lib/i18n';
import type { Language } from '@/app/lib/translations';

type Props = {
  slug: string;
  lang: Language;
};

export default function ProjectStructuredData({ slug, lang }: Props) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  const siteUrl = getSiteUrl();
  const siteOrigin = siteUrl.toString().replace(/\/$/, '');
  const projectUrl = new URL(withLang(lang, `/projects/${project.slug}`), siteUrl).toString();
  const homeUrl = new URL(withLang(lang, '/'), siteUrl).toString();
  const projectsUrl = new URL(withLang(lang, '/projects'), siteUrl).toString();
  const homeLabel = lang === 'en' ? 'Home' : 'Головна';
  const projectsLabel = lang === 'en' ? 'Projects' : 'Проєкти';

  const softwareApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: getProjectDescription(project, lang),
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: projectUrl,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteOrigin,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: projectsLabel,
        item: projectsUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
