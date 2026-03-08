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
import type { FaqEntry } from '@/app/lib/schema/faqSchema';
import { buildFaqSchema } from '@/app/lib/schema/faqSchema';
import { buildBreadcrumbSchema } from '@/app/lib/schema/breadcrumbSchema';
import { buildBeautyServiceSchema } from '@/app/lib/schema/serviceSchema';
import { getSiteUrl } from '@/app/lib/site';

const CaseSection = dynamic(() => import('@/app/components/beauty-salon/CaseSection'));
const ImplementationSection = dynamic(() => import('@/app/components/beauty-salon/ImplementationSection'));
const ObjectionSection = dynamic(() => import('@/app/components/beauty-salon/ObjectionSection'));
const FAQSection = dynamic(() => import('@/app/components/beauty-salon/FAQSection'));
const FinalCTA = dynamic(() => import('@/app/components/beauty-salon/FinalCTA'));

const PAGE_PATH = '/uk/avtomatizaciya-salonu-krasy';

const FAQS: FaqEntry[] = [
  {
    question: 'Скільки коштує автоматизація салону краси?',
    answer:
      'Вартість залежить від кількості процесів та інтеграцій. Ми стартуємо з MVP-блоку (запис, нагадування, Direct), який дає фінансовий ефект найшвидше.',
  },
  {
    question: 'За який час видно перші результати?',
    answer:
      'Перші зміни у швидкості відповіді та підтвердженні записів зазвичай видно протягом 7–14 днів після запуску.',
  },
  {
    question: 'Чи можна запустити автоматизацію без зміни поточної CRM?',
    answer: 'Так. У більшості салонів ми інтегруємося з наявним стеком і не ламаємо діючі процеси.',
  },
  {
    question: 'Чи замінить AI адміністратора?',
    answer:
      'Ні. AI забирає рутину (первинні відповіді, нагадування, фіксація лідів), а адміністратор фокусується на сервісі та складних кейсах.',
  },
  {
    question: 'Як ви знижуєте no-show?',
    answer:
      'Через сценарії нагадувань, підтвердження візиту, легкий перенос та контроль реакції клієнта в єдиному ланцюгу.',
  },
  {
    question: 'Що робити, якщо команда не технічна?',
    answer: 'Після налаштування ви отримуєте простий регламент дій, а команда проходить коротке навчання.',
  },
  {
    question: 'Чи підходить це для малого салону 1–2 майстри?',
    answer:
      'Так. Саме малим салонам автоматизація часто дає найшвидшу окупність через чутливість до кожного втраченого запису.',
  },
  {
    question: 'Чи працює інтеграція з Instagram Direct?',
    answer:
      'Так. Ми будуємо сценарії обробки Direct-запитів з передачею контактів у CRM і трекінгом конверсії до запису.',
  },
  {
    question: 'Як перевірити, що автоматизація реально окупається?',
    answer:
      'Ми фіксуємо baseline метрики до запуску (FRT, no-show, conversion, repeat rate) і щотижня порівнюємо динаміку.',
  },
  {
    question: 'Чи є ризик втратити дані клієнтів?',
    answer: 'Впроваджуються рольовий доступ, логування змін, контроль дублювань і перевірки цілісності даних.',
  },
  {
    question: 'Чи можна запускати поетапно?',
    answer:
      'Так. Рекомендований підхід: етап 1 — ліди та запис, етап 2 — retention і повторні продажі, етап 3 — масштабування.',
  },
  {
    question: 'Що я отримаю на безкоштовному аудиті?',
    answer:
      'Розбір поточних вузьких місць, прогноз ROI на базі ваших цифр і дорожню карту впровадження на 14–30 днів.',
  },
];

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

  const faqSchema = buildFaqSchema(FAQS);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Головна', item: new URL('/uk', siteUrl).toString() },
    { name: 'Послуги', item: new URL('/uk/services', siteUrl).toString() },
    { name: 'Автоматизація салону краси', item: pageUrl },
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
      <AnalyticsAutoCapture pageType="pillar" vertical="beauty" locale="uk" />

      <article>
        <section className="pt-6 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/uk" className="text-sm text-white/90 font-semibold">
              AI Insider
            </Link>
            <a
              href="#audit-form"
              data-cta="top-nav-audit"
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs text-white hover:bg-white/10"
            >
              Безкоштовний аудит
            </a>
          </div>
        </section>

        <HeroSection />

        <section className="px-6 pb-2">
          <div className="max-w-6xl mx-auto text-sm text-gray-400">
            <Link href="/uk" className="hover:text-white">
              Головна
            </Link>{' '}
            /{' '}
            <Link href="/uk/services" className="hover:text-white">
              Послуги
            </Link>{' '}
            / <span className="text-gray-200">Автоматизація салону краси</span>
          </div>
        </section>

        <ProblemSection />
        <AutomationSection />
        <BeautyClusterSection />
        <ROISection />
        <CaseSection />
        <ImplementationSection />
        <ObjectionSection />
        <FAQSection faqs={FAQS} />
        <LeadMagnetSection status={leadMagnetStatus} />
        <FinalCTA status={auditStatus} />
      </article>
    </main>
  );
}
