import type { ImplementationConfig } from '@/app/lib/verticals/types';

export default function ImplementationSection({ content }: { content: ImplementationConfig }) {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 max-w-3xl mb-8">{content.subtitle}</p>
        <ol className="space-y-4">
          {content.stages.map((stage, idx) => (
            <li key={stage.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-400">
                {content.stageLabel} {idx + 1}
              </p>
              <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
              <p className="text-sm text-emerald-200 mt-1">{stage.duration}</p>
              <p className="text-gray-300 mt-2">{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
