import Link from 'next/link';
import type { ClusterConfig, BeautyClusterGroupId } from '@/app/lib/verticals/types';

interface BeautyClusterSectionProps {
  content: ClusterConfig<BeautyClusterGroupId>;
  accentGradient?: string;
  glowRgb?: string;
}

export default function BeautyClusterSection({
  content,
  accentGradient = 'from-rose-400 to-pink-500',
  glowRgb = '244, 63, 94',
}: BeautyClusterSectionProps) {
  return (
    <section
      className="relative py-20 px-6 overflow-hidden"
      aria-labelledby="beauty-cluster-title"
      data-source-section="beauty-cluster"
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.07) 0%, transparent 65%)`, filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-12">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-5"
              style={{ background: `rgba(${glowRgb}, 0.08)` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">Блог</span>
            </div>
            <h2 id="beauty-cluster-title" className="text-3xl md:text-4xl font-bold font-heading text-white">
              {content.title}
            </h2>
            <p className="mt-3 text-gray-400 max-w-3xl leading-relaxed">{content.subtitle}</p>
          </div>
          <Link
            href={content.viewAll.href}
            data-cta="beauty-cluster-view-blog"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-300 whitespace-nowrap"
          >
            {content.viewAll.label} <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Groups */}
        <div className="space-y-12">
          {content.groups.map((group, groupIdx) => (
            <section key={group.id} aria-label={group.title}>
              {/* Group header with colored left border */}
              <div
                className="flex items-start gap-4 mb-6 pl-5 relative"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{ background: `linear-gradient(to bottom, rgba(${glowRgb}, 0.9), rgba(${glowRgb}, 0.2))` }}
                />
                <div>
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
                    style={{ background: `rgba(${glowRgb}, 0.1)`, color: `rgba(${glowRgb}, 1)` }}
                  >
                    {String(groupIdx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">{group.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{group.description}</p>
                </div>
              </div>

              {/* Article cards */}
              <div className="grid md:grid-cols-2 gap-4 pl-0">
                {group.articles.map((a, artIdx) => {
                  const href = `${content.articleBaseHref}/${a.slug}`;
                  return (
                    <article
                      key={a.slug}
                      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5"
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                        style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.8), transparent 70%)` }}
                      />
                      {/* Article number */}
                      <div
                        className="absolute top-4 right-4 text-xs font-black leading-none select-none font-mono"
                        style={{ color: `rgba(${glowRgb}, 0.2)` }}
                      >
                        {String(artIdx + 1).padStart(2, '0')}
                      </div>

                      <h4 className="text-base font-semibold text-white leading-snug pr-8">
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
                      <p className="mt-2 text-sm text-gray-400 leading-relaxed">{a.summary}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                          href={href}
                          data-cta="beauty-cluster-cta"
                          data-article={a.slug}
                          data-group={group.id}
                          className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}
                        >
                          {a.ctaLabel} <span className="text-white/50" aria-hidden="true">→</span>
                        </Link>
                        <Link
                          href={content.roiCta.href}
                          data-cta="beauty-cluster-roi"
                          data-article={a.slug}
                          className="text-xs rounded-full border border-white/15 px-3 py-1.5 text-gray-300 hover:text-white transition-colors"
                          style={{ background: `rgba(${glowRgb}, 0.06)` }}
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
