import type { ObjectionsConfig } from '@/app/lib/verticals/types';

export default function ObjectionSection({ content }: { content: ObjectionsConfig }) {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <div className="space-y-3">
          {content.items.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 open:bg-white/[0.05]">
              <summary className="cursor-pointer text-white font-semibold">{item.q}</summary>
              <p className="mt-2 text-gray-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
