import Link from 'next/link';
import type { AutomationConfig } from '@/app/lib/verticals/types';

interface AutomationSectionProps {
  content: AutomationConfig;
  accentGradient?: string;
  glowRgb?: string;
}

export default function AutomationSection({
  content,
  accentGradient = 'from-emerald-400 to-teal-500',
  glowRgb = '16, 185, 129',
}: AutomationSectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden" data-source-section="automation-solutions">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-0 w-[600px] h-[600px]"
          style={{ background: `radial-gradient(circle, rgba(${glowRgb}, 0.08) 0%, transparent 60%)`, filter: 'blur(100px)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            {content.title.split(',')[0] || content.title}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-5">
          {content.cards.map((item, idx) => (
            <article
              key={item.title}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${glowRgb}, 0.7), transparent)` }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-sm"
                style={{
                  background: `linear-gradient(135deg, rgba(${glowRgb}, 0.9) 0%, rgba(${glowRgb}, 0.5) 100%)`,
                  boxShadow: `0 6px 20px rgba(${glowRgb}, 0.4)`,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.text}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
                >
                  {item.ctaLabel ?? 'Детальніше'} <span className="text-white/50" aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {content.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
