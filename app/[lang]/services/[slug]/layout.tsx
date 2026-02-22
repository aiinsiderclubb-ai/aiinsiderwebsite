import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getLocalizedText, getServiceBySlug } from '@/app/lib/servicesData';

type Params = { lang: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = `/services/${slug}`;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: lang === 'en' ? 'Service' : 'Послуга',
      alternates: {
        canonical: withLang(lang, path),
        languages: buildHreflang(path),
      },
      robots: { index: false, follow: false },
    };
  }

  const title = getLocalizedText(service.seoTitle, lang);
  const description = getLocalizedText(service.seoDescription, lang);
  const keywords = service.keywords[lang];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: withLang(lang, `/services/${service.slug}`),
      languages: buildHreflang(`/services/${service.slug}`),
    },
    openGraph: {
      title,
      description,
      url: withLang(lang, `/services/${service.slug}`),
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

export default function ServiceSlugLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

