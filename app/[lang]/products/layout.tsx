import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/products';
  const isEn = lang === 'en';

  const title = isEn
    ? 'AI Products — Content Factory, Sweezy, AI Receptionist, AI SDR | AI Insider'
    : 'AI продукти — Content Factory, Sweezy, AI Receptionist, AI SDR | AI Insider';

  const description = isEn
    ? 'Production-ready AI products by AI Insider: Content Factory for content automation, Sweezy for dating, AI Receptionist for voice calls, AI SDR for outbound sales.'
    : 'Готові AI‑продукти від AI Insider: Content Factory для автоматизації контенту, Sweezy для знайомств, AI Receptionist для голосових дзвінків, AI SDR для аутбаунд продажів.';

  return buildPageMetadata({
    title,
    description,
    keywords: isEn
      ? ['AI products', 'SaaS AI', 'Content Factory', 'AI Receptionist', 'AI SDR', 'Sweezy']
      : ['AI продукти', 'SaaS', 'Content Factory', 'AI Receptionist', 'AI SDR', 'Sweezy', 'AI автоматизація'],
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
  });
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
