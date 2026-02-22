'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Video, Users, Zap, CheckCircle, Star, Globe, Palette, TrendingUp } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/lib/LanguageContext';

const services = [
  {
    slug: 'ai-influencers',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    shadowColor: 'shadow-purple-500/20',
    emoji: '🎭',
    titleEn: 'AI Influencers',
    titleUk: 'AI-інфлюенсери',
    subtitleEn: 'Virtual personas for your brand',
    subtitleUk: 'Віртуальні персонажі для вашого бренду',
    featuresEn: ['24/7 content creation', 'Full brand control', 'Multilingual support', 'No contracts or fees'],
    featuresUk: ['Контент 24/7', 'Повний контроль бренду', 'Мультимовність', 'Без контрактів та гонорарів'],
  },
  {
    slug: 'ai-video-production',
    icon: Video,
    gradient: 'from-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/20',
    emoji: '🎬',
    titleEn: 'AI Video Production',
    titleUk: 'AI-відеопродакшн',
    subtitleEn: 'Videos without cameras or crews',
    subtitleUk: 'Відео без камер і команд',
    featuresEn: ['AI avatars with lip-sync', 'Content repurposing', '10+ languages dubbing', 'A/B test variations'],
    featuresUk: ['AI-аватари з lip-sync', 'Repurposing контенту', 'Дубляж 10+ мов', 'A/B тест варіації'],
  },
  {
    slug: 'ai-ugc-content',
    icon: Sparkles,
    gradient: 'from-orange-500 to-red-500',
    shadowColor: 'shadow-orange-500/20',
    emoji: '⚡',
    titleEn: 'AI UGC Content',
    titleUk: 'AI UGC-контент',
    subtitleEn: 'UGC ads at scale',
    subtitleUk: 'UGC-реклама у масштабі',
    featuresEn: ['100+ avatar diversity', 'Conversion-focused scripts', 'Platform-optimized', '5-10x cost reduction'],
    featuresUk: ['100+ різних аватарів', 'Скрипти під конверсії', 'Оптимізовано під платформи', 'Вартість у 5-10 разів нижча'],
  },
];

const stats = [
  { valueEn: '10x', valueUk: '10x', labelEn: 'Content output', labelUk: 'Обсяг контенту' },
  { valueEn: '5-10x', valueUk: '5-10x', labelEn: 'Cost savings', labelUk: 'Економія коштів' },
  { valueEn: '24/7', valueUk: '24/7', labelEn: 'Content creation', labelUk: 'Створення контенту' },
  { valueEn: '10+', valueUk: '10+', labelEn: 'Languages', labelUk: 'Мов' },
];

const useCases = [
  { iconEmoji: '📱', titleEn: 'Social Media', titleUk: 'Соцмережі', descEn: 'TikTok, Reels, Shorts — daily content without a team', descUk: 'TikTok, Reels, Shorts — щоденний контент без команди' },
  { iconEmoji: '📢', titleEn: 'Paid Ads', titleUk: 'Платна реклама', descEn: 'UGC-style creatives for Meta, TikTok, YouTube', descUk: 'UGC-креативи для Meta, TikTok, YouTube' },
  { iconEmoji: '🎓', titleEn: 'Education', titleUk: 'Навчання', descEn: 'Onboarding, tutorials, courses with AI instructors', descUk: 'Онбординг, tutorials, курси з AI-інструкторами' },
  { iconEmoji: '🌍', titleEn: 'Localization', titleUk: 'Локалізація', descEn: 'One script → 10+ languages with lip-sync', descUk: 'Один скрипт → 10+ мов з lip-sync' },
  { iconEmoji: '🛍️', titleEn: 'E-commerce', titleUk: 'E-commerce', descEn: 'Product demos, reviews, unboxings at scale', descUk: 'Демо продуктів, огляди, розпаковки у масштабі' },
  { iconEmoji: '💼', titleEn: 'B2B', titleUk: 'B2B', descEn: 'Video outreach, VSLs, case study videos', descUk: 'Відео-аутріч, VSL, відео-кейси' },
];

export default function AIContentCreationHub() {
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animation: 'pulse 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animation: 'pulse 8s ease-in-out infinite 2s',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 60%)',
              filter: 'blur(100px)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl"
          >
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {isEn ? 'AI Content Studio' : 'AI Контент-Студія'}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 leading-[1.1]"
          >
            {isEn ? 'AI-Powered' : 'AI-Контент'}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {isEn ? 'Content Creation' : 'для Маркетингу'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {isEn
              ? 'AI influencers, video production, and UGC ads — without shoots, creators, or content bottlenecks.'
              : 'AI-інфлюенсери, відеопродакшн та UGC-реклама — без зйомок, креаторів та контентних "затичок".'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href={`${basePath}/contact`}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isEn ? 'Book a Demo' : 'Замовити демо'}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isEn ? 'Book a Demo' : 'Замовити демо'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="#services"
              className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {isEn ? 'Explore Services' : 'Дізнатись більше'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {isEn ? stat.valueEn : stat.valueUk}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {isEn ? stat.labelEn : stat.labelUk}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Our Services' : 'Наші послуги'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
              {isEn ? 'Choose Your ' : 'Оберіть ваш '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Content Solution' : 'контент-рішення'}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {isEn
                ? 'Three powerful AI content services to transform your marketing'
                : 'Три потужні AI контент-сервіси для трансформації вашого маркетингу'}
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  <Link href={`${basePath}/services/${service.slug}`}>
                    <div className={`relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/25 hover:${service.shadowColor} hover:shadow-2xl`}>
                      {/* Gradient top strip */}
                      <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

                      {/* Content */}
                      <div className="p-8">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Emoji */}
                        <div className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
                          {service.emoji}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors">
                          {isEn ? service.titleEn : service.titleUk}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-gray-400 mb-6">
                          {isEn ? service.subtitleEn : service.subtitleUk}
                        </p>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                          {(isEn ? service.featuresEn : service.featuresUk).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                          {isEn ? 'Learn more' : 'Дізнатись більше'}
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.05) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Use Cases' : 'Сценарії використання'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              {isEn ? 'Where AI Content ' : 'Де AI-контент '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Delivers Results' : 'дає результати'}
              </span>
            </h2>
          </motion.div>

          {/* Use Cases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{useCase.iconEmoji}</div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {isEn ? useCase.titleEn : useCase.titleUk}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isEn ? useCase.descEn : useCase.descUk}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(168,85,247,0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center p-12 md:p-16 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-purple-500/30 bg-purple-500/10">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">
                {isEn ? 'Ready to transform your content?' : 'Готові трансформувати ваш контент?'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              {isEn ? 'Start Creating with AI' : 'Почніть створювати з AI'}
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              {isEn
                ? 'Book a free consultation to see how AI content can scale your marketing'
                : 'Замовте безкоштовну консультацію, щоб побачити, як AI-контент може масштабувати ваш маркетинг'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`${basePath}/contact`}
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isEn ? 'Book Free Consultation' : 'Замовити безкоштовну консультацію'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
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
                <Palette className="w-4 h-4" />
                {isEn ? 'Custom solutions' : 'Кастомні рішення'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
