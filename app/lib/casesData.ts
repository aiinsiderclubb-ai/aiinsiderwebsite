// Cases data structure for AI Insider Cases Page
import { Industry } from './chatPrompts';

export type CaseCategory = 'ecommerce' | 'beauty' | 'realestate' | 'voice' | 'automation' | 'social';

export interface CaseResult {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  category: CaseCategory;
  industry?: Industry; // For linking to chat demo
  icon: string;
  industryName: string;
  title: string;
  shortDescription: string;
  problem: {
    title: string;
    points: string[];
  };
  solution: {
    title: string;
    points: string[];
  };
  results: CaseResult[];
  technologies: string[];
  ctas: CaseCTA[];
  featured?: boolean;
  hasUIDemo?: boolean; // Show UI demo section
}

export interface CaseCTA {
  id: string;
  label: string;
  icon: string;
  action: 'demo' | 'voice' | 'flow' | 'contact' | 'book';
  primary?: boolean;
}

export const categoryLabels: Record<CaseCategory, string> = {
  ecommerce: '🛒 E-commerce',
  beauty: '💄 Краса',
  realestate: '🏠 Нерухомість',
  voice: '🎧 Голосові агенти',
  automation: '⚙️ Автоматизація',
  social: '💙 Соціальний проект',
};

