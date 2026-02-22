import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { getLocalizedSeo, getSeoServicePage, SEO_SERVICE_PAGES, type SeoServiceSlug } from '@/app/lib/seoServicePages';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { getRelatedBlogForService, buildSiblingServiceLinks, getSemanticAnchor } from '@/app/lib/internalLinks';
import { servicesData, getLocalizedText as getServiceText } from '@/app/lib/servicesData';

type Props = {
  lang: string;
  slug: SeoServiceSlug;
};

export default function SeoServiceLanding({ lang, slug }: Props) {
  if (!isSupportedLang(lang)) {
    notFound();
  }

  const page = getSeoServicePage(slug);
  if (!page) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const pathWithoutLang = `/${page.slug}`;
  const canonicalPath = withLang(lang, pathWithoutLang);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();

  const metaDescription = getLocalizedSeo(page.metaDescription, lang);

  const headings =
    lang === 'en'
      ? {
          whatIs: `What is ${page.keyword}`,
          howWorks: `How ${page.keyword} works`,
          benefits: `Benefits of ${page.keyword}`,
          useCases: 'Use cases',
          why: 'Why AI Insider',
          faq: 'FAQ',
          ctaTitle: 'Ready to automate?',
          ctaSubtitle: 'Book a free AI consultation or request an AI automation audit.',
          sales: 'Sales',
          support: 'Customer Support',
          crm: 'CRM',
          ops: 'Operations',
        }
      : {
          whatIs: `Що таке ${page.keyword}`,
          howWorks: `Як працює ${page.keyword}`,
          benefits: `Переваги ${page.keyword}`,
          useCases: 'Сценарії використання',
          why: 'Чому AI Insider',
          faq: 'FAQ',
          ctaTitle: 'Готові автоматизувати?',
          ctaSubtitle: 'Замовте безкоштовну AI‑консультацію або аудит AI‑автоматизації.',
          sales: 'Продажі',
          support: 'Підтримка клієнтів',
          crm: 'CRM',
          ops: 'Операції',
        };

  const benefitLabels =
    lang === 'en'
      ? {
          efficiency: 'Efficiency',
          costReduction: 'Cost reduction',
          automation: 'Automation',
          scalability: 'Scalability',
        }
      : {
          efficiency: 'Ефективність',
          costReduction: 'Зменшення витрат',
          automation: 'Автоматизація',
          scalability: 'Масштабування',
        };

  const cta = getLocalizedSeo(page.cta, lang);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.keyword,
    description: metaDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
    areaServed: ['Switzerland', 'Europe', 'United States'],
    serviceType: page.keyword,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'en' ? 'Home' : 'Головна',
        item: new URL(withLang(lang, '/'), siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: page.keyword,
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getLocalizedSeo(page.faq, lang).map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.a,
      },
    })),
  };

  // Internal hub links using semantic anchor variations
  const hubLinks = (Object.keys(SEO_SERVICE_PAGES) as SeoServiceSlug[]).map((s, idx) => ({
    href: `/${s}`,
    label: getSemanticAnchor(s, lang, 0),
  }));

  // Related blog articles using the internal linking module
  const relatedBlogArticles = getRelatedBlogForService(slug, 4);

  // Sibling service pages for cross-linking
  const siblingServices = buildSiblingServiceLinks(slug, lang);

  // Related service detail pages based on topic mapping
  const SERVICE_DETAIL_MAP: Record<SeoServiceSlug, string[]> = {
    'ai-automation-for-business': ['workflow-automation', 'ai-lead-generation'],
    'ai-chatbots-for-business': ['ai-chatbot-for-business', 'custom-ai-models'],
    'ai-voice-agents': ['ai-voice-agent', 'ai-automation-for-real-estate'],
    'custom-ai-agents': ['custom-ai-models', 'workflow-automation'],
    'ai-content-creation': ['ai-influencers', 'ai-video-production', 'ai-ugc-content'],
  };
  const relatedServiceDetails = (SERVICE_DETAIL_MAP[slug] || [])
    .map((s) => servicesData.find((svc) => svc.slug === s))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
              filter: 'blur(90px)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2">
              {hubLinks.map((l) => (
                <Link
                  key={l.href}
                  href={withLang(lang, l.href)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    l.href === pathWithoutLang
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6">
            {page.keyword}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl">{metaDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Intro */}
          <div className="max-w-4xl space-y-4 mb-12">
            {getLocalizedSeo(page.intro, lang).map((p, idx) => (
              <p key={idx} className="text-lg text-gray-300 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* What is */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{headings.whatIs}</h2>
            {getLocalizedSeo(page.whatIs, lang).paragraphs.map((p, idx) => (
              <p key={idx} className="text-lg text-gray-300 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <ul className="space-y-2 pl-5 list-disc text-gray-300">
              {getLocalizedSeo(page.whatIs, lang).bullets.map((b, idx) => (
                <li key={idx} className="text-lg leading-relaxed">
                  {b}
                </li>
              ))}
            </ul>
            {getLocalizedSeo(page.whatIs, lang).outro && (
              <p className="text-lg text-gray-300 leading-relaxed mt-4">{getLocalizedSeo(page.whatIs, lang).outro}</p>
            )}
          </div>

          {/* How it works */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{headings.howWorks}</h2>
            <ul className="space-y-3">
              {getLocalizedSeo(page.howWorks, lang).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-gray-300 leading-relaxed">
                  <span className="mt-1 text-white/60">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{headings.benefits}</h2>
            <ul className="space-y-3 text-lg text-gray-300">
              <li>
                <span className="font-semibold text-white">{benefitLabels.efficiency}:</span>{' '}
                {getLocalizedSeo(page.benefits, lang).efficiency}
              </li>
              <li>
                <span className="font-semibold text-white">{benefitLabels.costReduction}:</span>{' '}
                {getLocalizedSeo(page.benefits, lang).costReduction}
              </li>
              <li>
                <span className="font-semibold text-white">{benefitLabels.automation}:</span>{' '}
                {getLocalizedSeo(page.benefits, lang).automation}
              </li>
              <li>
                <span className="font-semibold text-white">{benefitLabels.scalability}:</span>{' '}
                {getLocalizedSeo(page.benefits, lang).scalability}
              </li>
            </ul>
          </div>

          {/* Use cases */}
          <div className="max-w-6xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{headings.useCases}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {([
                { title: headings.sales, items: getLocalizedSeo(page.useCases, lang).sales },
                { title: headings.support, items: getLocalizedSeo(page.useCases, lang).customerSupport },
                { title: headings.crm, items: getLocalizedSeo(page.useCases, lang).crm },
                { title: headings.ops, items: getLocalizedSeo(page.useCases, lang).operations },
              ] as const).map((block) => (
                <div
                  key={block.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                        <span className="mt-1 text-white/60">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">{headings.why}</h2>
            <ul className="space-y-3">
              {getLocalizedSeo(page.whyAiInsider, lang).map((w, idx) => (
                <li key={idx} className="flex items-start gap-3 text-lg text-gray-300 leading-relaxed">
                  <span className="mt-1 text-white/60">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{headings.faq}</h2>
            <div className="space-y-4">
              {getLocalizedSeo(page.faq, lang).map((qa, idx) => (
                <details key={idx} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                    <span className="text-lg font-bold text-white">{qa.q}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="mt-3 text-base text-gray-300 leading-relaxed">{qa.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Related blog articles — using internal linking module */}
          {relatedBlogArticles.length > 0 && (
            <div className="max-w-6xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                {lang === 'en' ? 'From the blog' : 'З блогу'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedBlogArticles.map((a) => (
                  <Link
                    key={a.slug}
                    href={withLang(lang, `/blog/${a.slug}`)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{a.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/50">{getBlogText(a.category, lang)}</span>
                      <span className="text-xs text-gray-500 ml-auto">{a.readTime} {lang === 'en' ? 'min' : 'хв'}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug group-hover:text-white/80 transition-colors">
                      {getBlogText(a.h1, lang)}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related service detail pages */}
          {relatedServiceDetails.length > 0 && (
            <div className="max-w-6xl mb-12">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                {lang === 'en' ? 'Explore our services' : 'Дослідіть наші послуги'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {relatedServiceDetails.map((svc) => svc && (
                  <Link
                    key={svc.slug}
                    href={withLang(lang, `/services/${svc.slug}`)}
                    className="group inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-white/5 text-gray-300 border border-white/10
                      transition-all duration-200 hover:border-white/25 hover:text-white hover:bg-white/[0.08]"
                  >
                    <span>{getServiceText(svc.title, lang)}</span>
                    <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sibling SEO service pages for cross-linking */}
          <div className="max-w-6xl mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              {lang === 'en' ? 'Related solutions' : 'Повʼязані рішення'}
            </h3>
            <div className="flex flex-wrap gap-3">
              {siblingServices.map((link, idx) => (
                <Link
                  key={link.href}
                  href={withLang(lang, link.href)}
                  className="group inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-white/5 text-gray-300 border border-white/10
                    transition-all duration-200 hover:border-white/25 hover:text-white hover:bg-white/[0.08]"
                >
                  <span>{link.label[lang]}</span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{headings.ctaTitle}</h2>
              <p className="text-gray-400 mb-6 max-w-3xl">{headings.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
                >
                  {cta.bookConsultation}
                </Link>
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                    border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                >
                  {cta.getAudit}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

