'use client';

import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Apple,
  Play,
  Star,
  ChevronRight,
  Sparkles,
  Plane,
  FileCheck,
  Landmark,
  School,
  Briefcase,
  MapPin,
  Quote,
  User,
  Globe,
  Smartphone,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageCTA from '../../components/PageCTA';
import { useLanguage } from '../../context/LanguageContext';
import { getCaseBySlug } from '../../lib/casesData';
import { getLocalizedText as getLocalizedServiceText, getServiceBySlug } from '../../lib/servicesData';
import { getSiteUrl } from '../../lib/site';
import SilkRibbon from './_components/SilkRibbon';
import PhoneFrame, { type ScreenId } from './_components/PhoneFrame';
import TypewriterChat, { type ChatMessage } from './_components/TypewriterChat';

/* ===== Hero horizontal parallax rail ===== */
function HeroRail({ text, basePath, t, lang }: { text: any; basePath: string; t: (uk: string, en: string) => string; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Three phones drift horizontally at different speeds / depths
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const opacityFade = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-6, -10]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [6, 10]);

  return (
    <section ref={ref} className="relative pt-28 md:pt-36 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 15% 30%, rgba(0,87,184,0.32) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 85% 60%, rgba(255,215,0,0.18) 0%, transparent 55%)
            `,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/50 mb-8"
        >
          <Link href={`${basePath}/cases`} className="hover:text-white transition-colors">
            {t('Кейси', 'Cases')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#FFD700]">Sweezy</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-[#0057B8] via-[#2c7dd6] to-[#FFD700] opacity-70 blur-md" />
                <div
                  className="relative w-20 h-20 rounded-[22px] flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(160deg, #0057B8 0%, #004494 50%, #001f4d 100%)',
                    boxShadow: '0 20px 50px rgba(0,87,184,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-4xl">🇺🇦</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-[#6eb1ff] font-medium mb-0.5">AI Insider × Sweezy</div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                  <span className="text-xs text-white/60">4.8 · {t('2.5K оцінок', '2.5K ratings')}</span>
                </div>
              </div>
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold font-heading leading-[0.95] tracking-tight mb-4">
              <span className="block text-white">Sweezy</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #FFD700 0%, #fff2a8 50%, #FFD700 100%)' }}
              >
                {t('Швейцарія в кишені', 'Switzerland in your pocket')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-8">
              {t(
                'Кінематографічна історія про українця, який обживається у Швейцарії — гайди, чеклісти та AI-асистент, що завжди поруч.',
                'A cinematic story of a Ukrainian settling into Switzerland — guides, checklists and an AI assistant always by your side.',
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="https://apps.apple.com/app/sweezy/id6759244315"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white text-black rounded-2xl font-bold transition-all hover:scale-[1.03] hover:shadow-2xl hover:shadow-white/20"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium opacity-60">{t('Завантажити в', 'Download on the')}</div>
                  <div className="text-base">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="group flex items-center gap-3 px-6 py-3.5 bg-white/8 text-white rounded-2xl font-bold border border-white/15 backdrop-blur-sm transition-all hover:bg-white/12 hover:border-white/25"
              >
                <Play className="w-6 h-6 fill-white" />
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium opacity-60">{t('Завантажити в', 'Get it on')}</div>
                  <div className="text-base">Google Play</div>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-4 gap-3 max-w-md">
              {[
                { v: '10K+', l: t('Користувачів', 'Users') },
                { v: '4.8', l: t('Рейтинг', 'Rating'), star: true },
                { v: '50+', l: t('Гайдів', 'Guides') },
                { v: '24/7', l: t('AI', 'AI') },
              ].map((s, i) => (
                <div key={i} className="text-center rounded-xl py-3 px-1 bg-white/[0.03] border border-white/10">
                  <div className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-1">
                    {s.star && <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />}
                    {s.v}
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — three phones in horizontal parallax */}
          <motion.div
            style={{ y: yParallax, opacity: opacityFade }}
            className="relative h-[620px] hidden md:block"
          >
            <motion.div
              style={{ x: x1, rotate: rotate1 }}
              className="absolute top-8 -left-10 opacity-60"
            >
              <PhoneFrame screen="guides" text={text} scale={0.7} />
            </motion.div>

            <motion.div style={{ x: x2 }} className="absolute inset-0 flex items-center justify-center z-10">
              <PhoneFrame screen="home" text={text} scale={0.95} showFloating />
            </motion.div>

            <motion.div
              style={{ x: x3, rotate: rotate3 }}
              className="absolute bottom-4 -right-12 opacity-60"
            >
              <PhoneFrame screen="chat" text={text} scale={0.7} />
            </motion.div>
          </motion.div>

          {/* Mobile: single phone only */}
          <div className="md:hidden flex justify-center mt-4">
            <PhoneFrame screen="home" text={text} scale={0.85} showFloating />
          </div>
        </div>

        {/* Chapter scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex items-center gap-3 text-white/40"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
          <span className="text-xs uppercase tracking-[0.3em]">{t('Глава 1 · Історія', 'Chapter 1 · The story')}</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Sticky Phone Tour ===== */
interface TourChapter {
  eyebrow: string;
  title: string;
  body: string;
  screen: ScreenId;
}

function StickyTour({ chapters, text }: { chapters: TourChapter[]; text: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });

  return (
    <section ref={ref} className="relative" style={{ height: `${chapters.length * 80 + 40}vh` }}>
      <div className="sticky top-0 min-h-screen flex items-center py-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text chapters */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 mb-8">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span className="text-sm text-[#FFD700] font-medium">
                {text.interactiveTour}
              </span>
            </div>

            <div className="relative">
              {chapters.map((chapter, i) => (
                <TourChapterText key={i} chapter={chapter} index={i} total={chapters.length} progress={smoothProgress} />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-10 flex items-center gap-3">
              <span className="text-xs text-white/40 uppercase tracking-wider font-medium tabular-nums">
                <TourCounter progress={smoothProgress} total={chapters.length} />
              </span>
              <div className="relative h-1 flex-1 rounded-full bg-white/8 overflow-hidden max-w-xs">
                <motion.div
                  style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
                  className="absolute inset-0 bg-gradient-to-r from-[#0057B8] via-[#6eb1ff] to-[#FFD700]"
                />
              </div>
            </div>
          </div>

          {/* Right: pinned phone */}
          <div className="relative flex items-center justify-center min-h-[580px]">
            <div
              className="absolute w-[420px] h-[420px] rounded-full opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,87,184,0.4) 0%, transparent 65%)',
                filter: 'blur(60px)',
              }}
            />
            <TourPhone chapters={chapters} text={text} progress={smoothProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TourChapterText({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: TourChapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const peak = (index + 0.4) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(progress, [start, peak, end], [0.15, 1, 0.15]);
  const y = useTransform(progress, [start, peak, end], [40, 0, -40]);
  const scale = useTransform(progress, [start, peak, end], [0.96, 1, 0.96]);

  return (
    <motion.div style={{ opacity, y, scale }} className={index === 0 ? '' : 'absolute inset-0'}>
      <div className="text-sm font-semibold tracking-[0.25em] uppercase text-[#FFD700]/80 mb-3">
        {chapter.eyebrow}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading leading-tight">
        {chapter.title}
      </h3>
      <p className="text-lg text-white/70 leading-relaxed max-w-xl">{chapter.body}</p>
    </motion.div>
  );
}

function TourCounter({ progress, total }: { progress: MotionValue<number>; total: number }) {
  const idx = useTransform(progress, (v) => {
    const capped = Math.max(0, Math.min(0.999, v));
    const current = Math.floor(capped * total) + 1;
    return `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  });
  return <motion.span>{idx}</motion.span>;
}

