import type { ImplementationConfig } from '@/app/lib/verticals/types';

interface ImplementationSectionProps {
  content: ImplementationConfig;
  accentGradient?: string;
  glowRgb?: string;
}

export default function ImplementationSection({
  content,
  accentGradient = 'from-purple-400 to-violet-500',
  glowRgb = '139, 92, 246',
}: ImplementationSectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[500px]"
          style={{ background: `radial-gradient(circle, rgba(${glowRgb}, 0.08) 0%, transparent 60%)`, filter: 'blur(100px)' }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Timeline</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="relative">
          <div
            className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden md:block"
            style={{ background: `linear-gradient(to bottom, rgba(${glowRgb}, 0.9), rgba(${glowRgb}, 0.3), transparent)` }}
          />
          <ol className="space-y-5">
            {content.stages.map((stage, idx) => (
              <li
                key={stage.title}
                className="relative md:pl-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] group"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.8), transparent)` }}
                />
                <div
                  className="hidden md:flex absolute left-[-10px] top-6 w-10 h-10 rounded-full items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, rgba(${glowRgb}, 1) 0%, rgba(${glowRgb}, 0.7) 100%)`,
                    boxShadow: `0 4px 20px rgba(${glowRgb}, 0.5)`,
                  }}
                >
                  {idx + 1}
                </div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em] md:hidden mb-1">{content.stageLabel} {idx + 1}</p>
                <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                <span
                  className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold border text-white/80"
                  style={{
                    borderColor: `rgba(${glowRgb}, 0.4)`,
                    background: `rgba(${glowRgb}, 0.12)`,
                  }}
                >
                  {stage.duration}
                </span>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
