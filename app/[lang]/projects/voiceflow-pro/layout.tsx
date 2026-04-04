import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

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

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function VoiceflowProLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

