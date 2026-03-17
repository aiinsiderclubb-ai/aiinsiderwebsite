import type { ProblemsConfig } from '@/app/lib/verticals/types';

export default function ProblemSection({ content }: { content: ProblemsConfig }) {
  return (
    <section className="relative py-20 px-6 overflow-hidden" data-source-section="problems">
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">
            {content.title.split(':')[0] || content.title}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {content.cards.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.text}</p>
              <p className="mt-4 text-sm font-bold text-rose-300">{item.metric}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
