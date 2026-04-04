import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

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

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function SweezyProjectLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

