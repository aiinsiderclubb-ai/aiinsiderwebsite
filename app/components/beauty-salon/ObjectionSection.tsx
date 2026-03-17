import type { ObjectionsConfig } from '@/app/lib/verticals/types';

interface ObjectionSectionProps {
  content: ObjectionsConfig;
  accentGradient?: string;
  glowRgb?: string;
}

export default function ObjectionSection({
  content,
  accentGradient = 'from-amber-400 to-orange-500',
  glowRgb = '251, 191, 36',
}: ObjectionSectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.08) 0%, transparent 60%)`, filter: 'blur(80px)' }}
        />
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Objections</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-8">{content.title}</h2>
        <div className="space-y-3">
          {content.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 open:border-white/20 open:bg-white/[0.06]"
            >
              <summary className="cursor-pointer px-6 py-5 text-white font-semibold flex items-center justify-between list-none">
                <span>{item.q}</span>
                <span
                  className={`ml-4 font-bold transition-transform duration-300 group-open:rotate-45 text-xl leading-none flex-shrink-0 bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
