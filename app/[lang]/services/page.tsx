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

  const isEn = lang === 'en';
  const bookCallLabel = isEn ? 'Book a free consultation' : 'Замовити безкоштовну консультацію';
  const viewCasesLabel = isEn ? 'View case studies' : 'Подивитись кейси';

  const coreSlugs: SeoServiceSlug[] = [
    'ai-automation-for-business',
    'ai-chatbots-for-business',
    'ai-voice-agents',
    'custom-ai-agents',
  ];

  const coreIcons = ['⚡', '🤖', '📞', '🧠'];
  const coreColors = [
    'from-blue-500/20 to-purple-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-orange-500/20 to-red-500/20',
    'from-violet-500/20 to-pink-500/20',
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-[900px] h-[900px] rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)',
              filter: 'blur(120px)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '100px 100px',
              }}
            />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Top badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="flex -space-x-1">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm font-medium text-gray-300">
                {isEn ? 'AI-Powered Services' : 'AI-послуги'}
              </span>
              <span className="text-xs px-2.5 py-1 bg-white text-black rounded-full font-bold">
                {isEn ? 'Enterprise' : 'Бізнес'}
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading mb-8 leading-[0.95]">
              <span className="block text-white">
                {isEn ? 'AI Services That' : 'AI-послуги, які'}
              </span>
              <span
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 40%, #ffffff 60%, #666666 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%',
                }}
              >
                {isEn ? 'Drive Results' : 'Дають результат'}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {isEn
                ? 'From intelligent chatbots to voice agents and custom AI solutions — we build automation that scales your business without scaling your team.'
                : 'Від інтелектуальних чатботів до голосових агентів і кастомних AI-рішень — ми будуємо автоматизацію, яка масштабує ваш бізнес без розширення команди.'}
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: '60%', label: isEn ? 'Cost reduction' : 'Зниження витрат' },
              { value: '24/7', label: isEn ? 'Availability' : 'Доступність' },
              { value: '2-4', label: isEn ? 'Weeks to launch' : 'Тижні до запуску' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${withLang(lang, '/')}#bookcall`}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden
                transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {bookCallLabel}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href={withLang(lang, '/cases')}
              className="px-10 py-5 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              {viewCasesLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Core SEO Service Pages - Premium Cards */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        
        <div className="relative max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {isEn ? 'Core Solutions' : 'Основні рішення'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {isEn ? 'AI Automation Hub' : 'Хаб AI-автоматизації'}
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                {isEn
                  ? 'Four core AI solutions designed to transform how your business operates.'
                  : 'Чотири основні AI-рішення, створені для трансформації роботи вашого бізнесу.'}
              </p>
            </div>
            <Link
              href={withLang(lang, '/solutions')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white rounded-full font-semibold
                border border-white/15 transition-all duration-300 hover:bg-white/10 hover:border-white/25 shrink-0"
            >
              {isEn ? 'All solutions' : 'Всі рішення'}
              <span className="text-gray-400">→</span>
            </Link>
          </div>

          {/* Premium cards grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {coreSlugs.map((slug, idx) => {
              const p = SEO_SERVICE_PAGES[slug];
              const desc = getLocalizedSeo(p.metaDescription, lang);
              return (
                <Link
                  key={slug}
                  href={withLang(lang, `/${slug}`)}
                  className="group relative rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Card background with gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${coreColors[idx]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="absolute inset-0 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors duration-500" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-[2rem] transition-colors duration-500" />

                  {/* Glow effect on hover */}
                  <div className="absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                    }}
                  />

                  <div className="relative p-8 md:p-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl
                          transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{ boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
                      >
                        {coreIcons[idx]}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-white/40 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                          SEO Landing
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors">
                        {p.keyword}
                      </h3>
                      <p className="text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {desc}
                      </p>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-sm text-gray-500">
                          {isEn ? 'Ready to deploy' : 'Готово до запуску'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white font-semibold transition-all duration-300 group-hover:gap-4">
                        <span>{isEn ? 'Explore' : 'Детальніше'}</span>
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm
                          transition-all duration-300 group-hover:bg-white group-hover:text-black">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid - Bento Style */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {isEn ? 'Specialized Services' : 'Спеціалізовані послуги'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {isEn ? 'Tailored AI Solutions' : 'AI-рішення під ваші потреби'}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {isEn
                ? 'Deep-dive into specific AI capabilities designed for your industry and use case.'
                : 'Глибокі AI-можливості, розроблені для вашої індустрії та кейсу використання.'}
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((service, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <Link
                  key={service.slug}
                  href={withLang(lang, `/services/${service.slug}`)}
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1
                    ${isLarge ? 'lg:col-span-2' : ''}`}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-white/[0.03] group-hover:bg-white/[0.06] transition-colors duration-500" />
                  <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-3xl transition-colors duration-500" />

                  {/* Hover glow */}
                  <div
                    className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
                      filter: 'blur(40px)',
                    }}
                  />

                  <div className={`relative ${isLarge ? 'p-8 md:p-10' : 'p-7'}`}>
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center text-2xl shrink-0
                          transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ boxShadow: '0 0 30px rgba(255,255,255,0.15)' }}
                      >
                        {service.features[0]?.icon || '✦'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 px-2 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                            {getLocalizedText(service.timeline, lang)}
                          </span>
                        </div>
                        <h3 className={`font-bold text-white leading-tight ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                          {getLocalizedText(service.title, lang)}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-gray-400 leading-relaxed mb-6 ${isLarge ? 'text-base' : 'text-sm'} line-clamp-2`}>
                      {getLocalizedText(service.subtitle, lang)}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {(service.keywords[lang] || []).slice(0, isLarge ? 4 : 2).map((kw) => (
                        <span
                          key={kw}
                          className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-white/10 border border-white/20" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          {isEn ? '+50 clients' : '+50 клієнтів'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 group-hover:gap-3">
                        <span>{isEn ? 'Learn more' : 'Детальніше'}</span>
                        <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-[2.5rem] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  filter: 'blur(80px)',
                }}
              />
            </div>
            <div className="absolute inset-0 border border-white/10 rounded-[2.5rem]" />

            <div className="relative p-10 md:p-16 lg:p-20">
              <div className="max-w-3xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-sm font-medium text-white">
                    {isEn ? 'Custom Solutions Available' : 'Кастомні рішення доступні'}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {isEn
                    ? 'Need a custom AI solution for your specific use case?'
                    : 'Потрібне кастомне AI-рішення під ваш конкретний кейс?'}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                  {isEn
                    ? 'We build dedicated landing pages, custom AI agents, and tailored automation workflows. Let\'s discuss your requirements.'
                    : 'Ми створюємо окремі посадкові сторінки, кастомних AI-агентів та індивідуальні воркфлоу автоматизації. Давайте обговоримо ваші вимоги.'}
                </p>

                {/* Features list */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {[
                    isEn ? 'Custom AI Agents' : 'Кастомні AI-агенти',
                    isEn ? 'FAQ Schema' : 'FAQ Schema',
                    isEn ? 'Internal Linking' : 'Перелінковка',
                    isEn ? 'CH/EU/US Markets' : 'CH/ЄС/США ринки',
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-300 px-4 py-2 rounded-full bg-white/5 border border-white/10"
                    >
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`${withLang(lang, '/')}#bookcall`}
                    className="group px-10 py-5 bg-white text-black rounded-full font-bold text-lg
                      transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                  >
                    <span className="flex items-center gap-2">
                      {bookCallLabel}
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href={withLang(lang, '/cases')}
                    className="px-10 py-5 text-white font-bold text-lg
                      transition-all duration-300 hover:text-gray-300"
                  >
                    {viewCasesLabel} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
