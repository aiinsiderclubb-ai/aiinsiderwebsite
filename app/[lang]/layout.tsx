import { notFound } from 'next/navigation';
import type { Language } from '../lib/translations';
import { isSupportedLang } from '../lib/i18n';
import { LanguageProvider } from '../context/LanguageContext';

type Params = { lang: string };

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  return (
    <LanguageProvider initialLang={lang as Language}>
      {children}
    </LanguageProvider>
  );
}

