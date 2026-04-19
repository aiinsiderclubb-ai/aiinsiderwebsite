'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Phone,
  Target,
  Heart,
  CheckCircle2,
  Zap,
  Rocket,
  Shield,
  Wrench,
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { useReveal } from '@/app/hooks/useReveal';

type ProductStatus = 'live' | 'beta' | 'coming_soon';

export default function ProductsPage() {
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  const { ref: headerRef, isVisible: headerVisible } = useReveal();
  const { ref: gridRef, isVisible: gridVisible } = useReveal();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useReveal();

  const products: Array<{
    slug: string;
    nameKey: string;
    tagKey: string;
    descKey: string;
    features: string[];
    status: ProductStatus;
    price?: string;
    priceSuffix?: string;
    href: string;
    icon: typeof Sparkles;
    gradient: string;
    glow: string;
    accent: string;
  }> = [
    {
      slug: 'content-factory',
      nameKey: 'products.p1Name',
      tagKey: 'products.p1Tag',
      descKey: 'products.p1Desc',
      features: ['products.p1Feat1', 'products.p1Feat2', 'products.p1Feat3'],
      status: 'live',
      price: '899',
      priceSuffix: t('products.perMonth'),
      href: `${basePath}/content-factory`,
      icon: Sparkles,
      gradient: 'from-violet-500 to-purple-500',
      glow: 'rgba(139, 92, 246, 0.35)',
      accent: '#8b5cf6',
    },
    {
      slug: 'sweezy',
      nameKey: 'products.p2Name',
      tagKey: 'products.p2Tag',
      descKey: 'products.p2Desc',
      features: ['products.p2Feat1', 'products.p2Feat2', 'products.p2Feat3'],
      status: 'beta',
      price: '49',
      priceSuffix: t('products.perMonth'),
      href: `${basePath}/cases/sweezy`,
      icon: Heart,
      gradient: 'from-pink-500 to-rose-500',
      glow: 'rgba(236, 72, 153, 0.35)',
      accent: '#ec4899',
    },
    {
      slug: 'ai-receptionist',
      nameKey: 'products.p3Name',
      tagKey: 'products.p3Tag',
      descKey: 'products.p3Desc',
      features: ['products.p3Feat1', 'products.p3Feat2', 'products.p3Feat3'],
      status: 'live',
      price: '399',
      priceSuffix: t('products.perMonth'),
      href: `${basePath}/ai-receptionist`,
      icon: Phone,
      gradient: 'from-emerald-500 to-teal-500',
      glow: 'rgba(16, 185, 129, 0.35)',
      accent: '#10b981',
    },
    {
      slug: 'ai-sdr',
      nameKey: 'products.p4Name',
      tagKey: 'products.p4Tag',
      descKey: 'products.p4Desc',
      features: ['products.p4Feat1', 'products.p4Feat2', 'products.p4Feat3'],
      status: 'coming_soon',
      href: `${basePath}/ai-sdr`,
      icon: Target,
      gradient: 'from-amber-500 to-orange-500',
      glow: 'rgba(249, 115, 22, 0.35)',
      accent: '#f97316',
    },
  ];

  const statusLabel = (s: ProductStatus) =>
    s === 'live' ? t('products.live') : s === 'beta' ? t('products.beta') : t('products.comingSoon');

  const statusColor = (s: ProductStatus) =>
    s === 'live'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      : s === 'beta'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : 'bg-white/[0.06] text-gray-300 border-white/15';

  const benefits = [
    { icon: Rocket, titleKey: 'products.benefit1Title', descKey: 'products.benefit1Desc' },
    { icon: Zap, titleKey: 'products.benefit2Title', descKey: 'products.benefit2Desc' },
    { icon: Wrench, titleKey: 'products.benefit3Title', descKey: 'products.benefit3Desc' },
    { icon: Shield, titleKey: 'products.benefit4Title', descKey: 'products.benefit4Desc' },
  ];

  return (
    <main className="relative min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 70% 50% at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse 50% 40% at 50% 100%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div ref={headerRef} className="relative max-w-5xl mx-auto text-center">
          <div className={`reveal ${headerVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-violet-500/25 bg-violet-500/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
                {t('products.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-[1.05]">
              <span className="text-white">{t('products.title1')}</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('products.title2')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-12 px-6">
        <div ref={gridRef} className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {products.map((product, idx) => {
              const Icon = product.icon;
              const disabled = product.status === 'coming_soon';
              const delay = Math.min(idx + 1, 4);

              return (
                <div
                  key={product.slug}
                  className={`reveal reveal-delay-${delay} ${gridVisible ? 'visible' : ''} group relative`}
                >
                  <Link
                    href={disabled ? `${basePath}#contact` : product.href}
                    className="block h-full"
                    aria-disabled={disabled}
                  >
                    <div className="relative h-full rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                      {/* Top gradient bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${product.gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      {/* Corner glow */}
                      <div
                        className="absolute top-0 right-0 w-64 h-64 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at top right, ${product.accent} 0%, transparent 70%)`,
                        }}
                      />

                      <div className="relative z-10 p-7 lg:p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                            style={{ boxShadow: `0 12px 32px ${product.glow}` }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${statusColor(
                              product.status,
                            )}`}
                          >
                            {statusLabel(product.status)}
                          </span>
                        </div>

                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {t(product.tagKey)}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                          {t(product.nameKey)}
                        </h2>
                        <p className="text-sm lg:text-base text-gray-400 leading-relaxed mb-6">
                          {t(product.descKey)}
                        </p>

                        <ul className="space-y-2.5 mb-7">
                          {product.features.map((fKey, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: product.accent }}
                              />
                              <span className="text-sm text-gray-300">{t(fKey)}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between pt-5 border-t border-white/10">
                          {product.price ? (
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xs text-gray-500">{t('products.startFrom')}</span>
                              <span className="text-2xl font-bold text-white">${product.price}</span>
                              <span className="text-sm text-gray-400">{product.priceSuffix}</span>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-gray-400">
                              {isEn ? 'Early access' : 'Ранній доступ'}
                            </span>
                          )}

                          <div
                            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5"
                            style={{ color: product.accent }}
                          >
                            <span>
                              {disabled ? t('products.getNotified') : t('products.viewProduct')}
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 px-6">
        <div ref={benefitsRef} className="relative max-w-6xl mx-auto">
          <div className={`text-center mb-14 reveal ${benefitsVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
              {t('products.benefitsTitle')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className={`reveal reveal-delay-${Math.min(idx + 1, 4)} ${
                    benefitsVisible ? 'visible' : ''
                  } relative rounded-2xl p-6 border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{t(b.titleKey)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t(b.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-6">
        <div ref={ctaRef} className="relative max-w-4xl mx-auto">
          <div
            className={`reveal ${ctaVisible ? 'visible' : ''} relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 md:p-14 text-center overflow-hidden`}
          >
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.25) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4 leading-tight">
                {t('products.ctaTitle')}
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                {t('products.ctaSubtitle')}
              </p>
              <Link href={`${basePath}#bookcall`} className="btn-primary px-8 py-4 text-base">
                <span>{t('products.ctaBtn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
