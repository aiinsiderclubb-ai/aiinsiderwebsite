import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { getLocalizedSeo, getSeoServicePage, SEO_SERVICE_PAGES, type SeoServiceSlug } from '@/app/lib/seoServicePages';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { getSemanticAnchor } from '@/app/lib/internalLinks';
import { getLocalizedProgrammatic, getProgrammaticPage } from '@/app/lib/programmaticSeo';

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
  const solutionsDirectoryLabel =
    lang === 'en' ? 'See all AI solutions for your industry →' : 'Переглянути всі AI-рішення для вашої галузі →';
  const cleanLandingTitle = (title: string) => title.replace(/\s*\|\s*AI Insider$/, '').trim();
  const pageHeading = page.heroTitle ? getLocalizedSeo(page.heroTitle, lang) : page.keyword;

  const headings =
    lang === 'en'
      ? {
          whatIs: `What is ${pageHeading}`,
          howWorks: `How ${pageHeading} works`,
          benefits: `Benefits of ${pageHeading}`,
          useCases: 'Use cases',
          why: 'Why AI Insider',
          faq: 'FAQ',
          ctaTitle: 'Ready to automate?',
          ctaSubtitle: 'Book a free AI consultation or request an AI automation audit.',
          relatedSolutions: 'Related Solutions',
        }
      : {
          whatIs: `Що таке ${pageHeading}`,
          howWorks: `Як працює ${pageHeading}`,
          benefits: `Переваги ${pageHeading}`,
          useCases: 'Сценарії використання',
          why: 'Чому AI Insider',
          faq: 'FAQ',
          ctaTitle: 'Готові автоматизувати?',
          ctaSubtitle: 'Замовте безкоштовну AI‑консультацію або аудит AI‑автоматизації.',
          relatedSolutions: 'Пов’язані рішення',
        };

  const cta = getLocalizedSeo(page.cta, lang);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageHeading,
    description: metaDescription,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
    areaServed: ['Switzerland', 'Europe', 'United States'],
    serviceType: pageHeading,
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
        name: pageHeading,
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
  const hubLinks = (Object.keys(SEO_SERVICE_PAGES) as SeoServiceSlug[]).map((s) => ({
    href: `/${s}`,
    label: getSemanticAnchor(s, lang, 0),
  }));

  const relatedBlogArticles = page.relatedBlogSlugs
    .map((articleSlug) => blogArticles.find((article) => article.slug === articleSlug))
    .filter((article): article is (typeof blogArticles)[number] => Boolean(article));

  const siblingLandingPages = (Object.values(SEO_SERVICE_PAGES) as typeof page[])
    .filter((candidate) =>
      page.siblingLandingSlugs ? page.siblingLandingSlugs.includes(candidate.slug) : candidate.slug !== slug,
    )
    .map((candidate) => ({
      slug: candidate.slug,
      title: cleanLandingTitle(getLocalizedSeo(candidate.titleTag, lang)),
      description: getLocalizedSeo(candidate.metaDescription, lang),
    }));
  const relatedSolutions = (page.relatedSolutionSlugs ?? [])
    .map((solutionSlug) => getProgrammaticPage(solutionSlug))
    .filter((solution): solution is NonNullable<ReturnType<typeof getProgrammaticPage>> => Boolean(solution))
    .map((solution) => ({
      slug: solution.slug,
      title: getLocalizedProgrammatic(solution.h1, lang),
      description: getLocalizedProgrammatic(solution.metaDescription, lang),
    }));

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
            {pageHeading}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl">{metaDescription}</p>
          {page.heroStats ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {getLocalizedSeo(page.heroStats, lang).map((stat) => (
                <div key={stat} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-semibold text-white/90">
                  {stat}
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '⚡', text: getLocalizedSeo(page.benefits, lang).efficiency },
                { icon: '💸', text: getLocalizedSeo(page.benefits, lang).costReduction },
                { icon: '🤖', text: getLocalizedSeo(page.benefits, lang).automation },
                { icon: '📈', text: getLocalizedSeo(page.benefits, lang).scalability },
              ].map((benefit) => (
                <div key={benefit.text} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg">
                    {benefit.icon}
                  </div>
                  <p className="mt-4 text-lg leading-relaxed text-gray-300">{benefit.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use cases */}
          <div className="max-w-6xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{headings.useCases}</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(page.useCaseBlocks
                ? getLocalizedSeo(page.useCaseBlocks, lang)
                : ([
                    { title: lang === 'en' ? 'Sales' : 'Продажі', items: getLocalizedSeo(page.useCases, lang).sales },
                    { title: lang === 'en' ? 'Customer Support' : 'Підтримка клієнтів', items: getLocalizedSeo(page.useCases, lang).customerSupport },
                    { title: lang === 'en' ? 'CRM' : 'CRM', items: getLocalizedSeo(page.useCases, lang).crm },
                    { title: lang === 'en' ? 'Operations' : 'Операції', items: getLocalizedSeo(page.useCases, lang).operations },
                  ] as Array<{ title: string; items: string[] }>)).map((block) => (
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

          {/* Related blog articles */}
          {relatedBlogArticles.length > 0 && (
            <div className="max-w-6xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                {lang === 'en' ? 'From the blog' : 'З блогу'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
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
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {getBlogText(a.metaDescription, lang)}
                    </p>
                    <div className="mt-4 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      {lang === 'en' ? 'Read article →' : 'Читати статтю →'}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related solutions */}
          {relatedSolutions.length > 0 && (
            <div className="max-w-6xl mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{headings.relatedSolutions}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedSolutions.map((solution) => (
                  <Link
                    key={solution.slug}
                    href={withLang(lang, `/solutions/${solution.slug}`)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
                  >
                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white/80 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {solution.description}
                    </p>
                    <div className="mt-4 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      {lang === 'en' ? 'Open solution →' : 'Перейти до рішення →'}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sibling SEO service pages for cross-linking */}
          <div className="max-w-6xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
              {lang === 'en' ? 'Explore Related Solutions' : 'Схожі рішення'}
            </h2>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {siblingLandingPages.map((landingPage) => (
                <Link
                  key={landingPage.slug}
                  href={withLang(lang, `/${landingPage.slug}`)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
                >
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white/80 transition-colors">
                    {landingPage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {landingPage.description}
                  </p>
                  <div className="mt-4 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                    {lang === 'en' ? 'Open solution →' : 'Перейти до сторінки →'}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mb-12">
            <Link
              href={withLang(lang, '/solutions')}
              className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
            >
              {solutionsDirectoryLabel}
            </Link>
          </div>

          {/* CTA */}
          <div className="max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
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

