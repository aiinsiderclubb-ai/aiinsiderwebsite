'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Play, CheckCircle, Sparkles, Clock, ChevronDown, Users, Video, Zap, Globe, Star, Target, Layers, MessageCircle, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { getLocalizedText, getServiceBySlug } from '@/app/lib/servicesData';
import { getSiteUrl, SITE_NAME } from '@/app/lib/site';
import PageCTA from '@/app/components/PageCTA';

const iconMap: Record<string, React.ReactNode> = {
  '🎭': <Users className="w-6 h-6" />,
  '📱': <Layers className="w-6 h-6" />,
  '💬': <MessageCircle className="w-6 h-6" />,
  '🌍': <Globe className="w-6 h-6" />,
  '🎬': <Video className="w-6 h-6" />,
  '🎯': <Target className="w-6 h-6" />,
  '⚡': <Zap className="w-6 h-6" />,
  '✨': <Sparkles className="w-6 h-6" />,
  '🧪': <Sparkles className="w-6 h-6" />,
  '🔊': <Video className="w-6 h-6" />,
  '📊': <Target className="w-6 h-6" />,
  '🤖': <Users className="w-6 h-6" />,
  '📈': <Target className="w-6 h-6" />,
  '🛠️': <Layers className="w-6 h-6" />,
  '🎨': <Sparkles className="w-6 h-6" />,
  '📸': <ImageIcon className="w-6 h-6" />,
  '💡': <Sparkles className="w-6 h-6" />,
};

const serviceGradients: Record<string, { gradient: string; glowColor: string }> = {
  'ai-influencers': { gradient: 'from-purple-500 to-pink-500', glowColor: 'rgba(168, 85, 247, 0.4)' },
  'ai-video-production': { gradient: 'from-blue-500 to-cyan-500', glowColor: 'rgba(59, 130, 246, 0.4)' },
  'ai-ugc-content': { gradient: 'from-orange-500 to-red-500', glowColor: 'rgba(249, 115, 22, 0.4)' },
  'ai-creative-studio': { gradient: 'from-green-500 to-emerald-500', glowColor: 'rgba(16, 185, 129, 0.4)' },
};

const defaultGradient = { gradient: 'from-white/20 to-white/10', glowColor: 'rgba(255, 255, 255, 0.2)' };

