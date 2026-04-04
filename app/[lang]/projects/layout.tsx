import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects';
  const title = lang === 'en' ? 'AI Projects' : 'AI‑проєкти';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Selected AI projects — voice agents, chatbots and automation systems built by AI Insider.'
      : 'Вибрані AI‑проєкти — голосові агенти, чатботи та системи автоматизації від AI Insider.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function ProjectsLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

