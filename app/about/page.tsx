'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, Mail, Twitter, Zap, Target, Rocket, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

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
    imageCandidates: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face'],
    bioKey: 'about.member2Bio',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
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
    let cancelled = false;

    async function run() {
      setSrc(initial);
      for (const candidate of candidates) {
        // Only check existence client-side.
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

export default function AboutPage() {
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });

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

    return (
      <motion.div
        id={member.id}
        initial={{ opacity: 0, y: 30 }}
        animate={teamInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative"
      >
        <div className="glass-strong rounded-3xl p-6 border border-white/10 
          transition-all duration-300 hover:border-white/30 hover:-translate-y-2">
          {/* Image */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl 
              transition-opacity duration-300 group-hover:opacity-10" />
            <div className="relative w-full aspect-square rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]">
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-white/15 tracking-tight">{initials}</span>
              </div>
              <img
                src={imageSrc}
                alt={name}
                loading="lazy"
                decoding="async"
                onLoad={(e) => {
                  e.currentTarget.dataset.loaded = 'true';
                }}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500
                  opacity-0 data-[loaded=true]:opacity-100"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1 text-white">{name}</h3>
            <p className="text-white/70 font-semibold mb-4">
              {t(member.roleKey)}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t(member.bioKey)}</p>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center 
                    transition-all duration-200 hover:bg-white/10 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              )}

              {member.social.instagram ? (
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center 
                    transition-all duration-200 hover:bg-white/10 hover:scale-110"
                >
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              ) : member.social.twitter ? (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center 
                    transition-all duration-200 hover:bg-white/10 hover:scale-110"
                >
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              ) : null}

              {member.social.email && (
                <a
                  href={`mailto:${member.social.email}`}
                  aria-label="Email"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center 
                    transition-all duration-200 hover:bg-white/10 hover:scale-110"
                >
                  <Mail className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const values = [
    {
      icon: Zap,
      titleKey: 'about.value1Title',
      descKey: 'about.value1Desc',
    },
    {
      icon: Target,
      titleKey: 'about.value2Title',
      descKey: 'about.value2Desc',
    },
    {
      icon: Rocket,
      titleKey: 'about.value3Title',
      descKey: 'about.value3Desc',
    },
    {
      icon: Users,
      titleKey: 'about.value4Title',
      descKey: 'about.value4Desc',
    },
  ];

  const whatWeDoPoints = [
    'about.whatWeDoPoint1',
    'about.whatWeDoPoint2',
    'about.whatWeDoPoint3',
    'about.whatWeDoPoint4',
    'about.whatWeDoPoint5',
    'about.whatWeDoPoint6',
  ];

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

  const technologyTags = [
    'n8n',
    'RAG',
    'Tool-use agents',
    'OpenAI / GPT',
    'Whisper / STT',
    'TTS',
    'Webhooks',
    'CRM',
    'HubSpot',
    'Salesforce',
    'Pipedrive',
    'Twilio',
    'WhatsApp Business API',
    'Next.js',
    'TypeScript',
    'PostgreSQL',
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

      {/* Our Story Section - Monochrome */}
      <section ref={storyRef} className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                {t('about.ourStory')} <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{t('about.story')}</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{t('about.storyP1')}</p>
                <p>{t('about.storyP2')}</p>
                <p>{t('about.storyP3')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '50+', labelKey: 'about.stat1' },
                    { number: '95%', labelKey: 'about.stat2' },
                    { number: '24/7', labelKey: 'about.stat3' },
                    { number: '3x', labelKey: 'about.stat4' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <div 
                        className="text-4xl font-bold mb-2"
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
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GEO / AI Search Clarity — Premium Design */}
      <section className="relative py-32 px-6 overflow-hidden">
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
            className="text-center mb-20"
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

      {/* What we do — Premium Design */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column — What we build */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/15 bg-white/5">
                <Rocket className="w-4 h-4 text-white/70" />
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  {isEn ? 'What we build' : 'Що ми будуємо'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-8 text-white leading-[1.1]">
                {t('about.whatWeDoTitle')}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-10 font-light">
                {t('about.whatWeDoSubtitle')}
              </p>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-6">
                {t('about.whatWeDoP1')}
              </p>

              <div className="space-y-4">
                {whatWeDoPoints.map((k, idx) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-5 transition-all duration-300 hover:border-white/20 hover:from-white/[0.08]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <span className="text-sm font-bold text-black">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="text-gray-300 leading-relaxed pt-2.5">{t(k)}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — ROI Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/10 bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {isEn ? 'Where AI pays off fastest' : 'Де AI дає найбільший ефект'}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {isEn
                          ? 'Business goals → solutions → measurable outcomes'
                          : 'Бізнес-цілі → рішення → вимірювані результати'}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-400">{isEn ? 'ROI Matrix' : 'Матриця ROI'}</span>
                    </div>
                  </div>
                </div>

                {/* Table content — Card-based for mobile */}
                <div className="p-6 md:p-8">
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          <th className="pb-4 pr-6 text-xs font-bold uppercase tracking-[0.15em] text-white/50">{isEn ? 'Business goal' : 'Ціль бізнесу'}</th>
                          <th className="pb-4 pr-6 text-xs font-bold uppercase tracking-[0.15em] text-white/50">{isEn ? 'What we build' : 'Що ми будуємо'}</th>
                          <th className="pb-4 text-xs font-bold uppercase tracking-[0.15em] text-white/50">{isEn ? 'Outcome' : 'Результат'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            goal: isEn ? 'More qualified leads' : 'Більше кваліфікованих лідів',
                            build: isEn ? 'Lead routing + scoring + follow-up automation' : 'Маршрутизація + скоринг + follow-up',
                            outcome: isEn ? 'Faster response, higher conversion' : 'Швидша реакція, вища конверсія',
                            icon: '📈',
                          },
                          {
                            goal: isEn ? '24/7 customer support' : 'Підтримка 24/7',
                            build: isEn ? 'RAG chatbot + helpdesk integration' : 'RAG чатбот + інтеграція helpdesk',
                            outcome: isEn ? 'Lower load, consistent answers' : 'Менше навантаження, стабільність',
                            icon: '💬',
                          },
                          {
                            goal: isEn ? 'More booked meetings' : 'Більше зустрічей',
                            build: isEn ? 'AI voice agent + calendar booking' : 'AI voice agent + бронювання',
                            outcome: isEn ? 'Higher booking rate, fewer no-shows' : 'Більше бронювань, менше no-shows',
                            icon: '📞',
                          },
                          {
                            goal: isEn ? 'Clean ops and CRM' : 'Чиста операційка та CRM',
                            build: isEn ? 'n8n workflows + SLA alerts' : 'n8n воркфлоу + SLA алерти',
                            outcome: isEn ? 'Fewer errors, reliable reporting' : 'Менше помилок, надійна звітність',
                            icon: '⚡',
                          },
                        ].map((r, i) => (
                          <tr key={i} className="group border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="py-5 pr-6">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{r.icon}</span>
                                <span className="text-gray-200 font-medium">{r.goal}</span>
                              </div>
                            </td>
                            <td className="py-5 pr-6 text-gray-400">{r.build}</td>
                            <td className="py-5">
                              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                {r.outcome}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden space-y-4">
                    {[
                      {
                        goal: isEn ? 'More qualified leads' : 'Більше кваліфікованих лідів',
                        build: isEn ? 'Lead routing + scoring + follow-up automation' : 'Маршрутизація + скоринг + follow-up',
                        outcome: isEn ? 'Faster response, higher conversion' : 'Швидша реакція, вища конверсія',
                        icon: '📈',
                      },
                      {
                        goal: isEn ? '24/7 customer support' : 'Підтримка 24/7',
                        build: isEn ? 'RAG chatbot + helpdesk integration' : 'RAG чатбот + інтеграція helpdesk',
                        outcome: isEn ? 'Lower load, consistent answers' : 'Менше навантаження, стабільність',
                        icon: '💬',
                      },
                      {
                        goal: isEn ? 'More booked meetings' : 'Більше зустрічей',
                        build: isEn ? 'AI voice agent + calendar booking' : 'AI voice agent + бронювання',
                        outcome: isEn ? 'Higher booking rate, fewer no-shows' : 'Більше бронювань, менше no-shows',
                        icon: '📞',
                      },
                      {
                        goal: isEn ? 'Clean ops and CRM' : 'Чиста операційка та CRM',
                        build: isEn ? 'n8n workflows + SLA alerts' : 'n8n воркфлоу + SLA алерти',
                        outcome: isEn ? 'Fewer errors, reliable reporting' : 'Менше помилок, надійна звітність',
                        icon: '⚡',
                      },
                    ].map((r, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{r.icon}</span>
                          <span className="text-white font-semibold">{r.goal}</span>
                        </div>
                        <p className="text-sm text-gray-400">{r.build}</p>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          {r.outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How we help businesses — Premium Timeline Design */}
      <section className="relative py-32 px-6 overflow-hidden">
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
            className="text-center mb-20"
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
      <section className="relative py-32 px-6 overflow-hidden">
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
            className="text-center mb-20"
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

      {/* Technologies we use — Floating Tags Design */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/15 bg-white/5 backdrop-blur-xl">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                {isEn ? 'Tech stack' : 'Технології'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-8 text-white leading-[1.1]">
              {t('about.technologiesTitle')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              {t('about.technologiesSubtitle')}
            </p>
          </motion.div>

          {/* Technology Cloud */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-xl p-10 md:p-14"
          >
            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg" />

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {technologyTags.map((tag, idx) => {
                const sizes = ['text-sm', 'text-base', 'text-lg'];
                const sizeClass = sizes[idx % 3];
                const isHighlighted = ['n8n', 'RAG', 'OpenAI / GPT', 'Tool-use agents'].includes(tag);

                return (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className={`${sizeClass} px-5 py-2.5 rounded-full transition-all duration-300 cursor-default ${
                      isHighlighted
                        ? 'bg-white text-black font-semibold shadow-lg shadow-white/20 hover:scale-110'
                        : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/25 hover:text-white hover:scale-105'
                    }`}
                  >
                    {tag}
                  </motion.span>
                );
              })}
            </div>

            {/* Center glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Why AI Insider is different — Premium Card Design */}
      <section className="relative py-32 px-6 overflow-hidden">
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
            className="text-center mb-20"
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

      {/* Values Section - Monochrome */}
      <section ref={valuesRef} className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-5" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {t('about.ourValues')} <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{t('about.values')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass-strong rounded-2xl p-6 border border-white/10 
                    transition-all duration-300 hover:border-white/30 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-white
                    flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' }}
                  >
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t(value.titleKey)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(value.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Monochrome */}
      <section ref={teamRef} className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium text-white">{t('about.theTeam')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {t('about.meetThe')} <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{t('about.minds')}</span> {t('about.behindAI')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.teamSubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.nameKey} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Monochrome */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {t('about.readyToWork')}
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              {t('about.letsDiscuss')}
            </p>
            <Link
              href={`${basePath}#bookcall`}
              className="inline-block px-10 py-4 bg-white text-black rounded-full 
                font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}
            >
              {t('about.bookFreeConsult')}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
