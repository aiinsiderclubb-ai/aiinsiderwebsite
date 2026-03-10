import Link from 'next/link';
import type { AutomationConfig } from '@/app/lib/verticals/types';

export default function AutomationSection({ content }: { content: AutomationConfig }) {
  return (
    <section className="py-12 px-6 content-visibility-auto" data-source-section="automation-solutions">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          {content.subtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {content.cards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {content.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
