'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Globe, Shield, Brain, Cpu, Workflow, Sparkles, Bot, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

const capabilities = [
  { icon: Bot, gradient: 'from-purple-500 to-pink-500', delay: 0 },
  { icon: MessageCircle, gradient: 'from-blue-500 to-cyan-500', delay: 0.8 },
  { icon: Workflow, gradient: 'from-orange-500 to-red-500', delay: 1.6 },
  { icon: Brain, gradient: 'from-emerald-500 to-teal-500', delay: 2.4 },
  { icon: Cpu, gradient: 'from-violet-500 to-indigo-500', delay: 3.2 },
  { icon: Sparkles, gradient: 'from-rose-500 to-pink-500', delay: 4.0 },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const features = [
    {
      icon: Zap,
      title: isEn ? 'Lightning Fast' : 'Блискавично',
      desc: isEn ? 'AI responses in milliseconds' : 'AI-відповіді за мілісекунди',
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Globe,
      title: isEn ? 'Global Reach' : 'Глобальний охват',
      desc: isEn ? 'Swiss quality, worldwide service' : 'Швейцарська якість, глобальний сервіс',
      gradient: 'from-purple-400 to-violet-500',
    },
    {
      icon: Shield,
      title: isEn ? 'Enterprise Security' : 'Корпоративна безпека',
      desc: isEn ? 'Your data stays yours' : 'Ваші дані — тільки ваші',
      gradient: 'from-emerald-400 to-green-500',
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.4) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                {isEn ? 'About AI Insider' : 'Про AI Insider'}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight"
            >
              {isEn ? 'Creative AI Studio' : 'Креативна AI-студія'}
              <span
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEn ? 'Building the Future' : 'що будує майбутнє'}
              </span>
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-300 mb-6 leading-relaxed"
            >
              {isEn ? (
                <>
                  <span className="text-purple-400 font-semibold">AI Insider</span> is a creative AI studio
                  based in <span className="text-blue-400 font-semibold">Switzerland</span>, building
                  intelligent automations and custom agents for forward-thinking brands.
                </>
              ) : (
                <>
                  <span className="text-purple-400 font-semibold">AI Insider</span> — це креативна AI-студія
                  з <span className="text-blue-400 font-semibold">Швейцарії</span>, яка створює
                  інтелектуальні автоматизації та кастомних AI-агентів для прогресивних брендів.
                </>
              )}
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-400 leading-relaxed"
            >
              {isEn
                ? "We don't just automate tasks — we create AI systems that understand context, make decisions, and communicate naturally. From voice agents to workflow automations, we turn complexity into simplicity."
                : 'Ми не просто автоматизуємо задачі — ми створюємо AI-системи, які розуміють контекст, приймають рішення та комунікують природньо. Від голосових агентів до автоматизації процесів — ми перетворюємо складність на простоту.'}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-12"
            >
              {features.map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1 text-white">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: AI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Outer glow ring */}
              <div
                className="absolute inset-8 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3), rgba(236,72,153,0.3), rgba(168,85,247,0.3))',
                  filter: 'blur(40px)',
                  animation: 'spin 12s linear infinite',
                }}
              />

              {/* Main circle */}
              <div className="absolute inset-12 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl">
                {/* Inner gradient ring */}
                <div
                  className="absolute inset-4 rounded-full border border-white/5"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.1) 0%, transparent 60%)',
                  }}
                />

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative"
                    >
                      <div
                        className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center mb-4"
                        style={{ boxShadow: '0 15px 50px rgba(168,85,247,0.4)' }}
                      >
                        <Brain className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>
                    <div className="text-xl font-bold text-white">AI Insider</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isEn ? 'Intelligence at scale' : 'Інтелект у масштабі'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting capability icons */}
              {capabilities.map((cap, i) => {
                const angle = (i * 360) / capabilities.length;
                const radius = 42;
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                      left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: cap.delay }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center border border-white/20 shadow-lg`}
                      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Decorative connecting lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                {capabilities.map((_, i) => {
                  const angle = (i * 360) / capabilities.length;
                  const radius = 210;
                  const x2 = 250 + radius * Math.cos((angle * Math.PI) / 180);
                  const y2 = 250 + radius * Math.sin((angle * Math.PI) / 180);
                  return (
                    <motion.line
                      key={i}
                      x1="250"
                      y1="250"
                      x2={x2}
                      y2={y2}
                      stroke="url(#line-gradient)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 0.2 } : {}}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(168,85,247,0.5)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Ambient particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
      `}</style>
    </section>
  );
}
