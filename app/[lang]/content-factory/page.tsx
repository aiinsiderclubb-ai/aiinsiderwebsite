import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageCTA from '@/app/components/PageCTA';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import { withLang, buildHreflang, isSupportedLang } from '@/app/lib/i18n';
import type { Language } from '@/app/lib/translations';
import { notFound } from 'next/navigation';

const BookCall = dynamic(() => import('@/app/components/BookCall'), { ssr: true });

/* ── Metadata ─────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLang(lang)) return {};

  const siteUrl = getSiteUrl();
  const hreflang = buildHreflang('/content-factory');
  const canonicalPath = withLang(lang as Language, '/content-factory');

  const isEn = lang === 'en';

  const title = isEn
    ? 'Content Factory | AI Content System 24/7 — AI Insider'
    : 'Content Factory | AI система контенту 24/7 — AI Insider';

  const description = isEn
    ? 'Fully automated content production system: viral idea research, AI post and video creation, Telegram approval, auto-publishing to all platforms. 500+ pieces of content per month on autopilot.'
    : 'Повністю автоматизована система виробництва контенту: пошук ідей, генерація постів та відео, Telegram-апрув, автопостинг у всі соцмережі. 500+ постів на місяць без вашої участі.';

  const keywords = isEn
    ? ['content factory', 'AI content automation', 'automated content system', 'AI content creation', 'social media autopilot']
    : ['content factory', 'автоматизація контенту', 'AI контент система', 'автопостинг', 'AI SMM автоматизація', 'генерація контенту AI'];

  return {
    title,
    description,
    keywords: keywords.join(', '),
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

/* ── JSON-LD helpers ──────────────────────────────────────── */

function buildSchemas(lang: Language, pageUrl: string, siteUrl: URL) {
  const isEn = lang === 'en';

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Content Factory',
    description: isEn
      ? 'Fully automated AI content production system: viral idea research, AI post and video creation, Telegram approval and auto-publishing to all social media platforms.'
      : 'Повністю автоматизована AI система виробництва контенту: пошук вірусних ідей, генерація постів та відео, Telegram-апрув та автопостинг у всі соцмережі.',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString(),
    },
    areaServed: 'Worldwide',
    url: pageUrl,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isEn ? faqEn : faqUk).map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Головна', item: new URL(withLang(lang, '/'), siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: 'Content Factory', item: pageUrl },
    ],
  };

  return { serviceSchema, faqSchema, breadcrumbSchema };
}

/* ── Static data ──────────────────────────────────────────── */

const faqUk = [
  {
    q: 'Чи потрібен технічний спеціаліст для управління системою?',
    a: 'Ні. Після налаштування система працює повністю автономно. Ваша єдина дія — натиснути «Схвалити» або «Відхилити» в Telegram. Ми надаємо детальну документацію та підтримку.',
  },
  {
    q: 'Скільки часу займає налаштування?',
    a: 'Від 2 до 4 тижнів залежно від кількості платформ та складності ніші. Ми налаштовуємо все самостійно — вам потрібно лише надати доступи до соцмереж та описати вашу аудиторію.',
  },
  {
    q: 'Контент буде унікальним чи шаблонним?',
    a: 'Система аналізує актуальні тренди та контент конкурентів, тому кожен пост генерується під поточний момент. Ми також налаштовуємо tone of voice під ваш бренд під час онбордингу.',
  },
  {
    q: 'З якими платформами інтегрується система?',
    a: 'Instagram, TikTok, YouTube (Shorts), Telegram, Facebook. Додатково можна підключити Pinterest, LinkedIn, Reddit та будь-які Telegram-канали.',
  },
  {
    q: 'Що якщо мені не сподобається згенерований контент?',
    a: 'Ви завжди маєте фінальне слово через Telegram-апрув. Жоден пост не публікується без вашого схвалення. Відхилений контент іде на доопрацювання або в архів.',
  },
];

const faqEn = [
  {
    q: 'Do I need a technical specialist to manage the system?',
    a: 'No. After setup, the system runs fully autonomously. Your only action is to tap "Approve" or "Reject" in Telegram. We provide detailed documentation and ongoing support.',
  },
  {
    q: 'How long does setup take?',
    a: '2 to 4 weeks depending on the number of platforms and niche complexity. We handle the entire setup — you only need to provide social media access and describe your audience.',
  },
  {
    q: 'Will the content be unique or templated?',
    a: 'The system analyzes current trends and competitor content, so every post is generated for the current moment. We also configure your brand tone of voice during onboarding.',
  },
  {
    q: 'Which platforms does the system integrate with?',
    a: 'Instagram, TikTok, YouTube (Shorts), Telegram, Facebook. Pinterest, LinkedIn, Reddit and any Telegram channels can be added as well.',
  },
  {
    q: "What if I don't like the generated content?",
    a: 'You always have the final say via Telegram approval. No post is published without your approval. Rejected content goes back for revision or to the archive.',
  },
];

