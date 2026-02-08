import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { isSupportedLang, withLang } from '@/app/lib/i18n';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';

type Params = { lang: string };

export default async function BlogPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const siteUrl = getSiteUrl();
  const path = '/blog';
  const canonicalUrl = new URL(withLang(lang, path), siteUrl).toString();

  const title = lang === 'en' ? 'Blog' : 'Блог';
  const subtitle =
    lang === 'en'
      ? 'B2B playbooks on AI automation, chatbots, voice agents, and integrations — written for teams that care about measurable outcomes.'
      : 'B2B‑плейбуки про AI‑автоматизацію, чатботи, голосові агенти та інтеграції — для команд, яким важливі вимірювані результати.';

  const sections =
    lang === 'en'
      ? {
          whatYouGet: 'What you’ll find here',
          topics: 'Topics',
          startHere: 'Start here',
          ctaTitle: 'Want a custom AI roadmap for your business?',
          ctaSubtitle: 'Book a free consultation or request an AI automation audit.',
          cards: [
            {
              title: 'AI automation playbooks',
              desc: 'Practical workflows for sales, support, and operations — with clear steps and metrics.',
            },
            {
              title: 'Chatbots for B2B',
              desc: 'How to capture and qualify leads, reduce support load, and keep answers grounded.',
            },
            {
              title: 'Voice agents',
              desc: 'Call flows, routing, scheduling, and CRM sync — built for reliability and conversion.',
            },
            {
              title: 'Integrations & CRM',
              desc: 'How to connect tools, prevent data drift, and keep automations stable at scale.',
            },
          ],
          links: [
            { href: '/ai-automation-for-business', label: 'AI automation for business' },
            { href: '/ai-chatbots-for-business', label: 'AI chatbots for business' },
            { href: '/ai-voice-agents', label: 'AI voice agents' },
            { href: '/custom-ai-agents', label: 'Custom AI agents' },
          ],
          note:
            'New articles are published regularly. If you want a topic covered, tell us what you’re building — we’ll prioritize it.',
          book: 'Book a free AI consultation',
          audit: 'Get AI automation audit',
        }
      : {
          whatYouGet: 'Що ви знайдете тут',
          topics: 'Теми',
          startHere: 'Почати з',
          ctaTitle: 'Потрібна кастомна AI‑roadmap для вашого бізнесу?',
          ctaSubtitle: 'Замовте безкоштовну консультацію або аудит AI‑автоматизації.',
          cards: [
            {
              title: 'Плейбуки AI‑автоматизації',
              desc: 'Практичні процеси для продажів, підтримки та операцій — з кроками й метриками.',
            },
            {
              title: 'Чатботи для B2B',
              desc: 'Як збирати й кваліфікувати ліди, зменшувати навантаження та “приземляти” відповіді на базу знань.',
            },
            {
              title: 'Голосові агенти',
              desc: 'Call‑флоу, маршрутизація, запис у календар і синхронізація з CRM — з фокусом на надійність.',
            },
            {
              title: 'Інтеграції та CRM',
              desc: 'Як зʼєднати інструменти, уникати “розʼїзду” даних і тримати автоматизації стабільними при масштабі.',
            },
          ],
          links: [
            { href: '/ai-automation-for-business', label: 'AI automation for business' },
            { href: '/ai-chatbots-for-business', label: 'AI chatbots for business' },
            { href: '/ai-voice-agents', label: 'AI voice agents' },
            { href: '/custom-ai-agents', label: 'Custom AI agents' },
          ],
          note:
            'Ми регулярно публікуємо матеріали. Якщо хочете тему — напишіть, що будуєте, і ми пріоритезуємо її.',
          book: 'Замовити безкоштовну AI‑консультацію',
          audit: 'Отримати аудит AI‑автоматизації',
        };

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
        name: lang === 'en' ? 'Home' : 'Головна',
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
            <span className="text-sm text-gray-300">{title}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
            {title}{' '}
            <span className="gradient-text">{lang === 'en' ? 'Insights' : 'Інсайти'}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto">{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-7">{sections.whatYouGet}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sections.cards.map((c) => (
              <div key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{sections.topics}</h2>
              <div className="flex flex-wrap gap-2">
                {sections.links.map((l) => (
                  <Link
                    key={l.href}
                    href={withLang(lang, l.href)}
                    className="text-xs md:text-sm px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/10
                      transition-colors hover:border-white/25 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mt-5">{sections.note}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">{sections.startHere}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{sections.ctaTitle}</h3>
              <p className="text-gray-400 mb-6">{sections.ctaSubtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black rounded-full font-bold
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/25"
                >
                  {sections.book}
                </Link>
                <Link
                  href={`${withLang(lang, '/')}#bookcall`}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-white/5 text-white rounded-full font-bold
                    border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
                >
                  {sections.audit}
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

