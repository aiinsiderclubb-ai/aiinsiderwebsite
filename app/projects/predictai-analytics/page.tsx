'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, Brain, TrendingUp, Package, BarChart3, Leaf,
  CheckCircle2, Database, LineChart, Target, Cpu, Layers
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: LineChart,
    title: 'Demand Forecasting',
    description: 'Predict sales trends weeks in advance with 94% accuracy using historical data and external factors.',
  },
  {
    icon: Package,
    title: 'Inventory Optimization',
    description: 'AI-driven recommendations for stock levels that minimize costs while preventing stockouts.',
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Connects with POS systems, ERP, weather APIs, and market data for comprehensive analysis.',
  },
  {
    icon: Target,
    title: 'Anomaly Detection',
    description: 'Automatically flags unusual patterns that might indicate fraud or operational issues.',
  },
  {
    icon: Cpu,
    title: 'Real-time Processing',
    description: 'Processes millions of data points in seconds for up-to-the-minute insights.',
  },
  {
    icon: Layers,
    title: 'Custom Models',
    description: 'Machine learning models trained specifically on your business data and industry patterns.',
  },
];

const results = [
  { value: '+40%', label: 'Inventory Accuracy', icon: Target },
  { value: '25%', label: 'Waste Reduced', icon: Leaf },
  { value: '5x', label: 'ROI Achieved', icon: TrendingUp },
  { value: '94%', label: 'Forecast Accuracy', icon: Brain },
];

export default function PredictAIAnalyticsPage() {
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-600" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 60%)',
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 mb-6">
                <Brain className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Custom AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  PredictAI Analytics
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Custom machine learning models for demand forecasting in retail. 
                Improved inventory accuracy by 40% and significantly reduced waste for a major retail chain.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['ML', 'Forecasting', 'Analytics', 'Retail', 'Big Data'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="glass-strong rounded-2xl p-6 border border-yellow-500/20">
                <p className="text-sm text-gray-400 mb-4">Client Testimonial</p>
                <p className="text-lg italic text-gray-200 mb-4">
                  "PredictAI has revolutionized how we manage inventory. We're saving millions in waste 
                  and our shelves are always stocked with what customers want."
                </p>
                <p className="text-yellow-400 font-semibold">— Supply Chain Director, European Retail Chain</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-yellow-500/30"
                style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.2)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                  alt="PredictAI Analytics"
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Business <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Impact</span>
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
                  className="text-center p-6 rounded-2xl glass-strong border border-yellow-500/20"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-yellow-400" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
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
              AI <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Capabilities</span>
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
                  className="p-6 rounded-2xl glass-strong border border-white/10 hover:border-yellow-500/30 transition-colors"
                >
                  <Icon className="w-10 h-10 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Ready to Predict Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's build custom AI models tailored to your business needs.
            </p>
            <Link href="/#bookcall" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold text-lg
                transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30">
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

