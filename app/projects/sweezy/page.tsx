'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowLeft, Heart, Users, Globe, Smartphone, MapPin, FileText, 
  MessageSquare, Home, Briefcase, GraduationCap, HeartHandshake,
  CheckCircle2, Star, Download, ExternalLink
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const features = [
  {
    icon: Home,
    title: 'Housing Search',
    description: 'Find available apartments, temporary accommodations, and host families across Switzerland.',
    color: '#0057B8',
  },
  {
    icon: FileText,
    title: 'Document Guide',
    description: 'Step-by-step guidance for permits, registration, insurance, and other essential paperwork.',
    color: '#FFD700',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'Multilingual chatbot answering questions 24/7 in Ukrainian, Russian, German, French, and English.',
    color: '#0057B8',
  },
  {
    icon: Briefcase,
    title: 'Job Opportunities',
    description: 'Curated job listings from companies welcoming Ukrainian talent, with CV translation help.',
    color: '#FFD700',
  },
  {
    icon: GraduationCap,
    title: 'Language Learning',
    description: 'Free German and French courses, with integration support for children in schools.',
    color: '#0057B8',
  },
  {
    icon: HeartHandshake,
    title: 'Community Support',
    description: 'Connect with local Ukrainian communities, support groups, and cultural events.',
    color: '#FFD700',
  },
];

const timeline = [
  { date: 'March 2022', title: 'Project Initiated', description: 'Responding to the humanitarian crisis, we began developing Sweezy within days of the conflict escalation.' },
  { date: 'April 2022', title: 'MVP Launch', description: 'First version released with basic housing search and document guides in Ukrainian and German.' },
  { date: 'June 2022', title: 'AI Assistant Added', description: 'Integrated GPT-powered multilingual chatbot to answer questions 24/7.' },
  { date: 'September 2022', title: '5,000 Users', description: 'Reached our first major milestone, helping thousands of families settle in Switzerland.' },
  { date: 'January 2023', title: 'Jobs & Education', description: 'Added job search features and educational resources for children and adults.' },
  { date: 'Present', title: '10,000+ Users', description: 'Continuing to support the Ukrainian community with new features and partnerships.' },
];

const testimonials = [
  {
    text: "Sweezy допомогла мені знайти житло за 3 дні. Без цього застосунку я б не знала, з чого почати.",
    author: "Олена К.",
    location: "Zürich",
  },
  {
    text: "The AI assistant answered all my questions about permits at 2 AM. It felt like having a friend who knows everything.",
    author: "Dmytro S.",
    location: "Geneva",
  },
  {
    text: "Дякую за допомогу з пошуком роботи. Тепер я працюю і можу забезпечити свою родину.",
    author: "Ірина М.",
    location: "Bern",
  },
];