const PARTICLE_POSITIONS = [
  [12, 18], [78, 32], [45, 72], [28, 45], [62, 58], [18, 65], [72, 22], [35, 38],
  [55, 82], [88, 48], [22, 28], [68, 72], [42, 15], [58, 45], [15, 55],
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  const service = getServiceBySlug(slug);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{isEn ? 'Service not found' : 'Послугу не знайдено'}</h1>
          <Link href={`${basePath}/services`} className="text-purple-400 hover:underline">
            {isEn ? 'Back to services' : 'Назад до послуг'}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const { gradient, glowColor } = serviceGradients[slug] || defaultGradient;

  const pageTitle = getLocalizedText(service.title, lang);
  const pageSubtitle = getLocalizedText(service.subtitle, lang);
  const siteUrl = getSiteUrl();
  const serviceUrl = new URL(`${basePath}/services/${service.slug}`, siteUrl).toString();
  const serviceDescription = getLocalizedText(service.seoDescription, lang);
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl.toString().replace(/\/$/, ''),
    },
    areaServed: 'Worldwide',
    url: serviceUrl,
  };
  const faqJsonLd =
    service.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faq.map((qa) => ({
            '@type': 'Question',
            name: getLocalizedText(qa.question, lang),
            acceptedAnswer: {
              '@type': 'Answer',
              text: getLocalizedText(qa.answer, lang),
            },
          })),
        }
      : null;
  const relatedArticles = (service.relatedArticleSlugs ?? [])
    .map((articleSlug) => blogArticles.find((article) => article.slug === articleSlug))
    .filter((article): article is (typeof blogArticles)[number] => Boolean(article));
  const showBeautyIndustrySpotlight = lang === 'uk' && service.slug === 'workflow-automation';
  const showRealEstateGuideSpotlight = lang === 'uk' && service.slug === 'ai-automation-for-real-estate';

  const servicesLabel = isEn ? 'Services' : 'Послуги';
  const homeLabel = isEn ? 'Home' : 'Головна';
  const outcomesLabel = isEn ? 'Outcomes' : 'Результати';
  const featuresLabel = isEn ? 'What you get' : 'Що входить';
  const useCasesLabel = isEn ? 'Best for' : 'Кому підходить';
  const implementationLabel = isEn ? 'Implementation timeline' : 'Таймлайн впровадження';
  const faqLabel = isEn ? 'FAQ' : 'Поширені питання';
  const bookCallLabel = isEn ? 'Book an intro call' : 'Замовити дзвінок';
  const viewCasesLabel = isEn ? 'View case studies' : 'Подивитись кейси';
  const relatedArticlesLabel = isEn ? 'Related Articles' : 'Корисні статті';
  const readMoreLabel = isEn ? 'Read more' : 'Читати далі';

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, ${glowColor} 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
              `,
            }}
          />
          <div
            className="absolute top-20 left-1/4 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 50%)`,
              filter: 'blur(120px)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          {/* Particles - fixed positions for performance */}
          <div className="absolute inset-0 overflow-hidden">
            {PARTICLE_POSITIONS.map(([left, top], i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `twinkle ${2.5 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${(i % 5) * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-gray-500 mb-8"
          >
            <Link href={`${basePath}`} className="hover:text-white transition-colors">
              {homeLabel}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`${basePath}/services`} className="hover:text-white transition-colors">
              {servicesLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">{pageTitle}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 border border-white/20 bg-gradient-to-r ${gradient} bg-opacity-10`}
            style={{ background: `linear-gradient(135deg, ${glowColor}, transparent)` }}
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">
              {servicesLabel}
            </span>
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
              {getLocalizedText(service.timeline, lang)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-5 leading-[1.05]"
          >
            <span
              style={{
                background: `linear-gradient(135deg, #fff 0%, ${glowColor.replace('0.4', '1')} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {pageTitle}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mb-10 leading-relaxed"
          >
            {pageSubtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href={`${basePath}/contact`}
              className={`group relative px-8 py-4 bg-gradient-to-r ${gradient} text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              style={{ boxShadow: `0 10px 40px ${glowColor}` }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {bookCallLabel}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href={`${basePath}/cases`}
              className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {viewCasesLabel}
            </Link>
          </motion.div>

          {/* Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {service.outcomes.map((o, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 60%)`,
                    filter: 'blur(40px)',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      {outcomesLabel} {idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{getLocalizedText(o, lang)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-gradient-to-r ${gradient} bg-opacity-10`}>
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                {featuresLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              {isEn ? 'Everything ' : 'Все, '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${glowColor.replace('0.4', '1')} 0%, #fff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Included' : 'що входить'}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <div
                  className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${glowColor}, transparent)` }}
                />
                <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm p-6 hover:border-white/25 transition-all duration-300">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    style={{ boxShadow: `0 10px 30px ${glowColor}` }}
                  >
                    {iconMap[f.icon] || <span className="text-2xl">{f.icon}</span>}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{getLocalizedText(f.title, lang)}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(f.description, lang)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery — AI Creative Studio only */}
      {service.slug === 'ai-creative-studio' && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-15"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${glowColor} 0%, transparent 50%)` }}
          />
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  {isEn ? 'Portfolio' : 'Портфоліо'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                {isEn ? 'Our ' : 'Наші '}
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {isEn ? 'Creatives' : 'креативи'}
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                {isEn
                  ? 'Examples of AI-generated creatives, product photos and graphics'
                  : 'Приклади AI-генерованих креативів, продуктових фото та графіки'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: n * 0.08 }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-300 ${
                    n === 1 ? 'md:row-span-2' : ''
                  } ${n === 4 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`relative ${n === 1 ? 'aspect-[3/4]' : n === 4 ? 'aspect-[2/1]' : 'aspect-square'}`}>
                    <Image
                      src={`/images/ai-creatives/${n}.jpeg`}
                      alt={`AI creative example ${n}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white`}>
                        {isEn ? 'AI Generated' : 'AI-генерація'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            
          </div>
        </section>
      )}

      {/* Use Cases & Timeline */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 50%)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Use Cases */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
                <Target className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  {useCasesLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                {isEn ? 'Perfect for' : 'Ідеально для'}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {service.useCases.map((u, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{getLocalizedText(u.title, lang)}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(u.description, lang)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
                <Clock className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  {implementationLabel}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                {isEn ? 'How we do it' : 'Як ми це робимо'}
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b ${gradient} opacity-30`} />

              <div className="space-y-6">
                {service.implementation.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="relative pl-14"
                  >
                    {/* Step number */}
                    <div
                      className={`absolute left-0 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold z-10`}
                      style={{ boxShadow: `0 5px 20px ${glowColor}` }}
                    >
                      {idx + 1}
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white">{getLocalizedText(step.title, lang)}</h3>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
                          {getLocalizedText(step.duration, lang)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{getLocalizedText(step.description, lang)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <MessageCircle className="w-4 h-4 text-white/70" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {faqLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              {isEn ? 'Common ' : 'Поширені '}
              <span
                style={{
                  background: `linear-gradient(135deg, ${glowColor.replace('0.4', '1')} 0%, #fff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Questions' : 'питання'}
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {service.faq.map((qa, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full rounded-2xl border ${openFaq === idx ? 'border-white/25 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03]'} p-6 text-left transition-all duration-300 hover:border-white/20`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-bold text-white">{getLocalizedText(qa.question, lang)}</span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-400 leading-relaxed">
                          {getLocalizedText(qa.answer, lang)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showBeautyIndustrySpotlight ? (
        <section className="relative py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-pink-400/20 bg-gradient-to-r from-pink-500/10 via-white/[0.03] to-transparent p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-300/80">
                    Beauty Spotlight
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                    Подивіться, як салони краси використовують автоматизацію процесів
                  </h2>
                  <p className="mt-3 max-w-2xl text-gray-400">
                    Детальний pillar page про Instagram-ліди, онлайн-запис, нагадування, CRM-сегментацію та KPI для beauty-бізнесу.
                  </p>
                </div>
                <Link
                  href="/uk/avtomatizaciya-salonu-krasy"
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                >
                  Перейти до beauty pillar
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {showRealEstateGuideSpotlight ? (
        <section className="relative py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-white/[0.03] to-transparent p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300/80">
                    Real Estate Guide
                  </p>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white">
                    Повний гід для агентств по AI-автоматизації нерухомості
                  </h2>
                  <p className="mt-3 max-w-2xl text-gray-400">
                    Окрема pillar page про кваліфікацію лідів, voice agents, CRM-автоматизацію та аналітику для real estate-команд.
                  </p>
                </div>
                <Link
                  href="/uk/avtomatizaciya-nerukhomosti"
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                >
                  Повний гід для агентств
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {relatedArticles.length > 0 ? (
        <section className="relative py-20 px-6 overflow-hidden border-t border-white/5">
          <div className="relative max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
                <Sparkles className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  {relatedArticlesLabel}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
                {relatedArticlesLabel}
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    {getBlogText(article.category, lang)}
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {getBlogText(article.h1, lang)}
                  </h3>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    {getBlogText(article.metaDescription, lang)}
                  </p>
                  <Link
                    href={`${basePath}/blog/${article.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
                  >
                    {readMoreLabel}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Final CTA */}
      <PageCTA />

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>

      <Footer />
    </main>
  );
}
