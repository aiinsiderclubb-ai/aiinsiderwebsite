'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Video, Users, Zap, CheckCircle, Star, Globe, Palette, TrendingUp, ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Image as ImageIcon } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { blogArticles, getBlogText } from '@/app/lib/blogData';
import { SEO_SERVICE_PAGES, getLocalizedSeo } from '@/app/lib/seoServicePages';

const services = [
  {
    slug: 'ai-influencers',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    emoji: '🎭',
    titleEn: 'AI Influencers',
    titleUk: 'AI-інфлюенсери',
    subtitleEn: 'Virtual personas for your brand',
    subtitleUk: 'Віртуальні персонажі для вашого бренду',
    featuresEn: ['24/7 content creation', 'Full brand control', 'Multilingual support', 'No contracts or fees'],
    featuresUk: ['Контент 24/7', 'Повний контроль бренду', 'Мультимовність', 'Без контрактів та гонорарів'],
    statValue: '3M+',
    statLabel: { en: 'followers generated', uk: 'згенерованих підписників' },
  },
  {
    slug: 'ai-video-production',
    icon: Video,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    emoji: '🎬',
    titleEn: 'AI Video Production',
    titleUk: 'AI-відеопродакшн',
    subtitleEn: 'Videos without cameras or crews',
    subtitleUk: 'Відео без камер і команд',
    featuresEn: ['AI avatars with lip-sync', 'Content repurposing', '10+ languages dubbing', 'A/B test variations'],
    featuresUk: ['AI-аватари з lip-sync', 'Repurposing контенту', 'Дубляж 10+ мов', 'A/B тест варіації'],
    statValue: '500+',
    statLabel: { en: 'videos/month', uk: 'відео/місяць' },
  },
  {
    slug: 'ai-ugc-content',
    icon: Sparkles,
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    emoji: '⚡',
    titleEn: 'AI UGC Content',
    titleUk: 'AI UGC-контент',
    subtitleEn: 'UGC ads at scale',
    subtitleUk: 'UGC-реклама у масштабі',
    featuresEn: ['100+ avatar diversity', 'Conversion-focused scripts', 'Platform-optimized', '5-10x cost reduction'],
    featuresUk: ['100+ різних аватарів', 'Скрипти під конверсії', 'Оптимізовано під платформи', 'Вартість у 5-10 разів нижча'],
    statValue: '80%',
    statLabel: { en: 'cost reduction', uk: 'економія витрат' },
  },
  {
    slug: 'ai-creative-studio',
    icon: ImageIcon,
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    emoji: '🎨',
    titleEn: 'AI Creative Studio',
    titleUk: 'AI Креативна студія',
    subtitleEn: 'Static creatives, banners and content without designers',
    subtitleUk: 'Статичні креативи, банери та контент без дизайнерів',
    featuresEn: ['Brand-consistent visuals', 'Product photography', 'Ad creatives at scale', 'Social media graphics'],
    featuresUk: ['Візуали у стилі бренду', 'Продуктова фотографія', 'Рекламні креативи у масштабі', 'Графіка для соцмереж'],
    statValue: '100+',
    statLabel: { en: 'creatives/month', uk: 'креативів/місяць' },
  },
];

const stats = [
  { valueEn: '10x', valueUk: '10x', labelEn: 'Content output', labelUk: 'Обсяг контенту', icon: '📈' },
  { valueEn: '5-10x', valueUk: '5-10x', labelEn: 'Cost savings', labelUk: 'Економія коштів', icon: '💰' },
  { valueEn: '24/7', valueUk: '24/7', labelEn: 'Content creation', labelUk: 'Створення контенту', icon: '⚡' },
  { valueEn: '10+', valueUk: '10+', labelEn: 'Languages', labelUk: 'Мов', icon: '🌍' },
];

