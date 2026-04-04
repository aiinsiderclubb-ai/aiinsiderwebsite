import type { Metadata } from 'next';
import { getSiteUrl, SITE_NAME } from './site';

const OPEN_GRAPH_LOCALES = {
  en: 'en_US',
  uk: 'uk_UA',
  de: 'de_DE',
  pl: 'pl_PL',
} as const;

const DEFAULT_SOCIAL_IMAGE_PATH = '/opengraph-image';
const DEFAULT_SOCIAL_IMAGE = {
  width: 1200,
  height: 630,
} as const;

type SocialMetadataType = 'website' | 'article';

type BuildPageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
  languages?: NonNullable<Metadata['alternates']>['languages'];
  keywords?: Metadata['keywords'];
  lang?: string;
  type?: SocialMetadataType;
  image?: string;
  robots?: Metadata['robots'];
  publishedTime?: string;
};

export function getOpenGraphLocale(lang?: string): string {
  return OPEN_GRAPH_LOCALES[lang as keyof typeof OPEN_GRAPH_LOCALES] ?? OPEN_GRAPH_LOCALES.en;
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, getSiteUrl()).toString();
}

function getSocialImage(title: string, image?: string) {
  const url = toAbsoluteUrl(image ?? DEFAULT_SOCIAL_IMAGE_PATH);

  return {
    url,
    width: DEFAULT_SOCIAL_IMAGE.width,
    height: DEFAULT_SOCIAL_IMAGE.height,
    alt: title || SITE_NAME,
  };
}

export function buildPageMetadata({
  title,
  description,
  canonical,
  languages,
  keywords,
  lang,
  type = 'website',
  image,
  robots,
  publishedTime,
}: BuildPageMetadataInput): Metadata {
  const absoluteCanonical = toAbsoluteUrl(canonical);
  const socialImage = getSocialImage(title, image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteCanonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: absoluteCanonical,
      type,
      siteName: SITE_NAME,
      locale: getOpenGraphLocale(lang),
      images: [socialImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage.url],
    },
    ...(robots ? { robots } : {}),
  };
}
