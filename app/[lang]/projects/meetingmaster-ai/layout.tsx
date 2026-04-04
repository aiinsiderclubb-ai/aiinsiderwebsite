import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/meetingmaster-ai';
  const title = 'MeetingMaster AI';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Meeting automation with summaries, action items, follow-ups and CRM sync.'
      : 'Автоматизація зустрічей: summary, action items, follow‑ups та синхронізація з CRM.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function MeetingMasterAiLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

