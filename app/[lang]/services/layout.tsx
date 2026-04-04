import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/services';

  const title = lang === 'en' ? 'AI Services' : 'AI‑послуги';
  const titleWithBrand = `${title} | AI Insider`;
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

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    keywords,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function ServicesLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

