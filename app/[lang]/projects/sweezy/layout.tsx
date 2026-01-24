import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/sweezy';
  const title = 'Sweezy';
  const description =
    lang === 'en'
      ? 'Sweezy — App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.'
      : 'Sweezy — кейс мобільного застосунку в стилі App Store: гайди, чеклісти, багатомовний контент та AI‑асистент.';

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
  };
}

export default function SweezyProjectLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

