// Cases data structure for AI Insider Cases Page
import { Industry } from './chatPrompts';
import { Language } from './translations';

export type CaseCategory = 'ecommerce' | 'beauty' | 'realestate' | 'voice' | 'automation' | 'social';

export interface CaseResult {
  value: string;
  label: { uk: string; en: string };
  prefix?: string;
  suffix?: string;
}

export interface ProcessPhase {
  number: number;
  title: { uk: string; en: string };
  description: { uk: string; en: string };
  duration: { uk: string; en: string };
  deliverables: { uk: string; en: string }[];
}

export interface Testimonial {
  quote: { uk: string; en: string };
  author: string;
  role: { uk: string; en: string };
}

export interface CaseStudy {
  id: string;
  slug: string;
  category: CaseCategory;
  industry?: Industry;
  icon: string;
  industryName: { uk: string; en: string };
  title: { uk: string; en: string };
  shortDescription: { uk: string; en: string };
  fullDescription?: { uk: string; en: string };
  problem: {
    title: { uk: string; en: string };
    points: { uk: string; en: string }[];
  };
  solution: {
    title: { uk: string; en: string };
    points: { uk: string; en: string }[];
  };
  results: CaseResult[];
  technologies: string[];
  ctas: CaseCTA[];
  featured?: boolean;
  hasUIDemo?: boolean;
  // Extended info
  timeline?: { uk: string; en: string };
  investment?: { uk: string; en: string };
  process?: ProcessPhase[];
  features?: { icon: string; title: { uk: string; en: string }; description: { uk: string; en: string } }[];
  testimonial?: Testimonial;
}

export interface CaseCTA {
  id: string;
  label: { uk: string; en: string };
  icon: string;
  action: 'demo' | 'voice' | 'flow' | 'contact' | 'book';
  primary?: boolean;
}

export const categoryLabels: Record<CaseCategory, { uk: string; en: string }> = {
  ecommerce: { uk: '🛒 E-commerce', en: '🛒 E-commerce' },
  beauty: { uk: '💄 Краса', en: '💄 Beauty' },
  realestate: { uk: '🏠 Нерухомість', en: '🏠 Real Estate' },
  voice: { uk: '🎧 Голосові агенти', en: '🎧 Voice Agents' },
  automation: { uk: '⚙️ Автоматизація', en: '⚙️ Automation' },
  social: { uk: '💙 Соціальний проект', en: '💙 Social Impact' },
};

export const categoryFilters: { id: CaseCategory | 'all'; label: { uk: string; en: string }; icon: string }[] = [
  { id: 'all', label: { uk: 'Всі кейси', en: 'All Cases' }, icon: '✨' },
  { id: 'ecommerce', label: { uk: 'E-commerce', en: 'E-commerce' }, icon: '🛒' },
  { id: 'beauty', label: { uk: 'Краса', en: 'Beauty' }, icon: '💄' },
  { id: 'realestate', label: { uk: 'Нерухомість', en: 'Real Estate' }, icon: '🏠' },
  { id: 'voice', label: { uk: 'Голосові агенти', en: 'Voice Agents' }, icon: '🎧' },
  { id: 'automation', label: { uk: 'Автоматизація', en: 'Automation' }, icon: '⚙️' },
  { id: 'social', label: { uk: 'Соціальний проект', en: 'Social Impact' }, icon: '💙' },
];

export const getLocalizedText = (text: { uk: string; en: string } | undefined, lang: Language): string => {
  if (!text) return '';
  return text[lang] || text.en;
};

