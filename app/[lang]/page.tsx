import type { Metadata } from 'next';
import Home from '../page';
import { buildHreflang, isSupportedLang, withLang } from '../lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const keywords =
    lang === 'en'
      ? [
          'AI chatbot for business',
          'AI lead generation',
          'AI voice agent',
          'voice agent',
          'chatbot',
          'AI automation for real estate',
          'AI automation',
          'AI chatbots',
          'voice agents',
          'workflow automation',
          'Switzerland',
          'Zurich',
        ]
      : [
          'ШІ чатбот для бізнесу',
          'AI чатбот для бізнесу',
          'ШІ генерація лідів',
          'AI лідогенерація',
          'ШІ голосовий агент',
          'AI голосовий агент',
          'голосовий агент',
          'чатбот',
          'ШІ автоматизація для нерухомості',
          'AI автоматизація',
          'Швейцарія',
          'Цюрих',
        ];

  const title =
    lang === 'en'
      ? 'AI Insider | AI Automation, Chatbots & Voice Agents'
      : 'AI Insider | AI автоматизація, чатботи та голосові агенти';

  const description =
    lang === 'en'
      ? 'We build AI systems that think, speak and act — chatbots, voice agents and automation for your business in Switzerland and globally.'
      : 'Ми створюємо AI системи, які думають, говорять і діють — чатботи, голосові агенти та автоматизації для бізнесу в Швейцарії та по всьому світу.';

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: withLang(lang, '/'),
      languages: buildHreflang('/'),
    },
    openGraph: {
      title,
      description,
      url: withLang(lang, '/'),
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default function LangHomePage() {
  return <Home />;
}

