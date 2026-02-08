import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { getBlogArticle, getBlogText, blogArticles } from '@/app/lib/blogData';

type Params = { lang: string; slug: string };

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) notFound();

  const article = getBlogArticle(slug);
  if (!article) notFound();

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, `/blog/${slug}`), siteUrl).toString();
  const isEn = lang === 'en';

  const t = (v: { en: string; uk: string }) => getBlogText(v, lang);

  /* JSON-LD: Article + FAQ + Breadcrumb */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(article.h1),
    description: t(article.metaDescription),
    url: canonicalUrl,
    datePublished: article.publishedAt,
    author: { '@type': 'Organization', name: SITE_NAME, url: siteUrl.toString() },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: siteUrl.toString() },
    inLanguage: lang,
    mainEntityOfPage: canonicalUrl,
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((qa) => ({
      '@type': 'Question',
      name: t(qa.q),
      acceptedAnswer: { '@type': 'Answer', text: t(qa.a) },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Головна', item: new URL(withLang(lang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Blog' : 'Блог', item: new URL(withLang(lang, '/blog'), siteUrl).toString() },
      { '@type': 'ListItem', position: 3, name: t(article.h1), item: canonicalUrl },
    ],
  };

  /* Related articles (same category, different slug) */
  const relatedArticles = blogArticles
    .filter((a) => a.slug !== slug && a.category.en === article.category.en)
    .slice(0, 2);

  const allOther = relatedArticles.length < 2
    ? [...relatedArticles, ...blogArticles.filter((a) => a.slug !== slug && !relatedArticles.includes(a)).slice(0, 2 - relatedArticles.length)]
    : relatedArticles;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="relative pt-32 pb-16 px-6">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 55%)', filter: 'blur(100px)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">{isEn ? 'Home' : 'Головна'}</Link>
            <span className="mx-2">/</span>
            <Link href={withLang(lang, '/blog')} className="hover:text-white transition-colors">{isEn ? 'Blog' : 'Блог'}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{t(article.keyword)}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{t(article.category)}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs text-gray-500">{article.readTime} {isEn ? 'min read' : 'хв'}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <time className="text-xs text-gray-500" dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight mb-8">
            {t(article.h1)}
          </h1>

          {/* Intro */}
          <div className="space-y-4 mb-12">
            {article.intro.map((p, i) => (
              <p key={i} className="text-lg text-gray-300 leading-relaxed">{t(p)}</p>
            ))}
          </div>

          {/* Sections */}
          {article.sections.map((section, si) => (
            <section key={si} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t(section.heading)}</h2>
              {section.body.map((p, pi) => (
                <p key={pi} className="text-base text-gray-300 leading-relaxed mb-4">{t(p)}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="space-y-2 mt-3">
                  {section.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-base text-gray-300 leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">FAQ</h2>
            <div className="space-y-4">
              {article.faq.map((qa, i) => (
                <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="text-base font-bold text-white">{t(qa.q)}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200 shrink-0">+</span>
                  </summary>
                  <div className="mt-3 text-sm text-gray-300 leading-relaxed">{t(qa.a)}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4">{isEn ? 'Related services' : 'Повʼязані послуги'}</h2>
            <div className="flex flex-wrap gap-2">
              {article.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={withLang(lang, link.href)}
                  className="text-sm px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-colors"
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {isEn ? 'Ready to automate?' : 'Готові автоматизувати?'}
            </h2>
            <p className="text-gray-400 mb-6">
              {isEn
                ? 'Book a free consultation or request an AI automation audit.'
                : 'Замовте безкоштовну консультацію або отримайте аудит AI-автоматизації.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${withLang(lang, '/')}#bookcall`}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black rounded-full font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
              >
                {t(article.cta.bookConsultation)}
              </Link>
              <Link
                href={`${withLang(lang, '/')}#bookcall`}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 text-white rounded-full font-bold border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              >
                {t(article.cta.getAudit)}
              </Link>
            </div>
          </div>

          {/* Related articles */}
          {allOther.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-white mb-4">{isEn ? 'Read next' : 'Читати далі'}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {allOther.map((ra) => (
                  <Link
                    key={ra.slug}
                    href={withLang(lang, `/blog/${ra.slug}`)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{ra.icon}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/50">{t(ra.category)}</span>
                      <span className="text-xs text-gray-500 ml-auto">{ra.readTime} {isEn ? 'min' : 'хв'}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug group-hover:text-white/80 transition-colors">
                      {t(ra.h1)}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
