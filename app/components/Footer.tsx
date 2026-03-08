'use client';

import { motion } from 'framer-motion';
import { Youtube, Linkedin, MessageCircle, Mail, MapPin, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;

  const socialLinks = [
    { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/aiinsider' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@aiinsider' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/aiinsider' },
  ];

  const companyLinks = [
    { label: t('footer.linkAbout'), href: `${basePath}/about` },
    { label: t('footer.linkCases'), href: `${basePath}/cases` },
    { label: t('footer.linkPricing'), href: `${basePath}#pricing` },
    { label: t('footer.linkContact'), href: `${basePath}#bookcall` },
  ];

  const serviceLinks = [
    // Link to offer pages (not SEO landing "article" pages)
    { label: t('footer.linkChatbots'), href: `${basePath}/services/ai-chatbot-for-business` },
    { label: t('footer.linkVoiceAgents'), href: `${basePath}/services/ai-voice-agent` },
    { label: t('footer.linkAutomation'), href: `${basePath}/services/workflow-automation` },
    { label: t('footer.linkCustomAgents'), href: `${basePath}/services/custom-ai-models` },
  ];

  const resourceLinks = [
    { label: `${t('footer.linkBlog')} (30+)`, href: `${basePath}/blog` },
    { label: t('footer.linkServices'), href: `${basePath}/services` },
    { label: t('footer.linkSolutions'), href: `${basePath}#solutions` },
  ];

  return (
    <footer className="relative py-20 px-6 overflow-hidden border-t border-white/10">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full gpu-accelerated"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 0%, transparent 100%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Main grid: Brand | Company | Services | Resources | Contact */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href={basePath} className="flex items-center gap-3 group mb-5">
                <div
                  className="w-10 h-10 rounded-xl bg-white flex items-center justify-center
                    transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                >
                  <Zap className="w-6 h-6 text-black" fill="currentColor" />
                </div>
                <span className="text-2xl font-bold font-heading text-white">AI Insider</span>
              </Link>

              <p className="text-gray-400 leading-relaxed max-w-sm mb-5 text-sm">
                {t('footer.description')}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>
                  {t('footer.location')}{' '}
                  <span className="text-white font-semibold">{t('footer.switzerland')}</span>{' '}
                  {t('footer.workingGlobally')}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold font-heading mb-4 text-white uppercase tracking-wider">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold font-heading mb-4 text-white uppercase tracking-wider">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold font-heading mb-4 text-white uppercase tracking-wider">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold font-heading mb-4 text-white uppercase tracking-wider">
              {t('footer.getInTouch')}
            </h3>
            <div className="space-y-2.5">
              <a
                href="mailto:hello@aiinsider.it.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 shrink-0" />
                hello@aiinsider.it.com
              </a>
              <a
                href="https://t.me/aiinsider"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                @aiinsider
              </a>
            </div>

            {/* Social icons inline under contact */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div
                      className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center border border-white/10
                        transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:border-white/30 text-white"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 AI Insider —{' '}
            <span className="text-white font-semibold">{t('footer.copyright')}</span>
          </p>
          <p className="text-xs text-gray-500">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
