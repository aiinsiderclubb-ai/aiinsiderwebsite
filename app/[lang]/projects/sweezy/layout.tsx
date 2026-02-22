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
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Sweezy — App Store-style mobile app case with guides, checklists, multilingual content and AI assistant.'
      : 'Sweezy — кейс мобільного застосунку в стилі App Store: гайди, чеклісти, багатомовний контент та AI‑асистент.';

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

export default function SweezyProjectLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

