import type { CasesConfig } from '@/app/lib/verticals/types';

export default function CaseSection({ content }: { content: CasesConfig }) {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 max-w-3xl mb-8">{content.subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-5">
          {content.items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-gray-300">{item.problem}</p>

              <h4 className="mt-4 text-sm font-semibold text-white">{content.labels.whatWeDid}</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-300 list-disc ml-5">
                {item.implementation.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <h4 className="mt-4 text-sm font-semibold text-white">{content.labels.metrics}</h4>
              <ul className="mt-2 space-y-1 text-sm text-emerald-200 list-disc ml-5">
                {item.metrics.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-gray-400">
                {content.labels.timeline} {item.timeline}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
