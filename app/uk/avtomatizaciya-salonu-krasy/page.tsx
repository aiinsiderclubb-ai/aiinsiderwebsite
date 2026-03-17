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
        <HeroSection content={beautyPillarUk.hero} />

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

        <ProblemSection content={beautyPillarUk.problems} />
        <AutomationSection content={beautyPillarUk.automation} />
        <BeautyClusterSection content={beautyPillarUk.cluster} />
        <ROISection content={beautyPillarUk.roi} />
        <CaseSection content={beautyPillarUk.cases} />
        <ImplementationSection content={beautyPillarUk.implementation} />
        <ObjectionSection content={beautyPillarUk.objections} />
        <FAQSection title={beautyPillarUk.faq.title} faqs={beautyPillarUk.faq.items} />
        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Більше про автоматизацію салону
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white">
                Більше про автоматизацію салону
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Поглиблені матеріали по Instagram-лідах, no-show, CRM, повторних продажах і KPI для салону краси.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {relatedBeautyArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/uk/blog/${article.slug}`}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {article.icon} {getBlogText(article.category, 'uk')}
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white group-hover:text-white/90">
                    {getBlogText(article.h1, 'uk')}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {getBlogText(article.metaDescription, 'uk')}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    Читати статтю
                    <span aria-hidden="true">→</span>
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
        />
        <PageCTA />
        <FinalCTA
          status={auditStatus}
          content={beautyPillarUk.finalCta}
          vertical={beautyPillarUk.vertical}
          locale={beautyPillarUk.locale}
        />
      </article>
      <Footer />
    </main>
  );
}
