'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, Bot, Calendar, Clock, Users, Zap,
  CheckCircle2, Phone, Mail, RefreshCw, Bell, Smartphone
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: Phone,
    title: 'Voice Scheduling',
    description: 'Natural phone conversations to book, reschedule, or cancel appointments.',
  },
  {
    icon: Calendar,
    title: 'Calendar Sync',
    description: 'Real-time integration with Google Calendar, Outlook, and Calendly.',
  },
  {
    icon: RefreshCw,
    title: 'Smart Rescheduling',
    description: 'Automatically finds alternative slots when conflicts arise.',
  },
  {
    icon: Bell,
    title: 'Reminder System',
    description: 'Automated SMS and email reminders to reduce no-shows.',
  },
  {
    icon: Users,
    title: 'Multi-party Booking',
    description: 'Coordinates availability across multiple participants seamlessly.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Notifications',
    description: 'Push notifications for confirmations and last-minute changes.',
  },
];

const results = [
  { value: '500+', label: 'Daily Bookings', icon: Calendar },
  { value: '-45%', label: 'No-show Rate', icon: Users },
  { value: '2 days', label: 'Setup Time', icon: Clock },
  { value: '98%', label: 'Accuracy', icon: CheckCircle2 },
];

const integrations = [
  'Google Calendar', 'Microsoft Outlook', 'Calendly', 'Zoom', 'Teams', 'Twilio'
];

export default function MeetingMasterAIPage() {
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
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
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
                <Bot className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Voice AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  MeetingMaster AI
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Voice agent that schedules, reschedules, and manages calendar appointments. 
                Integrated with Google Calendar and Outlook for seamless operation.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {['Voice AI', 'Scheduling', 'Integration', 'Calendar', 'Automation'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Integrations */}
              <div className="glass-strong rounded-2xl p-6 border border-white/20">
                <p className="text-sm text-gray-400 mb-4">Integrations</p>
                <div className="flex flex-wrap gap-2">
                  {integrations.map((integration) => (
                    <span key={integration} className="px-3 py-1 text-sm rounded-lg bg-white/5 border border-white/20 text-gray-300">
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
              <div className="relative rounded-3xl overflow-hidden border border-white/20"
                style={{ boxShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop"
                  alt="MeetingMaster AI"
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
              Proven <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Results</span>
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
              Core <span style={{
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
              Ready to Automate Your Scheduling?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's deploy a voice agent that never misses a booking.
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

