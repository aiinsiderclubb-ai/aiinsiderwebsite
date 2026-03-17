import Link from 'next/link';
import type { Language } from '@/app/lib/translations';
import type { ProgrammaticPage } from '@/app/lib/programmaticSeo';
import {
  getLocalizedProgrammatic,
  getRelatedProgrammaticPages,
  getProgrammaticPagesByService,
} from '@/app/lib/programmaticSeo';
import { withLang } from '@/app/lib/i18n';
import { servicesData, getLocalizedText } from '@/app/lib/servicesData';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { SEO_SERVICE_PAGES, getLocalizedSeo } from '@/app/lib/seoServicePages';
import PageCTA from '@/app/components/PageCTA';

interface Props {
  page: ProgrammaticPage;
  lang: Language;
}

export default function ProgrammaticLanding({ page, lang }: Props) {
  const isEn = lang === 'en';
  const t = <T,>(v: { en: T; uk: T }) => getLocalizedProgrammatic(v, lang);
  const solutionName = t(page.h1);

  const typeLabels = {
    'use-case': { en: 'Use Case', uk: 'Кейс використання' },
    industry: { en: 'Industry', uk: 'Індустрія' },
    function: { en: 'Business Function', uk: 'Бізнес-функція' },
  };

  // Related service detail pages
  const relatedServicePages = page.relatedServices
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter(Boolean);

  // Related blog articles
  const relatedBlogArticles = page.relatedBlogSlugs
    .map((slug) => blogArticles.find((a) => a.slug === slug))
    .filter(Boolean);

  // Related programmatic pages (same type)
  const relatedProgrammatic = getRelatedProgrammaticPages(page.slug, 4);

  // SEO service page links (hub)
  const seoHubLinks = Object.values(SEO_SERVICE_PAGES).slice(0, 4);

  const ctaBook = isEn ? 'Book a free AI consultation' : 'Замовити безкоштовну AI-консультацію';
  const ctaAudit = isEn ? 'Get AI automation audit' : 'Отримати аудит AI-автоматизації';

  return (
    <div className="pt-28 pb-16">
      {/* Hero Section */}
      <section className="relative px-6 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 55%)', filter: 'blur(100px)' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t(typeLabels[page.type])}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
            {t(page.h1)}
          </h1>

          {/* Intro */}
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl mb-10">
            {t(page.intro)}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
            >
              {ctaBook}
            </Link>
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg border border-white/20 transition-all duration-200 hover:bg-white/10"
            >
              {ctaAudit}
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            {isEn ? `Key Benefits of ${solutionName}` : `${solutionName}: ключові переваги`}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t(page.benefits).map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shrink-0">
                  ✓
                </div>
                <p className="text-gray-300 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Section */}
      {page.spotlight ? (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)' }}
            >
              <div
                className="absolute -top-16 right-0 h-56 w-56 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.16) 0%, transparent 65%)', filter: 'blur(32px)' }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {isEn ? 'Spotlight' : 'Практичний сценарій'}
                </span>
                <div className="mt-6 text-4xl font-bold text-green-400 md:text-5xl">
                  {t(page.spotlight.metric)}
                </div>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gray-500 md:text-base">
                  {t(page.spotlight.context)}
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                  {t(page.spotlight.description)}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Use Cases Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            {isEn ? `How ${solutionName} Works in Practice` : `Як ${solutionName} працює на практиці`}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t(page.useCases).map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm text-white/60">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-white font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            {isEn ? 'Frequently Asked Questions' : 'Часті питання'}
          </h2>
          <div className="space-y-4">
            {t(page.faq).map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.q}</h3>
                <p className="text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {relatedServicePages.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {isEn ? 'Related Services' : 'Пов\'язані сервіси'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedServicePages.map((service) => (
                <Link
                  key={service!.slug}
                  href={withLang(lang, `/services/${service!.slug}`)}
                  className="group flex items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  <span className="text-white font-semibold group-hover:text-white/80">
                    {getLocalizedText(service!.title, lang)}
                  </span>
                  <span className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blog Articles */}
      {relatedBlogArticles.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {isEn ? 'Related Articles' : 'Пов\'язані статті'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedBlogArticles.map((article) => (
                <Link
                  key={article!.slug}
                  href={withLang(lang, `/blog/${article!.slug}`)}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  <span className="text-2xl">{article!.icon}</span>
                  <div>
                    <span className="text-white font-semibold group-hover:text-white/80 block mb-1">
                      {getBlogText(article!.h1, lang)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article!.readTime} {isEn ? 'min read' : 'хв'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Programmatic Pages */}
      {relatedProgrammatic.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {isEn ? 'Explore More Solutions' : 'Більше рішень'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedProgrammatic.map((p) => (
                <Link
                  key={p.slug}
                  href={withLang(lang, `/solutions/${p.slug}`)}
                  className="group flex items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  <span className="text-white font-semibold group-hover:text-white/80">
                    {getLocalizedProgrammatic(p.h1, lang)}
                  </span>
                  <span className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hub Links Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {isEn ? 'Explore Core AI Solutions' : 'Основні AI-рішення'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seoHubLinks.map((seo) => (
              <Link
                key={seo.slug}
                href={withLang(lang, `/${seo.slug}`)}
                className="group p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all text-center"
              >
                <span className="text-sm font-semibold text-white group-hover:text-white/80">
                  {getLocalizedSeo(seo.titleTag, lang).replace(' | AI Insider', '')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <PageCTA />
    </div>
  );
}
