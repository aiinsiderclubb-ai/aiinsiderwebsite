'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Zap, 
  Wrench, MessageCircle, Phone, ExternalLink, ChevronRight
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getCaseBySlug, casesData } from '../../lib/casesData';
import { useChatContext } from '../../context/ChatContext';

export default function CaseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const caseData = getCaseBySlug(slug);
  const { openChat, openWithIndustry } = useChatContext();

  if (!caseData) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Case Not Found</h1>
          <p className="text-gray-400 mb-8">The case study you're looking for doesn't exist.</p>
          <Link 
            href="/cases"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cases
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

  const handleContactClick = () => {
    window.location.href = '/#bookcall';
  };

  // Get related cases (same category, exclude current)
  const relatedCases = casesData
    .filter(c => c.category === caseData.category && c.id !== caseData.id)
    .slice(0, 3);

  // Special styling for Sweezy (Ukrainian theme)
  const isSweezy = caseData.id === 'case-sweezy';
  const accentColor = isSweezy ? 'from-blue-500 to-yellow-400' : 'from-white/20 to-white/10';
  const accentBg = isSweezy ? 'bg-gradient-to-r from-blue-500/20 to-yellow-500/20' : 'bg-white/5';

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: isSweezy 
                ? 'radial-gradient(circle, rgba(0,87,184,0.15) 0%, transparent 60%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          {isSweezy && (
            <div 
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
          )}
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href="/cases" className="hover:text-white transition-colors">Cases</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{caseData.industryName}</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-6 mb-8"
          >
            <div className={`w-20 h-20 rounded-2xl ${accentBg} border border-white/10 flex items-center justify-center text-4xl flex-shrink-0`}>
              {caseData.icon}
            </div>
            <div>
              <span className={`text-sm font-medium uppercase tracking-wider ${isSweezy ? 'text-blue-400' : 'text-gray-400'}`}>
                {caseData.industryName}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mt-2 leading-tight">
                {caseData.title}
              </h1>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 leading-relaxed"
          >
            {caseData.shortDescription}
          </motion.p>

          {/* Results Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {caseData.results.map((result, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl ${accentBg} border border-white/10 text-center`}
              >
                <div className={`text-3xl font-bold ${isSweezy && i === 3 ? 'text-blue-400' : 'text-white'}`}>
                  {result.prefix}{result.value}{result.suffix}
                </div>
                <div className="text-sm text-gray-400 mt-2">{result.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {caseData.ctas.map((cta) => (
              <button
                key={cta.id}
                onClick={() => {
                  if (cta.action === 'demo' || cta.action === 'flow' || cta.action === 'voice') {
                    handleDemoClick();
                  } else {
                    handleContactClick();
                  }
                }}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm
                  transition-all duration-200 hover:scale-[1.02]
                  ${cta.primary 
                    ? isSweezy 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30' 
                      : 'bg-white text-black hover:shadow-lg hover:shadow-white/30' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <span>{cta.icon}</span>
                {cta.label}
                {cta.primary && <ArrowRight className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-red-400">{caseData.problem.title}</h2>
              </div>
              <ul className="space-y-4">
                {caseData.problem.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-400 mt-1">×</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-green-400">{caseData.solution.title}</h2>
              </div>
              <ul className="space-y-4">
                {caseData.solution.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400">
                    <span className="text-green-400 mt-1">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Wrench className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-bold">Technologies Used</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {caseData.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium ${accentBg} border border-white/10`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Want Similar Results?</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's build something
              <span className="gradient-text"> amazing together</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              We can create a custom AI solution tailored to your specific business needs and goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#bookcall"
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30"
              >
                <Phone className="w-5 h-5" />
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button
                onClick={handleDemoClick}
                className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-full font-bold text-lg
                  border border-white/20 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
                Try AI Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Related Cases</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCases.map((relatedCase, index) => (
                  <Link
                    key={relatedCase.id}
                    href={`/cases/${relatedCase.slug}`}
                    className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                        {relatedCase.icon}
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">{relatedCase.industryName}</span>
                        <h3 className="text-sm font-bold text-white group-hover:text-gray-200 transition-colors line-clamp-1">
                          {relatedCase.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{relatedCase.shortDescription}</p>
                    <div className="flex items-center gap-1 mt-4 text-xs text-gray-500 group-hover:text-white transition-colors">
                      <span>View Case</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to Cases */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Cases
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

