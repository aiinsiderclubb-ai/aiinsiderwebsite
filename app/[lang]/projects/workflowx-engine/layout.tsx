import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

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

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function WorkflowXEngineLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

