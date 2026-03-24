import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageCTA from '@/app/components/PageCTA';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { withLang, buildHreflang, isSupportedLang } from '@/app/lib/i18n';
import type { Language } from '@/app/lib/translations';
import { notFound } from 'next/navigation';

/* ── Metadata ─────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLang(lang)) return {};

  const siteUrl = getSiteUrl();
  const hreflang = buildHreflang('/content-factory-for-coaches');
  const canonicalPath = withLang(lang as Language, '/content-factory-for-coaches');
  const isEn = lang === 'en';

  const title = isEn
    ? 'Content Factory for Coaches & Psychologists | AI Insider'
    : 'Content Factory для Коучів і Психологів | AI Insider';

  const description = isEn
    ? 'Automated content system for coaches and psychologists. Viral topic research in your niche, AI posts and videos, Telegram approval, auto-publishing to all platforms.'
    : 'Автоматизована система контенту для психологів та коучів. Вірусні теми у вашій ніші, AI-пости та відео, Telegram-апрув, автопостинг. 500+ постів без вашої участі.';

  return {
    title,
    description,
    keywords: isEn
      ? 'content factory for coaches, AI content for psychologists, automated content coaching, social media automation psychology'
      : 'content factory для коучів, AI контент для психологів, автоматизація контенту коуч, SMM автоматизація психолог',
    alternates: {
      canonical: canonicalPath,
      languages: hreflang,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: new URL(canonicalPath, siteUrl).toString(),
      locale: isEn ? 'en_US' : 'uk_UA',
      images: ['/opengraph-image'],
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

/* ── Static FAQ data ──────────────────────────────────────── */

const faqUk = [
  {
    q: 'Чи буде контент відповідати етиці психологічної практики?',
    a: 'Під час налаштування ми прописуємо чіткі обмеження для AI: без діагнозів, без маніпулятивних тригерів, з посиланнями на важливість роботи з фахівцем. Ви також переглядаєте кожен пост перед публікацією.',
  },
  {
    q: 'Система підходить якщо я веду кілька соцмереж?',
    a: 'Так. Один шматок контенту автоматично адаптується під Instagram (пост + Stories), TikTok (відео), Telegram (канал) та YouTube Shorts — різні формати, розміри та стилі тексту.',
  },
  {
    q: 'Чи можу я налаштувати теми які система НЕ повинна використовувати?',
    a: 'Так. На етапі онбордингу ми прописуємо стоп-теми, стоп-слова та обмеження для вашої практики. Система суворо дотримується цих правил.',
  },
  {
    q: 'Скільки часу займає налаштування під мою нішу?',
    a: '2–3 тижні. Ми налаштовуємо моніторинг конкурентів у вашій ніші, додаємо ключові теми в Google Trends, прописуємо tone of voice та тестуємо перший пакет контенту.',
  },
];

const faqEn = [
  {
    q: 'Will the content comply with the ethics of psychological practice?',
    a: 'During setup we configure clear AI restrictions: no diagnoses, no manipulative triggers, with references to the importance of working with a specialist. You also review every post before publishing.',
  },
  {
    q: 'Is the system suitable if I manage multiple social networks?',
    a: 'Yes. One piece of content is automatically adapted for Instagram (post + Stories), TikTok (video), Telegram (channel) and YouTube Shorts — different formats, sizes and text styles.',
  },
  {
    q: "Can I configure topics the system should NOT use?",
    a: 'Yes. During onboarding we define stop-topics, stop-words and restrictions for your practice. The system strictly follows these rules.',
  },
  {
    q: 'How long does setup take for my niche?',
    a: '2–3 weeks. We configure competitor monitoring in your niche, add key topics to Google Trends, define your tone of voice and test the first batch of content.',
  },
];

/* ── Page ─────────────────────────────────────────────────── */

