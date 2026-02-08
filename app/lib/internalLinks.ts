import type { Language } from './translations';
import { blogArticles, type BlogArticle } from './blogData';
import { SEO_SERVICE_PAGES, type SeoServiceSlug } from './seoServicePages';
import { servicesData, type ServicePage } from './servicesData';

/* ── Types ─────────────────────────────────────────────────── */

export interface InternalLink {
  href: string;
  label: { en: string; uk: string };
  /** Semantic anchor text variations */
  anchors?: { en: string[]; uk: string[] };
}

/* ── Topic Mapping ─────────────────────────────────────────── */

/**
 * Maps SEO service pages to their related blog categories and keywords.
 * Used for bidirectional linking: service → blog and blog → service.
 */
const SERVICE_TO_TOPICS: Record<SeoServiceSlug, { categories: string[]; keywords: string[] }> = {
  'ai-automation-for-business': {
    categories: ['Automation', 'Integrations', 'Lead Gen'],
    keywords: ['automation', 'workflow', 'CRM', 'lead routing', 'data drift', 'scoring'],
  },
  'ai-chatbots-for-business': {
    categories: ['Chatbots'],
    keywords: ['chatbot', 'RAG', 'B2B chatbot', 'knowledge base', 'support'],
  },
  'ai-voice-agents': {
    categories: ['Voice Agents'],
    keywords: ['voice agent', 'phone', 'call', 'booking', 'real estate'],
  },
  'custom-ai-agents': {
    categories: ['Custom AI'],
    keywords: ['agent', 'agentic', 'action', 'tool-use', 'CRM agent'],
  },
};

/**
 * Maps service detail page slugs to SEO service slugs for cross-linking.
 */
const SERVICE_DETAIL_TO_SEO: Record<string, SeoServiceSlug[]> = {
  'ai-chatbot-for-business': ['ai-chatbots-for-business', 'custom-ai-agents'],
  'ai-voice-agent': ['ai-voice-agents', 'ai-automation-for-business'],
  'ai-lead-generation': ['ai-automation-for-business', 'ai-chatbots-for-business'],
  'ai-automation-for-real-estate': ['ai-voice-agents', 'ai-automation-for-business'],
  'workflow-automation': ['ai-automation-for-business', 'custom-ai-agents'],
  'analytics-assistants': ['ai-automation-for-business', 'custom-ai-agents'],
  'custom-ai-models': ['custom-ai-agents', 'ai-chatbots-for-business'],
};

/* ── Helper Functions ──────────────────────────────────────── */

/**
 * Get related blog articles for a given SEO service page.
 * Uses category matching and keyword overlap.
 */
