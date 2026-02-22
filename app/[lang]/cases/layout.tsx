import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/cases';

  const title = lang === 'en' ? 'AI Case Studies' : 'Кейси AI автоматизації';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'Real AI automation cases with measurable business results — chatbots, voice agents and workflow automation.'
      : 'Реальні кейси AI автоматизації з вимірюваними бізнес‑результатами — чатботи, голосові агенти та workflow автоматизації.';

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
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithBrand,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default function CasesLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

