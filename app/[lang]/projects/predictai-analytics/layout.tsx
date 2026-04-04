import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/predictai-analytics';
  const title = 'PredictAI Analytics';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Predictive insights and AI analytics dashboards to understand trends and drive better decisions.'
      : 'Прогнозні інсайти та AI‑аналітика з дашбордами, щоб бачити тренди та приймати кращі рішення.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function PredictAiAnalyticsLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

