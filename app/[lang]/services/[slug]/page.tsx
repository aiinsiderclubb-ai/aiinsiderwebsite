'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Play, CheckCircle, Sparkles, Clock, ChevronDown, Users, Video, Zap, Globe, Star, Target, Layers, MessageCircle } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { getLocalizedText, getServiceBySlug, servicesData } from '@/app/lib/servicesData';

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
  '💡': <Sparkles className="w-6 h-6" />,
};

const serviceGradients: Record<string, { gradient: string; glowColor: string }> = {
  'ai-influencers': { gradient: 'from-purple-500 to-pink-500', glowColor: 'rgba(168, 85, 247, 0.4)' },
  'ai-video-production': { gradient: 'from-blue-500 to-cyan-500', glowColor: 'rgba(59, 130, 246, 0.4)' },
  'ai-ugc-content': { gradient: 'from-orange-500 to-red-500', glowColor: 'rgba(249, 115, 22, 0.4)' },
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

  const servicesLabel = isEn ? 'Services' : 'Послуги';
  const homeLabel = isEn ? 'Home' : 'Головна';
  const outcomesLabel = isEn ? 'Outcomes' : 'Результати';
  const featuresLabel = isEn ? 'What you get' : 'Що входить';
  const useCasesLabel = isEn ? 'Best for' : 'Кому підходить';
  const implementationLabel = isEn ? 'Implementation timeline' : 'Таймлайн впровадження';
  const faqLabel = isEn ? 'FAQ' : 'Поширені питання';
  const bookCallLabel = isEn ? 'Book an intro call' : 'Замовити дзвінок';
  const viewCasesLabel = isEn ? 'View case studies' : 'Подивитись кейси';

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
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

      {/* Final CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] opacity-30"
            style={{
              background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 60%)`,
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-[3rem] blur-xl" />

            <div className="relative text-center p-10 md:p-12 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.1] to-white/[0.02] backdrop-blur-xl">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/20 bg-gradient-to-r ${gradient} bg-opacity-20`}>
                <Star className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  {isEn ? 'Ready to start?' : 'Готові розпочати?'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                {isEn ? "Let's build this together" : 'Давайте створимо це разом'}
              </h2>

              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                {isEn
                  ? 'Book a free consultation to discuss your project and see how we can help'
                  : 'Замовте безкоштовну консультацію, щоб обговорити ваш проект'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={`${basePath}/contact`}
                  className={`group relative px-10 py-5 bg-gradient-to-r ${gradient} text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105`}
                  style={{ boxShadow: `0 15px 50px ${glowColor}` }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {bookCallLabel}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href={`${basePath}/services`}
                  className="px-8 py-4 text-white/70 hover:text-white font-semibold transition-colors"
                >
                  {servicesLabel} →
                </Link>
              </div>

              {/* Trust indicators */}
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
          </motion.div>
        </div>
      </section>

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
