import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProgrammaticLanding from '@/app/components/ProgrammaticLanding';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import {
  getProgrammaticPage,
  getAllProgrammaticSlugs,
  getLocalizedProgrammatic,
  PROGRAMMATIC_PAGES,
} from '@/app/lib/programmaticSeo';
import type { Language } from '@/app/lib/translations';

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  const slugs = getAllProgrammaticSlugs();
  const langs: Language[] = ['en', 'uk'];
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isSupportedLang(lang)) return {};

  const page = getProgrammaticPage(slug);
  if (!page) return {};

  const path = `/solutions/${slug}`;
  const canonical = withLang(lang, path);

  return {
    title: getLocalizedProgrammatic(page.titleTag, lang),
    description: getLocalizedProgrammatic(page.metaDescription, lang),
    alternates: {
      canonical,
      languages: buildHreflang(path),
    },
    openGraph: {
      title: getLocalizedProgrammatic(page.titleTag, lang),
      description: getLocalizedProgrammatic(page.metaDescription, lang),
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: getLocalizedProgrammatic(page.titleTag, lang),
      description: getLocalizedProgrammatic(page.metaDescription, lang),
      images: ['/twitter-image'],
    },
  };
}

export default async function ProgrammaticSolutionPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) notFound();

  const page = getProgrammaticPage(slug);
  if (!page) notFound();

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, `/solutions/${slug}`), siteUrl).toString();
  const isEn = lang === 'en';

  // JSON-LD: Service schema
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: getLocalizedProgrammatic(page.h1, lang),
    description: getLocalizedProgrammatic(page.metaDescription, lang),
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
    url: canonicalUrl,
  };

  // JSON-LD: FAQ schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getLocalizedProgrammatic(page.faq, lang).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // JSON-LD: Breadcrumb
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: isEn ? 'Solutions' : 'Рішення',
        item: new URL(withLang(lang, '/solutions'), siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: getLocalizedProgrammatic(page.h1, lang),
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <ProgrammaticLanding page={page} lang={lang} />

      <Footer />
    </main>
  );
}
