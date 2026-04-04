'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Zap, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';

interface PageCTAProps {
  primaryHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  gradient?: string;
  glowColor?: string;
}

export default function PageCTA({
  primaryHref,
  secondaryHref,
  secondaryLabel,
  gradient = 'from-purple-500 via-blue-500 to-pink-500',
  glowColor = 'rgba(147, 51, 234, 0.3)',
}: PageCTAProps) {
  const { ref, isVisible } = useReveal();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  const resolvedPrimaryHref = primaryHref || `${basePath}/contact`;
  const resolvedSecondaryHref = secondaryHref || `${basePath}/services`;
  const resolvedSecondaryLabel =
    secondaryLabel || (isEn ? 'Services' : 'Послуги');

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-25"
          style={{
            background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 60%)`,
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-4xl mx-auto">
        <div className={`reveal ${isVisible ? 'visible' : ''}`}>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-pink-500/15 rounded-[3rem] blur-xl" />

          <div className="relative text-center p-10 md:p-12 rounded-[2.5rem] border border-white/12 bg-gradient-to-br from-white/[0.08] to-white/[0.02]">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/15 bg-gradient-to-r ${gradient} bg-opacity-20`}
            >
              <Star className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">
                {isEn ? 'Ready to start?' : 'Готові розпочати?'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {isEn ? "Let's build this together" : 'Давайте створимо це разом'}
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              {isEn
                ? 'Book a free consultation to discuss your project and see how we can help'
                : 'Замовте безкоштовну консультацію, щоб обговорити ваш проект'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={resolvedPrimaryHref}
                className="btn-primary group relative px-10 py-5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isEn ? 'Book an intro call' : 'Замовити дзвінок'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href={resolvedSecondaryHref}
                className="btn-secondary px-8 py-4"
              >
                <span className="flex items-center gap-2">
                  {resolvedSecondaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {isEn ? 'Switzerland • EU • US' : 'Швейцарія • ЄС • США'}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {isEn ? 'Fast delivery' : 'Швидка доставка'}
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {isEn ? 'Custom solutions' : 'Кастомні рішення'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
