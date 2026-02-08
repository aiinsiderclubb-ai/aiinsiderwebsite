import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/meetingmaster-ai';
  const title = 'MeetingMaster AI';
  const description =
    lang === 'en'
      ? 'Meeting automation with summaries, action items, follow-ups and CRM sync.'
      : 'Автоматизація зустрічей: summary, action items, follow‑ups та синхронізація з CRM.';

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
    twitter: { title: `${title} | AI Insider`, description },
  };
}

export default function MeetingMasterAiLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

