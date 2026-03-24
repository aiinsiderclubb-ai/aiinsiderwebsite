'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Download, Star, BookOpen, CheckSquare, 
  Globe, User, Bell, Brain, Smartphone, Shield, Heart, 
  ExternalLink, Apple, Play, ChevronRight, Sparkles, MessageCircle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';
import PageCTA from '../../components/PageCTA';
import { getCaseBySlug } from '../../lib/casesData';
import { getLocalizedText as getLocalizedServiceText, getServiceBySlug } from '../../lib/servicesData';
import { getSiteUrl } from '../../lib/site';

const features = [
  {
    icon: BookOpen,
    title: 'Практичні гайди',
    titleEn: 'Practical Guides',
    description: 'Покрокові інструкції для вирішення повсякденних завдань у новій країні',
    descriptionEn: 'Step-by-step instructions for navigating everyday tasks in a new country.',
    color: '#0057B8',
  },
  {
    icon: CheckSquare,
    title: 'Чеклісти та шаблони',
    titleEn: 'Checklists & Templates',
    description: 'Готові списки та документи для швидкого старту',
    descriptionEn: 'Ready-to-use checklists and document templates for a fast start.',
    color: '#FFD700',
  },
  {
    icon: Globe,
    title: 'Багатомовний контент',
    titleEn: 'Multilingual Content',
    description: 'Українська, німецька, французька, англійська та інші мови',
    descriptionEn: 'Ukrainian, German, French, English and more — all in one place.',
    color: '#0057B8',
  },
  {
    icon: User,
    title: 'Особистий кабінет',
    titleEn: 'Personal Account',
    description: 'Збереження прогресу, закладки та персоналізовані рекомендації',
    descriptionEn: 'Save progress, bookmark guides and get personalized recommendations.',
    color: '#FFD700',
  },
  {
    icon: Bell,
    title: 'Оновлення та новини',
    titleEn: 'Updates & News',
    description: 'Актуальна інформація про зміни в законодавстві та можливості',
    descriptionEn: 'Stay informed about legal changes, deadlines and new opportunities.',
    color: '#0057B8',
  },
  {
    icon: Brain,
    title: 'AI-асистент',
    titleEn: 'AI Assistant',
    description: 'Розумний помічник, який відповідає на питання 24/7',
    descriptionEn: 'Smart assistant that answers your questions 24/7 in any language.',
    color: '#FFD700',
  },
];

const screenshots = [
  { id: 1, label: 'Головна', labelEn: 'Home' },
  { id: 2, label: 'Гайди', labelEn: 'Guides' },
  { id: 3, label: 'Профіль', labelEn: 'Profile' },
  { id: 4, label: 'Чат', labelEn: 'Chat' },
];

const stats = [
  { value: '10,000+', label: 'Користувачів', labelEn: 'Users' },
  { value: '4.8', label: 'Рейтинг', labelEn: 'Rating', icon: Star },
  { value: '50+', label: 'Гайдів', labelEn: 'Guides' },
  { value: '24/7', label: 'Підтримка', labelEn: 'Support' },
];

const reviews = [
  {
    name: 'Olena K.',
    location: 'Zurich',
    rating: 5,
    text: 'Sweezy допомогла мені швидко розібратися з усіма документами. Дуже зручний застосунок!',
    textEn: 'Sweezy helped me quickly navigate all the paperwork after relocating. A very convenient app!',
  },
  {
    name: 'Dmytro S.',
    location: 'Geneva',
    rating: 5,
    text: 'AI-асистент відповів на всі мої питання о 2 годині ночі. Це як мати друга, який знає все.',
    textEn: 'The AI assistant answered all my questions at 2 AM. It\'s like having a friend who knows everything.',
  },
  {
    name: 'Iryna M.',
    location: 'Bern',
    rating: 5,
    text: 'Завдяки чеклістам я нічого не забула при переїзді. Рекомендую всім!',
    textEn: 'Thanks to the checklists, I didn\'t miss anything during the move. Highly recommended!',
  },
];

