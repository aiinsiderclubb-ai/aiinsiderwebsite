import Link from 'next/link';
import type { ClusterConfig, BeautyClusterGroupId } from '@/app/lib/verticals/types';

export default function BeautyClusterSection({ content }: { content: ClusterConfig<BeautyClusterGroupId> }) {
  return (
    <section className="py-12 px-6 content-visibility-auto" aria-labelledby="beauty-cluster-title" data-source-section="beauty-cluster">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 id="beauty-cluster-title" className="text-3xl md:text-4xl font-bold text-white">
              {content.title}
            </h2>
            <p className="mt-3 text-gray-300 max-w-3xl">
              {content.subtitle}
            </p>
          </div>
          <Link
            href={content.viewAll.href}
            data-cta="beauty-cluster-view-blog"
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            {content.viewAll.label}{' '}
          </Link>
        </div>

        <div className="mt-10 space-y-10">
          {content.groups.map((group) => (
            <section key={group.id} aria-label={group.title}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{group.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {group.articles.map((a) => {
                  const href = `${content.articleBaseHref}/${a.slug}`;
                  return (
                    <article
                      key={a.slug}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-colors"
                    >
                      <h4 className="text-lg font-semibold text-white leading-snug">
                        <Link
                          href={href}
                          data-cta="beauty-cluster-title"
                          data-article={a.slug}
                          data-group={group.id}
                          className="hover:text-white/90 transition-colors"
                        >
                          {a.title}
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm text-gray-300">{a.summary}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                          href={href}
                          data-cta="beauty-cluster-cta"
                          data-article={a.slug}
                          data-group={group.id}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                        >
                          {a.ctaLabel} <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                          href={content.roiCta.href}
                          data-cta="beauty-cluster-roi"
                          data-article={a.slug}
                          className="text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
                        >
                          {content.roiCta.label}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