export const casesData: CaseStudy[] = [
  // CASE 1: E-COMMERCE
  {
    id: 'case-ecommerce',
    slug: 'ecommerce-ai-chatbot',
    category: 'ecommerce',
    industry: 'ecommerce',
    icon: '🛒',
    industryName: { uk: 'E-commerce', en: 'E-commerce' },
    title: { 
      uk: 'AI Чатбот + Голосовий агент для E-commerce', 
      en: 'AI Chatbot + Voice Agent for E-commerce' 
    },
    shortDescription: { 
      uk: 'Автоматизована підтримка клієнтів, рекомендації товарів та відстеження замовлень з AI',
      en: 'Automated customer support, product recommendations and order tracking with AI'
    },
    fullDescription: {
      uk: 'Комплексне AI-рішення для інтернет-магазину, що включає інтелектуальний чатбот для підтримки клієнтів, систему рекомендацій товарів на основі поведінки користувача та голосового агента для обробки вхідних дзвінків. Система інтегрована з CRM та платформою електронної комерції.',
      en: 'A comprehensive AI solution for an online store that includes an intelligent chatbot for customer support, a product recommendation system based on user behavior, and a voice agent for handling incoming calls. The system is integrated with CRM and e-commerce platform.'
    },
    timeline: { uk: '4-6 тижнів', en: '4-6 weeks' },
    investment: { uk: 'від 5,000 CHF', en: 'from 5,000 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Перевантажена команда підтримки рутинними питаннями', en: 'Overloaded support team with routine questions' },
        { uk: 'Високий рівень покинутих кошиків (68%)', en: 'High cart abandonment rate (68%)' },
        { uk: 'Відсутність підтримки 24/7', en: 'No 24/7 support available' },
        { uk: 'Повільні відповіді у пікові години', en: 'Slow responses during peak hours' },
        { uk: 'Ручна обробка запитів про статус замовлення', en: 'Manual order status inquiries handling' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI-чатбот на сайті з миттєвими відповідями', en: 'AI chatbot on site with instant responses' },
        { uk: 'Розумні рекомендації товарів на основі переваг', en: 'Smart product recommendations based on preferences' },
        { uk: 'Автоматичне оновлення статусу та відстеження замовлень', en: 'Automatic order status updates and tracking' },
        { uk: 'Голосовий агент для обробки вхідних дзвінків', en: 'Voice agent for handling incoming calls' },
        { uk: 'Плавна передача людині при потребі', en: 'Seamless handoff to human when needed' },
      ],
    },
    results: [
      { value: '35', label: { uk: 'Зниження навантаження', en: 'Support Load Reduced' }, prefix: '-', suffix: '%' },
      { value: '18', label: { uk: 'Зростання конверсії', en: 'Conversion Increase' }, prefix: '+', suffix: '%' },
      { value: '12', label: { uk: 'Середній чек', en: 'Avg Order Value' }, prefix: '+', suffix: '%' },
      { value: '24/7', label: { uk: 'Доступність', en: 'Availability' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'Voice AI', 'Shopify', 'WhatsApp', 'CRM Integration'],
    process: [
      {
        number: 1,
        title: { uk: 'Аналіз та планування', en: 'Analysis & Planning' },
        description: { uk: 'Глибокий аналіз бізнес-процесів, визначення точок автоматизації та створення технічного завдання', en: 'Deep analysis of business processes, identifying automation points and creating technical specifications' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [
          { uk: 'Карта користувацьких сценаріїв', en: 'User journey map' },
          { uk: 'Технічне завдання', en: 'Technical specification' },
          { uk: 'План інтеграцій', en: 'Integration plan' },
        ],
      },
      {
        number: 2,
        title: { uk: 'Розробка AI-агента', en: 'AI Agent Development' },
        description: { uk: 'Створення та навчання AI-моделі, налаштування промптів та логіки розмов', en: 'Creating and training AI model, setting up prompts and conversation logic' },
        duration: { uk: '2-3 тижні', en: '2-3 weeks' },
        deliverables: [
          { uk: 'Навчена AI-модель', en: 'Trained AI model' },
          { uk: 'База знань продуктів', en: 'Product knowledge base' },
          { uk: 'Сценарії діалогів', en: 'Dialogue scenarios' },
        ],
      },
      {
        number: 3,
        title: { uk: 'Інтеграція та тестування', en: 'Integration & Testing' },
        description: { uk: 'Підключення до CRM, платформи магазину та тестування всіх сценаріїв', en: 'Connecting to CRM, store platform and testing all scenarios' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Інтеграція з Shopify/WooCommerce', en: 'Shopify/WooCommerce integration' },
          { uk: 'CRM синхронізація', en: 'CRM synchronization' },
          { uk: 'QA тестування', en: 'QA testing' },
        ],
      },
      {
        number: 4,
        title: { uk: 'Запуск та оптимізація', en: 'Launch & Optimization' },
        description: { uk: 'Поступовий запуск, моніторинг та оптимізація на основі реальних даних', en: 'Gradual launch, monitoring and optimization based on real data' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Живий AI-агент на сайті', en: 'Live AI agent on site' },
          { uk: 'Дашборд аналітики', en: 'Analytics dashboard' },
          { uk: 'Документація та навчання', en: 'Documentation & training' },
        ],
      },
    ],
    features: [
      { icon: '💬', title: { uk: 'Миттєві відповіді', en: 'Instant Responses' }, description: { uk: 'AI відповідає за <3 секунди на будь-яке питання', en: 'AI responds in <3 seconds to any question' } },
      { icon: '🎯', title: { uk: 'Персоналізація', en: 'Personalization' }, description: { uk: 'Рекомендації на основі історії покупок', en: 'Recommendations based on purchase history' } },
      { icon: '📦', title: { uk: 'Трекінг замовлень', en: 'Order Tracking' }, description: { uk: 'Автоматичні оновлення статусу в реальному часі', en: 'Automatic real-time status updates' } },
      { icon: '🔄', title: { uk: 'Омніканальність', en: 'Omnichannel' }, description: { uk: 'Єдиний досвід через сайт, WhatsApp, Telegram', en: 'Unified experience across site, WhatsApp, Telegram' } },
    ],
    testimonial: {
      quote: { uk: 'AI-чатбот зменшив навантаження на підтримку на 35% вже в перший місяць. Клієнти отримують відповіді миттєво, і ми бачимо реальне зростання конверсії.', en: 'The AI chatbot reduced support load by 35% in the first month. Customers get instant answers, and we see real conversion growth.' },
      author: 'E-commerce Owner',
      role: { uk: 'Власник інтернет-магазину', en: 'E-commerce Store Owner' },
    },
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати E-commerce AI', en: 'Try E-commerce AI' }, icon: '🤖', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Отримати для мого магазину', en: 'Get for My Store' }, icon: '💬', action: 'contact' },
    ],
    featured: true,
  },

  // CASE 2: BEAUTY SALON
  {
    id: 'case-beauty',
    slug: 'beauty-salon-ai-admin',
    category: 'beauty',
    industry: 'beauty',
    icon: '💄',
    industryName: { uk: 'Салон краси', en: 'Beauty Salon' },
    title: { 
      uk: 'AI Адміністратор для салону краси', 
      en: 'AI Admin for Beauty Salon' 
    },
    shortDescription: { 
      uk: 'Автоматизоване бронювання та робота з клієнтами для б\'юті-бізнесу',
      en: 'Automated booking and customer engagement for beauty business'
    },
    fullDescription: {
      uk: 'Повноцінний AI-адміністратор для салону краси, що працює через WhatsApp та веб-чат. Система автоматично приймає записи, нагадує про візити, рекомендує додаткові послуги та відповідає на запитання клієнтів 24/7.',
      en: 'A full-fledged AI administrator for a beauty salon that works through WhatsApp and web chat. The system automatically accepts appointments, sends visit reminders, recommends additional services, and answers customer questions 24/7.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    investment: { uk: 'від 3,000 CHF', en: 'from 3,000 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Пропущені повідомлення від потенційних клієнтів', en: 'Missed messages from potential clients' },
        { uk: 'Ручний процес бронювання забирає час адміністратора', en: 'Manual booking process takes admin time' },
        { uk: 'Втрата клієнтів через повільні відповіді', en: 'Lost clients due to slow responses' },
        { uk: 'Відсутність системних нагадувань та follow-up', en: 'No systematic reminders and follow-up' },
        { uk: 'Непослідовні рекомендації послуг', en: 'Inconsistent service recommendations' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI-асистент для бронювання 24/7', en: '24/7 AI booking assistant' },
        { uk: 'Автоматичні відповіді на FAQ', en: 'Automated FAQ responses' },
        { uk: 'Розумні нагадування про записи', en: 'Smart appointment reminders' },
        { uk: 'Персоналізовані рекомендації послуг', en: 'Personalized service recommendations' },
        { uk: 'Відстеження історії клієнтів', en: 'Client history tracking' },
      ],
    },
    results: [
      { value: '40', label: { uk: 'Зростання бронювань', en: 'Bookings Increase' }, prefix: '+', suffix: '%' },
      { value: '70', label: { uk: 'Зменшення адмін роботи', en: 'Admin Work Reduced' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Пропущених повідомлень', en: 'Missed Messages' }, prefix: '', suffix: '' },
      { value: '3x', label: { uk: 'Швидша відповідь', en: 'Faster Response' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'WhatsApp API', 'Booking System', 'CRM', 'SMS'],
    process: [
      {
        number: 1,
        title: { uk: 'Онбординг', en: 'Onboarding' },
        description: { uk: 'Збір інформації про послуги, ціни, графік роботи та особливості салону', en: 'Gathering information about services, prices, schedule and salon specifics' },
        duration: { uk: '2-3 дні', en: '2-3 days' },
        deliverables: [
          { uk: 'Каталог послуг', en: 'Service catalog' },
          { uk: 'Прайс-лист', en: 'Price list' },
          { uk: 'Графік майстрів', en: 'Masters schedule' },
        ],
      },
      {
        number: 2,
        title: { uk: 'Налаштування AI', en: 'AI Setup' },
        description: { uk: 'Створення AI-асистента з унікальною особистістю та знаннями вашого салону', en: 'Creating an AI assistant with unique personality and knowledge of your salon' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Персоналізований AI-асистент', en: 'Personalized AI assistant' },
          { uk: 'База відповідей на FAQ', en: 'FAQ response database' },
          { uk: 'Логіка бронювання', en: 'Booking logic' },
        ],
      },
      {
        number: 3,
        title: { uk: 'Запуск', en: 'Launch' },
        description: { uk: 'Підключення до WhatsApp, інтеграція з календарем та запуск в роботу', en: 'Connecting to WhatsApp, calendar integration and going live' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [
          { uk: 'Робочий AI-бот', en: 'Working AI bot' },
          { uk: 'Синхронізація з календарем', en: 'Calendar sync' },
          { uk: 'Система нагадувань', en: 'Reminder system' },
        ],
      },
    ],
    features: [
      { icon: '📅', title: { uk: 'Онлайн бронювання', en: 'Online Booking' }, description: { uk: 'Клієнти записуються в зручний час без дзвінків', en: 'Clients book at convenient time without calls' } },
      { icon: '⏰', title: { uk: 'Нагадування', en: 'Reminders' }, description: { uk: 'Автоматичні SMS/WhatsApp за 24 та 2 години', en: 'Auto SMS/WhatsApp 24h and 2h before' } },
      { icon: '💅', title: { uk: 'Upsell', en: 'Upselling' }, description: { uk: 'AI пропонує додаткові послуги за контекстом', en: 'AI suggests additional services contextually' } },
      { icon: '📊', title: { uk: 'Аналітика', en: 'Analytics' }, description: { uk: 'Статистика завантаженості та популярних послуг', en: 'Statistics on load and popular services' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Beauty AI', en: 'Try Beauty AI' }, icon: '💄', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Отримати для мого салону', en: 'Get for My Salon' }, icon: '💬', action: 'contact' },
    ],
    featured: true,
  },

  // CASE 3: REAL ESTATE
  {
    id: 'case-realestate',
    slug: 'real-estate-lead-qualification',
    category: 'realestate',
    industry: 'general',
    icon: '🏠',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'AI кваліфікація лідів для нерухомості', 
      en: 'AI Lead Qualification for Real Estate' 
    },
    shortDescription: { 
      uk: 'Інтелектуальна фільтрація та кваліфікація лідів до участі агента',
      en: 'Intelligent lead filtering and qualification before agent involvement'
    },
    fullDescription: {
      uk: 'Система AI-кваліфікації лідів для агентства нерухомості. AI-бот кваліфікує потенційних клієнтів за бюджетом, термінами, вподобаннями та передає тільки гарячі ліди агентам, економлячи десятки годин щотижня.',
      en: 'AI lead qualification system for real estate agency. The AI bot qualifies potential clients by budget, timeline, preferences and passes only hot leads to agents, saving dozens of hours weekly.'
    },
    timeline: { uk: '3-4 тижні', en: '3-4 weeks' },
    investment: { uk: 'від 4,000 CHF', en: 'from 4,000 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Неякісні ліди витрачають час агентів', en: 'Low-quality leads waste agent time' },
        { uk: 'Години на некваліфікованих потенційних клієнтів', en: 'Hours spent on unqualified prospects' },
        { uk: 'Відсутність системного процесу кваліфікації', en: 'No systematic qualification process' },
        { uk: 'Непослідовний follow-up з лідами', en: 'Inconsistent lead follow-up' },
        { uk: 'Пропуск гарячих лідів у неробочий час', en: 'Missing hot leads after hours' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI-чатбот кваліфікації на об\'єктах', en: 'AI qualification chatbot on listings' },
        { uk: 'Фільтр по бюджету та термінах', en: 'Budget and timeline filter' },
        { uk: 'Автоматична передача в CRM', en: 'Automatic CRM handoff' },
        { uk: 'Персоналізовані рекомендації об\'єктів', en: 'Personalized property recommendations' },
        { uk: 'Захоплення лідів 24/7', en: '24/7 lead capture' },
      ],
    },
    results: [
      { value: '50', label: { uk: 'Неякісних лідів', en: 'Bad Leads Filtered' }, prefix: '-', suffix: '%' },
      { value: '2x', label: { uk: 'Вищий close rate', en: 'Higher Close Rate' }, prefix: '', suffix: '' },
      { value: '10+', label: { uk: 'Годин збережено', en: 'Hours Saved' }, prefix: '', suffix: 'h' },
      { value: '95', label: { uk: 'Response rate', en: 'Response Rate' }, prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'CRM Integration', 'Lead Scoring', 'WhatsApp', 'Email'],
    process: [
      {
        number: 1,
        title: { uk: 'Аналіз воронки', en: 'Funnel Analysis' },
        description: { uk: 'Вивчення поточного процесу роботи з лідами та визначення критеріїв кваліфікації', en: 'Studying current lead process and defining qualification criteria' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [{ uk: 'Критерії кваліфікації', en: 'Qualification criteria' }, { uk: 'Скорингова модель', en: 'Scoring model' }],
      },
      {
        number: 2,
        title: { uk: 'Розробка бота', en: 'Bot Development' },
        description: { uk: 'Створення AI-бота з логікою кваліфікації та інтеграцією з CRM', en: 'Creating AI bot with qualification logic and CRM integration' },
        duration: { uk: '2 тижні', en: '2 weeks' },
        deliverables: [{ uk: 'AI-бот', en: 'AI bot' }, { uk: 'CRM інтеграція', en: 'CRM integration' }],
      },
      {
        number: 3,
        title: { uk: 'Запуск та навчання', en: 'Launch & Training' },
        description: { uk: 'Запуск системи та навчання команди роботі з кваліфікованими лідами', en: 'System launch and team training on working with qualified leads' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [{ uk: 'Робоча система', en: 'Working system' }, { uk: 'Навчання команди', en: 'Team training' }],
      },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Real Estate AI', en: 'Try Real Estate AI' }, icon: '🏠', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Кваліфікувати мої ліди', en: 'Qualify My Leads' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 4: VOICE AGENT
  {
    id: 'case-voice',
    slug: 'ai-voice-agent-calls',
    category: 'voice',
    industry: 'general',
    icon: '🎧',
    industryName: { uk: 'Голосовий агент', en: 'Voice Agent' },
    title: { 
      uk: 'AI Голосовий агент для дзвінків', 
      en: 'AI Voice Agent for Calls' 
    },
    shortDescription: { 
      uk: 'Більше ніколи не пропустите дзвінок з AI',
      en: 'Never miss a call again with AI'
    },
    fullDescription: {
      uk: 'Інтелектуальний голосовий AI-агент, який відповідає на всі вхідні дзвінки, записує на прийом, відповідає на FAQ та передає складні питання людям. Повна транскрипція та логування в CRM.',
      en: 'Intelligent voice AI agent that answers all incoming calls, books appointments, responds to FAQs and escalates complex issues to humans. Full transcription and CRM logging.'
    },
    timeline: { uk: '3-5 тижнів', en: '3-5 weeks' },
    investment: { uk: 'від 6,000 CHF', en: 'from 6,000 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Пропущені дзвінки у завантажені години', en: 'Missed calls during busy hours' },
        { uk: 'Обмежений робочий час', en: 'Limited business hours' },
        { uk: 'Персонал перевантажений', en: 'Staff overwhelmed' },
        { uk: 'Відсутність логування дзвінків', en: 'No call logging' },
        { uk: 'Довге очікування', en: 'Long hold times' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI відповідає на кожен дзвінок', en: 'AI answers every call' },
        { uk: 'Голосове бронювання записів', en: 'Voice appointment booking' },
        { uk: 'FAQ в природній розмові', en: 'Natural conversation FAQ' },
        { uk: 'Передача людині при потребі', en: 'Human handoff when needed' },
        { uk: 'Транскрипція та CRM', en: 'Transcription & CRM' },
      ],
    },
    results: [
      { value: '0', label: { uk: 'Пропущених дзвінків', en: 'Missed Calls' }, prefix: '', suffix: '' },
      { value: '<3s', label: { uk: 'Час відповіді', en: 'Response Time' }, prefix: '', suffix: '' },
      { value: '85', label: { uk: 'Обробляє AI', en: 'AI Handled' }, prefix: '', suffix: '%' },
      { value: '↑', label: { uk: 'Довіра', en: 'Trust' }, prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Telephony API', 'Speech-to-Text', 'CRM', 'Call Analytics'],
    ctas: [
      { id: 'voice', label: { uk: 'Послухати демо', en: 'Listen to Demo' }, icon: '🎧', action: 'voice', primary: true },
      { id: 'book', label: { uk: 'Замовити демо', en: 'Book Demo' }, icon: '📞', action: 'book' },
    ],
    featured: true,
  },

  // CASE 5: AUTOMATION - WORKFLOW
  {
    id: 'case-automation',
    slug: 'workflow-automation',
    category: 'automation',
    industry: 'general',
    icon: '⚙️',
    industryName: { uk: 'Автоматизація', en: 'Automation' },
    title: { 
      uk: 'Автоматизація бізнес-процесів', 
      en: 'Business Workflow Automation' 
    },
    shortDescription: { 
      uk: 'З\'єднайте інструменти та автоматизуйте рутину',
      en: 'Connect tools and automate routine tasks'
    },
    timeline: { uk: '2-6 тижнів', en: '2-6 weeks' },
    investment: { uk: 'від 2,500 CHF', en: 'from 2,500 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Ручне введення даних', en: 'Manual data entry' },
        { uk: 'Людські помилки', en: 'Human errors' },
        { uk: 'Повільна передача між відділами', en: 'Slow handoffs' },
        { uk: 'Час на рутинні завдання', en: 'Time on routine tasks' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI-powered введення даних', en: 'AI-powered data entry' },
        { uk: 'Автоматична маршрутизація', en: 'Automatic routing' },
        { uk: 'Інтеграція CRM та email', en: 'CRM & email integration' },
        { uk: 'Сповіщення в реальному часі', en: 'Real-time notifications' },
      ],
    },
    results: [
      { value: '80', label: { uk: 'Менше ручної роботи', en: 'Less Manual Work' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Помилок', en: 'Errors' }, prefix: '', suffix: '' },
      { value: '5x', label: { uk: 'Швидше', en: 'Faster' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'Автоматизація', en: 'Automation' }, prefix: '', suffix: '' },
    ],
    technologies: ['AI Agents', 'Zapier', 'Make', 'CRM', 'Custom Integrations'],
    ctas: [
      { id: 'flow', label: { uk: 'Дивитись потік', en: 'View Flow' }, icon: '📊', action: 'flow', primary: true },
      { id: 'contact', label: { uk: 'Автоматизувати', en: 'Automate' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 6: FACEBOOK OUTREACH
  {
    id: 'case-facebook-outreach',
    slug: 'facebook-outreach-automation',
    category: 'automation',
    industry: 'outreach',
    icon: '🚀',
    industryName: { uk: 'Лідогенерація', en: 'Lead Generation' },
    title: { 
      uk: 'Facebook Outreach з AI', 
      en: 'Facebook Outreach with AI' 
    },
    shortDescription: { 
      uk: 'Автоматизація outreach з AI персоналізацією',
      en: 'Outreach automation with AI personalization'
    },
    timeline: { uk: '4-6 тижнів', en: '4-6 weeks' },
    investment: { uk: 'від 8,000 CHF', en: 'from 8,000 CHF' },
    problem: {
      title: { uk: 'До автоматизації', en: 'Before Automation' },
      points: [
        { uk: 'Ручний outreach — повільно', en: 'Manual outreach — slow' },
        { uk: 'Лише 10-20 повідомлень/день', en: 'Only 10-20 messages/day' },
        { uk: 'Людські помилки', en: 'Human errors' },
        { uk: 'Неможливо масштабувати', en: 'Cannot scale' },
      ],
    },
    solution: {
      title: { uk: 'Що ми побудували', en: 'What We Built' },
      points: [
        { uk: 'Автоматизована система outreach', en: 'Automated outreach system' },
        { uk: 'AI-персоналізація повідомлень', en: 'AI message personalization' },
        { uk: 'UI Dashboard для кампаній', en: 'Campaign UI Dashboard' },
        { uk: 'Логи та моніторинг', en: 'Logs & monitoring' },
      ],
    },
    results: [
      { value: '15x', label: { uk: 'Швидкість outreach', en: 'Outreach Speed' }, prefix: '', suffix: '' },
      { value: '40+', label: { uk: 'Годин збережено', en: 'Hours Saved' }, prefix: '', suffix: 'h' },
      { value: '24/7', label: { uk: 'Лідогенерація', en: 'Lead Gen' }, prefix: '', suffix: '' },
      { value: '∞', label: { uk: 'Масштаб', en: 'Scale' }, prefix: '', suffix: '' },
    ],
    technologies: ['Flask API', 'Headless Browser', 'Facebook Groups', 'Campaign Logic', 'UI Dashboard'],
    ctas: [
      { id: 'demo', label: { uk: 'Отримати систему', en: 'Get System' }, icon: '🚀', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Обговорити', en: 'Discuss' }, icon: '💬', action: 'contact' },
    ],
    featured: true,
    hasUIDemo: true,
  },

  // CASE 7: FLOWERS
  {
    id: 'case-flowers',
    slug: 'flower-shop-ai-sales',
    category: 'ecommerce',
    industry: 'flowers',
    icon: '🌸',
    industryName: { uk: 'Магазин квітів', en: 'Flower Shop' },
    title: { 
      uk: 'AI Асистент для доставки квітів', 
      en: 'AI Assistant for Flower Delivery' 
    },
    shortDescription: { 
      uk: 'Персоналізовані рекомендації букетів',
      en: 'Personalized bouquet recommendations'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    investment: { uk: 'від 2,500 CHF', en: 'from 2,500 CHF' },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Клієнти не впевнені що обрати', en: 'Customers unsure what to choose' },
        { uk: 'Довгий процес рішення', en: 'Long decision process' },
        { uk: 'Втрачені upsell можливості', en: 'Lost upsell opportunities' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI питає про привід', en: 'AI asks about occasion' },
        { uk: 'Розумні рекомендації', en: 'Smart recommendations' },
        { uk: 'Автоматичні upsell', en: 'Automatic upsells' },
      ],
    },
    results: [
      { value: '35', label: { uk: 'Середній чек', en: 'Avg Order' }, prefix: '+', suffix: '%' },
      { value: '50', label: { uk: 'Швидше', en: 'Faster' }, prefix: '', suffix: '%' },
      { value: '2x', label: { uk: 'Повторних', en: 'Repeat' }, prefix: '', suffix: '' },
      { value: '90', label: { uk: 'Задоволені', en: 'Satisfied' }, prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'E-commerce', 'WhatsApp', 'Delivery API'],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Flower AI', en: 'Try Flower AI' }, icon: '🌸', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Отримати для магазину', en: 'Get for Store' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 8: SWEEZY
  {
    id: 'case-sweezy',
    slug: 'sweezy',
    category: 'social',
    industry: 'general',
    icon: '🇺🇦',
    industryName: { uk: 'Соціальний проект', en: 'Social Impact' },
    title: { 
      uk: 'Sweezy — Цифровий помічник', 
      en: 'Sweezy — Digital Assistant' 
    },
    shortDescription: { 
      uk: 'Мобільний застосунок з гайдами та AI',
      en: 'Mobile app with guides and AI'
    },
    timeline: { uk: '3-4 місяці', en: '3-4 months' },
    problem: {
      title: { uk: 'Виклик', en: 'Challenge' },
      points: [
        { uk: 'Розрізнена інформація', en: 'Scattered information' },
        { uk: 'Складність пошуку даних', en: 'Difficulty finding data' },
        { uk: 'Мовні бар\'єри', en: 'Language barriers' },
      ],
    },
    solution: {
      title: { uk: 'Що ми створили', en: 'What We Built' },
      points: [
        { uk: 'Практичні гайди', en: 'Practical guides' },
        { uk: 'Чеклісти та шаблони', en: 'Checklists & templates' },
        { uk: 'AI-асистент 24/7', en: '24/7 AI assistant' },
      ],
    },
    results: [
      { value: '10K+', label: { uk: 'Користувачів', en: 'Users' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'AI підтримка', en: 'AI Support' }, prefix: '', suffix: '' },
      { value: '50+', label: { uk: 'Гайдів', en: 'Guides' }, prefix: '', suffix: '' },
      { value: '4.8', label: { uk: 'Рейтинг', en: 'Rating' }, prefix: '⭐', suffix: '' },
    ],
    technologies: ['React Native', 'GPT-4', 'Firebase', 'Node.js', 'App Store'],
    ctas: [
      { id: 'demo', label: { uk: 'Дізнатися більше', en: 'Learn More' }, icon: '💙', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Стати партнером', en: 'Become Partner' }, icon: '🤝', action: 'contact' },
    ],
    featured: true,
  },
];

export const getCaseBySlug = (slug: string): CaseStudy | undefined => {
  return casesData.find(c => c.slug === slug);
};

export const getCasesByCategory = (category: CaseCategory | 'all'): CaseStudy[] => {
  if (category === 'all') return casesData;
  return casesData.filter(c => c.category === category);
};

export const getFeaturedCases = (): CaseStudy[] => {
  return casesData.filter(c => c.featured);
};
