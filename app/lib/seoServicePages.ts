import type { Language } from './translations';

type Localized<T> = { en: T; uk: T };

export type SeoServiceSlug =
  | 'ai-automation-for-business'
  | 'ai-chatbots-for-business'
  | 'ai-voice-agents'
  | 'custom-ai-agents'
  | 'ai-content-creation';

export type SeoFaq = { q: string; a: string };

export interface SeoServicePage {
  slug: SeoServiceSlug;
  /** Main keyword (must appear in URL, title, H1, first 100 words). */
  keyword: string;
  titleTag: Localized<string>;
  metaDescription: Localized<string>;
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
  whyAiInsider: Localized<string[]>;
  faq: Localized<SeoFaq[]>;
  cta: Localized<{
    bookConsultation: string;
    getAudit: string;
  }>;
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
    metaKeywords: {
      en: ['AI content creation', 'AI influencer', 'AI video production', 'AI UGC', 'virtual influencer', 'AI avatar', 'synthetic media'],
      uk: ['AI контент', 'AI інфлюенсер', 'AI відеопродакшн', 'AI UGC', 'віртуальний інфлюенсер', 'AI аватар', 'синтетичні медіа'],
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

