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
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(PAGE_PATH, siteUrl).toString();

  return {
    title: 'Автоматизація нерухомості | AI для агентств — AI Insider',
    description:
      'AI-автоматизація для агентств нерухомості: кваліфікація лідів, голосові агенти, CRM-автоматизація. Швейцарська AI-студія.',
    keywords: [
      'автоматизація нерухомості',
      'AI для ріелторів',
      'CRM автоматизація нерухомість',
      'голосовий агент нерухомість',
      'AI агентство нерухомості',
    ],
    alternates: {
      canonical: PAGE_PATH,
      languages: {
        'uk-UA': PAGE_PATH,
        'x-default': PAGE_PATH,
      },
    },
    openGraph: {
      type: 'article',
      title: 'Автоматизація нерухомості | AI для агентств — AI Insider',
      description:
        'AI-автоматизація для агентств нерухомості: кваліфікація лідів, голосові агенти, CRM-автоматизація та контроль воронки.',
      url: canonicalUrl,
      locale: 'uk_UA',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Автоматизація нерухомості | AI для агентств — AI Insider',
      description:
        'Від кваліфікації лідів до CRM і голосових агентів: practical pillar page для агентств нерухомості.',
      images: ['/twitter-image'],
    },
  };
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
        <HeroSection content={realEstatePillarUk.hero} />

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

        <ProblemSection content={realEstatePillarUk.problems} />
        <AutomationSection content={realEstatePillarUk.automation} />
        <RealEstateROISection />
        <CaseSection content={realEstatePillarUk.cases} />
        <ImplementationSection content={realEstatePillarUk.implementation} />
        <ObjectionSection content={realEstatePillarUk.objections} />
        <FAQSection title={realEstatePillarUk.faq.title} faqs={realEstatePillarUk.faq.items} />

        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Більше про автоматизацію нерухомості
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white">Більше про автоматизацію нерухомості</h2>
              <p className="mt-4 text-lg text-gray-400">
                Починаємо real estate cluster з матеріалу про voice agent, швидкість відповіді та призначення показів без ручного хаосу.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((article) => (
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

        <PageCTA />
        <BookCall />
      </article>
      <Footer />
    </main>
  );
}
