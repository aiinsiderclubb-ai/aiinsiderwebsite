import Link from 'next/link';
import type { HeroConfig } from '@/app/lib/verticals/types';

export default function HeroSection({ content }: { content: HeroConfig }) {
  return (
    <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-6" data-source-section="hero">
      <div className="max-w-6xl mx-auto">
        <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 mb-5">
          {content.badge}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-5xl">
          {content.title}
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-3xl">
          {content.subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={content.primaryCta.href}
            data-cta="hero-audit"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-100 transition-colors"
          >
            {content.primaryCta.label}
          </a>
          <Link
            href={content.secondaryCta.href}
            data-cta="hero-cases"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {content.secondaryCta.label}
          </Link>
        </div>

        {content.stats?.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-semibold text-white/90">
                {stat}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
