'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, Workflow, Target, Clock, TrendingUp, Users, Zap,
  CheckCircle2, Database, RefreshCw, BarChart3, Mail, Calendar
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: Target,
    title: 'Smart Lead Scoring',
    description: 'AI analyzes behavior patterns to score and prioritize leads automatically.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Workflows',
    description: 'Custom triggers and actions that run 24/7 without human intervention.',
  },
  {
    icon: Database,
    title: 'CRM Integration',
    description: 'Seamless sync with HubSpot, Salesforce, Pipedrive, and custom systems.',
  },
  {
    icon: Mail,
    title: 'Email Sequences',
    description: 'Personalized outreach campaigns triggered by lead behavior and scoring.',
  },
  {
    icon: Calendar,
    title: 'Meeting Scheduling',
    description: 'Automatic booking when leads reach qualification threshold.',
  },
  {
    icon: BarChart3,
    title: 'Pipeline Analytics',
    description: 'Real-time visibility into conversion rates and bottlenecks.',
  },
];

const results = [
  { value: '95%', label: 'Lead Qualification Automated', icon: Target },
  { value: '40h', label: 'Saved Per Week', icon: Clock },
  { value: '+35%', label: 'Conversion Rate', icon: TrendingUp },
  { value: '3x', label: 'Sales Velocity', icon: Zap },
];

const integrations = [
  'HubSpot', 'Salesforce', 'Pipedrive', 'Slack', 'Gmail', 'Calendly', 'Zapier', 'Notion'
];

export default function AutoScaleCRMPage() {
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
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 60%)',
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 mb-6">
                <Workflow className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-400">Automation</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                  AutoScale CRM
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                End-to-end sales automation pipeline integrating with HubSpot, Salesforce, and custom APIs. 
                Automated 95% of lead qualification for a growing SaaS company.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Automation', 'CRM', 'API', 'Lead Scoring', 'SaaS'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Integrations */}
              <div className="glass-strong rounded-2xl p-6 border border-violet-500/20">
                <p className="text-sm text-gray-400 mb-4">Integrations</p>
                <div className="flex flex-wrap gap-2">
                  {integrations.map((integration) => (
                    <span key={integration} className="px-3 py-1 text-sm rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300">
                      {integration}
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
              <div className="relative rounded-3xl overflow-hidden border border-violet-500/30"
                style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.2)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                  alt="AutoScale CRM"
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
              Impact <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Delivered</span>
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
                  className="text-center p-6 rounded-2xl glass-strong border border-violet-500/20"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 text-violet-400" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-2">
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
              Automation <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">Features</span>
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
                  className="p-6 rounded-2xl glass-strong border border-white/10 hover:border-violet-500/30 transition-colors"
                >
                  <Icon className="w-10 h-10 text-violet-400 mb-4" />
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
              Ready to Automate Your Sales Pipeline?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's build an automation system that scales with your business.
            </p>
            <Link href="/#bookcall" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full font-bold text-lg
                transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30">
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

