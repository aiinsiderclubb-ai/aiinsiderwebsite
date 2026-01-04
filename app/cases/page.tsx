'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageCircle, Phone, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaseCard from '../components/cases/CaseCard';
import CaseFilters from '../components/cases/CaseFilters';
import ConversionSection from '../components/cases/ConversionSection';
import { casesData, CaseCategory, CaseStudy, categoryFilters } from '../lib/casesData';
import { useChatContext } from '../context/ChatContext';
import { Industry } from '../lib/chatPrompts';

export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<CaseCategory | 'all'>('all');
  const { openChat, openWithIndustry } = useChatContext();

  // Filter cases based on active filter
  const filteredCases = useMemo(() => {
    if (activeFilter === 'all') return casesData;
    return casesData.filter(c => c.category === activeFilter);
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
            <span className="text-sm text-gray-300">Real AI Implementations</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6"
          >
            Real AI Automation Cases.
            <br />
            <span className="gradient-text">Real Business Results.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            See how AI chatbots and voice agents replace manual work 
            and generate leads for businesses like yours.
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
              Try AI Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <Link
              href="/#bookcall"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
            >
              <Phone className="w-5 h-5" />
              Book a Demo
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

      {/* Cases Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mb-8"
          >
            Showing {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''}
            {activeFilter !== 'all' && (
              <span> in {categoryFilters.find(f => f.id === activeFilter)?.label}</span>
            )}
          </motion.p>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
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
              <h3 className="text-xl font-bold text-white mb-2">No cases found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
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
              { value: '50+', label: 'Businesses Automated', icon: '🏢' },
              { value: '70%', label: 'Average Time Saved', icon: '⏱️' },
              { value: '24/7', label: 'AI Availability', icon: '🤖' },
              { value: '3x', label: 'Lead Increase', icon: '📈' },
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
                <div className="text-sm text-gray-400">{stat.label}</div>
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

