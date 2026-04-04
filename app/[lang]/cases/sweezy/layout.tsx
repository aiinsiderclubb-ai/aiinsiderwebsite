import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/cases/sweezy';
  const title = 'Sweezy';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Sweezy — a digital assistant app with practical guides, checklists, multilingual content and AI support.'
      : 'Sweezy — цифровий помічник з практичними гайдами, чеклістами, багатомовним контентом та AI підтримкою.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function SweezyLangCaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}

