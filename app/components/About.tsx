'use client';

import { Zap, Globe, Shield, Brain, Cpu, Workflow, Sparkles, Bot, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useReveal } from '@/app/hooks/useReveal';

const AMBIENT_PARTICLES = [
  { left: 18, top: 22 }, { left: 72, top: 35 }, { left: 45, top: 68 }, { left: 28, top: 55 },
  { left: 65, top: 18 }, { left: 52, top: 42 }, { left: 38, top: 78 }, { left: 78, top: 62 },
  { left: 22, top: 45 }, { left: 58, top: 28 }, { left: 35, top: 65 }, { left: 68, top: 52 },
];

const capabilities = [
  { icon: Bot, gradient: 'from-purple-500 to-pink-500', delay: 0 },
  { icon: MessageCircle, gradient: 'from-blue-500 to-cyan-500', delay: 100 },
  { icon: Workflow, gradient: 'from-orange-500 to-red-500', delay: 200 },
  { icon: Brain, gradient: 'from-emerald-500 to-teal-500', delay: 300 },
  { icon: Cpu, gradient: 'from-violet-500 to-indigo-500', delay: 400 },
  { icon: Sparkles, gradient: 'from-rose-500 to-pink-500', delay: 500 },
];

export default function About() {
  const { ref, isVisible } = useReveal();
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
    <section id="about" className="relative py-24 px-6 overflow-hidden content-visibility-auto">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.4) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`reveal ${isVisible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-purple-500/25 bg-purple-500/[0.08]">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                {isEn ? 'About AI Insider' : 'Про AI Insider'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-5 leading-tight">
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
            </h2>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
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
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              {isEn
                ? "We don't just automate tasks — we create AI systems that understand context, make decisions, and communicate naturally. From voice agents to workflow automations, we turn complexity into simplicity."
                : 'Ми не просто автоматизуємо задачі — ми створюємо AI-системи, які розуміють контекст, приймають рішення та комунікують природньо. Від голосових агентів до автоматизації процесів — ми перетворюємо складність на простоту.'}
            </p>

            <div className={`grid grid-cols-3 gap-4 mt-12 reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              {features.map((feature, index) => (
                <div key={index} className="group text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-3 transition-transform duration-300 group-hover:scale-110`}
                    style={{ boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold mb-1 text-white">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Neural Network */}
          <div className={`relative hidden lg:block reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <div className="relative w-full aspect-square max-w-[520px] mx-auto">
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.3) 0%, transparent 60%)',
                  filter: 'blur(60px)',
                }}
              />

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
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {neuralConnections.map(([a, b], idx) => {
                  const x1 = (nodePositions[a].x / 100) * 520;
                  const y1 = (nodePositions[a].y / 100) * 520;
                  const x2 = (nodePositions[b].x / 100) * 520;
                  const y2 = (nodePositions[b].y / 100) * 520;
                  const gradId = idx % 3 === 0 ? 'neural-grad-purple' : idx % 3 === 1 ? 'neural-grad-blue' : 'neural-grad-mixed';
                  return (
                    <line
                      key={`conn-${a}-${b}`}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={`url(#${gradId})`}
                      strokeWidth="1.5"
                      className="transition-opacity duration-700 ease-out"
                      style={{ opacity: isVisible ? 0.35 : 0, transitionDelay: `${400 + idx * 30}ms` }}
                    />
                  );
                })}

                {nodePositions.map((pos, i) => {
                  const x2 = (pos.x / 100) * 520;
                  const y2 = (pos.y / 100) * 520;
                  return (
                    <line
                      key={`center-${i}`}
                      x1={260} y1={260} x2={x2} y2={y2}
                      stroke="url(#neural-grad-mixed)"
                      strokeWidth="2"
                      filter="url(#glow)"
                      className="transition-opacity duration-700 ease-out"
                      style={{ opacity: isVisible ? 0.5 : 0, transitionDelay: `${300 + i * 90}ms` }}
                    />
                  );
                })}

                {neuralConnections.map(([a, b], idx) => {
                  const mx = ((nodePositions[a].x + nodePositions[b].x) / 2 / 100) * 520;
                  const my = ((nodePositions[a].y + nodePositions[b].y) / 2 / 100) * 520;
                  return (
                    <circle
                      key={`synapse-${idx}`}
                      cx={mx} cy={my} r="2"
                      fill="rgba(168,85,247,0.5)"
                      className="transition-opacity duration-700 ease-out"
                      style={{ opacity: isVisible ? 0.6 : 0, transitionDelay: `${1100 + idx * 25}ms` }}
                    />
                  );
                })}

                <circle cx={260} cy={260} r="40" fill="rgba(168,85,247,0.2)" filter="url(#glow)" />
              </svg>

              {/* Center node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="w-[90px] h-[90px] rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center"
                  style={{ boxShadow: '0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(59,130,246,0.3)' }}
                >
                  <Brain className="w-11 h-11 text-white" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[78px] z-10 text-center pointer-events-none">
                <div className="text-lg font-bold text-white">AI Insider</div>
                <div className="text-[11px] text-gray-500">
                  {isEn ? 'Neural Intelligence' : 'Нейронний інтелект'}
                </div>
              </div>

              {/* Capability nodes — CSS transitions only */}
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                const pos = nodePositions[i];
                return (
                  <div
                    key={i}
                    className="absolute z-10 transition-all duration-500 ease-out"
                    style={{
                      top: `${pos.y}%`,
                      left: `${pos.x}%`,
                      transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${500 + cap.delay}ms`,
                    }}
                  >
                    <div className="relative group">
                      <div
                        className={`relative w-[56px] h-[56px] rounded-2xl bg-gradient-to-br ${cap.gradient} flex items-center justify-center border border-white/25 transition-transform duration-300 group-hover:scale-110`}
                        style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {AMBIENT_PARTICLES.map((p, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full opacity-50"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    background: i % 3 === 0 ? 'rgba(168,85,247,0.6)' : i % 3 === 1 ? 'rgba(59,130,246,0.6)' : 'rgba(236,72,153,0.6)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
