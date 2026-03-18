'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Video, Sparkles, Play, Pause, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const services = [
  {
    slug: 'ai-influencers',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    titleEn: 'AI Influencers',
    titleUk: 'AI-інфлюенсери',
    descEn: 'Virtual personas for your brand',
    descUk: 'Віртуальні персонажі для бренду',
    statValue: '3M+',
    statLabel: { en: 'followers', uk: 'підписників' },
  },
  {
    slug: 'ai-video-production',
    icon: Video,
    gradient: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    titleEn: 'AI Video',
    titleUk: 'AI-відео',
    descEn: 'Videos without cameras or crews',
    descUk: 'Відео без камер і команд',
    statValue: '500+',
    statLabel: { en: 'videos/mo', uk: 'відео/міс' },
  },
  {
    slug: 'ai-ugc-content',
    icon: Sparkles,
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    titleEn: 'AI UGC',
    titleUk: 'AI UGC',
    descEn: 'UGC ads at scale',
    descUk: 'UGC-реклама у масштабі',
    statValue: '80%',
    statLabel: { en: 'cost cut', uk: 'економія' },
  },
  {
    slug: 'ai-creative-studio',
    icon: ImageIcon,
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    titleEn: 'AI Creative Studio',
    titleUk: 'AI Креативна студія',
    descEn: 'Static creatives & banners without designers',
    descUk: 'Креативи та банери без дизайнерів',
    statValue: '100+',
    statLabel: { en: 'creatives/mo', uk: 'креативів/міс' },
  },
];

const videoExamples = [
  {
    id: 1,
    titleEn: 'AI Influencer',
    titleUk: 'AI-інфлюенсер',
    gradient: 'from-purple-600 to-pink-600',
    category: '🎭',
    src: '/videos/ai-influencer.mp4',
    poster: '/posters/ai-influencer.jpg',
  },
  {
    id: 2,
    titleEn: 'UGC Ad',
    titleUk: 'UGC реклама',
    gradient: 'from-orange-600 to-red-600',
    category: '⚡',
    src: '/videos/ai-ugc.mp4',
    poster: '/posters/ai-ugc.jpg',
  },
  {
    id: 3,
    titleEn: 'Product Demo',
    titleUk: 'Демо продукту',
    gradient: 'from-blue-600 to-cyan-600',
    category: '🎬',
    src: '/videos/ai-video.mp4',
    poster: '/posters/ai-video.jpg',
  },
];

