import type { ProblemsConfig } from '@/app/lib/verticals/types';

interface ProblemSectionProps {
  content: ProblemsConfig;
  accentGradient?: string;
  glowRgb?: string;
}

export default function ProblemSection({
  content,
  accentGradient = 'from-rose-400 to-pink-500',
  glowRgb = '244, 63, 94',
}: ProblemSectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden" data-source-section="problems">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[700px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.1) 0%, transparent 60%)`, filter: 'blur(80px)' }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            {content.title.split(':')[0] || content.title}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {content.cards.map((item, idx) => (
            <article
              key={item.title}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-1 group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, rgba(${glowRgb}, 0.7), transparent)` }}
              />
              <div className="absolute top-4 right-4 font-black text-5xl leading-none select-none" style={{ color: `rgba(${glowRgb}, 0.06)` }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.text}</p>
              <p className={`mt-4 text-sm font-bold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>
                {item.metric}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
