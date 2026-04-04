'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseFilters from '../components/cases/CaseFilters';
import CasesCarousel from '../components/cases/CasesCarousel';
import FeaturedCaseStack from '../components/cases/FeaturedCaseStack';
import PageCTA from '../components/PageCTA';
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

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 left-1/3 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 55%)', filter: 'blur(100px)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 55%)', filter: 'blur(80px)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium text-gray-300">
              {t('cases.badge')}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-[0.95]">
            <span className="text-white">{t('cases.title1')}</span>
            <br />
            <span
              className="inline-block mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('cases.title2')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            {t('cases.subtitle')}
          </p>

          {qRaw && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="text-sm text-gray-400">{lang === 'en' ? 'Search' : 'Пошук'}:</span>
              <span className="text-sm font-semibold text-white">{qRaw}</span>
              <Link
                href={`${basePath}/cases`}
                className="text-xs font-semibold text-white/70 hover:text-white transition-colors"
              >
                {lang === 'en' ? 'Clear' : 'Очистити'}
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openChat()}
              className="btn-primary group px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('cases.tryDemo')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              href={`${basePath}#bookcall`}
              className="flex items-center gap-3 px-8 py-4 text-white/70 hover:text-white font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              {t('cases.bookDemo')}
            </Link>
          </div>
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
          <CaseFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            caseCounts={caseCounts}
          />
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
          <div className="flex items-end justify-between mb-12">
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
          </div>

          {/* Carousel */}
          {filteredCases.length > 0 ? (
            <CasesCarousel
              cases={filteredCases}
              onDemoClick={handleDemoClick}
            />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">{t('cases.noCases')}</h3>
              <p className="text-gray-400">{t('cases.tryDifferent')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '50+', labelKey: 'cases.stat1', icon: '🏢' },
              { value: '70%', labelKey: 'cases.stat2', icon: '⏱️' },
              { value: '24/7', labelKey: 'cases.stat3', icon: '🤖' },
              { value: '3x', labelKey: 'cases.stat4', icon: '📈' },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 md:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/15 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{t(stat.labelKey)}</div>
              </div>
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
