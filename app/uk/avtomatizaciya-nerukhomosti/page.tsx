import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Link from 'next/link';
import AnalyticsAutoCapture from '@/app/components/analytics/AnalyticsAutoCapture';
import Navbar from '@/app/components/Navbar';
import BookCall from '@/app/components/BookCall';
import HeroSection from '@/app/components/beauty-salon/HeroSection';
import ProblemSection from '@/app/components/beauty-salon/ProblemSection';
import AutomationSection from '@/app/components/beauty-salon/AutomationSection';
import RealEstateROISection from '@/app/components/real-estate/RealEstateROISection';
import { buildFaqSchema } from '@/app/lib/schema/faqSchema';
import { buildBreadcrumbSchema } from '@/app/lib/schema/breadcrumbSchema';
import { buildRealEstateServiceSchema } from '@/app/lib/schema/serviceSchema';
import PageCTA from '@/app/components/PageCTA';
import Footer from '@/app/components/Footer';
import { getBlogArticle, getBlogText } from '@/app/lib/blogData';
import { buildPageMetadata } from '@/app/lib/metadata';
import { getSiteUrl } from '@/app/lib/site';
import { realEstatePillarUk } from '@/app/lib/verticals/realEstate';

const CaseSection = dynamic(() => import('@/app/components/beauty-salon/CaseSection'));
const ImplementationSection = dynamic(() => import('@/app/components/beauty-salon/ImplementationSection'));
const ObjectionSection = dynamic(() => import('@/app/components/beauty-salon/ObjectionSection'));
const FAQSection = dynamic(() => import('@/app/components/beauty-salon/FAQSection'));

const PAGE_PATH = '/uk/avtomatizaciya-nerukhomosti';
const REAL_ESTATE_CLUSTER_SLUGS = [
  'ai-voice-agent-for-real-estate',
  // Future slots:
  // 'ai-lead-routing-for-real-estate-agencies',
  // 'crm-automation-for-real-estate-teams',
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Автоматизація нерухомості | AI для агентств — AI Insider';
  const description =
    'AI-автоматизація для агентств нерухомості: кваліфікація лідів, голосові агенти, CRM-автоматизація. Швейцарська AI-студія.';

  return buildPageMetadata({
    title,
    description,
    keywords: [
      'автоматизація нерухомості',
      'AI для ріелторів',
      'CRM автоматизація нерухомість',
      'голосовий агент нерухомість',
      'AI агентство нерухомості',
    ],
    canonical: PAGE_PATH,
    languages: {
      'uk-UA': PAGE_PATH,
      'x-default': PAGE_PATH,
    },
    lang: 'uk',
    type: 'article',
  });
}

export default function RealEstateAutomationPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(PAGE_PATH, siteUrl).toString();

  const faqSchema = buildFaqSchema(realEstatePillarUk.faq.items);
  const breadcrumbSchema = buildBreadcrumbSchema([
    ...realEstatePillarUk.chrome.breadcrumbs.items.map((b) => ({
      name: b.label,
      item: new URL(b.href, siteUrl).toString(),
    })),
    { name: realEstatePillarUk.chrome.breadcrumbs.current, item: pageUrl },
  ]);
  const serviceSchema = buildRealEstateServiceSchema({ url: pageUrl });
  const relatedArticles = REAL_ESTATE_CLUSTER_SLUGS.map((slug) => getBlogArticle(slug)).filter(
    (article): article is NonNullable<ReturnType<typeof getBlogArticle>> => Boolean(article),
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Script id="real-estate-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script
        id="real-estate-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="real-estate-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AnalyticsAutoCapture pageType="pillar" vertical={realEstatePillarUk.vertical} locale={realEstatePillarUk.locale} />

      <Navbar />

      <article>
        <HeroSection
          content={realEstatePillarUk.hero}
          accentGradient="from-blue-400 via-cyan-400 to-emerald-400"
          glowRgb="59, 130, 246"
          ctaGradient="linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)"
        />

        <section className="px-6 pb-2">
          <div className="max-w-6xl mx-auto text-sm text-gray-400">
            {realEstatePillarUk.chrome.breadcrumbs.items.map((b) => (
              <span key={b.href}>
                <Link href={b.href} className="hover:text-white">
                  {b.label}
                </Link>{' '}
                /{' '}
              </span>
            ))}
            <span className="text-gray-200">{realEstatePillarUk.chrome.breadcrumbs.current}</span>
          </div>
        </section>

        <ProblemSection content={realEstatePillarUk.problems} accentGradient="from-blue-400 to-cyan-500" glowRgb="59, 130, 246" />
        <AutomationSection content={realEstatePillarUk.automation} accentGradient="from-cyan-400 to-blue-500" glowRgb="6, 182, 212" />
        <RealEstateROISection accentGradient="from-blue-400 to-cyan-500" glowRgb="59, 130, 246" />
        <CaseSection content={realEstatePillarUk.cases} accentGradient="from-blue-400 to-cyan-500" glowRgb="59, 130, 246" />
        <ImplementationSection content={realEstatePillarUk.implementation} accentGradient="from-cyan-400 to-emerald-500" glowRgb="16, 185, 129" />
        <ObjectionSection content={realEstatePillarUk.objections} accentGradient="from-blue-400 to-cyan-500" glowRgb="59, 130, 246" />
        <FAQSection title={realEstatePillarUk.faq.title} faqs={realEstatePillarUk.faq.items} accentGradient="from-cyan-400 to-blue-500" glowRgb="6, 182, 212" />

        <section className="relative px-6 py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.07) 0%, transparent 60%)', filter: 'blur(80px)' }} />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-10">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 mb-4" style={{ background: 'rgba(59, 130, 246, 0.07)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: 'rgba(59, 130, 246, 1)' }} />
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Більше про автоматизацію</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Більше про автоматизацію нерухомості</h2>
                <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">Починаємо real estate cluster з матеріалу про voice agent, швидкість відповіді та призначення показів без ручного хаосу.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((article, idx) => (
                <Link
                  key={article.slug}
                  href={`/uk/blog/${article.slug}`}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent 70%)' }} />
                  <div className="absolute top-4 right-4 font-black text-3xl leading-none select-none" style={{ color: 'rgba(59, 130, 246, 0.07)' }}>{String(idx + 1).padStart(2, '0')}</div>
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/60" style={{ background: 'rgba(59, 130, 246, 0.06)' }}>
                    {article.icon} {getBlogText(article.category, 'uk')}
                  </div>
                  <h3 className="text-base font-bold leading-snug text-white group-hover:text-white/90 transition-colors">
                    {getBlogText(article.h1, 'uk')}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{getBlogText(article.metaDescription, 'uk')}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Читати статтю <span className="text-white/50" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PageCTA />
        <BookCall />
      </article>
      <Footer />
    </main>
  );
}
