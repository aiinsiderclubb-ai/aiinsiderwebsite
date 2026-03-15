'use client';

import { useParams, redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Zap, 
  Clock, ChevronRight, Star, Quote, MessageCircle, Phone, ExternalLink,
  Shield, Headphones, RefreshCw, BarChart3, Gift, Trophy, Cpu
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardPreview from '../../components/cases/DashboardPreview';
import { getCaseBySlug, casesData, getLocalizedText } from '../../lib/casesData';
import { getServiceBySlug } from '../../lib/servicesData';
import { useChatContext } from '../../context/ChatContext';
import { useLanguage } from '../../context/LanguageContext';

export default function CaseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLanguage();
  const basePath = `/${lang}`;
  
  // Redirect to dedicated Sweezy page
  if (slug === 'sweezy') {
    redirect(`${basePath}/cases/sweezy`);
  }
  
  const caseData = getCaseBySlug(slug);
  const { openChat, openWithIndustry } = useChatContext();

  if (!caseData) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">{lang === 'uk' ? 'Кейс не знайдено' : 'Case Not Found'}</h1>
          <p className="text-gray-400 mb-8">{lang === 'uk' ? 'Кейс, який ви шукаєте, не існує.' : 'The case study you\'re looking for doesn\'t exist.'}</p>
          <Link 
            href={`${basePath}/cases`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'uk' ? 'Повернутися до кейсів' : 'Back to Cases'}
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleDemoClick = () => {
    if (caseData.industry) {
      openWithIndustry(caseData.industry);
    } else {
      openChat();
    }
  };

  // Get related cases
  const relatedCases = casesData
    .filter(c => c.category === caseData.category && c.id !== caseData.id)
    .slice(0, 3);

  const isSweezy = caseData.id === 'case-sweezy';
  const relatedService = caseData.relatedServiceSlug ? getServiceBySlug(caseData.relatedServiceSlug) : undefined;
  const relatedServiceName = relatedService ? getLocalizedText(relatedService.title, lang) : '';

  // Determine dashboard type based on case category
  const getDashboardType = () => {
    if (caseData.category === 'ecommerce' && caseData.id !== 'case-flowers') return 'ecommerce';
    if (caseData.category === 'beauty') return 'beauty';
    if (caseData.category === 'voice') return 'voice';
    if (caseData.category === 'realestate') return 'realestate';
    return null;
  };
  
  const dashboardType = getDashboardType();

  // What's included items
  const whatsIncluded = [
    { icon: <Shield className="w-5 h-5" />, label: lang === 'uk' ? 'Безкоштовна підтримка 30 днів' : '30-day free support' },
    { icon: <RefreshCw className="w-5 h-5" />, label: lang === 'uk' ? 'Безкоштовні оновлення' : 'Free updates' },
    { icon: <BarChart3 className="w-5 h-5" />, label: lang === 'uk' ? 'Аналітика та звіти' : 'Analytics & reports' },
    { icon: <Headphones className="w-5 h-5" />, label: lang === 'uk' ? 'Навчання команди' : 'Team training' },
    { icon: <Gift className="w-5 h-5" />, label: lang === 'uk' ? 'Документація' : 'Documentation' },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Minimalist */}
      <section className="relative pt-28 pb-16 px-6">
        {/* Subtle background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs text-gray-500 mb-10"
          >
            <Link href={`${basePath}/cases`} className="hover:text-white transition-colors">{lang === 'uk' ? 'Кейси' : 'Cases'}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{getLocalizedText(caseData.industryName, lang)}</span>
          </motion.div>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-start">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                  ${isSweezy 
                    ? 'bg-gradient-to-br from-blue-500/20 to-yellow-500/20 border border-blue-400/30' 
                    : 'bg-white/5 border border-white/10'
                  }
                `}>
                  {caseData.icon}
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isSweezy ? 'text-blue-400' : 'text-gray-500'}`}>
                    {getLocalizedText(caseData.industryName, lang)}
                  </span>
                  {caseData.featured && (
                    <span className="ml-3 inline-flex items-center gap-1 text-xs text-yellow-400">
                      <Zap className="w-3 h-3" />
                      {lang === 'uk' ? 'Виділений' : 'Featured'}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {getLocalizedText(caseData.title, lang)}
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                {getLocalizedText(caseData.fullDescription || caseData.shortDescription, lang)}
              </p>

              {/* Quick Info Pills */}
              {caseData.timeline && (
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{lang === 'uk' ? 'Термін реалізації:' : 'Timeline:'} {getLocalizedText(caseData.timeline, lang)}</span>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDemoClick}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                    transition-all duration-200 hover:scale-[1.02]
                    ${isSweezy 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25' 
                      : 'bg-white text-black hover:shadow-lg hover:shadow-white/20'
                    }
                  `}
                >
                  {caseData.ctas[0]?.icon}
                  <span>{getLocalizedText(caseData.ctas[0]?.label, lang)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href={`${basePath}#bookcall`}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm
                    bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {lang === 'uk' ? 'Замовити демо' : 'Book Demo'}
                </Link>
              </div>
            </motion.div>

            {/* Right - Results Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className={`
                p-6 rounded-3xl border
                ${isSweezy 
                  ? 'bg-gradient-to-br from-blue-950/50 to-yellow-950/30 border-blue-500/20' 
                  : 'bg-white/[0.02] border-white/10'
                }
              `}>
                <div className="flex items-center gap-2 mb-5">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">{lang === 'uk' ? 'Результати' : 'Results'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {caseData.results.map((result, i) => (
                    <div key={i} className="text-center p-4 rounded-2xl bg-black/20">
                      <div className={`text-2xl font-bold ${isSweezy ? 'text-blue-300' : 'text-white'}`}>
                        {result.prefix}{result.value}{result.suffix}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{getLocalizedText(result.label, lang)}</div>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {caseData.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution - Side by Side */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/10"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-red-400">{lang === 'uk' ? 'Проблема' : 'Problem'}</h3>
              </div>
              <ul className="space-y-3">
                {caseData.problem.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-red-400/60 mt-0.5">×</span>
                    {getLocalizedText(point, lang)}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-green-400">{lang === 'uk' ? 'Рішення' : 'Solution'}</h3>
              </div>
              <ul className="space-y-3">
                {caseData.solution.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="text-green-400/60 mt-0.5">✓</span>
                    {getLocalizedText(point, lang)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Capabilities - WOW Design */}
      {caseData.systemCapabilities && caseData.systemCapabilities.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-medium text-blue-300">{lang === 'uk' ? 'Як це працює' : 'How It Works'}</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {lang === 'uk' ? 'Що робить ' : 'What the '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {lang === 'uk' ? 'система' : 'System Does'}
                </span>
              </h2>
            </motion.div>

            <div className="grid gap-6">
              {caseData.systemCapabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                    {/* Gradient line on left */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${
                      i === 0 ? 'from-blue-500 to-blue-600' : 
                      i === 1 ? 'from-purple-500 to-purple-600' : 
                      'from-pink-500 to-pink-600'
                    }`} />
                    
                    {/* Number badge */}
                    <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${
                      i === 0 ? 'from-blue-500/20 to-blue-600/10' : 
                      i === 1 ? 'from-purple-500/20 to-purple-600/10' : 
                      'from-pink-500/20 to-pink-600/10'
                    } border ${
                      i === 0 ? 'border-blue-500/30' : 
                      i === 1 ? 'border-purple-500/30' : 
                      'border-pink-500/30'
                    } flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${
                        i === 0 ? 'text-blue-400' : 
                        i === 1 ? 'text-purple-400' : 
                        'text-pink-400'
                      }`}>0{i + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="pr-16">
                      <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                        {getLocalizedText(cap.title, lang)}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {getLocalizedText(cap.description, lang)}
                      </p>
                    </div>

                    {/* Hover glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`}
                      style={{
                        background: `radial-gradient(circle at 50% 100%, ${
                          i === 0 ? 'rgba(59, 130, 246, 0.1)' : 
                          i === 1 ? 'rgba(168, 85, 247, 0.1)' : 
                          'rgba(236, 72, 153, 0.1)'
                        } 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements - WOW Design */}
      {caseData.achievements && caseData.achievements.length > 0 && (
        <section className="py-20 px-6 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-6"
              >
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-300">{lang === 'uk' ? 'Реальні досягнення' : 'Real Achievements'}</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {lang === 'uk' ? 'Чого ми ' : 'What We '}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {lang === 'uk' ? 'досягли' : 'Achieved'}
                </span>
              </h2>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseData.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`group relative p-6 rounded-2xl overflow-hidden ${
                    i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl group-hover:border-yellow-500/30 transition-all duration-300" />
                  
                  {/* Success indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative pr-14">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 mb-4" />
                    <p className="text-white font-medium text-lg leading-relaxed">
                      {getLocalizedText(achievement, lang)}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Stats summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5 border border-yellow-500/10"
            >
              <div className="flex items-center justify-center gap-3 text-center">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-400">
                  {lang === 'uk' 
                    ? 'Усі досягнення підтверджені реальними даними та метриками' 
                    : 'All achievements backed by real data and metrics'}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {relatedService ? (
        <section className="py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 via-white/[0.03] to-transparent p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                    {lang === 'uk' ? 'Пов’язана послуга' : 'Related Service'}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {lang === 'uk' ? 'Хочете такий самий результат?' : 'Want the same result?'}
                  </h3>
                  <p className="mt-3 max-w-2xl text-gray-300">
                    {lang === 'uk' ? 'Цей кейс реалізований за допомогою нашого сервісу' : 'This case was built using our'}
                  </p>
                </div>

                <Link
                  href={`${basePath}/services/${relatedService.slug}`}
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                >
                  {relatedServiceName}
                  {lang === 'en' ? ' service' : ''}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Dashboard Preview */}
      {dashboardType && (
        <section className="py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <DashboardPreview type={dashboardType} />
          </div>
        </section>
      )}

      {/* Process Timeline */}
      {caseData.process && caseData.process.length > 0 && (
        <section className="py-16 px-6 border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-3">
                {lang === 'uk' ? 'Процес реалізації' : 'Implementation Process'}
              </h2>
              <p className="text-gray-400">
                {lang === 'uk' ? 'Як ми працюємо від А до Я' : 'How we work from A to Z'}
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

              <div className="space-y-8">
                {caseData.process.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Number Circle */}
                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white">{phase.number}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{getLocalizedText(phase.title, lang)}</h3>
                        <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400">
                          {getLocalizedText(phase.duration, lang)}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-4">{getLocalizedText(phase.description, lang)}</p>
                      
                      {/* Deliverables */}
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((d, j) => (
                          <span key={j} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-green-500/5 text-green-400 border border-green-500/10">
                            <CheckCircle2 className="w-3 h-3" />
                            {getLocalizedText(d, lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {caseData.features && caseData.features.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-3">
                {lang === 'uk' ? 'Ключові можливості' : 'Key Features'}
              </h2>
              <p className="text-gray-400">
                {lang === 'uk' ? 'Що входить в рішення' : 'What\'s included in the solution'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseData.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-white mb-1">{getLocalizedText(feature.title, lang)}</h4>
                  <p className="text-xs text-gray-500">{getLocalizedText(feature.description, lang)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {lang === 'uk' ? 'Що включено в кожне рішення' : 'Included with Every Solution'}
            </h3>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
              {whatsIncluded.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 mb-3">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-400">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      {caseData.testimonial && (
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10"
            >
              <Quote className="absolute top-6 left-6 w-8 h-8 text-white/10" />
              
              <div className="relative">
                <p className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                  "{getLocalizedText(caseData.testimonial.quote, lang)}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold text-white">{caseData.testimonial.author}</div>
                    <div className="text-sm text-gray-500">{getLocalizedText(caseData.testimonial.role, lang)}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{lang === 'uk' ? 'Готові почати?' : 'Ready to Start?'}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'uk' ? 'Хочете такі самі результати?' : 'Want Similar Results?'}
            </h2>
            
            <p className="text-lg text-gray-400 mb-8">
              {lang === 'uk' 
                ? 'Ми створимо кастомне AI-рішення під ваші потреби' 
                : 'We\'ll create a custom AI solution for your needs'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`${basePath}#bookcall`}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20"
              >
                <Phone className="w-5 h-5" />
                {lang === 'uk' ? 'Замовити демо' : 'Book Demo'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button
                onClick={handleDemoClick}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white rounded-full font-bold
                  border border-white/10 transition-all duration-200 hover:bg-white/10"
              >
                <MessageCircle className="w-5 h-5" />
                {lang === 'uk' ? 'AI Демо' : 'AI Demo'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-8 text-center">{lang === 'uk' ? 'Схожі кейси' : 'Related Cases'}</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                {relatedCases.map((relatedCase) => (
                  <Link
                    key={relatedCase.id}
                    href={`${basePath}/cases/${relatedCase.slug}`}
                    className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{relatedCase.icon}</span>
                      <span className="text-xs text-gray-500">{getLocalizedText(relatedCase.industryName, lang)}</span>
                    </div>
                    <h4 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {getLocalizedText(relatedCase.title, lang)}
                    </h4>
                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-500 group-hover:text-white transition-colors">
                      {lang === 'uk' ? 'Переглянути' : 'View'}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href={`${basePath}/cases`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'uk' ? 'Всі кейси' : 'All Cases'}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