export const categoryFilters: { id: CaseCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Всі кейси', icon: '✨' },
  { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
  { id: 'beauty', label: 'Краса', icon: '💄' },
  { id: 'realestate', label: 'Нерухомість', icon: '🏠' },
  { id: 'voice', label: 'Голосові агенти', icon: '🎧' },
  { id: 'automation', label: 'Автоматизація', icon: '⚙️' },
  { id: 'social', label: 'Соціальний проект', icon: '💙' },
];

export const casesData: CaseStudy[] = [
  // CASE 1: E-COMMERCE
  {
    id: 'case-ecommerce',
    slug: 'ecommerce-ai-chatbot',
    category: 'ecommerce',
    industry: 'ecommerce',
    icon: '🛒',
    industryName: 'E-commerce',
    title: 'AI Чатбот + Голосовий агент для E-commerce',
    shortDescription: 'Автоматизована підтримка клієнтів, рекомендації товарів та відстеження замовлень з AI',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Перевантажена команда підтримки рутинними питаннями',
        'Високий рівень покинутих кошиків (68%)',
        'Відсутність підтримки 24/7',
        'Повільні відповіді у пікові години',
        'Ручна обробка запитів про статус замовлення',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI-чатбот на сайті з миттєвими відповідями',
        'Розумні рекомендації товарів на основі переваг',
        'Автоматичне оновлення статусу та відстеження замовлень',
        'Голосовий агент для обробки вхідних дзвінків',
        'Плавна передача людині при потребі',
      ],
    },
    results: [
      { value: '35', label: 'Зниження навантаження', prefix: '-', suffix: '%' },
      { value: '18', label: 'Зростання конверсії', prefix: '+', suffix: '%' },
      { value: '12', label: 'Середній чек', prefix: '+', suffix: '%' },
      { value: '24/7', label: 'Доступність', prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'Voice AI', 'Shopify', 'WhatsApp', 'CRM Integration'],
    ctas: [
      { id: 'demo', label: 'Спробувати E-commerce AI', icon: '🤖', action: 'demo', primary: true },
      { id: 'contact', label: 'Отримати для мого магазину', icon: '💬', action: 'contact' },
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
    industryName: 'Салон краси',
    title: 'AI Адміністратор для салону краси (WhatsApp + Чат)',
    shortDescription: 'Автоматизоване бронювання, нагадування та робота з клієнтами для б\'юті-бізнесу',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Пропущені повідомлення від потенційних клієнтів',
        'Ручний процес бронювання забирає час адміністратора',
        'Втрата клієнтів через повільні відповіді',
        'Відсутність системних нагадувань та follow-up',
        'Непослідовні рекомендації послуг',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI-асистент для бронювання 24/7',
        'Автоматичні відповіді на FAQ (ціни, послуги, наявність)',
        'Розумні нагадування про записи через WhatsApp',
        'Персоналізовані рекомендації та upsell послуг',
        'Відстеження історії та переваг клієнтів',
      ],
    },
    results: [
      { value: '40', label: 'Зростання бронювань', prefix: '+', suffix: '%' },
      { value: '70', label: 'Зменшення адмін роботи', prefix: '-', suffix: '%' },
      { value: '0', label: 'Пропущених повідомлень', prefix: '', suffix: '' },
      { value: '3x', label: 'Швидша відповідь', prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'WhatsApp API', 'Booking System', 'CRM', 'SMS Notifications'],
    ctas: [
      { id: 'demo', label: 'Спробувати Beauty AI', icon: '💄', action: 'demo', primary: true },
      { id: 'contact', label: 'Отримати для мого салону', icon: '💬', action: 'contact' },
    ],
    featured: true,
  },

  // CASE 3: REAL ESTATE
  {
    id: 'case-realestate',
    slug: 'real-estate-lead-qualification',
    category: 'realestate',
    industry: 'general', // Maps to general for now
    icon: '🏠',
    industryName: 'Нерухомість',
    title: 'AI кваліфікація лідів для нерухомості',
    shortDescription: 'Інтелектуальна фільтрація та кваліфікація лідів до участі агента',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Неякісні ліди витрачають час агентів',
        'Години на некваліфікованих потенційних клієнтів',
        'Відсутність системного процесу кваліфікації',
        'Непослідовний follow-up з лідами',
        'Пропуск гарячих лідів у неробочий час',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI-чатбот кваліфікації на об\'єктах нерухомості',
        'Фільтр по бюджету та термінах до контакту з людиною',
        'Автоматична передача в CRM з оцінкою лідів',
        'Персоналізовані рекомендації об\'єктів',
        'Захоплення лідів та первинний контакт 24/7',
      ],
    },
    results: [
      { value: '50', label: 'Неякісних лідів відфільтровано', prefix: '-', suffix: '%' },
      { value: '2x', label: 'Вищий close rate', prefix: '', suffix: '' },
      { value: '10+', label: 'Годин збережено щотижня', prefix: '', suffix: 'год' },
      { value: '95', label: 'Response rate лідів', prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'CRM Integration', 'Lead Scoring', 'WhatsApp', 'Email Automation'],
    ctas: [
      { id: 'demo', label: 'Спробувати Real Estate AI', icon: '🏠', action: 'demo', primary: true },
      { id: 'contact', label: 'Кваліфікувати мої ліди', icon: '💬', action: 'contact' },
    ],
  },

  // CASE 4: VOICE AGENT
  {
    id: 'case-voice',
    slug: 'ai-voice-agent-calls',
    category: 'voice',
    industry: 'general',
    icon: '🎧',
    industryName: 'Голосовий агент',
    title: 'AI Голосовий агент для вхідних дзвінків',
    shortDescription: 'Більше ніколи не пропустите дзвінок з інтелектуальним голосовим AI',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Пропущені дзвінки у завантажені години та неробочий час',
        'Обмежений робочий час для телефонної підтримки',
        'Персонал перевантажений рутинними дзвінками',
        'Відсутність логування дзвінків та інтеграції з CRM',
        'Довге очікування на лінії розчаровує клієнтів',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI голосовий агент відповідає на кожен дзвінок',
        'Інтелектуальне бронювання записів голосом',
        'Обробка FAQ в природній розмові',
        'Плавна передача людині при потребі',
        'Повна транскрипція дзвінків та логування в CRM',
      ],
    },
    results: [
      { value: '0', label: 'Пропущених дзвінків', prefix: '', suffix: '' },
      { value: '<3s', label: 'Час відповіді', prefix: '', suffix: '' },
      { value: '85', label: 'Дзвінків обробляє AI', prefix: '', suffix: '%' },
      { value: '↑', label: 'Довіра клієнтів', prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Telephony API', 'Speech-to-Text', 'CRM', 'Call Analytics'],
    ctas: [
      { id: 'voice', label: 'Послухати голосове демо', icon: '🎧', action: 'voice', primary: true },
      { id: 'book', label: 'Замовити демо-дзвінок', icon: '📞', action: 'book' },
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
    industryName: 'Автоматизація процесів',
    title: 'Наскрізна автоматизація бізнес-процесів',
    shortDescription: 'З\'єднайте ваші інструменти та автоматизуйте рутинні завдання з AI',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Ручне введення даних у різні системи',
        'Людські помилки в повторюваних процесах',
        'Повільна передача між відділами',
        'Відсутність видимості bottleneck\'ів',
        'Час витрачається на рутинні завдання',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI-powered витяг та введення даних',
        'Автоматична маршрутизація завдань за правилами',
        'Інтеграція між CRM, email та інструментами',
        'Сповіщення та алерти в реальному часі',
        'Кастомна AI-логіка для прийняття рішень',
      ],
    },
    results: [
      { value: '80', label: 'Зменшення ручної роботи', prefix: '-', suffix: '%' },
      { value: '0', label: 'Людських помилок', prefix: '', suffix: '' },
      { value: '5x', label: 'Швидша обробка', prefix: '', suffix: '' },
      { value: '24/7', label: 'Автоматична робота', prefix: '', suffix: '' },
    ],
    technologies: ['AI Agents', 'Zapier', 'Make', 'CRM', 'Custom Integrations'],
    ctas: [
      { id: 'flow', label: 'Дивитись потік автоматизації', icon: '📊', action: 'flow', primary: true },
      { id: 'contact', label: 'Автоматизувати мій бізнес', icon: '💬', action: 'contact' },
    ],
  },

  // CASE 6: FACEBOOK OUTREACH AUTOMATION (FEATURED ADVANCED)
  {
    id: 'case-facebook-outreach',
    slug: 'facebook-outreach-automation',
    category: 'automation',
    industry: 'outreach',
    icon: '🚀',
    industryName: 'Лідогенерація',
    title: 'Автоматизована система Facebook Outreach з AI персоналізацією',
    shortDescription: 'Enterprise-рівня автоматизація outreach, що генерує ліди в масштабі поки ви спите',
    problem: {
      title: 'До автоматизації',
      points: [
        'Ручний outreach у Facebook-групах — повільно та втомливо',
        'Низький об\'єм: лише 10-20 повідомлень на день',
        'Людські помилки та непослідовний messaging',
        'Неможливо масштабувати без найму людей',
        'Ризик обмежень акаунту при ручній роботі',
      ],
    },
    solution: {
      title: 'Що ми побудували',
      points: [
        'Повністю автоматизована система Facebook outreach',
        'AI-персоналізація повідомлень для кожного prospect',
        'Headless browser автоматизація з підтримкою 2FA',
        'UI Dashboard для управління кампаніями',
        'Логи та моніторинг прогресу в реальному часі',
        'Розумне управління сесіями та функції безпеки',
      ],
    },
    results: [
      { value: '15x', label: 'Збільшення швидкості outreach', prefix: '', suffix: '' },
      { value: '40+', label: 'Годин збережено щомісяця', prefix: '', suffix: 'год' },
      { value: '24/7', label: 'Лідогенерація', prefix: '', suffix: '' },
      { value: '∞', label: 'Масштабованість', prefix: '', suffix: '' },
    ],
    technologies: ['Flask API', 'Headless Browser', 'Facebook Groups', 'Campaign Logic', 'Session Management', 'UI Dashboard', 'Logging'],
    ctas: [
      { id: 'demo', label: 'Отримати цю Outreach систему', icon: '🚀', action: 'demo', primary: true },
      { id: 'contact', label: 'Обговорити стратегію Outreach', icon: '💬', action: 'contact' },
      { id: 'flow', label: 'Дивитись логіку автоматизації', icon: '📊', action: 'flow' },
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
    industryName: 'Магазин квітів',
    title: 'AI Асистент продажів для доставки квітів',
    shortDescription: 'Персоналізовані рекомендації букетів та безшовний досвід замовлення',
    problem: {
      title: 'До впровадження AI',
      points: [
        'Клієнти не впевнені який букет обрати',
        'Довгий процес прийняття рішення без допомоги',
        'Втрачені можливості upsell',
        'Ручний прийом замовлень через дзвінки/повідомлення',
        'Відсутність персоналізованих рекомендацій',
      ],
    },
    solution: {
      title: 'Що ми автоматизували',
      points: [
        'AI асистент питає про привід та переваги',
        'Розумні рекомендації букетів з фото',
        'Автоматичні upsell (листівки, цукерки, вази)',
        'Миттєве планування доставки',
        'Follow-up для повторних приводів',
      ],
    },
    results: [
      { value: '35', label: 'Середній чек', prefix: '+', suffix: '%' },
      { value: '50', label: 'Швидше замовлення', prefix: '', suffix: '%' },
      { value: '2x', label: 'Повторних клієнтів', prefix: '', suffix: '' },
      { value: '90', label: 'Задоволеність клієнтів', prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'E-commerce Integration', 'WhatsApp', 'Delivery API'],
    ctas: [
      { id: 'demo', label: 'Спробувати Flower AI', icon: '🌸', action: 'demo', primary: true },
      { id: 'contact', label: 'Отримати для мого магазину', icon: '💬', action: 'contact' },
    ],
  },

  // CASE 8: SWEEZY - SOCIAL IMPACT (FEATURED)
  {
    id: 'case-sweezy',
    slug: 'sweezy',
    category: 'social',
    industry: 'general',
    icon: '🇺🇦',
    industryName: 'Соціальний проект',
    title: 'Sweezy — Розумний цифровий помічник',
    shortDescription: 'Мобільний застосунок з практичними гайдами, чеклістами та AI-асистентом для українців',
    problem: {
      title: 'Виклик',
      points: [
        'Розрізнена інформація в різних джерелах',
        'Складність пошуку актуальних та перевірених даних',
        'Відсутність структурованих покрокових інструкцій',
        'Мовні бар\'єри при пошуку інформації',
        'Немає єдиної точки доступу до всіх сервісів',
      ],
    },
    solution: {
      title: 'Що ми створили',
      points: [
        'Практичні гайди та покрокові інструкції',
        'Чеклісти та шаблони для повсякденних завдань',
        'Багатомовний контент',
        'Особистий кабінет з персоналізацією',
        'AI-асистент що відповідає 24/7',
        'Простий та інтуїтивний інтерфейс',
      ],
    },
    results: [
      { value: '10K+', label: 'Користувачів', prefix: '', suffix: '' },
      { value: '24/7', label: 'AI підтримка', prefix: '', suffix: '' },
      { value: '50+', label: 'Гайдів', prefix: '', suffix: '' },
      { value: '4.8', label: 'Рейтинг', prefix: '⭐', suffix: '' },
    ],
    technologies: ['React Native', 'GPT-4', 'Firebase', 'Node.js', 'Push Notifications', 'App Store'],
    ctas: [
      { id: 'demo', label: 'Дізнатися більше', icon: '💙', action: 'demo', primary: true },
      { id: 'contact', label: 'Стати партнером', icon: '🤝', action: 'contact' },
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

