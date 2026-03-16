import type { Language } from './translations';

type Localized<T> = { en: T; uk: T };

export type SeoServiceSlug =
  | 'ai-automation-for-business'
  | 'ai-chatbots-for-business'
  | 'ai-voice-agents'
  | 'custom-ai-agents'
  | 'ai-content-creation'
  | 'ai-receptionist'
  | 'ai-sdr'
  | 'ai-proposal-generator';

export type SeoFaq = { q: string; a: string };

export interface SeoServicePage {
  slug: SeoServiceSlug;
  /** Main keyword (must appear in URL, title, H1, first 100 words). */
  keyword: string;
  heroTitle?: Localized<string>;
  titleTag: Localized<string>;
  metaDescription: Localized<string>;
  heroStats?: Localized<string[]>;
  intro: Localized<string[]>;
  whatIs: Localized<{
    paragraphs: string[];
    bullets: string[];
    outro?: string;
  }>;
  howWorks: Localized<string[]>;
  benefits: Localized<{
    efficiency: string;
    costReduction: string;
    automation: string;
    scalability: string;
  }>;
  useCases: Localized<{
    sales: string[];
    customerSupport: string[];
    crm: string[];
    operations: string[];
  }>;
  useCaseBlocks?: Localized<Array<{ title: string; items: string[] }>>;
  whyAiInsider: Localized<string[]>;
  faq: Localized<SeoFaq[]>;
  cta: Localized<{
    bookConsultation: string;
    getAudit: string;
  }>;
  relatedBlogSlugs: string[];
  relatedSolutionSlugs?: string[];
  siblingLandingSlugs?: SeoServiceSlug[];
  /** Optional keywords list for the Metadata `keywords` field. */
  metaKeywords?: Localized<string[]>;
}

