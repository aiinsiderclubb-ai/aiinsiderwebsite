'use client';

import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPublishedBlogArticles, getBlogText } from '../lib/blogData';

export default function LatestInsights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-1/4 w-[700px] h-[700px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(var(--theme-glow-rgb),0.10) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {isEn ? 'Latest Insights' : 'Останні статті'}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 text-white leading-[1.1]">
            {isEn ? 'Latest Insights' : 'Останні статті'}
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {isEn
              ? 'Fresh articles on AI automation, sales workflows, content systems, and real-world implementation.'
              : 'Свіжі статті про AI-автоматизацію, sales workflow, контент-системи та практичне впровадження.'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4">
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`${basePath}/blog/${article.slug}`}
                className="group block h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{article.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    {getBlogText(article.category, lang)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-white/85 transition-colors">
                  {getBlogText(article.h1, lang)}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  {getBlogText(article.metaDescription, lang)}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 text-sm">
                  <time className="text-gray-500" dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString(isEn ? 'en-US' : 'uk-UA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="inline-flex items-center gap-2 font-semibold text-white/70 transition-colors group-hover:text-white">
                    {isEn ? 'Read article' : 'Читати'}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 text-center"
        >
          <Link
            href={`${basePath}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"
          >
            {isEn ? 'View all articles' : 'Всі статті'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
