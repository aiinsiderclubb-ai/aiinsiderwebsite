'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Users, MessageCircle, TrendingUp, Clock, 
  CheckCircle2, Phone, Calendar, Star, Zap, ArrowUpRight,
  Activity, PieChart, Bell, Settings
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

type DashboardType = 'ecommerce' | 'beauty' | 'voice' | 'realestate';

interface DashboardPreviewProps {
  type: DashboardType;
}

export default function DashboardPreview({ type }: DashboardPreviewProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const dashboards: Record<DashboardType, {
    title: { uk: string; en: string };
    description: { uk: string; en: string };
    tabs: { label: { uk: string; en: string }; icon: React.ReactNode }[];
    stats: { value: string; label: { uk: string; en: string }; trend?: string; color: string }[];
    features: { icon: React.ReactNode; label: { uk: string; en: string } }[];
  }> = {
    ecommerce: {
      title: { uk: 'AI Analytics Dashboard', en: 'AI Analytics Dashboard' },
      description: { 
        uk: 'Персоналізований дашборд для моніторингу AI-агента в реальному часі',
        en: 'Personalized dashboard for real-time AI agent monitoring'
      },
      tabs: [
        { label: { uk: 'Огляд', en: 'Overview' }, icon: <BarChart3 className="w-3.5 h-3.5" /> },
        { label: { uk: 'Розмови', en: 'Conversations' }, icon: <MessageCircle className="w-3.5 h-3.5" /> },
        { label: { uk: 'Аналітика', en: 'Analytics' }, icon: <PieChart className="w-3.5 h-3.5" /> },
      ],
      stats: [
        { value: '2,847', label: { uk: 'Розмов сьогодні', en: 'Conversations Today' }, trend: '+12%', color: 'text-green-400' },
        { value: '94.2%', label: { uk: 'AI Resolution Rate', en: 'AI Resolution Rate' }, trend: '+3%', color: 'text-blue-400' },
        { value: '1.8s', label: { uk: 'Avg Response', en: 'Avg Response' }, trend: '-0.3s', color: 'text-purple-400' },
        { value: '€12.4K', label: { uk: 'Збережено', en: 'Cost Saved' }, trend: '+18%', color: 'text-yellow-400' },
      ],
      features: [
        { icon: <Activity className="w-4 h-4" />, label: { uk: 'Live чат моніторинг', en: 'Live chat monitoring' } },
        { icon: <TrendingUp className="w-4 h-4" />, label: { uk: 'Конверсійна аналітика', en: 'Conversion analytics' } },
        { icon: <Bell className="w-4 h-4" />, label: { uk: 'Smart alerts', en: 'Smart alerts' } },
        { icon: <Settings className="w-4 h-4" />, label: { uk: 'AI налаштування', en: 'AI settings' } },
      ],
    },
    beauty: {
      title: { uk: 'Salon AI Hub', en: 'Salon AI Hub' },
      description: { 
        uk: 'Центр управління записами та клієнтами з AI-інсайтами',
        en: 'Booking and client management hub with AI insights'
      },
      tabs: [
        { label: { uk: 'Записи', en: 'Bookings' }, icon: <Calendar className="w-3.5 h-3.5" /> },
        { label: { uk: 'Клієнти', en: 'Clients' }, icon: <Users className="w-3.5 h-3.5" /> },
        { label: { uk: 'AI Bot', en: 'AI Bot' }, icon: <MessageCircle className="w-3.5 h-3.5" /> },
      ],
      stats: [
        { value: '156', label: { uk: 'Записів цього тижня', en: 'Bookings This Week' }, trend: '+24%', color: 'text-pink-400' },
        { value: '0', label: { uk: 'Пропущених', en: 'Missed Messages' }, trend: '100%', color: 'text-green-400' },
        { value: '4.9', label: { uk: 'Рейтинг', en: 'Rating' }, trend: '⭐', color: 'text-yellow-400' },
        { value: '€8.2K', label: { uk: 'Дохід', en: 'Revenue' }, trend: '+15%', color: 'text-purple-400' },
      ],
      features: [
        { icon: <Calendar className="w-4 h-4" />, label: { uk: 'Календар записів', en: 'Booking calendar' } },
        { icon: <Users className="w-4 h-4" />, label: { uk: 'CRM клієнтів', en: 'Client CRM' } },
        { icon: <Bell className="w-4 h-4" />, label: { uk: 'Авто-нагадування', en: 'Auto reminders' } },
        { icon: <Star className="w-4 h-4" />, label: { uk: 'Відгуки', en: 'Reviews' } },
      ],
    },
    voice: {
      title: { uk: 'Voice Agent Control', en: 'Voice Agent Control' },
      description: { 
        uk: 'Повний контроль над голосовим AI-агентом',
        en: 'Complete control over your voice AI agent'
      },
      tabs: [
        { label: { uk: 'Дзвінки', en: 'Calls' }, icon: <Phone className="w-3.5 h-3.5" /> },
        { label: { uk: 'Записи', en: 'Recordings' }, icon: <Activity className="w-3.5 h-3.5" /> },
        { label: { uk: 'Налаштування', en: 'Settings' }, icon: <Settings className="w-3.5 h-3.5" /> },
      ],
      stats: [
        { value: '847', label: { uk: 'Дзвінків оброблено', en: 'Calls Handled' }, trend: '+8%', color: 'text-blue-400' },
        { value: '0', label: { uk: 'Пропущених', en: 'Missed' }, trend: '0%', color: 'text-green-400' },
        { value: '2.1m', label: { uk: 'Avg Duration', en: 'Avg Duration' }, trend: '', color: 'text-gray-400' },
        { value: '91%', label: { uk: 'Задоволеність', en: 'Satisfaction' }, trend: '+5%', color: 'text-purple-400' },
      ],
      features: [
        { icon: <Phone className="w-4 h-4" />, label: { uk: 'Live дзвінки', en: 'Live calls' } },
        { icon: <Activity className="w-4 h-4" />, label: { uk: 'Транскрипції', en: 'Transcriptions' } },
        { icon: <TrendingUp className="w-4 h-4" />, label: { uk: 'Аналітика', en: 'Analytics' } },
        { icon: <Settings className="w-4 h-4" />, label: { uk: 'Voice tuning', en: 'Voice tuning' } },
      ],
    },
    realestate: {
      title: { uk: 'Lead Qualification Hub', en: 'Lead Qualification Hub' },
      description: { 
        uk: 'Автоматична кваліфікація та скоринг лідів',
        en: 'Automatic lead qualification and scoring'
      },
      tabs: [
        { label: { uk: 'Ліди', en: 'Leads' }, icon: <Users className="w-3.5 h-3.5" /> },
        { label: { uk: 'Скоринг', en: 'Scoring' }, icon: <BarChart3 className="w-3.5 h-3.5" /> },
        { label: { uk: 'Pipeline', en: 'Pipeline' }, icon: <TrendingUp className="w-3.5 h-3.5" /> },
      ],
      stats: [
        { value: '324', label: { uk: 'Нових лідів', en: 'New Leads' }, trend: '+18%', color: 'text-blue-400' },
        { value: '67%', label: { uk: 'Кваліфіковані', en: 'Qualified' }, trend: '+12%', color: 'text-green-400' },
        { value: '€2.4M', label: { uk: 'Pipeline Value', en: 'Pipeline Value' }, trend: '+25%', color: 'text-yellow-400' },
        { value: '4.2d', label: { uk: 'Avg Time to Close', en: 'Avg Time to Close' }, trend: '-1.5d', color: 'text-purple-400' },
      ],
      features: [
        { icon: <Users className="w-4 h-4" />, label: { uk: 'Lead scoring', en: 'Lead scoring' } },
        { icon: <CheckCircle2 className="w-4 h-4" />, label: { uk: 'Auto-qualify', en: 'Auto-qualify' } },
        { icon: <Bell className="w-4 h-4" />, label: { uk: 'Hot lead alerts', en: 'Hot lead alerts' } },
        { icon: <TrendingUp className="w-4 h-4" />, label: { uk: 'CRM sync', en: 'CRM sync' } },
      ],
    },
  };

  const dashboard = dashboards[type];
  if (!dashboard) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">
            {lang === 'uk' ? 'Персоналізований дашборд' : 'Personalized Dashboard'}
          </h3>
          <p className="text-sm text-gray-500">
            {lang === 'uk' ? 'Включено в кожне рішення' : 'Included with every solution'}
          </p>
        </div>
      </div>

      {/* Dashboard Preview */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/80 to-black">
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-gray-500">
              dashboard.aiinsider.ch
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">{dashboard.title[lang]}</h4>
              <p className="text-xs text-gray-500">{dashboard.description[lang]}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-lg bg-white/5 mb-6 w-fit">
            {dashboard.tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-all
                  ${activeTab === i 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {tab.icon}
                {tab.label[lang]}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              {dashboard.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="flex items-end justify-between mb-1">
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    {stat.trend && (
                      <span className="text-[10px] text-green-400 flex items-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3" />
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500">{stat.label[lang]}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mini Chart Placeholder */}
          <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-gray-400">
                {lang === 'uk' ? 'Активність за 7 днів' : '7-Day Activity'}
              </span>
              <div className="flex items-center gap-4 text-[10px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  {lang === 'uk' ? 'Розмови' : 'Conversations'}
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  {lang === 'uk' ? 'Конверсії' : 'Conversions'}
                </span>
              </div>
            </div>
            {/* Fake Chart Bars */}
            <div className="flex items-end justify-between gap-2 h-20">
              {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1">
                  <div 
                    className="bg-gradient-to-t from-blue-500/40 to-blue-400/60 rounded-t"
                    style={{ height: `${h}%` }}
                  />
                  <div 
                    className="bg-gradient-to-t from-green-500/40 to-green-400/60 rounded-t"
                    style={{ height: `${h * 0.4}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-gray-600">
              <span>{lang === 'uk' ? 'Пн' : 'Mon'}</span>
              <span>{lang === 'uk' ? 'Вт' : 'Tue'}</span>
              <span>{lang === 'uk' ? 'Ср' : 'Wed'}</span>
              <span>{lang === 'uk' ? 'Чт' : 'Thu'}</span>
              <span>{lang === 'uk' ? 'Пт' : 'Fri'}</span>
              <span>{lang === 'uk' ? 'Сб' : 'Sat'}</span>
              <span>{lang === 'uk' ? 'Нд' : 'Sun'}</span>
            </div>
          </div>

          {/* Features Row */}
          <div className="flex flex-wrap gap-2">
            {dashboard.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5"
              >
                <span className="text-gray-400">{feature.icon}</span>
                <span className="text-xs text-gray-300">{feature.label[lang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Note */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        {lang === 'uk' 
          ? '* Дашборд налаштовується індивідуально під ваш бізнес та інтегрується з вашими системами'
          : '* Dashboard is customized for your business and integrates with your systems'
        }
      </p>
    </motion.div>
  );
}
