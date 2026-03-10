import type { ProblemsConfig } from '@/app/lib/verticals/types';

export default function ProblemSection({ content }: { content: ProblemsConfig }) {
  return (
    <section className="py-12 px-6 content-visibility-auto" data-source-section="problems">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          {content.subtitle}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {content.cards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-rose-300">{item.metric}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
