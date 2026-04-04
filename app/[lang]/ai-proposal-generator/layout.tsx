import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';
import { getLocalizedSeo, getSeoServicePage } from '@/app/lib/seoServicePages';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const slug = 'ai-proposal-generator';
  const path = `/${slug}`;
  const page = getSeoServicePage(slug);

  if (!page) {
    return { robots: { index: false, follow: false } };
  }

  const title = getLocalizedSeo(page.titleTag, lang);
  const description = getLocalizedSeo(page.metaDescription, lang);
  const keywords = page.metaKeywords ? getLocalizedSeo(page.metaKeywords, lang) : undefined;

  return buildPageMetadata({
    title,
    description,
    keywords,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
