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

          {/* Right: Neural Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {(() => {
              const nodeCount = capabilities.length;
              const nodePositions = capabilities.map((_, i) => {
                const angle = (i * 360) / nodeCount - 90;
                const r = 41;
                return {
                  x: 50 + r * Math.cos((angle * Math.PI) / 180),
                  y: 50 + r * Math.sin((angle * Math.PI) / 180),
                };
              });

              const neuralConnections: Array<[number, number]> = [];
              for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                  neuralConnections.push([i, j]);
                }
              }

              return (
                <div className="relative w-full aspect-square max-w-[520px] mx-auto">
                  {/* Ambient glow behind entire network */}
                  <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.3) 0%, transparent 60%)',
                      filter: 'blur(60px)',
                    }}
                  />

                  {/* SVG Neural Connections */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 520 520" fill="none">
                    <defs>
                      <linearGradient id="neural-grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168,85,247,0.6)" />
                        <stop offset="100%" stopColor="rgba(236,72,153,0.6)" />
                      </linearGradient>
                      <linearGradient id="neural-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
                        <stop offset="100%" stopColor="rgba(6,182,212,0.6)" />
                      </linearGradient>
                      <linearGradient id="neural-grad-mixed" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
                        <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
                        <stop offset="100%" stopColor="rgba(236,72,153,0.4)" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Node-to-node connections */}
                    {neuralConnections.map(([a, b], idx) => {
                      const x1 = (nodePositions[a].x / 100) * 520;
                      const y1 = (nodePositions[a].y / 100) * 520;
                      const x2 = (nodePositions[b].x / 100) * 520;
                      const y2 = (nodePositions[b].y / 100) * 520;
                      const gradId = idx % 3 === 0 ? 'neural-grad-purple' : idx % 3 === 1 ? 'neural-grad-blue' : 'neural-grad-mixed';
                      return (
                        <motion.line
                          key={`conn-${a}-${b}`}
                          x1={x1} y1={y1} x2={x2} y2={y2}
                          stroke={`url(#${gradId})`}
                          strokeWidth="1.5"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={isInView ? { pathLength: 1, opacity: 0.35 } : {}}
                          transition={{ duration: 1.2, delay: 0.4 + idx * 0.06, ease: 'easeOut' }}
                        />
                      );
                    })}

                    {/* Center connections — from center to each node */}
                    {nodePositions.map((pos, i) => {
                      const x2 = (pos.x / 100) * 520;
                      const y2 = (pos.y / 100) * 520;
                      return (
                        <motion.line
                          key={`center-${i}`}
                          x1={260} y1={260} x2={x2} y2={y2}
                          stroke="url(#neural-grad-mixed)"
                          strokeWidth="2"
                          filter="url(#glow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        />
                      );
                    })}

                    {/* Animated signal pulses traveling along connections */}
                    {nodePositions.map((pos, i) => {
                      const x2 = (pos.x / 100) * 520;
                      const y2 = (pos.y / 100) * 520;
                      return (
                        <motion.circle
                          key={`pulse-${i}`}
                          r="3"
                          fill="white"
                          filter="url(#glow)"
                          initial={{ cx: 260, cy: 260, opacity: 0 }}
                          animate={isInView ? {
                            cx: [260, x2, 260],
                            cy: [260, y2, 260],
                            opacity: [0, 0.8, 0],
                          } : {}}
                          transition={{
                            duration: 3,
                            delay: 1.5 + i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      );
                    })}

                    {/* Synaptic dots at each connection midpoint */}
                    {neuralConnections.map(([a, b], idx) => {
                      const mx = ((nodePositions[a].x + nodePositions[b].x) / 2 / 100) * 520;
                      const my = ((nodePositions[a].y + nodePositions[b].y) / 2 / 100) * 520;
                      return (
                        <motion.circle
                          key={`synapse-${idx}`}
                          cx={mx} cy={my} r="2"
                          fill="rgba(168,85,247,0.6)"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? {
                            opacity: [0.3, 0.8, 0.3],
                            r: [1.5, 3, 1.5],
                          } : {}}
                          transition={{
                            duration: 2 + (idx % 3) * 0.5,
                            delay: 1 + idx * 0.08,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      );
                    })}

                    {/* Center glow */}
                    <motion.circle
                      cx={260} cy={260} r="40"
                      fill="rgba(168,85,247,0.15)"
                      filter="url(#glow)"
                      animate={{ r: [35, 45, 35], opacity: [0.15, 0.25, 0.15] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </svg>

                  {/* Center node (tile perfectly centered) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div
                        className="w-[90px] h-[90px] rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center"
                        style={{ boxShadow: '0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(59,130,246,0.3)' }}
                      >
                        <Brain className="w-11 h-11 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Center label (positioned under the tile) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[78px] z-10 text-center pointer-events-none">
                    <div className="text-lg font-bold text-white">AI Insider</div>
                    <div className="text-[11px] text-gray-500">
                      {isEn ? 'Neural Intelligence' : 'Нейронний інтелект'}
                    </div>
                  </div>

                  {/* Capability nodes */}
                  {capabilities.map((cap, i) => {
                    const Icon = cap.icon;
                    const pos = nodePositions[i];
                    return (
                      <motion.div
                        key={i}
                        className="absolute z-10"
                        style={{
                          top: `${pos.y}%`,
                          left: `${pos.x}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 2.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                          className="relative group"
                        >
                          {/* Node glow */}
                          <div
                            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle, ${cap.gradient.includes('purple') ? 'rgba(168,85,247,0.4)' : cap.gradient.includes('blue') ? 'rgba(59,130,246,0.4)' : cap.gradient.includes('orange') ? 'rgba(249,115,22,0.4)' : cap.gradient.includes('emerald') ? 'rgba(16,185,129,0.4)' : cap.gradient.includes('violet') ? 'rgba(139,92,246,0.4)' : 'rgba(244,63,94,0.4)'} 0%, transparent 70%)`,
                              filter: 'blur(10px)',
                            }}
                          />
                          <div
                            className={`relative w-[56px] h-[56px] rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center border border-white/25 transition-transform duration-300 group-hover:scale-110`}
                            style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Extra ambient particles scattered around */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                        background: i % 3 === 0 ? 'rgba(168,85,247,0.6)' : i % 3 === 1 ? 'rgba(59,130,246,0.6)' : 'rgba(236,72,153,0.6)',
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.8, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              );
            })()}
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
