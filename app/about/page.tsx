'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, Mail, Twitter, Zap, Target, Rocket, Users, Palette, Search, Share2, Sparkles, Bot } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import PageCTA from '../components/PageCTA';

type TeamMember = {
  id?: string;
  nameKey: string;
  roleKey: string;
  imageCandidates: string[];
  bioKey: string;
  social: { linkedin?: string; twitter?: string; instagram?: string; email?: string };
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'vladyslav-archer',
    nameKey: 'about.member1Name',
    roleKey: 'about.member1Role',
    imageCandidates: [
      '/images/team/hf_20260220_083203_481eab3a-8c9b-4bcf-8416-dc13dd09d3d7.jpeg',
      '/images/team/vladyslav-archer.jpg',
      '/images/team/vladyslav-archer.jpeg',
      '/images/team/vladyslav-archer.png',
      '/images/team/vladyslav-archer.webp',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    ],
    bioKey: 'about.member1Bio',
    social: {
      linkedin: 'https://www.linkedin.com/in/vladyslav-katash/',
      instagram: 'https://www.instagram.com/vladyslav.archer?igsh=MXc1c3hkODU5dW9hMQ%3D%3D&utm_source=qr',
      email: 'hello@aiinsider.it.com',
    },
  },
  {
    id: 'designer',
    nameKey: 'about.member2Name',
    roleKey: 'about.member2Role',
    imageCandidates: [],
    bioKey: 'about.member2Bio',
    social: {
      linkedin: 'https://linkedin.com',
      email: 'hello@aiinsider.it.com',
    },
  },
  {
    id: 'volodymyr',
    nameKey: 'about.member3Name',
    roleKey: 'about.member3Role',
    imageCandidates: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'],
    bioKey: 'about.member3Bio',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'hello@aiinsider.it.com',
    },
  },
];

function canLoadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function useResolvedImage(candidates: string[]): string {
  const initial = candidates[0] ?? '';
  const fallback = candidates[candidates.length - 1] ?? initial;
  const [src, setSrc] = useState<string>(initial);

  useEffect(() => {
    if (candidates.length === 0) {
      setSrc('');
      return;
    }

    let cancelled = false;

    async function run() {
      setSrc(initial);
      for (const candidate of candidates) {
        const ok = await canLoadImage(candidate);
        if (cancelled) return;
        if (ok) {
          setSrc(candidate);
          return;
        }
      }

      if (!cancelled) setSrc(fallback);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [candidates, initial, fallback]);

  return src;
}

const AI_ASSISTANTS = [
  {
    id: 'ai-design',
    nameKey: 'about.aiAssistant1Name',
    roleKey: 'about.aiAssistant1Role',
    bioKey: 'about.aiAssistant1Bio',
    icon: Palette,
    gradient: 'from-fuchsia-500 to-purple-600',
    glowColor: 'rgba(192, 38, 211, 0.4)',
    abilities: [
      { uk: 'Генерація лейаутів', en: 'Layout generation' },
      { uk: 'Підбір палітр', en: 'Color palette matching' },
      { uk: 'UI компоненти', en: 'UI components' },
    ],
  },
  {
    id: 'ai-seo',
    nameKey: 'about.aiAssistant2Name',
    roleKey: 'about.aiAssistant2Role',
    bioKey: 'about.aiAssistant2Bio',
    icon: Search,
    gradient: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    abilities: [
      { uk: 'Аналіз ключових слів', en: 'Keyword analysis' },
      { uk: 'Технічний SEO аудит', en: 'Technical SEO audit' },
      { uk: 'Контент-оптимізація', en: 'Content optimization' },
    ],
  },
  {
    id: 'ai-smm',
    nameKey: 'about.aiAssistant3Name',
    roleKey: 'about.aiAssistant3Role',
    bioKey: 'about.aiAssistant3Bio',
    icon: Share2,
    gradient: 'from-sky-500 to-blue-600',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    isNew: true,
    abilities: [
      { uk: 'Контент-календар', en: 'Content calendar' },
      { uk: 'Аналітика engagement', en: 'Engagement analytics' },
      { uk: 'Мульти-платформа', en: 'Multi-platform' },
    ],
  },
];

function AiAssistantsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t, lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-white/15 bg-white/5">
            <Bot className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t('about.aiAssistantsTitle')}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-white leading-[1.1]">
            {isEn ? 'Powered by' : 'Підсилені'}{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              AI
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {t('about.aiAssistantsSubtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {AI_ASSISTANTS.map((assistant, index) => {
            const Icon = assistant.icon;
            return (
              <motion.div
                key={assistant.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative"
              >
                <div
                  className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle, ${assistant.glowColor}, transparent 70%)` }}
                />

                <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-2">
                  <div className="relative px-8 pt-10 pb-8">
                    {'isNew' in assistant && assistant.isNew && (
                      <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-[10px] font-bold text-white uppercase tracking-widest">
                        {t('about.aiAssistantNewBadge')}
                      </div>
                    )}

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${assistant.gradient} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      style={{ boxShadow: `0 10px 40px ${assistant.glowColor}` }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-4">
                      <Sparkles className="w-3 h-3 text-white/50" />
                      <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                        {t(assistant.roleKey)}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-white">{t(assistant.nameKey)}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{t(assistant.bioKey)}</p>

                    <div className="space-y-2">
                      {assistant.abilities.map((ability, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${assistant.gradient} flex-shrink-0`} />
                          <span>{isEn ? ability.en : ability.uk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-2 h-2">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${assistant.gradient} animate-ping opacity-75`} />
                        <div className={`relative w-2 h-2 rounded-full bg-gradient-to-r ${assistant.gradient}`} />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {isEn ? 'Active 24/7' : 'Активний 24/7'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">AI-powered</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  const teamMembers = TEAM_MEMBERS;

  const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
    const imageSrc = useResolvedImage(member.imageCandidates);
    const name = t(member.nameKey);
    const initials =
      name
        .split(' ')
        .map((p) => p.trim())
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase() || 'AI';

    const gradients = [
      'from-blue-500/20 via-purple-500/10 to-transparent',
      'from-emerald-500/20 via-teal-500/10 to-transparent',
      'from-orange-500/20 via-red-500/10 to-transparent',
    ];

    return (
      <motion.div
        id={member.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={teamInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="group relative"
      >
        {/* Outer glow on hover */}
        <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
        
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/25 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
          {/* Top gradient accent */}
          <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${gradients[index % 3]} opacity-60`} />
          
          {/* Image container */}
          <div className="relative pt-8 px-8">
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-500" />
              <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 group-hover:border-white/20 transition-colors duration-500 group-hover:rotate-12" 
                style={{ transition: 'all 0.7s ease' }} />
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.02]">
                  <span className="text-5xl font-bold text-white/30 tracking-tight">{initials}</span>
                </div>

                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      e.currentTarget.dataset.loaded = 'true';
                    }}
                    className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out opacity-0 data-[loaded=true]:opacity-100"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-3 border-black shadow-lg shadow-green-500/50" />
            </div>
          </div>

          {/* Info section */}
          <div className="relative px-8 pt-8 pb-10 text-center">
            {/* Role badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                {t(member.roleKey)}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">{t(member.bioKey)}</p>

            {/* Social Links — Premium style */}
            <div className="flex justify-center gap-3">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group/social relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:border-white hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover/social:text-black transition-colors" />
                </a>
              )}

              {member.social.instagram ? (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group/social relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:border-transparent hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
                </a>
              ) : member.social.twitter ? (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="group/social relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:border-blue-500 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
                </a>
              ) : null}

              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  aria-label="Email"
                  className="group/social relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors" />
                </a>
              )}
            </div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-white/10 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    );
  };

  const industriesPoints = [
    'about.industriesPoint1',
    'about.industriesPoint2',
    'about.industriesPoint3',
    'about.industriesPoint4',
    'about.industriesPoint5',
  ];

  const whyDifferentPoints = [
    'about.whyDifferentPoint1',
    'about.whyDifferentPoint2',
    'about.whyDifferentPoint3',
    'about.whyDifferentPoint4',
  ];

  const howWeHelpSteps = [
    { titleKey: 'about.howWeHelpStep1Title', descKey: 'about.howWeHelpStep1Desc' },
    { titleKey: 'about.howWeHelpStep2Title', descKey: 'about.howWeHelpStep2Desc' },
    { titleKey: 'about.howWeHelpStep3Title', descKey: 'about.howWeHelpStep3Desc' },
    { titleKey: 'about.howWeHelpStep4Title', descKey: 'about.howWeHelpStep4Desc' },
  ];

  const geoFaq = [
    { qKey: 'about.geoQ1', aKey: 'about.geoA1' },
    { qKey: 'about.geoQ2', aKey: 'about.geoA2' },
    { qKey: 'about.geoQ3', aKey: 'about.geoA3' },
    { qKey: 'about.geoQ4', aKey: 'about.geoA4' },
  ];

  const definitions = isEn
    ? [
        {
          term: 'AI automation',
          desc: 'Automating business workflows with AI + integrations so routine work is handled end-to-end (not just answered in chat).',
        },
        {
          term: 'AI agent',
          desc: 'A system that can decide which tool to use (CRM, calendar, helpdesk) and execute actions with guardrails and logging.',
        },
        {
          term: 'AI voice agent',
          desc: 'A phone agent that speaks naturally, qualifies, books meetings, and writes outcomes to your CRM — with safe escalation.',
        },
        {
          term: 'n8n automation',
          desc: 'A workflow automation approach using triggers, webhooks, and integrations to connect tools, route leads, and enforce SLAs.',
        },
      ]
    : [
        {
          term: 'AI автоматизація',
          desc: 'Автоматизація бізнес‑процесів через AI + інтеграції, щоб рутинна робота виконувалась “під ключ”, а не лише в чаті.',
        },
        {
          term: 'AI агент',
          desc: 'Система, яка обирає інструменти (CRM, календар, підтримка) і виконує дії з гардрейлами та логуванням.',
        },
        {
          term: 'AI voice agent',
          desc: 'Голосовий агент, який веде дзвінок, кваліфікує, бронює зустрічі та пише результат у CRM — з безпечною ескалацією.',
        },
        {
          term: 'n8n автоматизація',
          desc: 'Побудова воркфлоу з тригерів, webhooks та інтеграцій для звʼязку інструментів, маршрутизації лідів і SLA‑контролю.',
        },
      ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Monochrome */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Elements - Monochrome */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium text-white">{t('about.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight text-white">
              {t('about.title1')}
              <span 
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('about.title2')}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section — Premium Design */}
      <section ref={storyRef} className="relative py-24 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          {/* Diagonal lines pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.1) 40px,
                rgba(255,255,255,0.1) 41px
              )`,
            }}
          />
          {/* Gradient orb */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left column — Story text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10 border border-white/15 bg-white/5 backdrop-blur-xl">
                <span className="text-lg">📖</span>
                <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                  {isEn ? 'Our journey' : 'Наш шлях'}
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-10 text-white leading-[1.1]">
                {t('about.ourStory')}{' '}
                <span className="relative inline-block">
                  <span 
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t('about.story')}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </span>
              </h2>

              {/* Story paragraphs with visual hierarchy */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative pl-6 border-l-2 border-white/20"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-white shadow-lg shadow-white/30" />
                  <p className="text-lg text-gray-300 leading-relaxed">{t('about.storyP1')}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="relative pl-6 border-l-2 border-white/10"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-white/50" />
                  <p className="text-gray-400 leading-relaxed">{t('about.storyP2')}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative pl-6 border-l-2 border-white/10"
                >
                  <div className="absolute left-0 top-0 w-2 h-2 -translate-x-[5px] rounded-full bg-white/50" />
                  <p className="text-gray-400 leading-relaxed">{t('about.storyP3')}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right column — Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-[2.5rem] blur-2xl" />
                
                <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-6 md:p-8 overflow-hidden">
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/20 rounded-tl-xl" />
                  <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/20 rounded-br-xl" />

                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                        {isEn ? 'Key metrics' : 'Ключові метрики'}
                      </span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: '50+', labelKey: 'about.stat1', icon: '🚀', color: 'from-blue-500/20 to-purple-500/20' },
                      { number: '95%', labelKey: 'about.stat2', icon: '⭐', color: 'from-emerald-500/20 to-teal-500/20' },
                      { number: '24/7', labelKey: 'about.stat3', icon: '⚡', color: 'from-orange-500/20 to-red-500/20' },
                      { number: '3x', labelKey: 'about.stat4', icon: '📈', color: 'from-violet-500/20 to-indigo-500/20' },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={storyInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className="group relative"
                      >
                        <div className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${stat.color} p-6 text-center transition-all duration-500 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)]`}>
                          {/* Icon */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-sm shadow-lg">
                              {stat.icon}
                            </div>
                          </div>

                          <div className="pt-4">
                            <div 
                              className="text-4xl md:text-5xl font-bold mb-2"
                              style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {stat.number}
                            </div>
                            <div className="text-sm text-gray-400">{t(stat.labelKey)}</div>
                          </div>

                          {/* Hover glow */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section — Premium Design */}
      <section ref={teamRef} className="relative py-24 px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Central glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-black" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-black" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-black" />
              </div>
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">{t('about.theTeam')}</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.meetThe')}{' '}
              <span className="relative inline-block">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                >
                  {t('about.minds')}
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </span>
              <br className="hidden md:block" />
              {t('about.behindAI')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.teamSubtitle')}
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.nameKey} member={member} index={index} />
            ))}
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={teamInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      </section>

      {/* AI Assistants Section */}
      <AiAssistantsSection />

      {/* GEO / AI Search Clarity — Premium Design */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 50%)',
              filter: 'blur(80px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header with animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/20 bg-white/5 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-semibold text-white tracking-wide">AI SEO / GEO</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.whoWeAreTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.whoWeAreSubtitle')}
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left panel — Summary (wider) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 group"
            >
              <div className="relative h-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.05)]">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 70%)',
                  }}
                />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                      <Zap className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                      {isEn ? 'In one sentence' : 'В одному реченні'}
                    </h3>
                  </div>

                  <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-10">
                    {t('about.geoIntro')}
                  </p>

                  {/* Explore links — redesigned */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">
                      {isEn ? 'Quick links' : 'Швидкі посилання'}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { href: `${basePath}/services`, label: isEn ? 'Services' : 'Послуги', featured: true },
                        { href: `${basePath}/cases`, label: isEn ? 'Cases' : 'Кейси' },
                        { href: `${basePath}/blog`, label: isEn ? 'Blog' : 'Блог' },
                        { href: `${basePath}/ai-automation-for-business`, label: isEn ? 'Automation' : 'Автоматизація' },
                        { href: `${basePath}/ai-voice-agents`, label: isEn ? 'Voice AI' : 'Voice AI' },
                        { href: `${basePath}/custom-ai-agents`, label: isEn ? 'AI Agents' : 'AI Агенти' },
                      ].map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                            l.featured 
                              ? 'bg-white text-black font-semibold hover:scale-105 hover:shadow-lg' 
                              : 'border border-white/15 text-gray-300 hover:border-white/30 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right panel — Definitions (wider) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    {isEn ? 'Key definitions' : 'Ключові визначення'}
                  </h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {definitions.map((d, idx) => (
                    <motion.div
                      key={d.term}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      {/* Number badge */}
                      <div className="absolute -top-3 -left-3 w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white/60">
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="text-base font-bold text-white mb-3 pt-1">{d.term}</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{d.desc}</div>
                      
                      {/* Hover arrow */}
                      <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white/60 text-sm">→</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How we help businesses — Premium Timeline Design */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/2 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Our process' : 'Наш процес'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.howWeHelpTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.howWeHelpSubtitle')}
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2" />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howWeHelpSteps.map((s, idx) => (
                <motion.div
                  key={s.titleKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group relative"
                >
                  <div className="relative rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 transition-all duration-500 hover:border-white/25 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]">
                    {/* Step number badge */}
                    <div className="absolute -top-5 left-8">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/20">
                          <span className="text-sm font-bold text-black">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        {/* Pulse effect */}
                        <div className="absolute inset-0 w-10 h-10 rounded-xl bg-white opacity-0 group-hover:opacity-30 animate-ping" />
                      </div>
                    </div>
                    
                    {/* Icon area with gradient */}
                    <div className="mt-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                        {idx === 0 && <Target className="w-6 h-6 text-white/70" />}
                        {idx === 1 && <Zap className="w-6 h-6 text-white/70" />}
                        {idx === 2 && <Rocket className="w-6 h-6 text-white/70" />}
                        {idx === 3 && <Users className="w-6 h-6 text-white/70" />}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">{t(s.titleKey)}</h3>
                    <p className="text-gray-400 leading-relaxed">{t(s.descKey)}</p>

                    {/* Decorative corner gradient */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle at bottom right, rgba(255,255,255,0.08) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href={`${basePath}/services`}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.25)' }}
            >
              <span className="relative z-10">{isEn ? 'Explore services' : 'Переглянути послуги'}</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-black">→</span>
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Industries we serve — Bento Grid Design */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Industries' : 'Індустрії'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.industriesTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.industriesSubtitle')}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industriesPoints.map((k, idx) => {
              const icons = ['🛒', '🏠', '💼', '🖥️', '📢'];
              const colors = [
                'from-blue-500/10 to-purple-500/10',
                'from-emerald-500/10 to-teal-500/10',
                'from-orange-500/10 to-red-500/10',
                'from-violet-500/10 to-indigo-500/10',
                'from-pink-500/10 to-rose-500/10',
              ];
              const isLarge = idx === 0 || idx === 3;

              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`group relative ${isLarge ? 'lg:col-span-2' : ''}`}
                >
                  <div className={`relative h-full rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${colors[idx]} backdrop-blur-xl p-8 overflow-hidden transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)]`}>
                    {/* Large emoji background */}
                    <div className="absolute -top-4 -right-4 text-[120px] opacity-[0.06] select-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.1]">
                      {icons[idx]}
                    </div>

                    <div className="relative">
                      {/* Icon badge */}
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 mb-6 text-2xl">
                        {icons[idx]}
                      </div>

                      <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                        {t(k)}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why AI Insider is different — Premium Card Design */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 50%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl">
              <span className="text-lg">✨</span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Our edge' : 'Наші переваги'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.whyDifferentTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.whyDifferentSubtitle')}
            </p>
          </motion.div>

          {/* Advantage Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {whyDifferentPoints.map((k, idx) => {
              const icons = ['🔒', '🛡️', '📊', '🌍'];
              const accents = [
                'group-hover:shadow-blue-500/10',
                'group-hover:shadow-emerald-500/10',
                'group-hover:shadow-orange-500/10',
                'group-hover:shadow-violet-500/10',
              ];

              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className={`relative h-full rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl p-8 overflow-hidden transition-all duration-500 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px] ${accents[idx]}`}>
                    {/* Checkmark badge */}
                    <div className="flex items-start gap-5">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-white/20">
                          <span className="text-2xl">{icons[idx]}</span>
                        </div>
                        {/* Success indicator */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-black flex items-center justify-center">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                          {t(k)}
                        </p>
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Q&A (GEO) */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {t('about.geoFaqTitle')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('about.geoFaqSubtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {geoFaq.map((qa, i) => (
              <details key={qa.qKey} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-white/15">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-6">
                  <span className="text-base font-bold text-white leading-snug">{t(qa.qKey)}</span>
                  <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0
                    group-open:rotate-45 transition-all duration-300 group-open:bg-white/10">
                    <span className="text-sm text-gray-400">+</span>
                  </span>
                </summary>
                <div className="px-6 pb-5 text-[15px] text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {t(qa.aKey)}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA />

      <Footer />
    </main>
  );
}
