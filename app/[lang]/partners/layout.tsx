import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/partners';
  const isEn = lang === 'en';

  const title = isEn
    ? 'Partner Program — Earn up to 25% per deal | AI Insider'
    : 'Партнерська програма — до 25% з угоди | AI Insider';

  const description = isEn
    ? 'Join AI Insider partner program: earn up to 25% per deal, recurring payouts, transparent dashboard, ready-made sales assets. No exclusivity.'
    : 'Партнерська програма AI Insider: до 25% з угоди, повторні виплати, прозорий дашборд, готові матеріали. Без ексклюзиву.';

  return buildPageMetadata({
    title,
    description,
    keywords: isEn
      ? ['partner program', 'referral program', 'AI automation partner', 'affiliate', 'recurring commission']
      : ['партнерська програма', 'реферальна програма', 'AI автоматизація партнер', 'партнерство', 'агентські'],
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