export default function SweezyPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const storyRef = useRef(null);
  const timelineRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ukrainian Flag Background */}
        <div className="absolute inset-0 gpu-accelerated"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 87, 184, 0.15) 0%, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0) 60%, rgba(255, 215, 0, 0.1) 100%)',
          }}
        />
        <div className="absolute top-0 left-0 w-full h-2"
          style={{ background: 'linear-gradient(90deg, #0057B8 50%, #FFD700 50%)' }}
        />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 87, 184, 0.2) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-6 rounded-sm overflow-hidden flex flex-col shadow-lg">
                  <div className="flex-1" style={{ backgroundColor: '#0057B8' }} />
                  <div className="flex-1" style={{ backgroundColor: '#FFD700' }} />
                </div>
                <span className="text-sm font-medium text-gray-400">A Project for Ukraine</span>
                <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              </div>

              <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
                <span style={{ 
                  background: 'linear-gradient(90deg, #0057B8 0%, #60a5fa 40%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Sweezy
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Empowering Ukrainian refugees in Switzerland with the tools and information 
                they need to rebuild their lives with dignity.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Users, value: '10,000+', label: 'People Helped' },
                  { icon: Globe, value: '5', label: 'Languages' },
                  { icon: Smartphone, value: 'iOS & Android', label: 'Available On' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-xl"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}>
                    <stat.icon className="w-6 h-6 mx-auto mb-2" 
                      style={{ color: i % 2 === 0 ? '#0057B8' : '#FFD700' }} />
                    <div className="text-lg md:text-xl font-bold" style={{ 
                      background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg
                  transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(90deg, #0057B8 0%, #1e40af 100%)',
                    boxShadow: '0 0 30px rgba(0, 87, 184, 0.5)',
                  }}>
                  <Download className="w-5 h-5" />
                  Download App
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg
                  border-2 transition-all duration-300 hover:scale-105 hover:bg-white/5"
                  style={{ borderColor: '#FFD700', color: '#FFD700' }}>
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              </div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center"
            >
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full gpu-accelerated"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 87, 184, 0.4) 0%, rgba(255, 215, 0, 0.4) 100%)',
                    filter: 'blur(80px)',
                  }}
                />
              </div>

              {/* Phone */}
              <div className="relative w-72 h-[580px] rounded-[3rem] p-2"
                style={{
                  background: 'linear-gradient(180deg, #0057B8 0%, #FFD700 100%)',
                  boxShadow: '0 0 60px rgba(0, 87, 184, 0.4), 0 0 120px rgba(255, 215, 0, 0.2)',
                }}>
                <div className="w-full h-full rounded-[2.5rem] bg-[#0a0a1a] overflow-hidden flex flex-col">
                  {/* Status Bar */}
                  <div className="h-10 flex items-center justify-center bg-gradient-to-b from-black/20 to-transparent">
                    <div className="w-24 h-6 rounded-full bg-black" />
                  </div>
                  
                  {/* App Header */}
                  <div className="px-6 py-4 text-center border-b border-white/5">
                    <div className="text-2xl font-bold mb-1" style={{ 
                      background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Sweezy
                    </div>
                    <div className="text-xs text-gray-500">Вітаємо в Швейцарії! 🇨🇭</div>
                  </div>
                  
                  {/* Quick Actions Grid */}
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {[
                      { emoji: '🏠', label: 'Житло', en: 'Housing' },
                      { emoji: '📋', label: 'Документи', en: 'Documents' },
                      { emoji: '💼', label: 'Робота', en: 'Jobs' },
                      { emoji: '🗣️', label: 'Мова', en: 'Language' },
                      { emoji: '👨‍👩‍👧', label: 'Сім\'я', en: 'Family' },
                      { emoji: '❤️', label: 'Підтримка', en: 'Support' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl text-center transition-transform hover:scale-105"
                        style={{ 
                          background: i % 2 === 0 ? 'rgba(0, 87, 184, 0.15)' : 'rgba(255, 215, 0, 0.15)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}>
                        <div className="text-2xl mb-1">{item.emoji}</div>
                        <div className="text-xs font-medium">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Chat Preview */}
                  <div className="flex-1 mx-4 mb-4 rounded-xl p-3"
                    style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #0057B8, #FFD700)' }}>
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">AI Помічник</span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-lg p-2 text-xs ml-auto max-w-[80%]"
                        style={{ background: 'rgba(0, 87, 184, 0.3)' }}>
                        Як отримати дозвіл S?
                      </div>
                      <div className="rounded-lg p-2 text-xs max-w-[90%]"
                        style={{ background: 'linear-gradient(90deg, rgba(0, 87, 184, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)' }}>
                        Дозвіл S видається автоматично. Ось покрокова інструкція... 📄
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-sm font-bold shadow-xl animate-bounce"
                style={{ 
                  background: 'linear-gradient(90deg, #FFD700, #f59e0b)',
                  color: '#000',
                }}>
                ⭐ 4.9 Rating
              </div>
              
              <div className="absolute bottom-10 -left-8 px-3 py-2 rounded-lg text-xs font-medium shadow-xl"
                style={{ 
                  background: 'rgba(0, 87, 184, 0.9)',
                  boxShadow: '0 0 20px rgba(0, 87, 184, 0.5)',
                }}>
                🇺🇦 Слава Україні!
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              The Story Behind <span style={{ 
                background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Sweezy</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <div className="rounded-3xl p-8 md:p-10 border"
              style={{ 
                background: 'linear-gradient(135deg, rgba(0, 87, 184, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
                borderColor: 'rgba(255, 215, 0, 0.2)',
              }}>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                When the war in Ukraine began in February 2022, Switzerland opened its doors to 
                thousands of refugees. But arriving in a new country is overwhelming — different 
                language, unfamiliar systems, and countless questions about permits, housing, and survival.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We saw families struggling to navigate Swiss bureaucracy, sleeping in emergency 
                shelters, and desperately searching for information scattered across dozens of websites 
                in languages they couldn't understand.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                <strong className="text-white">That's when Sweezy was born.</strong> In just 6 weeks, 
                our team built a mobile app that puts everything Ukrainian refugees need in one place — 
                from housing search to document guides, from job opportunities to language learning, 
                all available in Ukrainian.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#FFD700' }}>
                Today, Sweezy has helped over 10,000 people start their new lives in Switzerland. 
                But for us, every single user is not just a number — it's a family that found a home, 
                a parent who found a job, a child who found a school.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-5" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Everything You Need in <span style={{ 
                background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>One App</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Designed with love, built with purpose — every feature addresses a real need.
            </p>
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
                  className="group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-2"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: `${feature.color}33`,
                  }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4
                    transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}20` }}>
                    <Icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Our <span style={{ 
                background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Journey</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5"
              style={{ background: 'linear-gradient(180deg, #0057B8 0%, #FFD700 100%)' }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full md:-translate-x-2 z-10"
                  style={{ 
                    background: index % 2 === 0 ? '#0057B8' : '#FFD700',
                    boxShadow: `0 0 20px ${index % 2 === 0 ? 'rgba(0, 87, 184, 0.5)' : 'rgba(255, 215, 0, 0.5)'}`,
                  }}
                />
                
                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="rounded-xl p-4 border"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: index % 2 === 0 ? 'rgba(0, 87, 184, 0.3)' : 'rgba(255, 215, 0, 0.3)',
                    }}>
                    <div className="text-sm font-bold mb-1"
                      style={{ color: index % 2 === 0 ? '#0057B8' : '#FFD700' }}>
                      {item.date}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 gpu-accelerated"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 87, 184, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Stories from Our <span style={{ 
                background: 'linear-gradient(90deg, #0057B8 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Community</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="rounded-2xl p-6 border"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: index % 2 === 0 ? 'rgba(0, 87, 184, 0.3)' : 'rgba(255, 215, 0, 0.3)',
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ color: '#FFD700' }} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, #0057B8, #FFD700)' }}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}, Switzerland
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0, 87, 184, 0.1) 50%, rgba(255, 215, 0, 0.05) 100%)' }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center gap-2 mb-6">
              <div className="w-12 h-8 rounded overflow-hidden flex flex-col shadow-lg">
                <div className="flex-1" style={{ backgroundColor: '#0057B8' }} />
                <div className="flex-1" style={{ backgroundColor: '#FFD700' }} />
              </div>
              <Heart className="w-8 h-8 text-red-500 animate-pulse" fill="currentColor" />
              <div className="w-12 h-8 rounded overflow-hidden shadow-lg flex items-center justify-center bg-red-600 text-white text-xs font-bold">
                🇨🇭
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Слава Україні! 🇺🇦
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Glory to Ukraine! Together, we stand stronger.
            </p>
            <p className="text-gray-400 mb-10">
              Want to support Ukrainian refugees or collaborate with us? Let's talk.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg
                transition-all duration-300 hover:scale-105"
                style={{ 
                  background: 'linear-gradient(90deg, #0057B8 0%, #1e40af 100%)',
                  boxShadow: '0 0 30px rgba(0, 87, 184, 0.5)',
                }}>
                <Download className="w-5 h-5" />
                Download Sweezy
              </a>
              <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg
                border-2 transition-all duration-300 hover:scale-105 hover:bg-white/5"
                style={{ borderColor: '#FFD700', color: '#FFD700' }}>
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

