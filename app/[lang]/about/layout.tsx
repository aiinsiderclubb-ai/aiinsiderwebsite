import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { translations } from '@/app/lib/translations';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/about';

  const title = lang === 'en' ? 'About AI Insider — AI automation & agents team' : 'Про AI Insider — команда AI автоматизації та агентів';
  const description =
    lang === 'en'
      ? 'Meet AI Insider: we build AI automation, AI agents, voice agents, n8n workflows, and AI-driven marketing systems for businesses in Switzerland and globally.'
      : 'Познайомтесь з AI Insider: ми будуємо AI автоматизацію, AI агентів, голосових агентів, n8n воркфлоу та AI‑маркетинг системи для бізнесу в Швейцарії та глобально.';

  return {
    title,
    description,
    keywords:
      lang === 'en'
        ? [
            'AI automation',
            'AI agents',
            'AI voice agents',
            'business automation',
            'n8n automation',
            'AI-driven marketing',
            'workflow automation',
            'CRM automation',
            'Switzerland',
            'Zurich',
          ]
        : [
            'AI автоматизація',
            'AI агенти',
            'AI голосові агенти',
            'автоматизація бізнесу',
            'n8n автоматизація',
            'AI маркетинг',
            'автоматизація процесів',
            'автоматизація CRM',
            'Швейцарія',
            'Цюрих',
          ],
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title,
      description,
      url: withLang(lang, path),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default async function AboutLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return children;
  }

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, '/about'), siteUrl).toString();
  const isEn = lang === 'en';
  const t = (v: { uk: string; en: string }) => v[lang] || v.en;

  const orgId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;

  const vladId = `${siteUrl}#vladyslav-archer`;
  const vladImage = new URL('/images/team/hf_20260220_083203_481eab3a-8c9b-4bcf-8416-dc13dd09d3d7.jpeg', siteUrl).toString();

  const volodymyrId = `${siteUrl}#volodymyr-ops`;

  const persons = [
    {
      '@type': 'Person',
      '@id': vladId,
      name: 'Vladyslav Archer',
      jobTitle: 'CEO',
      image: vladImage,
      url: `${canonicalUrl}#vladyslav-archer`,
      worksFor: { '@id': orgId },
      sameAs: [
        'https://www.linkedin.com/in/vladyslav-katash/',
        'https://www.instagram.com/vladyslav.archer?igsh=MXc1c3hkODU5dW9hMQ%3D%3D&utm_source=qr',
      ],
    },
    {
      '@type': 'Person',
      '@id': volodymyrId,
      name: 'Volodymyr',
      jobTitle: 'Operations Manager',
      url: `${canonicalUrl}#volodymyr`,
      worksFor: { '@id': orgId },
    },
  ];

  const aboutPageTitle = isEn ? 'About AI Insider' : 'Про AI Insider';
  const aboutPageDescription = t(translations.about.geoIntro);

  const geoFaq = [
    { q: t(translations.about.geoQ1), a: t(translations.about.geoA1) },
    { q: t(translations.about.geoQ2), a: t(translations.about.geoA2) },
    { q: t(translations.about.geoQ3), a: t(translations.about.geoA3) },
    { q: t(translations.about.geoQ4), a: t(translations.about.geoA4) },
  ];

  const aboutPageJsonLd = {
    '@type': 'AboutPage',
    '@id': `${canonicalUrl}#aboutpage`,
    url: canonicalUrl,
    name: aboutPageTitle,
    description: aboutPageDescription,
    inLanguage: isEn ? 'en-US' : 'uk-UA',
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    primaryImageOfPage: { '@type': 'ImageObject', url: vladImage },
    mainEntity: persons.map((p) => ({ '@id': (p as { '@id': string })['@id'] })),
  };

  const breadcrumbJsonLd = {
    '@type': 'BreadcrumbList',
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
        name: aboutPageTitle,
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    inLanguage: isEn ? 'en-US' : 'uk-UA',
    mainEntity: geoFaq.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      aboutPageJsonLd,
      breadcrumbJsonLd,
      faqJsonLd,
      ...persons,
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: aboutPageTitle,
        description: aboutPageDescription,
        inLanguage: isEn ? 'en-US' : 'uk-UA',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'Organization',
        '@id': orgId,
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
      {children}
    </>
  );
}

