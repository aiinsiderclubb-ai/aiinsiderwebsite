'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle, Phone, Zap, AlertTriangle, CheckCircle2, Wrench, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseCard from '../components/cases/CaseCard';
import CaseFilters from '../components/cases/CaseFilters';
import ConversionSection from '../components/cases/ConversionSection';
import OutreachUIDemo from '../components/cases/OutreachUIDemo';
import { casesData, CaseCategory, CaseStudy, categoryFilters, getLocalizedText } from '../lib/casesData';
import { useChatContext } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<CaseCategory | 'all'>('all');
  const { openChat, openWithIndustry } = useChatContext();
  const { lang, t } = useLanguage();

  // Get the featured outreach case
  const outreachCase = useMemo(() => {
    return casesData.find(c => c.id === 'case-facebook-outreach');
  }, []);

  // Filter cases based on active filter (excluding the featured outreach case from regular grid when showing all)
  const filteredCases = useMemo(() => {
    const cases = activeFilter === 'all' 
      ? casesData.filter(c => c.id !== 'case-facebook-outreach')
      : casesData.filter(c => c.category === activeFilter);
    return cases;
  }, [activeFilter]);

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
    window.location.href = '/#bookcall';
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          <div 
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">{t('cases.badge')}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6"
          >
            {t('cases.title1')}
            <br />
            <span className="gradient-text">{t('cases.title2')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            {t('cases.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openChat()}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30"
            >
              <MessageCircle className="w-5 h-5" />
              {t('cases.tryDemo')}
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <Link
              href="/#bookcall"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              <Phone className="w-5 h-5" />
              {t('cases.bookDemo')}
            </Link>
          </motion.div>
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

      {/* Featured Case: Facebook Outreach Automation */}
      {(activeFilter === 'all' || activeFilter === 'automation') && outreachCase && (
        <section className="py-20 px-6 border-b border-white/5">
          <div className="max-w-6xl mx-auto">
            {/* Featured Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <Rocket className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-orange-400">{t('cases.featuredCase')}</span>
              </div>
            </motion.div>

            {/* Main Featured Card */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]"
              style={{ boxShadow: '0 0 80px rgba(255, 255, 255, 0.03)' }}
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center text-3xl">
                        {outreachCase.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-orange-400 uppercase tracking-wider">
                          {getLocalizedText(outreachCase.industryName, lang)}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                          {getLocalizedText(outreachCase.title, lang)}
                        </h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {getLocalizedText(outreachCase.shortDescription, lang)}
                    </p>
                  </div>

                  {/* Results Cards */}
                  <div className="grid grid-cols-2 gap-3 lg:w-80">
                    {outreachCase.results.map((result, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                        <div className="text-2xl font-bold text-white">
                          {result.prefix}{result.value}{result.suffix}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{getLocalizedText(result.label, lang)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {/* Problem */}
                  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="text-sm font-bold text-red-400 uppercase tracking-wider">
                        {getLocalizedText(outreachCase.problem.title, lang)}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {outreachCase.problem.points.map((point, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-3">
                          <span className="text-red-400/60 mt-0.5">×</span>
                          {getLocalizedText(point, lang)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution */}
                  <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
                        {getLocalizedText(outreachCase.solution.title, lang)}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {outreachCase.solution.points.map((point, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-3">
                          <span className="text-green-400/60 mt-0.5">✓</span>
                          {getLocalizedText(point, lang)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <Wrench className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500 mr-2">{t('cases.technologies')}</span>
                  {outreachCase.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  {outreachCase.ctas.map((cta) => (
                    <button
                      key={cta.id}
                      onClick={() => {
                        if (cta.action === 'demo' || cta.action === 'flow') {
                          handleDemoClick(outreachCase);
                        } else {
                          handleContactClick();
                        }
                      }}
                      className={`
                        flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold
                        transition-all duration-200 hover:scale-[1.02]
                        ${cta.primary 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30' 
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <span>{cta.icon}</span>
                      {getLocalizedText(cta.label, lang)}
                      {cta.primary && <ArrowRight className="w-4 h-4" />}
                    </button>
                  ))}
                </div>

                {/* UI Demo Section */}
                <OutreachUIDemo />
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Cases Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500 mb-6"
          >
            {t('cases.showing')} {filteredCases.length} {t('cases.caseWord')}
            {activeFilter !== 'all' && (
              <span> {t('cases.inCategory')} {getLocalizedText(categoryFilters.find(f => f.id === activeFilter)?.label || { uk: '', en: '' }, lang)}</span>
            )}
          </motion.p>

          {/* Grid - 3 columns on desktop */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCases.map((caseData, index) => (
              <CaseCard
                key={caseData.id}
                caseData={caseData}
                index={index}
                onDemoClick={handleDemoClick}
                onContactClick={handleContactClick}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredCases.length === 0 && (
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

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50+', labelKey: 'cases.stat1', icon: '🏢' },
              { value: '70%', labelKey: 'cases.stat2', icon: '⏱️' },
              { value: '24/7', labelKey: 'cases.stat3', icon: '🤖' },
              { value: '3x', labelKey: 'cases.stat4', icon: '📈' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Conversion Section */}
      <ConversionSection onOpenChat={openChat} />

      <Footer />
    </main>
  );
}
