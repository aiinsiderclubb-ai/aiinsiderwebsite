import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { buildPageMetadata } from '@/app/lib/metadata';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import {
  PROGRAMMATIC_PAGES,
  getProgrammaticPagesByType,
  getLocalizedProgrammatic,
} from '@/app/lib/programmaticSeo';
import PageCTA from '@/app/components/PageCTA';

type Params = { lang: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLang(lang)) return {};

  const isEn = lang === 'en';
  const path = '/solutions';
  const canonical = withLang(lang, path);

  const title = isEn ? 'AI Solutions' : 'AI Рішення';
  const titleWithBrand = `${title} | AI Insider`;
  const description = isEn
    ? 'Explore AI solutions by use case, industry, and business function. Find the right AI automation for your needs.'
    : 'Досліджуйте AI рішення за кейсами використання, індустріями та бізнес-функціями. Знайдіть правильну AI автоматизацію для ваших потреб.';

  return buildPageMetadata({
    title: titleWithBrand,
    description,
    canonical,
    languages: buildHreflang(path),
    lang,
  });
}

export default async function SolutionsIndexPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) notFound();

  const isEn = lang === 'en';
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(withLang(lang, '/solutions'), siteUrl).toString();

  const useCasePages = getProgrammaticPagesByType('use-case');
  const industryPages = getProgrammaticPagesByType('industry');
  const functionPages = getProgrammaticPagesByType('function');

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Головна', item: new URL(withLang(lang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Solutions' : 'Рішення', item: canonicalUrl },
    ],
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{children}</h2>
  );

  const PageCard = ({ page }: { page: (typeof PROGRAMMATIC_PAGES)[0] }) => (
    <Link
      href={withLang(lang, `/solutions/${page.slug}`)}
      className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all"
    >
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/80 transition-colors">
        {getLocalizedProgrammatic(page.h1, lang)}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2 flex-1">
        {getLocalizedProgrammatic(page.metaDescription, lang)}
      </p>
      <span className="mt-4 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
        {isEn ? 'Learn more →' : 'Дізнатись більше →'}
      </span>
    </Link>
  );

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 55%)', filter: 'blur(100px)' }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-gray-300">
              {PROGRAMMATIC_PAGES.length}+ {isEn ? 'AI solutions' : 'AI рішень'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
            {isEn ? 'AI Solutions Directory' : 'Каталог AI рішень'}
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            {isEn
              ? 'Find the right AI automation for your use case, industry, or business function.'
              : 'Знайдіть правильну AI автоматизацію для вашого кейсу, індустрії або бізнес-функції.'}
          </p>
        </div>
      </section>

      {/* Content Factory featured solution */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href={withLang(lang, '/content-factory')}
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-[2rem] border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.04] p-7 md:p-8 overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(16,185,129,0.08)]"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div
              className="absolute -right-16 -top-16 w-56 h-56 rounded-full pointer-events-none opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, transparent 65%)', filter: 'blur(50px)' }}
            />
            <div className="relative flex items-start gap-5">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/25">
                🏭
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg font-bold text-white">Content Factory</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 uppercase tracking-wider">
                    {isEn ? 'New' : 'Новинка'}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider">
                    {isEn ? 'Featured' : 'Рекомендовано'}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
                  {isEn
                    ? '500+ posts per month. AI finds viral ideas, creates videos and posts, publishes across all platforms. You just tap Approve in Telegram.'
                    : '500+ постів на місяць. AI знаходить вірусні ідеї, створює відео та пости, публікує у всі соцмережі. Ви лише натискаєте Схвалити в Telegram.'}
                </p>
              </div>
            </div>
            <span className="relative shrink-0 text-sm font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
              {isEn ? 'Explore →' : 'Детальніше →'}
            </span>
          </Link>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>{isEn ? 'AI Solutions by Use Case' : 'AI рішення за кейсами використання'}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCasePages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      </section>

      {/* Industry Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>{isEn ? 'AI Solutions by Industry' : 'AI рішення за індустріями'}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryPages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      </section>

      {/* Function Section */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>{isEn ? 'AI Solutions by Business Function' : 'AI рішення за бізнес-функціями'}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionPages.map((page) => (
              <PageCard key={page.slug} page={page} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA />

      <Footer />
    </main>
  );
}