const useCases = [
  { iconEmoji: '📱', titleEn: 'Social Media', titleUk: 'Соцмережі', descEn: 'TikTok, Reels, Shorts — daily content without a team', descUk: 'TikTok, Reels, Shorts — щоденний контент без команди', color: 'from-pink-500 to-rose-500' },
  { iconEmoji: '📢', titleEn: 'Paid Ads', titleUk: 'Платна реклама', descEn: 'UGC-style creatives for Meta, TikTok, YouTube', descUk: 'UGC-креативи для Meta, TikTok, YouTube', color: 'from-blue-500 to-indigo-500' },
  { iconEmoji: '🎓', titleEn: 'Education', titleUk: 'Навчання', descEn: 'Onboarding, tutorials, courses with AI instructors', descUk: 'Онбординг, tutorials, курси з AI-інструкторами', color: 'from-green-500 to-emerald-500' },
  { iconEmoji: '🌍', titleEn: 'Localization', titleUk: 'Локалізація', descEn: 'One script → 10+ languages with lip-sync', descUk: 'Один скрипт → 10+ мов з lip-sync', color: 'from-purple-500 to-violet-500' },
  { iconEmoji: '🛍️', titleEn: 'E-commerce', titleUk: 'E-commerce', descEn: 'Product demos, reviews, unboxings at scale', descUk: 'Демо продуктів, огляди, розпаковки у масштабі', color: 'from-orange-500 to-amber-500' },
  { iconEmoji: '💼', titleEn: 'B2B', titleUk: 'B2B', descEn: 'Video outreach, VSLs, case study videos', descUk: 'Відео-аутріч, VSL, відео-кейси', color: 'from-cyan-500 to-teal-500' },
];

const videoShowcase = [
  {
    id: 1,
    titleEn: 'AI Influencer Example',
    titleUk: 'Приклад AI-інфлюенсера',
    descEn: 'Virtual persona creating content for your brand',
    descUk: 'Віртуальний персонаж створює контент для вашого бренду',
    category: 'influencer',
    gradient: 'from-purple-600 to-pink-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    src: '/videos/ai-influencer.mp4',
    poster: '/posters/ai-influencer.jpg',
    duration: '0:30',
    views: '—',
  },
  {
    id: 2,
    titleEn: 'AI Video Example',
    titleUk: 'Приклад AI-відео',
    descEn: 'AI video production for ads, social, and product demos',
    descUk: 'AI-відеопродакшн для реклами, соцмереж і демо продуктів',
    category: 'video',
    gradient: 'from-blue-600 to-cyan-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    src: '/videos/ai-video.mp4',
    poster: '/posters/ai-video.jpg',
    duration: '0:30',
    views: '—',
  },
  {
    id: 3,
    titleEn: 'AI UGC Example',
    titleUk: 'Приклад AI UGC',
    descEn: 'UGC-style creatives at scale for performance marketing',
    descUk: 'UGC-креативи у масштабі для performance-маркетингу',
    category: 'ugc',
    gradient: 'from-orange-600 to-red-600',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    src: '/videos/ai-ugc.mp4',
    poster: '/posters/ai-ugc.jpg',
    duration: '0:30',
    views: '—',
  },
];

