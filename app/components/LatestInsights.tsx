'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { getPublishedBlogArticles, getBlogText } from '../lib/blogData';

export default function LatestInsights() {
  const { ref, isVisible } = useReveal();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  const latestArticles = useMemo(
    () =>
      [...getPublishedBlogArticles()]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3),
    [],
  );

  return (
    <section className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header — minimal & clean */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal ${isVisible ? 'visible' : ''}`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
              {isEn ? 'From the blog' : 'З блогу'}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white leading-[1.1]">
              {isEn ? 'Latest Insights' : 'Останні статті'}
            </h2>
          </div>

          <Link
            href={`${basePath}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white shrink-0"
          >
            {isEn ? 'All articles' : 'Всі статті'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles — clean card layout */}
        <div className="grid lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {latestArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`${basePath}/blog/${article.slug}`}
              className={`group relative bg-[#0a0a0a] p-7 flex flex-col transition-colors duration-300 hover:bg-white/[0.03] reveal ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Number / index */}
              <span className="text-[80px] font-bold font-heading leading-none text-white/[0.04] select-none absolute top-4 right-6">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Category */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/30">
                  {getBlogText(article.category, lang)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-white/90 transition-colors relative z-10">
                {getBlogText(article.h1, lang)}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/40 leading-relaxed mb-6 line-clamp-2 flex-1 relative z-10">
                {getBlogText(article.metaDescription, lang)}
              </p>

              {/* Bottom row: date + read link */}
              <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/[0.06] relative z-10">
                <time className="text-xs text-white/25" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'uk-UA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-all duration-300 group-hover:text-white group-hover:gap-2.5">
                  {isEn ? 'Read' : 'Читати'}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
