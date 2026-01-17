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
