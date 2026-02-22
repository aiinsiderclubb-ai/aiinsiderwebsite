export const SUPPORTED_LANGS = ['uk', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(lang: string): lang is SupportedLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(lang);
}

export function stripLangPrefix(pathname: string): string {
  return pathname.replace(/^\/(uk|en)(?=\/|$)/, '') || '/';
}

export function withLang(lang: SupportedLang, pathWithoutLang: string): string {
  const path = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

export function buildHreflang(pathWithoutLang: string) {
  return {
    en: withLang('en', pathWithoutLang),
    'uk-UA': withLang('uk', pathWithoutLang),
    'x-default': withLang('uk', pathWithoutLang),
  } as const;
}

