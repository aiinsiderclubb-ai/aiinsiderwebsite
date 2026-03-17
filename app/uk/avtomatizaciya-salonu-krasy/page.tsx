import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Link from 'next/link';
import AnalyticsAutoCapture from '@/app/components/analytics/AnalyticsAutoCapture';
import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/beauty-salon/HeroSection';
import ProblemSection from '@/app/components/beauty-salon/ProblemSection';
import AutomationSection from '@/app/components/beauty-salon/AutomationSection';
import BeautyClusterSection from '@/app/components/beauty-salon/BeautyClusterSection';
import ROISection from '@/app/components/beauty-salon/ROISection';
import LeadMagnetSection from '@/app/components/beauty-salon/LeadMagnetSection';
import { buildFaqSchema } from '@/app/lib/schema/faqSchema';
import { buildBreadcrumbSchema } from '@/app/lib/schema/breadcrumbSchema';
import { buildBeautyServiceSchema } from '@/app/lib/schema/serviceSchema';
import PageCTA from '@/app/components/PageCTA';
import Footer from '@/app/components/Footer';
import { getBlogArticle, getBlogText } from '@/app/lib/blogData';
import { getSiteUrl } from '@/app/lib/site';
import { beautyPillarUk } from '@/app/lib/verticals/beauty';

const CaseSection = dynamic(() => import('@/app/components/beauty-salon/CaseSection'));
const ImplementationSection = dynamic(() => import('@/app/components/beauty-salon/ImplementationSection'));
const ObjectionSection = dynamic(() => import('@/app/components/beauty-salon/ObjectionSection'));
const FAQSection = dynamic(() => import('@/app/components/beauty-salon/FAQSection'));
const FinalCTA = dynamic(() => import('@/app/components/beauty-salon/FinalCTA'));

const PAGE_PATH = '/uk/avtomatizaciya-salonu-krasy';
const BEAUTY_CLUSTER_SLUGS = [
  'instagram-direct-leads-beauty-salon',
  'beauty-salon-no-show-reduction-system',
  'online-booking-automation-for-beauty-salon',
  'beauty-salon-reminders-sms-dm-workflows',
  'salon-crm-segmentation-playbook',
  'beauty-salon-repeat-sales-automation',
  'beauty-salon-review-automation-system',
  'beauty-salon-kpi-dashboard-automation',
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(PAGE_PATH, siteUrl).toString();

  return {
    title: 'Автоматизація салону краси: менше no-show, більше записів | AI Insider',
    description:
      'Автоматизація салону краси з фокусом на виручку: Instagram-ліди, онлайн-запис 24/7, нагадування, CRM-сегментація та повторні продажі.',
    alternates: {
      canonical: PAGE_PATH,
      languages: {
        'uk-UA': PAGE_PATH,
        'x-default': PAGE_PATH,
      },
    },
    openGraph: {
      type: 'article',
      title: 'Автоматизація салону краси: менше no-show, більше записів',
      description:
        'Практичний гайд по автоматизації салону краси: де втрачаються гроші, які рішення дають ROI і як запустити за 14–30 днів.',
      url: canonicalUrl,
      locale: 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Автоматизація салону краси: менше no-show, більше записів',
      description:
        'ROI-driven підхід: Instagram-ліди, запис, нагадування, CRM і повторні продажі для салонів краси.',
      images: ['/twitter-image'],
    },
  };
}

