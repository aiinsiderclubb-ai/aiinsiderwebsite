import Link from 'next/link';
import type { HeroConfig } from '@/app/lib/verticals/types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  content: HeroConfig;
  accentGradient?: string;
  glowRgb?: string;
  ctaGradient?: string;
}

export default function HeroSection({
  content,
  accentGradient = 'from-white to-gray-400',
  glowRgb = '255, 255, 255',
  ctaGradient,
}: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden" data-source-section="hero">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.18) 0%, transparent 65%)`, filter: 'blur(80px)' }}
        />
        <div
          className="absolute -top-32 right-[-100px] w-[500px] h-[500px]"
          style={{ background: `radial-gradient(circle, rgba(${glowRgb}, 0.12) 0%, transparent 60%)`, filter: 'blur(100px)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border mb-8"
          style={{ borderColor: `rgba(${glowRgb}, 0.35)`, background: `rgba(${glowRgb}, 0.08)` }}
        >
          <Sparkles className="w-4 h-4" style={{ color: `rgba(${glowRgb}, 0.9)` }} />
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">{content.badge}</span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading leading-[1.05] max-w-5xl mb-6">
          <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
            {content.title}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-10">
          {content.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={content.primaryCta.href}
            data-cta="hero-audit"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-bold transition-all duration-300 hover:scale-[1.03]"
            style={
              ctaGradient
                ? { background: ctaGradient, color: 'white', boxShadow: `0 16px 50px rgba(${glowRgb}, 0.4)` }
                : { background: 'white', color: 'black', boxShadow: `0 12px_40px rgba(${glowRgb}, 0.25)` }
            }
          >
            {content.primaryCta.label}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <Link
            href={content.secondaryCta.href}
            data-cta="hero-cases"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/35"
          >
            {content.secondaryCta.label}
          </Link>
        </div>

        {/* Stats */}
        {content.stats?.length ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {content.stats.map((stat, idx) => (
              <div
                key={stat}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${glowRgb}, 0.7), transparent)` }}
                />
                <span className="text-sm font-bold text-white/90">{stat}</span>
                <div className="absolute -bottom-2 -right-2 font-black text-3xl leading-none select-none" style={{ color: `rgba(${glowRgb}, 0.05)` }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
