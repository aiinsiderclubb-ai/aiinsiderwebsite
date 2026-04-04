import type { Metadata } from 'next';
import { getCaseBySlug, getLocalizedText } from '@/app/lib/casesData';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  // Dedicated Sweezy page exists
  if (slug === 'sweezy') {
    const path = '/cases/sweezy';
    return {
      alternates: {
        canonical: withLang(lang, path),
        languages: buildHreflang(path),
      },
    };
  }

  const caseData = getCaseBySlug(slug);
  const path = `/cases/${slug}`;

  if (!caseData) {
    return {
      title: lang === 'en' ? 'Case' : 'Кейс',
      alternates: {
        canonical: withLang(lang, path),
        languages: buildHreflang(path),
      },
      robots: { index: false, follow: false },
    };
  }

  const title = getLocalizedText(caseData.title, lang);
  const description = getLocalizedText(caseData.shortDescription, lang);
  const titleWithBrand = `${title} | AI Insider`;

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, `/cases/${caseData.slug}`),
    languages: buildHreflang(`/cases/${caseData.slug}`),
    lang,
    type: 'article',
  });
}

export default function CaseSlugLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

