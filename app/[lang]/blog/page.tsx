import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';

type Params = { lang: string };

const ICONS = ['⚡', '🤖', '📞', '🔌', '🎯', '🧠'];

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const path = '/blog';
  const canonicalUrl = new URL(withLang(lang, path), siteUrl).toString();

  const isEn = lang === 'en';
  const title = isEn ? 'Blog' : 'Блог';
  const subtitle = isEn
    ? 'B2B playbooks on AI automation, chatbots, voice agents, and integrations — written for teams that care about measurable outcomes.'
    : 'B2B‑плейбуки про AI‑автоматизацію, чатботи, голосові агенти та інтеграції — для команд, яким важливі вимірювані результати.';

  const heroTag = isEn ? 'Knowledge hub' : 'Хаб знань';
  const heroGradient = isEn ? 'Insights' : 'Інсайти';

  const comingSoon = isEn ? 'Coming soon' : 'Скоро';
  const readTime = isEn ? 'min read' : 'хв';

  const articles = isEn
    ? [
        {
          icon: '⚡',
          tag: 'Automation',
          title: 'How to automate inbound lead routing in 2 weeks',
          desc: 'Step-by-step: form → scoring → CRM → assignment → follow-up. With metrics and common pitfalls.',
          time: 8,
          soon: true,
        },
        {
          icon: '🤖',
          tag: 'Chatbots',
          title: 'RAG chatbot for B2B: what works and what doesn\u2019t',
          desc: 'When RAG helps, when it hallucinates, and how to build guardrails that actually work.',
          time: 12,
          soon: true,
        },
        {
          icon: '📞',
          tag: 'Voice Agents',
          title: 'AI voice agent for real estate: full implementation guide',
          desc: 'From call flows and qualification to CRM sync and calendar booking — real architecture.',
          time: 15,
          soon: true,
        },
        {
          icon: '🔌',
          tag: 'Integrations',
          title: 'CRM automation without data drift: a practical checklist',
          desc: 'Dedup, validation, SLA tracking, and error handling — for teams that scale.',
          time: 7,
          soon: true,
        },
        {
          icon: '🎯',
          tag: 'Lead Gen',
          title: 'AI lead scoring: how to separate signal from noise',
          desc: 'Scoring models, intent signals, qualification rules, and when to involve a human.',
          time: 10,
          soon: true,
        },
        {
          icon: '🧠',
          tag: 'Custom AI',
          title: 'Building AI agents that take actions (not just talk)',
          desc: 'Agentic patterns, tool-use, guardrails, and how to evaluate agent reliability.',
          time: 14,
          soon: true,
        },
      ]
    : [
        {
          icon: '⚡',
          tag: 'Автоматизація',
          title: 'Як автоматизувати обробку вхідних лідів за 2 тижні',
          desc: 'Крок за кроком: форма → скоринг → CRM → призначення → follow‑up. З метриками та типовими помилками.',
          time: 8,
          soon: true,
        },
        {
          icon: '🤖',
          tag: 'Чатботи',
          title: 'RAG‑чатбот для B2B: що працює, а що ні',
          desc: 'Коли RAG допомагає, коли "галюцинує", і як побудувати гардрейли, які реально працюють.',
          time: 12,
          soon: true,
        },
        {
          icon: '📞',
          tag: 'Голосові агенти',
          title: 'AI голосовий агент для нерухомості: повний гайд',
          desc: 'Від call‑флоу та кваліфікації до синхронізації з CRM і бронювання — реальна архітектура.',
          time: 15,
          soon: true,
        },
        {
          icon: '🔌',
          tag: 'Інтеграції',
          title: 'Автоматизація CRM без "розʼїзду" даних: чеклист',
          desc: 'Дедуплікація, валідація, SLA‑трекінг, error handling — для команд, які масштабуються.',
          time: 7,
          soon: true,
        },
        {
          icon: '🎯',
          tag: 'Лідогенерація',
          title: 'AI‑скоринг лідів: як відділити сигнал від шуму',
          desc: 'Моделі скорингу, сигнали наміру, правила кваліфікації і коли залучати людину.',
          time: 10,
          soon: true,
        },
        {
          icon: '🧠',
          tag: 'Кастомний AI',
          title: 'AI‑агенти, які діють (а не лише "відповідають")',
          desc: 'Агентні патерни, tool‑use, гардрейли та як оцінювати надійність агента.',
          time: 14,
          soon: true,
        },
      ];

  const categories = isEn
    ? [
        { label: 'All', active: true },
        { label: 'Automation' },
        { label: 'Chatbots' },
        { label: 'Voice Agents' },
        { label: 'Lead Gen' },
        { label: 'Integrations' },
        { label: 'Custom AI' },
      ]
    : [
        { label: 'Все', active: true },
        { label: 'Автоматизація' },
        { label: 'Чатботи' },
        { label: 'Голосові агенти' },
        { label: 'Лідогенерація' },
        { label: 'Інтеграції' },
        { label: 'Кастомний AI' },
      ];

  const servicePages = [
    { href: '/ai-automation-for-business', label: 'AI automation for business' },
    { href: '/ai-chatbots-for-business', label: 'AI chatbots for business' },
    { href: '/ai-voice-agents', label: 'AI voice agents' },
    { href: '/custom-ai-agents', label: 'Custom AI agents' },
  ];

  const ctaTitle = isEn
    ? 'Want a custom AI roadmap for your business?'
    : 'Потрібна кастомна AI‑roadmap для вашого бізнесу?';
  const ctaSubtitle = isEn
    ? 'Book a free consultation — we\u2019ll map your processes, find quick wins, and build a plan.'
    : 'Замовте безкоштовну консультацію — ми розберемо ваші процеси, знайдемо quick wins і побудуємо план.';
  const ctaBook = isEn ? 'Book a free AI consultation' : 'Замовити безкоштовну AI‑консультацію';
  const ctaAudit = isEn ? 'Get AI automation audit' : 'Отримати аудит AI‑автоматизації';

  const subscribeTitle = isEn ? 'Stay updated' : 'Будьте в курсі';
  const subscribeDesc = isEn
    ? 'New playbooks, case breakdowns, and implementation guides — directly to your inbox. No spam, only signal.'
    : 'Нові плейбуки, розбори кейсів і гайди з впровадження — прямо на пошту. Без спаму, лише сигнал.';
  const subscribePlaceholder = isEn ? 'your@email.com' : 'ваш@email.com';
  const subscribeButton = isEn ? 'Subscribe' : 'Підписатись';

  const note = isEn
    ? 'Articles are published regularly. Have a specific question? Tell us what you\u2019re building — we\u2019ll cover it.'
    : 'Матеріали публікуються регулярно. Є конкретне питання? Напишіть, що будуєте — ми пріоритезуємо його.';

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description: subtitle,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEn ? 'Home' : 'Головна',
        item: new URL(withLang(lang, '/'), siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 55%)',
              filter: 'blur(100px)',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 55%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-gray-300">{heroTag}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-6 leading-[0.95]">
            <span className="text-white">{title}</span>
            <br />
            <span
              className="inline-block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {heroGradient}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <span
                key={cat.label}
                className={`text-xs md:text-sm px-4 py-2 rounded-full border transition-colors cursor-default ${
                  cat.active
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 text-gray-300 border-white/10'
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Articles Grid ─── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, idx) => (
              <article
                key={idx}
                className="group relative rounded-3xl border border-white/10 overflow-hidden
                  transition-all duration-300 hover:border-white/20 hover:-translate-y-1
                  hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${0.15 + idx * 0.05}) 50%, transparent 100%)`,
                  }}
                />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl
                        transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    >
                      {article.icon}
                    </div>
                    {article.soon && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
                        {comingSoon}
                      </span>
                    )}
                  </div>

                  {/* Tag + read time */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      {article.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs text-gray-500">
                      {article.time} {readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">{article.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Subscribe + Service Pages ─── */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Subscribe card */}
          <div
            className="rounded-3xl border border-white/10 p-8 md:p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            {/* Subtle glow */}
            <div
              className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl mb-6"
                style={{ boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
              >
                ✉️
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{subscribeTitle}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{subscribeDesc}</p>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={subscribePlaceholder}
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white
                    placeholder:text-gray-500 text-sm focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="button"
                  className="px-6 py-3.5 bg-white text-black rounded-full font-bold text-sm
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25 shrink-0"
                >
                  {subscribeButton}
                </button>
              </div>
            </div>
          </div>

          {/* Service pages + note */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
                {isEn ? 'Explore by topic' : 'Дослідити за темою'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicePages.map((sp) => (
                  <Link
                    key={sp.href}
                    href={withLang(lang, sp.href)}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4
                      transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg
                      transition-transform duration-200 group-hover:scale-110">
                      {ICONS[servicePages.indexOf(sp)] || '→'}
                    </span>
                    <span className="text-sm font-semibold text-white">{sp.label}</span>
                    <span className="ml-auto text-gray-500 text-sm transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">{note}</p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border border-white/10 p-8 md:p-12 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            }}
          >
            {/* Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {ctaTitle}
              </h2>
              <p className="text-lg text-gray-400 mb-8">{ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
                >
                  {ctaBook}
                </Link>
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                    border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                >
                  {ctaAudit}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
