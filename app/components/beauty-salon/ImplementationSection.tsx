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
  const total = content.stages.length;

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.08) 0%, transparent 60%)`, filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px]"
          style={{ background: `radial-gradient(circle, rgba(${glowRgb}, 0.06) 0%, transparent 60%)`, filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Timeline</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-14 leading-relaxed">{content.subtitle}</p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline track — desktop */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] hidden md:block">
            {/* Glowing track */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to bottom, rgba(${glowRgb}, 0.8), rgba(${glowRgb}, 0.4), rgba(${glowRgb}, 0.1))` }}
            />
            {/* Pulse effect on track */}
            <div
              className="absolute top-0 left-0 right-0 h-32 animate-pulse"
              style={{
                background: `linear-gradient(to bottom, rgba(${glowRgb}, 0.6), transparent)`,
                filter: 'blur(4px)',
              }}
            />
          </div>

          <ol className="space-y-6">
            {content.stages.map((stage, idx) => {
              const isLast = idx === total - 1;
              return (
                <li
                  key={stage.title}
                  className="relative md:pl-20 group"
                >
                  {/* Node on timeline — desktop */}
                  <div className="hidden md:block absolute left-0 top-6">
                    {/* Outer glow ring */}
                    <div
                      className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle, rgba(${glowRgb}, 0.4) 0%, transparent 70%)`,
                        filter: 'blur(6px)',
                      }}
                    />
                    {/* Node circle */}
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-black text-white transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, rgba(${glowRgb}, 1) 0%, rgba(${glowRgb}, 0.6) 100%)`,
                        boxShadow: `0 0 20px rgba(${glowRgb}, 0.5), 0 0 60px rgba(${glowRgb}, 0.2)`,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    {/* Connector dot to card */}
                    <div
                      className="absolute top-1/2 left-full -translate-y-1/2 w-6 h-[2px]"
                      style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.6), rgba(${glowRgb}, 0.1))` }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 md:p-7 overflow-hidden transition-all duration-400 hover:border-white/25 hover:-translate-y-0.5"
                  >
                    {/* Top accent shimmer */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.8), rgba(${glowRgb}, 0.3), transparent 70%)` }}
                    />

                    {/* Inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `inset 0 0 40px rgba(${glowRgb}, 0.08)` }}
                    />

                    {/* Large watermark number */}
                    <div
                      className="absolute -top-2 -right-2 font-black text-7xl md:text-8xl leading-none select-none"
                      style={{ color: `rgba(${glowRgb}, 0.04)` }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Mobile step label */}
                    <div className="flex items-center gap-3 md:hidden mb-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, rgba(${glowRgb}, 1) 0%, rgba(${glowRgb}, 0.6) 100%)`,
                          boxShadow: `0 0 12px rgba(${glowRgb}, 0.4)`,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">{content.stageLabel} {idx + 1}</p>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                        <span
                          className="inline-flex px-3.5 py-1 rounded-full text-xs font-bold border"
                          style={{
                            borderColor: `rgba(${glowRgb}, 0.4)`,
                            background: `rgba(${glowRgb}, 0.12)`,
                            color: 'white',
                          }}
                        >
                          {stage.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">{stage.text}</p>

                      {/* Progress indicator */}
                      {!isLast && (
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-[3px] flex-1 rounded-full bg-white/5 max-w-[200px] overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${((idx + 1) / total) * 100}%`,
                                background: `linear-gradient(90deg, rgba(${glowRgb}, 0.8), rgba(${glowRgb}, 0.4))`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-white/30 font-mono">{idx + 1}/{total}</span>
                        </div>
                      )}

                      {/* Last card — completion indicator */}
                      {isLast && (
                        <div className="mt-4 flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              background: `rgba(${glowRgb}, 0.2)`,
                              color: `rgba(${glowRgb}, 1)`,
                              border: `1px solid rgba(${glowRgb}, 0.4)`,
                            }}
                          >
                            ✓
                          </div>
                          <span className="text-xs font-semibold" style={{ color: `rgba(${glowRgb}, 0.7)` }}>Ready to launch</span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
