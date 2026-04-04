import type { Metadata } from 'next';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getPublishedBlogArticle, getBlogText } from '@/app/lib/blogData';
import { buildPageMetadata } from '@/app/lib/metadata';

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

  return buildPageMetadata({
    title,
    description,
    keywords,
    canonical: withLang(lang, path),
    languages: buildHreflang(path),
    lang,
    type: 'article',
    publishedTime: article.publishedAt,
  });
}

export default function BlogArticleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
