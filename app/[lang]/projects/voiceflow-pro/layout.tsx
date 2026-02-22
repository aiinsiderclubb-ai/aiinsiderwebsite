import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/voiceflow-pro';
  const title = 'VoiceFlow Pro';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'AI voice agent for handling incoming calls with natural speech, CRM logging and analytics.'
      : 'AI голосовий агент для обробки вхідних дзвінків з природною мовою, логуванням у CRM та аналітикою.';

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
    twitter: {
      card: 'summary_large_image',
      title: titleWithBrand,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default function VoiceflowProLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

