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

export interface CaseStudy {
  id: string;
  slug: string;
  category: CaseCategory;
  industry?: Industry; // For linking to chat demo
  icon: string;
  industryName: { uk: string; en: string };
  title: { uk: string; en: string };
  shortDescription: { uk: string; en: string };
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
  hasUIDemo?: boolean; // Show UI demo section
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

// Helper to get localized text
export const getLocalizedText = (text: { uk: string; en: string }, lang: Language): string => {
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
      uk: 'AI Адміністратор для салону краси (WhatsApp + Чат)', 
      en: 'AI Admin for Beauty Salon (WhatsApp + Chat)' 
    },
    shortDescription: { 
      uk: 'Автоматизоване бронювання, нагадування та робота з клієнтами для б\'юті-бізнесу',
      en: 'Automated booking, reminders and customer engagement for beauty business'
    },
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
        { uk: 'Автоматичні відповіді на FAQ (ціни, послуги, наявність)', en: 'Automated FAQ responses (prices, services, availability)' },
        { uk: 'Розумні нагадування про записи через WhatsApp', en: 'Smart appointment reminders via WhatsApp' },
        { uk: 'Персоналізовані рекомендації та upsell послуг', en: 'Personalized recommendations and service upselling' },
        { uk: 'Відстеження історії та переваг клієнтів', en: 'Client history and preferences tracking' },
      ],
    },
    results: [
      { value: '40', label: { uk: 'Зростання бронювань', en: 'Bookings Increase' }, prefix: '+', suffix: '%' },
      { value: '70', label: { uk: 'Зменшення адмін роботи', en: 'Admin Work Reduced' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Пропущених повідомлень', en: 'Missed Messages' }, prefix: '', suffix: '' },
      { value: '3x', label: { uk: 'Швидша відповідь', en: 'Faster Response' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'WhatsApp API', 'Booking System', 'CRM', 'SMS Notifications'],
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
        { uk: 'AI-чатбот кваліфікації на об\'єктах нерухомості', en: 'AI qualification chatbot on property listings' },
        { uk: 'Фільтр по бюджету та термінах до контакту з людиною', en: 'Budget and timeline filter before human contact' },
        { uk: 'Автоматична передача в CRM з оцінкою лідів', en: 'Automatic CRM handoff with lead scoring' },
        { uk: 'Персоналізовані рекомендації об\'єктів', en: 'Personalized property recommendations' },
        { uk: 'Захоплення лідів та первинний контакт 24/7', en: '24/7 lead capture and initial contact' },
      ],
    },
    results: [
      { value: '50', label: { uk: 'Неякісних лідів відфільтровано', en: 'Bad Leads Filtered' }, prefix: '-', suffix: '%' },
      { value: '2x', label: { uk: 'Вищий close rate', en: 'Higher Close Rate' }, prefix: '', suffix: '' },
      { value: '10+', label: { uk: 'Годин збережено щотижня', en: 'Hours Saved Weekly' }, prefix: '', suffix: 'h' },
      { value: '95', label: { uk: 'Response rate лідів', en: 'Lead Response Rate' }, prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'CRM Integration', 'Lead Scoring', 'WhatsApp', 'Email Automation'],
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
      uk: 'AI Голосовий агент для вхідних дзвінків', 
      en: 'AI Voice Agent for Incoming Calls' 
    },
    shortDescription: { 
      uk: 'Більше ніколи не пропустите дзвінок з інтелектуальним голосовим AI',
      en: 'Never miss a call again with intelligent voice AI'
    },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Пропущені дзвінки у завантажені години та неробочий час', en: 'Missed calls during busy hours and after hours' },
        { uk: 'Обмежений робочий час для телефонної підтримки', en: 'Limited business hours for phone support' },
        { uk: 'Персонал перевантажений рутинними дзвінками', en: 'Staff overwhelmed with routine calls' },
        { uk: 'Відсутність логування дзвінків та інтеграції з CRM', en: 'No call logging and CRM integration' },
        { uk: 'Довге очікування на лінії розчаровує клієнтів', en: 'Long hold times frustrate customers' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI голосовий агент відповідає на кожен дзвінок', en: 'AI voice agent answers every call' },
        { uk: 'Інтелектуальне бронювання записів голосом', en: 'Intelligent voice-based appointment booking' },
        { uk: 'Обробка FAQ в природній розмові', en: 'Natural conversation FAQ handling' },
        { uk: 'Плавна передача людині при потребі', en: 'Seamless handoff to human when needed' },
        { uk: 'Повна транскрипція дзвінків та логування в CRM', en: 'Full call transcription and CRM logging' },
      ],
    },
    results: [
      { value: '0', label: { uk: 'Пропущених дзвінків', en: 'Missed Calls' }, prefix: '', suffix: '' },
      { value: '<3s', label: { uk: 'Час відповіді', en: 'Response Time' }, prefix: '', suffix: '' },
      { value: '85', label: { uk: 'Дзвінків обробляє AI', en: 'Calls Handled by AI' }, prefix: '', suffix: '%' },
      { value: '↑', label: { uk: 'Довіра клієнтів', en: 'Customer Trust' }, prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Telephony API', 'Speech-to-Text', 'CRM', 'Call Analytics'],
    ctas: [
      { id: 'voice', label: { uk: 'Послухати голосове демо', en: 'Listen to Voice Demo' }, icon: '🎧', action: 'voice', primary: true },
      { id: 'book', label: { uk: 'Замовити демо-дзвінок', en: 'Book Demo Call' }, icon: '📞', action: 'book' },
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
    industryName: { uk: 'Автоматизація процесів', en: 'Workflow Automation' },
    title: { 
      uk: 'Наскрізна автоматизація бізнес-процесів', 
      en: 'End-to-End Business Workflow Automation' 
    },
    shortDescription: { 
      uk: 'З\'єднайте ваші інструменти та автоматизуйте рутинні завдання з AI',
      en: 'Connect your tools and automate repetitive tasks with AI'
    },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Ручне введення даних у різні системи', en: 'Manual data entry across systems' },
        { uk: 'Людські помилки в повторюваних процесах', en: 'Human errors in repetitive processes' },
        { uk: 'Повільна передача між відділами', en: 'Slow handoffs between departments' },
        { uk: 'Відсутність видимості bottleneck\'ів', en: 'No visibility into bottlenecks' },
        { uk: 'Час витрачається на рутинні завдання', en: 'Time wasted on routine tasks' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI-powered витяг та введення даних', en: 'AI-powered data extraction and entry' },
        { uk: 'Автоматична маршрутизація завдань за правилами', en: 'Automatic task routing based on rules' },
        { uk: 'Інтеграція між CRM, email та інструментами', en: 'Integration between CRM, email and tools' },
        { uk: 'Сповіщення та алерти в реальному часі', en: 'Real-time notifications and alerts' },
        { uk: 'Кастомна AI-логіка для прийняття рішень', en: 'Custom AI logic for decision making' },
      ],
    },
    results: [
      { value: '80', label: { uk: 'Зменшення ручної роботи', en: 'Manual Work Reduced' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Людських помилок', en: 'Human Errors' }, prefix: '', suffix: '' },
      { value: '5x', label: { uk: 'Швидша обробка', en: 'Faster Processing' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'Автоматична робота', en: 'Auto Operation' }, prefix: '', suffix: '' },
    ],
    technologies: ['AI Agents', 'Zapier', 'Make', 'CRM', 'Custom Integrations'],
    ctas: [
      { id: 'flow', label: { uk: 'Дивитись потік автоматизації', en: 'View Automation Flow' }, icon: '📊', action: 'flow', primary: true },
      { id: 'contact', label: { uk: 'Автоматизувати мій бізнес', en: 'Automate My Business' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 6: FACEBOOK OUTREACH AUTOMATION (FEATURED ADVANCED)
  {
    id: 'case-facebook-outreach',
    slug: 'facebook-outreach-automation',
    category: 'automation',
    industry: 'outreach',
    icon: '🚀',
    industryName: { uk: 'Лідогенерація', en: 'Lead Generation' },
    title: { 
      uk: 'Автоматизована система Facebook Outreach з AI персоналізацією', 
      en: 'Automated Facebook Outreach System with AI Personalization' 
    },
    shortDescription: { 
      uk: 'Enterprise-рівня автоматизація outreach, що генерує ліди в масштабі поки ви спите',
      en: 'Enterprise-level outreach automation that generates leads at scale while you sleep'
    },
    problem: {
      title: { uk: 'До автоматизації', en: 'Before Automation' },
      points: [
        { uk: 'Ручний outreach у Facebook-групах — повільно та втомливо', en: 'Manual outreach in Facebook groups — slow and tedious' },
        { uk: 'Низький об\'єм: лише 10-20 повідомлень на день', en: 'Low volume: only 10-20 messages per day' },
        { uk: 'Людські помилки та непослідовний messaging', en: 'Human errors and inconsistent messaging' },
        { uk: 'Неможливо масштабувати без найму людей', en: 'Cannot scale without hiring people' },
        { uk: 'Ризик обмежень акаунту при ручній роботі', en: 'Account restriction risk with manual work' },
      ],
    },
    solution: {
      title: { uk: 'Що ми побудували', en: 'What We Built' },
      points: [
        { uk: 'Повністю автоматизована система Facebook outreach', en: 'Fully automated Facebook outreach system' },
        { uk: 'AI-персоналізація повідомлень для кожного prospect', en: 'AI message personalization for each prospect' },
        { uk: 'Headless browser автоматизація з підтримкою 2FA', en: 'Headless browser automation with 2FA support' },
        { uk: 'UI Dashboard для управління кампаніями', en: 'UI Dashboard for campaign management' },
        { uk: 'Логи та моніторинг прогресу в реальному часі', en: 'Real-time logs and progress monitoring' },
        { uk: 'Розумне управління сесіями та функції безпеки', en: 'Smart session management and security features' },
      ],
    },
    results: [
      { value: '15x', label: { uk: 'Збільшення швидкості outreach', en: 'Outreach Speed Increase' }, prefix: '', suffix: '' },
      { value: '40+', label: { uk: 'Годин збережено щомісяця', en: 'Hours Saved Monthly' }, prefix: '', suffix: 'h' },
      { value: '24/7', label: { uk: 'Лідогенерація', en: 'Lead Generation' }, prefix: '', suffix: '' },
      { value: '∞', label: { uk: 'Масштабованість', en: 'Scalability' }, prefix: '', suffix: '' },
    ],
    technologies: ['Flask API', 'Headless Browser', 'Facebook Groups', 'Campaign Logic', 'Session Management', 'UI Dashboard', 'Logging'],
    ctas: [
      { id: 'demo', label: { uk: 'Отримати цю Outreach систему', en: 'Get this Outreach System' }, icon: '🚀', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Обговорити стратегію Outreach', en: 'Discuss Outreach Strategy' }, icon: '💬', action: 'contact' },
      { id: 'flow', label: { uk: 'Дивитись логіку автоматизації', en: 'See Automation Logic' }, icon: '📊', action: 'flow' },
    ],
    featured: true,
    hasUIDemo: true,
  },

  // CASE 7: FLOWERS (bonus case)
  {
    id: 'case-flowers',
    slug: 'flower-shop-ai-sales',
    category: 'ecommerce',
    industry: 'flowers',
    icon: '🌸',
    industryName: { uk: 'Магазин квітів', en: 'Flower Shop' },
    title: { 
      uk: 'AI Асистент продажів для доставки квітів', 
      en: 'AI Sales Assistant for Flower Delivery' 
    },
    shortDescription: { 
      uk: 'Персоналізовані рекомендації букетів та безшовний досвід замовлення',
      en: 'Personalized bouquet recommendations and seamless ordering experience'
    },
    problem: {
      title: { uk: 'До впровадження AI', en: 'Before AI' },
      points: [
        { uk: 'Клієнти не впевнені який букет обрати', en: 'Customers unsure which bouquet to choose' },
        { uk: 'Довгий процес прийняття рішення без допомоги', en: 'Long decision process without guidance' },
        { uk: 'Втрачені можливості upsell', en: 'Lost upsell opportunities' },
        { uk: 'Ручний прийом замовлень через дзвінки/повідомлення', en: 'Manual order taking via calls/messages' },
        { uk: 'Відсутність персоналізованих рекомендацій', en: 'No personalized recommendations' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизували', en: 'What We Automated' },
      points: [
        { uk: 'AI асистент питає про привід та переваги', en: 'AI assistant asks about occasion and preferences' },
        { uk: 'Розумні рекомендації букетів з фото', en: 'Smart bouquet recommendations with photos' },
        { uk: 'Автоматичні upsell (листівки, цукерки, вази)', en: 'Automatic upsells (cards, chocolates, vases)' },
        { uk: 'Миттєве планування доставки', en: 'Instant delivery scheduling' },
        { uk: 'Follow-up для повторних приводів', en: 'Follow-up for recurring occasions' },
      ],
    },
    results: [
      { value: '35', label: { uk: 'Середній чек', en: 'Avg Order Value' }, prefix: '+', suffix: '%' },
      { value: '50', label: { uk: 'Швидше замовлення', en: 'Faster Ordering' }, prefix: '', suffix: '%' },
      { value: '2x', label: { uk: 'Повторних клієнтів', en: 'Repeat Customers' }, prefix: '', suffix: '' },
      { value: '90', label: { uk: 'Задоволеність клієнтів', en: 'Customer Satisfaction' }, prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'E-commerce Integration', 'WhatsApp', 'Delivery API'],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Flower AI', en: 'Try Flower AI' }, icon: '🌸', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Отримати для мого магазину', en: 'Get for My Store' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 8: SWEEZY - SOCIAL IMPACT (FEATURED)
  {
    id: 'case-sweezy',
    slug: 'sweezy',
    category: 'social',
    industry: 'general',
    icon: '🇺🇦',
    industryName: { uk: 'Соціальний проект', en: 'Social Impact' },
    title: { 
      uk: 'Sweezy — Розумний цифровий помічник', 
      en: 'Sweezy — Smart Digital Assistant' 
    },
    shortDescription: { 
      uk: 'Мобільний застосунок з практичними гайдами, чеклістами та AI-асистентом для українців',
      en: 'Mobile app with practical guides, checklists and AI assistant for Ukrainians'
    },
    problem: {
      title: { uk: 'Виклик', en: 'Challenge' },
      points: [
        { uk: 'Розрізнена інформація в різних джерелах', en: 'Scattered information across sources' },
        { uk: 'Складність пошуку актуальних та перевірених даних', en: 'Difficulty finding current and verified data' },
        { uk: 'Відсутність структурованих покрокових інструкцій', en: 'No structured step-by-step guides' },
        { uk: 'Мовні бар\'єри при пошуку інформації', en: 'Language barriers when searching' },
        { uk: 'Немає єдиної точки доступу до всіх сервісів', en: 'No single access point for all services' },
      ],
    },
    solution: {
      title: { uk: 'Що ми створили', en: 'What We Built' },
      points: [
        { uk: 'Практичні гайди та покрокові інструкції', en: 'Practical guides and step-by-step instructions' },
        { uk: 'Чеклісти та шаблони для повсякденних завдань', en: 'Checklists and templates for daily tasks' },
        { uk: 'Багатомовний контент', en: 'Multilingual content' },
        { uk: 'Особистий кабінет з персоналізацією', en: 'Personal account with customization' },
        { uk: 'AI-асистент що відповідає 24/7', en: '24/7 AI assistant' },
        { uk: 'Простий та інтуїтивний інтерфейс', en: 'Simple and intuitive interface' },
      ],
    },
    results: [
      { value: '10K+', label: { uk: 'Користувачів', en: 'Users' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'AI підтримка', en: 'AI Support' }, prefix: '', suffix: '' },
      { value: '50+', label: { uk: 'Гайдів', en: 'Guides' }, prefix: '', suffix: '' },
      { value: '4.8', label: { uk: 'Рейтинг', en: 'Rating' }, prefix: '⭐', suffix: '' },
    ],
    technologies: ['React Native', 'GPT-4', 'Firebase', 'Node.js', 'Push Notifications', 'App Store'],
    ctas: [
      { id: 'demo', label: { uk: 'Дізнатися більше', en: 'Learn More' }, icon: '💙', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Стати партнером', en: 'Become a Partner' }, icon: '🤝', action: 'contact' },
    ],
    featured: true,
    hasUIDemo: false,
  },
];

// Helper to get case by slug
export const getCaseBySlug = (slug: string): CaseStudy | undefined => {
  return casesData.find(c => c.slug === slug);
};

// Helper to get cases by category
export const getCasesByCategory = (category: CaseCategory | 'all'): CaseStudy[] => {
  if (category === 'all') return casesData;
  return casesData.filter(c => c.category === category);
};

// Helper to get featured cases
export const getFeaturedCases = (): CaseStudy[] => {
  return casesData.filter(c => c.featured);
};
