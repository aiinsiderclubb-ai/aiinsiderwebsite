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
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Meeting automation with summaries, action items, follow-ups and CRM sync.'
      : 'Автоматизація зустрічей: summary, action items, follow‑ups та синхронізація з CRM.';

  return {
    title: titleWithBrand,
    description,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: titleWithBrand,
      description,
      url: withLang(lang, path),
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', title: titleWithBrand, description, images: ['/twitter-image'] },
  };
}

export default function MeetingMasterAiLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

