'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, Mic, Phone, Clock, TrendingDown, Users, Headphones,
  CheckCircle2, Zap, Globe, BarChart3, Shield, Workflow
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: Mic,
    title: 'Natural Voice Recognition',
    description: 'Advanced speech-to-text with 99.2% accuracy across multiple accents and languages.',
  },
  {
    icon: Workflow,
    title: 'Intelligent Routing',
    description: 'AI determines caller intent and routes to the right department or handles autonomously.',
  },
  {
    icon: Clock,
    title: 'Real-time Processing',
    description: 'Sub-second response times ensure natural, flowing conversations without awkward pauses.',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Handles calls in English, German, French, Italian, and Spanish seamlessly.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights into call volumes, resolution rates, and customer satisfaction.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and GDPR-ready data handling.',
  },
];

const results = [
  { value: '10K+', label: 'Daily Calls Handled', icon: Phone },
  { value: '60%', label: 'Cost Reduction', icon: TrendingDown },
  { value: '<1s', label: 'Response Time', icon: Clock },
  { value: '94%', label: 'Resolution Rate', icon: CheckCircle2 },
];

const timeline = [
  { phase: 'Discovery', duration: '2 weeks', description: 'Analyzed existing call center operations and identified automation opportunities.' },
  { phase: 'Design', duration: '3 weeks', description: 'Designed conversation flows, voice personas, and integration architecture.' },
  { phase: 'Development', duration: '8 weeks', description: 'Built the AI voice agent with custom NLP models trained on insurance domain.' },
  { phase: 'Testing', duration: '2 weeks', description: 'Extensive testing with real scenarios and edge cases.' },
  { phase: 'Deployment', duration: '1 week', description: 'Gradual rollout with 24/7 monitoring and instant fallback to human agents.' },
];

export default function VoiceFlowProPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const resultsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const resultsInView = useInView(resultsRef, { once: true, margin: '-100px' });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-6">
                <Mic className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Voice AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  VoiceFlow Pro
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI-powered voice agent handling 10,000+ daily customer calls for a major insurance company. 
                Revolutionizing customer service with intelligent automation.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Voice AI', 'NLP', 'Real-time', 'Insurance', 'Enterprise'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="glass-strong rounded-2xl p-6 border border-cyan-500/20">
                <p className="text-sm text-gray-400 mb-4">Client Testimonial</p>
                <p className="text-lg italic text-gray-200 mb-4">
                  "VoiceFlow Pro has transformed our customer service. We're handling 3x more calls with half the staff, 
                  and customer satisfaction has never been higher."
                </p>
                <p className="text-cyan-400 font-semibold">— Head of Operations, Major Swiss Insurance Company</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30"
                style={{ boxShadow: '0 0 60px rgba(0, 240, 255, 0.2)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop"
                  alt="VoiceFlow Pro"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">Live Call Analytics</p>
                      <p className="text-sm text-gray-400">Real-time monitoring dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Measurable <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Results</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl glass-strong border border-cyan-500/20"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    {result.value}
                  </div>
                  <div className="text-sm text-gray-400">{result.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-20 px-6">
        <div className="absolute inset-0 neural-bg opacity-5" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Key <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl glass-strong border border-white/10 hover:border-cyan-500/30 transition-colors"
                >
                  <Icon className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Project <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Timeline</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-cyan-400 font-bold">{item.duration}</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mt-1 flex-shrink-0" />
                <div className="flex-1 pb-6 border-b border-white/10">
                  <h3 className="font-bold text-lg mb-1">{item.phase}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Transform Your Call Center?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's discuss how AI voice agents can revolutionize your customer service.
            </p>
            <Link href="/#bookcall" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg
                transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

