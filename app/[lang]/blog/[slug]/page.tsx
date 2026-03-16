import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { getBlogArticle, getBlogText, blogArticles } from '@/app/lib/blogData';
import { getRelatedServicesForBlog, getSemanticAnchor } from '@/app/lib/internalLinks';
import { SEO_SERVICE_PAGES } from '@/app/lib/seoServicePages';
import AnalyticsAutoCapture from '@/app/components/analytics/AnalyticsAutoCapture';

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
  const primaryCtaHref = article.ctaHref ? withLang(lang, article.ctaHref) : `${withLang(lang, '/')}#bookcall`;
  const vertical = article.ctaType || article.ctaHref?.includes('/avtomatizaciya-salonu-krasy') ? 'beauty' : 'general';

  const beautyPillarBase = '/uk/avtomatizaciya-salonu-krasy';
  const beautyClusterSlugs = new Set([
    'instagram-direct-leads-beauty-salon',
    'beauty-salon-no-show-reduction-system',
    'online-booking-automation-for-beauty-salon',
    'beauty-salon-reminders-sms-dm-workflows',
    'salon-crm-segmentation-playbook',
    'beauty-salon-repeat-sales-automation',
    'beauty-salon-review-automation-system',
    'beauty-salon-kpi-dashboard-automation',
  ]);
  const beautyTargets = {
    checklist: `${beautyPillarBase}#lead-magnet`,
    roi: `${beautyPillarBase}#roi-calculator`,
    audit: `${beautyPillarBase}#audit-form`,
  } as const;
  const hasBeautyPillarCta = beautyClusterSlugs.has(slug) || article.ctaHref?.includes('/avtomatizaciya-salonu-krasy');

  type CtaType = 'checklist' | 'roi' | 'audit';
  const ctaType = (article.ctaType || undefined) as CtaType | undefined;

  const variantCopy = (type: CtaType) => {
    if (isEn) {
      if (type === 'checklist') {
        return {
          primary: 'Get the automation checklist',
          secondary: 'Calculate ROI',
        };
      }
      if (type === 'roi') {
        return {
          primary: 'Calculate losses & ROI',
          secondary: 'Get the checklist',
        };
      }
      return {
        primary: 'Request a free audit',
        secondary: 'Calculate ROI',
      };
    }

    if (type === 'checklist') {
      return {
        primary: 'Завантажити чек-лист',
        secondary: 'Порахувати ROI',
      };
    }
    if (type === 'roi') {
      return {
        primary: 'Порахувати ROI та втрати',
        secondary: 'Отримати чек-лист',
      };
    }
    return {
      primary: 'Замовити безкоштовний аудит',
      secondary: 'Порахувати ROI',
    };
  };

  const ctaButtons = (() => {
    if (!ctaType) {
      return {
        primary: { href: primaryCtaHref, label: t(article.cta.bookConsultation), type: 'generic', variant: 'primary' as const },
        secondary: { href: primaryCtaHref, label: t(article.cta.getAudit), type: 'generic', variant: 'secondary' as const },
      };
    }

    const copy = variantCopy(ctaType);
    if (ctaType === 'checklist') {
      return {
        primary: { href: beautyTargets.checklist, label: copy.primary, type: 'checklist' as const, variant: 'primary' as const },
        secondary: { href: beautyTargets.roi, label: copy.secondary, type: 'roi' as const, variant: 'secondary' as const },
      };
    }
    if (ctaType === 'roi') {
      return {
        primary: { href: beautyTargets.roi, label: copy.primary, type: 'roi' as const, variant: 'primary' as const },
        secondary: { href: beautyTargets.checklist, label: copy.secondary, type: 'checklist' as const, variant: 'secondary' as const },
      };
    }
    return {
      primary: { href: beautyTargets.audit, label: copy.primary, type: 'audit' as const, variant: 'primary' as const },
      secondary: { href: beautyTargets.roi, label: copy.secondary, type: 'roi' as const, variant: 'secondary' as const },
    };
  })();

  /* ── JSON-LD ── */
  const founderId = `${siteUrl}#vladyslav-archer`;
  const ogImage = new URL('/opengraph-image', siteUrl).toString();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#blogposting`,
    headline: t(article.h1),
    description: t(article.metaDescription),
    url: canonicalUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Person', '@id': founderId, name: 'Vladyslav Archer' },
    publisher: { '@id': `${siteUrl}#organization` },
    inLanguage: isEn ? 'en-US' : 'uk-UA',
    image: ogImage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: isEn ? 'en-US' : 'uk-UA',
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
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '\u0413\u043e\u043b\u043e\u0432\u043d\u0430', item: new URL(withLang(lang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Blog' : '\u0411\u043b\u043e\u0433', item: new URL(withLang(lang, '/blog'), siteUrl).toString() },
      { '@type': 'ListItem', position: 3, name: t(article.h1), item: canonicalUrl },
    ],
  };

  /* ── Related articles ── */
  const relatedArticles = blogArticles
    .filter((a) => a.slug !== slug && a.category.en === article.category.en)
    .slice(0, 2);
  const allOther = relatedArticles.length < 2
    ? [...relatedArticles, ...blogArticles.filter((a) => a.slug !== slug && !relatedArticles.includes(a)).slice(0, 2 - relatedArticles.length)]
    : relatedArticles;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <AnalyticsAutoCapture pageType="blog_article" vertical={vertical} locale={lang === 'en' ? 'en' : 'uk'} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/4 w-[900px] h-[900px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 50%)', filter: 'blur(120px)' }} />
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 50%)', filter: 'blur(80px)' }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">{isEn ? 'Home' : '\u0413\u043e\u043b\u043e\u0432\u043d\u0430'}</Link>
            <span className="text-white/20">/</span>
            <Link href={withLang(lang, '/blog')} className="hover:text-white transition-colors">{isEn ? 'Blog' : '\u0411\u043b\u043e\u0433'}</Link>
            <span className="text-white/20">/</span>
            <span className="text-gray-400 truncate max-w-[200px]">{t(article.keyword)}</span>
          </nav>

          {/* Icon + category badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-3xl shrink-0"
              style={{ boxShadow: '0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(255,255,255,0.1)' }}>
              {article.icon}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/15">
                {t(article.category)}
              </span>
              <span className="text-xs text-gray-500">{article.readTime} {isEn ? 'min read' : '\u0445\u0432'}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <time className="text-xs text-gray-500" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-[1.1] mb-8">
            <span className="text-white">{t(article.h1)}</span>
          </h1>

          {/* Accent line */}
          <div className="h-[2px] w-24 rounded-full mb-10"
            style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.05))' }} />

          {/* Intro — slightly larger, first paragraph bold */}
          <div className="space-y-5">
            {article.intro.map((p, i) => (
              <p key={i} className={`leading-relaxed ${i === 0 ? 'text-xl md:text-2xl text-gray-200 font-medium' : 'text-lg text-gray-400'}`}>
                {t(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TABLE OF CONTENTS ═══════════ */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              {isEn ? 'In this article' : '\u0423 \u0446\u0456\u0439 \u0441\u0442\u0430\u0442\u0442\u0456'}
            </h2>
            <ol className="space-y-2">
              {article.sections.map((section, si) => (
                <li key={si} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-white/30 mt-0.5 w-5 text-right shrink-0">{String(si + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-gray-300">{t(section.heading)}</span>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <span className="text-xs font-bold text-white/30 mt-0.5 w-5 text-right shrink-0">{String(article.sections.length + 1).padStart(2, '0')}</span>
                <span className="text-sm text-gray-300">FAQ</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT SECTIONS ═══════════ */}
      <article className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {article.sections.map((section, si) => (
            <section key={si} className="relative mb-16 last:mb-12">
              {/* Section number + heading */}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                  style={{ boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}>
                  <span className="text-sm font-bold text-white/50">{String(si + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug pt-1.5">
                  {t(section.heading)}
                </h2>
              </div>

              {/* Body paragraphs */}
              {section.body.map((p, pi) => (
                <p key={pi} className="text-base md:text-lg text-gray-300 leading-[1.8] mb-5 pl-0 md:pl-[68px]">
                  {t(p)}
                </p>
              ))}

              {/* Bullets — styled as cards */}
              {section.bullets && section.bullets.length > 0 && (
                <div className="pl-0 md:pl-[68px] mt-4">
                  <div className="space-y-2.5">
                    {section.bullets.map((b, bi) => (
                      <div key={bi}
                        className="flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-3.5 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
                        <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-white/50">{bi + 1}</span>
                        </div>
                        <span className="text-[15px] text-gray-300 leading-relaxed">{t(b)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section divider */}
              {si < article.sections.length - 1 && (
                <div className="mt-14 pl-0 md:pl-[68px]">
                  <div className="h-px w-full"
                    style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent 80%)' }} />
                </div>
              )}
            </section>
          ))}

          {/* ═══════════ FAQ ═══════════ */}
          <section className="relative mb-16">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"
                style={{ boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}>
                <span className="text-sm font-bold text-white/50">?</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug pt-1.5">FAQ</h2>
            </div>

            <div className="pl-0 md:pl-[68px] space-y-3">
              {article.faq.map((qa, i) => (
                <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/15">
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-6">
                    <span className="text-base font-bold text-white leading-snug">{t(qa.q)}</span>
                    <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0
                      group-open:rotate-45 transition-all duration-300 group-open:bg-white/10">
                      <span className="text-sm text-gray-400">+</span>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-[15px] text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {t(qa.a)}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ═══════════ RELATED SERVICES ═══════════ */}
          <section className="mb-14 pl-0 md:pl-[68px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              {isEn ? 'Related services' : '\u041f\u043e\u0432\u02bc\u044f\u0437\u0430\u043d\u0456 \u043f\u043e\u0441\u043b\u0443\u0433\u0438'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {/* Existing article-defined links */}
              {article.relatedLinks.map((link) => (
                <Link key={link.href} href={withLang(lang, link.href)}
                  className="group inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-white/5 text-gray-300 border border-white/10
                    transition-all duration-200 hover:border-white/25 hover:text-white hover:bg-white/[0.08]">
                  <span>{t(link.label)}</span>
                  <span className="text-white/30 group-hover:text-white/60 transition-colors">\u2192</span>
                </Link>
              ))}
              {/* Dynamically generated SEO service links */}
              {getRelatedServicesForBlog(article)
                .filter((slug) => !article.relatedLinks.some((l) => l.href === `/${slug}`))
                .map((slug, idx) => {
                  const page = SEO_SERVICE_PAGES[slug];
                  if (!page) return null;
                  return (
                    <Link key={slug} href={withLang(lang, `/${slug}`)}
                      className="group inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-white/5 text-gray-300 border border-white/10
                        transition-all duration-200 hover:border-white/25 hover:text-white hover:bg-white/[0.08]">
                      <span>{getSemanticAnchor(slug, lang, idx + 1)}</span>
                      <span className="text-white/30 group-hover:text-white/60 transition-colors">\u2192</span>
                    </Link>
                  );
                })}
            </div>
          </section>

          {hasBeautyPillarCta ? (
            <section className="mb-10 pl-0 md:pl-[68px]">
              <Link
                href={beautyPillarBase}
                className="group flex items-center justify-between gap-6 rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 via-white/[0.03] to-transparent px-6 py-5 transition-all duration-200 hover:border-emerald-300/30 hover:bg-white/[0.05]"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300/80">
                    {isEn ? 'Beauty automation guide' : 'Гід по beauty-автоматизації'}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {isEn ? 'Full guide to beauty salon automation' : 'Повний гід по автоматизації салону краси'}
                  </h3>
                </div>
                <span className="shrink-0 text-lg font-semibold text-white transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </section>
          ) : null}

          {/* ═══════════ CTA ═══════════ */}
          <div className="relative rounded-[2rem] overflow-hidden mb-16 border border-white/[0.08]" data-source-section="article-cta">
            {/* Animated gradient background */}
            <div className="absolute inset-0"
              style={{ 
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 25%, rgba(236,72,153,0.08) 50%, rgba(99,102,241,0.12) 75%, rgba(59,130,246,0.1) 100%)',
              }} />
            
            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 opacity-60"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120,119,198,0.3), transparent), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(168,85,247,0.2), transparent)',
              }} />
            
            {/* Animated orbs */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 60%)', filter: 'blur(60px)' }} />
            <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 60%)', filter: 'blur(80px)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />
            
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
            
            {/* Top shine line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)' }} />

            <div className="relative px-8 py-12 md:px-16 md:py-16">
              {/* Badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-white/90">
                    {isEn ? 'Free consultation available' : 'Безкоштовна консультація доступна'}
                  </span>
                </div>
              </div>

              {/* Main content - centered */}
              <div className="text-center max-w-2xl mx-auto">
                {/* Icon cluster */}
                <div className="flex justify-center items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/25 rotate-[-6deg]">
                    🚀
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-gray-100 flex items-center justify-center text-3xl shadow-xl shadow-white/20">
                    ⚡
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xl shadow-lg shadow-pink-500/25 rotate-[6deg]">
                    🎯
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {isEn ? 'Ready to automate with AI?' : 'Готові автоматизувати з AI?'}
                </h2>
                
                <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                  {isEn
                    ? 'Get a free strategy session and discover how AI can transform your business operations.'
                    : 'Отримайте безкоштовну стратегічну сесію та дізнайтесь, як AI може трансформувати ваші бізнес-процеси.'}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap justify-center gap-8 mb-10">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{isEn ? 'Projects' : 'Проєктів'}</div>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">80%</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{isEn ? 'Cost reduction' : 'Зниження витрат'}</div>
                  </div>
                  <div className="w-px h-12 bg-white/20 hidden sm:block" />
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{isEn ? 'AI availability' : 'Доступність AI'}</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href={ctaButtons.primary.href}
                    data-cta="blog-cta"
                    data-cta-type={ctaButtons.primary.type}
                    data-cta-variant={ctaButtons.primary.variant}
                    className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.03] overflow-hidden ${
                      ctaButtons.primary.type === 'checklist'
                        ? 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.25)]'
                        : ctaButtons.primary.type === 'audit'
                          ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-[0_0_40px_rgba(249,115,22,0.25)]'
                          : 'bg-white text-black hover:bg-gray-100 shadow-[0_0_40px_rgba(255,255,255,0.25)]'
                    }`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span>{ctaButtons.primary.label}</span>
                  </Link>

                  <Link
                    href={ctaButtons.secondary.href}
                    data-cta="blog-cta"
                    data-cta-type={ctaButtons.secondary.type}
                    data-cta-variant={ctaButtons.secondary.variant}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02]"
                  >
                    <span>{ctaButtons.secondary.label}</span>
                  </Link>
                </div>

                {/* Trust text */}
                <p className="mt-8 text-sm text-white/40">
                  {isEn ? 'No commitment required. 30-minute call.' : 'Без зобовʼязань. 30-хвилинний дзвінок.'}
                </p>
              </div>
            </div>
            
            {/* Bottom shine line */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)' }} />
          </div>

          {/* ═══════════ READ NEXT ═══════════ */}
          {allOther.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                {isEn ? 'Read next' : '\u0427\u0438\u0442\u0430\u0442\u0438 \u0434\u0430\u043b\u0456'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {allOther.map((ra) => (
                  <Link key={ra.slug} href={withLang(lang, `/blog/${ra.slug}`)}
                    className="group relative rounded-3xl border border-white/10 overflow-hidden
                      transition-all duration-300 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}>
                    {/* Top accent */}
                    <div className="h-[2px] w-full"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)' }} />

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-xl
                          transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {ra.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t(ra.category)}</span>
                        </div>
                        <span className="text-xs text-gray-500">{ra.readTime} {isEn ? 'min' : '\u0445\u0432'}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug group-hover:text-white/85 transition-colors mb-3">
                        {t(ra.h1)}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {t(ra.metaDescription)}
                      </p>
                      <div className="mt-4 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                        {isEn ? 'Read article' : '\u0427\u0438\u0442\u0430\u0442\u0438'} <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">\u2192</span>
                      </div>
                    </div>
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
