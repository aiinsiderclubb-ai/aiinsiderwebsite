'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail, Zap, Target, Rocket, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const teamMembers = [
  {
    name: 'Alex Morrison',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Visionary leader with 15+ years in AI and tech. Former ML Lead at Google, now building the future of intelligent automation.',
    gradient: 'from-cyan-500 to-blue-600',
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
    gradient: 'from-violet-500 to-purple-600',
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
    gradient: 'from-pink-500 to-rose-600',
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
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every solution we build is measured by its impact. We\'re obsessed with delivering tangible ROI for our clients.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Speed & Excellence',
    description: 'We move fast without sacrificing quality. Our agile approach ensures rapid deployment with precision.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We don\'t just deliver projects — we become strategic partners invested in your long-term success.',
    gradient: 'from-yellow-500 to-orange-500',
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
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full gpu-accelerated"
          style={{ 
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6">
              <span className="text-sm font-medium gradient-text">About Us</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight">
              Building the Future of
              <span className="block gradient-text mt-2">Intelligent Automation</span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're a team of AI enthusiasts, engineers, and visionaries dedicated to transforming 
              businesses through intelligent automation and voice AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
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
                      <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-5" />
        
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
                    transition-all duration-300 hover:border-white/20 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} 
                    flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 glass rounded-full mb-6">
              <span className="text-sm font-medium gradient-text">The Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Meet the <span className="gradient-text">Minds</span> Behind AI Insider
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
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
                  transition-all duration-300 hover:border-white/20 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.gradient} opacity-20 blur-xl 
                      transition-opacity duration-300 group-hover:opacity-40`} />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full aspect-square object-cover rounded-2xl border border-white/10"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} font-semibold mb-4`}>
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
                        <Linkedin className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                      </a>
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glass flex items-center justify-center 
                          transition-all duration-200 hover:bg-white/10 hover:scale-110"
                      >
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center 
                          transition-all duration-200 hover:bg-white/10 hover:scale-110"
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                      </a>
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's discuss how we can transform your business with AI.
            </p>
            <a
              href="/#bookcall"
              className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full 
                font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Book a Free Consultation
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

