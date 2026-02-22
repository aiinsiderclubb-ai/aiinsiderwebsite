import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

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

export default function PredictAiAnalyticsLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

