import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import {
  PROGRAMMATIC_PAGES,
  getProgrammaticPagesByType,
  getLocalizedProgrammatic,
} from '@/app/lib/programmaticSeo';

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

  return {
    title: titleWithBrand,
    description,
    alternates: {
      canonical,
      languages: buildHreflang(path),
    },
    openGraph: {
      title: titleWithBrand,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleWithBrand,
      description,
      images: ['/twitter-image'],
    },
  };
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
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border border-white/10 p-6 md:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}
          >
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isEn ? 'Can\'t find what you need?' : 'Не знайшли що шукаєте?'}
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                {isEn
                  ? 'Book a free consultation and we\'ll build a custom AI solution for your specific needs.'
                  : 'Замовте безкоштовну консультацію і ми побудуємо кастомне AI рішення під ваші потреби.'}
              </p>
              <Link
                href={`${withLang(lang, '/')}#bookcall`}
                className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
              >
                {isEn ? 'Book a free AI consultation' : 'Замовити безкоштовну AI-консультацію'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
