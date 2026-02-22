import { notFound } from 'next/navigation';
import CasesPageClient from '@/app/cases/page';
import { casesData, getLocalizedText } from '@/app/lib/casesData';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';

type Params = { lang: string };

export default async function CasesLangPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, '/cases'), siteUrl).toString();
  const isEn = lang === 'en';

  const title = isEn ? 'Case studies' : 'Кейси';
  const description = isEn
    ? 'Real AI automation cases with measurable business results — chatbots, voice agents and workflow automation.'
    : 'Реальні кейси AI автоматизації з вимірюваними бізнес‑результатами — чатботи, голосові агенти та workflow автоматизації.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collectionpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: isEn ? 'en-US' : 'uk-UA',
        isPartOf: { '@id': `${siteUrl}#website` },
        about: { '@id': `${siteUrl}#organization` },
        mainEntity: { '@id': `${canonicalUrl}#itemlist` },
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
            name: title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: title,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: casesData.length,
        itemListElement: casesData.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: getLocalizedText(c.title, lang),
          item: new URL(withLang(lang, `/cases/${c.slug}`), siteUrl).toString(),
        })),
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
      <CasesPageClient />
    </>
  );
}

