import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

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

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function CasesLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