export default async function BeautySalonAutomationPage({
  searchParams,
}: {
  searchParams: Promise<{ leadMagnet?: string; audit?: string }>;
}) {
  const params = await searchParams;
  const siteUrl = getSiteUrl();
  const pageUrl = new URL(PAGE_PATH, siteUrl).toString();

  const faqSchema = buildFaqSchema(beautyPillarUk.faq.items);
  const breadcrumbSchema = buildBreadcrumbSchema([
    ...beautyPillarUk.chrome.breadcrumbs.items.map((b) => ({
      name: b.label,
      item: new URL(b.href, siteUrl).toString(),
    })),
    { name: beautyPillarUk.chrome.breadcrumbs.current, item: pageUrl },
  ]);
  const serviceSchema = buildBeautyServiceSchema({ url: pageUrl });
  const relatedBeautyArticles = BEAUTY_CLUSTER_SLUGS.map((slug) => getBlogArticle(slug)).filter(
    (article): article is NonNullable<ReturnType<typeof getBlogArticle>> => Boolean(article),
  );

  const leadMagnetStatus = params.leadMagnet === 'success' ? 'success' : params.leadMagnet === 'error' ? 'error' : undefined;
  const auditStatus = params.audit === 'success' ? 'success' : params.audit === 'error' ? 'error' : undefined;

  return (
    <main className="min-h-screen bg-black text-white">
      <Script id="beauty-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script
        id="beauty-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="beauty-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <AnalyticsAutoCapture pageType="pillar" vertical={beautyPillarUk.vertical} locale={beautyPillarUk.locale} />

      <Navbar />

      <article>
        <HeroSection
          content={beautyPillarUk.hero}
          accentGradient="from-rose-400 via-pink-400 to-purple-400"
          glowRgb="244, 63, 94"
          ctaGradient="linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #a855f7 100%)"
        />

        <section className="px-6 pb-2">
          <div className="max-w-6xl mx-auto text-sm text-gray-400">
            {beautyPillarUk.chrome.breadcrumbs.items.map((b) => (
              <span key={b.href}>
                <Link href={b.href} className="hover:text-white">
                  {b.label}
                </Link>{' '}
                /{' '}
              </span>
            ))}
            <span className="text-gray-200">{beautyPillarUk.chrome.breadcrumbs.current}</span>
          </div>
        </section>

        <ProblemSection content={beautyPillarUk.problems} accentGradient="from-rose-400 to-pink-500" glowRgb="244, 63, 94" />
        <AutomationSection content={beautyPillarUk.automation} accentGradient="from-pink-400 to-rose-500" glowRgb="236, 72, 153" />
        <BeautyClusterSection content={beautyPillarUk.cluster} accentGradient="from-rose-400 to-pink-500" glowRgb="244, 63, 94" />
        <ROISection content={beautyPillarUk.roi} accentGradient="from-rose-400 to-pink-500" glowRgb="244, 63, 94" />
        <CaseSection content={beautyPillarUk.cases} accentGradient="from-rose-400 to-pink-500" glowRgb="244, 63, 94" />
        <ImplementationSection content={beautyPillarUk.implementation} accentGradient="from-pink-400 to-purple-500" glowRgb="168, 85, 247" />
        <ObjectionSection content={beautyPillarUk.objections} accentGradient="from-rose-400 to-pink-500" glowRgb="244, 63, 94" />
        <FAQSection title={beautyPillarUk.faq.title} faqs={beautyPillarUk.faq.items} accentGradient="from-pink-400 to-rose-500" glowRgb="236, 72, 153" />
        <section className="relative px-6 py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[300px]" style={{ background: 'radial-gradient(ellipse, rgba(244, 63, 94, 0.07) 0%, transparent 60%)', filter: 'blur(80px)' }} />
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-10">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/15 mb-4" style={{ background: 'rgba(244, 63, 94, 0.07)' }}>
                  <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: 'rgba(244, 63, 94, 1)' }} />
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Більше про автоматизацію</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Більше про автоматизацію салону</h2>
                <p className="mt-3 text-gray-400 max-w-2xl leading-relaxed">Поглиблені матеріали по Instagram-лідах, no-show, CRM, повторних продажах і KPI для салону краси.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {relatedBeautyArticles.map((article, idx) => (
                <Link
                  key={article.slug}
                  href={`/uk/blog/${article.slug}`}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.7), transparent 70%)' }} />
                  <div className="absolute top-4 right-4 font-black text-3xl leading-none select-none" style={{ color: 'rgba(244, 63, 94, 0.07)' }}>{String(idx + 1).padStart(2, '0')}</div>
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/60" style={{ background: 'rgba(244, 63, 94, 0.06)' }}>
                    {article.icon} {getBlogText(article.category, 'uk')}
                  </div>
                  <h3 className="text-base font-bold leading-snug text-white group-hover:text-white/90 transition-colors">
                    {getBlogText(article.h1, 'uk')}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{getBlogText(article.metaDescription, 'uk')}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                    Читати статтю <span className="text-white/50" aria-hidden="true">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <LeadMagnetSection
          status={leadMagnetStatus}
          content={beautyPillarUk.leadMagnet}
          vertical={beautyPillarUk.vertical}
          locale={beautyPillarUk.locale}
          accentGradient="from-rose-400 to-pink-500"
          glowRgb="244, 63, 94"
        />
        <PageCTA />
        <FinalCTA
          status={auditStatus}
          content={beautyPillarUk.finalCta}
          vertical={beautyPillarUk.vertical}
          locale={beautyPillarUk.locale}
          accentGradient="from-rose-400 to-pink-500"
          glowRgb="244, 63, 94"
        />
      </article>
      <Footer />
    </main>
  );
}
