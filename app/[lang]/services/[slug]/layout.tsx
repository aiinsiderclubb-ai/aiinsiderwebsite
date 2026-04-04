import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';
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

  return buildPageMetadata({
    title,
    description,
    keywords,
    canonical: withLang(lang, `/services/${service.slug}`),
    languages: buildHreflang(`/services/${service.slug}`),
    lang,
  });
}

export default function ServiceSlugLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