/* ── Page component ───────────────────────────────────────── */

export default async function ContentFactoryPage({
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
  const canonicalPath = withLang(typedLang, '/content-factory');
  const pageUrl = new URL(canonicalPath, siteUrl).toString();
  const { serviceSchema, faqSchema, breadcrumbSchema } = buildSchemas(typedLang, pageUrl, siteUrl);

  /* ── Localised content helpers ── */
  const t = <T,>(uk: T, en: T): T => (isEn ? en : uk);

  const stages = [
    {
      n: '01',
      title: t('Збір даних і аналіз ринку', 'Data Collection & Market Analysis'),
      desc: t(
        'Система автоматично парсить сайти та соцмережі конкурентів, моніторить Google Trends за 20+ ключовими темами, відстежує тренди в Instagram, TikTok, YouTube та Telegram-каналах.',
        'The system automatically parses competitor sites and social profiles, monitors Google Trends across 20+ key topics, and tracks trends on Instagram, TikTok, YouTube and Telegram channels.',
      ),
      tags: t(
        ['Парсинг конкурентів', 'Google Trends', 'Моніторинг соцмереж'],
        ['Competitor Parsing', 'Google Trends', 'Social Monitoring'],
      ),
      icon: '🔍',
    },
    {
      n: '02',
      title: t('AI-аналіз і відбір ідей', 'AI Analysis & Idea Selection'),
      desc: t(
        'Штучний інтелект оцінює кожну ідею за вірусним score: актуальність, емоційний тригер, потенціал залучення. Топ-ідеї автоматично потрапляють у контент-план.',
        'AI scores each idea by virality: relevance, emotional trigger and engagement potential. Top ideas are automatically added to the content plan.',
      ),
      tags: t(
        ['Вірусний score', 'AI-відбір', 'Контент-план'],
        ['Viral Score', 'AI Selection', 'Content Plan'],
      ),
      icon: '🧠',
    },
    {
      n: '03',
      title: t('Створення контенту', 'Content Creation'),
      desc: t(
        'AI генерує текст поста, промпт для зображення та повний сценарій відео. Система автоматично збирає готове відео — монтаж, субтитри, музика — без участі людини.',
        'AI generates post copy, image prompts and full video scripts. The system automatically assembles the final video — editing, subtitles, music — without human involvement.',
      ),
      tags: t(
        ['Тексти', 'Зображення', 'Відео', 'Адаптація під платформи'],
        ['Copy', 'Images', 'Video', 'Platform Adaptation'],
      ),
      icon: '✨',
    },
    {
      n: '04',
      title: t('Погодження і публікація', 'Approval & Publishing'),
      desc: t(
        'Готовий контент надходить у Telegram-бот на апрув. Один клік — і система публікує у всі підключені платформи в оптимальний час. Весь процес — 30 секунд.',
        'Ready content arrives in the Telegram bot for approval. One tap — and the system publishes to all connected platforms at the optimal time. The whole process takes 30 seconds.',
      ),
      tags: t(
        ['Telegram-апрув', 'Автопостинг', 'Всі платформи'],
        ['Telegram Approval', 'Autopublishing', 'All Platforms'],
      ),
      icon: '🚀',
    },
  ];

  const features = [
    {
      title: t('n8n автоматизація', 'n8n Automation'),
      desc: t('Повністю налаштовані воркфлоу з парсерами, AI-агентами та інтеграціями', 'Fully configured workflows with parsers, AI agents and integrations'),
      icon: '⚙️',
    },
    {
      title: t('Парсинг конкурентів', 'Competitor Parsing'),
      desc: t('Моніторинг 5–10 конкурентів у вашій ніші в режимі реального часу', 'Real-time monitoring of 5–10 competitors in your niche'),
      icon: '🕵️',
    },
    {
      title: t('Google Trends інтеграція', 'Google Trends Integration'),
      desc: t('Автоматичний моніторинг 20+ ключових запитів вашої ніші', 'Automatic monitoring of 20+ key queries in your niche'),
      icon: '📊',
    },
    {
      title: t('AI-генерація контенту', 'AI Content Generation'),
      desc: t('Тексти, промпти для зображень та повні відео-сценарії', 'Copy, image prompts and complete video scripts'),
      icon: '🤖',
    },
    {
      title: t('Відео-продакшн', 'Video Production'),
      desc: t('Автозбірка відео для TikTok, Instagram Reels, YouTube Shorts', 'Auto-assembled videos for TikTok, Instagram Reels, YouTube Shorts'),
      icon: '🎬',
    },
    {
      title: t('Telegram-бот для апруву', 'Telegram Approval Bot'),
      desc: t('Зручне погодження контенту прямо в месенджері', 'Convenient content approval right in the messenger'),
      icon: '✅',
    },
    {
      title: t('Автопостинг', 'Autopublishing'),
      desc: t('Публікація в Instagram, TikTok, YouTube, Telegram одночасно', 'Simultaneous publishing to Instagram, TikTok, YouTube, Telegram'),
      icon: '📱',
    },
    {
      title: t('Дашборд + Google Таблиці', 'Dashboard + Google Sheets'),
      desc: t('Інтерактивний дашборд з аналітикою в реальному часі', 'Interactive dashboard with real-time analytics'),
      icon: '📈',
    },
  ];

  const personas = [
    {
      icon: '🧘',
      title: t('Коучи та психологи', 'Coaches & Psychologists'),
      desc: t(
        'Система налаштована під вашу нішу: психологія, тривожність, стосунки, самооцінка, онлайн-навчання. Моніторить конкурентів та тренди у вашій темі автоматично.',
        'System tuned to your niche: psychology, anxiety, relationships, self-esteem, online education. Monitors competitors and trends in your topic automatically.',
      ),
    },
    {
      icon: '🛍️',
      title: t('E-commerce бренди', 'E-commerce Brands'),
      desc: t(
        'Безперервний потік контенту про продукти, UGC-стиль без знімальної команди, адаптація під всі платформи.',
        'Continuous product content flow, UGC-style without a film crew, adapted for all platforms.',
      ),
    },
    {
      icon: '🏢',
      title: t('Агентства та бренди', 'Agencies & Brands'),
      desc: t(
        'Масштабуйте виробництво контенту для кількох клієнтів одночасно без росту команди.',
        'Scale content production for multiple clients simultaneously without growing your team.',
      ),
    },
    {
      icon: '⭐',
      title: t('Особисті бренди та блогери', 'Personal Brands & Bloggers'),
      desc: t(
        'Публікуйте щодня без вигорання. Система генерує контент — ви зберігаєте автентичність та час для справжньої роботи.',
        'Post every day without burnout. The system generates content — you keep your authenticity and time for real work.',
      ),
    },
  ];

  const comparisonRows = [
    {
      label: t('Постів на місяць', 'Posts per month'),
      manual: '20–40',
      factory: '500+',
    },
    {
      label: t('Час на контент', 'Time on content'),
      manual: t('15–20 год/тиждень', '15–20 hrs/week'),
      factory: t('30 хв/тиждень', '30 min/week'),
    },
    {
      label: t('Моніторинг конкурентів', 'Competitor monitoring'),
      manual: t('Вручну, нерегулярно', 'Manual, irregular'),
      factory: t('24/7 автоматично', '24/7 automatic'),
    },
    {
      label: t('Вартість команди', 'Team cost'),
      manual: t('$1,000–3,000/міс', '$1,000–3,000/mo'),
      factory: t('Одноразове налаштування', 'One-time setup'),
    },
    {
      label: t('Публікація', 'Publishing'),
      manual: t('Вручну', 'Manual'),
      factory: t('Автоматично', 'Automatic'),
    },
    {
      label: t('Аналітика', 'Analytics'),
      manual: t('Нерегулярно', 'Irregular'),
      factory: t('В реальному часі', 'Real-time'),
    },
  ];

  const dashboardCards = [
    { icon: '📊', label: t('Тренди в реальному часі', 'Real-time Trends') },
    { icon: '🎯', label: t('Контент-план', 'Content Plan') },
    { icon: '📈', label: t('Аналітика конкурентів', 'Competitor Analytics') },
    { icon: '✅', label: t('Черга на апрув', 'Approval Queue') },
    { icon: '🗃', label: t('База ідей з оцінками', 'Idea Database with Scores') },
    { icon: '📱', label: t('Статус публікацій', 'Publication Status') },
  ];

  const faqData = isEn ? faqEn : faqUk;

  const relatedServices = [
    { slug: 'ai-video-production', label: t('AI відео-продакшн', 'AI Video Production'), icon: '🎬' },
    { slug: 'ai-ugc-content', label: t('AI UGC контент', 'AI UGC Content'), icon: '⚡' },
    { slug: 'ai-influencers', label: t('AI інфлюенсери', 'AI Influencers'), icon: '🎭' },
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />

      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-24 px-6 overflow-hidden">
        {/* Background glows */}
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 55%)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
              {t('Автоматизована система', 'Automated System')}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.05] mb-8">
            <span className="text-white">
              {t('Content Factory —', 'Content Factory —')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {t('AI система що створює контент 24/7', 'AI System That Creates Content 24/7')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mb-10">
            {t(
              'Система сама знаходить вірусні ідеї, пише тексти, створює відео та публікує у всі соцмережі. Ви лише натискаєте «Схвалити» в Telegram.',
              "The system finds viral ideas, writes copy, creates videos and publishes to all social media automatically. You just tap 'Approve' in Telegram.",
            )}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href={`${basePath}#bookcall`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/30"
            >
              {t('Замовити систему →', 'Get Your System →')}
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              {t('Як це працює ↓', 'How it works ↓')}
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '500+', label: t('постів на місяць', 'posts per month') },
              { value: '90%', label: t('економії часу', 'time saved') },
              { value: '30 сек', label: t('на погодження', 'to approve') },
              { value: '24/7', label: t('моніторинг трендів', 'trend monitoring') },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-5 py-5 text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Problem ──────────────────────────────── */}
      <section id="problem" className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px)',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5">
              <span className="text-red-400 text-lg">⚠️</span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {t('Проблема', 'The Problem')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1]">
              {t('Чому контент-маркетинг забирає весь ваш час', 'Why Content Marketing Eats All Your Time')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: '⏰',
                title: t('Пошук ідей — це окрема робота', 'Finding ideas is a full-time job'),
                body: t(
                  'Щодня потрібно моніторити конкурентів, тренди, соцмережі. Це 2–3 години щодня ще до написання першого слова.',
                  'Every day you need to monitor competitors, trends and social media. That is 2–3 hours daily before writing the first word.',
                ),
              },
              {
                icon: '✍️',
                title: t('Виробництво контенту — дорого і повільно', 'Content production is expensive and slow'),
                body: t(
                  'SMM-менеджер, копірайтер, відеомонтажер — або дорога команда, або низька якість. Середній час посту — 2–4 години.',
                  'SMM manager, copywriter, video editor — either an expensive team or low quality. Average time per post: 2–4 hours.',
                ),
              },
              {
                icon: '📅',
                title: t('Нерегулярність вбиває охоплення', 'Inconsistency kills your reach'),
                body: t(
                  'Алгоритми соцмереж карають за нерегулярність. Пропустили тиждень — втратили 30–40% охоплення.',
                  'Social media algorithms punish inconsistency. Miss a week — lose 30–40% of your reach.',
                ),
              },
              {
                icon: '📉',
                title: t('Немає аналітики — немає росту', 'No analytics — no growth'),
                body: t(
                  'Без системного моніторингу конкурентів і трендів ви виробляєте контент наосліп, без розуміння що реально працює.',
                  'Without systematic competitor and trend monitoring you produce content blindly, with no idea what actually works.',
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.04)]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />
                <div className="text-4xl mb-5">{card.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: What is Content Factory ─────────────── */}
      <section id="how-it-works" className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-emerald-500/30 bg-emerald-500/10">
              <span className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">
                {t('Що це таке', 'What it is')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] mb-8">
              {t('Що таке Content Factory', 'What is Content Factory')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {t(
                'Content Factory — це повністю автоматизована система виробництва контенту, яка працює 24/7 без участі людини. Система сама знаходить вірусні ідеї, пише тексти, створює пости та відео, а перед публікацією надсилає все на погодження менеджеру в Telegram.',
                'Content Factory is a fully automated content production system that runs 24/7 without human involvement. The system finds viral ideas, writes copy, creates posts and videos, and sends everything for manager approval in Telegram before publishing.',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: How it works — 4 stages ─────────────── */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Як працює система — 4 етапи', 'How the System Works — 4 Stages')}
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute left-12 top-12 bottom-12 w-px bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-transparent" />

            <div className="space-y-6">
              {stages.map((stage, i) => (
                <div
                  key={stage.n}
                  className="group relative flex gap-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-8 overflow-hidden transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] hover:-translate-y-0.5"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 10% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />

                  {/* Step indicator */}
                  <div className="relative shrink-0 hidden md:flex flex-col items-center gap-3 w-20">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-xl">
                      {stage.icon}
                    </div>
                    <span className="text-4xl font-bold text-white/[0.06] font-heading leading-none">{stage.n}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{stage.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-5">{stage.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: What you get ─────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5">
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {t('Комплектація', 'Included')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Що входить у систему', "What's Included in the System")}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition-all duration-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Dashboard preview ────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 60%)', filter: 'blur(100px)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-blue-500/30 bg-blue-500/10">
              <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                {t('Управління', 'Management')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1] mb-8">
              {t('Інтерактивний дашборд', 'Interactive Dashboard')}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t(
                'Вся система керується через єдиний дашборд. Ви бачите тренди в реальному часі, контент-план, аналітику конкурентів, чергу на апрув та статус кожної публікації — все в одному місці, інтегровано з Google Таблицями або вашою CRM.',
                'The entire system is managed through a single dashboard. You see real-time trends, the content plan, competitor analytics, the approval queue and the status of every publication — all in one place, integrated with Google Sheets or your CRM.',
              )}
            </p>
          </div>

          {/* Dashboard mockup */}
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 overflow-hidden">
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dashboardCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 flex items-center gap-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
                >
                  <span className="text-3xl">{card.icon}</span>
                  <span className="font-semibold text-white text-sm leading-snug">{card.label}</span>
                </div>
              ))}
            </div>

            {/* Live indicator */}
            <div className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
              <div className="relative w-2.5 h-2.5">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <div className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                {t('Оновлюється в реальному часі', 'Updates in real time')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Who it's for ─────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Кому підходить Content Factory', 'Who Content Factory Is For')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {personas.map((p) => (
              <div
                key={p.title}
                className="group relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.04)]"
              >
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 8: Comparison table ─────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.08) 40px, rgba(255,255,255,0.08) 41px)',
          }}
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Content Factory vs традиційний підхід', 'Content Factory vs Traditional Approach')}
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/10">
              <div className="px-6 py-4 text-sm font-bold text-white/50 uppercase tracking-wider">{t('Критерій', 'Criterion')}</div>
              <div className="px-6 py-4 text-sm font-bold text-white/50 uppercase tracking-wider border-l border-white/10 text-center">{t('Вручну', 'Manual')}</div>
              <div className="px-6 py-4 text-sm font-bold text-emerald-400 uppercase tracking-wider border-l border-white/10 text-center">Content Factory</div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div key={row.label} className={`grid grid-cols-3 border-b border-white/[0.06] ${i % 2 === 0 ? 'bg-white/[0.015]' : ''}`}>
                <div className="px-6 py-4 text-sm text-gray-300 font-medium">{row.label}</div>
                <div className="px-6 py-4 text-sm text-gray-500 border-l border-white/[0.06] text-center">{row.manual}</div>
                <div className="px-6 py-4 border-l border-white/[0.06] text-center">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px]">✓</span>
                    {row.factory}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 9: FAQ ───────────────────────────────────── */}
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

      {/* ── Section 10: Related Services ────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-[1.1]">
              {t('Послуги всередині системи', 'Services Inside the System')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`${basePath}/services/${s.slug}`}
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] hover:-translate-y-0.5"
              >
                <span className="text-3xl">{s.icon}</span>
                <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{s.label}</span>
                <span className="ml-auto text-gray-500 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`${basePath}/ai-content-creation`}
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              {t('Детальніше про AI Content Studio →', 'Learn more about AI Content Studio →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 11: Booking CTA ─────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden" id="bookcall-cf">
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
            {t('Запустимо вашу Content Factory', "Let's Launch Your Content Factory")}
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed mb-10">
            {t(
              'Замовте безкоштовну консультацію. Розповімо як система буде виглядати у вашій ніші та скільки часу займе налаштування.',
              'Book a free consultation. We will show you how the system looks in your niche and how long setup takes.',
            )}
          </p>

          <Link
            href={`${basePath}#bookcall`}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]"
          >
            {t('Замовити систему', 'Get Your System')}
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">→</span>
          </Link>
        </div>
      </section>

      <PageCTA />
      <Footer />
    </main>
  );
}
