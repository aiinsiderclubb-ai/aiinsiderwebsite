import type { ImplementationConfig } from '@/app/lib/verticals/types';

export default function ImplementationSection({ content }: { content: ImplementationConfig }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            Timeline
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />
          <ol className="space-y-5">
            {content.stages.map((stage, idx) => (
              <li key={stage.title} className="relative md:pl-20 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                <div className="hidden md:flex absolute left-[-8px] top-6 w-10 h-10 rounded-full border border-white/20 bg-black items-center justify-center text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <p className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] md:hidden">{content.stageLabel} {idx + 1}</p>
                <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-emerald-300">{stage.duration}</span>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
