import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/about';

  const title = lang === 'en' ? 'About' : 'Про нас';
  const description =
    lang === 'en'
      ? 'Learn about AI Insider — the team building AI automation, chatbots and voice agents for businesses in Switzerland and globally.'
      : 'Дізнайтесь більше про AI Insider — команду, що створює AI автоматизації, чатботи та голосові агенти для бізнесу в Швейцарії та по всьому світу.';

  return {
    title,
    description,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: `${title} | AI Insider`,
      description,
      url: withLang(lang, path),
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
    },
    twitter: {
      title: `${title} | AI Insider`,
      description,
    },
  };
}

export default function AboutLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

