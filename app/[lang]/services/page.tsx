import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getLocalizedText, servicesData } from '@/app/lib/servicesData';
import { SEO_SERVICE_PAGES, getLocalizedSeo, type SeoServiceSlug } from '@/app/lib/seoServicePages';

type Params = { lang: string };

export default async function ServicesPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const servicesTitle = lang === 'en' ? 'Services' : 'Послуги';
  const servicesSubtitle =
    lang === 'en'
      ? 'Focused landing pages for narrow keywords, built to convert: chatbots, voice agents, lead generation, real estate automation, workflow automation, analytics assistants, and custom AI.'
      : 'Посадкові сторінки під “вузькі” ключі, які конвертують: чатботи, голосові агенти, лідогенерація, автоматизація для нерухомості, автоматизація процесів, аналітичні асистенти та кастомний AI.';

  const bookCallLabel = lang === 'en' ? 'Book an intro call' : 'Замовити дзвінок';
  const viewCasesLabel = lang === 'en' ? 'View case studies' : 'Подивитись кейси';

  const coreSlugs: SeoServiceSlug[] = [
    'ai-automation-for-business',
    'ai-chatbots-for-business',
    'ai-voice-agents',
    'custom-ai-agents',
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-14 px-6 overflow-hidden">
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

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="text-sm text-gray-300">{servicesTitle}</span>
            <span className="text-xs px-2 py-1 bg-white/10 text-white rounded-full border border-white/20">
              SEO
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
            {lang === 'en' ? 'AI services that' : 'AI‑послуги, які'}{' '}
            <span className="gradient-text">{lang === 'en' ? 'rank & convert' : 'ранжуються і конвертують'}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-10">{servicesSubtitle}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30"
            >
              {bookCallLabel}
            </Link>
            <Link
              href={withLang(lang, '/cases')}
              className="px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {viewCasesLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Core SEO Service Pages */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-7">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {lang === 'en' ? 'Core service pages' : 'Основні сторінки послуг'}
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-3xl">
                {lang === 'en'
                  ? 'Clean URLs + focused keywords for faster indexing and strong intent matching.'
                  : 'Чисті URL + фокус на ключі для швидшої індексації та сильного наміру.'}
              </p>
            </div>
            <Link
              href={withLang(lang, '/cases')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-3 bg-white/5 text-white rounded-full font-bold
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {viewCasesLabel}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreSlugs.map((slug) => {
              const p = SEO_SERVICE_PAGES[slug];
              const desc = getLocalizedSeo(p.metaDescription, lang);
              return (
                <Link
                  key={slug}
                  href={withLang(lang, `/${slug}`)}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6
                    transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                >
                  <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">SEO landing</div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-3">{p.keyword}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                  <div className="mt-5 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                    {lang === 'en' ? 'Open →' : 'Відкрити →'}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-7 sm:hidden">
            <Link
              href={withLang(lang, '/cases')}
              className="inline-flex items-center justify-center px-6 py-3 bg-white/5 text-white rounded-full font-bold
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              {viewCasesLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-7">
            {lang === 'en' ? 'More service pages' : 'Додаткові сторінки послуг'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={withLang(lang, `/services/${service.slug}`)}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]
                  transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}
              >
                <div className="p-7">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center text-2xl
                        transition-transform duration-300 group-hover:scale-110"
                      style={{ boxShadow: '0 0 25px rgba(255, 255, 255, 0.18)' }}
                    >
                      {service.features[0]?.icon || '✦'}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                        {getLocalizedText(service.timeline, lang)}
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                        {getLocalizedText(service.title, lang)}
                      </h2>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {getLocalizedText(service.subtitle, lang)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {(service.keywords[lang] || [])
                        .slice(0, 2)
                        .map((kw) => (
                          <span
                            key={kw}
                            className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                          >
                            {kw}
                          </span>
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {lang === 'en' ? 'Explore →' : 'Детальніше →'}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    className="absolute -top-20 -right-24 w-[340px] h-[340px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 60%)',
                      filter: 'blur(40px)',
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {lang === 'en' ? 'Need a page for a very narrow keyword?' : 'Потрібна сторінка під дуже “вузький” ключ?'}
            </h3>
            <p className="text-gray-400 max-w-3xl mb-6">
              {lang === 'en'
                ? 'We can build a dedicated landing page + FAQ schema + internal linking strategy so you can rank faster on specific intent queries (CH/EU/US).'
                : 'Ми можемо зробити окрему посадкову сторінку + FAQ schema + перелінковку, щоб швидше ранжуватись по запитах з високим наміром (CH/ЄС/США).'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${withLang(lang, '/')}#bookcall`}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black rounded-full font-bold
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
              >
                {bookCallLabel}
              </Link>
              <Link
                href={withLang(lang, '/cases')}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 text-white rounded-full font-bold
                  border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              >
                {viewCasesLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

