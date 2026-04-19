'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, CheckSquare, User, Briefcase, School, Landmark, FileCheck } from 'lucide-react';
import type { ReactNode } from 'react';

export type ScreenId = 'home' | 'guides' | 'chat' | 'checklist' | 'profile';

interface TextBundle {
  welcome: string;
  home: string;
  search: string;
  guideDocs: string;
  guideSteps: string;
  checklistRelocate: string;
  checklistProgress: string;
  aiAssistant: string;
  askQuestion: string;
  guidesTitle: string;
  guidesSubtitle: string;
  guideBank: string;
  guideBankSub: string;
  guideSchool: string;
  guideSchoolSub: string;
  guideWork: string;
  guideWorkSub: string;
  chatTitle: string;
  chatOnline: string;
  chatUserQ: string;
  chatBotA: ReactNode;
  chatCtaA: string;
  chatCtaB: string;
  profileTitle: string;
  profileName: string;
  profileBadge: string;
  profileStatDone: string;
  profileStatSaved: string;
  profileStatStreak: string;
  nav: { home: string; guides: string; chat: string; profile: string };
}

interface PhoneFrameProps {
  screen: ScreenId;
  text: TextBundle;
  className?: string;
  scale?: number;
  showFloating?: boolean;
  /** When true render a subtle static halo behind the phone. Cheap radial gradient, not a blur filter. */
  halo?: boolean;
}

