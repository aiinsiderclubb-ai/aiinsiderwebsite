import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import BookCall from '@/app/components/BookCall';
import { buildHreflang, isSupportedLang, withLang } from '@/app/lib/i18n';

type Params = { lang: string };

const CONTACT_METADATA = {
  en: {
    title: 'Contact | AI Insider',
    description: 'Contact AI Insider — AI studio from Switzerland. Book a consultation or send us a message.',
    locale: 'en_US',
  },
  uk: {
    title: 'Контакт | AI Insider',
    description: "Зв'яжіться з AI Insider — AI-студія з Швейцарії. Замовте консультацію або напишіть нам.",
    locale: 'uk_UA',
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    return { robots: { index: false, follow: false } };
  }

  const path = '/contact';
  const metadata = CONTACT_METADATA[lang];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: withLang(lang, path),
      languages: buildHreflang(path),
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: withLang(lang, path),
      type: 'website',
      locale: metadata.locale,
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: ['/twitter-image'],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { lang } = await params;

  if (!isSupportedLang(lang)) {
    notFound();
  }

  const isEn = lang === 'en';

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-28">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(168,85,247,0.14) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 80% 35%, rgba(59,130,246,0.12) 0%, transparent 55%)',
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            {isEn ? 'Contact AI Insider' : "Зв'яжіться з AI Insider"}
          </div>

          <h1 className="max-w-3xl text-4xl font-bold font-heading leading-tight md:text-6xl">
            {isEn ? 'Get in Touch' : "Зв'яжіться з нами"}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            {isEn
              ? 'Tell us about your brand, campaign, or AI content goals. Book a consultation or message us directly and we will get back to you quickly.'
              : "Розкажіть нам про ваш бренд, кампанію або цілі AI-контенту. Замовте консультацію або напишіть нам напряму, і ми швидко зв'яжемося з вами."}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <a
              href="mailto:hello@aiinsider.com"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">
                {isEn ? 'Email' : 'Email'}
              </div>
              <div className="mt-3 text-2xl font-semibold text-white">hello@aiinsider.com</div>
              <p className="mt-2 text-sm text-gray-400">
                {isEn ? 'For partnerships, consulting, and project inquiries.' : 'Для партнерств, консультацій та запитів щодо проєктів.'}
              </p>
            </a>

            <a
              href="https://t.me/aiinsider"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-white/50">Telegram</div>
              <div className="mt-3 text-2xl font-semibold text-white">@aiinsider</div>
              <p className="mt-2 text-sm text-gray-400">
                {isEn ? 'Message us directly for a faster first response.' : "Напишіть нам напряму, щоб отримати швидшу першу відповідь."}
              </p>
            </a>
          </div>
        </div>
      </section>

      <BookCall />
      <Footer />
    </main>
  );
}
