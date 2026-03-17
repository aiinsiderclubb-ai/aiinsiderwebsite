import Link from 'next/link';
import type { AutomationConfig } from '@/app/lib/verticals/types';

export default function AutomationSection({ content }: { content: AutomationConfig }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden" data-source-section="automation-solutions">
      <div className="absolute inset-0">
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            {content.title.split(',')[0] || content.title}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="grid md:grid-cols-2 gap-5">
          {content.cards.map((item) => (
            <article key={item.title} className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.text}</p>
              {item.href ? (
                <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                  {item.ctaLabel ?? 'Детальніше'} <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {content.links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
