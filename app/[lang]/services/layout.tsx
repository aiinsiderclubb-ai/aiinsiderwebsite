import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/services';

  const title = lang === 'en' ? 'Services' : 'Послуги';
  const description =
    lang === 'en'
      ? 'AI services that drive measurable results: chatbots, voice agents, lead generation, real estate automation, workflow automation, and custom AI.'
      : 'AI‑послуги з вимірюваними результатами: чатботи, голосові агенти, лідогенерація, автоматизація для нерухомості, автоматизація процесів та кастомний AI.';

  const keywords =
    lang === 'en'
      ? [
          'AI chatbot for business',
          'AI voice agent',
          'AI lead generation',
          'AI automation for real estate',
          'workflow automation',
          'custom AI models',
          'Switzerland',
          'Zurich',
        ]
      : [
          'AI чатбот для бізнесу',
          'ШІ голосовий агент',
          'AI лідогенерація',
          'AI автоматизація для нерухомості',
          'автоматизація процесів',
          'кастомні AI‑моделі',
          'Швейцарія',
          'Цюрих',
        ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: `${title} | AI Insider`,
      description,
      url: withLang(lang, path),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
    },
    twitter: {
      title: `${title} | AI Insider`,
      description,
    },
  };
}

export default function ServicesLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

