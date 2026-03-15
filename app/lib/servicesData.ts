import type { Language } from './translations';

export type LocalizedText = { uk: string; en: string };

export const getLocalizedText = (text: LocalizedText, lang: Language): string => {
  return text[lang] || text.en;
};

export type ServiceCategory = 'agents' | 'automation' | 'analytics' | 'models' | 'leadgen' | 'realestate' | 'content';

export type ServiceFeature = {
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type ServiceStep = {
  title: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
};

export type ServiceFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export interface ServicePage {
  slug: string;
  category: ServiceCategory;
  title: LocalizedText;
  subtitle: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  keywords: { uk: string[]; en: string[] };
  timeline: LocalizedText;
  outcomes: LocalizedText[];
  features: ServiceFeature[];
  useCases: { title: LocalizedText; description: LocalizedText }[];
  implementation: ServiceStep[];
  faq: ServiceFaq[];
  relatedArticleSlugs?: string[];
  relatedCaseSlugs?: string[];
}

export const servicesData: ServicePage[] = [
  {
    slug: 'ai-chatbot-for-business',
    category: 'agents',
    title: { uk: 'AI чатбот для бізнесу', en: 'AI Chatbot for Business' },
    subtitle: {
      uk: 'Підтримка 24/7, лідогенерація та база знань — з RAG, інтеграціями та контролем якості.',
      en: '24/7 support, lead capture, and knowledge base — with RAG, integrations, and quality control.',
    },
    seoTitle: {
      uk: 'AI чатбот для бізнесу (RAG + інтеграції) | AI Insider',
      en: 'AI Chatbot for Business (RAG + Integrations) | AI Insider',
    },
    seoDescription: {
      uk: 'Створюємо AI чатботи для бізнесу: підтримка, продажі, лідогенерація. RAG‑база знань, інтеграції з CRM, мультимовність, аналітика. Швейцарія (CH), Європа та США.',
      en: 'We build AI chatbots for business: support, sales, and lead generation. RAG knowledge base, CRM integrations, multilingual UX, and analytics. Based in Switzerland (CH), working across EU & US.',
    },
    keywords: {
      en: [
        'AI chatbot for business',
        'custom AI chatbot',
        'RAG chatbot',
        'AI customer support chatbot',
        'website chatbot',
        'multilingual chatbot',
        'AI chatbot Switzerland',
        'AI chatbot Zurich',
        'AI chatbot lead generation',
      ],
      uk: [
        'AI чатбот для бізнесу',
        'ШІ чатбот для бізнесу',
        'RAG чатбот',
        'чатбот для сайту',
        'чатбот підтримки клієнтів',
        'мультимовний чатбот',
        'AI чатбот Швейцарія',
        'AI чатбот Цюрих',
        'чатбот для лідогенерації',
      ],
    },
    timeline: { uk: '2–4 тижні до запуску', en: '2–4 weeks to launch' },
    outcomes: [
      {
        uk: 'Менше навантаження на підтримку: до 60–80% типових запитів закривається автоматично',
        en: 'Reduce support load: automate up to 60–80% of repetitive questions',
      },
      {
        uk: 'Більше лідів: збір контактів, кваліфікація і передача в CRM без ручної роботи',
        en: 'More leads: capture, qualify, and push to CRM automatically',
      },
      {
        uk: 'Кращий UX: відповіді за секунди, 24/7, з передачею на менеджера при потребі',
        en: 'Better UX: seconds-level responses, 24/7, with smooth human handoff when needed',
      },
    ],
    features: [
      {
        icon: '🧠',
        title: { uk: 'RAG‑база знань', en: 'RAG Knowledge Base' },
        description: {
          uk: 'Підключаємо ваші документи, FAQ, каталоги, політики — і даємо відповіді з джерелами.',
          en: 'Connect your docs, FAQs, catalogs, and policies — and answer with grounded sources.',
        },
      },
      {
        icon: '📈',
        title: { uk: 'Лідогенерація + кваліфікація', en: 'Lead Capture + Qualification' },
        description: {
          uk: 'Збираємо контакти, задаємо правильні питання, оцінюємо намір і віддаємо ліди в CRM.',
          en: 'Collect contacts, ask the right questions, score intent, and push leads into CRM.',
        },
      },
      {
        icon: '🔌',
        title: { uk: 'Інтеграції', en: 'Integrations' },
        description: {
          uk: 'CRM, календар, пошта, аналітика, підтримка — інтегруємо з вашим стеком.',
          en: 'CRM, calendar, email, analytics, support tools — integrated with your stack.',
        },
      },
      {
        icon: '🛡️',
        title: { uk: 'Контроль якості', en: 'Quality Controls' },
        description: {
          uk: 'Гардрейли, fallback‑сценарії, фільтри та тестування — щоб зменшити “галюцинації”.',
          en: 'Guardrails, fallbacks, filters, and testing — to reduce hallucinations and errors.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Підтримка клієнтів', en: 'Customer Support' },
        description: {
          uk: 'Статуси, повернення, умови, оплата, доставка — автоматичні відповіді 24/7.',
          en: 'Order status, returns, policies, billing, delivery — automated answers 24/7.',
        },
      },
      {
        title: { uk: 'Продажі на сайті', en: 'Website Sales' },
        description: {
          uk: 'Підбір продукту/послуги, заперечення, бронювання дзвінка, збір контактів.',
          en: 'Recommend products/services, handle objections, book a call, and capture leads.',
        },
      },
      {
        title: { uk: 'Внутрішній асистент', en: 'Internal Assistant' },
        description: {
          uk: 'Політики, регламенти, онбординг — швидкі відповіді для команди з посиланнями на джерела.',
          en: 'Policies, SOPs, onboarding — fast answers for the team with citations to sources.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Discovery + контент‑аудит', en: 'Discovery + Content Audit' },
        description: {
          uk: 'Фіксуємо цілі, сценарії, джерела знань, метрики та точки інтеграції.',
          en: 'Define goals, flows, knowledge sources, success metrics, and integration points.',
        },
        duration: { uk: '2–5 днів', en: '2–5 days' },
      },
      {
        title: { uk: 'RAG + діалогові флоу', en: 'RAG + Dialog Flows' },
        description: {
          uk: 'Будуємо базу знань, відповіді, кваліфікацію лідів та передачу на менеджера.',
          en: 'Build the knowledge base, answers, lead qualification, and human handoff paths.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Інтеграції + QA', en: 'Integrations + QA' },
        description: {
          uk: 'CRM/календар/форми, тестування, логування, сценарії помилок та запуск.',
          en: 'CRM/calendar/forms, testing, logging, error handling, and production launch.',
        },
        duration: { uk: '1 тиждень', en: '1 week' },
      },
      {
        title: { uk: 'Оптимізація', en: 'Optimization' },
        description: {
          uk: 'Покращуємо відповіді за даними діалогів і додаємо нові сценарії.',
          en: 'Iterate on answers using conversation data and ship new scenarios.',
        },
        duration: { uk: 'постійно', en: 'ongoing' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи “вчиться” чатбот на наших даних?', en: 'Do you train on our data?' },
        answer: {
          uk: 'Ми використовуємо RAG: модель отримує тільки релевантні фрагменти ваших матеріалів для відповіді. Ваші дані не використовуються для навчання публічних моделей.',
          en: 'We use RAG: the model is grounded on relevant fragments of your materials. Your data is not used to train public models.',
        },
      },
      {
        question: { uk: 'Як зменшити помилки/“галюцинації”?', en: 'How do you reduce hallucinations?' },
        answer: {
          uk: 'Додаємо гардрейли, обмеження тем, відповіді з джерелами, fallback‑сценарії, та регулярне тестування.',
          en: 'We add guardrails, topic constraints, source-grounded answers, fallbacks, and ongoing evaluation.',
        },
      },
      {
        question: { uk: 'Чи можна інтегрувати з CRM?', en: 'Can you integrate with our CRM?' },
        answer: {
          uk: 'Так. Підключаємо найпопулярніші CRM та кастомні системи через API/вебхуки.',
          en: 'Yes. We integrate with popular CRMs and custom systems via API/webhooks.',
        },
      },
      {
        question: { uk: 'Чи підтримує чатбот 2 мови?', en: 'Can the chatbot be bilingual?' },
        answer: {
          uk: 'Так — українська/англійська (та інші). Ми налаштовуємо окремі знання/тона та перевіряємо якість по кожній мові.',
          en: 'Yes — Ukrainian/English (and more). We can separate tone/knowledge and validate quality per language.',
        },
      },
    ],
    relatedArticleSlugs: ['rag-chatbot-for-b2b-what-works', 'ai-whatsapp-sales-bot-for-ecommerce', 'ai-onboarding-assistant-for-saas'],
    relatedCaseSlugs: ['ecommerce-ai-chatbot', 'beauty-salon-ai-assistant', 'facebook-outreach-automation'],
  },
  {
    slug: 'ai-voice-agent',
    category: 'agents',
    title: { uk: 'AI голосовий агент', en: 'AI Voice Agent' },
    subtitle: {
      uk: 'Приймає дзвінки 24/7, кваліфікує ліди, бронює зустрічі та передає оператору коли потрібно.',
      en: 'Answers calls 24/7, qualifies leads, books meetings, and hands off to humans when needed.',
    },
    seoTitle: {
      uk: 'AI голосовий агент для бізнесу | AI Insider',
      en: 'AI Voice Agent for Business | AI Insider',
    },
    seoDescription: {
      uk: 'Створюємо AI голосових агентів: дзвінки, кваліфікація лідів, бронювання, інтеграції з CRM. Для Швейцарії (CH), Європи та США.',
      en: 'We build AI voice agents for calls, lead qualification, appointment booking, and CRM integrations. Built for Switzerland (CH), Europe, and the US.',
    },
    keywords: {
      en: [
        'AI voice agent',
        'voice agent for business',
        'AI phone agent',
        'AI call assistant',
        'appointment booking voice agent',
        'AI voice agent Switzerland',
        'AI voice agent for real estate',
      ],
      uk: [
        'AI голосовий агент',
        'ШІ голосовий агент',
        'голосовий агент для бізнесу',
        'AI телефонний агент',
        'голосовий агент для бронювання',
        'AI голосовий агент Швейцарія',
        'голосовий агент для нерухомості',
      ],
    },
    timeline: { uk: '3–6 тижнів до запуску', en: '3–6 weeks to launch' },
    outcomes: [
      {
        uk: 'Менше пропущених дзвінків: 24/7 відповіді, навіть у пікові години',
        en: 'Fewer missed calls: 24/7 coverage even during peak hours',
      },
      {
        uk: 'Більше зустрічей: бронювання в календар + підтвердження в SMS/Email',
        en: 'More booked meetings: calendar scheduling + confirmations via SMS/email',
      },
      {
        uk: 'Краще відпрацювання лідів: кваліфікація і заповнення CRM автоматично',
        en: 'Better lead handling: qualification and CRM updates automatically',
      },
    ],
    features: [
      {
        icon: '📞',
        title: { uk: 'Вхідні та вихідні дзвінки', en: 'Inbound + Outbound Calls' },
        description: {
          uk: 'Приймає звернення, робить follow‑up, підтверджує записи, нагадує про зустрічі.',
          en: 'Handles inbound requests, follows up, confirms bookings, and sends reminders.',
        },
      },
      {
        icon: '🗓️',
        title: { uk: 'Бронювання та маршрутизація', en: 'Scheduling + Routing' },
        description: {
          uk: 'Підключаємо календар, правила маршрутизації та передачу на менеджера/оператора.',
          en: 'Integrate your calendar, routing rules, and live transfer to a human agent.',
        },
      },
      {
        icon: '📝',
        title: { uk: 'Транскрипт + підсумок', en: 'Transcript + Summary' },
        description: {
          uk: 'Після дзвінка — автоматичний підсумок, наступні кроки та оновлення CRM.',
          en: 'After each call — auto summary, next steps, and CRM updates.',
        },
      },
      {
        icon: '🌍',
        title: { uk: 'Мультимовність', en: 'Multilingual' },
        description: {
          uk: 'Налаштовуємо голос/тонацію та сценарії під українську й англійську (і не тільки).',
          en: 'Tune voice, tone, and flows for Ukrainian and English (and more).',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Нерухомість', en: 'Real Estate' },
        description: {
          uk: 'Запити по обʼєктах, кваліфікація бюджету, запис на перегляд, follow‑up після показу.',
          en: 'Property inquiries, budget qualification, viewing scheduling, and post-viewing follow-ups.',
        },
      },
      {
        title: { uk: 'Сервісні бізнеси', en: 'Service Businesses' },
        description: {
          uk: 'Запис на послуги, перенесення, нагадування, відповіді на типові питання.',
          en: 'Booking, rescheduling, reminders, and answers to common questions.',
        },
      },
      {
        title: { uk: 'B2B продажі', en: 'B2B Sales' },
        description: {
          uk: 'Кваліфікація лідів, первинні запитання, передача теплого ліда менеджеру.',
          en: 'Qualify leads, ask discovery questions, and route warm leads to sales.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Сценарії + тон голосу', en: 'Call Flows + Voice Tone' },
        description: {
          uk: 'Описуємо типи дзвінків, правила, обмеження та “коли передавати людині”.',
          en: 'Define call types, rules, constraints, and “when to hand off to a human”.',
        },
        duration: { uk: '3–7 днів', en: '3–7 days' },
      },
      {
        title: { uk: 'Інтеграції', en: 'Integrations' },
        description: {
          uk: 'Телефонія, календар, CRM, повідомлення, логування та аналітика.',
          en: 'Telephony, calendar, CRM, messaging, logging, and analytics.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Тестування + запуск', en: 'Testing + Launch' },
        description: {
          uk: 'Навантажувальні тести, edge‑кейси, контроль якості розмов і реліз.',
          en: 'Load tests, edge cases, call quality evaluation, and rollout.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи може агент передати дзвінок людині?', en: 'Can it transfer the call to a human?' },
        answer: {
          uk: 'Так. Налаштовуємо правила передачі (за наміром, ключовими словами, або за запитом клієнта).',
          en: 'Yes. We set transfer rules by intent, keywords, or user request.',
        },
      },
      {
        question: { uk: 'Чи буде голос “природним”?', en: 'Will it sound natural?' },
        answer: {
          uk: 'Ми підбираємо голос/тонацію під ваш бренд і тестуємо на реальних сценаріях до запуску.',
          en: 'We pick voice and tone aligned with your brand and validate with real call scenarios.',
        },
      },
      {
        question: { uk: 'Чи можна підключити CRM та календар?', en: 'Can you connect CRM and calendar?' },
        answer: {
          uk: 'Так — інтегруємо через API/вебхуки, щоб агент сам бронював і оновлював картку ліда.',
          en: 'Yes — via API/webhooks so the agent can schedule and update the lead record automatically.',
        },
      },
    ],
    relatedArticleSlugs: ['ai-voice-agent-for-real-estate', 'ai-cold-calling-agent-that-books-meetings', 'ai-receptionist-for-small-business'],
    relatedCaseSlugs: ['voice-agent-salon-bookings', 'real-estate-voice-agent'],
  },
  {
    slug: 'ai-lead-generation',
    category: 'leadgen',
    title: { uk: 'AI лідогенерація', en: 'AI Lead Generation' },
    subtitle: {
      uk: 'Автоворонки, скоринг, персоналізація та follow‑up — щоб стабільно отримувати більше якісних лідів.',
      en: 'Funnels, scoring, personalization, and follow‑ups — to consistently generate higher-quality leads.',
    },
    seoTitle: {
      uk: 'AI лідогенерація та автоматизація продажів | AI Insider',
      en: 'AI Lead Generation & Sales Automation | AI Insider',
    },
    seoDescription: {
      uk: 'Будуємо AI‑системи для лідогенерації: збір, збагачення, скоринг, персоналізація, автосупровід і CRM‑пайплайн. Швейцарія (CH), Європа та США.',
      en: 'We build AI lead generation systems: capture, enrichment, scoring, personalization, follow-ups, and CRM pipeline automation. Switzerland (CH), Europe, and the US.',
    },
    keywords: {
      en: [
        'AI lead generation',
        'lead generation automation',
        'AI outreach automation',
        'AI SDR',
        'B2B lead generation automation',
        'AI lead scoring',
        'AI sales automation',
      ],
      uk: [
        'AI лідогенерація',
        'ШІ генерація лідів',
        'автоматизація лідогенерації',
        'AI SDR',
        'B2B лідогенерація',
        'скоринг лідів AI',
        'AI автоматизація продажів',
      ],
    },
    timeline: { uk: '2–5 тижнів до запуску', en: '2–5 weeks to launch' },
    outcomes: [
      {
        uk: 'Швидше реагування на заявки: lead → CRM → менеджер за хвилини',
        en: 'Faster response: lead → CRM → sales owner in minutes',
      },
      {
        uk: 'Вища якість лідів: скоринг і кваліфікація до першого контакту',
        en: 'Higher lead quality: scoring and qualification before first contact',
      },
      {
        uk: 'Більше зустрічей: автоматичні follow‑up та бронювання',
        en: 'More booked meetings: automated follow-ups and scheduling',
      },
    ],
    features: [
      {
        icon: '🎯',
        title: { uk: 'Скоринг та сегментація', en: 'Scoring + Segmentation' },
        description: {
          uk: 'Оцінюємо ліди за наміром і даними — щоб команда працювала з найтеплішими.',
          en: 'Score leads by intent and data — so your team focuses on the warmest ones first.',
        },
      },
      {
        icon: '🧩',
        title: { uk: 'Збагачення даних', en: 'Data Enrichment' },
        description: {
          uk: 'Автоматично доповнюємо профіль ліда (компанія, роль, інтерес) під ваші правила.',
          en: 'Enrich lead profiles (company, role, intent) with rules tailored to your process.',
        },
      },
      {
        icon: '✉️',
        title: { uk: 'Follow‑up та автоворонки', en: 'Follow-ups + Funnels' },
        description: {
          uk: 'Листи/повідомлення, нагадування, повторні контакти — без втрати лідів у пайплайні.',
          en: 'Messages, reminders, re-engagement — so leads never get lost in the pipeline.',
        },
      },
      {
        icon: '🔁',
        title: { uk: 'CRM‑пайплайн', en: 'CRM Pipeline' },
        description: {
          uk: 'Автоматичне створення лідів/угод, задачі менеджерам, контроль SLA та звіти.',
          en: 'Auto-create leads/deals, assign tasks, track SLA, and generate reports.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'B2B outbound', en: 'B2B Outbound' },
        description: {
          uk: 'Персоналізовані кампанії, follow‑up, бронювання та передача кваліфікованих лідів.',
          en: 'Personalized outreach, follow-ups, booking, and routing qualified leads to sales.',
        },
      },
      {
        title: { uk: 'Inbound заявки', en: 'Inbound Leads' },
        description: {
          uk: 'Миттєва реакція на форму/чат/дзвінок + автоматичний скоринг і розподіл.',
          en: 'Instant response to form/chat/call + automatic scoring and assignment.',
        },
      },
      {
        title: { uk: 'Нерухомість / фінансові послуги', en: 'Real Estate / Financial Services' },
        description: {
          uk: 'Кваліфікація бюджету, термінів, критеріїв — і підбір наступного кроку.',
          en: 'Qualify budget, timeframe, criteria — and move to the next best step.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Пайплайн + метрики', en: 'Pipeline + Metrics' },
        description: {
          uk: 'Фіксуємо ICP, джерела лідів, стадії, SLA і що вважаємо “якісним лідом”.',
          en: 'Define ICP, lead sources, stages, SLAs, and what “qualified” means for you.',
        },
        duration: { uk: '2–5 днів', en: '2–5 days' },
      },
      {
        title: { uk: 'Інтеграції + автоматизації', en: 'Integrations + Automations' },
        description: {
          uk: 'Форми/реклама/чат/CRM, правила скорингу, follow‑up, задачі менеджерам.',
          en: 'Forms/ads/chat/CRM, scoring rules, follow-ups, and tasks for sales owners.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Запуск + оптимізація', en: 'Launch + Optimization' },
        description: {
          uk: 'A/B, контроль якості, звіти, тонке налаштування і масштабування.',
          en: 'A/B, quality checks, reporting, fine-tuning, and scaling.',
        },
        duration: { uk: '1–3 тижні', en: '1–3 weeks' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи це тільки outbound?', en: 'Is it only outbound?' },
        answer: {
          uk: 'Ні. Ми будуємо і inbound (форми/чат/дзвінки), і outbound, і змішані автоворонки.',
          en: 'No. We build inbound (forms/chat/calls), outbound, and hybrid funnels.',
        },
      },
      {
        question: { uk: 'Чи можна зробити скоринг під наші правила?', en: 'Can scoring match our rules?' },
        answer: {
          uk: 'Так. Скоринг налаштовується під ваші критерії (бюджет, гео, індустрія, намір).',
          en: 'Yes. Scoring is tailored to your criteria (budget, geo, industry, intent).',
        },
      },
      {
        question: { uk: 'Чи підключається до CRM?', en: 'Does it connect to CRM?' },
        answer: {
          uk: 'Так — інтеграція з CRM/таблицями/BI, щоб бачити весь пайплайн в одному місці.',
          en: 'Yes — CRM/spreadsheets/BI integrations so you can track the pipeline end-to-end.',
        },
      },
    ],
    relatedArticleSlugs: ['how-to-automate-lead-routing-with-ai', 'ai-lead-scoring-how-to-separate-signal-from-noise', 'ai-sdr-workflow-for-b2b-outbound'],
    relatedCaseSlugs: ['facebook-outreach-automation', 'real-estate-lead-qualification'],
  },
  {
    slug: 'ai-automation-for-real-estate',
    category: 'realestate',
    title: { uk: 'AI автоматизація для нерухомості', en: 'AI Automation for Real Estate' },
    subtitle: {
      uk: 'Запити по обʼєктах, кваліфікація, підбір, перегляди, follow‑up і CRM — в одній AI‑системі.',
      en: 'Inquiries, qualification, matching, showings, follow-ups, and CRM — in one AI system.',
    },
    seoTitle: {
      uk: 'AI автоматизація для агенцій нерухомості | AI Insider',
      en: 'AI Automation for Real Estate Agencies | AI Insider',
    },
    seoDescription: {
      uk: 'Автоматизуємо продажі нерухомості: чат + голос, кваліфікація, підбір обʼєктів, запис на перегляд, follow‑up, CRM та аналітика. Швейцарія (CH), Європа, США.',
      en: 'We automate real estate sales: chat + voice, qualification, property matching, viewing scheduling, follow-ups, CRM and analytics. Switzerland (CH), EU, US.',
    },
    keywords: {
      en: [
        'AI automation for real estate',
        'real estate chatbot',
        'real estate voice agent',
        'property inquiry automation',
        'real estate lead qualification',
        'AI real estate lead generation',
      ],
      uk: [
        'AI автоматизація для нерухомості',
        'чатбот для нерухомості',
        'голосовий агент для нерухомості',
        'автоматизація запитів по обʼєктах',
        'кваліфікація лідів нерухомості',
        'AI лідогенерація нерухомість',
      ],
    },
    timeline: { uk: '3–8 тижнів до запуску', en: '3–8 weeks to launch' },
    outcomes: [
      {
        uk: 'Більше конверсії: миттєва реакція на заявки та дзвінки 24/7',
        en: 'Higher conversion: instant response to inquiries and calls 24/7',
      },
      {
        uk: 'Менше “холодних” переглядів: кваліфікація бюджету/термінів/критеріїв',
        en: 'Fewer low-quality showings: qualify budget/timeframe/criteria upfront',
      },
      {
        uk: 'Прозорий пайплайн: CRM оновлюється автоматично, є звіти по джерелах та стадіях',
        en: 'Transparent pipeline: CRM updates automatically with reporting by source and stage',
      },
    ],
    features: [
      {
        icon: '🏡',
        title: { uk: 'Підбір обʼєктів', en: 'Property Matching' },
        description: {
          uk: 'AI уточнює критерії та пропонує релевантні обʼєкти (за вашими даними/каталогом).',
          en: 'AI refines requirements and recommends relevant listings from your catalog/data.',
        },
      },
      {
        icon: '✅',
        title: { uk: 'Кваліфікація ліда', en: 'Lead Qualification' },
        description: {
          uk: 'Бюджет, локація, терміни, іпотека, тип обʼєкта — структуровано й без втрат.',
          en: 'Budget, location, timeline, financing, property type — structured and consistent.',
        },
      },
      {
        icon: '📅',
        title: { uk: 'Запис на перегляд', en: 'Viewing Scheduling' },
        description: {
          uk: 'Підключаємо календарі агентів, нагадування і підтвердження для клієнта.',
          en: 'Connect agent calendars, reminders, and confirmations for the client.',
        },
      },
      {
        icon: '🔄',
        title: { uk: 'Follow‑up', en: 'Follow-ups' },
        description: {
          uk: 'Після перегляду: збір фідбеку, наступні кроки, альтернативи, повторний контакт.',
          en: 'Post-viewing: feedback, next steps, alternatives, and re-engagement.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Запити з сайту', en: 'Website Inquiries' },
        description: {
          uk: 'Чатбот/форма → кваліфікація → CRM → запис на перегляд.',
          en: 'Chat/form → qualification → CRM → schedule a viewing.',
        },
      },
      {
        title: { uk: 'Дзвінки', en: 'Calls' },
        description: {
          uk: 'Голосовий агент відповідає на дзвінки, кваліфікує і бронює зустріч.',
          en: 'Voice agent answers calls, qualifies, and books a meeting.',
        },
      },
      {
        title: { uk: 'Портали / рекламні ліди', en: 'Portals / Ads Leads' },
        description: {
          uk: 'Авто‑обробка заявок, розподіл агентам, follow‑up і звіти по джерелах.',
          en: 'Auto-processing, routing to agents, follow-ups, and source-level reporting.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Процес продажів', en: 'Sales Process' },
        description: {
          uk: 'Фіксуємо стадії, правила кваліфікації, каталог обʼєктів і точки інтеграції.',
          en: 'Map stages, qualification rules, listing catalog, and integration points.',
        },
        duration: { uk: '3–7 днів', en: '3–7 days' },
      },
      {
        title: { uk: 'AI‑логіка + інтеграції', en: 'AI Logic + Integrations' },
        description: {
          uk: 'Чат/голос, календарі, CRM, автоматичні задачі, повідомлення та аналітика.',
          en: 'Chat/voice, calendars, CRM, automated tasks, messaging, and analytics.',
        },
        duration: { uk: '2–4 тижні', en: '2–4 weeks' },
      },
      {
        title: { uk: 'Запуск + масштабування', en: 'Launch + Scale' },
        description: {
          uk: 'Тестування, навчання на діалогах, додавання сценаріїв і оптимізація конверсії.',
          en: 'Testing, iteration using conversations, new flows, and conversion optimization.',
        },
        duration: { uk: '1–3 тижні', en: '1–3 weeks' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи можна зробити підбір обʼєктів з нашого каталогу?', en: 'Can it match from our listing catalog?' },
        answer: {
          uk: 'Так. Підключаємо вашу базу (CRM/MLS/таблиці/API) і налаштовуємо логіку підбору.',
          en: 'Yes. We connect your database (CRM/MLS/spreadsheets/API) and tune matching logic.',
        },
      },
      {
        question: { uk: 'Чи працює це в Швейцарії (CH)?', en: 'Does it work in Switzerland (CH)?' },
        answer: {
          uk: 'Так. Ми враховуємо часові пояси, мови та локальні процеси. Також працюємо в ЄС та США.',
          en: 'Yes. We handle time zones, languages, and local workflows. We also operate across EU and US.',
        },
      },
      {
        question: { uk: 'Чи інтегрується з CRM?', en: 'Does it integrate with CRM?' },
        answer: {
          uk: 'Так — щоб ліди, нотатки, дзвінки та статуси оновлювались автоматично.',
          en: 'Yes — so leads, notes, calls, and statuses are updated automatically.',
        },
      },
    ],
    relatedArticleSlugs: ['ai-voice-agent-for-real-estate', 'ai-proposal-generator-for-agencies', 'how-to-automate-lead-routing-with-ai'],
    relatedCaseSlugs: ['real-estate-lead-qualification', 'real-estate-voice-agent'],
  },
  {
    slug: 'workflow-automation',
    category: 'automation',
    title: { uk: 'Автоматизація процесів', en: 'Workflow Automation' },
    subtitle: {
      uk: 'Інтегруємо ваші інструменти та автоматизуємо рутину: CRM, пошта, задачі, звіти, операції.',
      en: 'We connect your tools and automate repetitive work: CRM, email, tasks, reporting, and ops.',
    },
    seoTitle: {
      uk: 'Автоматизація процесів (CRM, email, ops) | AI Insider',
      en: 'Workflow Automation (CRM, Email, Ops) | AI Insider',
    },
    seoDescription: {
      uk: 'Проєктуємо та впроваджуємо автоматизації: тригери, інтеграції, контроль помилок і моніторинг. Для Швейцарії (CH), Європи та США.',
      en: 'We design and ship automations: triggers, integrations, error handling, and monitoring. Switzerland (CH), Europe, and the US.',
    },
    keywords: {
      en: [
        'workflow automation',
        'business process automation',
        'CRM automation',
        'AI automation',
        'automation agency Switzerland',
      ],
      uk: [
        'автоматизація процесів',
        'автоматизація бізнес‑процесів',
        'автоматизація CRM',
        'AI автоматизація',
        'автоматизація Швейцарія',
      ],
    },
    timeline: { uk: '1–4 тижні до перших результатів', en: '1–4 weeks to first results' },
    outcomes: [
      { uk: 'Менше ручної рутини та помилок у даних', en: 'Less manual work and fewer data errors' },
      { uk: 'Швидші процеси між командами (sales → ops → support)', en: 'Faster cross-team workflows (sales → ops → support)' },
      { uk: 'Прозорість: логування, алерти, звіти', en: 'Visibility: logs, alerts, and reporting' },
    ],
    features: [
      {
        icon: '⚙️',
        title: { uk: 'Інтеграції', en: 'Integrations' },
        description: {
          uk: 'Зʼєднуємо CRM, пошту, месенджери, таблиці, білінг, підтримку та внутрішні системи.',
          en: 'Connect CRMs, email, messengers, spreadsheets, billing, support tools, and internal systems.',
        },
      },
      {
        icon: '🧯',
        title: { uk: 'Обробка помилок', en: 'Error Handling' },
        description: {
          uk: 'Retry‑логіка, дед‑леттери, ручне підтвердження для критичних кроків, алерти.',
          en: 'Retries, dead-letter handling, human approvals for critical steps, and alerts.',
        },
      },
      {
        icon: '📊',
        title: { uk: 'Моніторинг', en: 'Monitoring' },
        description: {
          uk: 'Метрики, логування, дашборди, щоб автоматизації працювали стабільно.',
          en: 'Metrics, logging, and dashboards so automations stay reliable.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Sales → CRM', en: 'Sales → CRM' },
        description: { uk: 'Авто‑створення угод, задач, нотаток, нагадувань, SLA.', en: 'Auto-create deals, tasks, notes, reminders, and SLAs.' },
      },
      {
        title: { uk: 'Операції', en: 'Operations' },
        description: { uk: 'Синхронізація даних між системами, генерація документів, оновлення статусів.', en: 'Sync data, generate documents, and keep statuses consistent.' },
      },
      {
        title: { uk: 'Підтримка', en: 'Support' },
        description: { uk: 'Тікети, ескалації, автоматичні відповіді, звіти по SLA.', en: 'Tickets, escalations, auto-responses, and SLA reporting.' },
      },
    ],
    implementation: [
      {
        title: { uk: 'Мапа процесів', en: 'Process Map' },
        description: { uk: 'Фіксуємо кроки, дані, інтеграції, ризики та “де потрібна людина”.', en: 'Map steps, data, integrations, risks, and where human approvals are needed.' },
        duration: { uk: '2–5 днів', en: '2–5 days' },
      },
      {
        title: { uk: 'Розробка + тестування', en: 'Build + Test' },
        description: { uk: 'Впроваджуємо тригери, інтеграції, retry‑логіку, логування, QA.', en: 'Implement triggers, integrations, retries, logging, and QA.' },
        duration: { uk: '1–3 тижні', en: '1–3 weeks' },
      },
      {
        title: { uk: 'Запуск + контроль', en: 'Launch + Control' },
        description: { uk: 'Моніторинг, алерти, документація, підтримка та розвиток.', en: 'Monitoring, alerts, documentation, support, and iteration.' },
        duration: { uk: 'постійно', en: 'ongoing' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи можна автоматизувати без зміни наших інструментів?', en: 'Can you automate without changing our tools?' },
        answer: {
          uk: 'Так. Ми інтегруємося з тим, що вже є, і додаємо мінімум змін у процес.',
          en: 'Yes. We integrate with your existing stack and keep process changes minimal.',
        },
      },
      {
        question: { uk: 'Що якщо автоматизація “впаде”?', en: 'What if an automation fails?' },
        answer: {
          uk: 'Ми закладаємо retry‑логіку, алерти та ручний контроль для критичних кроків.',
          en: 'We build retries, alerts, and human-in-the-loop controls for critical steps.',
        },
      },
    ],
    relatedArticleSlugs: ['crm-automation-without-data-drift', 'ai-invoice-processing-for-finance-teams', 'ai-competitor-monitoring-for-product-teams'],
    relatedCaseSlugs: ['crm-automation', 'facebook-outreach-automation'],
  },
  {
    slug: 'analytics-assistants',
    category: 'analytics',
    title: { uk: 'AI аналітичні асистенти', en: 'Analytics Assistants' },
    subtitle: {
      uk: 'Звіти, інсайти та відповіді на питання по даним — без ручного Excel і без “вічних” дашбордів.',
      en: 'Reports, insights, and answers about your data — without manual spreadsheets or endless dashboards.',
    },
    seoTitle: {
      uk: 'AI аналітичний асистент (звітність + інсайти) | AI Insider',
      en: 'AI Analytics Assistant (Reports + Insights) | AI Insider',
    },
    seoDescription: {
      uk: 'Будуємо AI‑асистентів для аналітики: підключення до джерел даних, щотижневі звіти, інсайти, алерти та пояснення метрик. Швейцарія (CH), ЄС, США.',
      en: 'We build AI analytics assistants: connect data sources, weekly reports, insights, alerts, and metric explanations. Switzerland (CH), EU, US.',
    },
    keywords: {
      en: ['AI analytics assistant', 'AI reporting', 'business intelligence assistant', 'AI insights', 'analytics automation'],
      uk: ['AI аналітичний асистент', 'AI звітність', 'асистент бізнес‑аналітики', 'AI інсайти', 'автоматизація аналітики'],
    },
    timeline: { uk: '2–6 тижнів до запуску', en: '2–6 weeks to launch' },
    outcomes: [
      { uk: 'Регулярні звіти без ручної роботи', en: 'Regular reporting without manual work' },
      { uk: 'Швидкі відповіді на питання по метриках', en: 'Fast answers to KPI questions' },
      { uk: 'Ранні сигнали проблем (алерти)', en: 'Early warning signals (alerts)' },
    ],
    features: [
      {
        icon: '📬',
        title: { uk: 'Щотижневі/щоденні звіти', en: 'Weekly/Daily Reports' },
        description: { uk: 'Автоматично формуємо звіти з інсайтами і наступними діями.', en: 'Auto-generate reports with insights and next actions.' },
      },
      {
        icon: '🔍',
        title: { uk: 'Q&A по даним', en: 'Data Q&A' },
        description: { uk: 'Ставите питання простими словами — отримуєте відповідь з поясненням.', en: 'Ask in plain language — get answers with explanations.' },
      },
      {
        icon: '🚨',
        title: { uk: 'Алерти', en: 'Alerts' },
        description: { uk: 'Сповіщення при аномаліях (конверсія, CAC, LTV, churn тощо).', en: 'Alerts on anomalies (conversion, CAC, LTV, churn, etc.).' },
      },
    ],
    useCases: [
      { title: { uk: 'Маркетинг', en: 'Marketing' }, description: { uk: 'ROAS, CPL, конверсії, креативи, канали.', en: 'ROAS, CPL, conversions, creatives, channels.' } },
      { title: { uk: 'Продажі', en: 'Sales' }, description: { uk: 'Пайплайн, win‑rate, SLA, прогноз.', en: 'Pipeline, win-rate, SLA, forecasting.' } },
      { title: { uk: 'Операції', en: 'Operations' }, description: { uk: 'Виконання, черги, якість, витрати часу.', en: 'Throughput, queues, quality, time costs.' } },
    ],
    implementation: [
      { title: { uk: 'Джерела даних', en: 'Data Sources' }, description: { uk: 'Підключаємо CRM/аналітику/БД, узгоджуємо метрики.', en: 'Connect CRM/analytics/DBs and align definitions.' }, duration: { uk: '3–7 днів', en: '3–7 days' } },
      { title: { uk: 'Логіка звітів', en: 'Reporting Logic' }, description: { uk: 'Шаблони звітів, інсайти, правила алертів.', en: 'Report templates, insights, and alert rules.' }, duration: { uk: '1–3 тижні', en: '1–3 weeks' } },
      { title: { uk: 'Запуск + калібрування', en: 'Launch + Calibration' }, description: { uk: 'Перевірка точності, “ground truth”, оптимізація форматів.', en: 'Validate accuracy, ground truth, and optimize formats.' }, duration: { uk: '1–2 тижні', en: '1–2 weeks' } },
    ],
    faq: [
      { question: { uk: 'Чи це замінює BI дашборди?', en: 'Does it replace BI dashboards?' }, answer: { uk: 'Не завжди. Часто ми доповнюємо BI: звітність + Q&A + алерти поверх ваших даних.', en: 'Not always. Often it complements BI: reporting + Q&A + alerts on top of your data.' } },
      { question: { uk: 'Які джерела можна підключити?', en: 'Which data sources can you connect?' }, answer: { uk: 'CRM, Google Sheets, аналітика, SQL‑бази, внутрішні API — залежить від вашого стеку.', en: 'CRMs, Google Sheets, analytics tools, SQL databases, internal APIs — depends on your stack.' } },
    ],
    relatedArticleSlugs: ['ai-customer-feedback-analysis-system', 'ai-search-assistant-for-company-knowledge', 'ai-meeting-scheduler-that-handles-timezone-chaos'],
  },
  {
    slug: 'custom-ai-models',
    category: 'models',
    title: { uk: 'Кастомні AI‑моделі', en: 'Custom AI Models' },
    subtitle: {
      uk: 'RAG, агентні системи, кастомна логіка та інтеграції — коли потрібен “свій” AI під ваш бізнес.',
      en: 'RAG, agentic systems, custom logic, and integrations — when you need AI tailored to your business.',
    },
    seoTitle: {
      uk: 'Кастомні AI‑моделі та RAG‑системи | AI Insider',
      en: 'Custom AI Models & RAG Systems | AI Insider',
    },
    seoDescription: {
      uk: 'Розробляємо кастомні AI‑рішення: RAG‑асистенти, агентні системи, інтеграції, оцінка якості та моніторинг. Швейцарія (CH), ЄС, США.',
      en: 'We build custom AI: RAG assistants, agentic systems, integrations, evaluation, and monitoring. Switzerland (CH), EU, US.',
    },
    keywords: {
      en: ['custom AI models', 'RAG system', 'agentic AI', 'custom GPT assistant', 'AI automation'],
      uk: ['кастомні AI‑моделі', 'RAG система', 'агентні AI системи', 'кастомний GPT асистент', 'AI автоматизація'],
    },
    timeline: { uk: '2–8 тижнів залежно від складності', en: '2–8 weeks depending on scope' },
    outcomes: [
      { uk: 'AI‑функції, які реально працюють з вашими даними', en: 'AI features grounded in your real data' },
      { uk: 'Інтеграції з процесами та інструментами (end‑to‑end)', en: 'End-to-end integrations with your workflows and tools' },
      { uk: 'Контроль якості та безпечні сценарії', en: 'Quality control and safer behavior' },
    ],
    features: [
      { icon: '📚', title: { uk: 'RAG + джерела', en: 'RAG + Sources' }, description: { uk: 'Підключення документів, продуктів, політик, баз знань — з цитуванням.', en: 'Connect docs, products, policies, and knowledge bases with citations.' } },
      { icon: '🤖', title: { uk: 'AI‑агенти', en: 'AI Agents' }, description: { uk: 'Агенти, які виконують задачі: створюють заявки, оновлюють CRM, запускають процеси.', en: 'Agents that take actions: create tickets, update CRM, trigger workflows.' } },
      { icon: '🧪', title: { uk: 'Оцінка якості', en: 'Evaluation' }, description: { uk: 'Тести, метрики, ручні перевірки — щоб бачити прогрес і стабільність.', en: 'Tests, metrics, and reviews — so quality improves and stays stable.' } },
    ],
    useCases: [
      { title: { uk: 'База знань для команди', en: 'Internal Knowledge Base' }, description: { uk: 'Пошук + відповіді по документах з джерелами.', en: 'Search + answers across docs with citations.' } },
      { title: { uk: 'Агенти для операцій', en: 'Ops Agents' }, description: { uk: 'Автоматизація задач і “людина‑в‑контурі” для критичних кроків.', en: 'Automation with human-in-the-loop approvals for critical steps.' } },
      { title: { uk: 'Кастомна логіка продукту', en: 'Product AI' }, description: { uk: 'AI‑функції в продукті: рекомендації, допомога, персоналізація.', en: 'AI in-product: recommendations, assistance, personalization.' } },
    ],
    implementation: [
      { title: { uk: 'Вимоги + ризики', en: 'Requirements + Risks' }, description: { uk: 'Цілі, дані, інтеграції, безпека, обмеження.', en: 'Goals, data, integrations, safety, constraints.' }, duration: { uk: '3–7 днів', en: '3–7 days' } },
      { title: { uk: 'Розробка', en: 'Build' }, description: { uk: 'RAG/агенти/інтеграції, прототип, тестування.', en: 'RAG/agents/integrations, prototype, testing.' }, duration: { uk: '2–6 тижнів', en: '2–6 weeks' } },
      { title: { uk: 'Запуск + моніторинг', en: 'Launch + Monitor' }, description: { uk: 'Логи, метрики, алерти, оптимізація.', en: 'Logs, metrics, alerts, and iteration.' }, duration: { uk: 'постійно', en: 'ongoing' } },
    ],
    faq: [
      { question: { uk: 'Чим RAG відрізняється від “просто GPT”?', en: 'How is RAG different from “just GPT”?' }, answer: { uk: 'RAG підтягує релевантні джерела з вашої бази знань для кожної відповіді, тому контент більш точний і контрольований.', en: 'RAG retrieves relevant sources from your knowledge base per answer, making outputs more grounded and controllable.' } },
      { question: { uk: 'Чи можна обмежити доступ до даних?', en: 'Can you restrict data access?' }, answer: { uk: 'Так. Робимо ролі, правила доступу та логування запитів.', en: 'Yes. We add roles, access rules, and request logging.' } },
    ],
    relatedArticleSlugs: ['building-ai-agents-that-take-actions', 'multimodal-ai-agents-for-customer-experience', 'rag-chatbot-for-b2b-what-works'],
  },
  {
    slug: 'ai-influencers',
    category: 'content',
    title: { uk: 'AI-інфлюенсери', en: 'AI Influencers' },
    subtitle: {
      uk: 'Віртуальні персонажі для вашого бренду: ведуть соцмережі, створюють контент, спілкуються з аудиторією — без реальних людей.',
      en: 'Virtual personas for your brand: run social media, create content, engage audiences — no real people needed.',
    },
    seoTitle: {
      uk: 'AI-інфлюенсери для бізнесу | Віртуальні аватари | AI Insider',
      en: 'AI Influencers for Business | Virtual Avatars | AI Insider',
    },
    seoDescription: {
      uk: 'Створюємо AI-інфлюенсерів та віртуальних аватарів для брендів: контент 24/7, унікальний персонаж, масштабування без обмежень. Швейцарія (CH), Європа, США.',
      en: 'We create AI influencers and virtual avatars for brands: 24/7 content, unique persona, unlimited scalability. Switzerland (CH), Europe, US.',
    },
    keywords: {
      en: [
        'AI influencer',
        'virtual influencer',
        'AI avatar',
        'digital influencer',
        'synthetic influencer',
        'AI content creator',
        'virtual brand ambassador',
      ],
      uk: [
        'AI інфлюенсер',
        'віртуальний інфлюенсер',
        'AI аватар',
        'цифровий інфлюенсер',
        'синтетичний інфлюенсер',
        'AI контент-креатор',
        'віртуальний амбасадор бренду',
      ],
    },
    timeline: { uk: '3–6 тижнів до запуску', en: '3–6 weeks to launch' },
    outcomes: [
      { uk: 'Контент 24/7 без залежності від реальних людей', en: 'Content 24/7 without relying on real people' },
      { uk: 'Повний контроль над персонажем та меседжами', en: 'Full control over persona and messaging' },
      { uk: 'Масштабування на нові ринки та мови без додаткових витрат', en: 'Scale to new markets and languages without extra costs' },
    ],
    features: [
      {
        icon: '🎭',
        title: { uk: 'Унікальний персонаж', en: 'Unique Persona' },
        description: {
          uk: 'Створюємо віртуального персонажа з власним стилем, голосом та характером під ваш бренд.',
          en: 'Create a virtual character with unique style, voice, and personality tailored to your brand.',
        },
      },
      {
        icon: '📱',
        title: { uk: 'Контент для соцмереж', en: 'Social Media Content' },
        description: {
          uk: 'Генеруємо пости, stories, reels, відео — у форматах Instagram, TikTok, YouTube Shorts.',
          en: 'Generate posts, stories, reels, videos — for Instagram, TikTok, YouTube Shorts.',
        },
      },
      {
        icon: '💬',
        title: { uk: 'Взаємодія з аудиторією', en: 'Audience Engagement' },
        description: {
          uk: 'AI відповідає на коментарі та DM, підтримує комʼюніті та збирає фідбек.',
          en: 'AI responds to comments and DMs, nurtures community, and collects feedback.',
        },
      },
      {
        icon: '🌍',
        title: { uk: 'Мультимовність', en: 'Multilingual' },
        description: {
          uk: 'Один персонаж — багато мов. Легко адаптуємо під різні ринки.',
          en: 'One persona — many languages. Easy adaptation for different markets.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Бренд-амбасадор', en: 'Brand Ambassador' },
        description: {
          uk: 'Віртуальне "обличчя" бренду для соцмереж, івентів та рекламних кампаній.',
          en: 'Virtual brand face for social media, events, and ad campaigns.',
        },
      },
      {
        title: { uk: 'Продуктовий контент', en: 'Product Content' },
        description: {
          uk: 'Огляди, розпаковки, tutorials з AI-персонажем замість реальних інфлюенсерів.',
          en: 'Reviews, unboxings, tutorials featuring AI persona instead of real influencers.',
        },
      },
      {
        title: { uk: 'Локалізація', en: 'Localization' },
        description: {
          uk: 'Один AI-інфлюенсер для різних країн та мов без додаткових контрактів.',
          en: 'One AI influencer for multiple countries and languages without extra contracts.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Концепт персонажа', en: 'Persona Concept' },
        description: {
          uk: 'Визначаємо зовнішність, характер, tone of voice, платформи та цільову аудиторію.',
          en: 'Define appearance, personality, tone of voice, platforms, and target audience.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Створення аватара', en: 'Avatar Creation' },
        description: {
          uk: 'Генеруємо візуал, голос, базові анімації та контент-шаблони.',
          en: 'Generate visuals, voice, base animations, and content templates.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Контент-пайплайн', en: 'Content Pipeline' },
        description: {
          uk: 'Налаштовуємо процес генерації та публікації контенту з контролем якості.',
          en: 'Set up content generation and publishing workflow with quality control.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи буде персонаж унікальним?', en: 'Will the persona be unique?' },
        answer: {
          uk: 'Так. Ми створюємо кастомного персонажа спеціально для вашого бренду — зовнішність, голос, стиль.',
          en: 'Yes. We create a custom character specifically for your brand — appearance, voice, style.',
        },
      },
      {
        question: { uk: 'Чи можна використовувати на різних платформах?', en: 'Can it be used across platforms?' },
        answer: {
          uk: 'Так — Instagram, TikTok, YouTube, LinkedIn, Twitter та інші.',
          en: 'Yes — Instagram, TikTok, YouTube, LinkedIn, Twitter, and more.',
        },
      },
      {
        question: { uk: 'Як щодо авторських прав?', en: 'What about rights?' },
        answer: {
          uk: 'Ви отримуєте повні права на персонажа та весь згенерований контент.',
          en: 'You get full rights to the persona and all generated content.',
        },
      },
    ],
    relatedArticleSlugs: ['ai-virtual-influencer-complete-business-guide', 'ai-influencers-for-brands-complete-guide', 'virtual-influencers-vs-real-influencers'],
    relatedCaseSlugs: [],
  },
  {
    slug: 'ai-video-production',
    category: 'content',
    title: { uk: 'AI-відеопродакшн', en: 'AI Video Production' },
    subtitle: {
      uk: 'Створення відео з AI-аватарами, автоматичний repurposing, дубляж на інші мови — без камер і знімальних команд.',
      en: 'Create videos with AI avatars, auto-repurpose content, dub to other languages — no cameras or crews needed.',
    },
    seoTitle: {
      uk: 'AI-відеопродакшн | Відео з AI-аватарами | AI Insider',
      en: 'AI Video Production | Videos with AI Avatars | AI Insider',
    },
    seoDescription: {
      uk: 'Генеруємо маркетингові відео з AI-аватарами: скрипт → готове відео за години. Дубляж, repurposing, UGC-стиль. Швейцарія (CH), Європа, США.',
      en: 'Generate marketing videos with AI avatars: script → video in hours. Dubbing, repurposing, UGC-style. Switzerland (CH), Europe, US.',
    },
    keywords: {
      en: [
        'AI video production',
        'AI video generator',
        'AI avatar video',
        'synthetic video',
        'AI video marketing',
        'HeyGen',
        'Synthesia alternative',
        'AI dubbing',
      ],
      uk: [
        'AI відеопродакшн',
        'AI генератор відео',
        'відео з AI-аватаром',
        'синтетичне відео',
        'AI відеомаркетинг',
        'HeyGen',
        'Synthesia альтернатива',
        'AI дубляж',
      ],
    },
    timeline: { uk: '1–3 тижні до перших відео', en: '1–3 weeks to first videos' },
    outcomes: [
      { uk: 'Відео за години замість тижнів зйомок', en: 'Videos in hours instead of weeks of shooting' },
      { uk: 'Масштабування контенту: 10+ відео на тиждень без додаткових витрат', en: 'Scale content: 10+ videos per week without extra costs' },
      { uk: 'Мультимовний контент з одного скрипта', en: 'Multilingual content from a single script' },
    ],
    features: [
      {
        icon: '🎬',
        title: { uk: 'AI-аватари', en: 'AI Avatars' },
        description: {
          uk: 'Кастомні або готові аватари, які "говорять" ваш текст з реалістичною мімікою.',
          en: 'Custom or stock avatars that "speak" your text with realistic lip-sync.',
        },
      },
      {
        icon: '🔄',
        title: { uk: 'Repurposing', en: 'Repurposing' },
        description: {
          uk: 'Перетворюємо блоги, подкасти, вебінари у короткі відео для соцмереж.',
          en: 'Turn blogs, podcasts, webinars into short-form social videos.',
        },
      },
      {
        icon: '🌐',
        title: { uk: 'Мультимовний дубляж', en: 'Multilingual Dubbing' },
        description: {
          uk: 'Один відеоролик — 10+ мов. AI-дубляж з синхронізацією губ.',
          en: 'One video — 10+ languages. AI dubbing with lip-sync.',
        },
      },
      {
        icon: '📊',
        title: { uk: 'A/B тестування', en: 'A/B Testing' },
        description: {
          uk: 'Швидко генеруємо варіації для тестування hooks, CTA, візуалів.',
          en: 'Quickly generate variations to test hooks, CTAs, and visuals.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Рекламні відео', en: 'Ad Creatives' },
        description: {
          uk: 'UGC-style реклама, VSL, product demos — без зйомок та акторів.',
          en: 'UGC-style ads, VSLs, product demos — no shoots or actors.',
        },
      },
      {
        title: { uk: 'Навчальний контент', en: 'Educational Content' },
        description: {
          uk: 'Онбординг, tutorials, курси — швидко та масштабовано.',
          en: 'Onboarding, tutorials, courses — fast and scalable.',
        },
      },
      {
        title: { uk: 'Соцмережі', en: 'Social Media' },
        description: {
          uk: 'TikTok, Reels, Shorts — регулярний відеоконтент без команди.',
          en: 'TikTok, Reels, Shorts — regular video content without a team.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Формат і стиль', en: 'Format & Style' },
        description: {
          uk: 'Визначаємо формати, тривалість, тон, аватари та платформи.',
          en: 'Define formats, length, tone, avatars, and platforms.',
        },
        duration: { uk: '3–5 днів', en: '3–5 days' },
      },
      {
        title: { uk: 'Пайплайн генерації', en: 'Generation Pipeline' },
        description: {
          uk: 'Налаштовуємо процес: скрипт → генерація → ревью → публікація.',
          en: 'Set up workflow: script → generation → review → publish.',
        },
        duration: { uk: '1–2 тижні', en: '1–2 weeks' },
      },
      {
        title: { uk: 'Масштабування', en: 'Scaling' },
        description: {
          uk: 'Шаблони, автоматизація, A/B тести, аналітика ефективності.',
          en: 'Templates, automation, A/B tests, and performance analytics.',
        },
        duration: { uk: 'постійно', en: 'ongoing' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи виглядає це "штучно"?', en: 'Does it look "artificial"?' },
        answer: {
          uk: 'Сучасні AI-аватари дуже реалістичні. Ми підбираємо стиль під вашу аудиторію і тестуємо до запуску.',
          en: 'Modern AI avatars are very realistic. We match the style to your audience and test before launch.',
        },
      },
      {
        question: { uk: 'Які технології використовуєте?', en: 'What tech do you use?' },
        answer: {
          uk: 'HeyGen, Synthesia, D-ID, Runway, ElevenLabs та інші — підбираємо під задачу.',
          en: 'HeyGen, Synthesia, D-ID, Runway, ElevenLabs, and more — we pick based on your needs.',
        },
      },
      {
        question: { uk: 'Чи можна використовувати свій голос?', en: 'Can I use my own voice?' },
        answer: {
          uk: 'Так — клонуємо ваш голос для AI-аватара або створюємо унікальний синтетичний голос.',
          en: 'Yes — we can clone your voice for the AI avatar or create a unique synthetic voice.',
        },
      },
    ],
    relatedArticleSlugs: ['ai-video-production-for-marketing', 'ai-video-sales-letter-production-system', 'ai-content-repurposing-system-for-marketing'],
    relatedCaseSlugs: [],
  },
  {
    slug: 'ai-ugc-content',
    category: 'content',
    title: { uk: 'AI UGC-контент', en: 'AI UGC Content' },
    subtitle: {
      uk: 'Масова генерація UGC-відео з AI-аватарами для реклами — без інфлюенсерів, зйомок та контрактів.',
      en: 'Mass-generate UGC videos with AI avatars for ads — no influencers, shoots, or contracts.',
    },
    seoTitle: {
      uk: 'AI UGC-контент для реклами | AI Insider',
      en: 'AI UGC Content for Advertising | AI Insider',
    },
    seoDescription: {
      uk: 'Генеруємо UGC-відео з AI-аватарами для Meta, TikTok, YouTube Ads. Швидко, дешево, масштабовано. Швейцарія (CH), Європа, США.',
      en: 'Generate UGC videos with AI avatars for Meta, TikTok, YouTube Ads. Fast, affordable, scalable. Switzerland (CH), Europe, US.',
    },
    keywords: {
      en: [
        'AI UGC',
        'AI user generated content',
        'UGC ads AI',
        'synthetic UGC',
        'AI ad creatives',
        'UGC video generator',
        'AI testimonial videos',
      ],
      uk: [
        'AI UGC',
        'AI користувацький контент',
        'UGC реклама AI',
        'синтетичний UGC',
        'AI рекламні креативи',
        'генератор UGC відео',
        'AI відгуки відео',
      ],
    },
    timeline: { uk: '1–2 тижні до перших креативів', en: '1–2 weeks to first creatives' },
    outcomes: [
      { uk: '10–50 унікальних креативів на тиждень', en: '10–50 unique creatives per week' },
      { uk: 'Вартість у 5–10 разів нижча за традиційний UGC', en: 'Cost 5–10x lower than traditional UGC' },
      { uk: 'Повний контроль над меседжами та швидкі ітерації', en: 'Full control over messaging and fast iterations' },
    ],
    features: [
      {
        icon: '👥',
        title: { uk: 'Різноманітність аватарів', en: 'Avatar Diversity' },
        description: {
          uk: 'Сотні різних "людей" — вік, стать, етнічність, стиль — під вашу аудиторію.',
          en: 'Hundreds of different "people" — age, gender, ethnicity, style — tailored to your audience.',
        },
      },
      {
        icon: '📝',
        title: { uk: 'Скрипти під конверсії', en: 'Conversion Scripts' },
        description: {
          uk: 'Пишемо UGC-скрипти з hooks, pain points, testimonials та CTA.',
          en: 'Write UGC scripts with hooks, pain points, testimonials, and CTAs.',
        },
      },
      {
        icon: '⚡',
        title: { uk: 'Швидка генерація', en: 'Fast Generation' },
        description: {
          uk: 'Від скрипта до готового відео — години замість тижнів.',
          en: 'From script to finished video — hours instead of weeks.',
        },
      },
      {
        icon: '🧪',
        title: { uk: 'A/B тестування', en: 'A/B Testing' },
        description: {
          uk: 'Генеруємо 10+ варіацій для швидкого тестування в рекламних кабінетах.',
          en: 'Generate 10+ variations for rapid testing in ad managers.',
        },
      },
    ],
    useCases: [
      {
        title: { uk: 'Meta/TikTok Ads', en: 'Meta/TikTok Ads' },
        description: {
          uk: 'UGC-креативи для performance-кампаній з A/B тестуванням hooks і CTA.',
          en: 'UGC creatives for performance campaigns with A/B testing of hooks and CTAs.',
        },
      },
      {
        title: { uk: 'Testimonials', en: 'Testimonials' },
        description: {
          uk: 'Відео-відгуки з AI-аватарами — швидко та без координації з клієнтами.',
          en: 'Video testimonials with AI avatars — fast and no client coordination.',
        },
      },
      {
        title: { uk: 'Локалізація', en: 'Localization' },
        description: {
          uk: 'Один скрипт — креативи для різних ринків і мов.',
          en: 'One script — creatives for different markets and languages.',
        },
      },
    ],
    implementation: [
      {
        title: { uk: 'Стратегія креативів', en: 'Creative Strategy' },
        description: {
          uk: 'Аналізуємо аудиторію, конкурентів, формати — готуємо план тестування.',
          en: 'Analyze audience, competitors, formats — prepare testing plan.',
        },
        duration: { uk: '3–5 днів', en: '3–5 days' },
      },
      {
        title: { uk: 'Генерація креативів', en: 'Creative Generation' },
        description: {
          uk: 'Скрипти → аватари → відео → ревью → експорт для рекламних платформ.',
          en: 'Scripts → avatars → videos → review → export for ad platforms.',
        },
        duration: { uk: '1 тиждень', en: '1 week' },
      },
      {
        title: { uk: 'Оптимізація', en: 'Optimization' },
        description: {
          uk: 'Аналіз результатів, нові варіації, масштабування виграшних креативів.',
          en: 'Analyze results, new variations, scale winning creatives.',
        },
        duration: { uk: 'постійно', en: 'ongoing' },
      },
    ],
    faq: [
      {
        question: { uk: 'Чи це легально?', en: 'Is this legal?' },
        answer: {
          uk: 'Так. AI UGC — це маркетинговий контент, а не підробка реальних людей. Ми дотримуємось рекламних політик платформ.',
          en: 'Yes. AI UGC is marketing content, not deepfakes of real people. We comply with platform ad policies.',
        },
      },
      {
        question: { uk: 'Чи працює це на Meta/TikTok?', en: 'Does it work on Meta/TikTok?' },
        answer: {
          uk: 'Так — AI UGC успішно використовується для performance-реклами на всіх основних платформах.',
          en: 'Yes — AI UGC is successfully used for performance ads on all major platforms.',
        },
      },
      {
        question: { uk: 'Як швидко можна отримати перші креативи?', en: 'How fast can I get first creatives?' },
        answer: {
          uk: 'Перші креативи — за 5–7 днів після старту проєкту.',
          en: 'First creatives — within 5–7 days after project start.',
        },
      },
    ],
    relatedArticleSlugs: ['ai-ugc-ads-complete-guide', 'ai-ugc-avatars-for-performance-ads', 'ai-model-for-fashion-ecommerce'],
    relatedCaseSlugs: [],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export const serviceSlugs = servicesData.map((s) => s.slug);

