import type { Language } from './translations';
import { blogArticles, type BlogArticle } from './blogData';
import { SEO_SERVICE_PAGES, type SeoServiceSlug } from './seoServicePages';
import { servicesData, type ServicePage } from './servicesData';
import { PROGRAMMATIC_PAGES, type ProgrammaticPage, getLocalizedProgrammatic } from './programmaticSeo';

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
    keywords: ['agent', 'agentic', 'action', 'tool-use', 'CRM agent', 'avatar', 'influencer', 'ugc', 'creator'],
  },
  'ai-content-creation': {
    categories: ['AI Content'],
    keywords: ['influencer', 'video', 'ugc', 'avatar', 'content', 'social media', 'TikTok', 'Reels', 'marketing video'],
  },
  'ai-receptionist': {
    categories: ['Voice Agents'],
    keywords: ['receptionist', 'call answering', 'phone', 'booking', 'front desk', 'inbound calls'],
  },
  'ai-sdr': {
    categories: ['Lead Gen', 'Voice Agents'],
    keywords: ['sdr', 'outbound', 'prospecting', 'cold calling', 'lead qualification', 'meeting booking'],
  },
  'ai-proposal-generator': {
    categories: ['Automation'],
    keywords: ['proposal', 'commercial proposal', 'quote', 'document', 'agency proposal', 'sales proposal'],
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
  'ai-content-creation': {
    en: [
      'AI content creation',
      'AI influencers',
      'AI video production',
      'AI UGC for marketing',
      'synthetic content studio',
    ],
    uk: [
      'AI контент',
      'AI-інфлюенсери',
      'AI відеопродакшн',
      'AI UGC для маркетингу',
      'синтетичний контент',
    ],
  },
  'ai-receptionist': {
    en: [
      'AI receptionist',
      'AI receptionist for business',
      '24/7 call automation',
      'AI call answering',
    ],
    uk: [
      'AI ресепшн',
      'AI ресепшн для бізнесу',
      'автоматизація дзвінків',
      'AI відповіді на дзвінки',
    ],
  },
  'ai-sdr': {
    en: [
      'AI SDR',
      'AI SDR for B2B sales',
      'automated outreach',
      'AI outbound sales',
    ],
    uk: [
      'AI SDR',
      'автоматизація B2B продажів',
      'автоматичний аутріч',
      'AI outbound sales',
    ],
  },
  'ai-proposal-generator': {
    en: [
      'AI proposal generator',
      'proposal automation',
      'automated commercial proposals',
      'AI proposal workflow',
    ],
    uk: [
      'AI генератор пропозицій',
      'автоматизація КП',
      'автоматичні комерційні пропозиції',
      'AI proposal workflow',
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

/* ── Programmatic Page Linking ────────────────────────────── */

/**
 * Get programmatic pages related to a service detail page.
 */
export function getProgrammaticPagesForService(serviceSlug: string, limit = 4): ProgrammaticPage[] {
  return PROGRAMMATIC_PAGES.filter((p) => p.relatedServices.includes(serviceSlug)).slice(0, limit);
}

/**
 * Get programmatic pages related to a blog article.
 */
export function getProgrammaticPagesForBlog(articleSlug: string, limit = 3): ProgrammaticPage[] {
  return PROGRAMMATIC_PAGES.filter((p) => p.relatedBlogSlugs.includes(articleSlug)).slice(0, limit);
}

/**
 * Get programmatic pages related to an SEO service page.
 */
export function getProgrammaticPagesForSeoService(seoSlug: SeoServiceSlug, limit = 4): ProgrammaticPage[] {
  const topics = SERVICE_TO_TOPICS[seoSlug];
  if (!topics) return [];

  const scored = PROGRAMMATIC_PAGES.map((page) => {
    let score = 0;

    // Check if any related service matches the SEO service slug indirectly
    page.relatedServices.forEach((rs) => {
      const seoSlugs = SERVICE_DETAIL_TO_SEO[rs];
      if (seoSlugs && seoSlugs.includes(seoSlug)) {
        score += 5;
      }
    });

    // Keyword matching in page keyword
    const pageText = [page.keyword.en.toLowerCase(), page.h1.en.toLowerCase()].join(' ');
    topics.keywords.forEach((kw) => {
      if (pageText.includes(kw.toLowerCase())) {
        score += 2;
      }
    });

    return { page, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.page);
}

/**
 * Build links to programmatic solution pages for internal navigation.
 */
export function buildProgrammaticLinks(lang: Language, limit = 6): InternalLink[] {
  return PROGRAMMATIC_PAGES.slice(0, limit).map((p) => ({
    href: `/solutions/${p.slug}`,
    label: p.h1,
  }));
}
