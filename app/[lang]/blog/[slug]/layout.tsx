import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getPublishedBlogArticle, getBlogText } from '@/app/lib/blogData';

type Params = { lang: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const article = getPublishedBlogArticle(slug);
  const path = `/blog/${slug}`;

  if (!article) {
    return {
      title: lang === 'en' ? 'Article not found' : 'Стаття не знайдена',
      alternates: { canonical: withLang(lang, path), languages: buildHreflang(path) },
      robots: { index: false, follow: false },
    };
  }

  const title = getBlogText(article.titleTag, lang);
  const description = getBlogText(article.metaDescription, lang);
  const keywords = article.metaKeywords[lang];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title,
      description,
      url: withLang(lang, path),
      type: 'article',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      publishedTime: article.publishedAt,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