export const SEO_SERVICE_PAGES: Record<SeoServiceSlug, SeoServicePage> = {
  'ai-automation-for-business': {
    slug: 'ai-automation-for-business',
    keyword: 'AI automation for business',
    titleTag: {
      en: 'AI automation for business | AI Insider',
      uk: 'AI automation for business — автоматизація | AI Insider',
    },
    metaDescription: {
      en: 'AI automation for business to cut costs, speed operations, and scale workflows. Book a free AI consultation.',
      uk: 'AI automation for business: швидші процеси, менше витрат і рутини. Замовте безкоштовну AI‑консультацію.',
    },
    intro: {
      en: [
        'AI automation for business helps B2B teams run repetitive work across sales, support, and operations using AI plus tool integrations.',
        'It’s for companies that want faster handoffs, fewer manual errors, and consistent execution in systems like CRM, email, and support.',
        'If your growth depends on people copying data between tools, this is the fastest way to scale without adding headcount.',
      ],
      uk: [
        'AI automation for business — це інтелектуальна автоматизація бізнес‑процесів, де AI допомагає приймати рішення, а інтеграції виконують дії у ваших системах.',
        'Це рішення для B2B‑компаній, які хочуть швидші передачі між командами, чисті дані в CRM і стабільне виконання процесів без “людського фактору”.',
        'Якщо частина продажів або операцій досі тримається на копіюванні даних між інструментами — автоматизація знімає вузькі місця.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI automation for business is a system that:'],
        bullets: [
          'understands incoming work (messages, forms, tickets, calls)',
          'makes decisions (classify, route, score, summarize, propose next steps)',
          'executes actions (create/update records, send follow-ups, assign tasks)',
        ],
        outro: 'It turns manual processes into reliable workflows with traceable outcomes.',
      },
      uk: {
        paragraphs: ['AI automation for business поєднує:'],
        bullets: [
          'автоматизації (тригери, правила, інтеграції)',
          'AI‑логіку (класифікація, маршрутизація, скоринг, підсумки)',
          'виконання дій (оновлення CRM, листи, задачі, повідомлення)',
        ],
        outro: 'Результат — процеси стають повторюваними, контрольованими й вимірюваними.',
      },
    },
    howWorks: {
      en: [
        'Map the workflow (inputs → decisions → actions → outputs)',
        'Connect data sources (CRM, inbox, forms, docs, databases)',
        'Add AI logic (intent detection, lead scoring, summarization, next-best action)',
        'Execute via integrations (CRM updates, emails, scheduling, ticket actions)',
        'Monitor and improve (logs, QA checks, alerts, weekly iteration)',
      ],
      uk: [
        'Описуємо процес (вхідні дані → рішення → дія → результат)',
        'Підключаємо джерела (CRM, форми, пошта, підтримка, документи)',
        'Додаємо AI‑рівень (інтент, пріоритет, наступний крок, резюме)',
        'Виконуємо дії через інтеграції (CRM, email, календар, тікети)',
        'Вмикаємо контроль (логи, перевірки якості, алерти, ітерації)',
      ],
    },
    benefits: {
      en: {
        efficiency: 'minutes of work become seconds',
        costReduction: 'fewer manual touches and less operational overhead',
        automation: 'consistent execution with guardrails and fallbacks',
        scalability: 'handle volume spikes without burning out the team',
      },
      uk: {
        efficiency: 'рутинні задачі виконуються за секунди',
        costReduction: 'менше ручної роботи та повторних помилок',
        automation: 'стабільні правила, fallback‑сценарії, контроль ризиків',
        scalability: 'більше обсягу без розширення команди',
      },
    },
    useCases: {
      en: {
        sales: [
          'auto-qualify inbound leads and route to the right owner',
          'draft personalized follow-ups from CRM + conversation context',
          'enrich and score leads before SDR outreach',
        ],
        customerSupport: [
          'triage tickets by intent, urgency, and topic',
          'generate first-response drafts grounded in your knowledge base',
          'escalate complex cases with clean summaries for human agents',
        ],
        crm: [
          'auto-create/update leads, deals, activities, and notes',
          'dedupe and normalize fields to reduce data drift',
          'sync lifecycle stages across tools',
        ],
        operations: [
          'automate onboarding steps, approvals, and internal requests',
          'generate documents, checklists, and task assignments',
          'track SLA and trigger alerts when something slips',
        ],
      },
      uk: {
        sales: [
          'автоматична кваліфікація та розподіл лідів',
          'чернетки follow‑up на основі CRM і контексту розмов',
          'збагачення та скоринг перед outbound',
        ],
        customerSupport: [
          'тріаж тікетів за темою/терміновістю/інтентом',
          'підготовка відповідей з бази знань',
          'ескалація складних кейсів із коротким підсумком',
        ],
        crm: [
          'авто‑створення/оновлення лідів, угод, активностей',
          'дедуплікація та нормалізація полів',
          'синхронізація статусів між інструментами',
        ],
        operations: [
          'онбординг, погодження, внутрішні запити без “ручних передач”',
          'генерація документів, чеклістів, задач',
          'контроль SLA та алерти, коли процес “зривається”',
        ],
      },
    },
    whyAiInsider: {
      en: [
        'Custom AI solutions built around your workflows (not generic templates)',
        'Business-focused automation with measurable KPIs and reporting',
        'Fast deployment: launch an MVP, then iterate using real data',
        'Integrations across CRM, email, calendar, support stack, and internal systems',
      ],
      uk: [
        'Кастомні AI‑рішення під ваші процеси, а не шаблони',
        'Автоматизація з фокусом на бізнес‑результат і KPI',
        'Швидкий запуск: MVP → дані → оптимізація',
        'Інтеграції з CRM, календарем, підтримкою та внутрішніми системами',
      ],
    },
    faq: {
      en: [
        {
          q: 'What’s the fastest AI automation for business workflow to launch?',
          a: 'Inbound lead routing + CRM updates + follow-up drafts is usually the quickest win.',
        },
        { q: 'Can you integrate with HubSpot, Salesforce, or a custom CRM?', a: 'Yes—via native connectors, APIs, and webhooks.' },
        { q: 'How do you keep automations reliable?', a: 'Retries, validation, logging, alerts, and human approval for high-risk actions.' },
        { q: 'Will the AI act autonomously?', a: 'Only inside defined guardrails. Sensitive steps can require approval.' },
        { q: 'What do you need to start?', a: 'A process map, tool list, and examples of real leads/tickets/calls.' },
      ],
      uk: [
        {
          q: 'З чого найкраще почати AI automation for business у B2B?',
          a: 'З inbound‑обробки лідів: маршрутизація + CRM + follow‑up.',
        },
        { q: 'Чи інтегрується це з HubSpot/Salesforce або кастомною CRM?', a: 'Так — через конектори, API та вебхуки.' },
        { q: 'Як забезпечується надійність автоматизацій?', a: 'Retry‑логіка, валідація даних, логи, алерти та ручне підтвердження для критичних кроків.' },
        { q: 'Чи може AI виконувати дії самостійно?', a: 'Лише в межах гардрейлів. Ризикові дії можна робити тільки після approval.' },
        { q: 'Що потрібно для старту?', a: 'Карта процесу, список інструментів і приклади реальних лідів/тікeтів/дзвінків.' },
      ],
    },
    cta: {
      en: {
        bookConsultation: 'Book a free AI consultation',
        getAudit: 'Get AI automation audit',
      },
      uk: {
        bookConsultation: 'Замовити безкоштовну AI‑консультацію',
        getAudit: 'Отримати аудит AI‑автоматизації',
      },
    },
    relatedBlogSlugs: ['building-ai-agents-that-take-actions', 'how-to-automate-lead-routing-with-ai'],
    metaKeywords: {
      en: [
        'AI automation for business',
        'business process automation',
        'workflow automation',
        'CRM automation',
        'B2B automation',
        'AI automation Switzerland',
      ],
      uk: [
        'AI automation for business',
        'автоматизація бізнес‑процесів',
        'workflow автоматизація',
        'автоматизація CRM',
        'B2B автоматизація',
        'AI автоматизація Швейцарія',
      ],
    },
  },

  'ai-chatbots-for-business': {
    slug: 'ai-chatbots-for-business',
    keyword: 'AI chatbots for business',
    titleTag: {
      en: 'AI chatbots for business | AI Insider',
      uk: 'AI chatbots for business — B2B чатботи | AI Insider',
    },
    metaDescription: {
      en: 'AI chatbots for business that answer fast, capture leads, and reduce support load. Book a free AI consultation.',
      uk: 'AI chatbots for business: підтримка 24/7, збір лідів і менше звернень у саппорт. Замовте безкоштовну AI‑консультацію.',
    },
    intro: {
      en: [
        'AI chatbots for business provide instant, consistent answers on your website and inside your support channels—while capturing and qualifying B2B leads.',
        'They’re for teams that need 24/7 coverage, faster response times, and fewer repetitive questions hitting humans.',
        'If your pipeline leaks leads after-hours or your support team is overloaded, this is a high-ROI place to start.',
      ],
      uk: [
        'AI chatbots for business допомагають B2B‑компаніям відповідати клієнтам миттєво, збирати ліди та знімати навантаження з підтримки.',
        'Це підходить, коли заявки приходять нерівномірно, частина клієнтів пише після робочого часу, а команда не встигає відповідати швидко й однаково якісно.',
        'Якщо ви втрачаєте ліди через “повільну першу відповідь” або тоне саппорт — чатбот дає швидкий результат.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI chatbots for business are conversational systems that:'],
        bullets: [
          'answer questions using a controlled knowledge base (FAQ, docs, policies)',
          'guide users through flows (qualification, booking, troubleshooting)',
          'collect structured lead data and push it into your CRM',
        ],
        outro: 'They combine conversational AI with business logic, analytics, and integrations.',
      },
      uk: {
        paragraphs: ['AI chatbots for business — це розмовні системи, які:'],
        bullets: [
          'відповідають на питання з контрольованої бази знань',
          'ведуть користувача по сценаріях (кваліфікація, бронювання, підтримка)',
          'збирають структуровані дані й передають їх у CRM',
        ],
        outro: 'Це не “просто чат”, а частина вашої вирви та процесів.',
      },
    },
    howWorks: {
      en: [
        'Define key intents (pricing, demo requests, objections, support topics)',
        'Connect knowledge sources (docs, FAQs, product data, policies)',
        'Design conversation flows (qualification, routing, handoff rules)',
        'Add lead capture (forms, required fields, intent scoring)',
        'Integrate tools (CRM, calendar, email, support desk)',
        'Launch with monitoring (feedback loop, QA, content updates)',
      ],
      uk: [
        'Визначаємо ключові запити (ціна, демо, інтеграції, підтримка)',
        'Підключаємо базу знань (FAQ, документи, політики, продукт)',
        'Будуємо флоу (кваліфікація, маршрутизація, handoff на менеджера)',
        'Додаємо capture (поля, скоринг наміру, правила)',
        'Інтегруємо CRM/календар/саппорт',
        'Запускаємо з моніторингом і регулярним оновленням контенту',
      ],
    },
    benefits: {
      en: {
        efficiency: 'instant answers and faster resolution',
        costReduction: 'fewer tickets and less time per conversation',
        automation: 'lead capture, qualification, routing, and handoff',
        scalability: 'handle peak traffic without longer wait times',
      },
      uk: {
        efficiency: 'швидші відповіді та менше “завислих” діалогів',
        costReduction: 'менше тікетів і менше часу на типові питання',
        automation: 'збір лідів, кваліфікація, маршрутизація, ескалація',
        scalability: 'витримує піки трафіку без росту черги',
      },
    },
    useCases: {
      en: {
        sales: [
          'qualify visitors and book meetings',
          'handle objections and route high-intent prospects',
          'enrich lead profiles before handoff to SDR/AE',
        ],
        customerSupport: [
          'answer FAQs and policy questions in seconds',
          'guide troubleshooting with step-by-step flows',
          'escalate complex issues with a clean summary',
        ],
        crm: [
          'create leads, notes, and tasks automatically',
          'tag lifecycle stage and route by territory/segment',
          'keep records consistent across channels',
        ],
        operations: [
          'internal FAQ bot for onboarding and SOPs',
          'automate internal requests (access, approvals, tickets)',
          'reduce interruptions for ops teams',
        ],
      },
      uk: {
        sales: [
          'кваліфікація та бронювання дзвінка',
          'відпрацювання типових заперечень',
          'передача “теплих” лідів у правильну команду/регіон',
        ],
        customerSupport: [
          'FAQ і політики за секунди',
          'покрокові інструкції з troubleshooting',
          'ескалація складних кейсів із коротким підсумком',
        ],
        crm: [
          'авто‑створення ліда, нотаток, задач',
          'теги, стадії та правила розподілу',
          'чисті та стандартизовані поля',
        ],
        operations: [
          'внутрішній чатбот для SOP/онбордингу',
          'автоматизація внутрішніх запитів',
          'менше відволікань у команд',
        ],
      },
    },
    whyAiInsider: {
      en: [
        'Custom AI solutions designed for your B2B funnel and support reality',
        'Business-focused automation that increases conversion and reduces load',
        'Fast deployment with measurable outcomes and iteration plan',
        'Integrations with CRM, calendar, email, and support tools',
      ],
      uk: [
        'Кастомні AI‑рішення під ваш продукт і B2B‑воронку',
        'Автоматизація з фокусом на конверсію та навантаження команди',
        'Швидкий запуск і план ітерацій після релізу',
        'Інтеграції з CRM, календарем, email та саппорт‑системами',
      ],
    },
    faq: {
      en: [
        { q: 'Do AI chatbots for business replace human support?', a: 'No—they remove repetitive work and hand off complex cases to humans.' },
        { q: 'Can the bot use our private knowledge base (RAG)?', a: 'Yes—answers can be grounded in your documents and policies.' },
        { q: 'How do you avoid wrong answers?', a: 'Guardrails, curated sources, fallback responses, and ongoing evaluation.' },
        { q: 'Can it qualify leads and book meetings?', a: 'Yes—qualification flows + calendar integration are standard.' },
        { q: 'Does it support bilingual UX?', a: 'Yes—language-specific flows and QA can be implemented per market.' },
      ],
      uk: [
        { q: 'Чи замінює чатбот менеджерів або саппорт?', a: 'Ні. Він забирає рутину й передає складне людям з контекстом.' },
        { q: 'Чи може бот відповідати з нашої бази знань (RAG)?', a: 'Так — відповіді можуть бути “прив’язані” до ваших документів.' },
        { q: 'Як зменшити ризик неправильних відповідей?', a: 'Гардрейли, контрольовані джерела, fallback‑сценарії та регулярні перевірки.' },
        { q: 'Чи можна налаштувати кваліфікацію B2B‑лідів?', a: 'Так — питання, правила, скоринг і маршрутизація робляться під ваш ICP.' },
        { q: 'Чи можна зробити двомовний UX?', a: 'Так — окремі флоу та QA для кожної мови.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a free AI consultation', getAudit: 'Get AI automation audit' },
      uk: { bookConsultation: 'Замовити безкоштовну AI‑консультацію', getAudit: 'Отримати аудит AI‑автоматизації' },
    },
    relatedBlogSlugs: ['rag-chatbot-for-b2b-what-works', 'ai-whatsapp-sales-bot-for-ecommerce'],
    metaKeywords: {
      en: ['AI chatbots for business', 'B2B chatbot', 'AI customer support chatbot', 'RAG chatbot', 'website chatbot', 'chatbot lead generation'],
      uk: ['AI chatbots for business', 'B2B чатбот', 'чатбот підтримки', 'RAG чатбот', 'чатбот для сайту', 'чатбот для лідогенерації'],
    },
  },

  'ai-voice-agents': {
    slug: 'ai-voice-agents',
    keyword: 'AI voice agents',
    titleTag: {
      en: 'AI voice agents | AI Insider',
      uk: 'AI voice agents — голосовий AI агент | AI Insider',
    },
    metaDescription: {
      en: 'AI voice agents to answer calls 24/7, qualify leads, and book meetings. Get AI automation audit.',
      uk: 'AI voice agents: дзвінки 24/7, кваліфікація та бронювання зустрічей. Отримайте аудит AI‑автоматизації.',
    },
    intro: {
      en: [
        'AI voice agents automate phone conversations for B2B teams—answering calls, qualifying leads, booking meetings, and routing to the right person.',
        'They’re for businesses where calls are revenue-critical and missed calls mean lost deals.',
        'If your team can’t cover peak hours, weekends, or multiple languages consistently, voice automation closes the gap.',
      ],
      uk: [
        'AI voice agents автоматизують телефонні розмови: відповідають на дзвінки, кваліфікують звернення, бронюють зустрічі та передають людині, коли це потрібно.',
        'Це рішення для B2B‑бізнесів, де дзвінки — критичний канал продажів або підтримки, а пропущений дзвінок = втрачений дохід.',
        'Якщо команда не встигає покривати піки, вечори або кілька мов — голосовий агент закриває ці прогалини.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI voice agents are AI-powered phone agents that:'],
        bullets: [
          'understand speech in real time and respond naturally',
          'follow business rules (qualification, routing, compliance steps)',
          'take actions (schedule meetings, update CRM, send confirmations)',
        ],
        outro: 'They work like an intelligent layer on top of your telephony and systems.',
      },
      uk: {
        paragraphs: ['AI voice agents — це AI‑телефонні агенти, які:'],
        bullets: [
          'розуміють мовлення в реальному часі',
          'ведуть діалог за правилами вашого бізнесу',
          'виконують дії (календар, CRM, повідомлення, маршрутизація)',
        ],
        outro: 'Вони працюють як “розумний шар” поверх телефонії та ваших систем.',
      },
    },
    howWorks: {
      en: [
        'Define call intents (inquiries, qualification, booking, support, follow-ups)',
        'Build conversation flows (questions, branching logic, escalation rules)',
        'Connect telephony and routing (numbers, call transfer, voicemail handling)',
        'Integrate calendar + CRM (booking, notes, tasks, outcomes)',
        'Add safeguards (fallback, handoff to human, logging, QA)',
        'Launch and optimize (scripts, prompts, analytics, iteration)',
      ],
      uk: [
        'Описуємо типи дзвінків (запит, кваліфікація, запис, підтримка)',
        'Будуємо сценарії (питання, гілки, правила ескалації)',
        'Підключаємо телефонію та маршрутизацію (переведення, черги)',
        'Інтегруємо календар і CRM (бронювання, нотатки, задачі)',
        'Додаємо контроль якості (fallback, handoff, логування, QA)',
        'Запускаємо та оптимізуємо за реальними даними',
      ],
    },
    benefits: {
      en: {
        efficiency: 'reduce manual call handling and admin work',
        costReduction: 'fewer agents needed for repetitive calls',
        automation: 'qualification, scheduling, summaries, and follow-ups',
        scalability: 'handle spikes in call volume without downtime',
      },
      uk: {
        efficiency: 'менше ручної обробки дзвінків і адмін‑роботи',
        costReduction: 'автоматизація повторюваних розмов',
        automation: 'кваліфікація, запис, підсумки, follow‑up',
        scalability: 'стабільна робота при рості кількості дзвінків',
      },
    },
    useCases: {
      en: {
        sales: [
          'inbound lead qualification and appointment setting',
          'follow-up calls to re-engage warm leads',
          'routing high-intent prospects to the right AE/region',
        ],
        customerSupport: [
          'automate common questions and status checks',
          'replace rigid IVR menus with natural conversation',
          'escalate complex cases with full context',
        ],
        crm: [
          'auto-create call notes, outcomes, and tasks',
          'update lead stage and next steps immediately after calls',
          'enforce consistent qualification fields',
        ],
        operations: [
          'confirmations, reminders, rescheduling',
          'post-call summaries to internal channels',
          'SLA routing and after-hours coverage',
        ],
      },
      uk: {
        sales: [
          'кваліфікація inbound‑дзвінків і запис на дзвінок/зустріч',
          'повторні контакти з “теплими” лідами',
          'маршрутизація на правильного менеджера (регіон/сегмент)',
        ],
        customerSupport: [
          'відповіді на типові питання без IVR‑меню',
          'статуси, інструкції, базові запити',
          'ескалація складних кейсів з контекстом',
        ],
        crm: [
          'автоматичні нотатки, outcomes, задачі після дзвінка',
          'заповнення полів кваліфікації',
          'оновлення стадії та next steps',
        ],
        operations: [
          'підтвердження, нагадування, перенесення зустрічей',
          'підсумки в внутрішні канали/пошту',
          'after-hours покриття зі зрозумілими правилами',
        ],
      },
    },
    whyAiInsider: {
      en: [
        'Custom AI solutions aligned with your call flows and brand tone',
        'Business-focused automation built to increase bookings and reduce missed calls',
        'Fast deployment with staged rollout and quality monitoring',
        'Integrations with CRM, calendar, messaging, and analytics',
      ],
      uk: [
        'Кастомні AI‑рішення під ваші call‑флоу та tone of voice',
        'Фокус на бізнес‑ефект (записи, конверсія, пропущені дзвінки)',
        'Швидкий запуск зі staged rollout і моніторингом якості',
        'Інтеграції з CRM, календарем, повідомленнями та аналітикою',
      ],
    },
    faq: {
      en: [
        { q: 'Can AI voice agents transfer calls to a human?', a: 'Yes—by intent, keywords, user request, or business rules.' },
        { q: 'Can it book and reschedule meetings?', a: 'Yes—calendar integration supports booking, rescheduling, and confirmations.' },
        { q: 'How do you ensure call quality?', a: 'We test edge cases, add guardrails, monitor transcripts, and iterate quickly.' },
        { q: 'Can it work across regions and time zones?', a: 'Yes—routing rules can be configured per region and availability.' },
        { q: 'Will it update CRM automatically after each call?', a: 'Yes—notes, outcomes, fields, and next steps can be synced.' },
      ],
      uk: [
        { q: 'Чи може агент перевести дзвінок на людину?', a: 'Так — за правилами або на прохання клієнта.' },
        { q: 'Чи може AI бронювати й переносити зустрічі?', a: 'Так — через інтеграцію з календарем і правила доступності.' },
        { q: 'Як контролюється якість розмов?', a: 'Транскрипти, перевірки edge‑кейсів, гардрейли та швидкі ітерації.' },
        { q: 'Чи підходить для різних регіонів і часових поясів?', a: 'Так — налаштовується маршрутизація й графіки доступності.' },
        { q: 'Чи оновлюється CRM після дзвінка автоматично?', a: 'Так — нотатки, поля, outcomes і задачі синхронізуються.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a free AI consultation', getAudit: 'Get AI automation audit' },
      uk: { bookConsultation: 'Замовити безкоштовну AI‑консультацію', getAudit: 'Отримати аудит AI‑автоматизації' },
    },
    relatedBlogSlugs: ['ai-cold-calling-agent-that-books-meetings', 'ai-voice-agent-for-real-estate'],
    metaKeywords: {
      en: ['AI voice agents', 'AI phone agent', 'voice agent for business', 'AI call assistant', 'appointment booking voice agent'],
      uk: ['AI voice agents', 'AI телефонний агент', 'голосовий агент для бізнесу', 'AI агент для дзвінків', 'бронювання зустрічей'],
    },
  },

  'custom-ai-agents': {
    slug: 'custom-ai-agents',
    keyword: 'Custom AI agents',
    titleTag: {
      en: 'Custom AI agents | AI Insider',
      uk: 'Custom AI agents — агенти під бізнес | AI Insider',
    },
    metaDescription: {
      en: 'Custom AI agents that execute tasks across your tools—CRM, email, support, ops. Book a free AI consultation.',
      uk: 'Custom AI agents: агенти, що виконують задачі в CRM, пошті й операціях. Замовте безкоштовну AI‑консультацію.',
    },
    intro: {
      en: [
        'Custom AI agents are action-oriented systems that do work across your tools—creating tickets, updating CRM, drafting emails, and triggering workflows.',
        'They’re for B2B teams that want more than “chat”: you need AI that can execute tasks with clear rules, auditability, and measurable outcomes.',
        'If important processes still depend on humans remembering steps, agents standardize execution and remove bottlenecks.',
      ],
      uk: [
        'Custom AI agents — це AI‑системи, які не лише “відповідають”, а виконують задачі у ваших інструментах: CRM, пошта, саппорт, операції.',
        'Це для B2B‑команд, яким потрібна керована автоматизація з правилами, логами та вимірюваними результатами.',
        'Якщо процеси залежать від того, чи людина “пам’ятає зробити крок” — агенти стандартизують виконання і прибирають затримки.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['Custom AI agents are AI systems that:'],
        bullets: [
          'understand context (messages, docs, CRM records, tickets)',
          'decide what to do next (rules + AI reasoning)',
          'use tools to act (APIs, webhooks, forms, databases)',
        ],
        outro: 'They’re built with guardrails so actions stay safe and aligned with your process.',
      },
      uk: {
        paragraphs: ['custom AI agents — це AI, який:'],
        bullets: [
          'працює з контекстом (CRM‑дані, листування, тікети, документи)',
          'приймає рішення в межах правил',
          'використовує інструменти, щоб діяти (API, вебхуки, бази даних)',
        ],
        outro: 'Це “агентні” системи з гардрейлами та контрольованими діями.',
      },
    },
    howWorks: {
      en: [
        'Define the jobs-to-be-done (tasks, owners, success criteria)',
        'Connect tools and permissions (CRM, inbox, support desk, internal apps)',
        'Add decision logic (routing, scoring, validation, approvals)',
        'Implement actions (create/update records, send messages, schedule tasks)',
        'Test and evaluate (edge cases, regression checks, monitoring)',
        'Deploy with controls (audit logs, alerts, human review gates)',
      ],
      uk: [
        'Фіксуємо jobs‑to‑be‑done (задачі, KPI, критерії успіху)',
        'Підключаємо інструменти та доступи (CRM, inbox, support, внутрішні сервіси)',
        'Налаштовуємо логіку (скоринг, валідація, approvals, маршрутизація)',
        'Реалізуємо дії (оновлення записів, листи, задачі, запуск процесів)',
        'Тестуємо (edge‑кейси, регресія, моніторинг)',
        'Запускаємо з контролем (аудит‑логи, алерти, “людина‑в‑контурі”)',
      ],
    },
    benefits: {
      en: {
        efficiency: 'reduce multi-step admin work across systems',
        costReduction: 'fewer manual operations and rework',
        automation: 'consistent task execution with approvals when needed',
        scalability: 'add capacity without adding headcount',
      },
      uk: {
        efficiency: 'менше багатокрокової рутини між системами',
        costReduction: 'менше ручних операцій і переробок',
        automation: 'стабільне виконання з approvals там, де треба',
        scalability: 'нова “потужність” без росту штату',
      },
    },
    useCases: {
      en: {
        sales: [
          'auto-enrich leads, score intent, and prepare next actions',
          'draft outreach and follow-ups using CRM context',
          'create deals, tasks, and meeting summaries automatically',
        ],
        customerSupport: [
          'classify tickets, suggest responses, and escalate with context',
          'create internal tasks and follow-ups based on ticket outcomes',
          'sync knowledge updates based on recurring issues',
        ],
        crm: [
          'keep records clean (dedupe, validation, field normalization)',
          'enforce pipeline stages and next-step requirements',
          'automate reporting inputs and activity logging',
        ],
        operations: [
          'automate onboarding, approvals, and internal requests',
          'generate documents and checklists with validation',
          'trigger alerts when SLAs or data quality thresholds are breached',
        ],
      },
      uk: {
        sales: [
          'скоринг, збагачення та підготовка next steps',
          'чернетки листів із контекстом CRM',
          'авто‑створення задач, нотаток і підсумків зустрічей',
        ],
        customerSupport: [
          'класифікація тікетів і пропозиції відповідей',
          'створення внутрішніх задач за результатами звернення',
          'ескалація з коротким резюме для спеціаліста',
        ],
        crm: [
          'дедуплікація, нормалізація, контроль якості полів',
          'дотримання правил пайплайну (стадії, next step, власник)',
          'автоматичне логування активностей',
        ],
        operations: [
          'онбординг, погодження, внутрішні запити та документи',
          'запуск процесів у потрібний момент (тригери, SLA, алерти)',
          'контроль ризикових кроків через approval',
        ],
      },
    },
    whyAiInsider: {
      en: [
        'Custom AI solutions built for your exact workflows and constraints',
        'Business-focused automation tied to KPIs (conversion, SLA, cycle time)',
        'Fast deployment via iterative delivery (MVP → improvements)',
        'Integrations across your stack with monitoring and audit logs',
      ],
      uk: [
        'Кастомні AI‑рішення під ваші обмеження та процеси',
        'Фокус на бізнес‑метрики (SLA, cycle time, конверсія, якість даних)',
        'Швидкий запуск і ітерації після релізу',
        'Інтеграції з вашим стеком + моніторинг і аудит‑логи',
      ],
    },
    faq: {
      en: [
        { q: 'What’s the difference between custom AI agents and chatbots?', a: 'Chatbots talk. Agents take actions across tools with guardrails and logs.' },
        { q: 'Can agents work with approval steps?', a: 'Yes—critical actions can require human confirmation.' },
        { q: 'How do you manage permissions and data access?', a: 'Role-based access, scoped API keys, and audit logs.' },
        { q: 'Can agents integrate with internal systems?', a: 'Yes—via API/webhooks, databases, or custom connectors.' },
        { q: 'How do you measure success?', a: 'We track cycle time, error rate, adoption, and business KPIs per workflow.' },
      ],
      uk: [
        { q: 'Чим custom AI agents відрізняються від чатботів?', a: 'Чатбот говорить. Агент виконує дії в інструментах з правилами та логами.' },
        { q: 'Чи можна зробити approval перед критичними діями?', a: 'Так — для платежів, зміни статусів, видалення даних та інших ризикових кроків.' },
        { q: 'Як керувати доступами до даних?', a: 'Скоуп‑доступи, ролі, обмежені ключі, аудит‑лог і контроль дій.' },
        { q: 'Чи можна інтегрувати з внутрішніми системами?', a: 'Так — через API/вебхуки/БД або кастомні конектори.' },
        { q: 'Як вимірюється ефект?', a: 'Час циклу, кількість ручних дотиків, помилки даних і KPI процесу.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a free AI consultation', getAudit: 'Get AI automation audit' },
      uk: { bookConsultation: 'Замовити безкоштовну AI‑консультацію', getAudit: 'Отримати аудит AI‑автоматизації' },
    },
    relatedBlogSlugs: ['multimodal-ai-agents-for-customer-experience', 'ai-search-assistant-for-company-knowledge'],
    metaKeywords: {
      en: ['Custom AI agents', 'agentic AI', 'AI workflow agents', 'CRM automation agent', 'AI operations automation'],
      uk: ['Custom AI agents', 'агентні AI системи', 'AI агенти для процесів', 'агент для CRM', 'автоматизація операцій'],
    },
  },
  'ai-content-creation': {
    slug: 'ai-content-creation',
    keyword: 'AI content creation',
    titleTag: {
      en: 'AI Content Creation | AI Influencers, Video & UGC | AI Insider',
      uk: 'AI контент-продакшн | AI-інфлюенсери, відео та UGC | AI Insider',
    },
    metaDescription: {
      en: 'AI content creation studio: AI influencers, AI video production, and AI UGC for marketing. Scale your content without shoots or influencers.',
      uk: 'AI контент-студія: AI-інфлюенсери, AI-відеопродакшн та AI UGC для маркетингу. Масштабуйте контент без зйомок та інфлюенсерів.',
    },
    intro: {
      en: [
        'AI content creation is transforming how brands produce marketing materials — from virtual influencers to UGC-style ads.',
        'No more expensive shoots, unreliable creators, or content bottlenecks. AI generates video, avatars, and social content at scale.',
        'This is for brands that want to 10x their content output while cutting costs and maintaining full creative control.',
      ],
      uk: [
        'AI content creation трансформує спосіб створення маркетингових матеріалів — від віртуальних інфлюенсерів до UGC-реклами.',
        'Більше ніяких дорогих зйомок, ненадійних креаторів чи контентних "затичок". AI генерує відео, аватари та соцмережний контент у масштабі.',
        'Це для брендів, які хочуть збільшити контент у 10 разів, знизити витрати і зберегти повний контроль над креативом.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI content creation includes three main directions:'],
        bullets: [
          'AI Influencers — virtual personas that run your social media, engage audiences, and never ask for a day off',
          'AI Video Production — generate videos with AI avatars, repurpose content, and dub to multiple languages',
          'AI UGC — mass-produce UGC-style ads for Meta, TikTok, and YouTube without hiring creators',
        ],
        outro: 'Together, they form a complete AI content studio for modern marketing teams.',
      },
      uk: {
        paragraphs: ['AI content creation включає три основні напрямки:'],
        bullets: [
          'AI-інфлюенсери — віртуальні персонажі, які ведуть ваші соцмережі, залучають аудиторію і ніколи не просять вихідний',
          'AI-відеопродакшн — генеруйте відео з AI-аватарами, перепрофілюйте контент і дублюйте на різні мови',
          'AI UGC — масово створюйте UGC-рекламу для Meta, TikTok та YouTube без найму креаторів',
        ],
        outro: 'Разом вони формують повноцінну AI контент-студію для сучасних маркетингових команд.',
      },
    },
    howWorks: {
      en: [
        'Define your content strategy and target platforms (TikTok, Instagram, YouTube, etc.)',
        'Choose your approach: AI influencer persona, AI video templates, or UGC creative factory',
        'Set up generation pipelines: scripts → AI avatars → video → review → publish',
        'Scale with A/B testing, multilingual versions, and continuous optimization',
        'Measure performance and iterate based on engagement and conversion data',
      ],
      uk: [
        'Визначте контент-стратегію та цільові платформи (TikTok, Instagram, YouTube тощо)',
        'Оберіть підхід: AI-інфлюенсер, AI-відео шаблони або UGC-креативна фабрика',
        'Налаштуйте пайплайн генерації: скрипти → AI-аватари → відео → ревью → публікація',
        'Масштабуйте через A/B тестування, мультимовні версії та постійну оптимізацію',
        'Вимірюйте результати та ітеруйте на основі даних про залученість та конверсії',
      ],
    },
    benefits: {
      en: {
        efficiency: '10x content output without growing your team',
        costReduction: '5-10x cheaper than traditional video production and UGC',
        automation: 'from script to published video in hours, not weeks',
        scalability: 'unlimited variations, languages, and A/B tests',
      },
      uk: {
        efficiency: 'у 10 разів більше контенту без розширення команди',
        costReduction: 'у 5-10 разів дешевше за традиційне відеовиробництво та UGC',
        automation: 'від скрипта до готового відео за години, а не тижні',
        scalability: 'необмежені варіації, мови та A/B тести',
      },
    },
    useCases: {
      en: {
        sales: [
          'AI influencer showcasing products and driving engagement',
          'video sales letters (VSL) generated in hours',
          'personalized video outreach at scale',
        ],
        customerSupport: [
          'onboarding videos with AI avatars',
          'tutorial and how-to content without filming',
          'FAQ videos automatically generated from docs',
        ],
        crm: [
          'personalized video messages for key accounts',
          'automated video follow-ups in sales sequences',
          'localized content for different market segments',
        ],
        operations: [
          'internal training videos with AI instructors',
          'process documentation in video format',
          'multi-language content without translation agencies',
        ],
      },
      uk: {
        sales: [
          'AI-інфлюенсер демонструє продукти та залучає аудиторію',
          'відео-листи продажів (VSL) за лічені години',
          'персоналізований відео-аутріч у масштабі',
        ],
        customerSupport: [
          'онбординг-відео з AI-аватарами',
          'tutorials та how-to контент без зйомок',
          'FAQ-відео автоматично згенеровані з документації',
        ],
        crm: [
          'персоналізовані відео-повідомлення для ключових клієнтів',
          'автоматичні відео-фоловапи в sales-послідовностях',
          'локалізований контент для різних сегментів ринку',
        ],
        operations: [
          'внутрішні навчальні відео з AI-інструкторами',
          'документація процесів у відео-форматі',
          'мультимовний контент без перекладацьких агенцій',
        ],
      },
    },
    whyAiInsider: {
      en: [
        'Full-stack AI content capabilities: influencers + video + UGC under one roof',
        'Production-ready quality with brand consistency and guardrails',
        'Fast iteration: from concept to live content in days, not months',
        'Measurable ROI: we track engagement, conversions, and cost-per-content',
        'Swiss precision and reliability, serving clients across EU and US',
      ],
      uk: [
        'Повний стек AI-контенту: інфлюенсери + відео + UGC під одним дахом',
        'Production-ready якість з консистентністю бренду та гардрейлами',
        'Швидкі ітерації: від концепту до live-контенту за дні, а не місяці',
        'Вимірюваний ROI: відстежуємо engagement, конверсії та вартість контенту',
        'Швейцарська точність і надійність, працюємо з клієнтами по ЄС та США',
      ],
    },
    faq: {
      en: [
        { q: 'Does AI content look fake?', a: 'Modern AI avatars are highly realistic. We match the style to your brand and audience, and test before launch.' },
        { q: 'Can I use my own voice or likeness?', a: 'Yes — we can clone your voice or create a unique synthetic persona. You retain full rights.' },
        { q: 'Is AI UGC allowed on Meta and TikTok?', a: 'Yes — AI-generated content is used successfully for performance ads. We comply with platform policies.' },
        { q: 'How fast can I get first videos?', a: 'First AI videos are typically ready within 5-10 days of project start.' },
        { q: 'What about multilingual content?', a: 'One script can be rendered in 10+ languages with lip-sync. Perfect for global campaigns.' },
      ],
      uk: [
        { q: 'Чи виглядає AI-контент штучно?', a: 'Сучасні AI-аватари дуже реалістичні. Ми підбираємо стиль під ваш бренд і тестуємо до запуску.' },
        { q: 'Чи можна використати власний голос?', a: 'Так — можемо клонувати ваш голос або створити унікальний синтетичний персонаж. Права залишаються у вас.' },
        { q: 'Чи дозволено AI UGC на Meta і TikTok?', a: 'Так — AI-контент успішно використовується для performance-реклами. Ми дотримуємось політик платформ.' },
        { q: 'Як швидко можна отримати перші відео?', a: 'Перші AI-відео зазвичай готові за 5-10 днів від старту проєкту.' },
        { q: 'А що щодо мультимовного контенту?', a: 'Один скрипт можна рендерити у 10+ мовах з lip-sync. Ідеально для глобальних кампаній.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a free AI content consultation', getAudit: 'Get AI content audit' },
      uk: { bookConsultation: 'Замовити безкоштовну AI-консультацію', getAudit: 'Отримати аудит AI-контенту' },
    },
    relatedBlogSlugs: ['ai-virtual-influencer-complete-business-guide', 'ai-video-production-for-marketing'],
    metaKeywords: {
      en: ['AI content creation', 'AI influencer', 'AI video production', 'AI UGC', 'virtual influencer', 'AI avatar', 'synthetic media'],
      uk: ['AI контент', 'AI інфлюенсер', 'AI відеопродакшн', 'AI UGC', 'віртуальний інфлюенсер', 'AI аватар', 'синтетичні медіа'],
    },
  },
  'ai-receptionist': {
    slug: 'ai-receptionist',
    keyword: 'AI receptionist',
    heroTitle: {
      en: 'AI Receptionist for Business',
      uk: 'AI ресепшн для бізнесу',
    },
    titleTag: {
      en: 'AI Receptionist for Business | 24/7 Call Automation — AI Insider',
      uk: 'AI Ресепшн | Автоматична відповідь на дзвінки — AI Insider',
    },
    metaDescription: {
      en: 'AI receptionist for business that answers calls 24/7, books appointments, and handles routine questions without human operators.',
      uk: 'AI ресепшн для бізнесу: автоматична обробка дзвінків, запис клієнтів і відповіді 24/7 без перевантаження команди.',
    },
    heroStats: {
      en: ['24/7 availability', '30 sec response time', '80% of calls handled without an operator'],
      uk: ['24/7 доступність', '30 сек — час відповіді', '80% дзвінків без оператора'],
    },
    intro: {
      en: [
        'AI receptionist for business handles inbound calls, basic qualification, appointment booking, and after-hours coverage without forcing customers into voicemail.',
        'It is designed for companies where missed calls mean lost revenue: clinics, service businesses, agencies, and local operators with uneven call load.',
        'If your front desk spends too much time repeating the same answers, AI can absorb routine traffic and route important calls to the right human instantly.',
      ],
      uk: [
        'AI ресепшн для бізнесу автоматично приймає дзвінки, відповідає на типові питання, бронює візити та тримає SLA навіть поза робочими годинами.',
        'Це рішення для бізнесів, де пропущений дзвінок означає втрачений продаж: сервісні компанії, клініки, агентства, локальні мережі.',
        'Якщо адміністратори весь день повторюють одні й ті самі відповіді, AI може забрати рутину й передавати важливі звернення потрібній людині за секунди.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI receptionist is a voice-first automation layer that:'],
        bullets: [
          'answers incoming calls and recognizes caller intent',
          'books, confirms, or reschedules appointments automatically',
          'routes urgent calls and creates clean call notes in CRM',
        ],
        outro: 'It gives businesses a front desk that never sleeps, never misses a queue, and always follows the script.',
      },
      uk: {
        paragraphs: ['AI ресепшн — це голосовий automation layer, який:'],
        bullets: [
          'приймає вхідні дзвінки і визначає намір клієнта',
          'автоматично бронює, підтверджує або переносить записи',
          'маршрутизує термінові звернення і створює чисті нотатки в CRM',
        ],
        outro: 'Фактично це ваш front desk 24/7: без пропущених дзвінків, без черг і без хаотичних handoff між людьми.',
      },
    },
    howWorks: {
      en: [
        'Connect phone numbers, call flows, availability rules, and escalation logic.',
        'Train the receptionist on FAQs, booking policies, business hours, and edge-case routing.',
        'Integrate calendars and CRM so every call result creates a real business action.',
        'Monitor transcripts, missed intents, and conversion rates, then refine weekly.',
      ],
      uk: [
        'Підключаємо номер, call flow, правила доступності та логіку ескалації.',
        'Навчаємо AI на FAQ, політиках запису, графіках роботи та edge-cases.',
        'Інтегруємо календар і CRM, щоб кожен дзвінок завершувався реальною дією.',
        'Моніторимо транскрипти, missed intents і конверсію, а потім покращуємо сценарії щотижня.',
      ],
    },
    benefits: {
      en: {
        efficiency: 'instant call pickup, shorter waiting time, and no voicemail dead ends',
        costReduction: 'less front-desk overload and fewer missed calls requiring callbacks',
        automation: 'booking, rescheduling, reminders, and call summaries run automatically',
        scalability: 'cover evenings, weekends, and peak hours without adding operators',
      },
      uk: {
        efficiency: 'миттєва відповідь на дзвінок і менше втрат через чергу або voicemail',
        costReduction: 'менше перевантаження ресепшну і менше повторних передзвонів',
        automation: 'бронювання, переноси, нагадування і підсумки дзвінків працюють автоматично',
        scalability: 'можна покривати вечори, вихідні та піки без розширення штату',
      },
    },
    useCases: {
      en: { sales: [], customerSupport: [], crm: [], operations: [] },
      uk: { sales: [], customerSupport: [], crm: [], operations: [] },
    },
    useCaseBlocks: {
      en: [
        { title: 'Clinics & wellness', items: ['book appointments automatically', 'confirm or reschedule visits', 'answer routine pre-visit questions'] },
        { title: 'Service businesses', items: ['capture leads after-hours', 'route urgent calls by intent', 'reduce missed opportunities from unanswered calls'] },
        { title: 'Real estate & local operators', items: ['book property viewings', 'qualify callers before handoff', 'log every conversation into CRM'] },
      ],
      uk: [
        { title: 'Клініки та wellness', items: ['автоматичний запис клієнтів', 'підтвердження або перенос візитів', 'відповіді на типові питання до візиту'] },
        { title: 'Сервісний бізнес', items: ['збір лідів після робочого часу', 'маршрутизація термінових дзвінків за наміром', 'менше втрат через пропущені звернення'] },
        { title: 'Нерухомість і локальні оператори', items: ['бронювання переглядів або консультацій', 'первинна кваліфікація перед handoff', 'автоматичний лог кожної розмови в CRM'] },
      ],
    },
    whyAiInsider: {
      en: [
        'We build voice automation around revenue-critical call flows, not generic call center scripts.',
        'Every receptionist setup is tied to booking rate, missed-call recovery, and SLA metrics.',
        'We integrate calls with calendars, CRM, and follow-up workflows from day one.',
        'Launch starts with a practical MVP and improves using real transcripts and outcomes.',
      ],
      uk: [
        'Ми будуємо voice automation навколо revenue-critical сценаріїв, а не шаблонного call center.',
        'Кожен AI ресепшн прив’язаний до booking rate, missed-call recovery і SLA по дзвінках.',
        'З першого дня інтегруємо телефонію з календарем, CRM і follow-up логікою.',
        'Стартуємо з практичного MVP і покращуємо його на основі реальних транскриптів та результатів.',
      ],
    },
    faq: {
      en: [
        { q: 'Can an AI receptionist answer calls 24/7?', a: 'Yes. It can handle after-hours and peak-time calls continuously while following your business rules.' },
        { q: 'Can it book appointments directly?', a: 'Yes, with calendar integrations for booking, confirmations, and rescheduling.' },
        { q: 'What happens if a caller needs a human?', a: 'The system can transfer, escalate, or schedule a callback based on urgency and intent.' },
        { q: 'Does it work for small businesses?', a: 'Yes. Small teams often see the fastest ROI because every missed call hurts more.' },
        { q: 'How do you control call quality?', a: 'We review transcripts, monitor failed intents, add guardrails, and iterate on call flows weekly.' },
      ],
      uk: [
        { q: 'Чи може AI ресепшн відповідати 24/7?', a: 'Так. Він покриває вечори, вихідні та піки навантаження, дотримуючись ваших правил і графіків.' },
        { q: 'Чи може система сама бронювати записи?', a: 'Так, через інтеграцію з календарем, підтвердженням і сценаріями переносу.' },
        { q: 'Що буде, якщо клієнту потрібна людина?', a: 'AI може переключити дзвінок, створити callback або передати кейс за правилом терміновості.' },
        { q: 'Чи підходить це для малого бізнесу?', a: 'Так. Для малих команд ROI часто найшвидший, бо кожен пропущений дзвінок сильніше б’є по доходу.' },
        { q: 'Як контролюється якість дзвінків?', a: 'Через транскрипти, моніторинг missed intents, guardrails і регулярні ітерації сценаріїв.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a free AI receptionist consultation', getAudit: 'Get AI call flow audit' },
      uk: { bookConsultation: 'Замовити консультацію по AI ресепшн', getAudit: 'Отримати аудит call flow' },
    },
    relatedBlogSlugs: ['ai-receptionist-for-small-business'],
    relatedSolutionSlugs: ['ai-for-appointment-booking', 'ai-for-customer-support-automation'],
    siblingLandingSlugs: ['ai-voice-agents', 'ai-chatbots-for-business'],
    metaKeywords: {
      en: ['AI receptionist', 'AI receptionist for business', '24/7 call automation', 'AI call answering', 'AI phone receptionist'],
      uk: ['AI ресепшн', 'AI ресепшн для бізнесу', 'автоматизація дзвінків 24/7', 'AI відповіді на дзвінки', 'AI телефонний ресепшн'],
    },
  },
  'ai-sdr': {
    slug: 'ai-sdr',
    keyword: 'AI SDR',
    heroTitle: {
      en: 'AI SDR for B2B Sales Automation',
      uk: 'AI SDR — автоматизація продажів',
    },
    titleTag: {
      en: 'AI SDR for B2B Sales | Automated Outreach — AI Insider',
      uk: 'AI SDR | Автоматизація B2B Продажів — AI Insider',
    },
    metaDescription: {
      en: 'AI SDR for B2B sales automation: outbound outreach, lead qualification, meeting booking, and pipeline growth without scaling SDR headcount.',
      uk: 'AI SDR для B2B продажів: автоматичний аутріч, кваліфікація лідів і booking зустрічей без масштабування SDR-команди.',
    },
    heroStats: {
      en: ['10x more contacts', '40% pipeline growth', 'no rep on repetitive cold outreach'],
      uk: ['10x більше контактів', '40% зростання pipeline', 'без менеджера на холодних дзвінках'],
    },
    intro: {
      en: [
        'AI SDR automates the repetitive layer of outbound sales: prospect research, personalization, first-touch messaging, qualification, and meeting booking.',
        'It is built for B2B teams that need more top-of-funnel volume without hiring a full SDR pod for every region, segment, or campaign.',
        'If pipeline growth is limited by how many contacts your reps can manually reach, AI SDR expands coverage while keeping the process structured.',
      ],
      uk: [
        'AI SDR автоматизує рутинний шар outbound-продажів: research, персоналізацію, перший дотик, кваліфікацію та booking зустрічей.',
        'Це рішення для B2B-команд, яким потрібно наростити top-of-funnel без найму окремої SDR-команди під кожен сегмент або регіон.',
        'Якщо pipeline впирається в те, скільки контактів команда встигає вручну опрацювати, AI SDR дає масштаб без хаосу в процесі.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI SDR is a sales automation system that:'],
        bullets: [
          'selects and enriches target accounts and contacts',
          'launches personalized outreach across email, LinkedIn, and voice',
          'qualifies interest and books meetings into your calendar or CRM',
        ],
        outro: 'Instead of replacing closers, it removes the repetitive top-of-funnel work that slows them down.',
      },
      uk: {
        paragraphs: ['AI SDR — це sales automation система, яка:'],
        bullets: [
          'відбирає і збагачує цільові акаунти та контакти',
          'запускає персоналізований аутріч через email, LinkedIn і voice',
          'кваліфікує інтерес і бронює зустрічі в календар або CRM',
        ],
        outro: 'AI SDR не замінює closers, а прибирає рутинний top-of-funnel, який сповільнює команду продажів.',
      },
    },
    howWorks: {
      en: [
        'Define ICP, target segments, disqualification rules, and meeting criteria.',
        'Connect data sources for prospect enrichment, messaging context, and CRM sync.',
        'Launch outbound sequences with AI-written personalization and follow-up logic.',
        'Score replies, route qualified prospects to AEs, and optimize based on reply-to-meeting conversion.',
      ],
      uk: [
        'Фіксуємо ICP, сегменти, правила disqualification і критерії booking зустрічей.',
        'Підключаємо джерела для enrichment, персоналізації та синхронізації з CRM.',
        'Запускаємо outbound-послідовності з AI-персоналізацією і follow-up логікою.',
        'Скоримо відповіді, передаємо qualified лідів AE і оптимізуємо по reply-to-meeting конверсії.',
      ],
    },
    benefits: {
      en: {
        efficiency: 'far more first touches and follow-ups without drowning reps in admin work',
        costReduction: 'less dependency on headcount for repetitive outbound tasks',
        automation: 'research, messaging, routing, and booking work in one coordinated flow',
        scalability: 'you can test segments, geographies, and campaigns faster',
      },
      uk: {
        efficiency: 'набагато більше first touch і follow-up без перевантаження reps рутиною',
        costReduction: 'менша залежність від headcount для повторюваних outbound задач',
        automation: 'research, messaging, routing і booking зібрані в один керований процес',
        scalability: 'можна швидше тестувати сегменти, географії та кампанії',
      },
    },
    useCases: {
      en: { sales: [], customerSupport: [], crm: [], operations: [] },
      uk: { sales: [], customerSupport: [], crm: [], operations: [] },
    },
    useCaseBlocks: {
      en: [
        { title: 'B2B SaaS', items: ['scale outbound by ICP and product use case', 'book demos with qualified accounts faster', 'keep CRM updated after every touchpoint'] },
        { title: 'Agencies & services', items: ['personalize outreach from niche proof points', 'qualify inbound + outbound in one flow', 'reduce manual proposal follow-up'] },
        { title: 'High-ticket sales teams', items: ['combine email, LinkedIn, and calling sequences', 'prioritize hot replies automatically', 'route only qualified meetings to closers'] },
      ],
      uk: [
        { title: 'B2B SaaS', items: ['масштабування outbound по ICP і use case', 'швидше бронювання демо з qualified акаунтами', 'автоматичне оновлення CRM після кожного touchpoint'] },
        { title: 'Агенції та сервісні компанії', items: ['персоналізація аутрічу від кейсів і proof points', 'єдиний потік для inbound + outbound qualification', 'менше ручного фоловапу по пропозиціях'] },
        { title: 'High-ticket sales teams', items: ['поєднання email, LinkedIn і calling sequences', 'автоматичний пріоритет гарячих відповідей', 'до closers доходять лише кваліфіковані зустрічі'] },
      ],
    },
    whyAiInsider: {
      en: [
        'We design AI SDR flows around ICP quality, booking criteria, and pipeline metrics, not vanity outreach volume.',
        'Our systems combine messaging, qualification, and routing instead of treating outbound as disconnected tools.',
        'We integrate CRM, data enrichment, and call workflows into one measurable outbound engine.',
        'The rollout starts with one segment, proves reply-to-meeting economics, then scales safely.',
      ],
      uk: [
        'Ми проєктуємо AI SDR навколо ICP-якості, критеріїв booking і pipeline-метрик, а не vanity outreach volume.',
        'Наші системи поєднують messaging, qualification і routing замість набору розрізнених інструментів.',
        'Інтегруємо CRM, enrichment і calling workflows в один вимірюваний outbound engine.',
        'Запуск починається з одного сегмента, доводить reply-to-meeting економіку і тільки потім масштабується.',
      ],
    },
    faq: {
      en: [
        { q: 'Can AI SDR replace a full sales team?', a: 'No. It automates top-of-funnel outreach and qualification, while closers still handle strategic conversations and deal-making.' },
        { q: 'Can it qualify replies automatically?', a: 'Yes. It can score interest, detect buying signals, and route prospects based on your qualification rules.' },
        { q: 'Does AI SDR work with cold calling?', a: 'Yes. It can be paired with AI voice agents for first-touch calls, follow-up, and meeting confirmation.' },
        { q: 'How is personalization handled at scale?', a: 'We combine CRM context, account data, and prompt logic to generate controlled personalization instead of generic spam.' },
        { q: 'What do you need to launch?', a: 'ICP definition, offer positioning, CRM access, approved channels, and examples of successful outbound messaging.' },
      ],
      uk: [
        { q: 'Чи може AI SDR замінити весь sales team?', a: 'Ні. Він автоматизує top-of-funnel аутріч і qualification, а closers залишаються на стратегічних розмовах і угодах.' },
        { q: 'Чи може система сама кваліфікувати відповіді?', a: 'Так. Вона може скорити інтерес, визначати buying signals і маршрутизувати проспектів за вашими правилами.' },
        { q: 'Чи працює AI SDR разом із cold calling?', a: 'Так. Його можна поєднати з AI voice agents для first-touch calls, follow-up і підтвердження зустрічей.' },
        { q: 'Як робиться персоналізація у масштабі?', a: 'Через поєднання CRM-контексту, account data та prompt-логіки, а не через шаблонний spam.' },
        { q: 'Що потрібно для старту?', a: 'Опис ICP, позиціонування офера, доступ до CRM, погоджені канали і приклади успішного outbound messaging.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book an AI SDR strategy call', getAudit: 'Get outbound automation audit' },
      uk: { bookConsultation: 'Замовити консультацію по AI SDR', getAudit: 'Отримати аудит outbound-процесу' },
    },
    relatedBlogSlugs: ['ai-sdr-workflow-for-b2b-outbound', 'ai-cold-calling-agent-that-books-meetings'],
    relatedSolutionSlugs: ['ai-for-lead-qualification', 'ai-for-sales-teams'],
    siblingLandingSlugs: ['ai-automation-for-business', 'custom-ai-agents'],
    metaKeywords: {
      en: ['AI SDR', 'AI SDR for B2B sales', 'automated outreach', 'AI outbound sales', 'AI sales development representative'],
      uk: ['AI SDR', 'AI SDR для B2B продажів', 'автоматичний аутріч', 'AI outbound sales', 'автоматизація SDR'],
    },
  },
  'ai-proposal-generator': {
    slug: 'ai-proposal-generator',
    keyword: 'AI proposal generator',
    heroTitle: {
      en: 'AI Proposal Generator for Agencies',
      uk: 'AI генератор комерційних пропозицій',
    },
    titleTag: {
      en: 'AI Proposal Generator for Agencies — AI Insider',
      uk: 'AI Генератор Пропозицій | Автоматичні КП — AI Insider',
    },
    metaDescription: {
      en: 'AI proposal generator for agencies that creates tailored commercial proposals in minutes, shortens deal cycles, and scales personalization.',
      uk: 'AI генератор комерційних пропозицій для агенцій: автоматичне створення КП, персоналізація під клієнта і коротший цикл угоди.',
    },
    heroStats: {
      en: ['5 minutes instead of 5 hours', '3x more proposals sent', '20% higher conversion'],
      uk: ['5 хвилин замість 5 годин', '3x більше відправлених КП', '20% зростання конверсії'],
    },
    intro: {
      en: [
        'AI proposal generator helps agencies and service firms build polished commercial proposals from CRM data, discovery notes, and reusable pricing logic in minutes.',
        'It is for teams where deal velocity is limited by manual proposal writing, inconsistent formatting, and slow turnaround after discovery calls.',
        'If sales reps or founders still spend evenings assembling decks and PDFs, this is one of the fastest automations to monetize.',
      ],
      uk: [
        'AI генератор комерційних пропозицій допомагає агенціям і сервісним бізнесам збирати якісні КП з CRM-даних, discovery notes і шаблонів ціноутворення за хвилини.',
        'Це рішення для команд, де швидкість угоди гальмується ручним складанням пропозицій, хаотичним форматуванням і довгим turnaround після discovery call.',
        'Якщо sales або фаундери досі витрачають вечори на збирання PDF і слайдів, ця автоматизація окупається дуже швидко.',
      ],
    },
    whatIs: {
      en: {
        paragraphs: ['AI proposal generator is a document automation workflow that:'],
        bullets: [
          'pulls client context, offer structure, pricing, and objections into one draft',
          'adapts messaging to industry, scope, and maturity of the buyer',
          'produces proposals fast enough to shorten the gap between call and send',
        ],
        outro: 'The goal is not generic copy generation, but repeatable, personalized proposals tied to your winning process.',
      },
      uk: {
        paragraphs: ['AI генератор пропозицій — це document automation workflow, який:'],
        bullets: [
          'підтягує контекст клієнта, офер, pricing та objections в єдиний драфт',
          'адаптує повідомлення під індустрію, scope і зрілість потенційного клієнта',
          'дозволяє відправляти КП швидко, скорочуючи gap між дзвінком і send',
        ],
        outro: 'Мета не в “генерації тексту”, а в повторюваних персоналізованих КП, які підсилюють ваш winning process.',
      },
    },
    howWorks: {
      en: [
        'Collect deal context from CRM, forms, discovery notes, and pricing templates.',
        'Use AI to structure scope, value framing, deliverables, timeline, and commercial terms.',
        'Generate a proposal draft tailored to buyer segment, industry, and pain points.',
        'Review, approve, send, and feed outcomes back into the system to improve win rates.',
      ],
      uk: [
        'Збираємо контекст угоди з CRM, форм, discovery notes і pricing templates.',
        'AI структурує scope, value framing, deliverables, timeline і комерційні умови.',
        'Генеруємо драфт КП під buyer segment, індустрію та pain points клієнта.',
        'Команда перевіряє, затверджує, відправляє і повертає outcomes назад у систему для покращення win rate.',
      ],
    },
    benefits: {
      en: {
        efficiency: 'proposal creation drops from hours to minutes',
        costReduction: 'less founder or senior-sales time spent on repetitive drafting',
        automation: 'scope, pricing logic, personalization, and formatting become repeatable',
        scalability: 'the team can send more tailored proposals without quality collapse',
      },
      uk: {
        efficiency: 'створення КП скорочується з годин до хвилин',
        costReduction: 'менше часу фаундерів і senior sales на повторюване складання драфтів',
        automation: 'scope, pricing logic, персоналізація і форматування стають повторюваними',
        scalability: 'команда може відправляти більше якісних КП без падіння якості',
      },
    },
    useCases: {
      en: { sales: [], customerSupport: [], crm: [], operations: [] },
      uk: { sales: [], customerSupport: [], crm: [], operations: [] },
    },
    useCaseBlocks: {
      en: [
        { title: 'Marketing & creative agencies', items: ['turn discovery notes into tailored scopes', 'assemble pricing options quickly', 'reduce lag between call and proposal send'] },
        { title: 'Consulting & professional services', items: ['standardize proposal structure', 'personalize value framing by client type', 'keep commercial terms consistent'] },
        { title: 'Complex B2B services', items: ['generate multi-option offers faster', 'reuse winning proposal patterns', 'increase follow-up speed after qualification'] },
      ],
      uk: [
        { title: 'Маркетингові та creative агенції', items: ['перетворення discovery notes у персоналізований scope', 'швидке складання варіантів pricing', 'менший лаг між дзвінком і відправкою КП'] },
        { title: 'Consulting та professional services', items: ['стандартизація структури пропозицій', 'персоналізація value framing під тип клієнта', 'консистентні комерційні умови'] },
        { title: 'Складні B2B сервіси', items: ['швидша генерація multi-option оферів', 'повторне використання winning proposal patterns', 'швидший follow-up після qualification'] },
      ],
    },
    whyAiInsider: {
      en: [
        'We connect proposal generation to your actual sales process, CRM data, and pricing logic instead of generic writing prompts.',
        'The system is optimized for faster turnaround, cleaner personalization, and measurable proposal-to-close improvement.',
        'We design review and approval layers so teams keep quality control over every commercial document.',
        'The rollout can start with one offer line, then expand to full proposal automation.',
      ],
      uk: [
        'Ми підв’язуємо генерацію КП до вашого sales process, CRM і pricing logic, а не до абстрактних prompt templates.',
        'Система оптимізується під швидший turnaround, чистішу персоналізацію і measurable proposal-to-close improvement.',
        'Закладаємо review та approval layers, щоб команда не втрачала контроль над якістю комерційних документів.',
        'Запуск можна почати з однієї лінійки оферів, а потім розширити до повної proposal automation.',
      ],
    },
    faq: {
      en: [
        { q: 'Can AI generate proposals from CRM and call notes?', a: 'Yes. It can combine CRM data, discovery notes, pricing templates, and previous winning structures into one draft.' },
        { q: 'Will proposals still feel personalized?', a: 'Yes, if the system is fed with real context and controlled templates instead of generic prompts.' },
        { q: 'Can we keep human approval before sending?', a: 'Absolutely. Approval gates are standard for commercial and pricing-sensitive documents.' },
        { q: 'How much faster can teams send proposals?', a: 'Many teams reduce turnaround from multiple hours to minutes for first drafts.' },
        { q: 'What businesses benefit most?', a: 'Agencies, consultancies, and service companies with repeatable offer logic and frequent custom proposals.' },
      ],
      uk: [
        { q: 'Чи може AI генерувати КП з CRM і call notes?', a: 'Так. Система може поєднати CRM-дані, discovery notes, pricing templates і структури виграшних пропозицій у єдиний драфт.' },
        { q: 'Чи залишаться пропозиції персоналізованими?', a: 'Так, якщо система працює з реальним контекстом і контрольованими шаблонами, а не з generic prompts.' },
        { q: 'Чи можна залишити людське затвердження перед відправкою?', a: 'Так. Approval gates — стандартна частина для комерційних документів і цінових умов.' },
        { q: 'Наскільки швидше команда може відправляти КП?', a: 'У багатьох командах turnaround першого драфту скорочується з кількох годин до кількох хвилин.' },
        { q: 'Кому це підходить найбільше?', a: 'Агенціям, consultancies і сервісним бізнесам із повторюваною логікою оферів та частими кастомними КП.' },
      ],
    },
    cta: {
      en: { bookConsultation: 'Book a proposal automation consultation', getAudit: 'Get proposal workflow audit' },
      uk: { bookConsultation: 'Замовити консультацію по AI КП', getAudit: 'Отримати аудит proposal workflow' },
    },
    relatedBlogSlugs: ['ai-proposal-generator-for-agencies'],
    relatedSolutionSlugs: ['ai-for-professional-services', 'ai-for-document-processing'],
    siblingLandingSlugs: ['custom-ai-agents', 'ai-automation-for-business'],
    metaKeywords: {
      en: ['AI proposal generator', 'AI proposal generator for agencies', 'proposal automation', 'automated commercial proposals', 'AI sales proposal'],
      uk: ['AI генератор пропозицій', 'AI генератор комерційних пропозицій', 'автоматизація КП', 'автоматичні комерційні пропозиції', 'AI sales proposal'],
    },
  },
};

export function isSeoServiceSlug(slug: string): slug is SeoServiceSlug {
  return Object.prototype.hasOwnProperty.call(SEO_SERVICE_PAGES, slug);
}

export function getSeoServicePage(slug: string): SeoServicePage | undefined {
  if (!isSeoServiceSlug(slug)) return undefined;
  return SEO_SERVICE_PAGES[slug];
}

export function getLocalizedSeo<T>(value: Localized<T>, lang: Language): T {
  return value[lang] || value.en;
}

