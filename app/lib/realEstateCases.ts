import { Language } from './translations';

export interface RealEstateCase {
  id: string;
  slug: string;
  icon: string;
  title: { uk: string; en: string };
  shortDescription: { uk: string; en: string };
  problem: { uk: string; en: string };
  automated: { uk: string[]; en: string[] };
  result: { uk: string; en: string };
  modules?: { uk: string[]; en: string[] };
  metrics?: { value: string; label: { uk: string; en: string } }[];
}

export const realEstateCases: RealEstateCase[] = [
  {
    id: 're-ops-os',
    slug: 'operations-os',
    icon: '🏢',
    title: {
      uk: 'AI Operations OS для агенцій нерухомості',
      en: 'AI Operations OS for Real Estate Agencies',
    },
    shortDescription: {
      uk: 'Централізована система управління всіма операціями агенції',
      en: 'Centralized system for managing all agency operations',
    },
    problem: {
      uk: 'Власники агенцій витрачають 60% часу на контроль процесів замість розвитку бізнесу. Інформація розкидана між чатами, таблицями і CRM.',
      en: 'Agency owners spend 60% of their time controlling processes instead of growing the business. Information is scattered across chats, spreadsheets, and CRM.',
    },
    automated: {
      uk: [
        'Автоматичний збір даних з усіх каналів в єдиний дашборд',
        'Розподіл лідів між ріелторами за правилами',
        'Контроль виконання задач і дедлайнів',
        'Щоденні звіти власнику без ручної роботи',
      ],
      en: [
        'Automatic data collection from all channels into a single dashboard',
        'Lead distribution among realtors by rules',
        'Task and deadline control',
        'Daily reports to the owner without manual work',
      ],
    },
    result: {
      uk: 'Власник бачить повну картину бізнесу в реальному часі. Час на контроль скорочується на 70%.',
      en: 'The owner sees the complete business picture in real time. Control time is reduced by 70%.',
    },
    modules: {
      uk: ['Дашборд власника', 'Система розподілу лідів', 'Task-трекер', 'Звітність'],
      en: ['Owner Dashboard', 'Lead Distribution System', 'Task Tracker', 'Reporting'],
    },
    metrics: [
      { value: '-70%', label: { uk: 'часу на контроль', en: 'control time' } },
      { value: '100%', label: { uk: 'прозорість процесів', en: 'process transparency' } },
    ],
  },
  {
    id: 're-realtor-prod',
    slug: 'realtor-productivity',
    icon: '👤',
    title: {
      uk: 'AI система продуктивності ріелторів',
      en: 'AI Realtor Productivity System',
    },
    shortDescription: {
      uk: 'Автоматизація рутини ріелтора для більшої кількості угод',
      en: 'Automating realtor routine for more closed deals',
    },
    problem: {
      uk: 'Ріелтори витрачають до 4 годин на день на адмінзадачі: заповнення CRM, написання follow-up повідомлень, підготовку документів.',
      en: 'Realtors spend up to 4 hours a day on admin tasks: filling CRM, writing follow-ups, preparing documents.',
    },
    automated: {
      uk: [
        'Автозаповнення CRM після дзвінків і зустрічей',
        'Генерація follow-up повідомлень за шаблонами',
        'Автоматичні нагадування клієнтам',
        'Підготовка стандартних документів',
      ],
      en: [
        'Auto-fill CRM after calls and meetings',
        'Follow-up message generation by templates',
        'Automatic client reminders',
        'Standard document preparation',
      ],
    },
    result: {
      uk: 'Ріелтор фокусується на продажах. Кількість угод зростає на 40% при тому ж навантаженні.',
      en: 'Realtors focus on sales. Deal count increases by 40% with the same workload.',
    },
    modules: {
      uk: ['CRM автоматизація', 'Шаблони повідомлень', 'Нагадування', 'Документи'],
      en: ['CRM Automation', 'Message Templates', 'Reminders', 'Documents'],
    },
    metrics: [
      { value: '+40%', label: { uk: 'угод на ріелтора', en: 'deals per realtor' } },
      { value: '-4h', label: { uk: 'адмін роботи / день', en: 'admin work / day' } },
    ],
  },
  {
    id: 're-owner-analytics',
    slug: 'owner-analytics',
    icon: '📊',
    title: {
      uk: 'Аналітика і контроль для власника',
      en: 'Owner Analytics & Control Dashboard',
    },
    shortDescription: {
      uk: 'Повна картина бізнесу без запитів до команди',
      en: 'Complete business picture without asking the team',
    },
    problem: {
      uk: 'Власник не знає реальних цифр: скільки лідів втрачається, яка конверсія по ріелторах, де bottleneck. Звіти готуються вручну раз на тиждень.',
      en: 'The owner doesn\'t know real numbers: how many leads are lost, conversion by realtor, where the bottleneck is. Reports are prepared manually once a week.',
    },
    automated: {
      uk: [
        'Real-time дашборд з ключовими метриками',
        'Воронка продажів з конверсіями по етапах',
        'Порівняння ефективності ріелторів',
        'Алерти при аномаліях (падіння конверсії, затримки)',
      ],
      en: [
        'Real-time dashboard with key metrics',
        'Sales funnel with stage conversions',
        'Realtor performance comparison',
        'Alerts on anomalies (conversion drops, delays)',
      ],
    },
    result: {
      uk: 'Власник приймає рішення на основі даних, а не відчуттів. Проблеми виявляються в день виникнення.',
      en: 'The owner makes decisions based on data, not feelings. Problems are detected the day they occur.',
    },
    modules: {
      uk: ['Executive Dashboard', 'Funnel Analytics', 'Team Performance', 'Alerts'],
      en: ['Executive Dashboard', 'Funnel Analytics', 'Team Performance', 'Alerts'],
    },
    metrics: [
      { value: '24/7', label: { uk: 'доступ до метрик', en: 'metrics access' } },
      { value: '<1h', label: { uk: 'виявлення проблем', en: 'problem detection' } },
    ],
  },
  {
    id: 're-ad-analytics',
    slug: 'ad-lead-analytics',
    icon: '📈',
    title: {
      uk: 'Аналітика реклами та лідів',
      en: 'Ad & Lead Analytics for Real Estate',
    },
    shortDescription: {
      uk: 'Зрозуміло, звідки приходять гроші і де вони втрачаються',
      en: 'Clear view of where money comes from and where it\'s lost',
    },
    problem: {
      uk: 'Маркетинговий бюджет витрачається без розуміння ROI по каналах. Неможливо відстежити шлях від кліку до угоди.',
      en: 'Marketing budget is spent without understanding ROI by channel. Impossible to track the path from click to deal.',
    },
    automated: {
      uk: [
        'Наскрізна аналітика від реклами до угоди',
        'ROI по кожному каналу і кампанії',
        'Якість лідів по джерелах',
        'Автоматичні рекомендації по перерозподілу бюджету',
      ],
      en: [
        'End-to-end analytics from ad to deal',
        'ROI by each channel and campaign',
        'Lead quality by source',
        'Automatic budget reallocation recommendations',
      ],
    },
    result: {
      uk: 'Маркетинговий бюджет працює ефективніше на 30-50%. Вимикаються канали, що не приносять угод.',
      en: 'Marketing budget works 30-50% more efficiently. Channels that don\'t bring deals are turned off.',
    },
    modules: {
      uk: ['Attribution Tracking', 'Channel ROI', 'Lead Scoring', 'Budget Optimizer'],
      en: ['Attribution Tracking', 'Channel ROI', 'Lead Scoring', 'Budget Optimizer'],
    },
    metrics: [
      { value: '+35%', label: { uk: 'ROI реклами', en: 'ad ROI' } },
      { value: '100%', label: { uk: 'прозорість витрат', en: 'spend transparency' } },
    ],
  },
  {
    id: 're-crm-instagram',
    slug: 'crm-instagram-automation',
    icon: '📱',
    title: {
      uk: 'CRM → Instagram контент автоматизація',
      en: 'CRM → Instagram Content Automation',
    },
    shortDescription: {
      uk: "Об'єкти з CRM автоматично стають постами в Instagram",
      en: 'Listings from CRM automatically become Instagram posts',
    },
    problem: {
      uk: "Публікація об'єктів в Instagram займає години. Контент застаріває, об'єкти не публікуються вчасно, ріелтори не встигають.",
      en: 'Publishing listings on Instagram takes hours. Content becomes outdated, listings are not published on time, realtors can\'t keep up.',
    },
    automated: {
      uk: [
        "Генерація постів з даних об'єкта в CRM",
        'Створення візуалів з фото та інфографіки',
        'Автоматичний постинг за розкладом',
        'Оновлення статусу (продано/зарезервовано)',
      ],
      en: [
        'Post generation from listing data in CRM',
        'Visual creation with photos and infographics',
        'Automatic posting by schedule',
        'Status updates (sold/reserved)',
      ],
    },
    result: {
      uk: "Instagram завжди актуальний. Час на контент скорочується на 90%. Охоплення зростає за рахунок регулярності.",
      en: 'Instagram is always up to date. Content time is reduced by 90%. Reach grows due to consistency.',
    },
    modules: {
      uk: ['CRM Integration', 'Content Generator', 'Visual Builder', 'Auto-Poster'],
      en: ['CRM Integration', 'Content Generator', 'Visual Builder', 'Auto-Poster'],
    },
    metrics: [
      { value: '-90%', label: { uk: 'часу на контент', en: 'content time' } },
      { value: '+3x', label: { uk: 'частота публікацій', en: 'posting frequency' } },
    ],
  },
  {
    id: 're-voice-agent',
    slug: 'voice-concierge',
    icon: '🎙️',
    title: {
      uk: 'AI голосовий агент (консьєрж нерухомості)',
      en: 'AI Voice Agent (Real Estate Concierge)',
    },
    shortDescription: {
      uk: 'Віртуальний асистент, що відповідає на дзвінки 24/7',
      en: 'Virtual assistant answering calls 24/7',
    },
    problem: {
      uk: 'Пропущені дзвінки = втрачені ліди. Ріелтори не встигають відповідати, особливо ввечері та у вихідні.',
      en: 'Missed calls = lost leads. Realtors can\'t answer in time, especially evenings and weekends.',
    },
    automated: {
      uk: [
        "Прийом вхідних дзвінків і кваліфікація лідів",
        "Відповіді на типові питання про об'єкти",
        "Запис на перегляд з інтеграцією в календар",
        "Передача теплих лідів ріелторам",
      ],
      en: [
        'Incoming call handling and lead qualification',
        'Answers to common questions about listings',
        'Viewing appointment booking with calendar integration',
        'Warm lead handoff to realtors',
      ],
    },
    result: {
      uk: 'Жоден дзвінок не пропущено. Конверсія з дзвінків зростає на 60%. Ріелтори працюють тільки з кваліфікованими лідами.',
      en: 'No call is missed. Call conversion increases by 60%. Realtors work only with qualified leads.',
    },
    modules: {
      uk: ['Voice AI', 'Lead Qualification', 'Appointment Booking', 'CRM Sync'],
      en: ['Voice AI', 'Lead Qualification', 'Appointment Booking', 'CRM Sync'],
    },
    metrics: [
      { value: '0', label: { uk: 'пропущених дзвінків', en: 'missed calls' } },
      { value: '+60%', label: { uk: 'конверсія з дзвінків', en: 'call conversion' } },
    ],
  },
  {
    id: 're-task-control',
    slug: 'task-reminder-system',
    icon: '✅',
    title: {
      uk: 'Система контролю задач і нагадувань',
      en: 'Task & Reminder Control System',
    },
    shortDescription: {
      uk: 'Автоматичний контроль виконання без мікроменеджменту',
      en: 'Automatic execution control without micromanagement',
    },
    problem: {
      uk: 'Задачі губляться між чатами і CRM. Власник змушений нагадувати команді про дедлайни. Немає єдиного місця для контролю.',
      en: 'Tasks get lost between chats and CRM. The owner has to remind the team about deadlines. No single place for control.',
    },
    automated: {
      uk: [
        'Автоматичне створення задач з CRM подій',
        'Нагадування ріелторам перед дедлайнами',
        'Ескалація прострочених задач власнику',
        'Звіти по виконанню для performance review',
      ],
      en: [
        'Automatic task creation from CRM events',
        'Reminders to realtors before deadlines',
        'Escalation of overdue tasks to the owner',
        'Execution reports for performance review',
      ],
    },
    result: {
      uk: 'Нічого не забувається. Власник бачить bottleneck без питань. Команда працює передбачувано.',
      en: 'Nothing is forgotten. The owner sees bottlenecks without asking. The team works predictably.',
    },
    modules: {
      uk: ['Task Engine', 'Smart Reminders', 'Escalation Rules', 'Performance Reports'],
      en: ['Task Engine', 'Smart Reminders', 'Escalation Rules', 'Performance Reports'],
    },
    metrics: [
      { value: '98%', label: { uk: 'задач вчасно', en: 'tasks on time' } },
      { value: '0', label: { uk: 'забутих follow-up', en: 'forgotten follow-ups' } },
    ],
  },
  {
    id: 're-listing-intel',
    slug: 'listing-intelligence',
    icon: '🏠',
    title: {
      uk: "Аналітика ефективності об'єктів",
      en: 'Listing Performance Intelligence',
    },
    shortDescription: {
      uk: "Зрозуміло, які об'єкти продаються і чому",
      en: 'Clear view of which listings sell and why',
    },
    problem: {
      uk: "Немає розуміння, чому одні об'єкти продаються швидко, а інші висять місяцями. Рішення про ціну приймаються інтуїтивно.",
      en: 'No understanding of why some listings sell fast while others sit for months. Pricing decisions are made intuitively.',
    },
    automated: {
      uk: [
        "Аналіз швидкості продажу по типах об'єктів",
        'Порівняння з ринковими даними',
        'Рекомендації по ціноутворенню',
        'Алерти по застарілих лістингах',
      ],
      en: [
        'Sales velocity analysis by listing type',
        'Comparison with market data',
        'Pricing recommendations',
        'Alerts on stale listings',
      ],
    },
    result: {
      uk: "Об'єкти продаються на 25% швидше. Власник розуміє, на які об'єкти робити ставку.",
      en: 'Listings sell 25% faster. The owner understands which listings to bet on.',
    },
    modules: {
      uk: ['Listing Analytics', 'Market Comparison', 'Price Optimizer', 'Stale Alerts'],
      en: ['Listing Analytics', 'Market Comparison', 'Price Optimizer', 'Stale Alerts'],
    },
    metrics: [
      { value: '-25%', label: { uk: 'час до продажу', en: 'time to sale' } },
      { value: '+15%', label: { uk: 'маржа по угодах', en: 'deal margin' } },
    ],
  },
];

export function getRealEstateCaseBySlug(slug: string): RealEstateCase | undefined {
  return realEstateCases.find((c) => c.slug === slug);
}

export function getLocalizedREText(
  field: { uk: string; en: string } | undefined,
  lang: Language
): string {
  if (!field) return '';
  return field[lang] || field.en || '';
}
