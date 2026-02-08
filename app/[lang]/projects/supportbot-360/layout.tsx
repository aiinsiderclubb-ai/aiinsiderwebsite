import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/supportbot-360';
  const title = 'SupportBot 360';
  const description =
    lang === 'en'
      ? 'AI chatbot for customer support, FAQ automation, ticket triage and escalation with analytics dashboard.'
      : 'AI чатбот для підтримки клієнтів: автоматизація FAQ, triage тікетів, ескалації та дашборд аналітики.';

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

export default function SupportBot360LangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