export default function PhoneFrame({ screen, text, className = '', scale = 1, showFloating = false, halo = false }: PhoneFrameProps) {
  const width = 280 * scale;
  const height = 570 * scale;

  return (
    <div className={`relative ${className}`} style={{ width, height, willChange: 'transform' }}>
      {halo && (
        <div
          className="absolute -inset-8 rounded-[70px] opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(0,87,184,0.35) 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(255,215,0,0.22) 0%, transparent 55%)',
          }}
        />
      )}

      {/* Phone body */}
      <div
        className="relative w-full h-full rounded-[52px] p-[6px]"
        style={{
          background: 'linear-gradient(160deg, #2b2f3a 0%, #0a0c12 50%, #1a1d27 100%)',
          boxShadow:
            '0 30px 60px -20px rgba(0,0,0,0.6), 0 10px 30px -10px rgba(0,87,184,0.28), inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* Side metal rim highlight */}
        <div
          className="absolute inset-0 rounded-[52px] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 3%, transparent 97%, rgba(255,255,255,0.12) 100%)',
          }}
        />

        {/* Screen */}
        <div
          className="relative w-full h-full rounded-[46px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0f1a3a 0%, #050714 100%)',
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="h-[22px] w-[100px] bg-black rounded-full" />
          </div>

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-10 z-10 flex items-center justify-between px-6 pt-2">
            <span className="text-[10px] font-semibold text-white/70">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 bg-white/70 rounded-sm" />
              <div className="w-3 h-2 bg-white/70 rounded-sm" />
              <div className="w-4 h-2 bg-white rounded-sm" />
            </div>
          </div>

          <div className="absolute inset-0 pt-12 pb-20 px-4 overflow-hidden">
            {screen === 'home' && <HomeScreen text={text} />}
            {screen === 'guides' && <GuidesScreen text={text} />}
            {screen === 'chat' && <ChatScreen text={text} />}
            {screen === 'checklist' && <ChecklistScreen text={text} />}
            {screen === 'profile' && <ProfileScreen text={text} />}
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#05060b]/95 border-t border-white/10 flex items-center justify-around px-4 z-10">
            {([
              { id: 'home', emoji: '🏠', label: text.nav.home },
              { id: 'guides', emoji: '📚', label: text.nav.guides },
              { id: 'chat', emoji: '💬', label: text.nav.chat },
              { id: 'profile', emoji: '👤', label: text.nav.profile },
            ] as const).map((item) => {
              const isActive = screen === item.id || (screen === 'checklist' && item.id === 'home');
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center gap-0.5 ${isActive ? 'text-[#FFD700]' : 'text-white/40'}`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="text-[9px] font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showFloating && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-8 top-24 px-3 py-2 rounded-xl bg-[#0a0c12]/90 border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-white font-medium">AI Online</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute -right-8 bottom-36 px-3 py-2 rounded-xl border border-[#FFD700]/30 bg-[#2a2100]/90 shadow-xl"
          >
            <div className="text-xs font-semibold text-[#FFD700]">🇺🇦 Слава Україні!</div>
          </motion.div>
        </>
      )}
    </div>
  );
}

function HomeScreen({ text }: { text: TextBundle }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4 mt-1">
        <div>
          <div className="text-[10px] text-[#6eb1ff] uppercase tracking-wider">{text.welcome}</div>
          <div className="text-lg font-bold text-white">{text.home}</div>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0057B8] to-[#2c7dd6] flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="h-9 rounded-xl bg-white/8 border border-white/10 flex items-center px-3 mb-4">
        <span className="text-[11px] text-white/50">{text.search}</span>
      </div>

      <div className="space-y-2.5">
        <Card tone="blue" icon={<BookOpen className="w-4 h-4 text-[#6eb1ff]" />} title={text.guideDocs} sub={text.guideSteps} progress={45} />
        <Card tone="gold" icon={<CheckSquare className="w-4 h-4 text-[#FFD700]" />} title={text.checklistRelocate} sub={text.checklistProgress} progress={53} />
        <Card tone="glass" icon={<Brain className="w-4 h-4 text-white" />} title={text.aiAssistant} sub={text.askQuestion} />
      </div>
    </div>
  );
}

function GuidesScreen({ text }: { text: TextBundle }) {
  return (
    <div className="h-full">
      <div className="mb-3 mt-1">
        <div className="text-[10px] text-[#6eb1ff] uppercase tracking-wider">{text.welcome}</div>
        <div className="text-lg font-bold text-white">{text.guidesTitle}</div>
        <div className="text-[10px] text-white/50 mt-0.5">{text.guidesSubtitle}</div>
      </div>

      <div className="space-y-2">
        <GuideRow icon={<FileCheck className="w-4 h-4" />} color="#0057B8" title={text.guideDocs} sub={text.guideSteps} />
        <GuideRow icon={<Landmark className="w-4 h-4" />} color="#FFD700" title={text.guideBank} sub={text.guideBankSub} />
        <GuideRow icon={<School className="w-4 h-4" />} color="#2c7dd6" title={text.guideSchool} sub={text.guideSchoolSub} />
        <GuideRow icon={<Briefcase className="w-4 h-4" />} color="#FFB800" title={text.guideWork} sub={text.guideWorkSub} />
      </div>
    </div>
  );
}

function ChatScreen({ text }: { text: TextBundle }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/10 mt-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057B8] to-[#2c7dd6] flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">{text.chatTitle}</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" /> {text.chatOnline}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-2 pt-3 overflow-hidden">
        <div className="flex justify-end">
          <div className="max-w-[80%] px-3 py-2 rounded-2xl rounded-br-sm bg-[#0057B8] text-[10px] text-white">
            {text.chatUserQ}
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-bl-sm bg-white/10 text-[10px] text-white/90 leading-relaxed">
            {text.chatBotA}
          </div>
        </div>
        <div className="flex gap-1.5 mt-1">
          <button className="px-2 py-1 rounded-full bg-[#0057B8]/25 text-[#6eb1ff] text-[9px] border border-[#0057B8]/40 font-medium">
            {text.chatCtaA}
          </button>
          <button className="px-2 py-1 rounded-full bg-white/5 text-white/70 text-[9px] border border-white/10 font-medium">
            {text.chatCtaB}
          </button>
        </div>
      </div>
    </div>
  );
}

function ChecklistScreen({ text }: { text: TextBundle }) {
  const items = [
    { label: text.guideDocs, done: true },
    { label: text.guideBank, done: true },
    { label: text.guideSchool, done: true },
    { label: text.guideWork, done: false },
    { label: text.guideWorkSub, done: false },
  ];
  return (
    <div className="h-full">
      <div className="mb-3 mt-1">
        <div className="text-[10px] text-[#FFD700] uppercase tracking-wider">🇨🇭 Switzerland</div>
        <div className="text-lg font-bold text-white">{text.checklistRelocate}</div>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[53%] rounded-full bg-gradient-to-r from-[#0057B8] to-[#FFD700]" />
        </div>
        <div className="text-[9px] text-white/50 mt-1">{text.checklistProgress}</div>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-2 p-2 rounded-lg border ${item.done ? 'border-[#FFD700]/30 bg-[#FFD700]/5' : 'border-white/10 bg-white/5'}`}>
            <div className={`w-4 h-4 rounded-md flex items-center justify-center ${item.done ? 'bg-[#FFD700] text-black' : 'border border-white/20'}`}>
              {item.done && <span className="text-[9px] font-bold">✓</span>}
            </div>
            <span className={`text-[10px] ${item.done ? 'text-white/50 line-through' : 'text-white'}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ text }: { text: TextBundle }) {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center mt-2 mb-4">
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0057B8] to-[#FFD700] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0a0c12] flex items-center justify-center text-2xl">
              🇺🇦
            </div>
          </div>
        </div>
        <div className="text-sm font-bold text-white">{text.profileName}</div>
        <div className="mt-1 px-2 py-0.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30">
          <span className="text-[9px] text-[#FFD700] font-semibold">{text.profileBadge}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <Stat value="12" label={text.profileStatDone} />
        <Stat value="8" label={text.profileStatSaved} />
        <Stat value="21" label={text.profileStatStreak} />
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-br from-[#0057B8]/25 to-[#FFD700]/15 border border-white/10">
        <div className="text-[9px] text-white/60 mb-1">{text.profileTitle}</div>
        <div className="text-[11px] font-semibold text-white">{text.guideDocs}</div>
        <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-[#0057B8] to-[#6eb1ff]" />
        </div>
      </div>
    </div>
  );
}

function Card({
  tone,
  icon,
  title,
  sub,
  progress,
}: {
  tone: 'blue' | 'gold' | 'glass';
  icon: ReactNode;
  title: string;
  sub: string;
  progress?: number;
}) {
  const bg =
    tone === 'blue'
      ? 'from-[#0057B8]/30 to-[#0057B8]/10 border-[#0057B8]/40'
      : tone === 'gold'
      ? 'from-[#FFD700]/25 to-[#FFD700]/5 border-[#FFD700]/30'
      : 'from-white/8 to-white/2 border-white/10';
  const iconBg = tone === 'blue' ? 'bg-[#0057B8]/30' : tone === 'gold' ? 'bg-[#FFD700]/20' : 'bg-white/10';
  return (
    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${bg} border`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-white truncate">{title}</div>
          <div className="text-[9px] text-white/60 truncate">{sub}</div>
        </div>
      </div>
      {typeof progress === 'number' && (
        <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: tone === 'gold' ? 'linear-gradient(90deg, #FFD700, #FFB800)' : 'linear-gradient(90deg, #0057B8, #6eb1ff)',
            }}
          />
        </div>
      )}
    </div>
  );
}

function GuideRow({ icon, color, title, sub }: { icon: ReactNode; color: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-white truncate">{title}</div>
        <div className="text-[9px] text-white/55 truncate">{sub}</div>
      </div>
      <div className="text-white/30 text-sm">›</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-center">
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[8px] text-white/50 uppercase tracking-wider">{label}</div>
    </div>
  );
}
