import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { buildHubLinks } from '@/app/lib/internalLinks';

type Params = { lang: string };

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) notFound();

  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, '/blog'), siteUrl).toString();
  const isEn = lang === 'en';
  const t = (v: { en: string; uk: string }) => getBlogText(v, lang);

  const title = isEn ? 'Blog' : '\u0411\u043b\u043e\u0433';
  const subtitle = isEn
    ? 'B2B playbooks on AI automation, chatbots, voice agents, and integrations \u2014 written for teams that care about measurable outcomes.'
    : 'B2B\u2011\u043f\u043b\u0435\u0439\u0431\u0443\u043a\u0438 \u043f\u0440\u043e AI\u2011\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u044e, \u0447\u0430\u0442\u0431\u043e\u0442\u0438, \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u0456 \u0430\u0433\u0435\u043d\u0442\u0438 \u0442\u0430 \u0456\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0456\u0457 \u2014 \u0434\u043b\u044f \u043a\u043e\u043c\u0430\u043d\u0434, \u044f\u043a\u0438\u043c \u0432\u0430\u0436\u043b\u0438\u0432\u0456 \u0432\u0438\u043c\u0456\u0440\u044e\u0432\u0430\u043d\u0456 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0438.';

  // Use centralized hub links with semantic anchors
  const hubLinks = buildHubLinks(lang);
  const servicePages = hubLinks.map((l) => ({
    href: l.href,
    label: l.label[lang],
  }));

  const ctaBook = isEn ? 'Book a free AI consultation' : '\u0417\u0430\u043c\u043e\u0432\u0438\u0442\u0438 \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0443 AI\u2011\u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0456\u044e';
  const ctaAudit = isEn ? 'Get AI automation audit' : '\u041e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0430\u0443\u0434\u0438\u0442 AI\u2011\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u0457';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description: subtitle,
    url: canonicalUrl,
    publisher: { '@type': 'Organization', name: SITE_NAME, url: siteUrl.toString() },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '\u0413\u043e\u043b\u043e\u0432\u043d\u0430', item: new URL(withLang(lang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
    ],
  };

  // Sort articles by date (newest first)
  const sorted = [...blogArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Unique categories
  const categories = [
    { label: isEn ? 'All' : '\u0412\u0441\u0435', active: true },
    ...Array.from(new Set(blogArticles.map((a) => a.category.en))).map((cat) => {
      const found = blogArticles.find((a) => a.category.en === cat);
      return { label: found ? t(found.category) : cat };
    }),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 55%)', filter: 'blur(100px)' }} />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 55%)', filter: 'blur(80px)' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-gray-300">{isEn ? 'Knowledge hub' : '\u0425\u0430\u0431 \u0437\u043d\u0430\u043d\u044c'}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-5 leading-[0.95]">
            <span className="text-white">{title}</span>
            <br />
            <span className="inline-block mt-2" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isEn ? 'Insights' : '\u0406\u043d\u0441\u0430\u0439\u0442\u0438'}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">{subtitle}</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <span key={cat.label} className={`text-xs md:text-sm px-4 py-2 rounded-full border cursor-default ${'active' in cat && cat.active ? 'bg-white text-black border-white font-bold' : 'bg-white/5 text-gray-300 border-white/10'}`}>
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Articles count badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm text-gray-400">
                {sorted.length} {isEn ? 'articles' : 'статей'}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {isEn ? 'Sorted by newest' : 'Сортування за новизною'}
            </div>
          </div>

          {/* Unified card grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sorted.map((article) => (
              <Link
                key={article.slug}
                href={withLang(lang, `/blog/${article.slug}`)}
                className="group relative flex flex-col h-full rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 hover:shadow-[0_8px_60px_rgba(255,255,255,0.08)]"
                style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}
              >
                {/* Top accent line */}
                <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)' }} />
                
                {/* Card content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Header: icon + date */}
                  <div className="flex items-start justify-between mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{ boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
                    >
                      {article.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <time className="text-[10px] font-medium text-gray-500 uppercase tracking-wider" dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'uk-UA', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                      <span className="text-[10px] text-gray-600">{article.readTime} {isEn ? 'min' : 'хв'}</span>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10">
                      {t(article.category)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors line-clamp-2">
                    {t(article.h1)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {t(article.metaDescription)}
                  </p>

                  {/* Footer: read link */}
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors">
                        {isEn ? 'Read article' : 'Читати статтю'}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-white/60 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View all note */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              {isEn 
                ? `Showing all ${sorted.length} articles. New content published regularly.` 
                : `Показано всі ${sorted.length} статей. Новий контент публікується регулярно.`}
            </p>
          </div>
        </div>
      </section>

      {/* Topics + Subscribe */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-white/10 p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)' }}>
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)', filter: 'blur(40px)' }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl mb-6" style={{ boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}>
                \u2709\uFE0F
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{isEn ? 'Stay updated' : '\u0411\u0443\u0434\u044c\u0442\u0435 \u0432 \u043a\u0443\u0440\u0441\u0456'}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {isEn
                  ? 'New playbooks, case breakdowns, and implementation guides \u2014 directly to your inbox. No spam, only signal.'
                  : '\u041d\u043e\u0432\u0456 \u043f\u043b\u0435\u0439\u0431\u0443\u043a\u0438, \u0440\u043e\u0437\u0431\u043e\u0440\u0438 \u043a\u0435\u0439\u0441\u0456\u0432 \u0456 \u0433\u0430\u0439\u0434\u0438 \u2014 \u043f\u0440\u044f\u043c\u043e \u043d\u0430 \u043f\u043e\u0448\u0442\u0443. \u0411\u0435\u0437 \u0441\u043f\u0430\u043c\u0443, \u043b\u0438\u0448\u0435 \u0441\u0438\u0433\u043d\u0430\u043b.'}
              </p>
              <div className="flex gap-3">
                <input type="email" placeholder={isEn ? 'your@email.com' : '\u0432\u0430\u0448@email.com'} className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-white/30 transition-colors" />
                <button type="button" className="px-6 py-3.5 bg-white text-black rounded-full font-bold text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25 shrink-0">
                  {isEn ? 'Subscribe' : '\u041f\u0456\u0434\u043f\u0438\u0441\u0430\u0442\u0438\u0441\u044c'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{isEn ? 'Explore by topic' : '\u0414\u043e\u0441\u043b\u0456\u0434\u0438\u0442\u0438 \u0437\u0430 \u0442\u0435\u043c\u043e\u044e'}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicePages.map((sp, i) => (
                  <Link key={sp.href} href={withLang(lang, sp.href)} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110">
                      {['\u26A1', '\uD83E\uDD16', '\uD83D\uDCDE', '\uD83E\uDDE0'][i]}
                    </span>
                    <span className="text-sm font-semibold text-white">{sp.label}</span>
                    <span className="ml-auto text-gray-500 text-sm transition-transform duration-200 group-hover:translate-x-1">\u2192</span>
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {isEn
                ? 'Articles are published regularly. Have a specific question? Tell us what you\u2019re building \u2014 we\u2019ll cover it.'
                : '\u041c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0438 \u043f\u0443\u0431\u043b\u0456\u043a\u0443\u044e\u0442\u044c\u0441\u044f \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u043e. \u0404 \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u0435 \u043f\u0438\u0442\u0430\u043d\u043d\u044f? \u041d\u0430\u043f\u0438\u0448\u0456\u0442\u044c, \u0449\u043e \u0431\u0443\u0434\u0443\u0454\u0442\u0435 \u2014 \u043c\u0438 \u043f\u0440\u0456\u043e\u0440\u0438\u0442\u0435\u0437\u0443\u0454\u043c\u043e \u0439\u043e\u0433\u043e.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)', filter: 'blur(60px)' }} />
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {isEn ? 'Want a custom AI roadmap for your business?' : '\u041f\u043e\u0442\u0440\u0456\u0431\u043d\u0430 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u0430 AI\u2011roadmap \u0434\u043b\u044f \u0432\u0430\u0448\u043e\u0433\u043e \u0431\u0456\u0437\u043d\u0435\u0441\u0443?'}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {isEn
                  ? 'Book a free consultation \u2014 we\u2019ll map your processes, find quick wins, and build a plan.'
                  : '\u0417\u0430\u043c\u043e\u0432\u0442\u0435 \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0443 \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0456\u044e \u2014 \u043c\u0438 \u0440\u043e\u0437\u0431\u0435\u0440\u0435\u043c\u043e \u043f\u0440\u043e\u0446\u0435\u0441\u0438, \u0437\u043d\u0430\u0439\u0434\u0435\u043c\u043e quick wins \u0456 \u043f\u043e\u0431\u0443\u0434\u0443\u0454\u043c\u043e \u043f\u043b\u0430\u043d.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`${withLang(lang, '/')}#bookcall`} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25">
                  {ctaBook}
                </Link>
                <Link href={`${withLang(lang, '/')}#bookcall`} className="px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30">
                  {ctaAudit}
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
