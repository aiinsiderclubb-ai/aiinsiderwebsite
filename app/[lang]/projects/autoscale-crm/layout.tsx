import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/projects/autoscale-crm';
  const title = 'AutoScale CRM';
  const titleWithBrand = `${title} | AI Insider`;
  const description =
    lang === 'en'
      ? 'End-to-end sales automation pipeline with CRM integrations, lead qualification and workflow orchestration.'
      : 'End‑to‑end автоматизація продажів з CRM інтеграціями, кваліфікацією лідів та orchestration workflow.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
  });
}

export default function AutoScaleCrmLangLayout({ children }: { children: React.ReactNode }) {
  return children;
}

