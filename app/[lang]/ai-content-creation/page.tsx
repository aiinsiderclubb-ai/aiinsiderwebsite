import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import AIContentCreationClient from './AIContentCreationClient';

type Params = { lang: string };

const AI_CONTENT_METADATA = {
  en: {
    title: 'AI Content Studio | AI Influencers, Video & UGC — AI Insider',
    description:
      'We create AI influencers, AI video and UGC ads for brands. Content without cameras or teams. Swiss AI studio with global reach.',
    keywords: [
      'AI influencer',
      'AI video production',
      'AI UGC',
      'AI content studio',
      'virtual influencer',
      'AI advertising',
    ],
    locale: 'en_US',
  },
  uk: {
    title: 'AI Контент-Студія | AI Інфлюенсери, Відео та UGC — AI Insider',
    description:
      'Створюємо AI-інфлюенсерів, AI-відео та UGC-рекламу для брендів. Контент без камер і команд. Швейцарська AI-студія з глобальним охватом.',
    keywords: [
      'AI інфлюенсер',
      'AI відео',
      'AI UGC',
      'AI контент студія',
      'віртуальний інфлюенсер',
      'AI реклама',
    ],
    locale: 'uk_UA',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/ai-content-creation';
  const metadata = AI_CONTENT_METADATA[lang];

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: [...metadata.keywords],
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: withLang(lang, path),
      type: 'website',
      locale: metadata.locale,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/twitter-image'],
    },
  };
}

export default function AIContentCreationPage() {
  return <AIContentCreationClient />;
}
