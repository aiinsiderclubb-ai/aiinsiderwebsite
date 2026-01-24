'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Twitter, Mail, Zap, Target, Rocket, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const heroRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });

  const teamMembers = [
    {
      nameKey: 'about.member1Name',
      roleKey: 'about.member1Role',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bioKey: 'about.member1Bio',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'alex@aiinsider.com',
      },
    },
    {
      nameKey: 'about.member2Name',
      roleKey: 'about.member2Role',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      bioKey: 'about.member2Bio',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'sarah@aiinsider.com',
      },
    },
    {
      nameKey: 'about.member3Name',
      roleKey: 'about.member3Role',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bioKey: 'about.member3Bio',
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
      titleKey: 'about.value1Title',
      descKey: 'about.value1Desc',
    },
    {
      icon: Target,
      titleKey: 'about.value2Title',
      descKey: 'about.value2Desc',
    },
    {
      icon: Rocket,
      titleKey: 'about.value3Title',
      descKey: 'about.value3Desc',
    },
    {
      icon: Users,
      titleKey: 'about.value4Title',
      descKey: 'about.value4Desc',
    },
  ];

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
              <span className="text-sm font-medium text-white">{t('about.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 leading-tight text-white">
              {t('about.title1')}
              <span 
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('about.title2')}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
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
                {t('about.ourStory')} <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{t('about.story')}</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{t('about.storyP1')}</p>
                <p>{t('about.storyP2')}</p>
                <p>{t('about.storyP3')}</p>
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
                    { number: '50+', labelKey: 'about.stat1' },
                    { number: '95%', labelKey: 'about.stat2' },
                    { number: '24/7', labelKey: 'about.stat3' },
                    { number: '3x', labelKey: 'about.stat4' },
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
                      <div className="text-sm text-gray-400">{t(stat.labelKey)}</div>
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
              {t('about.ourValues')} <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{t('about.values')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.valuesSubtitle')}
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
                  <h3 className="text-xl font-bold mb-3 text-white">{t(value.titleKey)}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(value.descKey)}</p>
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
              <span className="text-sm font-medium text-white">{t('about.theTeam')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-white">
              {t('about.meetThe')} <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{t('about.minds')}</span> {t('about.behindAI')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.teamSubtitle')}
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
                      alt={t(member.nameKey)}
                      className="relative w-full aspect-square object-cover rounded-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-1 text-white">{t(member.nameKey)}</h3>
                    <p className="text-white/70 font-semibold mb-4">
                      {t(member.roleKey)}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{t(member.bioKey)}</p>

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
              {t('about.readyToWork')}
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              {t('about.letsDiscuss')}
            </p>
            <Link
              href={`${basePath}#bookcall`}
              className="inline-block px-10 py-4 bg-white text-black rounded-full 
                font-bold text-lg transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.25)' }}
            >
              {t('about.bookFreeConsult')}
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
