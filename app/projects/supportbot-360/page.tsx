'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, MessageSquare, Globe, Clock, Users, Zap,
  CheckCircle2, Brain, Headphones, BarChart3, Heart, RefreshCw
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Understanding',
    description: 'Advanced NLP that understands context, intent, and sentiment in customer messages.',
  },
  {
    icon: Globe,
    title: '12 Languages',
    description: 'Native support for major European and Asian languages with automatic detection.',
  },
  {
    icon: Headphones,
    title: 'Seamless Handoff',
    description: 'Smart escalation to human agents with full conversation context preserved.',
  },
  {
    icon: RefreshCw,
    title: 'Self-Learning',
    description: 'Continuously improves from every interaction without manual training.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Suite',
    description: 'Deep insights into customer needs, common issues, and satisfaction trends.',
  },
  {
    icon: Heart,
    title: 'Empathy Engine',
    description: 'Detects customer frustration and adjusts tone to provide compassionate responses.',
  },
];

const results = [
  { value: '80%', label: 'Autonomous Resolution', icon: CheckCircle2 },
  { value: '12', label: 'Languages Supported', icon: Globe },
  { value: '4.8/5', label: 'Customer Satisfaction', icon: Heart },
  { value: '24/7', label: 'Availability', icon: Clock },
];

const languages = [
  'English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese',
  'Dutch', 'Polish', 'Japanese', 'Korean', 'Chinese', 'Arabic'
];

export default function SupportBot360Page() {
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
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 mb-6">
                <MessageSquare className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Chatbots</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  SupportBot 360
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Intelligent customer support chatbot with multi-language support and seamless human handoff. 
                Handles 80% of inquiries autonomously while maintaining exceptional satisfaction.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Chatbot', 'NLP', 'Multi-lang', 'Support', 'AI'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Languages */}
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <p className="text-sm text-gray-400 mb-4">Supported Languages</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 text-sm rounded-lg bg-white/5 border border-white/20 text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/20"
                style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop"
                  alt="SupportBot 360"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
              Performance <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Metrics</span>
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
                  className="text-center p-6 rounded-2xl glass-strong border border-white/20"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-white" />
                  <div className="text-4xl font-bold mb-2" style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">
              Smart <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Features</span>
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
                  className="p-6 rounded-2xl glass-strong border border-white/10 hover:border-white/30 transition-colors"
                >
                  <Icon className="w-10 h-10 text-white mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-white">
              Ready for 24/7 Intelligent Support?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's build a chatbot that truly understands your customers.
            </p>
            <Link href="/#bookcall" 
              className="inline-block px-10 py-4 bg-white text-black rounded-full font-bold text-lg
                transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}>
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

