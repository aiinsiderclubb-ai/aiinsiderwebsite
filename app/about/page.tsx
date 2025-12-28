'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail, Zap, Target, Rocket, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Alex Morrison',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Visionary leader with 15+ years in AI and tech. Former ML Lead at Google, now building the future of intelligent automation.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'alex@aiinsider.com',
    },
  },
  {
    name: 'Sarah Chen',
    role: 'Co-Founder & CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'Technical genius behind our AI architecture. PhD in Machine Learning from MIT, passionate about ethical AI development.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'sarah@aiinsider.com',
    },
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Product strategist with a knack for user-centric design. Previously led product teams at Stripe and Figma.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'marcus@aiinsider.com',
    },
  },
];

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We push boundaries and embrace cutting-edge technology to deliver solutions that redefine what\'s possible.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every solution we build is measured by its impact. We\'re obsessed with delivering tangible ROI for our clients.',
  },
  {
    icon: Rocket,
    title: 'Speed & Excellence',
    description: 'We move fast without sacrificing quality. Our agile approach ensures rapid deployment with precision.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We don\'t just deliver projects — we become strategic partners invested in your long-term success.',
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Monochrome */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Elements - Monochrome */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium text-white">About Us</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight text-white">
              Building the Future of
              <span 
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Intelligent Automation
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're a team of AI enthusiasts, engineers, and visionaries dedicated to transforming 
              businesses through intelligent automation and voice AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Monochrome */}
      <section ref={storyRef} className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
                Our <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Story</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Founded in 2023, AI Insider emerged from a simple observation: businesses were drowning 
                  in repetitive tasks while AI technology remained locked in research labs.
                </p>
                <p>
                  We saw an opportunity to bridge this gap — to bring enterprise-grade AI capabilities 
                  to companies of all sizes, making intelligent automation accessible and affordable.
                </p>
                <p>
                  Today, we've helped over 50 businesses automate their workflows, deploy voice agents, 
                  and unlock new levels of efficiency. Our mission remains unchanged: democratize AI 
                  and empower businesses to focus on what truly matters.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '50+', label: 'Projects Delivered' },
                    { number: '95%', label: 'Client Satisfaction' },
                    { number: '24/7', label: 'AI Uptime' },
                    { number: '3x', label: 'Avg. ROI Increase' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <div 
                        className="text-4xl font-bold mb-2"
                        style={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Monochrome */}
      <section ref={valuesRef} className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-5" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              Our <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass-strong rounded-2xl p-6 border border-white/10 
                    transition-all duration-300 hover:border-white/30 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-white
                    flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' }}
                  >
                    <Icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Monochrome */}
      <section ref={teamRef} className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6 border border-white/20">
              <span className="text-sm font-medium text-white">The Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              Meet the <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Minds</span> Behind AI Insider
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A passionate team of innovators dedicated to transforming your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="glass-strong rounded-3xl p-6 border border-white/10 
                  transition-all duration-300 hover:border-white/30 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 blur-xl 
                      transition-opacity duration-300 group-hover:opacity-10" />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full aspect-square object-cover rounded-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-1 text-white">{member.name}</h3>
                    <p className="text-white/70 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{member.bio}</p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4">
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glass flex items-center justify-center 
                          transition-all duration-200 hover:bg-white/10 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
                      </a>
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glass flex items-center justify-center 
                          transition-all duration-200 hover:bg-white/10 hover:scale-110"
                      >
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center 
                          transition-all duration-200 hover:bg-white/10 hover:scale-110"
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Monochrome */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Let's discuss how we can transform your business with AI.
            </p>
            <Link
              href="/#bookcall"
              className="inline-block px-10 py-4 bg-white text-black rounded-full 
                font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}
            >
              Book a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
