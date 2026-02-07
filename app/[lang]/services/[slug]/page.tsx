import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getCaseBySlug, getLocalizedText as getCaseText, type CaseStudy } from '@/app/lib/casesData';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { getLocalizedText, getServiceBySlug } from '@/app/lib/servicesData';

type Params = { lang: string; slug: string };

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { lang, slug } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const canonicalPath = withLang(lang, `/services/${service.slug}`);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();

  const pageTitle = getLocalizedText(service.title, lang);
  const pageSubtitle = getLocalizedText(service.subtitle, lang);

  const servicesLabel = lang === 'en' ? 'Services' : 'Послуги';
  const homeLabel = lang === 'en' ? 'Home' : 'Головна';
  const outcomesLabel = lang === 'en' ? 'Outcomes' : 'Результати';
  const featuresLabel = lang === 'en' ? 'What you get' : 'Що входить';
  const useCasesLabel = lang === 'en' ? 'Best for' : 'Кому підходить';
  const implementationLabel = lang === 'en' ? 'Implementation timeline' : 'Таймлайн впровадження';
  const faqLabel = lang === 'en' ? 'FAQ' : 'Поширені питання';

  const bookCallLabel = lang === 'en' ? 'Book an intro call' : 'Замовити дзвінок';
  const viewCasesLabel = lang === 'en' ? 'View case studies' : 'Подивитись кейси';

  const relatedCases: CaseStudy[] = (service.relatedCaseSlugs || [])
    .map((s) => getCaseBySlug(s))
    .filter((c): c is CaseStudy => Boolean(c));

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    description: getLocalizedText(service.seoDescription, lang),
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
    areaServed: ['Switzerland', 'Europe', 'United States'],
    serviceType: pageTitle,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: new URL(withLang(lang, '/'), siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: servicesLabel,
        item: new URL(withLang(lang, '/services'), siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: pageTitle,
        item: canonicalUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((qa) => ({
      '@type': 'Question',
      name: getLocalizedText(qa.question, lang),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(qa.answer, lang),
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
              filter: 'blur(90px)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={withLang(lang, '/')} className="hover:text-white transition-colors">
              {homeLabel}
            </Link>
            <span className="mx-2">/</span>
            <Link href={withLang(lang, '/services')} className="hover:text-white transition-colors">
              {servicesLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{pageTitle}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-7">
            <span className="text-sm text-gray-300">{servicesLabel}</span>
            <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full border border-white/20">
              {getLocalizedText(service.timeline, lang)}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-5">
            {pageTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mb-10">{pageSubtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30"
            >
              {bookCallLabel}
            </Link>
            <Link
              href={withLang(lang, '/cases')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {viewCasesLabel}
            </Link>
          </div>

          {/* SEO-friendly summary */}
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {service.outcomes.map((o, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  {outcomesLabel} {idx + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{getLocalizedText(o, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{featuresLabel}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.features.map((f, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center text-2xl mb-4"
                  style={{ boxShadow: '0 0 25px rgba(255, 255, 255, 0.16)' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{getLocalizedText(f.title, lang)}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(f.description, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases + Timeline */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{useCasesLabel}</h2>
            <div className="space-y-4">
              {service.useCases.map((u, idx) => (
                <div key={idx} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{getLocalizedText(u.title, lang)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(u.description, lang)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{implementationLabel}</h2>
            <ol className="space-y-4">
              {service.implementation.map((step, idx) => (
                <li key={idx} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-black font-bold"
                        style={{ boxShadow: '0 0 20px rgba(255,255,255,0.18)' }}
                      >
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-white">{getLocalizedText(step.title, lang)}</h3>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {getLocalizedText(step.duration, lang)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(step.description, lang)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{faqLabel}</h2>
          <div className="space-y-4">
            {service.faq.map((qa, idx) => (
              <details key={idx} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <span className="text-lg font-bold text-white">{getLocalizedText(qa.question, lang)}</span>
                  <span className="text-gray-400 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {getLocalizedText(qa.answer, lang)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related cases */}
      {relatedCases.length > 0 && (
        <section className="py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {lang === 'en' ? 'Related case studies' : 'Пов’язані кейси'}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {relatedCases.map((c) => {
                const caseTitle = getCaseText(c.title, lang);
                const caseDesc = getCaseText(c.shortDescription, lang);
                const href = c.slug === 'sweezy' ? '/cases/sweezy' : `/cases/${c.slug}`;
                return (
                  <Link
                    key={c.slug}
                    href={withLang(lang, href)}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6
                      transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}
                  >
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{caseTitle}</div>
                    <p className="text-sm text-gray-400 leading-relaxed">{caseDesc}</p>
                    <div className="mt-5 text-sm font-semibold text-white">
                      {lang === 'en' ? 'Read case →' : 'Читати кейс →'}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href={withLang(lang, '/cases')}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 text-white rounded-full font-bold
                  border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              >
                {viewCasesLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {lang === 'en'
              ? 'Want to rank for a narrower keyword than this?'
              : 'Хочеш ранжуватись по ще більш “вузькому” ключу?'}
          </h2>
          <p className="text-gray-400 max-w-3xl mb-6">
            {lang === 'en'
              ? 'We can spin up a dedicated landing page (with FAQ schema + internal linking) for your exact intent query and location focus (CH/EU/US).'
              : 'Ми можемо зробити окрему посадкову сторінку (з FAQ schema + перелінковкою) під ваш точний запит і гео‑фокус (CH/ЄС/США).'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
            >
              {bookCallLabel}
            </Link>
            <Link
              href={withLang(lang, '/services')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {servicesLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