export default function SweezyAppPage() {
  const { lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  const t = (uk: string, en: string) => isEn ? en : uk;
  const siteUrl = getSiteUrl();
  const sweezyCase = getCaseBySlug('sweezy');
  const relatedService = sweezyCase?.relatedServiceSlug ? getServiceBySlug(sweezyCase.relatedServiceSlug) : undefined;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'en' ? 'Home' : 'Головна',
        item: new URL(basePath, siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: lang === 'en' ? 'Cases' : 'Кейси',
        item: new URL(`${basePath}/cases`, siteUrl).toString(),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sweezy',
        item: new URL(`${basePath}/cases/sweezy`, siteUrl).toString(),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      {/* Hero Section - App Store Style */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(0,87,184,0.2) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255,215,0,0.12) 0%, transparent 50%)
              `,
            }}
          />
          <div
            className="absolute top-20 right-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,87,184,0.25) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 60%)',
              filter: 'blur(80px)',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-400 mb-8"
          >
            <Link href={`${basePath}/cases`} className="hover:text-white transition-colors">{t('Кейси', 'Cases')}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-400">Sweezy</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: App Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* App Icon */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-blue-500 via-blue-400 to-yellow-400 opacity-60 blur-lg" />
                  <div 
                    className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                    style={{ boxShadow: '0 20px 60px rgba(0,87,184,0.4)' }}
                  >
                    <span className="text-5xl">🇺🇦</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-2">
                    Sweezy
                  </h1>
                  <p className="text-blue-400 font-medium mb-2">AI Insider</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">4.8 • {t('2.5K оцінок', '2.5K ratings')}</span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('Розумний цифровий помічник', 'Smart Digital Assistant')}
              </h2>
              
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {t(
                  'Sweezy — це сучасна платформа, яка допомагає швидко знаходити актуальну, корисну та структуровану інформацію в одному місці. Єдина точка доступу до знань та сервісів.',
                  'Sweezy is a modern platform that helps Ukrainian refugees in Switzerland quickly find accurate, useful, and structured information — all in one place. A single hub for knowledge and services.',
                )}
              </p>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://apps.apple.com/app/sweezy/id6759244315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-bold hover:scale-[1.02] transition-transform"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-70">{t('Завантажити в', 'Download on the')}</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl font-bold border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <Play className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-70">{t('Завантажити в', 'Get it on')}</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                      {stat.icon && <stat.icon className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{isEn ? stat.labelEn : stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              {/* Phone Frame */}
              <div 
                className="relative w-[220px] h-[440px] sm:w-[280px] sm:h-[560px] rounded-[50px] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl"
                style={{ boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' }}
              >
                {/* Screen */}
                <div className="w-full h-full rounded-[40px] bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-12 flex items-center justify-center">
                    <div className="w-24 h-6 bg-black rounded-full" />
                  </div>
                  
                  {/* App Content Mock */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-xs text-blue-300 mb-1">{t('Вітаємо!', 'Welcome!')}</div>
                        <div className="text-lg font-bold text-white">{t('Головна', 'Home')}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="h-10 bg-white/10 rounded-xl mb-6 flex items-center px-4">
                      <span className="text-sm text-white/50">{t('Пошук...', 'Search...')}</span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/30 to-blue-600/20 border border-blue-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{t('Гайд: Документи', 'Guide: Documents')}</div>
                            <div className="text-xs text-blue-300">{t('12 кроків', '12 steps')}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <CheckSquare className="w-5 h-5 text-yellow-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{t('Чекліст: Переїзд', 'Checklist: Relocation')}</div>
                            <div className="text-xs text-yellow-300">{t('8 з 15 виконано', '8 of 15 done')}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">AI Assistant</div>
                            <div className="text-xs text-gray-400">{t('Задати питання', 'Ask a question')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-6">
                    {[
                      { icon: '🏠', label: t('Головна', 'Home'), active: true },
                      { icon: '📚', label: t('Гайди', 'Guides'), active: false },
                      { icon: '💬', label: t('Чат', 'Chat'), active: false },
                      { icon: '👤', label: t('Профіль', 'Profile'), active: false },
                    ].map((item, i) => (
                      <div key={i} className={`flex flex-col items-center ${item.active ? 'text-blue-400' : 'text-gray-500'}`}>
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-[10px] mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-10 top-20 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-white">AI Online</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -right-10 bottom-40 px-4 py-2 rounded-xl bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400">🇺🇦 Слава Україні!</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {relatedService ? (
        <section className="px-6 pb-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-blue-500/30 p-8"
              style={{
                background: 'linear-gradient(135deg, rgba(0,87,184,0.18) 0%, rgba(255,255,255,0.04) 55%, rgba(255,215,0,0.08) 100%)',
              }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/90">
                    {lang === 'uk' ? 'Пов’язана послуга' : 'Related Service'}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {lang === 'uk' ? 'Хочете такий самий результат?' : 'Want the same result?'}
                  </h3>
                  <p className="mt-3 max-w-2xl text-gray-200">
                    {lang === 'uk' ? 'Цей кейс реалізований за допомогою нашого сервісу' : 'This case was built using our'}
                  </p>
                </div>

                <Link
                  href={`${basePath}/services/${relatedService.slug}`}
                  className="group inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/15"
                >
                  {getLocalizedServiceText(relatedService.title, lang)}
                  {lang === 'en' ? ' service' : ''}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">{t('Можливості', 'Features')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('Все що потрібно в', 'Everything you need in')}
              <span className="text-blue-400"> {t('одному застосунку', 'one app')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t(
                'Sweezy створено як єдину точку доступу до знань та сервісів з фокусом на зручність, зрозумілість та реальну користь.',
                'Sweezy is designed as a single access point for knowledge and services, focused on convenience, clarity, and real-world value.',
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{isEn ? feature.titleEn : feature.title}</h3>
                <p className="text-sm text-gray-400">{isEn ? feature.descriptionEn : feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="relative py-20 px-6 border-y border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6">
                <Brain className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">{t('AI-функції', 'AI Features')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t('Розумний помічник', 'Smart assistant')}
                <span className="text-yellow-400"> {t('завжди поруч', 'always by your side')}</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {t(
                  'Платформа постійно розширюється та доповнюється AI-функціями і автоматизаціями, щоб ви могли вирішувати свої завдання швидше та простіше.',
                  'The platform continuously expands with AI features and automations so you can solve challenges faster and with less effort.',
                )}
              </p>

              <ul className="space-y-4">
                {(isEn ? [
                  'Instant answers in any language',
                  'Personalized recommendations',
                  'Automatic document translation',
                  'Reminders for important deadlines',
                ] : [
                  'Миттєві відповіді на питання українською',
                  'Персоналізовані рекомендації',
                  'Автоматичний переклад документів',
                  'Нагадування про важливі дедлайни',
                ]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 text-sm">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Chat Mockup */}
              <div className="relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Sweezy AI</div>
                    <div className="text-xs text-green-400">{t('Онлайн', 'Online')}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-blue-500 text-white text-sm">
                      {t('Як отримати дозвіл на проживання?', 'How do I get a residence permit?')}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white/10 text-gray-200 text-sm">
                      {isEn ? (
                        <>
                          Hi! 👋 To get Protection Status S you need to:
                          <br /><br />
                          1. Register at a reception centre<br />
                          2. Complete registration with SEM<br />
                          3. Provide biometric data<br />
                          <br />
                          Want a step-by-step guide?
                        </>
                      ) : (
                        <>
                          Привіт! 👋 Для отримання дозволу S (статус захисту) потрібно:
                          <br /><br />
                          1. Зареєструватись у центрі біженців<br />
                          2. Пройти реєстрацію в SEM<br />
                          3. Отримати біометричні дані<br />
                          <br />
                          Хочете детальний гайд по кожному кроку?
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                      {t('Детальний гайд', 'Full guide')}
                    </button>
                    <button className="px-3 py-1.5 rounded-full bg-white/10 text-gray-400 text-xs border border-white/10">
                      {t('Інше питання', 'Ask more')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t('Відгуки користувачів', 'User Reviews')}</h2>
            <p className="text-gray-400">{t('Що кажуть люди про Sweezy', 'What people say about Sweezy')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-3 right-4 text-6xl font-bold text-white/[0.03] select-none">{String(index + 1).padStart(2, '0')}</div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{isEn ? review.textEn : review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{review.name}</div>
                    <div className="text-xs text-gray-500">{review.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-center p-10 md:p-14 rounded-[2.5rem] border border-white/15 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,87,184,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,215,0,0.08) 100%)',
            }}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-transparent to-yellow-500/10 rounded-[3rem] blur-xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            <div className="relative text-5xl mb-6">🇺🇦</div>
            <h2 className="relative text-3xl md:text-4xl font-bold font-heading mb-4">
              {t('Завантажте Sweezy сьогодні', 'Download Sweezy Today')}
            </h2>
            <p className="relative text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              {t(
                'Приєднуйтесь до тисяч користувачів, які вже користуються Sweezy для вирішення своїх завдань.',
                'Join thousands of users already using Sweezy to navigate life in a new country.',
              )}
            </p>

            <div className="relative flex flex-wrap justify-center gap-4">
              <a
                href="https://apps.apple.com/app/sweezy/id6759244315"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform"
              >
                <Apple className="w-6 h-6" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/15 transition-colors"
              >
                <Play className="w-6 h-6" />
                Google Play
              </a>
            </div>

            <p className="relative mt-8 text-sm text-gray-500">
              {t('Безкоштовно • Без реклами • Для всіх українців', 'Free • No ads • For the Ukrainian community')}
            </p>
          </motion.div>
        </div>
      </section>

      <PageCTA />

      {/* Back Link */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href={`${basePath}/cases`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Повернутися до кейсів', 'Back to case studies')}
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
      `}</style>

      <Footer />
    </main>
  );
}

