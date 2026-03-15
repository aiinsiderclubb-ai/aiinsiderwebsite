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

export interface SystemCapability {
  title: { uk: string; en: string };
  description: { uk: string; en: string };
}

export interface CaseStudy {
  id: string;
  slug: string;
  relatedServiceSlug?: string;
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
  process?: ProcessPhase[];
  features?: { icon: string; title: { uk: string; en: string }; description: { uk: string; en: string } }[];
  testimonial?: Testimonial;
  // NEW: What the system does
  systemCapabilities?: SystemCapability[];
  achievements?: { uk: string; en: string }[];
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
    relatedServiceSlug: 'ai-chatbot-for-business',
    category: 'ecommerce',
    industry: 'ecommerce',
    icon: '🛒',
    industryName: { uk: 'E-commerce', en: 'E-commerce' },
    title: { 
      uk: 'AI Чатбот + Голосовий агент для E-commerce', 
      en: 'AI Chatbot + Voice Agent for E-commerce' 
    },
    shortDescription: { 
      uk: 'Повна автоматизація підтримки клієнтів, розумні рекомендації товарів та відстеження замовлень',
      en: 'Complete customer support automation, smart product recommendations and order tracking'
    },
    fullDescription: {
      uk: 'Ми створили комплексну AI-екосистему для інтернет-магазину: інтелектуальний чатбот, який розуміє контекст розмови, голосовий агент для обробки дзвінків, та систему персоналізованих рекомендацій. Система працює 24/7, обробляє тисячі запитів одночасно, і навчається на кожній взаємодії, постійно покращуючи якість відповідей.',
      en: 'We created a comprehensive AI ecosystem for an online store: an intelligent chatbot that understands conversation context, a voice agent for handling calls, and a personalized recommendation system. The system works 24/7, processes thousands of requests simultaneously, and learns from each interaction, constantly improving response quality.'
    },
    timeline: { uk: '4-6 тижнів', en: '4-6 weeks' },
    problem: {
      title: { uk: 'Проблеми до AI', en: 'Problems Before AI' },
      points: [
        { uk: 'Команда підтримки витрачала 80% часу на типові питання', en: 'Support team spent 80% of time on typical questions' },
        { uk: 'Рівень покинутих кошиків сягав 68% — клієнти йшли без відповідей', en: 'Cart abandonment rate reached 68% — customers left without answers' },
        { uk: 'Ніякої підтримки після 18:00 — втрачені продажі вночі та у вихідні', en: 'No support after 6 PM — lost sales at night and weekends' },
        { uk: 'Середній час відповіді 15+ хвилин у пікові години', en: 'Average response time 15+ minutes during peak hours' },
        { uk: 'Клієнти телефонували щодня для уточнення статусу замовлення', en: 'Customers called daily to check order status' },
        { uk: 'Неможливість масштабувати підтримку під час розпродажів', en: 'Unable to scale support during sales events' },
      ],
    },
    solution: {
      title: { uk: 'Що робить система', en: 'What the System Does' },
      points: [
        { uk: 'AI-чатбот відповідає на питання за 2-3 секунди в будь-який час', en: 'AI chatbot responds to questions in 2-3 seconds anytime' },
        { uk: 'Аналізує поведінку та пропонує релевантні товари', en: 'Analyzes behavior and suggests relevant products' },
        { uk: 'Автоматично інформує про статус замовлення та доставку', en: 'Automatically informs about order status and delivery' },
        { uk: 'Голосовий агент приймає дзвінки та бронює зворотні дзвінки', en: 'Voice agent takes calls and books callbacks' },
        { uk: 'Плавно передає складні кейси живим операторам', en: 'Smoothly hands off complex cases to live agents' },
        { uk: 'Збирає фідбек та виявляє проблемні місця', en: 'Collects feedback and identifies problem areas' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Розуміння природної мови', en: 'Natural Language Understanding' },
        description: { uk: 'AI розуміє питання навіть з помилками, сленгом та скороченнями. Розпізнає наміри клієнта та контекст розмови.', en: 'AI understands questions even with typos, slang and abbreviations. Recognizes customer intent and conversation context.' }
      },
      { 
        title: { uk: 'Персоналізовані рекомендації', en: 'Personalized Recommendations' },
        description: { uk: 'Система аналізує історію покупок, переглядів та вподобань, пропонуючи товари з найвищою ймовірністю покупки.', en: 'System analyzes purchase history, views and preferences, suggesting products with highest purchase probability.' }
      },
      { 
        title: { uk: 'Омніканальна підтримка', en: 'Omnichannel Support' },
        description: { uk: 'Єдиний AI працює через сайт, WhatsApp, Telegram, Instagram та телефон. Клієнт може почати розмову в одному каналі та продовжити в іншому.', en: 'Single AI works across website, WhatsApp, Telegram, Instagram and phone. Customer can start conversation in one channel and continue in another.' }
      },
    ],
    achievements: [
      { uk: 'Оброблено 50,000+ запитів за перший місяць роботи', en: 'Processed 50,000+ requests in the first month' },
      { uk: 'Середній час відповіді знизився з 15 хвилин до 3 секунд', en: 'Average response time dropped from 15 minutes to 3 seconds' },
      { uk: 'Команда підтримки зменшена з 5 до 2 операторів', en: 'Support team reduced from 5 to 2 operators' },
      { uk: 'ROI системи досягнуто за 2.5 місяці', en: 'System ROI achieved in 2.5 months' },
      { uk: 'NPS клієнтів зріс з 32 до 67 пунктів', en: 'Customer NPS increased from 32 to 67 points' },
    ],
    results: [
      { value: '35', label: { uk: 'Зниження навантаження на підтримку', en: 'Support Load Reduced' }, prefix: '-', suffix: '%' },
      { value: '18', label: { uk: 'Зростання конверсії', en: 'Conversion Increase' }, prefix: '+', suffix: '%' },
      { value: '12', label: { uk: 'Зростання середнього чеку', en: 'Avg Order Value' }, prefix: '+', suffix: '%' },
      { value: '24/7', label: { uk: 'Доступність підтримки', en: 'Support Availability' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'Voice AI', 'Shopify/WooCommerce', 'WhatsApp Business API', 'CRM Integration', 'Analytics Dashboard'],
    process: [
      {
        number: 1,
        title: { uk: 'Глибокий аналіз', en: 'Deep Analysis' },
        description: { uk: 'Аналізуємо ваші поточні процеси, вивчаємо типові запити клієнтів, визначаємо точки автоматизації та створюємо детальне ТЗ', en: 'We analyze your current processes, study typical customer queries, identify automation points and create detailed specifications' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [
          { uk: 'Карта клієнтського шляху', en: 'Customer journey map' },
          { uk: 'Аналіз 100+ типових запитів', en: 'Analysis of 100+ typical queries' },
          { uk: 'Технічне завдання', en: 'Technical specification' },
          { uk: 'План інтеграцій', en: 'Integration plan' },
        ],
      },
      {
        number: 2,
        title: { uk: 'Розробка AI-агента', en: 'AI Agent Development' },
        description: { uk: 'Створюємо та навчаємо AI на ваших даних, налаштовуємо tone of voice, логіку діалогів та інтеграції з вашими системами', en: 'We create and train AI on your data, set up tone of voice, dialogue logic and integrations with your systems' },
        duration: { uk: '2-3 тижні', en: '2-3 weeks' },
        deliverables: [
          { uk: 'Навчена AI-модель', en: 'Trained AI model' },
          { uk: 'База знань продуктів (500+ товарів)', en: 'Product knowledge base (500+ items)' },
          { uk: '50+ сценаріїв діалогів', en: '50+ dialogue scenarios' },
          { uk: 'Система рекомендацій', en: 'Recommendation system' },
        ],
      },
      {
        number: 3,
        title: { uk: 'Інтеграція та тестування', en: 'Integration & Testing' },
        description: { uk: 'Підключаємо до вашої CRM, платформи магазину, месенджерів. Проводимо повне тестування всіх сценаріїв', en: 'We connect to your CRM, store platform, messengers. We conduct full testing of all scenarios' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Інтеграція з Shopify/WooCommerce', en: 'Shopify/WooCommerce integration' },
          { uk: 'Синхронізація з CRM', en: 'CRM synchronization' },
          { uk: 'Підключення месенджерів', en: 'Messenger connections' },
          { uk: 'QA тестування 100+ сценаріїв', en: 'QA testing 100+ scenarios' },
        ],
      },
      {
        number: 4,
        title: { uk: 'Запуск та оптимізація', en: 'Launch & Optimization' },
        description: { uk: 'Поступово запускаємо систему, моніторимо якість відповідей, оптимізуємо на основі реальних даних', en: 'Gradually launching the system, monitoring response quality, optimizing based on real data' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Живий AI на сайті та в месенджерах', en: 'Live AI on site and messengers' },
          { uk: 'Дашборд аналітики в реальному часі', en: 'Real-time analytics dashboard' },
          { uk: 'Документація та відео-інструкції', en: 'Documentation & video guides' },
          { uk: 'Навчання вашої команди', en: 'Team training' },
        ],
      },
    ],
    features: [
      { icon: '⚡', title: { uk: 'Миттєві відповіді', en: 'Instant Responses' }, description: { uk: 'AI відповідає за 2-3 секунди на будь-яке питання, 24/7', en: 'AI responds in 2-3 seconds to any question, 24/7' } },
      { icon: '🎯', title: { uk: 'Smart рекомендації', en: 'Smart Recommendations' }, description: { uk: 'Персоналізовані пропозиції на основі поведінки та історії', en: 'Personalized suggestions based on behavior and history' } },
      { icon: '📦', title: { uk: 'Автотрекінг', en: 'Auto Tracking' }, description: { uk: 'Клієнт отримує статус замовлення без участі оператора', en: 'Customer gets order status without operator involvement' } },
      { icon: '🔄', title: { uk: 'Омніканальність', en: 'Omnichannel' }, description: { uk: 'Сайт, WhatsApp, Telegram, Instagram — єдиний досвід', en: 'Website, WhatsApp, Telegram, Instagram — unified experience' } },
      { icon: '📊', title: { uk: 'Аналітика', en: 'Analytics' }, description: { uk: 'Дашборд з метриками, трендами та інсайтами', en: 'Dashboard with metrics, trends and insights' } },
      { icon: '🤝', title: { uk: 'Handoff', en: 'Handoff' }, description: { uk: 'Плавна передача складних кейсів живим операторам', en: 'Smooth handoff of complex cases to live agents' } },
    ],
    testimonial: {
      quote: { uk: 'AI-чатбот змінив нашу підтримку. За перший місяць ми побачили зниження навантаження на 35%, а клієнти нарешті отримують відповіді миттєво. Найкраща інвестиція в наш бізнес за останній рік.', en: 'The AI chatbot transformed our support. In the first month we saw 35% load reduction, and customers finally get instant answers. Best investment in our business this year.' },
      author: 'CEO',
      role: { uk: 'Власник інтернет-магазину електроніки', en: 'Electronics E-commerce Owner' },
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
    relatedServiceSlug: 'workflow-automation',
    category: 'beauty',
    industry: 'beauty',
    icon: '💄',
    industryName: { uk: 'Салон краси', en: 'Beauty Salon' },
    title: { 
      uk: 'AI Адміністратор для салону краси', 
      en: 'AI Admin for Beauty Salon' 
    },
    shortDescription: { 
      uk: 'Повна автоматизація записів, нагадувань та комунікації з клієнтами через WhatsApp',
      en: 'Complete automation of bookings, reminders and client communication via WhatsApp'
    },
    fullDescription: {
      uk: 'Ми створили віртуального адміністратора для салону краси, який працює 24/7 через WhatsApp та веб-чат. Система автоматично приймає записи, враховуючи графік майстрів та їх спеціалізацію, надсилає нагадування, рекомендує додаткові послуги на основі історії відвідувань та відповідає на всі питання клієнтів. Адміністратор може зосередитись на VIP-клієнтах, поки AI обробляє потік звичайних запитів.',
      en: 'We created a virtual administrator for a beauty salon that works 24/7 via WhatsApp and web chat. The system automatically accepts bookings, considering master schedules and specializations, sends reminders, recommends additional services based on visit history and answers all customer questions. The administrator can focus on VIP clients while AI handles the flow of regular requests.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'Проблеми до AI', en: 'Problems Before AI' },
      points: [
        { uk: 'Адміністратор пропускав 30%+ повідомлень у завантажені години', en: 'Administrator missed 30%+ messages during busy hours' },
        { uk: 'Клієнти писали вночі та у вихідні — ніхто не відповідав', en: 'Clients wrote at night and weekends — no one responded' },
        { uk: 'Ручне бронювання займало 5-10 хвилин на кожного клієнта', en: 'Manual booking took 5-10 minutes per client' },
        { uk: 'Клієнти забували про записи — 15% no-show', en: 'Clients forgot appointments — 15% no-show rate' },
        { uk: 'Адміністратор не встигав пропонувати додаткові послуги', en: 'Administrator had no time to suggest additional services' },
        { uk: 'Відсутня історія комунікації з клієнтами', en: 'No client communication history' },
      ],
    },
    solution: {
      title: { uk: 'Що робить система', en: 'What the System Does' },
      points: [
        { uk: 'Приймає записи 24/7 через WhatsApp, враховуючи графік майстрів', en: 'Accepts bookings 24/7 via WhatsApp, considering master schedules' },
        { uk: 'Відповідає на питання про ціни, послуги, вільний час миттєво', en: 'Instantly answers questions about prices, services, availability' },
        { uk: 'Надсилає нагадування за 24 години та за 2 години до візиту', en: 'Sends reminders 24 hours and 2 hours before visit' },
        { uk: 'Пропонує додаткові послуги на основі історії клієнта', en: 'Suggests additional services based on client history' },
        { uk: 'Веде повну історію всіх розмов та візитів', en: 'Keeps complete history of all conversations and visits' },
        { uk: 'Автоматично просить відгук після візиту', en: 'Automatically requests feedback after visit' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Розумне бронювання', en: 'Smart Booking' },
        description: { uk: 'AI враховує тривалість процедур, графік майстрів, їх спеціалізацію та вподобання клієнта. Автоматично пропонує оптимальний час.', en: 'AI considers procedure duration, master schedules, their specialization and client preferences. Automatically suggests optimal time.' }
      },
      { 
        title: { uk: 'Персоналізований upsell', en: 'Personalized Upsell' },
        description: { uk: 'Система знає, що клієнт робив останнього разу, і пропонує супутні послуги: "Ви робили манікюр 3 тижні тому — час оновити? Сьогодні є вільне вікно о 14:00"', en: 'System knows what client did last time and suggests related services: "You had manicure 3 weeks ago — time to refresh? We have a free slot at 2 PM today"' }
      },
      { 
        title: { uk: 'Зниження no-show', en: 'No-show Reduction' },
        description: { uk: 'Автоматичні нагадування через WhatsApp з можливістю підтвердити або перенести запис одним повідомленням.', en: 'Automatic WhatsApp reminders with ability to confirm or reschedule with one message.' }
      },
    ],
    achievements: [
      { uk: 'No-show знизився з 15% до 3% завдяки нагадуванням', en: 'No-show dropped from 15% to 3% thanks to reminders' },
      { uk: 'Адміністратор вивільнив 4 години щодня для інших задач', en: 'Administrator freed 4 hours daily for other tasks' },
      { uk: 'Середній чек виріс на 22% завдяки upsell', en: 'Average check increased by 22% thanks to upsell' },
      { uk: '100% повідомлень отримують відповідь протягом 30 секунд', en: '100% of messages get response within 30 seconds' },
      { uk: 'Рейтинг салону в Google зріс з 4.2 до 4.8', en: 'Salon rating on Google increased from 4.2 to 4.8' },
    ],
    results: [
      { value: '40', label: { uk: 'Більше записів', en: 'More Bookings' }, prefix: '+', suffix: '%' },
      { value: '70', label: { uk: 'Менше адмін роботи', en: 'Less Admin Work' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Пропущених повідомлень', en: 'Missed Messages' }, prefix: '', suffix: '' },
      { value: '3%', label: { uk: 'No-show rate', en: 'No-show Rate' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'WhatsApp Business API', 'Booking System', 'CRM', 'SMS Gateway', 'Google Calendar'],
    process: [
      {
        number: 1,
        title: { uk: 'Онбординг', en: 'Onboarding' },
        description: { uk: 'Збираємо всю інформацію про ваш салон: послуги, ціни, майстрів, графік, особливості бронювання', en: 'We gather all information about your salon: services, prices, masters, schedule, booking specifics' },
        duration: { uk: '2-3 дні', en: '2-3 days' },
        deliverables: [
          { uk: 'Повний каталог послуг', en: 'Complete service catalog' },
          { uk: 'Прайс-лист з описами', en: 'Price list with descriptions' },
          { uk: 'Профілі майстрів', en: 'Master profiles' },
          { uk: 'Правила бронювання', en: 'Booking rules' },
        ],
      },
      {
        number: 2,
        title: { uk: 'Налаштування AI', en: 'AI Setup' },
        description: { uk: 'Створюємо AI-адміністратора з унікальним стилем спілкування, який відповідає вашому бренду', en: 'We create an AI administrator with unique communication style that matches your brand' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Персоналізований AI-асистент', en: 'Personalized AI assistant' },
          { uk: 'База відповідей на 50+ питань', en: 'FAQ database with 50+ questions' },
          { uk: 'Логіка бронювання та upsell', en: 'Booking and upsell logic' },
        ],
      },
      {
        number: 3,
        title: { uk: 'Запуск', en: 'Launch' },
        description: { uk: 'Підключаємо WhatsApp Business, інтегруємо з вашим календарем, налаштовуємо нагадування', en: 'We connect WhatsApp Business, integrate with your calendar, set up reminders' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [
          { uk: 'Робочий AI-бот в WhatsApp', en: 'Working AI bot in WhatsApp' },
          { uk: 'Двостороння синхронізація з календарем', en: 'Two-way calendar sync' },
          { uk: 'Система автоматичних нагадувань', en: 'Automatic reminder system' },
        ],
      },
    ],
    features: [
      { icon: '📅', title: { uk: 'Миттєве бронювання', en: 'Instant Booking' }, description: { uk: 'Клієнти записуються за 30 секунд через WhatsApp', en: 'Clients book in 30 seconds via WhatsApp' } },
      { icon: '⏰', title: { uk: 'Smart нагадування', en: 'Smart Reminders' }, description: { uk: 'За 24h та 2h до візиту + можливість перенести', en: '24h and 2h before visit + ability to reschedule' } },
      { icon: '💅', title: { uk: 'Персональний upsell', en: 'Personal Upsell' }, description: { uk: 'AI знає історію та пропонує релевантні послуги', en: 'AI knows history and suggests relevant services' } },
      { icon: '📊', title: { uk: 'Аналітика', en: 'Analytics' }, description: { uk: 'Завантаженість майстрів, популярні послуги, тренди', en: 'Master load, popular services, trends' } },
      { icon: '⭐', title: { uk: 'Збір відгуків', en: 'Review Collection' }, description: { uk: 'Автоматичний запит відгуку після кожного візиту', en: 'Automatic review request after each visit' } },
      { icon: '📱', title: { uk: 'WhatsApp native', en: 'WhatsApp Native' }, description: { uk: 'Клієнти спілкуються там, де їм зручно', en: 'Clients communicate where it\'s convenient' } },
    ],
    testimonial: {
      quote: { uk: 'Раніше я проводила по 4 години на день за телефоном та в месенджерах. Тепер AI робить це за мене, а я можу зосередитись на клієнтах в салоні. No-show майже зник, а середній чек виріс завдяки розумним рекомендаціям.', en: 'I used to spend 4 hours a day on phone and messengers. Now AI does it for me, and I can focus on clients in the salon. No-shows almost disappeared, and average check increased thanks to smart recommendations.' },
      author: 'Власниця салону',
      role: { uk: 'Beauty-бізнес, Цюріх', en: 'Beauty Business, Zurich' },
    },
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
    relatedServiceSlug: 'ai-lead-generation',
    category: 'realestate',
    industry: 'general',
    icon: '🏠',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'AI кваліфікація лідів для нерухомості', 
      en: 'AI Lead Qualification for Real Estate' 
    },
    shortDescription: { 
      uk: 'Автоматична фільтрація та скоринг лідів — агенти працюють тільки з гарячими клієнтами',
      en: 'Automatic lead filtering and scoring — agents work only with hot clients'
    },
    fullDescription: {
      uk: 'Ми побудували AI-систему кваліфікації лідів для агентства нерухомості. Бот спілкується з потенційними покупцями 24/7, з\'ясовує їх бюджет, терміни, вподобання, серйозність намірів. Тільки кваліфіковані ліди передаються агентам з повним профілем. Агенти більше не витрачають час на "цікавлюсь" — вони працюють з тими, хто готовий купувати.',
      en: 'We built an AI lead qualification system for a real estate agency. The bot communicates with potential buyers 24/7, finds out their budget, timeline, preferences, seriousness of intent. Only qualified leads are passed to agents with full profiles. Agents no longer waste time on "just looking" — they work with those ready to buy.'
    },
    timeline: { uk: '3-4 тижні', en: '3-4 weeks' },
    problem: {
      title: { uk: 'Проблеми до AI', en: 'Problems Before AI' },
      points: [
        { uk: 'Агенти витрачали 60% часу на некваліфіковані ліди', en: 'Agents spent 60% of time on unqualified leads' },
        { uk: 'Неможливо визначити серйозність наміру без довгої розмови', en: 'Impossible to determine intent seriousness without long conversation' },
        { uk: 'Ліди з сайту вночі та у вихідні залишались без відповіді', en: 'Website leads at night and weekends went unanswered' },
        { uk: 'Немає єдиного процесу кваліфікації — кожен агент питає по-своєму', en: 'No unified qualification process — each agent asks differently' },
        { uk: 'Гарячі ліди втрачались через повільну реакцію', en: 'Hot leads were lost due to slow reaction' },
      ],
    },
    solution: {
      title: { uk: 'Що робить система', en: 'What the System Does' },
      points: [
        { uk: 'AI спілкується з кожним лідом протягом 30 секунд після заявки', en: 'AI communicates with each lead within 30 seconds of inquiry' },
        { uk: 'З\'ясовує бюджет, терміни, локацію, тип нерухомості', en: 'Finds out budget, timeline, location, property type' },
        { uk: 'Визначає серйозність наміру за патернами відповідей', en: 'Determines intent seriousness by response patterns' },
        { uk: 'Присвоює лід-скор від 1 до 100', en: 'Assigns lead score from 1 to 100' },
        { uk: 'Гарячі ліди (70+) миттєво передаються вільному агенту', en: 'Hot leads (70+) instantly passed to available agent' },
        { uk: 'Рекомендує конкретні об\'єкти під критерії клієнта', en: 'Recommends specific properties matching client criteria' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Інтелектуальний скоринг', en: 'Intelligent Scoring' },
        description: { uk: 'AI аналізує не тільки відповіді, але й швидкість реакції, деталізацію запитів, готовність до перегляду — все це формує скор.', en: 'AI analyzes not only answers but also reaction speed, query detail, readiness for viewing — all this forms the score.' }
      },
      { 
        title: { uk: 'Автоматичний матчинг', en: 'Automatic Matching' },
        description: { uk: 'Система порівнює критерії ліда з базою об\'єктів та надсилає персоналізовану підбірку ще до дзвінка агента.', en: 'System compares lead criteria with property database and sends personalized selection before agent call.' }
      },
    ],
    achievements: [
      { uk: 'Конверсія лідів у угоди зросла вдвічі', en: 'Lead to deal conversion doubled' },
      { uk: 'Агенти економлять 15+ годин на тиждень', en: 'Agents save 15+ hours per week' },
      { uk: 'Час від заявки до першого контакту: 30 секунд замість 2 годин', en: 'Time from inquiry to first contact: 30 seconds instead of 2 hours' },
      { uk: '95% лідів кваліфікуються автоматично без участі людини', en: '95% of leads qualified automatically without human involvement' },
    ],
    results: [
      { value: '50', label: { uk: 'Неякісних лідів відфільтровано', en: 'Bad Leads Filtered' }, prefix: '-', suffix: '%' },
      { value: '2x', label: { uk: 'Конверсія в угоди', en: 'Deal Conversion' }, prefix: '', suffix: '' },
      { value: '15', label: { uk: 'Годин збережено/тиждень', en: 'Hours Saved/Week' }, prefix: '+', suffix: 'h' },
      { value: '30s', label: { uk: 'Час до першої відповіді', en: 'Time to First Response' }, prefix: '<', suffix: '' },
    ],
    technologies: ['GPT-4', 'CRM Integration', 'Lead Scoring Algorithm', 'WhatsApp', 'Email Automation', 'Property Database API'],
    process: [
      {
        number: 1,
        title: { uk: 'Аналіз воронки', en: 'Funnel Analysis' },
        description: { uk: 'Вивчаємо ваш поточний процес роботи з лідами, визначаємо критерії ідеального клієнта', en: 'We study your current lead process, define ideal client criteria' },
        duration: { uk: '3-5 днів', en: '3-5 days' },
        deliverables: [
          { uk: 'Критерії кваліфікації', en: 'Qualification criteria' },
          { uk: 'Скорингова модель', en: 'Scoring model' },
          { uk: 'Сценарії кваліфікації', en: 'Qualification scenarios' },
        ],
      },
      {
        number: 2,
        title: { uk: 'Розробка системи', en: 'System Development' },
        description: { uk: 'Створюємо AI-бота з логікою кваліфікації та інтеграцією з вашою CRM', en: 'We create AI bot with qualification logic and CRM integration' },
        duration: { uk: '2 тижні', en: '2 weeks' },
        deliverables: [
          { uk: 'AI кваліфікаційний бот', en: 'AI qualification bot' },
          { uk: 'CRM інтеграція', en: 'CRM integration' },
          { uk: 'Система матчингу об\'єктів', en: 'Property matching system' },
        ],
      },
      {
        number: 3,
        title: { uk: 'Запуск та калібрування', en: 'Launch & Calibration' },
        description: { uk: 'Запускаємо систему, калібруємо скоринг на реальних даних, навчаємо команду', en: 'Launch system, calibrate scoring on real data, train team' },
        duration: { uk: '1 тиждень', en: '1 week' },
        deliverables: [
          { uk: 'Робоча система', en: 'Working system' },
          { uk: 'Навчання агентів', en: 'Agent training' },
          { uk: 'Дашборд лідів', en: 'Leads dashboard' },
        ],
      },
    ],
    features: [
      { icon: '🎯', title: { uk: 'Lead Scoring', en: 'Lead Scoring' }, description: { uk: 'Автоматична оцінка від 1 до 100 балів', en: 'Automatic score from 1 to 100 points' } },
      { icon: '⚡', title: { uk: 'Instant Response', en: 'Instant Response' }, description: { uk: 'Відповідь протягом 30 секунд, 24/7', en: 'Response within 30 seconds, 24/7' } },
      { icon: '🏠', title: { uk: 'Property Match', en: 'Property Match' }, description: { uk: 'AI підбирає об\'єкти під критерії', en: 'AI matches properties to criteria' } },
      { icon: '📱', title: { uk: 'Multi-channel', en: 'Multi-channel' }, description: { uk: 'Сайт, WhatsApp, email — єдина система', en: 'Website, WhatsApp, email — single system' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Real Estate AI', en: 'Try Real Estate AI' }, icon: '🏠', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Автоматизувати мої ліди', en: 'Automate My Leads' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 4: VOICE AGENT
  {
    id: 'case-voice',
    slug: 'ai-voice-agent-calls',
    relatedServiceSlug: 'ai-voice-agent',
    category: 'voice',
    industry: 'general',
    icon: '🎧',
    industryName: { uk: 'Голосовий агент', en: 'Voice Agent' },
    title: { 
      uk: 'AI Голосовий агент для вхідних дзвінків', 
      en: 'AI Voice Agent for Incoming Calls' 
    },
    shortDescription: { 
      uk: 'AI відповідає на всі дзвінки, записує на прийом та передає складні питання людям',
      en: 'AI answers all calls, books appointments and escalates complex issues to humans'
    },
    fullDescription: {
      uk: 'Ми створили голосового AI-агента, який відповідає на всі вхідні дзвінки компанії. Він розмовляє природною мовою, розуміє контекст, записує клієнтів на прийом, відповідає на типові питання. Складні випадки передаються живим операторам з повною транскрипцією розмови. Всі дзвінки логуються в CRM з тегами та summary.',
      en: 'We created a voice AI agent that answers all incoming company calls. It speaks naturally, understands context, books appointments, answers common questions. Complex cases are escalated to live operators with full conversation transcription. All calls are logged in CRM with tags and summary.'
    },
    timeline: { uk: '3-5 тижнів', en: '3-5 weeks' },
    problem: {
      title: { uk: 'Проблеми до AI', en: 'Problems Before AI' },
      points: [
        { uk: 'Пропускали 25%+ дзвінків у пікові години та обід', en: 'Missed 25%+ calls during peak hours and lunch' },
        { uk: 'Після 18:00 та у вихідні — ніхто не відповідав', en: 'After 6 PM and weekends — no one answered' },
        { uk: 'Клієнти чекали на лінії по 5+ хвилин', en: 'Customers waited on hold 5+ minutes' },
        { uk: 'Секретар витрачав 70% часу на типові питання', en: 'Secretary spent 70% time on typical questions' },
        { uk: 'Немає запису та аналізу дзвінків', en: 'No call recording and analysis' },
        { uk: 'Втрачені ліди через пропущені дзвінки', en: 'Lost leads due to missed calls' },
      ],
    },
    solution: {
      title: { uk: 'Що робить система', en: 'What the System Does' },
      points: [
        { uk: 'AI відповідає на кожен дзвінок протягом 2 секунд', en: 'AI answers every call within 2 seconds' },
        { uk: 'Веде природну розмову українською, англійською, німецькою', en: 'Conducts natural conversation in Ukrainian, English, German' },
        { uk: 'Записує на прийом з синхронізацією в календар', en: 'Books appointments with calendar sync' },
        { uk: 'Відповідає на FAQ: години роботи, ціни, адреса тощо', en: 'Answers FAQ: hours, prices, address etc.' },
        { uk: 'Передає складні питання живому оператору з контекстом', en: 'Escalates complex issues to live operator with context' },
        { uk: 'Записує та транскрибує кожен дзвінок в CRM', en: 'Records and transcribes every call to CRM' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Природна мова', en: 'Natural Speech' },
        description: { uk: 'AI говорить як людина — з паузами, інтонаціями, природними реакціями. Клієнти часто не розуміють, що спілкуються з ботом.', en: 'AI speaks like a human — with pauses, intonations, natural reactions. Customers often don\'t realize they\'re talking to a bot.' }
      },
      { 
        title: { uk: 'Контекстне розуміння', en: 'Contextual Understanding' },
        description: { uk: 'AI розуміє складні запити, переформульовування, уточнення. Запам\'ятовує контекст протягом всієї розмови.', en: 'AI understands complex queries, rephrasing, clarifications. Remembers context throughout the conversation.' }
      },
      { 
        title: { uk: 'Інтелектуальний handoff', en: 'Intelligent Handoff' },
        description: { uk: 'Коли потрібна людина, AI передає дзвінок з повним summary: хто дзвонив, що питав, який настрій.', en: 'When human needed, AI transfers call with full summary: who called, what asked, what mood.' }
      },
    ],
    achievements: [
      { uk: '0 пропущених дзвінків за 6 місяців роботи', en: '0 missed calls in 6 months of operation' },
      { uk: '85% дзвінків повністю обробляються AI без участі людини', en: '85% of calls fully handled by AI without human involvement' },
      { uk: 'Час очікування знизився з 5 хвилин до 0', en: 'Wait time dropped from 5 minutes to 0' },
      { uk: 'NPS по телефонній підтримці зріс з 45 до 78', en: 'Phone support NPS increased from 45 to 78' },
      { uk: 'Вивільнено 1.5 FTE для інших задач', en: 'Freed 1.5 FTE for other tasks' },
    ],
    results: [
      { value: '0', label: { uk: 'Пропущених дзвінків', en: 'Missed Calls' }, prefix: '', suffix: '' },
      { value: '2s', label: { uk: 'Час відповіді', en: 'Response Time' }, prefix: '<', suffix: '' },
      { value: '85', label: { uk: 'Повністю оброблено AI', en: 'Fully AI Handled' }, prefix: '', suffix: '%' },
      { value: '24/7', label: { uk: 'Доступність', en: 'Availability' }, prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Telephony API', 'Speech-to-Text', 'Text-to-Speech', 'CRM Integration', 'Call Analytics'],
    features: [
      { icon: '🎤', title: { uk: 'Natural Voice', en: 'Natural Voice' }, description: { uk: 'Голос, невідрізнимий від людського', en: 'Voice indistinguishable from human' } },
      { icon: '🌍', title: { uk: 'Мультимовність', en: 'Multilingual' }, description: { uk: 'Українська, англійська, німецька', en: 'Ukrainian, English, German' } },
      { icon: '📅', title: { uk: 'Бронювання', en: 'Booking' }, description: { uk: 'Запис на прийом голосом', en: 'Voice appointment booking' } },
      { icon: '📝', title: { uk: 'Транскрипція', en: 'Transcription' }, description: { uk: 'Повний запис кожної розмови', en: 'Full record of every conversation' } },
      { icon: '🔄', title: { uk: 'Smart Handoff', en: 'Smart Handoff' }, description: { uk: 'Передача людині з контекстом', en: 'Transfer to human with context' } },
      { icon: '📊', title: { uk: 'Analytics', en: 'Analytics' }, description: { uk: 'Аналітика дзвінків та трендів', en: 'Call analytics and trends' } },
    ],
    testimonial: {
      quote: { uk: 'Клієнти дзвонять о 7 ранку, о 10 вечора, у вихідні — і завжди отримують відповідь. AI записує на прийом, відповідає на питання, і передає мені тільки те, що потребує моєї уваги. Це як мати секретаря, який ніколи не спить.', en: 'Customers call at 7 AM, 10 PM, weekends — and always get an answer. AI books appointments, answers questions, and only passes me what needs my attention. It\'s like having a secretary who never sleeps.' },
      author: 'Директор клініки',
      role: { uk: 'Медичний центр, Женева', en: 'Medical Center, Geneva' },
    },
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
    relatedServiceSlug: 'workflow-automation',
    category: 'automation',
    industry: 'general',
    icon: '⚙️',
    industryName: { uk: 'Автоматизація', en: 'Automation' },
    title: { 
      uk: 'Автоматизація бізнес-процесів з AI', 
      en: 'Business Process Automation with AI' 
    },
    shortDescription: { 
      uk: 'Інтеграція систем, автоматизація рутини та AI-обробка даних',
      en: 'System integration, routine automation and AI data processing'
    },
    fullDescription: {
      uk: 'Ми будуємо кастомні автоматизації, які з\'єднують ваші інструменти та усувають ручну роботу. AI обробляє документи, класифікує дані, генерує звіти, надсилає нотифікації. Від простих інтеграцій до складних workflow з AI-рішеннями.',
      en: 'We build custom automations that connect your tools and eliminate manual work. AI processes documents, classifies data, generates reports, sends notifications. From simple integrations to complex workflows with AI decisions.'
    },
    timeline: { uk: '2-6 тижнів', en: '2-6 weeks' },
    problem: {
      title: { uk: 'Типові проблеми', en: 'Typical Problems' },
      points: [
        { uk: 'Ручне копіювання даних між системами', en: 'Manual data copying between systems' },
        { uk: 'Людські помилки при введенні даних', en: 'Human errors in data entry' },
        { uk: 'Години на рутинні операції щодня', en: 'Hours on routine operations daily' },
        { uk: 'Затримки через ручну передачу між відділами', en: 'Delays due to manual handoffs between departments' },
        { uk: 'Немає оповіщень про важливі події', en: 'No alerts about important events' },
      ],
    },
    solution: {
      title: { uk: 'Що ми автоматизуємо', en: 'What We Automate' },
      points: [
        { uk: 'Синхронізація даних між CRM, email, базами даних', en: 'Data sync between CRM, email, databases' },
        { uk: 'AI-обробка документів та витяг інформації', en: 'AI document processing and information extraction' },
        { uk: 'Автоматична маршрутизація задач по тригерах', en: 'Automatic task routing by triggers' },
        { uk: 'Генерація звітів та нотифікацій', en: 'Report and notification generation' },
        { uk: 'Інтеграція будь-яких API та сервісів', en: 'Integration of any APIs and services' },
      ],
    },
    achievements: [
      { uk: 'Автоматизовано 200+ годин ручної роботи на місяць', en: 'Automated 200+ hours of manual work per month' },
      { uk: 'Помилки введення даних знизились до нуля', en: 'Data entry errors reduced to zero' },
      { uk: 'Час обробки заявок скоротився з 2 годин до 5 хвилин', en: 'Application processing time reduced from 2 hours to 5 minutes' },
    ],
    results: [
      { value: '80', label: { uk: 'Менше ручної роботи', en: 'Less Manual Work' }, prefix: '-', suffix: '%' },
      { value: '0', label: { uk: 'Помилок введення', en: 'Entry Errors' }, prefix: '', suffix: '' },
      { value: '5x', label: { uk: 'Швидша обробка', en: 'Faster Processing' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'Автоматизація', en: 'Automation' }, prefix: '', suffix: '' },
    ],
    technologies: ['AI Agents', 'Zapier', 'Make', 'n8n', 'CRM APIs', 'Custom Integrations', 'Document AI'],
    features: [
      { icon: '🔗', title: { uk: 'Інтеграції', en: 'Integrations' }, description: { uk: 'З\'єднуємо будь-які системи', en: 'Connect any systems' } },
      { icon: '🤖', title: { uk: 'AI обробка', en: 'AI Processing' }, description: { uk: 'Документи, email, дані', en: 'Documents, email, data' } },
      { icon: '⚡', title: { uk: 'Тригери', en: 'Triggers' }, description: { uk: 'Автоматичні дії по подіях', en: 'Automatic actions on events' } },
      { icon: '📊', title: { uk: 'Звіти', en: 'Reports' }, description: { uk: 'Автоматична генерація', en: 'Automatic generation' } },
    ],
    ctas: [
      { id: 'flow', label: { uk: 'Дивитись приклади', en: 'View Examples' }, icon: '📊', action: 'flow', primary: true },
      { id: 'contact', label: { uk: 'Обговорити автоматизацію', en: 'Discuss Automation' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 6: FACEBOOK OUTREACH
  {
    id: 'case-facebook-outreach',
    slug: 'facebook-outreach-automation',
    relatedServiceSlug: 'ai-lead-generation',
    category: 'automation',
    industry: 'outreach',
    icon: '🚀',
    industryName: { uk: 'Лідогенерація', en: 'Lead Generation' },
    title: { 
      uk: 'Автоматизований Facebook Outreach з AI', 
      en: 'Automated Facebook Outreach with AI' 
    },
    shortDescription: { 
      uk: 'Система масового outreach з AI-персоналізацією повідомлень',
      en: 'Mass outreach system with AI message personalization'
    },
    fullDescription: {
      uk: 'Ми побудували систему автоматизованого outreach для Facebook: автоматичний постинг в групи, персоналізація повідомлень через AI, управління кампаніями через UI Dashboard, детальні логи та аналітика. Система працює в headless режимі, підтримує 2FA, та масштабується під будь-які обсяги.',
      en: 'We built an automated Facebook outreach system: automatic group posting, AI message personalization, campaign management via UI Dashboard, detailed logs and analytics. System works in headless mode, supports 2FA, and scales to any volume.'
    },
    timeline: { uk: '4-6 тижнів', en: '4-6 weeks' },
    problem: {
      title: { uk: 'До автоматизації', en: 'Before Automation' },
      points: [
        { uk: 'Ручний outreach — максимум 20-30 повідомлень на день', en: 'Manual outreach — maximum 20-30 messages per day' },
        { uk: 'Людина втомлюється, робить помилки, пропускає групи', en: 'Person gets tired, makes mistakes, skips groups' },
        { uk: 'Однакові повідомлення не працюють — низький response rate', en: 'Same messages don\'t work — low response rate' },
        { uk: 'Немає аналітики: що працює, що ні', en: 'No analytics: what works, what doesn\'t' },
        { uk: 'Неможливо масштабувати без найму людей', en: 'Cannot scale without hiring people' },
      ],
    },
    solution: {
      title: { uk: 'Що робить система', en: 'What the System Does' },
      points: [
        { uk: 'Автоматичний постинг в сотні груп щодня', en: 'Automatic posting to hundreds of groups daily' },
        { uk: 'AI генерує унікальні повідомлення під кожну групу', en: 'AI generates unique messages for each group' },
        { uk: 'Dashboard для управління кампаніями та моніторингу', en: 'Dashboard for campaign management and monitoring' },
        { uk: 'Детальні логи кожної дії з timestamps', en: 'Detailed logs of every action with timestamps' },
        { uk: 'A/B тестування різних підходів', en: 'A/B testing different approaches' },
      ],
    },
    achievements: [
      { uk: 'Швидкість outreach збільшена в 15 разів', en: 'Outreach speed increased 15x' },
      { uk: 'Економія 40+ годин ручної роботи на місяць', en: 'Saving 40+ hours of manual work per month' },
      { uk: 'Response rate зріс на 35% завдяки персоналізації', en: 'Response rate increased 35% thanks to personalization' },
    ],
    results: [
      { value: '15x', label: { uk: 'Швидкість outreach', en: 'Outreach Speed' }, prefix: '', suffix: '' },
      { value: '40', label: { uk: 'Годин збережено/міс', en: 'Hours Saved/Month' }, prefix: '+', suffix: 'h' },
      { value: '24/7', label: { uk: 'Автоматична робота', en: 'Automatic Work' }, prefix: '', suffix: '' },
      { value: '35', label: { uk: 'Вищий response rate', en: 'Higher Response' }, prefix: '+', suffix: '%' },
    ],
    technologies: ['Flask API', 'Headless Browser', 'AI Personalization', 'Campaign Logic', 'UI Dashboard', 'Logging System'],
    ctas: [
      { id: 'demo', label: { uk: 'Отримати систему', en: 'Get System' }, icon: '🚀', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Обговорити стратегію', en: 'Discuss Strategy' }, icon: '💬', action: 'contact' },
    ],
    featured: true,
    hasUIDemo: true,
  },

  // CASE 7: FLOWERS
  {
    id: 'case-flowers',
    slug: 'flower-shop-ai-sales',
    relatedServiceSlug: 'ai-chatbot-for-business',
    category: 'ecommerce',
    industry: 'flowers',
    icon: '🌸',
    industryName: { uk: 'Магазин квітів', en: 'Flower Shop' },
    title: { 
      uk: 'AI Консультант для квіткового магазину', 
      en: 'AI Consultant for Flower Shop' 
    },
    shortDescription: { 
      uk: 'AI допомагає обрати букет, рекомендує додатки та збільшує середній чек',
      en: 'AI helps choose bouquet, recommends additions and increases average order'
    },
    fullDescription: {
      uk: 'AI-консультант для квіткового магазину, який розуміє привід, вподобання та бюджет клієнта. Рекомендує ідеальний букет, пропонує додатки (листівка, шоколад, іграшка), допомагає з текстом привітання. Працює через сайт та WhatsApp.',
      en: 'AI consultant for a flower shop that understands occasion, preferences and client budget. Recommends perfect bouquet, suggests additions (card, chocolate, toy), helps with greeting text. Works via website and WhatsApp.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'До AI', en: 'Before AI' },
      points: [
        { uk: 'Клієнти довго обирають — втрачаємо продажі', en: 'Customers take long to choose — losing sales' },
        { uk: 'Оператор не встигає консультувати всіх', en: 'Operator can\'t consult everyone' },
        { uk: 'Пропущені upsell можливості (листівки, додатки)', en: 'Missed upsell opportunities (cards, additions)' },
        { uk: 'Типові букети — без персоналізації', en: 'Standard bouquets — no personalization' },
      ],
    },
    solution: {
      title: { uk: 'Що робить AI', en: 'What AI Does' },
      points: [
        { uk: 'Питає про привід, отримувача, бюджет', en: 'Asks about occasion, recipient, budget' },
        { uk: 'Рекомендує букет з поясненням "чому саме цей"', en: 'Recommends bouquet with explanation "why this one"' },
        { uk: 'Пропонує релевантні додатки', en: 'Suggests relevant additions' },
        { uk: 'Допомагає скласти текст привітання', en: 'Helps compose greeting text' },
      ],
    },
    achievements: [
      { uk: 'Середній чек виріс на 35% завдяки upsell', en: 'Average order increased 35% thanks to upsell' },
      { uk: 'Час прийняття рішення скоротився вдвічі', en: 'Decision time cut in half' },
      { uk: 'Повторні покупки зросли на 40%', en: 'Repeat purchases increased 40%' },
    ],
    results: [
      { value: '35', label: { uk: 'Зростання середнього чеку', en: 'Avg Order Growth' }, prefix: '+', suffix: '%' },
      { value: '50', label: { uk: 'Швидший вибір', en: 'Faster Choice' }, prefix: '', suffix: '%' },
      { value: '2x', label: { uk: 'Повторних покупок', en: 'Repeat Purchases' }, prefix: '', suffix: '' },
      { value: '90', label: { uk: 'Задоволених клієнтів', en: 'Satisfied Customers' }, prefix: '', suffix: '%' },
    ],
    technologies: ['GPT-4', 'E-commerce Integration', 'WhatsApp', 'Product Recommendations'],
    features: [
      { icon: '🎁', title: { uk: 'Розуміє привід', en: 'Understands Occasion' }, description: { uk: 'День народження, 8 березня, вибачення...', en: 'Birthday, Valentine\'s, apology...' } },
      { icon: '💐', title: { uk: 'Smart рекомендації', en: 'Smart Recommendations' }, description: { uk: 'Ідеальний букет під ситуацію', en: 'Perfect bouquet for situation' } },
      { icon: '✨', title: { uk: 'Upsell', en: 'Upsell' }, description: { uk: 'Листівка, шоколад, іграшка', en: 'Card, chocolate, toy' } },
      { icon: '💌', title: { uk: 'Привітання', en: 'Greetings' }, description: { uk: 'AI допомагає з текстом', en: 'AI helps with text' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати Flower AI', en: 'Try Flower AI' }, icon: '🌸', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Для мого магазину', en: 'For My Shop' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE 8: SWEEZY
  {
    id: 'case-sweezy',
    slug: 'sweezy',
    relatedServiceSlug: 'custom-ai-models',
    category: 'social',
    industry: 'general',
    icon: '🇺🇦',
    industryName: { uk: 'Соціальний проект', en: 'Social Impact' },
    title: { 
      uk: 'Sweezy — Цифровий помічник', 
      en: 'Sweezy — Digital Assistant' 
    },
    shortDescription: { 
      uk: 'Мобільний застосунок з практичними гайдами, чеклістами та AI-асистентом',
      en: 'Mobile app with practical guides, checklists and AI assistant'
    },
    fullDescription: {
      uk: 'Sweezy — це сучасна платформа, що допомагає користувачам швидко знаходити актуальну, корисну та структуровану інформацію в одному місці. Ми створили мобільний застосунок для iOS та Android з практичними гайдами, чеклістами, AI-асистентом та багатомовним контентом.',
      en: 'Sweezy is a modern platform that helps users quickly find relevant, useful and structured information in one place. We created a mobile app for iOS and Android with practical guides, checklists, AI assistant and multilingual content.'
    },
    timeline: { uk: '3-4 місяці', en: '3-4 months' },
    problem: {
      title: { uk: 'Виклик', en: 'Challenge' },
      points: [
        { uk: 'Інформація розкидана по різних джерелах', en: 'Information scattered across different sources' },
        { uk: 'Складно знайти перевірені актуальні дані', en: 'Hard to find verified current data' },
        { uk: 'Мовні бар\'єри ускладнюють пошук', en: 'Language barriers complicate search' },
        { uk: 'Немає єдиної точки доступу до важливої інформації', en: 'No single access point to important information' },
      ],
    },
    solution: {
      title: { uk: 'Що ми створили', en: 'What We Built' },
      points: [
        { uk: 'Мобільний застосунок для iOS та Android', en: 'Mobile app for iOS and Android' },
        { uk: '50+ практичних гайдів та інструкцій', en: '50+ practical guides and instructions' },
        { uk: 'Чеклісти та шаблони для повсякденних задач', en: 'Checklists and templates for daily tasks' },
        { uk: 'AI-асистент для відповідей на питання 24/7', en: 'AI assistant for 24/7 question answering' },
        { uk: 'Багатомовний контент (UA, EN, DE)', en: 'Multilingual content (UA, EN, DE)' },
        { uk: 'Push-нотифікації про оновлення', en: 'Push notifications about updates' },
      ],
    },
    achievements: [
      { uk: '10,000+ активних користувачів', en: '10,000+ active users' },
      { uk: '50+ практичних гайдів опубліковано', en: '50+ practical guides published' },
      { uk: 'Рейтинг 4.8/5 в App Store', en: '4.8/5 rating in App Store' },
      { uk: 'AI відповів на 100,000+ питань', en: 'AI answered 100,000+ questions' },
    ],
    results: [
      { value: '10K+', label: { uk: 'Активних користувачів', en: 'Active Users' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'AI підтримка', en: 'AI Support' }, prefix: '', suffix: '' },
      { value: '50+', label: { uk: 'Гайдів', en: 'Guides' }, prefix: '', suffix: '' },
      { value: '4.8', label: { uk: 'Рейтинг', en: 'Rating' }, prefix: '⭐', suffix: '' },
    ],
    technologies: ['React Native', 'GPT-4', 'Firebase', 'Node.js', 'App Store', 'Google Play'],
    features: [
      { icon: '📚', title: { uk: 'Практичні гайди', en: 'Practical Guides' }, description: { uk: 'Покрокові інструкції', en: 'Step-by-step instructions' } },
      { icon: '✅', title: { uk: 'Чеклісти', en: 'Checklists' }, description: { uk: 'Шаблони для задач', en: 'Templates for tasks' } },
      { icon: '🤖', title: { uk: 'AI Асистент', en: 'AI Assistant' }, description: { uk: 'Відповіді на питання 24/7', en: '24/7 question answering' } },
      { icon: '🌍', title: { uk: 'Мультимовність', en: 'Multilingual' }, description: { uk: 'UA, EN, DE', en: 'UA, EN, DE' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Дізнатися більше', en: 'Learn More' }, icon: '💙', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Стати партнером', en: 'Become Partner' }, icon: '🤝', action: 'contact' },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // REAL ESTATE AI SOLUTIONS SUITE
  // ══════════════════════════════════════════════════════════════════════════════

  // CASE RE-1: AI Operations OS for Real Estate Agencies
  {
    id: 'case-realestate-ops-os',
    slug: 'real-estate-operations-os',
    relatedServiceSlug: 'ai-automation-for-real-estate',
    category: 'realestate',
    industry: 'general',
    icon: '🏢',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'AI Operations OS для агентств нерухомості', 
      en: 'AI Operations OS for Real Estate Agencies' 
    },
    shortDescription: { 
      uk: 'Централізована AI-система управління всіма операціями агентства — від лідів до закриття угод',
      en: 'Centralized AI system managing all agency operations — from leads to deal closings'
    },
    fullDescription: {
      uk: 'Операційна система для агентств нерухомості, яка об\'єднує всі бізнес-процеси в єдину AI-керовану платформу. Автоматизація рутини, прозора аналітика для власника, контроль ефективності агентів — все в одному місці. Власник бачить повну картину бізнесу в реальному часі.',
      en: 'Operating system for real estate agencies that unifies all business processes into a single AI-driven platform. Routine automation, transparent analytics for owner, agent efficiency control — all in one place. Owner sees complete business picture in real-time.'
    },
    timeline: { uk: '6-8 тижнів', en: '6-8 weeks' },
    problem: {
      title: { uk: 'Проблеми власника агентства', en: 'Agency Owner Problems' },
      points: [
        { uk: 'Інформація розкидана по 5+ різних системах та табличках', en: 'Information scattered across 5+ different systems and spreadsheets' },
        { uk: 'Немає прозорості — власник не бачить реальної ефективності агентів', en: 'No transparency — owner doesn\'t see real agent efficiency' },
        { uk: 'Ліди губляться між етапами воронки', en: 'Leads get lost between funnel stages' },
        { uk: 'Важко масштабувати: наймаєш агента — хаосу більше', en: 'Hard to scale: hire an agent — more chaos' },
        { uk: 'Фінансова аналітика вручну в кінці місяця', en: 'Financial analytics manually at month end' },
        { uk: 'Немає системи контролю якості комунікації', en: 'No communication quality control system' },
      ],
    },
    solution: {
      title: { uk: 'Що дає система', en: 'What the System Provides' },
      points: [
        { uk: 'Єдиний дашборд з усіма метриками агентства в реальному часі', en: 'Single dashboard with all agency metrics in real-time' },
        { uk: 'Автоматичний розподіл лідів по агентах за завантаженістю та компетенціями', en: 'Automatic lead distribution by agent workload and competencies' },
        { uk: 'AI-контроль якості: система аналізує всі комунікації та сигналізує про проблеми', en: 'AI quality control: system analyzes all communications and signals problems' },
        { uk: 'Автоматизовані звіти для власника щодня, щотижня, щомісяця', en: 'Automated reports for owner daily, weekly, monthly' },
        { uk: 'Pipeline management з AI-прогнозуванням закриття угод', en: 'Pipeline management with AI deal closure forecasting' },
        { uk: 'Інтеграція з порталами нерухомості, CRM, бухгалтерією', en: 'Integration with real estate portals, CRM, accounting' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'AI Pipeline Manager', en: 'AI Pipeline Manager' },
        description: { uk: 'Система автоматично рухає ліди по воронці, нагадує агентам про наступні кроки, прогнозує ймовірність закриття кожної угоди.', en: 'System automatically moves leads through funnel, reminds agents of next steps, predicts each deal closure probability.' }
      },
      { 
        title: { uk: 'Контроль комунікацій', en: 'Communication Control' },
        description: { uk: 'AI аналізує всі листи, дзвінки та повідомлення. Виявляє незадоволених клієнтів, пропущені follow-up, проблеми в скриптах.', en: 'AI analyzes all emails, calls and messages. Identifies unhappy clients, missed follow-ups, script issues.' }
      },
      { 
        title: { uk: 'Фінансова аналітика', en: 'Financial Analytics' },
        description: { uk: 'Автоматичний розрахунок комісій, прогноз доходів, аналіз рентабельності по агентах та типах угод.', en: 'Automatic commission calculation, revenue forecast, profitability analysis by agents and deal types.' }
      },
    ],
    achievements: [
      { uk: 'Час на адміністрування скоротився на 60%', en: 'Admin time reduced by 60%' },
      { uk: 'Власник економить 10+ годин на тиждень на звітності', en: 'Owner saves 10+ hours weekly on reporting' },
      { uk: 'Жоден лід не губиться — система контролює кожен етап', en: 'No lead gets lost — system controls every stage' },
      { uk: 'Прозорість: власник бачить все в реальному часі', en: 'Transparency: owner sees everything in real-time' },
    ],
    results: [
      { value: '60', label: { uk: 'Менше адмін роботи', en: 'Less Admin Work' }, prefix: '-', suffix: '%' },
      { value: '25', label: { uk: 'Зростання закриття угод', en: 'Deal Closing Growth' }, prefix: '+', suffix: '%' },
      { value: '0', label: { uk: 'Втрачених лідів', en: 'Lost Leads' }, prefix: '', suffix: '' },
      { value: '24/7', label: { uk: 'Контроль операцій', en: 'Operations Control' }, prefix: '', suffix: '' },
    ],
    technologies: ['GPT-4', 'Custom Dashboard', 'CRM Integration', 'Analytics Engine', 'Workflow Automation', 'Real Estate Portal API'],
    features: [
      { icon: '📊', title: { uk: 'Owner Dashboard', en: 'Owner Dashboard' }, description: { uk: 'Всі метрики бізнесу на одному екрані', en: 'All business metrics on one screen' } },
      { icon: '🔄', title: { uk: 'Auto Pipeline', en: 'Auto Pipeline' }, description: { uk: 'AI рухає ліди по воронці автоматично', en: 'AI moves leads through funnel automatically' } },
      { icon: '🎯', title: { uk: 'Agent Scoring', en: 'Agent Scoring' }, description: { uk: 'Об\'єктивна оцінка ефективності кожного агента', en: 'Objective efficiency score for each agent' } },
      { icon: '📈', title: { uk: 'Revenue Forecast', en: 'Revenue Forecast' }, description: { uk: 'AI прогнозує дохід на місяць вперед', en: 'AI forecasts revenue month ahead' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Запросити демо', en: 'Request Demo' }, icon: '🏢', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Обговорити впровадження', en: 'Discuss Implementation' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-2: AI Realtor Productivity System
  {
    id: 'case-realestate-realtor-productivity',
    slug: 'realtor-productivity-system',
    relatedServiceSlug: 'ai-automation-for-real-estate',
    category: 'realestate',
    industry: 'general',
    icon: '👔',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'AI система продуктивності рієлтора', 
      en: 'AI Realtor Productivity System' 
    },
    shortDescription: { 
      uk: 'Особистий AI-асистент для кожного агента — автоматизує рутину, нагадує про задачі, готує документи',
      en: 'Personal AI assistant for each agent — automates routine, reminds of tasks, prepares documents'
    },
    fullDescription: {
      uk: 'Кожен агент отримує персонального AI-помічника, який знає його клієнтів, об\'єкти та розклад. Система автоматично готує листи, нагадує про follow-up, генерує описи об\'єктів, відповідає на типові питання клієнтів. Агент фокусується на угодах — рутину робить AI.',
      en: 'Each agent gets a personal AI assistant that knows their clients, properties and schedule. System automatically prepares emails, reminds about follow-ups, generates property descriptions, answers typical client questions. Agent focuses on deals — AI handles routine.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'Що забирає час рієлтора', en: 'What Takes Realtor Time' },
      points: [
        { uk: 'Написання листів та відповідей — 2+ години щодня', en: 'Writing emails and replies — 2+ hours daily' },
        { uk: 'Підготовка описів об\'єктів для порталів', en: 'Preparing property descriptions for portals' },
        { uk: 'Постійне перемикання між клієнтами — легко забути follow-up', en: 'Constant switching between clients — easy to forget follow-up' },
        { uk: 'Пошук інформації про об\'єкти для відповіді клієнту', en: 'Searching property info to answer client' },
        { uk: 'Координація показів та зустрічей', en: 'Coordinating viewings and meetings' },
      ],
    },
    solution: {
      title: { uk: 'Як AI допомагає агенту', en: 'How AI Helps Agent' },
      points: [
        { uk: 'AI генерує персоналізовані листи за секунди — агент лише перевіряє', en: 'AI generates personalized emails in seconds — agent just reviews' },
        { uk: 'Автоматичні нагадування про кожен follow-up та дедлайн', en: 'Automatic reminders for each follow-up and deadline' },
        { uk: 'Генерація описів об\'єктів на 3 мовах одним кліком', en: 'Property description generation in 3 languages with one click' },
        { uk: 'AI відповідає на типові питання клієнтів від імені агента', en: 'AI answers typical client questions on agent\'s behalf' },
        { uk: 'Автоматичне логування всіх комунікацій в CRM', en: 'Automatic logging of all communications in CRM' },
        { uk: 'Daily brief: AI зранку показує пріоритетні задачі на день', en: 'Daily brief: AI shows priority tasks for the day each morning' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Smart Email Assistant', en: 'Smart Email Assistant' },
        description: { uk: 'AI розуміє контекст листа та генерує відповідь у стилі агента. Враховує історію комунікації з клієнтом та деталі об\'єктів.', en: 'AI understands email context and generates reply in agent\'s style. Considers communication history and property details.' }
      },
      { 
        title: { uk: 'Property Description Generator', en: 'Property Description Generator' },
        description: { uk: 'Завантажте фото та характеристики — AI створить привабливий опис для порталів на будь-якій мові.', en: 'Upload photos and specs — AI creates compelling portal description in any language.' }
      },
      { 
        title: { uk: 'Follow-up Engine', en: 'Follow-up Engine' },
        description: { uk: 'Система відстежує кожен контакт і нагадує про наступний крок. Жоден клієнт не буде забутий.', en: 'System tracks every contact and reminds of next step. No client will be forgotten.' }
      },
    ],
    achievements: [
      { uk: 'Агенти економлять 15+ годин на тиждень на рутині', en: 'Agents save 15+ hours weekly on routine' },
      { uk: 'Швидкість відповіді клієнтам зросла в 5 разів', en: 'Client response speed increased 5x' },
      { uk: '100% follow-up — жоден клієнт не забутий', en: '100% follow-up — no client forgotten' },
      { uk: 'Якість описів об\'єктів помітно зросла', en: 'Property description quality noticeably improved' },
    ],
    results: [
      { value: '15', label: { uk: 'Годин збережено/тиждень', en: 'Hours Saved/Week' }, prefix: '+', suffix: 'h' },
      { value: '5x', label: { uk: 'Швидше відповіді', en: 'Faster Responses' }, prefix: '', suffix: '' },
      { value: '100%', label: { uk: 'Follow-up rate', en: 'Follow-up Rate' }, prefix: '', suffix: '' },
      { value: '30', label: { uk: 'Більше угод', en: 'More Deals' }, prefix: '+', suffix: '%' },
    ],
    technologies: ['GPT-4', 'Email Integration', 'CRM Sync', 'Calendar API', 'Multi-language NLP', 'Notification System'],
    features: [
      { icon: '✉️', title: { uk: 'AI Email Writer', en: 'AI Email Writer' }, description: { uk: 'Генерує листи за секунди', en: 'Generates emails in seconds' } },
      { icon: '🔔', title: { uk: 'Smart Reminders', en: 'Smart Reminders' }, description: { uk: 'Ніколи не пропустите follow-up', en: 'Never miss a follow-up' } },
      { icon: '📝', title: { uk: 'Description AI', en: 'Description AI' }, description: { uk: 'Описи об\'єктів на 3 мовах', en: 'Property descriptions in 3 languages' } },
      { icon: '📋', title: { uk: 'Daily Brief', en: 'Daily Brief' }, description: { uk: 'Пріоритети на день щоранку', en: 'Daily priorities every morning' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Спробувати AI-асистента', en: 'Try AI Assistant' }, icon: '👔', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Впровадити в команду', en: 'Deploy to Team' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-3: Owner Analytics & Control Dashboard
  {
    id: 'case-realestate-owner-dashboard',
    slug: 'owner-analytics-dashboard',
    relatedServiceSlug: 'analytics-assistants',
    category: 'realestate',
    industry: 'general',
    icon: '📊',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'Аналітика та контроль для власника агентства', 
      en: 'Owner Analytics & Control Dashboard' 
    },
    shortDescription: { 
      uk: 'Повна прозорість бізнесу: від ефективності агентів до прогнозу доходів — все в одному дашборді',
      en: 'Full business transparency: from agent efficiency to revenue forecast — all in one dashboard'
    },
    fullDescription: {
      uk: 'Дашборд, розроблений спеціально для власників агентств нерухомості. Показує реальну картину бізнесу без прикрас: скільки лідів обробляється, яка конверсія по агентах, де губляться угоди, який прогнозований дохід. Власник приймає рішення на основі даних, а не інтуїції.',
      en: 'Dashboard designed specifically for real estate agency owners. Shows real business picture without embellishment: how many leads processed, conversion by agent, where deals are lost, projected revenue. Owner makes decisions based on data, not intuition.'
    },
    timeline: { uk: '3-4 тижні', en: '3-4 weeks' },
    problem: {
      title: { uk: 'Що не бачить власник', en: 'What Owner Doesn\'t See' },
      points: [
        { uk: 'Скільки реально лідів обробляє кожен агент', en: 'How many leads each agent actually processes' },
        { uk: 'Чому певні ліди не конвертуються в угоди', en: 'Why certain leads don\'t convert to deals' },
        { uk: 'Яка реальна ефективність рекламних каналів', en: 'What\'s the real efficiency of ad channels' },
        { uk: 'Прогноз доходів на наступний місяць', en: 'Revenue forecast for next month' },
        { uk: 'Де в процесі найбільше втрат', en: 'Where in the process most losses occur' },
      ],
    },
    solution: {
      title: { uk: 'Що показує дашборд', en: 'What Dashboard Shows' },
      points: [
        { uk: 'Real-time воронка: від ліда до закритої угоди з конверсією на кожному етапі', en: 'Real-time funnel: from lead to closed deal with conversion at each stage' },
        { uk: 'Порівняння ефективності агентів за ключовими метриками', en: 'Agent efficiency comparison by key metrics' },
        { uk: 'AI-прогноз доходів на основі поточного pipeline', en: 'AI revenue forecast based on current pipeline' },
        { uk: 'Аналітика по джерелах лідів: які канали працюють', en: 'Lead source analytics: which channels work' },
        { uk: 'Alerts: система сигналізує про проблеми до того, як вони стануть критичними', en: 'Alerts: system signals problems before they become critical' },
        { uk: 'Автоматичні звіти на email щотижня', en: 'Automatic weekly email reports' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Revenue Intelligence', en: 'Revenue Intelligence' },
        description: { uk: 'AI аналізує pipeline та історичні дані, прогнозуючи очікуваний дохід на 30-60-90 днів вперед з точністю 85%+.', en: 'AI analyzes pipeline and historical data, forecasting expected revenue 30-60-90 days ahead with 85%+ accuracy.' }
      },
      { 
        title: { uk: 'Agent Performance Matrix', en: 'Agent Performance Matrix' },
        description: { uk: 'Об\'єктивна оцінка кожного агента: швидкість обробки лідів, конверсія, середній чек, клієнтська задоволеність.', en: 'Objective assessment of each agent: lead processing speed, conversion, average deal size, client satisfaction.' }
      },
      { 
        title: { uk: 'Smart Alerts', en: 'Smart Alerts' },
        description: { uk: 'Система автоматично сигналізує: лід завис без активності 3+ дні, агент не виконує план, канал показує аномальну конверсію.', en: 'System automatically signals: lead stuck without activity 3+ days, agent underperforming, channel showing abnormal conversion.' }
      },
    ],
    achievements: [
      { uk: 'Власник бачить повну картину за 5 хвилин замість годин звітів', en: 'Owner sees full picture in 5 minutes instead of hours of reports' },
      { uk: 'Виявлено та усунуто bottleneck, який коштував 20% угод', en: 'Identified and fixed bottleneck that cost 20% of deals' },
      { uk: 'Прогноз доходів дозволяє планувати витрати наперед', en: 'Revenue forecast allows planning expenses ahead' },
      { uk: 'Неефективні рекламні канали відключено — бюджет оптимізовано', en: 'Ineffective ad channels disabled — budget optimized' },
    ],
    results: [
      { value: '85', label: { uk: 'Точність прогнозу', en: 'Forecast Accuracy' }, prefix: '', suffix: '%' },
      { value: '5', label: { uk: 'Хвилин на огляд бізнесу', en: 'Minutes to Review Business' }, prefix: '', suffix: 'min' },
      { value: '20', label: { uk: 'Зростання ефективності', en: 'Efficiency Growth' }, prefix: '+', suffix: '%' },
      { value: '0', label: { uk: 'Сюрпризів в кінці місяця', en: 'Month-end Surprises' }, prefix: '', suffix: '' },
    ],
    technologies: ['Custom BI Dashboard', 'AI Forecasting', 'CRM Integration', 'Real-time Analytics', 'Automated Reporting', 'Alert System'],
    features: [
      { icon: '📈', title: { uk: 'Revenue Forecast', en: 'Revenue Forecast' }, description: { uk: 'AI прогнозує дохід на 90 днів', en: 'AI forecasts revenue 90 days out' } },
      { icon: '👥', title: { uk: 'Agent Leaderboard', en: 'Agent Leaderboard' }, description: { uk: 'Рейтинг ефективності агентів', en: 'Agent efficiency ranking' } },
      { icon: '🚨', title: { uk: 'Smart Alerts', en: 'Smart Alerts' }, description: { uk: 'Попередження про проблеми', en: 'Problem warnings' } },
      { icon: '📧', title: { uk: 'Auto Reports', en: 'Auto Reports' }, description: { uk: 'Щотижневі звіти на email', en: 'Weekly email reports' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Подивитися демо дашборду', en: 'See Dashboard Demo' }, icon: '📊', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Отримати для мого агентства', en: 'Get for My Agency' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-4: Ad & Lead Analytics
  {
    id: 'case-realestate-ad-analytics',
    slug: 'real-estate-ad-lead-analytics',
    relatedServiceSlug: 'analytics-assistants',
    category: 'realestate',
    industry: 'general',
    icon: '📢',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'Аналітика реклами та лідів для нерухомості', 
      en: 'Ad & Lead Analytics for Real Estate' 
    },
    shortDescription: { 
      uk: 'Зрозумійте, які рекламні канали реально приносять угоди, а не просто ліди',
      en: 'Understand which ad channels actually bring deals, not just leads'
    },
    fullDescription: {
      uk: 'Система наскрізної аналітики для агентств нерухомості. Відстежуємо шлях клієнта від першого кліку на рекламу до закритої угоди. Ви бачите справжній ROI кожного каналу: Facebook, Google, портали нерухомості, referrals. Приймайте рішення про бюджети на основі реальних даних про угоди.',
      en: 'End-to-end analytics system for real estate agencies. Track client journey from first ad click to closed deal. See true ROI of each channel: Facebook, Google, real estate portals, referrals. Make budget decisions based on real deal data.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'Типові проблеми з аналітикою', en: 'Typical Analytics Problems' },
      points: [
        { uk: 'Багато лідів з Facebook, але скільки з них стали угодами?', en: 'Lots of Facebook leads, but how many became deals?' },
        { uk: 'Неможливо порівняти ефективність порталів нерухомості', en: 'Impossible to compare real estate portal efficiency' },
        { uk: 'Referrals не відстежуються — незрозуміло, звідки вони', en: 'Referrals not tracked — unclear where they come from' },
        { uk: 'Рішення про бюджети приймаються інтуїтивно', en: 'Budget decisions made intuitively' },
        { uk: 'Немає розуміння, який тип об\'єктів краще продається через який канал', en: 'No understanding which property types sell better through which channel' },
      ],
    },
    solution: {
      title: { uk: 'Що дає система', en: 'What System Provides' },
      points: [
        { uk: 'Повний tracking: від кліку на рекламу до закритої угоди', en: 'Full tracking: from ad click to closed deal' },
        { uk: 'True ROI: скільки витрачено vs скільки зароблено по кожному каналу', en: 'True ROI: spend vs earned per channel' },
        { uk: 'Аналітика по типах нерухомості: що краще продається через який канал', en: 'Property type analytics: what sells better through which channel' },
        { uk: 'Автоматична UTM-розмітка та інтеграція з CRM', en: 'Automatic UTM tagging and CRM integration' },
        { uk: 'Weekly reports з рекомендаціями по оптимізації бюджету', en: 'Weekly reports with budget optimization recommendations' },
        { uk: 'Порівняння: ліди vs qualified leads vs deals по кожному каналу', en: 'Comparison: leads vs qualified leads vs deals per channel' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Full Funnel Attribution', en: 'Full Funnel Attribution' },
        description: { uk: 'Система відстежує весь шлях клієнта, навіть якщо він прийшов через один канал, а конвертувався через інший.', en: 'System tracks entire client journey, even if they came through one channel but converted through another.' }
      },
      { 
        title: { uk: 'Deal-based ROI', en: 'Deal-based ROI' },
        description: { uk: 'Розраховуємо ROI не по лідах, а по закритих угодах. Це єдина метрика, що має сенс для бізнесу.', en: 'Calculate ROI not by leads, but by closed deals. This is the only metric that matters for business.' }
      },
    ],
    achievements: [
      { uk: 'Виявлено, що 70% бюджету йшло на канал з найгіршою конверсією в угоди', en: 'Discovered 70% of budget went to channel with worst deal conversion' },
      { uk: 'Оптимізація бюджету дала +35% угод при тому ж бюджеті', en: 'Budget optimization gave +35% deals with same budget' },
      { uk: 'Referral program виявилася найефективнішим каналом', en: 'Referral program turned out to be most effective channel' },
    ],
    results: [
      { value: '35', label: { uk: 'Більше угод', en: 'More Deals' }, prefix: '+', suffix: '%' },
      { value: '40', label: { uk: 'Оптимізація бюджету', en: 'Budget Optimization' }, prefix: '-', suffix: '%' },
      { value: '100%', label: { uk: 'Tracking лідів', en: 'Lead Tracking' }, prefix: '', suffix: '' },
      { value: '3x', label: { uk: 'ROI найкращого каналу', en: 'Best Channel ROI' }, prefix: '', suffix: '' },
    ],
    technologies: ['Analytics Platform', 'UTM Tracking', 'CRM Integration', 'Facebook Ads API', 'Google Ads API', 'Portal API'],
    features: [
      { icon: '🎯', title: { uk: 'Full Attribution', en: 'Full Attribution' }, description: { uk: 'Від кліку до угоди', en: 'From click to deal' } },
      { icon: '💰', title: { uk: 'True ROI', en: 'True ROI' }, description: { uk: 'По угодах, не по лідах', en: 'By deals, not leads' } },
      { icon: '📊', title: { uk: 'Channel Compare', en: 'Channel Compare' }, description: { uk: 'Порівняння ефективності', en: 'Efficiency comparison' } },
      { icon: '📧', title: { uk: 'Weekly Insights', en: 'Weekly Insights' }, description: { uk: 'Рекомендації щотижня', en: 'Weekly recommendations' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Побачити свою аналітику', en: 'See Your Analytics' }, icon: '📢', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Підключити аналітику', en: 'Connect Analytics' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-5: CRM → Instagram Content Automation
  {
    id: 'case-realestate-instagram-automation',
    slug: 'crm-instagram-automation',
    relatedServiceSlug: 'workflow-automation',
    category: 'realestate',
    industry: 'general',
    icon: '📸',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'Автоматизація контенту CRM → Instagram', 
      en: 'CRM → Instagram Content Automation' 
    },
    shortDescription: { 
      uk: 'Нові об\'єкти автоматично перетворюються на готові пости для Instagram з описами та hashtags',
      en: 'New properties automatically become ready Instagram posts with descriptions and hashtags'
    },
    fullDescription: {
      uk: 'Система автоматично бере нові об\'єкти з вашої CRM, генерує привабливі описи за допомогою AI, підбирає hashtags, форматує фото для Instagram та готує пост до публікації. Вам залишається лише натиснути "Опублікувати" або навіть це можна автоматизувати.',
      en: 'System automatically takes new properties from your CRM, generates compelling descriptions using AI, selects hashtags, formats photos for Instagram and prepares post for publishing. You just click "Publish" or even that can be automated.'
    },
    timeline: { uk: '1-2 тижні', en: '1-2 weeks' },
    problem: {
      title: { uk: 'Чому контент — це біль', en: 'Why Content is Pain' },
      points: [
        { uk: 'SMM-менеджер вручну створює пост для кожного об\'єкта', en: 'SMM manager manually creates post for each property' },
        { uk: 'Написання описів займає 15-30 хвилин на об\'єкт', en: 'Writing descriptions takes 15-30 minutes per property' },
        { uk: 'Затримка між появою об\'єкта та постом — дні або тижні', en: 'Delay between property listing and post — days or weeks' },
        { uk: 'Немає часу на регулярний постинг — Instagram пустий', en: 'No time for regular posting — Instagram is empty' },
        { uk: 'Inconsistent якість та стиль контенту', en: 'Inconsistent content quality and style' },
      ],
    },
    solution: {
      title: { uk: 'Як працює автоматизація', en: 'How Automation Works' },
      points: [
        { uk: 'Новий об\'єкт з\'являється в CRM → система автоматично бере дані', en: 'New property appears in CRM → system automatically takes data' },
        { uk: 'AI генерує опис у вашому tone of voice (3 мови)', en: 'AI generates description in your tone of voice (3 languages)' },
        { uk: 'Фото обробляються та форматуються для Instagram', en: 'Photos processed and formatted for Instagram' },
        { uk: 'Підбираються релевантні hashtags для максимального reach', en: 'Relevant hashtags selected for maximum reach' },
        { uk: 'Пост готовий до публікації або публікується автоматично', en: 'Post ready for publishing or publishes automatically' },
        { uk: 'Stories та Reels генеруються автоматично', en: 'Stories and Reels generated automatically' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'AI Content Writer', en: 'AI Content Writer' },
        description: { uk: 'AI вивчає ваш стиль та генерує описи, що звучать природно. Підтримує українську, англійську, німецьку мови.', en: 'AI learns your style and generates naturally sounding descriptions. Supports Ukrainian, English, German.' }
      },
      { 
        title: { uk: 'Auto Photo Processing', en: 'Auto Photo Processing' },
        description: { uk: 'Система обирає найкращі фото, кадрує для Instagram формату, додає водяний знак за потреби.', en: 'System selects best photos, crops for Instagram format, adds watermark if needed.' }
      },
    ],
    achievements: [
      { uk: 'Час на створення поста: з 30 хвилин до 2 хвилин', en: 'Post creation time: from 30 minutes to 2 minutes' },
      { uk: '100% об\'єктів тепер мають пост в Instagram протягом 24 годин', en: '100% of properties now have Instagram post within 24 hours' },
      { uk: 'Engagement виріс на 40% завдяки регулярному постингу', en: 'Engagement grew 40% thanks to regular posting' },
      { uk: 'SMM-менеджер вивільнив час для інших задач', en: 'SMM manager freed time for other tasks' },
    ],
    results: [
      { value: '90', label: { uk: 'Менше часу на контент', en: 'Less Time on Content' }, prefix: '-', suffix: '%' },
      { value: '2', label: { uk: 'Хвилини на пост', en: 'Minutes per Post' }, prefix: '', suffix: 'min' },
      { value: '40', label: { uk: 'Зростання engagement', en: 'Engagement Growth' }, prefix: '+', suffix: '%' },
      { value: '24h', label: { uk: 'Від об\'єкта до поста', en: 'Listing to Post' }, prefix: '<', suffix: '' },
    ],
    technologies: ['CRM Integration', 'GPT-4', 'Instagram API', 'Image Processing', 'Hashtag AI', 'Scheduling System'],
    features: [
      { icon: '🤖', title: { uk: 'AI Descriptions', en: 'AI Descriptions' }, description: { uk: 'Автоматичні описи на 3 мовах', en: 'Auto descriptions in 3 languages' } },
      { icon: '📷', title: { uk: 'Photo Formatting', en: 'Photo Formatting' }, description: { uk: 'Обробка та форматування фото', en: 'Photo processing and formatting' } },
      { icon: '#️⃣', title: { uk: 'Smart Hashtags', en: 'Smart Hashtags' }, description: { uk: 'AI підбирає релевантні теги', en: 'AI selects relevant tags' } },
      { icon: '📅', title: { uk: 'Auto Scheduling', en: 'Auto Scheduling' }, description: { uk: 'Планування публікацій', en: 'Publication scheduling' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Побачити приклади постів', en: 'See Post Examples' }, icon: '📸', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Автоматизувати мій контент', en: 'Automate My Content' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-6: AI Voice Agent - Real Estate Concierge
  {
    id: 'case-realestate-voice-concierge',
    slug: 'real-estate-voice-concierge',
    relatedServiceSlug: 'ai-voice-agent',
    category: 'realestate',
    industry: 'general',
    icon: '🎧',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'AI голосовий консьєрж для нерухомості', 
      en: 'AI Voice Concierge for Real Estate' 
    },
    shortDescription: { 
      uk: 'Голосовий агент приймає дзвінки 24/7, кваліфікує ліди, записує на перегляди та відповідає на питання',
      en: 'Voice agent takes calls 24/7, qualifies leads, books viewings and answers questions'
    },
    fullDescription: {
      uk: 'AI-агент, який розмовляє як досвідчений рієлтор. Приймає всі вхідні дзвінки, відповідає на питання про об\'єкти, кваліфікує потенційних покупців, записує на перегляди. Складні питання передає живим агентам з повним контекстом розмови. Працює 24/7 на трьох мовах.',
      en: 'AI agent that speaks like an experienced realtor. Takes all incoming calls, answers property questions, qualifies potential buyers, books viewings. Escalates complex questions to live agents with full conversation context. Works 24/7 in three languages.'
    },
    timeline: { uk: '4-5 тижнів', en: '4-5 weeks' },
    problem: {
      title: { uk: 'Проблеми з телефонними дзвінками', en: 'Phone Call Problems' },
      points: [
        { uk: 'Пропущені дзвінки = втрачені ліди', en: 'Missed calls = lost leads' },
        { uk: 'Агенти на показах не можуть відповісти на дзвінки', en: 'Agents at viewings can\'t answer calls' },
        { uk: 'Вночі та у вихідні ніхто не відповідає', en: 'No one answers at night and weekends' },
        { uk: 'Багато часу на некваліфіковані дзвінки', en: 'Much time on unqualified calls' },
        { uk: 'Клієнти хочуть відповіді зараз, а не через годину', en: 'Clients want answers now, not in an hour' },
      ],
    },
    solution: {
      title: { uk: 'Що робить голосовий агент', en: 'What Voice Agent Does' },
      points: [
        { uk: 'Відповідає на всі дзвінки протягом 3 секунд, 24/7', en: 'Answers all calls within 3 seconds, 24/7' },
        { uk: 'Знає всі деталі кожного об\'єкта з бази', en: 'Knows all details of each property from database' },
        { uk: 'Кваліфікує ліда: бюджет, терміни, вподобання', en: 'Qualifies lead: budget, timeline, preferences' },
        { uk: 'Записує на перегляди, синхронізуючись з календарем агентів', en: 'Books viewings, syncing with agent calendars' },
        { uk: 'Передає гарячі ліди агентам миттєво', en: 'Passes hot leads to agents instantly' },
        { uk: 'Розмовляє українською, англійською та німецькою', en: 'Speaks Ukrainian, English and German' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Natural Conversation', en: 'Natural Conversation' },
        description: { uk: 'AI розмовляє природно, розуміє контекст, перепитує якщо не зрозумів, витримує паузи як людина.', en: 'AI speaks naturally, understands context, asks clarifying questions, maintains pauses like a human.' }
      },
      { 
        title: { uk: 'Property Knowledge', en: 'Property Knowledge' },
        description: { uk: 'Система знає всі об\'єкти з вашої бази та може детально розповісти про кожен: площа, локація, ціна, особливості.', en: 'System knows all properties from your database and can detail each: size, location, price, features.' }
      },
      { 
        title: { uk: 'Instant Escalation', en: 'Instant Escalation' },
        description: { uk: 'Якщо клієнт наполягає на розмові з людиною або питання складне — миттєвий трансфер агенту з summary розмови.', en: 'If client insists on human or question is complex — instant transfer to agent with conversation summary.' }
      },
    ],
    achievements: [
      { uk: '0 пропущених дзвінків — система відповідає завжди', en: '0 missed calls — system always answers' },
      { uk: '60% дзвінків повністю оброблені без участі людини', en: '60% of calls fully handled without human involvement' },
      { uk: 'Конверсія дзвінків у перегляди зросла на 45%', en: 'Call to viewing conversion increased 45%' },
      { uk: 'Агенти фокусуються на угодах, а не на телефоні', en: 'Agents focus on deals, not phone' },
    ],
    results: [
      { value: '0', label: { uk: 'Пропущених дзвінків', en: 'Missed Calls' }, prefix: '', suffix: '' },
      { value: '60', label: { uk: 'Автоматично оброблено', en: 'Automatically Handled' }, prefix: '', suffix: '%' },
      { value: '45', label: { uk: 'Зростання конверсії', en: 'Conversion Growth' }, prefix: '+', suffix: '%' },
      { value: '24/7', label: { uk: 'Доступність', en: 'Availability' }, prefix: '', suffix: '' },
    ],
    technologies: ['Voice AI', 'Speech-to-Text', 'Text-to-Speech', 'CRM Integration', 'Calendar API', 'Property Database', 'Multi-language NLP'],
    features: [
      { icon: '📞', title: { uk: '24/7 Availability', en: '24/7 Availability' }, description: { uk: 'Завжди на лінії', en: 'Always on the line' } },
      { icon: '🏠', title: { uk: 'Property Expert', en: 'Property Expert' }, description: { uk: 'Знає всі об\'єкти', en: 'Knows all properties' } },
      { icon: '📅', title: { uk: 'Viewing Booking', en: 'Viewing Booking' }, description: { uk: 'Записує на перегляди', en: 'Books viewings' } },
      { icon: '🌍', title: { uk: '3 Languages', en: '3 Languages' }, description: { uk: 'UA, EN, DE', en: 'UA, EN, DE' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Зателефонувати AI-агенту', en: 'Call AI Agent' }, icon: '📞', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Впровадити в агентство', en: 'Deploy to Agency' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-7: Task & Reminder Control System
  {
    id: 'case-realestate-task-control',
    slug: 'real-estate-task-control',
    relatedServiceSlug: 'ai-automation-for-real-estate',
    category: 'realestate',
    industry: 'general',
    icon: '✅',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'Система контролю задач та нагадувань', 
      en: 'Task & Reminder Control System' 
    },
    shortDescription: { 
      uk: 'AI контролює виконання задач кожним агентом та автоматично нагадує про дедлайни',
      en: 'AI controls task execution by each agent and automatically reminds of deadlines'
    },
    fullDescription: {
      uk: 'Централізована система управління задачами для агентств нерухомості. Кожен лід генерує автоматичні задачі для агента. Система відстежує виконання, нагадує про дедлайни, ескалює прострочені задачі керівнику. Власник бачить, хто що робить і де затримки.',
      en: 'Centralized task management system for real estate agencies. Each lead generates automatic tasks for agent. System tracks execution, reminds of deadlines, escalates overdue tasks to manager. Owner sees who does what and where delays are.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'Проблеми з контролем задач', en: 'Task Control Problems' },
      points: [
        { uk: 'Агенти забувають про follow-up — ліди втрачаються', en: 'Agents forget follow-ups — leads get lost' },
        { uk: 'Немає прозорості: хто над чим працює', en: 'No transparency: who works on what' },
        { uk: 'Затримки виявляються занадто пізно', en: 'Delays discovered too late' },
        { uk: 'Важко контролювати віддалених агентів', en: 'Hard to control remote agents' },
        { uk: 'Немає єдиного місця для всіх задач', en: 'No single place for all tasks' },
      ],
    },
    solution: {
      title: { uk: 'Як працює система', en: 'How System Works' },
      points: [
        { uk: 'Кожен новий лід автоматично створює задачі: зв\'язатися, кваліфікувати, запросити на перегляд', en: 'Each new lead automatically creates tasks: contact, qualify, invite to viewing' },
        { uk: 'AI-нагадування перед кожним дедлайном (email, push, SMS)', en: 'AI reminders before each deadline (email, push, SMS)' },
        { uk: 'Прострочені задачі ескалюються керівнику', en: 'Overdue tasks escalate to manager' },
        { uk: 'Дашборд для власника: всі агенти, всі задачі, всі статуси', en: 'Dashboard for owner: all agents, all tasks, all statuses' },
        { uk: 'Автоматичні звіти про продуктивність агентів', en: 'Automatic agent productivity reports' },
        { uk: 'Інтеграція з CRM — задачі синхронізовані з лідами', en: 'CRM integration — tasks synced with leads' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Auto Task Generation', en: 'Auto Task Generation' },
        description: { uk: 'Система автоматично створює задачі на основі етапу воронки. Новий лід = задача "зателефонувати". Зацікавлений = задача "показ".', en: 'System automatically creates tasks based on funnel stage. New lead = "call" task. Interested = "viewing" task.' }
      },
      { 
        title: { uk: 'Smart Escalation', en: 'Smart Escalation' },
        description: { uk: 'Якщо задача прострочена на годину — нагадування агенту. На день — ескалація керівнику. На 3 дні — alert власнику.', en: 'If task overdue by hour — agent reminder. By day — manager escalation. By 3 days — owner alert.' }
      },
    ],
    achievements: [
      { uk: 'Жоден follow-up не пропущений — 100% задач виконуються', en: 'No follow-up missed — 100% tasks completed' },
      { uk: 'Прострочені задачі виявляються миттєво, а не через тижні', en: 'Overdue tasks detected instantly, not after weeks' },
      { uk: 'Власник має повну прозорість роботи команди', en: 'Owner has full transparency of team work' },
      { uk: 'Продуктивність агентів зросла на 25%', en: 'Agent productivity increased 25%' },
    ],
    results: [
      { value: '100', label: { uk: 'Follow-up rate', en: 'Follow-up Rate' }, prefix: '', suffix: '%' },
      { value: '25', label: { uk: 'Зростання продуктивності', en: 'Productivity Growth' }, prefix: '+', suffix: '%' },
      { value: '0', label: { uk: 'Забутих лідів', en: 'Forgotten Leads' }, prefix: '', suffix: '' },
      { value: '1h', label: { uk: 'Виявлення затримок', en: 'Delay Detection' }, prefix: '<', suffix: '' },
    ],
    technologies: ['Task Management Engine', 'CRM Integration', 'Notification System', 'Analytics Dashboard', 'Escalation Logic', 'Mobile App'],
    features: [
      { icon: '🔔', title: { uk: 'Smart Reminders', en: 'Smart Reminders' }, description: { uk: 'Нагадування по всіх каналах', en: 'Reminders across all channels' } },
      { icon: '⚠️', title: { uk: 'Auto Escalation', en: 'Auto Escalation' }, description: { uk: 'Ескалація прострочених задач', en: 'Overdue task escalation' } },
      { icon: '📊', title: { uk: 'Team Dashboard', en: 'Team Dashboard' }, description: { uk: 'Всі агенти на одному екрані', en: 'All agents on one screen' } },
      { icon: '📱', title: { uk: 'Mobile Alerts', en: 'Mobile Alerts' }, description: { uk: 'Push-нотифікації для агентів', en: 'Push notifications for agents' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Подивитися систему', en: 'See the System' }, icon: '✅', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Впровадити контроль задач', en: 'Implement Task Control' }, icon: '💬', action: 'contact' },
    ],
  },

  // CASE RE-8: Listing Performance Intelligence
  {
    id: 'case-realestate-listing-intelligence',
    slug: 'listing-performance-intelligence',
    relatedServiceSlug: 'analytics-assistants',
    category: 'realestate',
    industry: 'general',
    icon: '🏆',
    industryName: { uk: 'Нерухомість', en: 'Real Estate' },
    title: { 
      uk: 'Аналітика ефективності об\'єктів', 
      en: 'Listing Performance Intelligence' 
    },
    shortDescription: { 
      uk: 'Зрозумійте, чому одні об\'єкти продаються швидко, а інші — місяцями стоять',
      en: 'Understand why some listings sell fast while others sit for months'
    },
    fullDescription: {
      uk: 'Система аналітики для розуміння ефективності кожного об\'єкта. AI аналізує перегляди, запити, час на ринку, порівнює з аналогами. Дає рекомендації: змінити ціну, оновити фото, змінити опис. Власник бачить, які об\'єкти потребують уваги, а не здогадується.',
      en: 'Analytics system for understanding each listing\'s performance. AI analyzes views, inquiries, time on market, compares with similar properties. Gives recommendations: adjust price, update photos, change description. Owner sees which listings need attention, instead of guessing.'
    },
    timeline: { uk: '2-3 тижні', en: '2-3 weeks' },
    problem: {
      title: { uk: 'Що власник не розуміє', en: 'What Owner Doesn\'t Understand' },
      points: [
        { uk: 'Чому об\'єкт стоїть 3 місяці без запитів', en: 'Why listing sits 3 months without inquiries' },
        { uk: 'Чи правильна ціна для цього об\'єкта', en: 'Is the price right for this property' },
        { uk: 'Які фото та описи працюють краще', en: 'Which photos and descriptions work better' },
        { uk: 'На яких порталах об\'єкт показується добре, а де — ні', en: 'On which portals listing performs well and where not' },
        { uk: 'Коли найкращий час для зниження ціни', en: 'When is the best time to reduce price' },
      ],
    },
    solution: {
      title: { uk: 'Що дає система', en: 'What System Provides' },
      points: [
        { uk: 'Performance score для кожного об\'єкта: наскільки він "здоровий"', en: 'Performance score for each listing: how "healthy" it is' },
        { uk: 'Порівняння з аналогічними об\'єктами: ціна, час продажу, конверсія', en: 'Comparison with similar properties: price, sale time, conversion' },
        { uk: 'AI-рекомендації: що зробити для покращення продажів', en: 'AI recommendations: what to do to improve sales' },
        { uk: 'Аналітика по порталах: де об\'єкт показується добре', en: 'Portal analytics: where listing performs well' },
        { uk: 'Alerts: система сигналізує коли об\'єкт потребує уваги', en: 'Alerts: system signals when listing needs attention' },
        { uk: 'Історична аналітика: що працювало для схожих об\'єктів', en: 'Historical analytics: what worked for similar properties' },
      ],
    },
    systemCapabilities: [
      { 
        title: { uk: 'Health Score', en: 'Health Score' },
        description: { uk: 'Кожен об\'єкт отримує score від 1 до 100: перегляди, запити, час на ринку, порівняння з конкурентами.', en: 'Each listing gets score from 1 to 100: views, inquiries, time on market, competitor comparison.' }
      },
      { 
        title: { uk: 'AI Recommendations', en: 'AI Recommendations' },
        description: { uk: 'Система аналізує проблеми та дає конкретні рекомендації: "Знизьте ціну на 5%" або "Оновіть головне фото".', en: 'System analyzes issues and gives specific recommendations: "Reduce price by 5%" or "Update main photo".' }
      },
      { 
        title: { uk: 'Competitive Analysis', en: 'Competitive Analysis' },
        description: { uk: 'AI порівнює ваш об\'єкт з аналогами на ринку: ціна за м², час продажу, якість презентації.', en: 'AI compares your listing with market analogs: price per sqm, sale time, presentation quality.' }
      },
    ],
    achievements: [
      { uk: 'Середній час продажу скоротився на 30%', en: 'Average sale time reduced 30%' },
      { uk: 'Проблемні об\'єкти виявляються через 2 тижні, а не 3 місяці', en: 'Problem listings detected in 2 weeks, not 3 months' },
      { uk: 'Оптимізація цін на основі даних, а не інтуїції', en: 'Price optimization based on data, not intuition' },
      { uk: 'Конверсія з переглядів зросла на 20%', en: 'View to inquiry conversion increased 20%' },
    ],
    results: [
      { value: '30', label: { uk: 'Швидше продаж', en: 'Faster Sales' }, prefix: '', suffix: '%' },
      { value: '20', label: { uk: 'Зростання конверсії', en: 'Conversion Growth' }, prefix: '+', suffix: '%' },
      { value: '2w', label: { uk: 'Виявлення проблем', en: 'Problem Detection' }, prefix: '', suffix: '' },
      { value: '100%', label: { uk: 'Об\'єктів аналізовано', en: 'Listings Analyzed' }, prefix: '', suffix: '' },
    ],
    technologies: ['Analytics Engine', 'AI Recommendations', 'Portal Integration', 'Competitive Intelligence', 'Alert System', 'Data Visualization'],
    features: [
      { icon: '📈', title: { uk: 'Health Score', en: 'Health Score' }, description: { uk: 'Оцінка ефективності 1-100', en: 'Performance score 1-100' } },
      { icon: '💡', title: { uk: 'AI Insights', en: 'AI Insights' }, description: { uk: 'Рекомендації що покращити', en: 'Recommendations what to improve' } },
      { icon: '🏘️', title: { uk: 'Market Compare', en: 'Market Compare' }, description: { uk: 'Порівняння з конкурентами', en: 'Competitor comparison' } },
      { icon: '⚡', title: { uk: 'Quick Alerts', en: 'Quick Alerts' }, description: { uk: 'Сигнали про проблеми', en: 'Problem signals' } },
    ],
    ctas: [
      { id: 'demo', label: { uk: 'Аналізувати мої об\'єкти', en: 'Analyze My Listings' }, icon: '🏆', action: 'demo', primary: true },
      { id: 'contact', label: { uk: 'Підключити аналітику', en: 'Connect Analytics' }, icon: '💬', action: 'contact' },
    ],
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
