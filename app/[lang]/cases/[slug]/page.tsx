import { notFound } from 'next/navigation';
import CaseDetailClient from '@/app/cases/[slug]/page';
import { getCaseBySlug, getLocalizedText } from '@/app/lib/casesData';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';

type Params = { lang: string; slug: string };

export default async function CaseLangDetailPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, `/cases/${slug}`), siteUrl).toString();
  const isEn = lang === 'en';

  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    return <CaseDetailClient />;
  }

  const title = getLocalizedText(caseData.title, lang);
  const description = getLocalizedText(caseData.shortDescription, lang);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: isEn ? 'en-US' : 'uk-UA',
        isPartOf: { '@id': `${siteUrl}#website` },
        about: { '@id': `${canonicalUrl}#casestudy` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: new URL('/opengraph-image', siteUrl).toString(),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'Головна',
            item: new URL(withLang(lang, '/'), siteUrl).toString(),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEn ? 'Cases' : 'Кейси',
            item: new URL(withLang(lang, '/cases'), siteUrl).toString(),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'CaseStudy',
        '@id': `${canonicalUrl}#casestudy`,
        url: canonicalUrl,
        name: title,
        headline: title,
        description,
        inLanguage: isEn ? 'en-US' : 'uk-UA',
        author: { '@id': `${siteUrl}#organization` },
        publisher: { '@id': `${siteUrl}#organization` },
        keywords: caseData.technologies?.join(', '),
        about: [
          getLocalizedText(caseData.industryName, lang),
          caseData.category,
          'AI automation',
          'AI agents',
          'AI voice agents',
          'workflow automation',
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: SITE_NAME,
        url: siteUrl.origin,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CaseDetailClient />
    </>
  );
}

