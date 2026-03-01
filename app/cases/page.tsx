'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseFilters from '../components/cases/CaseFilters';
import CasesCarousel from '../components/cases/CasesCarousel';
import FeaturedCaseStack from '../components/cases/FeaturedCaseStack';
import ConversionSection from '../components/cases/ConversionSection';
import { casesData, CaseCategory, CaseStudy, categoryFilters, getLocalizedText } from '../lib/casesData';
import { useChatContext } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<CaseCategory | 'all'>('all');
  const { openChat, openWithIndustry } = useChatContext();
  const { lang, t } = useLanguage();
  const basePath = `/${lang}`;
  const searchParams = useSearchParams();
  const qRaw = (searchParams.get('q') || '').trim();
  const q = qRaw.toLowerCase();

  // Get the featured outreach case
  const outreachCase = useMemo(() => {
    return casesData.find(c => c.id === 'case-facebook-outreach');
  }, []);

  // Filter cases based on active filter (excluding the featured outreach case from regular grid when showing all)
  const filteredCases = useMemo(() => {
    const cases = activeFilter === 'all' 
      ? casesData.filter(c => c.id !== 'case-facebook-outreach')
      : casesData.filter(c => c.category === activeFilter);

    if (!q) return cases;

    return cases.filter((c) => {
      const haystack = [
        getLocalizedText(c.title, lang),
        getLocalizedText(c.shortDescription, lang),
        getLocalizedText(c.industryName, lang),
        c.technologies?.join(' ') || '',
        c.slug,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [activeFilter, q, lang]);

  // Count cases per category
  const caseCounts = useMemo(() => {
    const counts: Record<CaseCategory | 'all', number> = {
      all: casesData.length,
      ecommerce: 0,
      beauty: 0,
      realestate: 0,
      voice: 0,
      automation: 0,
      social: 0,
    };
    
    casesData.forEach(c => {
      counts[c.category]++;
    });
    
    return counts;
  }, []);

  // Handle demo click - open chat with selected industry
  const handleDemoClick = (caseData: CaseStudy) => {
    if (caseData.industry) {
      openWithIndustry(caseData.industry);
    } else {
      openChat();
    }
  };

  // Handle contact click - scroll to booking
  const handleContactClick = () => {
    window.location.href = `${basePath}#bookcall`;
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Redesigned */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
              `,
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Floating orbs */}
          <div
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
              filter: 'blur(60px)',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-violet-500/30 bg-violet-500/10 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
              {t('cases.badge')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-[1.1]"
          >
            {t('cases.title1')}
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('cases.title2')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            {t('cases.subtitle')}
          </motion.p>

          {qRaw && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="text-sm text-gray-400">{lang === 'en' ? 'Search' : 'Пошук'}:</span>
              <span className="text-sm font-semibold text-white">{qRaw}</span>
              <Link
                href={`${basePath}/cases`}
                className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
              >
                {lang === 'en' ? 'Clear' : 'Очистити'}
              </Link>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openChat()}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
            >
              <MessageCircle className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{t('cases.tryDemo')}</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <Link
              href={`${basePath}#bookcall`}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              {t('cases.bookDemo')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal links: services / blog / about */}
      <section className="py-10 px-6 -mt-10">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {lang === 'en' ? 'Explore AI services' : 'Дослідіть AI послуги'}
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-5 max-w-3xl">
              {lang === 'en'
                ? 'Want similar outcomes? Start with our core services and implementation playbooks.'
                : 'Хочете подібні результати? Почніть з наших ключових послуг та практичних матеріалів.'}
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { href: `${basePath}/services`, label: lang === 'en' ? 'All services' : 'Всі послуги' },
                {
                  href: `${basePath}/ai-automation-for-business`,
                  label: lang === 'en' ? 'AI automation for business' : 'AI автоматизація для бізнесу',
                },
                { href: `${basePath}/ai-voice-agents`, label: lang === 'en' ? 'AI voice agents' : 'AI голосові агенти' },
                { href: `${basePath}/ai-chatbots-for-business`, label: lang === 'en' ? 'AI chatbots' : 'AI чатботи' },
                { href: `${basePath}/custom-ai-agents`, label: lang === 'en' ? 'Custom AI agents' : 'Кастомні AI агенти' },
                { href: `${basePath}/blog`, label: lang === 'en' ? 'Blog' : 'Блог' },
                { href: `${basePath}/about`, label: lang === 'en' ? 'About us' : 'Про нас' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs md:text-sm px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300
                    transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CaseFilters 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              caseCounts={caseCounts}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Case: Facebook Outreach Automation - Card Stack Design */}
      {(activeFilter === 'all' || activeFilter === 'automation') && outreachCase && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <FeaturedCaseStack
              caseData={outreachCase}
              onDemoClick={handleDemoClick}
              onContactClick={handleContactClick}
            />
          </div>
        </section>
      )}

      {/* Cases Carousel - Horizontal scroll with spotlight */}
      <section className="py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {lang === 'en' ? 'All Case Studies' : 'Всі кейси'}
              </h2>
              <p className="text-gray-500">
                {t('cases.showing')} {filteredCases.length} {t('cases.caseWord')}
                {activeFilter !== 'all' && (
                  <span> {t('cases.inCategory')} {getLocalizedText(categoryFilters.find(f => f.id === activeFilter)?.label || { uk: '', en: '' }, lang)}</span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Carousel */}
          {filteredCases.length > 0 ? (
            <CasesCarousel
              cases={filteredCases}
              onDemoClick={handleDemoClick}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">{t('cases.noCases')}</h3>
              <p className="text-gray-400">{t('cases.tryDifferent')}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section - Redesigned */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20"
            style={{
              background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: '50+', labelKey: 'cases.stat1', icon: '🏢', gradient: 'from-violet-500 to-purple-500', glow: 'rgba(139, 92, 246, 0.3)' },
              { value: '70%', labelKey: 'cases.stat2', icon: '⏱️', gradient: 'from-blue-500 to-cyan-500', glow: 'rgba(59, 130, 246, 0.3)' },
              { value: '24/7', labelKey: 'cases.stat3', icon: '🤖', gradient: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.3)' },
              { value: '3x', labelKey: 'cases.stat4', icon: '📈', gradient: 'from-orange-500 to-amber-500', glow: 'rgba(249, 115, 22, 0.3)' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Glow on hover */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${stat.glow} 0%, transparent 100%)` }}
                />

                <div className="relative text-center p-6 md:p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{
                      background: `linear-gradient(135deg, #fff 0%, #a1a1aa 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{t(stat.labelKey)}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Conversion Section */}
      <ConversionSection onOpenChat={openChat} />

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>

      <Footer />
    </main>
  );
}