export function getRelatedBlogForService(slug: SeoServiceSlug, limit = 3): BlogArticle[] {
  const topics = SERVICE_TO_TOPICS[slug];
  if (!topics) return [];

  const scored = blogArticles.map((article) => {
    let score = 0;

    // Category match (strong signal)
    if (topics.categories.includes(article.category.en)) {
      score += 10;
    }

    // Keyword match in slug/keyword/h1
    const articleText = [
      article.slug,
      article.keyword.en.toLowerCase(),
      article.h1.en.toLowerCase(),
    ].join(' ');

    topics.keywords.forEach((kw) => {
      if (articleText.includes(kw.toLowerCase())) {
        score += 3;
      }
    });

    // Already linked from article to this service (reciprocal linking)
    if (article.relatedLinks.some((l) => l.href === `/${slug}`)) {
      score += 5;
    }

    return { article, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

/**
 * Get related SEO service pages for a blog article.
 * Returns services that match the article's category or keywords.
 */
export function getRelatedServicesForBlog(article: BlogArticle): SeoServiceSlug[] {
  const matches: { slug: SeoServiceSlug; score: number }[] = [];

  const articleText = [
    article.slug,
    article.keyword.en.toLowerCase(),
    article.h1.en.toLowerCase(),
    article.category.en,
  ].join(' ');

  (Object.entries(SERVICE_TO_TOPICS) as [SeoServiceSlug, { categories: string[]; keywords: string[] }][]).forEach(
    ([slug, topics]) => {
      let score = 0;

      // Category match
      if (topics.categories.includes(article.category.en)) {
        score += 10;
      }

      // Keyword match
      topics.keywords.forEach((kw) => {
        if (articleText.includes(kw.toLowerCase())) {
          score += 2;
        }
      });

      if (score > 0) {
        matches.push({ slug, score });
      }
    }
  );

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((m) => m.slug);
}

/**
 * Get related service detail pages for a blog article.
 */
export function getRelatedServiceDetailsForBlog(article: BlogArticle): ServicePage[] {
  const articleText = [
    article.slug,
    article.keyword.en.toLowerCase(),
    article.h1.en.toLowerCase(),
    article.category.en.toLowerCase(),
  ].join(' ');

  const scored = servicesData.map((service) => {
    let score = 0;

    // Check title match
    if (articleText.includes(service.title.en.toLowerCase())) {
      score += 5;
    }

    // Check keyword overlap
    service.keywords.en.forEach((kw) => {
      if (articleText.includes(kw.toLowerCase())) {
        score += 1;
      }
    });

    return { service, score };
  });

  return scored
    .filter((s) => s.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.service);
}

/**
 * Get SEO service pages related to a service detail page.
 */
export function getSeoServicesForServiceDetail(serviceSlug: string): SeoServiceSlug[] {
  return SERVICE_DETAIL_TO_SEO[serviceSlug] || [];
}

/**
 * Get blog articles related to a service detail page.
 */
export function getBlogArticlesForServiceDetail(serviceSlug: string, limit = 3): BlogArticle[] {
  const seoSlugs = getSeoServicesForServiceDetail(serviceSlug);
  const articles: BlogArticle[] = [];

  seoSlugs.forEach((slug) => {
    const related = getRelatedBlogForService(slug, 2);
    related.forEach((a) => {
      if (!articles.some((existing) => existing.slug === a.slug)) {
        articles.push(a);
      }
    });
  });

  return articles.slice(0, limit);
}

/* ── Anchor Text Helpers ───────────────────────────────────── */

/**
 * Semantic anchor text variations for natural internal linking.
 * Avoids exact-match repetition.
 */
export const SERVICE_ANCHORS: Record<SeoServiceSlug, { en: string[]; uk: string[] }> = {
  'ai-automation-for-business': {
    en: [
      'AI automation for business',
      'business process automation with AI',
      'automated workflows',
      'intelligent automation solutions',
    ],
    uk: [
      'AI automation for business',
      'автоматизація бізнес-процесів',
      'інтелектуальна автоматизація',
      'AI-автоматизація для бізнесу',
    ],
  },
  'ai-chatbots-for-business': {
    en: [
      'AI chatbots for business',
      'B2B chatbot solutions',
      'RAG-powered chatbots',
      'conversational AI for support',
    ],
    uk: [
      'AI chatbots for business',
      'B2B чатботи',
      'RAG чатботи',
      'розмовний AI для підтримки',
    ],
  },
  'ai-voice-agents': {
    en: [
      'AI voice agents',
      'voice automation solutions',
      'AI phone agents',
      'automated call handling',
    ],
    uk: [
      'AI voice agents',
      'голосова автоматизація',
      'AI телефонні агенти',
      'автоматизація дзвінків',
    ],
  },
  'custom-ai-agents': {
    en: [
      'custom AI agents',
      'agentic AI solutions',
      'AI agents that take actions',
      'workflow agents',
    ],
    uk: [
      'custom AI agents',
      'агентний AI',
      'AI агенти, що виконують дії',
      'агенти для процесів',
    ],
  },
};

/**
 * Get a semantic anchor text for a service page.
 * Rotates through variations based on index to avoid repetition.
 */
export function getSemanticAnchor(slug: SeoServiceSlug, lang: Language, index = 0): string {
  const anchors = SERVICE_ANCHORS[slug]?.[lang];
  if (!anchors || anchors.length === 0) {
    return SEO_SERVICE_PAGES[slug]?.keyword || slug;
  }
  return anchors[index % anchors.length];
}

/* ── Link Builders ─────────────────────────────────────────── */

/**
 * Build internal links for a service page "From the blog" section.
 */
export function buildBlogLinksForService(
  slug: SeoServiceSlug,
  lang: Language,
  limit = 3
): InternalLink[] {
  const articles = getRelatedBlogForService(slug, limit);
  return articles.map((a) => ({
    href: `/blog/${a.slug}`,
    label: a.h1,
  }));
}

/**
 * Build internal links for a blog article "Related services" section.
 */
export function buildServiceLinksForBlog(
  article: BlogArticle,
  lang: Language
): InternalLink[] {
  const seoSlugs = getRelatedServicesForBlog(article);
  const links: InternalLink[] = [];

  seoSlugs.forEach((slug, idx) => {
    const page = SEO_SERVICE_PAGES[slug];
    if (page) {
      links.push({
        href: `/${slug}`,
        label: {
          en: getSemanticAnchor(slug, 'en', idx),
          uk: getSemanticAnchor(slug, 'uk', idx),
        },
      });
    }
  });

  // Add service detail pages
  const serviceDetails = getRelatedServiceDetailsForBlog(article);
  serviceDetails.forEach((s) => {
    links.push({
      href: `/services/${s.slug}`,
      label: s.title,
    });
  });

  return links;
}

/**
 * Build hub navigation links (all 4 SEO service pages).
 */
export function buildHubLinks(lang: Language): InternalLink[] {
  return (Object.keys(SEO_SERVICE_PAGES) as SeoServiceSlug[]).map((slug, idx) => ({
    href: `/${slug}`,
    label: {
      en: getSemanticAnchor(slug, 'en', 0),
      uk: getSemanticAnchor(slug, 'uk', 0),
    },
  }));
}

/**
 * Build sibling service links (excluding current page).
 */
export function buildSiblingServiceLinks(
  currentSlug: SeoServiceSlug,
  lang: Language
): InternalLink[] {
  return (Object.keys(SEO_SERVICE_PAGES) as SeoServiceSlug[])
    .filter((slug) => slug !== currentSlug)
    .map((slug, idx) => ({
      href: `/${slug}`,
      label: {
        en: getSemanticAnchor(slug, 'en', idx + 1),
        uk: getSemanticAnchor(slug, 'uk', idx + 1),
      },
    }));
}
