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

const features = [
  {
    icon: BookOpen,
    title: 'Практичні гайди',
    titleEn: 'Practical Guides',
    description: 'Покрокові інструкції для вирішення повсякденних завдань у новій країні',
    color: '#0057B8',
  },
  {
    icon: CheckSquare,
    title: 'Чеклісти та шаблони',
    titleEn: 'Checklists & Templates',
    description: 'Готові списки та документи для швидкого старту',
    color: '#FFD700',
  },
  {
    icon: Globe,
    title: 'Багатомовний контент',
    titleEn: 'Multilingual Content',
    description: 'Українська, німецька, французька, англійська та інші мови',
    color: '#0057B8',
  },
  {
    icon: User,
    title: 'Особистий кабінет',
    titleEn: 'Personal Account',
    description: 'Збереження прогресу, закладки та персоналізовані рекомендації',
    color: '#FFD700',
  },
  {
    icon: Bell,
    title: 'Оновлення та новини',
    titleEn: 'Updates & News',
    description: 'Актуальна інформація про зміни в законодавстві та можливості',
    color: '#0057B8',
  },
  {
    icon: Brain,
    title: 'AI-асистент',
    titleEn: 'AI Assistant',
    description: 'Розумний помічник, який відповідає на питання 24/7',
    color: '#FFD700',
  },
];

const screenshots = [
  { id: 1, label: 'Головна' },
  { id: 2, label: 'Гайди' },
  { id: 3, label: 'Профіль' },
  { id: 4, label: 'Чат' },
];

const stats = [
  { value: '10,000+', label: 'Користувачів' },
  { value: '4.8', label: 'Рейтинг', icon: Star },
  { value: '50+', label: 'Гайдів' },
  { value: '24/7', label: 'Підтримка' },
];

const reviews = [
  {
    name: 'Олена К.',
    location: 'Цюрих',
    rating: 5,
    text: 'Sweezy допомогла мені швидко розібратися з усіма документами. Дуже зручний застосунок!',
  },
  {
    name: 'Дмитро С.',
    location: 'Женева',
    rating: 5,
    text: 'AI-асистент відповів на всі мої питання о 2 годині ночі. Це як мати друга, який знає все.',
  },
  {
    name: 'Ірина М.',
    location: 'Берн',
    rating: 5,
    text: 'Завдяки чеклістам я нічого не забула при переїзді. Рекомендую всім!',
  },
];

export default function SweezyAppPage() {
  const { lang } = useLanguage();
  const basePath = `/${lang}`;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section - App Store Style */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Ukrainian Flag Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(0,87,184,0.15) 0%, transparent 100%)',
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{
              background: 'linear-gradient(0deg, rgba(255,215,0,0.1) 0%, transparent 100%)',
            }}
          />
          <div 
            className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,87,184,0.2) 0%, transparent 60%)',
              filter: 'blur(60px)',
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
            <Link href={`${basePath}/cases`} className="hover:text-white transition-colors">Кейси</Link>
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
                <div 
                  className="w-28 h-28 rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl"
                  style={{ boxShadow: '0 20px 60px rgba(0,87,184,0.4)' }}
                >
                  <span className="text-5xl">🇺🇦</span>
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
                    <span className="text-sm text-gray-400">4.8 • 2.5K оцінок</span>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Розумний цифровий помічник
              </h2>
              
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Sweezy — це сучасна платформа, яка допомагає швидко знаходити актуальну, 
                корисну та структуровану інформацію в одному місці. 
                Єдина точка доступу до знань та сервісів.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-bold
                    hover:scale-[1.02] transition-transform"
                >
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-70">Завантажити в</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl font-bold
                    border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <Play className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[10px] opacity-70">Завантажити в</div>
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
                    <div className="text-xs text-gray-500">{stat.label}</div>
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
                className="relative w-[280px] h-[560px] rounded-[50px] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl"
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
                        <div className="text-xs text-blue-300 mb-1">Вітаємо!</div>
                        <div className="text-lg font-bold text-white">Головна</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Search Bar */}
                    <div className="h-10 bg-white/10 rounded-xl mb-6 flex items-center px-4">
                      <span className="text-sm text-white/50">Пошук...</span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/30 to-blue-600/20 border border-blue-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Гайд: Документи</div>
                            <div className="text-xs text-blue-300">12 кроків</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <CheckSquare className="w-5 h-5 text-yellow-300" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Чекліст: Переїзд</div>
                            <div className="text-xs text-yellow-300">8 з 15 виконано</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">AI Асистент</div>
                            <div className="text-xs text-gray-400">Задати питання</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/50 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-6">
                    {[
                      { icon: '🏠', label: 'Головна', active: true },
                      { icon: '📚', label: 'Гайди', active: false },
                      { icon: '💬', label: 'Чат', active: false },
                      { icon: '👤', label: 'Профіль', active: false },
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
              <span className="text-sm text-blue-400">Можливості</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Все що потрібно в
              <span className="text-blue-400"> одному застосунку</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sweezy створено як єдину точку доступу до знань та сервісів з фокусом на зручність, 
              зрозумілість та реальну користь.
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
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-6">
                <Brain className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">AI-функції</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Розумний помічник
                <span className="text-yellow-400"> завжди поруч</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Платформа постійно розширюється та доповнюється AI-функціями і автоматизаціями, 
                щоб ви могли вирішувати свої завдання швидше та простіше.
              </p>

              <ul className="space-y-4">
                {[
                  'Миттєві відповіді на питання українською',
                  'Персоналізовані рекомендації',
                  'Автоматичний переклад документів',
                  'Нагадування про важливі дедлайни',
                ].map((item, i) => (
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
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Sweezy AI</div>
                    <div className="text-xs text-green-400">Онлайн</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-blue-500 text-white text-sm">
                      Як отримати дозвіл на проживання?
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white/10 text-gray-200 text-sm">
                      Привіт! 👋 Для отримання дозволу S (статус захисту) потрібно:
                      <br /><br />
                      1. Зареєструватись у центрі біженців<br />
                      2. Пройти реєстрацію в SEM<br />
                      3. Отримати біометричні дані<br />
                      <br />
                      Хочете детальний гайд по кожному кроку?
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                      Детальний гайд
                    </button>
                    <button className="px-3 py-1.5 rounded-full bg-white/10 text-gray-400 text-xs border border-white/10">
                      Інше питання
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
            <h2 className="text-3xl font-bold mb-4">Відгуки користувачів</h2>
            <p className="text-gray-400">Що кажуть люди про Sweezy</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
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
            className="text-center p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(0,87,184,0.2) 0%, rgba(255,215,0,0.1) 100%)',
              border: '1px solid rgba(0,87,184,0.3)',
            }}
          >
            <div className="text-5xl mb-6">🇺🇦</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Завантажте Sweezy сьогодні
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              Приєднуйтесь до тисяч користувачів, які вже користуються Sweezy для вирішення своїх завдань.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg
                  hover:scale-[1.02] transition-transform"
              >
                <Apple className="w-6 h-6" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg
                  border border-white/20 hover:bg-white/15 transition-colors"
              >
                <Play className="w-6 h-6" />
                Google Play
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Безкоштовно • Без реклами • Для всіх українців
            </p>
          </motion.div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href={`${basePath}/cases`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Повернутися до кейсів
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

