'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, CheckCircle2, Clock, Users, MessageCircle, 
  BarChart3, Settings, Send, RefreshCw, AlertCircle, Zap,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function OutreachUIDemo() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'campaigns' | 'logs'>('dashboard');
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [messagesSent, setMessagesSent] = useState(485);

  // Localized data
  const campaigns = lang === 'uk' ? [
    { id: 1, name: 'Агенти нерухомості', status: 'active', progress: 73, sent: 146, groups: 12 },
    { id: 2, name: 'Маркетингові агенції', status: 'completed', progress: 100, sent: 250, groups: 15 },
    { id: 3, name: 'Локальний бізнес', status: 'paused', progress: 45, sent: 89, groups: 8 },
  ] : [
    { id: 1, name: 'Real Estate Agents', status: 'active', progress: 73, sent: 146, groups: 12 },
    { id: 2, name: 'Marketing Agencies', status: 'completed', progress: 100, sent: 250, groups: 15 },
    { id: 3, name: 'Local Business', status: 'paused', progress: 45, sent: 89, groups: 8 },
  ];

  const logs = lang === 'uk' ? [
    { time: '14:32:15', type: 'success', message: 'Повідомлення відправлено в групу "Digital Marketing Pros"' },
    { time: '14:32:10', type: 'info', message: 'Перехід до наступної групи...' },
    { time: '14:31:58', type: 'success', message: 'Повідомлення відправлено в групу "Small Business Network"' },
    { time: '14:31:45', type: 'warning', message: 'Виявлено rate limit, очікування 30с...' },
    { time: '14:31:12', type: 'success', message: 'Повідомлення відправлено в групу "Entrepreneurs Hub"' },
    { time: '14:30:55', type: 'info', message: 'AI персоналізує повідомлення під контекст...' },
  ] : [
    { time: '14:32:15', type: 'success', message: 'Message sent to group "Digital Marketing Pros"' },
    { time: '14:32:10', type: 'info', message: 'Moving to next group...' },
    { time: '14:31:58', type: 'success', message: 'Message sent to group "Small Business Network"' },
    { time: '14:31:45', type: 'warning', message: 'Rate limit detected, waiting 30s...' },
    { time: '14:31:12', type: 'success', message: 'Message sent to group "Entrepreneurs Hub"' },
    { time: '14:30:55', type: 'info', message: 'AI personalizing message for context...' },
  ];

  const texts = {
    howItLooks: { uk: 'Як це виглядає в дії', en: 'How it looks in action' },
    livePreview: { uk: 'Живий попередній перегляд панелі автоматизації', en: 'Live preview of the automation dashboard' },
    outreachDashboard: { uk: 'Панель керування Outreach', en: 'Outreach Dashboard' },
    running: { uk: 'Працює', en: 'Running' },
    paused: { uk: 'Пауза', en: 'Paused' },
    sent: { uk: 'Надіслано', en: 'Sent' },
    groupsReached: { uk: 'Груп охоплено', en: 'Groups Reached' },
    replies: { uk: 'Відповідей', en: 'Replies' },
    conversion: { uk: 'Конверсія', en: 'Conversion' },
    campaign: { uk: 'Кампанія', en: 'Campaign' },
    completed: { uk: 'завершено', en: 'completed' },
    ofGroups: { uk: 'з 200 груп', en: 'of 200 groups' },
    timeRemaining: { uk: 'До завершення: 2г 15хв', en: 'Time remaining: 2h 15m' },
    realTimeActivity: { uk: 'Активність в реальному часі', en: 'Real-time activity' },
    sentLabel: { uk: 'надіслано', en: 'sent' },
    groupsLabel: { uk: 'груп', en: 'groups' },
    completedLabel: { uk: 'завершено', en: 'completed' },
    configureNew: { uk: 'Налаштувати нову кампанію', en: 'Configure new campaign' },
    systemLogs: { uk: 'Системні логи в реальному часі (останні 24 години)', en: 'Real-time system logs (last 24 hours)' },
    allSystemsOk: { uk: 'Усі системи працюють • Жодних помилок за останні 24г', en: 'All systems operational • No errors in last 24h' },
    systemOnline: { uk: 'Система онлайн', en: 'System online' },
    sessionActive: { uk: 'Сесія: Активна', en: 'Session: Active' },
    syncJustNow: { uk: 'Синхронізація: Щойно', en: 'Sync: Just now' },
    allChecksPassed: { uk: 'Усі перевірки пройдено', en: 'All checks passed' },
    tabDashboard: { uk: 'Dashboard', en: 'Dashboard' },
    tabCampaigns: { uk: 'Кампанії', en: 'Campaigns' },
    tabLogs: { uk: 'Логи', en: 'Logs' },
  };

  const t = (key: keyof typeof texts): string => texts[key][lang] || texts[key].en;

  // Simulate progress animation
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setCurrentProgress(prev => (prev >= 100 ? 0 : prev + 1));
      if (Math.random() > 0.7) {
        setMessagesSent(prev => prev + 1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const tabLabels = {
    dashboard: t('tabDashboard'),
    campaigns: t('tabCampaigns'),
    logs: t('tabLogs'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{t('howItLooks')}</h4>
          <p className="text-sm text-gray-400">{t('livePreview')}</p>
        </div>
      </div>

      {/* Mock Dashboard Window */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d0d12]">
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-400 ml-3">{t('outreachDashboard')}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${isAnimating 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
                }`}
            >
              {isAnimating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isAnimating ? t('running') : t('paused')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(['dashboard', 'campaigns', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative
                ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tabLabels[tab]}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Send, label: t('sent'), value: messagesSent, color: 'text-green-400' },
                  { icon: Users, label: t('groupsReached'), value: 35, color: 'text-blue-400' },
                  { icon: MessageCircle, label: t('replies'), value: 47, color: 'text-purple-400' },
                  { icon: BarChart3, label: t('conversion'), value: '9.7%', color: 'text-yellow-400' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs text-gray-500">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Current Campaign Progress */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-white">{t('campaign')}: {campaigns[0].name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{currentProgress}% {t('completed')}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>146 {t('ofGroups')}</span>
                  <span>{t('timeRemaining')}</span>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-white">{t('realTimeActivity')}</span>
                </div>
                <div className="space-y-2">
                  {logs.slice(0, 3).map((log, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                      <span className="text-gray-600 font-mono">{log.time}</span>
                      <span className={`
                        ${log.type === 'success' ? 'text-green-400' : ''}
                        ${log.type === 'info' ? 'text-blue-400' : ''}
                        ${log.type === 'warning' ? 'text-yellow-400' : ''}
                      `}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <div 
                  key={campaign.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        campaign.status === 'active' ? 'bg-green-500 animate-pulse' :
                        campaign.status === 'completed' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium text-white">{campaign.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        campaign.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        campaign.status === 'completed' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                    <div 
                      className="h-full bg-gradient-to-r from-white/40 to-white/60"
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{campaign.sent} {t('sentLabel')}</span>
                    <span>{campaign.groups} {t('groupsLabel')}</span>
                    <span>{campaign.progress}% {t('completedLabel')}</span>
                  </div>
                </div>
              ))}
              
              {/* Add Campaign Button */}
              <button className="w-full p-4 rounded-xl border border-dashed border-white/10 text-gray-500 text-sm
                hover:border-white/20 hover:text-gray-400 transition-colors flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                {t('configureNew')}
              </button>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{t('systemLogs')}</span>
              </div>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 py-2 border-b border-white/5"
                >
                  <span className="text-gray-600 flex-shrink-0">{log.time}</span>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    log.type === 'success' ? 'bg-green-500' :
                    log.type === 'info' ? 'bg-blue-500' :
                    log.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-400">{log.message}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-2 pt-4 text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <span>{t('allSystemsOk')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>{t('systemOnline')}</span>
            <span className="mx-2">•</span>
            <span>{t('sessionActive')}</span>
            <span className="mx-2">•</span>
            <span>{t('syncJustNow')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-400">{t('allChecksPassed')}</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {['Flask API', 'Headless Chrome', 'Real-time Websockets', 'PostgreSQL', 'Redis Queue'].map((tech, i) => (
          <span 
            key={i}
            className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
