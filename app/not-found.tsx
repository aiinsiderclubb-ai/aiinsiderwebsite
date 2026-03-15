import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: '404 — Page Not Found | AI Insider',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--theme-bg)] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-24 pt-32">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 20% 30%, rgba(168, 85, 247, 0.14) 0%, transparent 55%),
              radial-gradient(ellipse 60% 45% at 80% 40%, rgba(59, 130, 246, 0.12) 0%, transparent 55%),
              radial-gradient(ellipse 50% 35% at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 55%)
            `,
          }}
        />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            AI Insider
          </div>

          <h1
            className="font-heading text-7xl font-bold leading-none md:text-9xl"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #8b5cf6 35%, #3b82f6 70%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255,255,255,0.08)',
            }}
          >
            404
          </h1>

          <h2 className="mt-6 max-w-3xl font-heading text-3xl font-bold leading-tight md:text-5xl">
            Looks like this page decided to automate itself out of existence.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            The link may be outdated, the URL may be wrong, or this page has already moved into a better workflow.
            Try heading back to the homepage or explore our services instead.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/uk"
              className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-200 hover:scale-105"
              style={{ boxShadow: 'var(--theme-shadow-glow)' }}
            >
              Back to Home
            </Link>

            <Link
              href="/uk/services"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              View our services
            </Link>
          </div>

          <Link
            href="/uk#bookcall"
            className="mt-5 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white"
          >
            Book a call
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