function TourPhone({ chapters, text, progress }: { chapters: TourChapter[]; text: any; progress: MotionValue<number> }) {
  return (
    <div className="relative">
      {chapters.map((chapter, i) => {
        const start = i / chapters.length;
        const peak = (i + 0.4) / chapters.length;
        const end = (i + 1) / chapters.length;
        return (
          <TourPhoneScreen
            key={i}
            screen={chapter.screen}
            text={text}
            start={start}
            peak={peak}
            end={end}
            isFirst={i === 0}
            progress={progress}
          />
        );
      })}
    </div>
  );
}

function TourPhoneScreen({
  screen,
  text,
  start,
  peak,
  end,
  isFirst,
  progress,
}: {
  screen: ScreenId;
  text: any;
  start: number;
  peak: number;
  end: number;
  isFirst: boolean;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const scale = useTransform(progress, [start, peak, end], [0.88, 1, 0.88]);
  const y = useTransform(progress, [start, peak, end], [40, 0, -40]);

  return (
    <motion.div style={{ opacity, scale, y }} className={isFirst ? 'relative' : 'absolute inset-0'}>
      <PhoneFrame screen={screen} text={text} scale={1} />
    </motion.div>
  );
}

/* ===== Main page ===== */
export default function SweezyAppPage() {
  const { lang } = useLanguage();
  const basePath = `/${lang}`;
  const isEn = lang === 'en';
  const t = (uk: string, en: string) => (isEn ? en : uk);
  const siteUrl = getSiteUrl();
  const sweezyCase = getCaseBySlug('sweezy');
  const relatedService = sweezyCase?.relatedServiceSlug ? getServiceBySlug(sweezyCase.relatedServiceSlug) : undefined;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : 'Головна', item: new URL(basePath, siteUrl).toString() },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Cases' : 'Кейси', item: new URL(`${basePath}/cases`, siteUrl).toString() },
      { '@type': 'ListItem', position: 3, name: 'Sweezy', item: new URL(`${basePath}/cases/sweezy`, siteUrl).toString() },
    ],
  };

  const phoneText = useMemo(
    () => ({
      welcome: t('Вітаємо!', 'Welcome!'),
      home: t('Головна', 'Home'),
      search: t('Пошук...', 'Search...'),
      guideDocs: t('Гайд: Документи', 'Guide: Documents'),
      guideSteps: t('12 кроків', '12 steps'),
      checklistRelocate: t('Чекліст: Переїзд', 'Checklist: Relocation'),
      checklistProgress: t('8 з 15 виконано', '8 of 15 done'),
      aiAssistant: 'AI Assistant',
      askQuestion: t('Задати питання', 'Ask a question'),
      guidesTitle: t('Гайди', 'Guides'),
      guidesSubtitle: t('50+ покрокових інструкцій', '50+ step-by-step instructions'),
      guideBank: t('Відкриття рахунку', 'Opening a bank account'),
      guideBankSub: t('UBS · PostFinance', 'UBS · PostFinance'),
      guideSchool: t('Школа для дітей', 'School for your kids'),
      guideSchoolSub: t('Kanton Zürich', 'Kanton Zürich'),
      guideWork: t('Пошук роботи', 'Finding a job'),
      guideWorkSub: t('RAV · LinkedIn · CV', 'RAV · LinkedIn · CV'),
      chatTitle: 'Sweezy AI',
      chatOnline: t('Онлайн', 'Online'),
      chatUserQ: t('Як відкрити рахунок в UBS?', 'How do I open an account at UBS?'),
      chatBotA: isEn ? 'Bring your S permit, ID & rental contract…' : 'Візьміть S-дозвіл, ID і договір оренди…',
      chatCtaA: t('Гайд', 'Guide'),
      chatCtaB: t('Ще', 'More'),
      profileTitle: t('Активний гайд', 'Active guide'),
      profileName: 'Olena K.',
      profileBadge: t('Рівень: 🇨🇭 Резидент', 'Level: 🇨🇭 Resident'),
      profileStatDone: t('Виконано', 'Done'),
      profileStatSaved: t('Збережено', 'Saved'),
      profileStatStreak: t('Днів', 'Streak'),
      interactiveTour: t('Інтерактивний тур', 'Interactive tour'),
      nav: {
        home: t('Головна', 'Home'),
        guides: t('Гайди', 'Guides'),
        chat: t('Чат', 'Chat'),
        profile: t('Профіль', 'Profile'),
      },
    }),
    [lang],
  );

  const tourChapters: TourChapter[] = useMemo(
    () => [
      {
        eyebrow: t('01 · Початок', '01 · Beginning'),
        title: t('Все у одному застосунку', 'Everything in one app'),
        body: t(
          'Жодних закладок у браузері, жодних PDF по пошті. Відкриваєш Sweezy — і бачиш усе: гайди, чеклісти, AI-помічник. Одна точка доступу до всього, що потрібно у Швейцарії.',
          'No more lost bookmarks or PDFs in email. Open Sweezy and see everything: guides, checklists, an AI companion. A single entry point to life in Switzerland.',
        ),
        screen: 'home',
      },
      {
        eyebrow: t('02 · Знання', '02 · Knowledge'),
        title: t('50+ гайдів рідною мовою', '50+ guides in your language'),
        body: t(
          'Від S-дозволу до відкриття рахунку в UBS, від вибору школи до податків. Кожен гайд — це структурований крок-за-кроком процес із прикладами, дедлайнами та посиланнями на офіційні сайти.',
          'From S permits to UBS accounts, from picking a school to taxes. Every guide is a structured step-by-step flow with examples, deadlines and official links.',
        ),
        screen: 'guides',
      },
      {
        eyebrow: t('03 · Поруч 24/7', '03 · Always there'),
        title: t('AI-асистент, що знає Швейцарію', 'An AI that knows Switzerland'),
        body: t(
          'Питання о 2 ночі? Sweezy AI відповідає миттєво, тримає контекст твоєї ситуації та посилається на актуальні закони кантонів. Це як мати друга-юриста, який ніколи не спить.',
          'A question at 2 AM? Sweezy AI replies instantly, keeps your context in mind and cites real canton-level regulations. Like a lawyer friend who never sleeps.',
        ),
        screen: 'chat',
      },
      {
        eyebrow: t('04 · Прогрес', '04 · Progress'),
        title: t('Чекліст переїзду в твоєму темпі', 'Relocation checklist at your pace'),
        body: t(
          'Усі кроки переїзду розбиті на маленькі таски з дедлайнами. Ти бачиш, що вже готове, а що попереду — і не губиш нічого важливого між документами та побутом.',
          'Every relocation step split into small tasks with deadlines. You see what is done and what is next — nothing important falls through the cracks.',
        ),
        screen: 'checklist',
      },
      {
        eyebrow: t('05 · Ти', '05 · You'),
        title: t('Твоя історія, твій прогрес', 'Your story, your progress'),
        body: t(
          'Особистий кабінет показує, скільки гайдів пройдено, скільки чеклістів закрито й скільки днів ти активний у застосунку. Маленькі перемоги, що тримають у ритмі.',
          'Your profile shows how many guides you completed, checklists you closed and how long your streak is. Small wins that keep you in rhythm.',
        ),
        screen: 'profile',
      },
    ],
    [lang],
  );

  const chatScript: ChatMessage[] = [
    { role: 'user', text: t('Як відкрити рахунок у UBS із S-дозволом?', 'How do I open a UBS account with an S permit?') },
    {
      role: 'ai',
      text: t(
        'Привіт! 👋 Ось швидкий план:\n\n1. Візьми S-дозвіл + паспорт + договір оренди\n2. Запишись у відділення UBS (онлайн або +41 44 234 11 11)\n3. Відкрий Personal Account Plus — без щомісячної комісії для молоді до 25\n\nХочеш повний покроковий гайд?',
        'Hi! 👋 Quick plan:\n\n1. Bring your S permit + passport + rental contract\n2. Book a UBS branch slot (online or +41 44 234 11 11)\n3. Open Personal Account Plus — free monthly fee under 25\n\nWant the full step-by-step guide?',
      ),
    },
    { role: 'user', text: t('Так, давай повний гайд', 'Yes, give me the full guide') },
    {
      role: 'ai',
      text: t(
        'Відкриваю гайд «Банківський рахунок у Швейцарії» — 8 кроків, орієнтовно 2 робочі дні. Я нагадаю про дедлайн, коли підпишеш договір. 🇨🇭',
        'Opening the “Swiss bank account” guide — 8 steps, about 2 business days. I will ping you with a deadline once you sign the contract. 🇨🇭',
      ),
    },
  ];

  const storyboard = [
    {
      time: '07:42',
      icon: Plane,
      color: '#0057B8',
      title: t('Приліт у Цюрих', 'Arrival in Zurich'),
      body: t(
        'Перший крок на швейцарській землі. Sweezy відкриває чекліст «перші 24 години» — куди йти, що підписати, як знайти житло.',
        'The first step on Swiss soil. Sweezy opens the “first 24 hours” checklist — where to go, what to sign, how to find housing.',
      ),
      feature: t('Чекліст прибуття', 'Arrival checklist'),
    },
    {
      time: '11:15',
      icon: FileCheck,
      color: '#FFD700',
      title: t('Документи в SEM', 'Documents at SEM'),
      body: t(
        'Як працює S-дозвіл? Які біометричні дані потрібні? Sweezy розкладає процес на 12 кроків і показує найближчий центр реєстрації.',
        'How does the S permit work? Which biometrics do you need? Sweezy breaks the process into 12 steps and shows the closest registration centre.',
      ),
      feature: t('Гайд: Документи', 'Guide: Documents'),
    },
    {
      time: '14:30',
      icon: Landmark,
      color: '#2c7dd6',
      title: t('Рахунок у банку', 'Bank account'),
      body: t(
        'UBS, PostFinance чи Raiffeisen? AI-асистент порівнює умови, радить під твою ситуацію та показує, які документи взяти з собою.',
        'UBS, PostFinance or Raiffeisen? The AI compares terms, suggests the best fit and tells you which documents to bring.',
      ),
      feature: t('AI: Порада з банку', 'AI: Bank advice'),
    },
    {
      time: '16:05',
      icon: School,
      color: '#FFB800',
      title: t('Школа для дітей', 'School for your kids'),
      body: t(
        'Реєстрація в Kreisschulbehörde, мовні класи DaZ, позашкільні активності. Sweezy показує шаблон листа директору й перекладає його.',
        'Registration with the Kreisschulbehörde, DaZ language classes, after-school activities. Sweezy gives you a letter template and translates it.',
      ),
      feature: t('Шаблон + переклад', 'Template + translation'),
    },
    {
      time: '19:20',
      icon: Briefcase,
      color: '#6eb1ff',
      title: t('Перше інтерв’ю', 'First interview'),
      body: t(
        'RAV, LinkedIn, локальні ярмарки вакансій. Гайд із шаблонами CV у швейцарському форматі та чеклістом “до інтерв’ю” тримає тебе зібраним.',
        'RAV, LinkedIn, local job fairs. A guide with Swiss-style CV templates and a pre-interview checklist keeps you focused.',
      ),
      feature: t('CV + інтерв’ю', 'CV + interview'),
    },
  ];

  const features = [
    { icon: Globe, color: '#0057B8', title: t('Багатомовність', 'Multilingual'), body: t('UA · DE · FR · EN — одне джерело правди.', 'UA · DE · FR · EN — one source of truth.') },
    { icon: ShieldCheck, color: '#FFD700', title: t('Завжди актуально', 'Always up to date'), body: t('Зміни в кантональних законах одразу в застосунку.', 'Canton-level changes update in the app instantly.') },
    { icon: Zap, color: '#2c7dd6', title: t('Миттєвий AI', 'Instant AI'), body: t('GPT-клас, натренований на Switzerland FAQ.', 'GPT-class, fine-tuned on the Switzerland FAQ.') },
    { icon: Smartphone, color: '#FFB800', title: t('Офлайн-режим', 'Offline mode'), body: t('Гайди зберігаються локально та доступні без мережі.', 'Guides are stored locally and work without a network.') },
  ];

  const reviews = [
    {
      name: 'Olena K.',
      location: 'Zurich',
      avatar: '🌷',
      text: t(
        'Sweezy допомогла мені швидко розібратися з усіма документами. Дуже зручний застосунок!',
        'Sweezy helped me quickly navigate all the paperwork. A very convenient app!',
      ),
    },
    {
      name: 'Dmytro S.',
      location: 'Geneva',
      avatar: '🌊',
      text: t(
        'AI-асистент відповів на всі мої питання о 2 годині ночі. Це як мати друга, який знає все.',
        'The AI answered all my questions at 2 AM. It is like having a friend who knows everything.',
      ),
    },
    {
      name: 'Iryna M.',
      location: 'Bern',
      avatar: '🏔️',
      text: t(
        'Завдяки чеклістам я нічого не забула при переїзді. Рекомендую всім!',
        'Thanks to the checklists, I did not miss anything during the move. Highly recommended!',
      ),
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#05060b] text-white overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <SilkRibbon />

      <div className="relative z-10">
        <Navbar />

        <HeroRail text={phoneText} basePath={basePath} t={t} lang={lang} />

        {/* Related service ribbon */}
        {relatedService ? (
          <section className="relative px-6 pb-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/15 p-6 md:p-8 backdrop-blur-sm"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,87,184,0.2) 0%, rgba(255,255,255,0.04) 55%, rgba(255,215,0,0.1) 100%)',
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFD700]/80">
                      {isEn ? 'Related service' : 'Пов’язана послуга'}
                    </p>
                    <h3 className="mt-2 text-xl md:text-2xl font-bold text-white">
                      {isEn ? 'Want the same result?' : 'Хочете такий самий результат?'}
                    </h3>
                    <p className="mt-2 max-w-xl text-white/70">
                      {isEn ? 'This case was built using our' : 'Цей кейс реалізований за допомогою нашого сервісу'}
                    </p>
                  </div>
                  <Link
                    href={`${basePath}/services/${relatedService.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15"
                  >
                    {getLocalizedServiceText(relatedService.title, lang)}
                    {isEn ? ' service' : ''}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        ) : null}

        <StickyTour chapters={tourChapters} text={phoneText} />

        {/* Storyboard — Day in Switzerland */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0057B8]/15 border border-[#0057B8]/30 mb-6">
                <MapPin className="w-4 h-4 text-[#6eb1ff]" />
                <span className="text-sm text-[#6eb1ff] font-medium">
                  {t('Сториборд', 'Storyboard')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                {t('День українця у ', 'A Ukrainian’s day in ')}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #0057B8, #FFD700)' }}
                >
                  {t('Швейцарії', 'Switzerland')}
                </span>
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                {t(
                  '5 моментів, у яких Sweezy економить години, нерви та гугл-переклади.',
                  '5 moments where Sweezy saves hours, nerves and Google translations.',
                )}
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

              <div className="space-y-10 md:space-y-16">
                {storyboard.map((scene, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}`}
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 items-center justify-center z-10">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          background: scene.color,
                          boxShadow: `0 0 0 6px rgba(5,6,11,1), 0 0 24px 4px ${scene.color}80`,
                        }}
                      />
                    </div>

                    <div className={`relative ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                          {scene.time}
                        </span>
                        <div className="h-px w-12 bg-white/15" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading">{scene.title}</h3>
                      <p className="text-white/65 leading-relaxed mb-4">{scene.body}</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${i % 2 === 0 ? 'md:ml-auto' : ''}`}
                        style={{
                          background: `${scene.color}15`,
                          borderColor: `${scene.color}40`,
                        }}
                      >
                        <Sparkles className="w-3 h-3" style={{ color: scene.color }} />
                        <span className="text-xs font-medium" style={{ color: scene.color }}>
                          {scene.feature}
                        </span>
                      </div>
                    </div>

                    <div className={`relative ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div
                        className="relative rounded-3xl p-8 border border-white/10 overflow-hidden group"
                        style={{
                          background: `linear-gradient(145deg, ${scene.color}18 0%, rgba(255,255,255,0.02) 100%)`,
                        }}
                      >
                        <div
                          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none group-hover:opacity-60 transition-opacity"
                          style={{ background: scene.color }}
                        />
                        <div className="relative flex items-center justify-between mb-6">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                            style={{
                              background: `${scene.color}25`,
                              borderColor: `${scene.color}50`,
                              boxShadow: `0 10px 30px -5px ${scene.color}40`,
                            }}
                          >
                            <scene.icon className="w-7 h-7" style={{ color: scene.color }} />
                          </div>
                          <span
                            className="text-6xl font-bold opacity-10"
                            style={{ color: scene.color }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="relative text-xs text-white/40 uppercase tracking-wider mb-2">
                          {t('Що відкрито в Sweezy', 'Open in Sweezy')}
                        </div>
                        <div className="relative flex items-center gap-2 text-white/80 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {scene.feature}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live AI chat section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.25) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm text-[#FFD700] font-medium">
                  {t('Живий AI', 'Live AI')}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
                {t('Запитай — ', 'Ask — ')}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #FFD700, #fff2a8)' }}>
                  {t('Sweezy відповість', 'Sweezy answers')}
                </span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-lg">
                {t(
                  'Не очікуй, поки знайомий перевірить повідомлення. AI у Sweezy тримає контекст усіх твоїх гайдів і документів та відповідає з посиланнями на офіційні джерела.',
                  'No more waiting for a friend to reply. Sweezy’s AI keeps the context of your guides and documents and answers with links to official sources.',
                )}
              </p>

              <ul className="space-y-3">
                {[
                  t('Миттєві відповіді українською або англійською', 'Instant replies in Ukrainian or English'),
                  t('Прив’язка до твоїх гайдів і чеклістів', 'Tied to your guides and checklists'),
                  t('Нагадування про дедлайни у календарі', 'Deadline reminders in your calendar'),
                  t('Автопереклад офіційних документів', 'Auto-translation of official documents'),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.4)' }}
                    >
                      <span className="text-[#FFD700] text-xs font-bold">✓</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <TypewriterChat
                title="Sweezy AI"
                online={t('Онлайн · зазвичай відповідає миттєво', 'Online · usually replies instantly')}
                placeholder={t('Напиши питання…', 'Ask anything…')}
                messages={chatScript}
                chips={[
                  t('S-дозвіл', 'S permit'),
                  t('Банк', 'Bank'),
                  t('Школа', 'School'),
                  t('Податки', 'Taxes'),
                ]}
              />
            </motion.div>
          </div>
        </section>

        {/* Features grid */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">
                {t('Чому Sweezy працює', 'Why Sweezy works')}
              </h2>
              <p className="text-white/60">
                {t('Чотири принципи, на яких тримається застосунок.', 'Four principles the app stands on.')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative p-6 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 100%)',
                  }}
                >
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none group-hover:opacity-40 transition-opacity"
                    style={{ background: feature.color }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: `${feature.color}20`,
                      border: `1px solid ${feature.color}40`,
                    }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="relative text-lg font-bold text-white mb-1.5">{feature.title}</h3>
                  <p className="relative text-sm text-white/60">{feature.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
                {t('Що кажуть користувачі', 'What users say')}
              </h2>
              <p className="text-white/60">
                {t('Справжні історії з App Store та Google Play.', 'Real stories from the App Store and Google Play.')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative p-6 rounded-2xl border border-white/10 overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(0,87,184,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,215,0,0.04) 100%)',
                  }}
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FFD700]/20" />
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, k) => (
                      <Star key={k} className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>
                  <p className="text-white/85 mb-5 italic leading-relaxed">“{review.text}”</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0057B8] to-[#FFD700] p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-[#05060b] flex items-center justify-center text-xl">
                        {review.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{review.name}</div>
                      <div className="text-xs text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {review.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] border border-white/15 p-10 md:p-16 text-center overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,87,184,0.25) 0%, rgba(5,6,11,0.4) 50%, rgba(255,215,0,0.18) 100%)',
              }}
            >
              <div className="absolute -inset-px rounded-[2.5rem] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,87,184,0.5), rgba(255,215,0,0.4))',
                  padding: '1px',
                  maskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
                  WebkitMaskImage: 'linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor' as any,
                }}
              />

              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center top, rgba(0,87,184,0.4) 0%, transparent 60%), radial-gradient(ellipse at center bottom, rgba(255,215,0,0.25) 0%, transparent 60%)',
                }}
              />

              <div className="relative text-6xl mb-6">🇺🇦</div>
              <h2 className="relative text-3xl md:text-5xl font-bold font-heading mb-4">
                {t('Завантаж Sweezy', 'Download Sweezy')}
                <span className="block bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #FFD700, #fff2a8, #FFD700)' }}
                >
                  {t('і видихни', 'and breathe out')}
                </span>
              </h2>
              <p className="relative text-lg text-white/70 mb-10 max-w-xl mx-auto">
                {t(
                  'Безкоштовно. Без реклами. Для всіх українців, які роблять Швейцарію своїм новим домом.',
                  'Free. No ads. For every Ukrainian making Switzerland their new home.',
                )}
              </p>

              <div className="relative flex flex-wrap justify-center gap-3">
                <a
                  href="https://apps.apple.com/app/sweezy/id6759244315"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-7 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-[1.03] hover:shadow-2xl hover:shadow-white/25 transition-all"
                >
                  <Apple className="w-6 h-6" />
                  App Store
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-7 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <Play className="w-6 h-6 fill-white" />
                  Google Play
                </a>
              </div>

              <p className="relative mt-10 text-xs text-white/50 uppercase tracking-[0.25em]">
                {t('Безкоштовно · Без реклами · Для спільноти', 'Free · No ads · For the community')}
              </p>
            </motion.div>
          </div>
        </section>

        <PageCTA />

        {/* Back link */}
        <section className="relative py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href={`${basePath}/cases`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('Повернутися до кейсів', 'Back to case studies')}
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
