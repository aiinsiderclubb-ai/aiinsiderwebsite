import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/workflowx-engine';
  const title = 'WorkflowX Engine';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Workflow automation engine connecting tools and removing manual work with AI-powered steps.'
      : 'Двигун workflow‑автоматизації, який зʼєднує інструменти та прибирає ручну роботу за допомогою AI.';

  return {
    title: titleWithBrand,
    description,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: titleWithBrand,
      description,
      url: withLang(lang, path),
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title: titleWithBrand, description, images: ['/twitter-image'] },
  };
}

export default function WorkflowXEngineLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

