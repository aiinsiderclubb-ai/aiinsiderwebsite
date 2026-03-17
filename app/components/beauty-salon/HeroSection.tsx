import Link from 'next/link';
import type { HeroConfig } from '@/app/lib/verticals/types';
import { Sparkles } from 'lucide-react';

export default function HeroSection({ content }: { content: HeroConfig }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden" data-source-section="hero">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 mb-6">
          <Sparkles className="w-4 h-4 text-white/70" />
          <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            {content.badge}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight max-w-5xl">
          <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            {content.title}
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
          {content.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={content.primaryCta.href}
            data-cta="hero-audit"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]"
          >
            {content.primaryCta.label}
          </a>
          <Link
            href={content.secondaryCta.href}
            data-cta="hero-cases"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            {content.secondaryCta.label}
          </Link>
        </div>

        {content.stats?.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {content.stats.map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center text-sm font-semibold text-white/90 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                {stat}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
