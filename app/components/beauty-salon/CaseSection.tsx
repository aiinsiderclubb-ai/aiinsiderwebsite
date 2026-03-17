import Link from 'next/link';
import type { CasesConfig } from '@/app/lib/verticals/types';

export default function CaseSection({ content }: { content: CasesConfig }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            {content.labels.metrics || 'Case studies'}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="grid lg:grid-cols-2 gap-6">
          {content.items.map((item) => (
            <article key={item.title} className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 transition-all duration-300 hover:border-white/20 hover:-translate-y-0.5">
              <h3 className="text-lg font-bold text-white">
                {item.href ? (<Link href={item.href} className="hover:text-white/90 transition-colors">{item.title}</Link>) : item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.problem}</p>
              <h4 className="mt-5 text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">{content.labels.whatWeDid}</h4>
              <ul className="mt-2 space-y-1.5">
                {item.implementation.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-gray-300">
                    <div className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <h4 className="mt-5 text-xs font-semibold text-white/60 uppercase tracking-[0.15em]">{content.labels.metrics}</h4>
              <ul className="mt-2 space-y-1.5">
                {item.metrics.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-emerald-300">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">{content.labels.timeline} {item.timeline}</span>
                {item.href ? (
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                    {item.linkLabel ?? 'Відкрити кейс'} <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
