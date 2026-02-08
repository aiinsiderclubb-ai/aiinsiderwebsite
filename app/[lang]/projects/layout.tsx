import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects';
  const title = lang === 'en' ? 'Projects' : 'Проєкти';
  const description =
    lang === 'en'
      ? 'Selected AI projects — voice agents, chatbots and automation systems built by AI Insider.'
      : 'Вибрані AI‑проєкти — голосові агенти, чатботи та системи автоматизації від AI Insider.';

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
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
    },
    twitter: {
      title: `${title} | AI Insider`,
      description,
    },
  };
}

export default function ProjectsLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

