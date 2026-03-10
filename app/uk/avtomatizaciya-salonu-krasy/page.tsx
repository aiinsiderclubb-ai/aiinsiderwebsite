import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Link from 'next/link';
import AnalyticsAutoCapture from '@/app/components/analytics/AnalyticsAutoCapture';
import HeroSection from '@/app/components/beauty-salon/HeroSection';
import ProblemSection from '@/app/components/beauty-salon/ProblemSection';
import AutomationSection from '@/app/components/beauty-salon/AutomationSection';
import BeautyClusterSection from '@/app/components/beauty-salon/BeautyClusterSection';
import ROISection from '@/app/components/beauty-salon/ROISection';
import LeadMagnetSection from '@/app/components/beauty-salon/LeadMagnetSection';
import { buildFaqSchema } from '@/app/lib/schema/faqSchema';
import { buildBreadcrumbSchema } from '@/app/lib/schema/breadcrumbSchema';
import { buildBeautyServiceSchema } from '@/app/lib/schema/serviceSchema';
import { getSiteUrl } from '@/app/lib/site';
import { beautyPillarUk } from '@/app/lib/verticals/beauty';

const CaseSection = dynamic(() => import('@/app/components/beauty-salon/CaseSection'));
const ImplementationSection = dynamic(() => import('@/app/components/beauty-salon/ImplementationSection'));
const ObjectionSection = dynamic(() => import('@/app/components/beauty-salon/ObjectionSection'));
const FAQSection = dynamic(() => import('@/app/components/beauty-salon/FAQSection'));
const FinalCTA = dynamic(() => import('@/app/components/beauty-salon/FinalCTA'));

const PAGE_PATH = '/uk/avtomatizaciya-salonu-krasy';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(PAGE_PATH, siteUrl).toString();

  return {
    title: 'Автоматизація салону краси: менше no-show, більше записів | AI Insider',
    description:
      'Автоматизація салону краси з фокусом на виручку: Instagram-ліди, онлайн-запис 24/7, нагадування, CRM-сегментація та повторні продажі.',
    alternates: {
      canonical: PAGE_PATH,
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

      <article>
        <section className="pt-6 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href={beautyPillarUk.chrome.brand.href} className="text-sm text-white/90 font-semibold">
              {beautyPillarUk.chrome.brand.label}
            </Link>
            <a
              href={beautyPillarUk.chrome.topCta.href}
              data-cta="top-nav-audit"
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs text-white hover:bg-white/10"
            >
              {beautyPillarUk.chrome.topCta.label}
            </a>
          </div>
        </section>

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
        <LeadMagnetSection
          status={leadMagnetStatus}
          content={beautyPillarUk.leadMagnet}
          vertical={beautyPillarUk.vertical}
          locale={beautyPillarUk.locale}
        />
        <FinalCTA
          status={auditStatus}
          content={beautyPillarUk.finalCta}
          vertical={beautyPillarUk.vertical}
          locale={beautyPillarUk.locale}
        />
      </article>
    </main>
  );
}
