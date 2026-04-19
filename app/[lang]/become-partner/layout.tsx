import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/become-partner';
  const isEn = lang === 'en';

  const title = isEn
    ? 'Become a Partner — Application | AI Insider'
    : 'Стати партнером — заявка | AI Insider';

  const description = isEn
    ? 'Apply to the AI Insider partner program. Get your partner link, sales assets, and up to 25% commission on every deal you refer.'
    : 'Подати заявку на партнерську програму AI Insider. Отримайте посилання, матеріали для продажу та до 25% комісії з кожної угоди.';

  return buildPageMetadata({
    title,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function BecomePartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