export default async function ContentFactoryForCoachesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLang(lang)) notFound();

  const typedLang = lang as Language;
  const isEn = typedLang === 'en';
  const basePath = `/${typedLang}`;
  const siteUrl = getSiteUrl();
  const canonicalPath = withLang(typedLang, '/content-factory-for-coaches');
  const pageUrl = new URL(canonicalPath, siteUrl).toString();

  const t = <T,>(uk: T, en: T): T => (isEn ? en : uk);
  const faqData = isEn ? faqEn : faqUk;

  /* ── JSON-LD ── */
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('Content Factory для коучів та психологів', 'Content Factory for Coaches and Psychologists'),
    description: t(
      'Автоматизована система контенту для психологів та коучів: вірусні теми, AI-пости, відео та автопостинг.',
      'Automated content system for coaches and psychologists: viral topics, AI posts, videos and auto-publishing.',
    ),
    provider: { '@type': 'Organization', name: SITE_NAME, url: siteUrl.toString() },
    areaServed: 'Worldwide',
    url: pageUrl,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('Головна', 'Home'), item: new URL(withLang(typedLang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: 'Content Factory', item: new URL(withLang(typedLang, '/content-factory'), siteUrl).toString() },
      { '@type': 'ListItem', position: 3, name: t('Для коучів та психологів', 'For Coaches & Psychologists'), item: pageUrl },
    ],
  };

  /* ── Localised content ── */
  const nicheFeatures = [
    {
      icon: '🔍',
      title: t('Моніторинг трендів у психології', 'Trend Monitoring in Psychology'),
      body: t(
        'Система відстежує Google Trends за темами: тривожність, вигорання, самооцінка, стосунки, депресія, онлайн-навчання. Ви завжди знаєте що хвилює вашу аудиторію просто зараз.',
        'The system tracks Google Trends for topics: anxiety, burnout, self-esteem, relationships, depression, online education. You always know what concerns your audience right now.',
      ),
    },
    {
      icon: '📊',
      title: t('Аналіз конкурентів у вашій ніші', 'Competitor Analysis in Your Niche'),
      body: t(
        'Парсинг Instagram, TikTok, YouTube та Telegram-каналів конкурентів-психологів та коучів. Система бачить які формати та теми приносять максимальне залучення.',
        'Parsing Instagram, TikTok, YouTube and Telegram channels of competing psychologists and coaches. The system identifies which formats and topics drive maximum engagement.',
      ),
    },
    {
      icon: '💙',
      title: t('Контент, що будує довіру', 'Content That Builds Trust'),
      body: t(
        'AI генерує контент у вашому tone of voice: корисні пости, сторітелінг, кейси, поради — формати які продають через експертність, а не агресивний маркетинг.',
        'AI generates content in your tone of voice: useful posts, storytelling, case studies, tips — formats that sell through expertise, not aggressive marketing.',
      ),
    },
    {
      icon: '⚡',
      title: t('Від ідеї до поста за 30 хвилин вашого часу', 'From Idea to Post in 30 Minutes of Your Time'),
      body: t(
        'Ви витрачаєте 30 хвилин на тиждень щоб схвалити контент у Telegram. Решту робить система — ідеї, тексти, зображення, відео, публікація.',
        'You spend 30 minutes a week approving content in Telegram. The system handles everything else — ideas, copy, images, videos, publishing.',
      ),
    },
  ];

  const stages = [
    {
      n: '01',
      icon: '🔍',
      title: t('Збір трендів у вашій ніші', 'Collecting Trends in Your Niche'),
      desc: t(
        'Система моніторить Google Trends, Instagram, TikTok та Telegram за темами психології, коучингу та онлайн-навчання — 24/7 без вашої участі.',
        'The system monitors Google Trends, Instagram, TikTok and Telegram for psychology, coaching and online education topics — 24/7 without your involvement.',
      ),
    },
    {
      n: '02',
      icon: '🧠',
      title: t('AI відбирає найкращі ідеї', 'AI Selects the Best Ideas'),
      desc: t(
        'Кожна ідея оцінюється за вірусністю, актуальністю та відповідністю вашій ніші. Тільки топ-ідеї потрапляють у контент-план.',
        'Each idea is scored by virality, relevance and niche fit. Only top ideas make it into the content plan.',
      ),
    },
    {
      n: '03',
      icon: '✨',
      title: t('AI створює контент у вашому стилі', 'AI Creates Content in Your Style'),
      desc: t(
        'Тексти, зображення, відео-сценарій — всі у вашому tone of voice, адаптовані під Instagram, TikTok, YouTube Shorts та Telegram.',
        'Copy, images, video scripts — all in your tone of voice, adapted for Instagram, TikTok, YouTube Shorts and Telegram.',
      ),
    },
    {
      n: '04',
      icon: '🚀',
      title: t('Ви схвалюєте — система публікує', 'You Approve — System Publishes'),
      desc: t(
        'Готовий контент надходить у Telegram-бот. Один клік — і пост виходить в оптимальний час на всіх підключених платформах.',
        'Ready content arrives in the Telegram bot. One tap — and the post goes live at the optimal time on all connected platforms.',
      ),
    },
  ];

  const metrics = [
    {
      value: '10x',
      label: t('більше контенту', 'more content'),
      sublabel: t('без збільшення команди', 'without growing your team'),
      icon: '📈',
    },
    {
      value: '90%',
      label: t('економії часу', 'time saved'),
      sublabel: t('на виробництво контенту', 'on content production'),
      icon: '⏱',
    },
    {
      value: '24/7',
      label: t('присутність', 'presence'),
      sublabel: t('у соцмережах вашої аудиторії', "on your audience's social media"),
      icon: '🌐',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 55%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb nav */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Link href={`${basePath}/content-factory`} className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white transition-colors">
              Content Factory
            </Link>
            <span className="text-white/20 text-xs">›</span>
            <span className="text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              {t('Коучі та психологи', 'Coaches & Psychologists')}
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30 bg-emerald-500/10">
            <span className="text-lg">🧘</span>
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              {t('Для психологів та коучів', 'For Psychologists & Coaches')}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] mb-8 max-w-5xl">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {t('Content Factory', 'Content Factory')}
            </span>
            <br />
            <span className="text-white">
              {t('для коучів та психологів', 'for Coaches and Psychologists')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">
            {t(
              'Система знаходить вірусні теми у вашій ніші, пише пости, створює відео та публікує у ваші соцмережі. Без SMM-менеджера. Без вигорання від контенту.',
              'The system finds viral topics in your niche, writes posts, creates videos and publishes to your social media. No SMM manager. No content burnout.',
            )}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href={`${basePath}#bookcall`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/30"
            >
              {t('Замовити систему →', 'Get Your System →')}
            </Link>
            <Link
              href={`${basePath}/content-factory`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10"
            >
              {t('Про Content Factory ↗', 'About Content Factory ↗')}
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: '500+', label: t('постів на місяць', 'posts per month') },
              { value: '🧠', label: t('Психологія, тривожність, стосунки, вигорання, самооцінка', 'Psychology, anxiety, relationships, burnout, self-esteem') },
              { value: '24/7', label: t('моніторинг конкурентів у вашій ніші', 'competitor monitoring in your niche') },
              { value: '2 тиж', label: t('до запуску', 'to launch') },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
                <div className={`font-bold text-white mb-1 ${i === 1 ? 'text-base leading-snug' : 'text-3xl'}`}>{s.value}</div>
                <div className="text-xs text-gray-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Niche-specific features ────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30 bg-emerald-500/10">
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                {t('Спеціально для вашої ніші', 'Built for Your Niche')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Що система робить у вашій ніші', 'What the System Does in Your Niche')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {nicheFeatures.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-4xl mb-5">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works (4 steps) ─────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Як це працює — 4 кроки', 'How It Works — 4 Steps')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {stages.map((stage) => (
              <div
                key={stage.n}
                className="group relative rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 overflow-hidden transition-all duration-400 hover:border-emerald-500/25 hover:bg-emerald-500/[0.04] hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
                      {stage.icon}
                    </div>
                    <span className="text-3xl font-bold text-white/[0.06] font-heading leading-none">{stage.n}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{stage.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof / Metrics ─────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px)',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {t('Результати', 'Results')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Результати для психологів та коучів', 'Results for Psychologists & Coaches')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="group relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 text-center overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(16,185,129,0.08)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-4xl mb-4">{m.icon}</div>
                <div className="text-5xl font-bold text-white mb-2">{m.value}</div>
                <div className="text-base font-semibold text-white/80 mb-1">{m.label}</div>
                <div className="text-sm text-gray-500">{m.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Часті запитання', 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="space-y-3">
            {faqData.map((qa, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/15 open:border-white/20 open:bg-white/[0.06]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-6">
                  <span className="text-base font-bold text-white leading-snug">{qa.q}</span>
                  <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-open:rotate-45 transition-all duration-300 group-open:bg-white/10 text-sm text-gray-400">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[15px] text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {qa.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30 bg-emerald-500/10">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <div className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              {t('Готові стартувати', 'Ready to launch')}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] mb-6">
            {t('Запустимо Content Factory для вашої практики', "Let's Launch Content Factory for Your Practice")}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t(
              'Розповімо як система буде виглядати у вашій ніші та скільки часу займе налаштування. Безкоштовна консультація.',
              'We will show you how the system looks in your niche and how long setup takes. Free consultation.',
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${basePath}#bookcall`}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]"
            >
              {t('Замовити консультацію', 'Book a Consultation')}
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">→</span>
            </Link>
            <Link
              href={`${basePath}/content-factory`}
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/5 text-white border border-white/20 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10"
            >
              {t('Детальніше про систему', 'Learn More About the System')}
            </Link>
          </div>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </main>
  );
}