export default function AIContentCreationClient() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;
  const landingPage = SEO_SERVICE_PAGES['ai-content-creation'];
  const cleanLandingTitle = (title: string) => title.replace(/\s*\|\s*AI Insider$/, '').trim();
  const relatedLandingPages = Object.values(SEO_SERVICE_PAGES)
    .filter((page) => page.slug !== 'ai-content-creation')
    .map((page) => ({
      slug: page.slug,
      title: cleanLandingTitle(getLocalizedSeo(page.titleTag, lang)),
      description: getLocalizedSeo(page.metaDescription, lang),
    }));
  const relatedBlogArticles = landingPage.relatedBlogSlugs
    .map((articleSlug) => blogArticles.find((article) => article.slug === articleSlug))
    .filter((article): article is (typeof blogArticles)[number] => Boolean(article));
  
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const showcaseVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const carouselRef = useRef(null);
  const carouselInView = useInView(carouselRef, { once: true, margin: '-100px' });
  const heroParticles = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 2}s`,
      })),
    []
  );

  useEffect(() => {
    if (!isAutoplay || isPausedByUser) return;
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoShowcase.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoplay, isPausedByUser]);

  useEffect(() => {
    showcaseVideoRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === currentVideo) return;
      el.pause();
    });

    const active = showcaseVideoRefs.current[currentVideo];
    if (!active) return;

    if (isPausedByUser) {
      active.pause();
      setIsPlaying(false);
      return;
    }

    active
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // If play is blocked for any reason, keep UI consistent.
        setIsPlaying(!active.paused);
      });
  }, [currentVideo, isPausedByUser]);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoShowcase.length);
    setIsAutoplay(false);
    setIsPausedByUser(false);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videoShowcase.length) % videoShowcase.length);
    setIsAutoplay(false);
    setIsPausedByUser(false);
  };

  const toggleCurrentVideoPlayback = () => {
    const active = showcaseVideoRefs.current[currentVideo];
    if (!active) return;

    setIsAutoplay(false);

    if (active.paused) {
      setIsPausedByUser(false);
      active
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(!active.paused));
      return;
    }

    active.pause();
    setIsPausedByUser(true);
    setIsPlaying(false);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Content Factory cross-sell banner */}
      <div className="relative z-10 pt-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`${basePath}/content-factory`}
            className="group flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] hover:border-emerald-500/50 hover:bg-emerald-500/[0.12] transition-all duration-300"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-lg shrink-0">🔥</span>
              <span className="text-sm font-semibold text-emerald-300 truncate">
                {isEn
                  ? 'Want all of this on full autopilot? Check out Content Factory'
                  : 'Хочете все це на повному автопілоті? Подивіться на Content Factory'}
              </span>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold group-hover:bg-emerald-500/30 transition-colors">
              {isEn ? 'Explore →' : 'Переглянути →'}
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-8 pb-24 px-6 overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
              `,
            }}
          />
          <div
            className="absolute top-20 left-1/4 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 50%)',
              filter: 'blur(120px)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-20 right-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 50%)',
              filter: 'blur(100px)',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          />
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {heroParticles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animation: `twinkle ${particle.duration} ease-in-out infinite`,
                  animationDelay: particle.delay,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl"
              >
                <div className="relative flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <div className="absolute inset-0 blur-sm bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-50" />
                </div>
                <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  {isEn ? 'AI Content Studio' : 'AI Контент-Студія'}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.05]"
              >
                {isEn ? 'Create ' : 'Створюйте '}
                <span className="relative inline-block">
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 40%, #ec4899 80%, #a855f7 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'gradient-shift 4s ease infinite',
                    }}
                  >
                    {isEn ? 'Stunning' : 'вражаючий'}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full opacity-60" />
                </span>
                <br />
                {isEn ? 'AI Content' : 'AI-контент'}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed"
              >
                {isEn
                  ? 'AI influencers, video production, UGC ads and static creatives — without shoots, designers, or content bottlenecks.'
                  : 'AI-інфлюенсери, відеопродакшн, UGC-реклама та креативи — без зйомок, дизайнерів та контентних "затичок".'}
              </motion.p>

              {/* Service rows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="space-y-2.5 mb-10"
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.slug}
                      href={`${basePath}/services/${service.slug}`}
                      className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                        style={{ boxShadow: `0 4px 15px ${service.glowColor}` }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">
                          {isEn ? service.titleEn : service.titleUk}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {isEn ? service.subtitleEn : service.subtitleUk}
                        </div>
                      </div>
                      <div className="text-right shrink-0 hidden sm:block">
                        <span className="text-sm font-bold text-white">{service.statValue}</span>
                        <span className="text-xs text-gray-500 ml-1">{isEn ? service.statLabel.en : service.statLabel.uk}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors shrink-0" />
                    </Link>
                  );
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link
                  href={`${basePath}/contact`}
                  className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isEn ? 'Book a Demo' : 'Замовити демо'}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
                    {isEn ? 'Book a Demo' : 'Замовити демо'}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <Link
                  href="#showcase"
                  className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/40 flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-white/50" />
                  {isEn ? 'Watch Examples' : 'Дивитись приклади'}
                </Link>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-4 sm:gap-8"
              >
                {[
                  { value: '10x', label: isEn ? 'faster' : 'швидше' },
                  { value: '80%', label: isEn ? 'cost cut' : 'економія' },
                  { value: '24/7', label: isEn ? 'creation' : 'генерація' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-sm text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Mobile phone preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 block lg:hidden"
              >
                <div className="relative max-w-[260px] mx-auto">
                  <div className="absolute -inset-3 rounded-[2.5rem] opacity-40 blur-xl" style={{ background: `radial-gradient(circle, ${videoShowcase[currentVideo]?.glowColor || 'rgba(168,85,247,0.4)'} 0%, transparent 70%)`, transition: 'background 0.5s ease' }} />
                  <div className="relative rounded-[2.5rem] bg-gray-900 p-[6px] shadow-2xl" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}>
                    <div className="w-full rounded-[2.2rem] overflow-hidden relative bg-black">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-20" />
                      <div className="aspect-[9/16] relative overflow-hidden">
                        {videoShowcase.map((v, idx) => (
                          <video
                            key={`mobile-${v.id}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentVideo ? 'opacity-100' : 'opacity-0'}`}
                            src={v.src}
                            poster={v.poster}
                            muted
                            playsInline
                            loop
                            autoPlay={idx === currentVideo}
                            preload="metadata"
                          />
                        ))}
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute top-8 left-3 px-2.5 py-1 bg-red-500 rounded-full text-[10px] font-bold flex items-center gap-1 z-10">
                          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          LIVE
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                            <div>
                              <div className="font-bold text-[11px]">{isEn ? 'AI Creator' : 'AI-креатор'}</div>
                              <div className="text-[9px] text-gray-400">2.5M</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Phone with live video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex justify-center"
            >
              {/* Glow behind phone */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="w-[350px] h-[500px] rounded-full opacity-50 blur-[100px] transition-all duration-700"
                  style={{ background: `radial-gradient(circle, ${videoShowcase[currentVideo]?.glowColor || 'rgba(168,85,247,0.4)'} 0%, transparent 70%)` }}
                />
              </div>

              {/* Phone frame */}
              <div className="relative">
                <div
                  className="relative w-[300px] rounded-[3rem] bg-gray-900 p-[7px] shadow-2xl"
                  style={{ boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}
                >
                  <div className="w-full rounded-[2.6rem] overflow-hidden relative bg-black">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl z-20" />

                    {/* Video content */}
                    <div className="aspect-[9/16] relative overflow-hidden">
                      {videoShowcase.map((v, idx) => (
                        <video
                          key={`hero-${v.id}`}
                          ref={(el) => { showcaseVideoRefs.current[idx] = el; }}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentVideo ? 'opacity-100' : 'opacity-0'}`}
                          src={v.src}
                          poster={v.poster}
                          muted
                          playsInline
                          loop
                          autoPlay={!isPausedByUser && idx === currentVideo}
                          preload="metadata"
                        />
                      ))}

                      <div className="absolute inset-0 bg-black/10" />

                      {/* Top overlays */}
                      <div className="absolute top-10 left-4 px-3 py-1.5 bg-red-500 rounded-full text-xs font-bold flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        {isEn ? 'LIVE' : 'НАЖИВО'}
                      </div>
                      <div className="absolute top-10 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium z-10">
                        @ai_influencer
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${videoShowcase[currentVideo]?.gradient || 'from-purple-500 to-pink-500'}`} />
                          <div>
                            <div className="font-bold text-sm">{isEn ? 'AI Creator' : 'AI-креатор'}</div>
                            <div className="text-xs text-gray-400">{isEn ? '2.5M followers' : '2.5M підписників'}</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">
                          {isEn ? 'Creating content 24/7 without breaks' : 'Створює контент 24/7 без перерв'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side info card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-44 top-16 w-40 space-y-3"
                >
                  <div className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${videoShowcase[currentVideo]?.gradient || 'from-purple-500 to-pink-500'} text-sm font-bold shadow-lg transition-all duration-500`}>
                    {(() => {
                      const v = videoShowcase[currentVideo];
                      if (v?.category === 'influencer') return isEn ? '🎭 AI Influencer' : '🎭 AI-інфлюенсер';
                      if (v?.category === 'video') return isEn ? '🎬 AI Video' : '🎬 AI-відео';
                      return isEn ? '⚡ AI UGC' : '⚡ AI UGC';
                    })()}
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm">
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{isEn ? 'Metrics' : 'Показники'}</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs"><span className="text-gray-400">{isEn ? 'Engagement' : 'Залучення'}</span><span className="font-bold text-green-400">+340%</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-400">{isEn ? 'Content/mo' : 'Контент/міс'}</span><span className="font-bold text-white">500+</span></div>
                      <div className="flex justify-between text-xs"><span className="text-gray-400">{isEn ? 'Savings' : 'Економія'}</span><span className="font-bold text-white">80%</span></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {videoShowcase.map((v, idx) => (
                      <button
                        key={`badge-${v.id}`}
                        onClick={() => { setCurrentVideo(idx); setIsAutoplay(false); setIsPausedByUser(false); }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all duration-300 ${
                          idx === currentVideo
                            ? 'border-white/40 bg-white/15 text-white'
                            : 'border-white/10 bg-white/5 text-gray-500 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {v.category === 'influencer' ? (isEn ? 'AI Influencers' : 'AI-інфлюенсери') : v.category === 'video' ? (isEn ? 'AI Video' : 'AI-відео') : 'AI UGC'}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Floating badge left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-12 bottom-32 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30"
                >
                  {isEn ? '🎬 AI Video' : '🎬 AI-відео'}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-center p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {isEn ? stat.valueEn : stat.valueUk}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {isEn ? stat.labelEn : stat.labelUk}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase Carousel */}
      <section id="showcase" ref={carouselRef} className="relative py-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] opacity-20"
            style={{
              background: `radial-gradient(ellipse, ${videoShowcase[currentVideo]?.glowColor || 'rgba(168,85,247,0.3)'} 0%, transparent 60%)`,
              filter: 'blur(100px)',
              transition: 'background 0.5s ease',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={carouselInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Video Examples' : 'Приклади відео'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
              {isEn ? 'See AI Content in ' : 'Дивіться AI-контент '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Action' : 'в дії'}
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {isEn
                ? 'Real examples of AI-generated content for brands'
                : 'Реальні приклади AI-контенту для брендів'}
            </p>
          </motion.div>

          {/* Carousel — 9:16 portrait */}
          <div className="relative">
            <div className="relative max-w-sm mx-auto">
              {/* Navigation buttons */}
              <button
                onClick={prevVideo}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {(() => {
                const video = videoShowcase[currentVideo];
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Glow */}
                    <div
                      className="absolute -inset-6 rounded-[2.5rem] opacity-40 blur-2xl transition-all duration-700"
                      style={{ background: `radial-gradient(circle, ${video.glowColor} 0%, transparent 60%)` }}
                    />

                    {/* Phone frame */}
                    <div
                      className="relative rounded-[2.5rem] bg-gray-900 p-[7px] shadow-2xl mx-auto"
                      style={{ boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}
                    >
                      <div className="w-full rounded-[2.2rem] overflow-hidden relative bg-black">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-3xl z-20" />

                        <div className="aspect-[9/16] relative overflow-hidden">
                          {videoShowcase.map((v, idx) => (
                            <video
                              key={v.id}
                              ref={(el) => { showcaseVideoRefs.current[idx] = el; }}
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${idx === currentVideo ? 'opacity-100' : 'opacity-0'}`}
                              src={v.src}
                              poster={v.poster}
                              muted
                              playsInline
                              loop
                              autoPlay={!isPausedByUser && idx === currentVideo}
                              preload="metadata"
                            />
                          ))}

                          <div className="absolute inset-0 bg-black/15" />

                          {/* Play/Pause */}
                          <button
                            type="button"
                            aria-label={isPlaying ? (isEn ? 'Pause' : 'Пауза') : (isEn ? 'Play' : 'Відтворити')}
                            onClick={toggleCurrentVideoPlayback}
                            className="absolute inset-0 flex items-center justify-center z-10"
                          >
                            <span className="relative group">
                              <span className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-150 group-hover:scale-[1.75] transition-transform" />
                              <span className="relative w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                {isPlaying ? <Pause className="w-7 h-7 text-white" /> : <Play className="w-7 h-7 text-white fill-white ml-0.5" />}
                              </span>
                            </span>
                          </button>

                          {/* Top badges */}
                          <div className="absolute top-10 left-4 z-10">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${video.gradient} shadow-lg`}>
                              {video.category === 'influencer' && (isEn ? '🎭 AI Influencer' : '🎭 AI-інфлюенсер')}
                              {video.category === 'ugc' && (isEn ? '⚡ UGC' : '⚡ UGC')}
                              {video.category === 'video' && (isEn ? '🎬 AI Video' : '🎬 AI-відео')}
                            </span>
                          </div>
                          <div className="absolute top-10 right-4 z-10">
                            <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1">
                              <Play className="w-3 h-3" /> {video.duration}
                            </span>
                          </div>

                          {/* Bottom info */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10">
                            <h3 className="text-lg font-bold mb-1">{isEn ? video.titleEn : video.titleUk}</h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{isEn ? video.descEn : video.descUk}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Thumbnail cards */}
            <div className="mt-10 flex items-center justify-center gap-4">
              {videoShowcase.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => { setCurrentVideo(index); setIsAutoplay(false); setIsPausedByUser(false); }}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    index === currentVideo ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-90 hover:scale-[1.02]'
                  }`}
                >
                  <div className={`w-24 h-14 sm:w-32 sm:h-20 bg-gradient-to-br ${video.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                      <Play className={`w-5 h-5 text-white/90 ${index === currentVideo ? 'fill-white/50' : ''}`} />
                      <span className="text-[10px] font-semibold text-white/80">
                        {video.category === 'influencer' ? '🎭' : video.category === 'video' ? '🎬' : '⚡'}
                        {' '}{isEn ? video.titleEn.replace('AI ', '').replace(' Example', '') : video.titleUk.replace('Приклад ', '')}
                      </span>
                    </div>
                    {index === currentVideo && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Autoplay control */}
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => { const next = !isAutoplay; setIsAutoplay(next); if (next) setIsPausedByUser(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoplay ? (isEn ? 'Pause' : 'Пауза') : (isEn ? 'Autoplay' : 'Автопрогравання')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section id="services" className="relative py-20 px-6 overflow-hidden">
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
          </motion.div>

          {/* Service Cards - Premium Bento Style */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${service.glowColor}, transparent)` }}
                  />
                  
                  <Link href={`${basePath}/services/${service.slug}`}>
                    <div className="relative h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/20">
                      {/* Gradient top strip */}
                      <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

                      {/* Content */}
                      <div className="p-8">
                        {/* Header with icon and stat */}
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}
                            style={{ boxShadow: `0 10px 40px ${service.glowColor}` }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{service.statValue}</div>
                            <div className="text-xs text-gray-500">{isEn ? service.statLabel.en : service.statLabel.uk}</div>
                          </div>
                        </div>

                        {/* Emoji background */}
                        <div className="absolute top-8 right-8 text-6xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                          {service.emoji}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-3 text-white">
                          {isEn ? service.titleEn : service.titleUk}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-gray-400 mb-6">
                          {isEn ? service.subtitleEn : service.subtitleUk}
                        </p>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                          {(isEn ? service.featuresEn : service.featuresUk).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-3 text-sm text-gray-400">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <div className={`flex items-center gap-2 font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                          {isEn ? 'Learn more' : 'Дізнатись більше'}
                          <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" />
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

      {/* Use Cases Section - Enhanced */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 50%)',
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

          {/* Use Cases Grid - Bento Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-2xl">{useCase.iconEmoji}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {isEn ? useCase.titleEn : useCase.titleUk}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {isEn ? useCase.descEn : useCase.descUk}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'From the blog' : 'З блогу'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
              {isEn ? 'Related Articles' : 'Корисні статті'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`${basePath}/blog/${article.slug}`}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{article.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      {getBlogText(article.category, lang)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {getBlogText(article.h1, lang)}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {getBlogText(article.metaDescription, lang)}
                  </p>
                  <div className="mt-5 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                    {isEn ? 'Read article →' : 'Читати статтю →'}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 border border-white/15 bg-white/5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Explore Related Solutions' : 'Схожі рішення'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
              {isEn ? 'Explore Related Solutions' : 'Схожі рішення'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {relatedLandingPages.map((page, index) => (
              <motion.div
                key={page.slug}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative"
              >
                <Link href={`${basePath}/${page.slug}`}>
                  <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {page.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {page.description}
                    </p>
                    <div className="mt-5 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                      {isEn ? 'Open solution →' : 'Перейти до сторінки →'}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={`${basePath}/solutions`}
              className="text-sm font-semibold text-gray-400 transition-colors hover:text-white"
            >
              {isEn ? 'See all AI solutions for your industry →' : 'Переглянути всі AI-рішення для вашої галузі →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Content Factory cross-sell block */}
      <section className="relative py-16 px-6 overflow-hidden border-t border-white/5">
        <div className="relative max-w-6xl mx-auto">
          <div className="relative rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.07] to-teal-500/[0.04] p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div
              className="absolute -right-20 -top-20 w-72 h-72 rounded-full pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 65%)', filter: 'blur(60px)' }}
            />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border border-emerald-500/30 bg-emerald-500/10">
                  <span className="text-lg">🏭</span>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Content Factory</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {isEn
                    ? 'Want a system that combines everything automatically?'
                    : 'Хочете систему що обʼєднує все автоматично?'}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {isEn
                    ? 'Content Factory is a fully automated AI system: it finds viral ideas, writes posts, creates videos and publishes across all social media. 500+ posts per month — you just tap Approve in Telegram.'
                    : 'Content Factory — це повністю автоматизована AI система: знаходить вірусні ідеї, пише пости, створює відео та публікує у всі соцмережі. 500+ постів на місяць — ви лише натискаєте Схвалити в Telegram.'}
                </p>
              </div>
              <Link
                href={`${basePath}/content-factory`}
                className="shrink-0 inline-flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                {isEn ? 'Learn about Content Factory' : 'Дізнатися про Content Factory'}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(168,85,247,0.4) 0%, transparent 60%)',
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
            {/* Outer glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-[3rem] blur-xl" />
            
            <div className="relative text-center p-10 md:p-12 rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.1] to-white/[0.02] backdrop-blur-xl">
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
                  className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.5)]"
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
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