export default function AIContentStudio() {
  const sectionRef = useRef(null);
  const inViewOnce = useInView(sectionRef, { once: true, margin: '-100px' });
  const isOnScreen = useInView(sectionRef, { once: false, amount: 0.25 });
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const basePath = `/${lang}`;

  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const phoneVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (!isOnScreen || isPausedByUser) return;
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOnScreen, isPausedByUser]);

  useEffect(() => {
    // Never autoplay / churn videos while offscreen
    if (!isOnScreen) {
      phoneVideoRefs.current.forEach((el) => el?.pause());
      if (!isPausedByUser) setIsPlaying(false);
      return;
    }

    phoneVideoRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (idx === currentVideo) return;
      el.pause();
    });

    const active = phoneVideoRefs.current[currentVideo];
    if (!active) return;

    if (isPausedByUser) {
      active.pause();
      setIsPlaying(false);
      return;
    }

    active
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(!active.paused));
  }, [currentVideo, isOnScreen, isPausedByUser]);

  const togglePhonePlayback = () => {
    const active = phoneVideoRefs.current[currentVideo];
    if (!active) return;

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
    <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden content-visibility-auto">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[350px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-center">
          {/* Left: Content — 3 cols */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inViewOnce ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl">
                <div className="relative flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  {isEn ? 'AI Content Studio' : 'AI Контент-Студія'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 leading-[1.1]">
                {isEn ? 'AI-Powered ' : 'AI-контент '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #ec4899 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradient-shift 4s ease infinite',
                  }}
                >
                  {isEn ? 'Content Creation' : 'для маркетингу'}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-base text-gray-400 mb-6 max-w-lg">
                {isEn
                  ? 'AI influencers, video production, UGC ads and static creatives — without shoots, designers, or content bottlenecks'
                  : 'AI-інфлюенсери, відеопродакшн, UGC-реклама та креативи — без зйомок, дизайнерів та контентних "затичок"'}
              </p>
            </motion.div>

            {/* Service Cards */}
            <div className="space-y-2 mb-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inViewOnce ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                  >
                    <Link href={`${basePath}/services/${service.slug}`} className="group block">
                      <div className="relative flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(135deg, ${service.glowColor} 0%, transparent 100%)`,
                            filter: 'blur(20px)',
                          }}
                        />
                        <div className={`relative w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm truncate">
                              {isEn ? service.titleEn : service.titleUk}
                            </h3>
                            <div className="flex items-center gap-1 text-xs">
                              <span className="font-bold text-white">{service.statValue}</span>
                              <span className="text-gray-500 hidden sm:inline">{isEn ? service.statLabel.en : service.statLabel.uk}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 truncate">
                            {isEn ? service.descEn : service.descUk}
                          </p>
                        </div>
                        <ArrowRight className="relative w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA + Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inViewOnce ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <Link
                href={`${basePath}/ai-content-creation`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              >
                {isEn ? 'Explore AI Content' : 'Дізнатись більше'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={`${basePath}/ai-content-creation#showcase`}
                className="group inline-flex items-center gap-2 px-4 py-3 text-white/60 hover:text-white font-semibold text-sm transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                {isEn ? 'Watch examples' : 'Дивитись приклади'}
              </Link>
            </motion.div>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inViewOnce ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6"
            >
              {[
                { value: '10x', label: isEn ? 'content' : 'контенту' },
                { value: '80%', label: isEn ? 'cost cut' : 'економія' },
                { value: '10+', label: isEn ? 'languages' : 'мов' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-gray-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockup with info panel — 2 cols, visible from md */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inViewOnce ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2 hidden md:flex items-center justify-center gap-4"
          >
            {/* Phone mockup */}
            <div className="relative shrink-0">
              {/* Glow */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] opacity-40 blur-2xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${services[currentVideo % 3].glowColor} 0%, transparent 100%)`,
                }}
              />

              {/* Phone frame */}
              <div className="relative w-[210px] lg:w-[240px]">
                <div className="relative rounded-[2rem] border-[3px] border-white/15 bg-black overflow-hidden shadow-2xl shadow-purple-500/20">
                  {/* Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20" />

                  {/* Video content */}
                  <div className="aspect-[9/19] relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${videoExamples[currentVideo].gradient}`}>
                      {videoExamples.map((v, idx) => (
                        <video
                          key={v.id}
                          ref={(el) => {
                            phoneVideoRefs.current[idx] = el;
                          }}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            idx === currentVideo ? 'opacity-100' : 'opacity-0'
                          }`}
                          src={v.src}
                          poster={v.poster}
                          muted
                          playsInline
                          loop
                          autoPlay={isOnScreen && !isPausedByUser && idx === currentVideo}
                          preload={isOnScreen ? 'metadata' : 'none'}
                        />
                      ))}

                      <div className="absolute inset-0 bg-black/20" />

                      {/* Play/Pause */}
                      <button
                        type="button"
                        aria-label={isPlaying ? (isEn ? 'Pause' : 'Пауза') : (isEn ? 'Play' : 'Відтворити')}
                        onClick={togglePhonePlayback}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="relative">
                          <span className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse" />
                          <span className="relative w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-white" />
                            ) : (
                              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                            )}
                          </span>
                        </span>
                      </button>

                      {/* Live badge */}
                      <div className="absolute top-7 left-3 flex items-center gap-1.5 pointer-events-none">
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/90 backdrop-blur-sm rounded-full text-[9px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {isEn ? 'LIVE' : 'НАЖИВО'}
                        </span>
                      </div>
                      
                      {/* Username badge */}
                      <div className="absolute top-7 right-3 pointer-events-none">
                        <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-[9px] font-medium text-white/80">
                          @ai_influencer
                        </span>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                          <div>
                            <div className="font-bold text-[10px]">
                              {isEn ? 'AI Creator' : 'AI-креатор'}
                            </div>
                            <div className="text-[8px] text-gray-400">
                              2.5M {isEn ? 'followers' : 'підписників'}
                            </div>
                          </div>
                        </div>
                        <div className="text-[9px] text-white/70 line-clamp-2">
                          {isEn ? 'Creating content 24/7 without breaks' : 'Створює контент 24/7 без перерв'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {videoExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentVideo(index);
                        setIsPausedByUser(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentVideo
                          ? 'bg-white w-4'
                          : 'bg-white/30 w-1.5 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Floating badge left */}
                <div className="absolute -left-4 bottom-1/3 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-[9px] font-bold shadow-lg shadow-blue-500/30 animate-bounce" style={{ animationDuration: '3s' }}>
                  {isEn ? '🎬 AI-video' : '🎬 AI-відео'}
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="relative flex flex-col gap-3 max-w-[160px]">
              {/* Panel glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl" />
              
              {/* Floating influencer badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative px-3 py-2 rounded-xl border border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎭</span>
                  <span className="text-[11px] font-bold text-pink-300">
                    {isEn ? 'AI-influencer' : 'AI-інфлюенсер'}
                  </span>
                </div>
              </motion.div>

              {/* Stats card */}
              <div className="relative px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  {isEn ? 'Performance' : 'Показники'}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{isEn ? 'Engagement' : 'Залучення'}</span>
                    <span className="text-[11px] font-bold text-green-400">+340%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{isEn ? 'Content/mo' : 'Контент/міс'}</span>
                    <span className="text-[11px] font-bold text-white">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{isEn ? 'Cost saved' : 'Економія'}</span>
                    <span className="text-[11px] font-bold text-purple-400">80%</span>
                  </div>
                </div>
              </div>

              {/* Category tags */}
              <div className="relative flex flex-wrap gap-1.5">
                {services.slice(0, 3).map((s, i) => (
                  <motion.span
                    key={s.slug}
                    animate={{ scale: currentVideo === i ? 1.05 : 1 }}
                    className={`px-2 py-1 rounded-full text-[9px] font-medium border transition-all duration-300 cursor-pointer ${
                      currentVideo === i
                        ? `bg-gradient-to-r ${s.gradient} border-transparent text-white shadow-lg`
                        : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                    }`}
                    onClick={() => {
                      setCurrentVideo(i);
                      setIsPausedByUser(false);
                    }}
                  >
                    {isEn ? s.titleEn : s.titleUk}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
