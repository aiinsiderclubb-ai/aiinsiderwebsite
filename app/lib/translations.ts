// Translations for Ukrainian and English

export type Language = 'uk' | 'en';

export const translations = {
  // Navbar
  nav: {
    about: { uk: 'Про нас', en: 'About' },
    cases: { uk: 'Кейси', en: 'Cases' },
    services: { uk: 'Послуги', en: 'Services' },
    contentFactory: { uk: 'Content Factory', en: 'Content Factory' },
    solutions: { uk: 'Рішення', en: 'Solutions' },
    products: { uk: 'Продукти', en: 'Products' },
    partners: { uk: 'Партнерам', en: 'Partners' },
    careers: { uk: 'Вакансії', en: 'Careers' },
    blog: { uk: 'Блог', en: 'Blog' },
    pricing: { uk: 'Ціни', en: 'Pricing' },
    contact: { uk: 'Контакт', en: 'Contact' },
    bookCall: { uk: 'Замовити дзвінок', en: 'Book a Call' },
  },
  
  // Hero Section
  hero: {
    badge: { uk: 'AI-автоматизація', en: 'AI-Powered Automation' },
    descriptor: { uk: 'AI-агенція з автоматизації зі Швейцарії', en: 'AI automation agency based in Switzerland' },
    title1: { uk: 'Автоматизація', en: 'Automation' },
    title2: { uk: 'Майбутнього', en: 'Reimagined' },
    subtitle: { uk: 'AI системи які', en: 'AI systems that' },
    tag1: { uk: 'думають', en: 'think' },
    tag2: { uk: 'говорять', en: 'speak' },
    tag3: { uk: 'діють', en: 'act' },
    stat1Label: { uk: 'Економія часу', en: 'Time Saved' },
    stat2Label: { uk: 'AI доступність', en: 'AI Availability' },
    stat3Label: { uk: 'Швидша відповідь', en: 'Faster Response' },
    cta1: { uk: 'Замовити дзвінок', en: 'Book an Intro Call' },
    cta2: { uk: 'Дивитися рішення', en: 'Explore Solutions' },
    scroll: { uk: 'Гортайте далі', en: 'Scroll to explore' },
  },
  
  // Solutions Section
  solutions: {
    badge: { uk: 'Наші рішення', en: 'Our Solutions' },
    title1: { uk: 'Будуй розумніше,', en: 'Build Smarter,' },
    title2: { uk: 'Запускай швидше', en: 'Ship Faster' },
    subtitle: { uk: 'Революційні AI-рішення, що трансформують вашу роботу.', en: 'Revolutionary AI solutions that transform how you work.' },
    solution1Title: { uk: 'Голосові та чат-агенти', en: 'Voice & Chat Agents' },
    solution1Desc: { uk: 'Людяний AI, який спілкується з клієнтами та бронює зустрічі в реальному часі.', en: 'Humanized AI that talks to your customers and books meetings in real-time.' },
    solution2Title: { uk: 'Автоматизація процесів', en: 'Workflow Automations' },
    solution2Desc: { uk: 'Від захоплення лідів до інтеграції з CRM — повністю автоматизовані процеси.', en: 'From lead capture to CRM integration — fully automated workflows.' },
    solution3Title: { uk: 'AI-аналітика', en: 'Analytics Assistants' },
    solution3Desc: { uk: 'AI, який аналізує дані та надає щотижневі звіти з інсайтами.', en: 'AI that analyzes data and delivers weekly reports with insights.' },
    solution4Title: { uk: 'Кастомні AI-моделі', en: 'Custom AI Models' },
    solution4Desc: { uk: 'GPT та RAG системи на замовлення, інтегровані з вашим стеком.', en: 'Tailor-made GPT and RAG systems integrated with your stack.' },
    explore: { uk: 'Дізнатися більше', en: 'Explore' },
    cta: { uk: 'Замовити індивідуальне рішення', en: 'Request Custom Solution' },
  },
  
  // Pricing Section
  pricing: {
    badge: { uk: 'Тарифи', en: 'Pricing Plans' },
    title1: { uk: 'Оберіть ваш', en: 'Choose Your' },
    title2: { uk: 'Рівень', en: 'Power Level' },
    subtitle: { uk: 'Усі плани адаптовані під ваші потреби. Без прихованих комісій.', en: 'All plans are customized to your exact needs. No hidden fees, no surprises.' },
    popular: { uk: 'НАЙПОПУЛЯРНІШИЙ', en: 'MOST POPULAR' },
    starterDesc: { uk: 'Ідеально для малих автоматизацій', en: 'Perfect for small automations' },
    proDesc: { uk: 'Кастомний AI-агент для вашого бізнесу', en: 'Custom AI agent for your business' },
    enterpriseDesc: { uk: 'Комплексна AI-система', en: 'End-to-end AI system' },
    custom: { uk: 'Індивідуально', en: 'Custom' },
    starterPrice: { uk: '399', en: '399' },
    proPrice: { uk: '899', en: '899' },
    enterprisePrice: { uk: 'Обговоримо', en: 'Let\'s Talk' },
    perMonth: { uk: '/міс', en: '/mo' },
    startingFrom: { uk: 'від', en: 'from' },
    startNow: { uk: 'Почати зараз', en: 'Start Now' },
    getStarted: { uk: 'Дізнатися більше', en: 'Get Started' },
    needCustom: { uk: 'Потрібне індивідуальне рішення?', en: 'Need a custom solution?' },
    letsTalk: { uk: 'Зв\'яжіться з нами', en: 'Let\'s talk' },
    noHiddenFees: { uk: 'Без прихованих комісій', en: 'No hidden fees' },
    cancelAnytime: { uk: 'Скасувати будь-коли', en: 'Cancel anytime' },
    swissQuality: { uk: 'Швейцарська якість', en: 'Swiss quality' },
    // Starter features
    starterF1: { uk: 'Проста автоматизація процесів', en: 'Simple workflow automation' },
    starterF2: { uk: 'Базова інтеграція AI', en: 'Basic AI integration' },
    starterF3: { uk: 'Підтримка по email', en: 'Email support' },
    starterF4: { uk: 'Налаштування за 30 днів', en: '30-day setup' },
    starterF5: { uk: 'До 1,000 операцій/міс', en: 'Up to 1,000 operations/mo' },
    // Pro features
    proF1: { uk: 'Голосовий/чат агент на замовлення', en: 'Custom voice/chat agent' },
    proF2: { uk: 'Просунуті AI-моделі', en: 'Advanced AI models' },
    proF3: { uk: 'Пріоритетна підтримка', en: 'Priority support' },
    proF4: { uk: 'Повна інтеграція', en: 'Full integration' },
    proF5: { uk: 'Налаштування за 14 днів', en: '14-day setup' },
    proF6: { uk: 'Необмежені операції', en: 'Unlimited operations' },
    proF7: { uk: 'Персональний менеджер', en: 'Dedicated account manager' },
    // Enterprise features
    entF1: { uk: 'Повна AI-інфраструктура', en: 'Complete AI infrastructure' },
    entF2: { uk: 'Багато агентів та процесів', en: 'Multiple agents & workflows' },
    entF3: { uk: 'Виділена команда підтримки', en: 'Dedicated support team' },
    entF4: { uk: 'Навчання кастомних моделей', en: 'Custom model training' },
    entF5: { uk: 'Гарантія SLA', en: 'SLA guarantee' },
    entF6: { uk: 'White-label рішення', en: 'White-label solution' },
    entF7: { uk: 'Розширена аналітика', en: 'Advanced analytics' },
  },
  
  // BookCall Section
  bookCall: {
    question: { uk: 'Хочете дізнатися більше?', en: 'Want to know more?' },
    title1: { uk: 'ЗАМОВИТИ', en: 'BOOK' },
    title2: { uk: 'ДЗВІНОК', en: 'INTRO CALL' },
    subtitle: { uk: 'Що ви отримаєте на безкоштовній зустрічі?', en: 'What do you get on this free meeting?' },
    benefit1Title: { uk: 'Відповіді', en: 'Q&A' },
    benefit1Desc: { uk: 'Отримайте відповіді на всі ваші питання', en: 'Get answers to all your questions' },
    benefit2Title: { uk: 'Індивідуальний підхід', en: 'Customized marketing' },
    benefit2Desc: { uk: 'Пропозиції та рекомендації для вашого бізнесу', en: 'Suggestions and follow up with key highlights' },
    benefit3Title: { uk: 'Стратегія росту', en: 'Product growth discussion' },
    benefit3Desc: { uk: 'План масштабування вашого бізнесу', en: 'Strategy for scaling your business' },
    benefit4Title: { uk: 'Експертна консультація', en: 'Essential guidance' },
    benefit4Desc: { uk: 'Найшвидший шлях до ваших цілей', en: 'On the quickest way to reach point B' },
    selectDay: { uk: 'Оберіть день', en: 'Select a Day' },
    selectTime: { uk: 'Оберіть час', en: 'Select a time' },
    timezone: { uk: 'Часовий пояс', en: 'Time zone' },
    continue: { uk: 'Продовжити:', en: 'Continue with' },
    completeBooking: { uk: 'Завершіть бронювання', en: 'Complete Your Booking' },
    yourName: { uk: 'Ваше ім\'я *', en: 'Your Name *' },
    email: { uk: 'Email *', en: 'Email Address *' },
    company: { uk: 'Компанія (необов\'язково)', en: 'Company (optional)' },
    yourCompany: { uk: 'Ваша компанія', en: 'Your Company' },
    whatDiscuss: { uk: 'Що б ви хотіли обговорити? (необов\'язково)', en: 'What would you like to discuss? (optional)' },
    tellUs: { uk: 'Розкажіть про ваш проект або питання...', en: 'Tell us about your project or questions...' },
    booking: { uk: 'Бронюємо...', en: 'Booking...' },
    confirmBooking: { uk: 'Підтвердити бронювання', en: 'Confirm Booking' },
    byBooking: { uk: 'Бронюючи, ви погоджуєтесь отримати лист-підтвердження від AI Insider.', en: 'By booking, you agree to receive a confirmation email from AI Insider.' },
    confirmed: { uk: 'Бронювання підтверджено! ✨', en: 'Booking Confirmed! ✨' },
    checkEmail: { uk: 'Перевірте вашу пошту для отримання деталей.', en: 'Check your email for confirmation details.' },
    date: { uk: 'Дата:', en: 'Date:' },
    time: { uk: 'Час:', en: 'Time:' },
  },
  
  // Footer
  footer: {
    description: { 
      uk: 'Ми створюємо AI-системи, що думають, говорять і діють — трансформуючи бізнес за допомогою інтелектуальної автоматизації та голосових агентів.',
      en: 'We build AI systems that think, speak, and act — transforming businesses with intelligent automation and voice agents.'
    },
    location: { uk: 'Базуємось у', en: 'Based in' },
    switzerland: { uk: 'Швейцарії', en: 'Switzerland' },
    workingGlobally: { uk: '— Працюємо глобально', en: '— Working globally' },
    quickLinks: { uk: 'Швидкі посилання', en: 'Quick Links' },
    getInTouch: { uk: 'Зв\'яжіться з нами', en: 'Get in Touch' },
    copyright: { uk: 'Створено з інтелектом, а не шаблонами.', en: 'Built with intelligence, not templates.' },
    rights: { uk: 'Всі права захищено. Зроблено з ❤️ у Швейцарії.', en: 'All rights reserved. Made with ❤️ in Switzerland.' },
    linkAbout: { uk: 'Про нас', en: 'About' },
    linkServices: { uk: 'Послуги', en: 'Services' },
    linkBlog: { uk: 'Блог', en: 'Blog' },
    linkSolutions: { uk: 'Рішення', en: 'Solutions' },
    linkCases: { uk: 'Кейси', en: 'Case Studies' },
    linkProjects: { uk: 'Проєкти', en: 'Projects' },
    linkPricing: { uk: 'Ціни', en: 'Pricing' },
    linkContact: { uk: 'Контакт', en: 'Contact' },
    // Footer sections
    company: { uk: 'Компанія', en: 'Company' },
    services: { uk: 'Послуги', en: 'Services' },
    resources: { uk: 'Ресурси', en: 'Resources' },
    // Service links
    linkChatbots: { uk: 'AI чатботи', en: 'AI Chatbots' },
    linkVoiceAgents: { uk: 'Голосові агенти', en: 'Voice Agents' },
    linkAutomation: { uk: 'Автоматизація', en: 'Automation' },
    linkCustomAgents: { uk: 'Кастомні агенти', en: 'Custom Agents' },
  },
  
  // Cases Page
  cases: {
    badge: { uk: 'Реальні AI впровадження', en: 'Real AI Implementations' },
    title1: { uk: 'Реальні кейси AI-автоматизації.', en: 'Real AI Automation Cases.' },
    title2: { uk: 'Реальні бізнес-результати.', en: 'Real Business Results.' },
    subtitle: { 
      uk: 'Дивіться як AI-чатботи та голосові агенти замінюють ручну роботу та генерують ліди для бізнесів як ваш.',
      en: 'See how AI chatbots and voice agents replace manual work and generate leads for businesses like yours.'
    },
    tryDemo: { uk: 'Спробувати AI демо', en: 'Try AI Demo' },
    bookDemo: { uk: 'Замовити демо', en: 'Book a Demo' },
    featured: { uk: 'Виділений', en: 'Featured' },
    problem: { uk: 'Проблема', en: 'Problem' },
    solution: { uk: 'Рішення', en: 'Solution' },
    results: { uk: 'Результати', en: 'Results' },
    technologies: { uk: 'Технології:', en: 'Tech Stack:' },
    readMore: { uk: 'Детальніше', en: 'Read More' },
    showing: { uk: 'Показано', en: 'Showing' },
    caseWord: { uk: 'кейсів', en: 'cases' },
    inCategory: { uk: 'в категорії', en: 'in' },
    noCases: { uk: 'Кейсів не знайдено', en: 'No cases found' },
    tryDifferent: { uk: 'Спробуйте вибрати іншу категорію', en: 'Try selecting a different category' },
    featuredCase: { uk: 'Виділений кейс • Просунута автоматизація', en: 'Featured Case • Advanced Automation' },
    // Stats
    stat1: { uk: 'Бізнесів автоматизовано', en: 'Businesses Automated' },
    stat2: { uk: 'Середня економія часу', en: 'Average Time Saved' },
    stat3: { uk: 'Доступність AI', en: 'AI Availability' },
    stat4: { uk: 'Зростання лідів', en: 'Lead Increase' },
    // Filters
    allCases: { uk: 'Всі кейси', en: 'All Cases' },
    ecommerce: { uk: 'E-commerce', en: 'E-commerce' },
    beauty: { uk: 'Краса', en: 'Beauty' },
    realEstate: { uk: 'Нерухомість', en: 'Real Estate' },
    voiceAgents: { uk: 'Голосові агенти', en: 'Voice Agents' },
    automation: { uk: 'Автоматизація', en: 'Automation' },
    socialImpact: { uk: 'Соціальний проект', en: 'Social Impact' },
  },
  
  // Conversion Section
  conversion: {
    badge: { uk: 'Готові до трансформації?', en: 'Ready to Transform?' },
    title1: { uk: 'Хочете такі самі результати', en: 'Want the same results' },
    title2: { uk: 'для свого бізнесу?', en: 'for your business?' },
    subtitle: { 
      uk: 'Ми будуємо кастомні AI-рішення, що автоматизують ваші процеси, залучають клієнтів та збільшують дохід.',
      en: 'We build custom AI solutions that automate your workflows, engage your customers, and grow your revenue.'
    },
    benefit1: { uk: 'Кастомна AI-логіка під ваш бізнес', en: 'Custom AI logic tailored to your business' },
    benefit2: { uk: 'Інтеграція чат + голосового агента', en: 'Chat + Voice agent integration' },
    benefit3: { uk: 'Інтеграція CRM та інструментів', en: 'CRM and tools integration' },
    benefit4: { uk: 'Масштабоване рішення що росте з вами', en: 'Scalable solution that grows with you' },
    bookDemo: { uk: 'Замовити демо', en: 'Book a Demo' },
    discussBusiness: { uk: 'Обговорити мій бізнес', en: 'Discuss My Business' },
    trust: { uk: 'Безкоштовна консультація • Без зобов\'язань • Відповідь протягом 24 годин', en: 'Free consultation • No commitment • Response within 24 hours' },
  },
  
  // About Page
  about: {
    badge: { uk: 'Про нас', en: 'About Us' },
    title1: { uk: 'Будуємо майбутнє', en: 'Building the Future of' },
    title2: { uk: 'Інтелектуальної автоматизації', en: 'Intelligent Automation' },
    subtitle: { 
      uk: 'Ми — команда ентузіастів AI, інженерів та візіонерів, що трансформують бізнес через інтелектуальну автоматизацію та голосові AI-технології.',
      en: 'We\'re a team of AI enthusiasts, engineers, and visionaries dedicated to transforming businesses through intelligent automation and voice AI technology.'
    },
    // GEO/AI-search summary (used in About structured data)
    geoIntro: {
      uk: 'AI Insider — студія AI‑автоматизації. Ми проєктуємо й впроваджуємо AI агентів, чатботів, голосових агентів і workflow‑автоматизацію (включно з n8n), щоб бізнес працював швидше, дешевше і стабільніше.',
      en: 'AI Insider is an AI automation studio. We design and deploy AI agents, chatbots, voice agents, and workflow automation (including n8n) so businesses operate faster, cheaper, and more reliably.',
    },
    // Structured sections for AI search (GEO)
    whoWeAreTitle: { uk: 'Хто ми', en: 'Who we are' },
    whoWeAreSubtitle: {
      uk: 'Сеньйорна команда, що будує production‑ready AI системи для бізнесу — з фокусом на результат, безпеку та вимірюваний ROI.',
      en: 'A senior team building production-ready AI systems for business — focused on outcomes, safety, and measurable ROI.',
    },
    whatWeDoTitle: { uk: 'Що ми робимо', en: 'What we do' },
    whatWeDoSubtitle: {
      uk: 'Ми не продаємо “AI‑магію”. Ми будуємо системи, які виконують роботу: автоматизують процеси, відповідають клієнтам, бронюють зустрічі та рухають ліди по воронці.',
      en: 'We don’t sell “AI magic”. We build systems that do work: automate operations, support customers, book meetings, and move leads through your funnel.',
    },
    whatWeDoP1: { uk: 'Типові рішення, які ми впроваджуємо:', en: 'Typical systems we ship:' },
    whatWeDoPoint1: { uk: 'AI automation audit: карта процесів, вузькі місця, ROI‑модель', en: 'AI automation audit: process map, bottlenecks, ROI model' },
    whatWeDoPoint2: { uk: 'AI агенти: виконують дії в CRM, helpdesk, календарі та інструментах', en: 'AI agents: take actions in CRM, helpdesk, calendars, and tools' },
    whatWeDoPoint3: { uk: 'AI voice agents: дзвінки, кваліфікація, бронювання, нагадування', en: 'AI voice agents: calls, qualification, booking, reminders' },
    whatWeDoPoint4: { uk: 'RAG / knowledge assistants: відповіді з ваших документів з посиланнями на джерела', en: 'RAG / knowledge assistants: source-grounded answers from your docs' },
    whatWeDoPoint5: { uk: 'n8n workflow automation: інтеграції, webhooks, маршрутизація, SLA‑алерти', en: 'n8n workflow automation: integrations, webhooks, routing, SLA alerts' },
    whatWeDoPoint6: { uk: 'AI‑маркетинг системи: контент‑пайплайн, repurposing, персоналізація, атрибуція', en: 'AI marketing systems: content pipeline, repurposing, personalization, attribution' },
    howWeHelpTitle: { uk: 'Як ми допомагаємо бізнесу', en: 'How we help businesses' },
    howWeHelpSubtitle: {
      uk: 'Ви отримуєте чіткий план, швидкий запуск і контроль якості. Ніяких “впровадили і забули” — ми будуємо та ітеруємо.',
      en: 'You get a clear plan, a fast launch, and quality control. No “ship and forget” — we build, measure, and iterate.',
    },
    howWeHelpStep1Title: { uk: 'Діагностика', en: 'Discovery' },
    howWeHelpStep1Desc: { uk: 'Аудит процесів, даних і каналів. Визначаємо “де болить” і що дасть найбільший ROI.', en: 'We audit workflows, data, and channels to find the highest-ROI automation opportunities.' },
    howWeHelpStep2Title: { uk: 'Дизайн системи', en: 'System design' },
    howWeHelpStep2Desc: { uk: 'Архітектура, інтеграції, гардрейли, метрики якості, план запуску.', en: 'Architecture, integrations, guardrails, quality metrics, and a launch plan.' },
    howWeHelpStep3Title: { uk: 'Впровадження', en: 'Implementation' },
    howWeHelpStep3Desc: { uk: 'Збірка, тестування, запуск у production, навчання команди.', en: 'Build, test, deploy to production, and train your team.' },
    howWeHelpStep4Title: { uk: 'Масштабування', en: 'Scaling' },
    howWeHelpStep4Desc: { uk: 'Моніторинг, A/B тести, оптимізація промптів, розширення use cases.', en: 'Monitoring, A/B tests, prompt optimization, and expanding use cases.' },
    industriesTitle: { uk: 'Індустрії, з якими ми працюємо', en: 'Industries we serve' },
    industriesSubtitle: {
      uk: 'Ми адаптуємо AI системи під конкретні процеси та дані — не під “універсальний шаблон”.',
      en: 'We tailor AI systems to your workflows and data — not generic templates.',
    },
    industriesPoint1: { uk: 'E-commerce: підтримка, upsell, recovery, WhatsApp‑флоу', en: 'E-commerce: support, upsell, recovery, WhatsApp flows' },
    industriesPoint2: { uk: 'Нерухомість: дзвінки, кваліфікація, запис на перегляд, CRM', en: 'Real estate: calls, qualification, viewing booking, CRM' },
    industriesPoint3: { uk: 'Сервісні бізнеси: ліди, записи, нагадування, операційні процеси', en: 'Service businesses: leads, booking, reminders, operations' },
    industriesPoint4: { uk: 'B2B/SaaS: RAG асистенти, onboarding, sales enablement', en: 'B2B/SaaS: RAG assistants, onboarding, sales enablement' },
    industriesPoint5: { uk: 'Маркетинг/агенції: контент‑системи, VSL, креативи, атрибуція', en: 'Marketing/agencies: content systems, VSL, creatives, attribution' },
    technologiesTitle: { uk: 'Технології, які ми використовуємо', en: 'Technologies we use' },
    technologiesSubtitle: {
      uk: 'Підбираємо стек під задачу: від швидких інтеграцій у n8n до кастомних агентів з tool‑use, RAG і оцінкою якості.',
      en: 'We choose the stack per use case — from fast n8n integrations to custom tool-using agents with RAG and evaluation.',
    },
    whyDifferentTitle: { uk: 'Чим AI Insider відрізняється', en: 'Why AI Insider is different' },
    whyDifferentSubtitle: {
      uk: 'Ми мислимо як інженери та як growth‑команда: важливі не “відповіді AI”, а бізнес‑результат.',
      en: 'We think like engineers and a growth team: not “AI responses”, but business outcomes.',
    },
    whyDifferentPoint1: { uk: 'Production‑ready: логування, моніторинг, контроль якості', en: 'Production-ready: logging, monitoring, quality control' },
    whyDifferentPoint2: { uk: 'Guardrails: безпечні обмеження та ескалація на людину', en: 'Guardrails: safe boundaries and human escalation' },
    whyDifferentPoint3: { uk: 'ROI‑підхід: чіткі KPI, вимірюваний вплив, швидкі ітерації', en: 'ROI-first: clear KPIs, measurable impact, fast iteration' },
    whyDifferentPoint4: { uk: 'Bilingual: українська та англійська — для локальних і глобальних ринків', en: 'Bilingual: Ukrainian + English for local and global markets' },
    // Q&A for GEO (shown on About page + FAQ schema)
    geoFaqTitle: { uk: 'Питання та відповіді', en: 'Questions & answers' },
    geoFaqSubtitle: {
      uk: 'Короткі, прямі відповіді на питання, які зазвичай ставлять перед впровадженням AI.',
      en: 'Short, direct answers to the questions people ask before deploying AI.',
    },
    geoQ1: { uk: 'Що робить AI Insider?', en: 'What does AI Insider do?' },
    geoA1: {
      uk: 'Ми проєктуємо та впроваджуємо AI‑автоматизацію для бізнесу: чатботи, голосові агенти, AI агенти з tool‑use та workflow‑інтеграції. Наша мета — зняти рутину з команди та підняти конверсії, швидкість і якість процесів.',
      en: 'We design and deploy AI automation for business: chatbots, voice agents, tool-using AI agents, and workflow integrations. The goal is to remove repetitive work and improve conversion, speed, and process quality.',
    },
    geoQ2: { uk: 'Як AI автоматизація покращує мій бізнес?', en: 'How can AI automation improve my business?' },
    geoA2: {
      uk: 'AI автоматизація скорочує час відповіді, зменшує помилки, знижує витрати й дає 24/7 покриття для лідів та підтримки. Найкраще вона працює там, де є повторювані задачі, правила і дані (CRM, тікети, дзвінки, документи).',
      en: 'AI automation reduces response time, lowers errors, cuts costs, and provides 24/7 coverage for leads and support. It works best for repetitive tasks with rules and data (CRM, tickets, calls, documents).',
    },
    geoQ3: { uk: 'Що таке AI voice agent?', en: 'What is an AI voice agent?' },
    geoA3: {
      uk: 'AI voice agent — це голосовий AI, який веде розмову телефоном, ставить кваліфікаційні питання, бронює слоти в календарі та фіксує результат у CRM. У production‑версії він має сценарії, обмеження тем, ескалацію на людину та аудит‑логи.',
      en: 'An AI voice agent is a voice system that can handle phone conversations, ask qualification questions, book calendar slots, and log outcomes to your CRM. In production, it includes scripts, topic boundaries, human escalation, and audit logs.',
    },
    geoQ4: { uk: 'Як працює n8n автоматизація?', en: 'How does n8n automation work?' },
    geoA4: {
      uk: 'n8n — це інструмент для автоматизації воркфлоу через інтеграції та webhooks. Ми збираємо процес як ланцюжок кроків (тригери → перевірки → дії), підключаємо CRM/пошту/месенджери та додаємо моніторинг, retries і алерти.',
      en: 'n8n is a workflow automation tool built around integrations and webhooks. We model your process as steps (triggers → checks → actions), connect CRM/email/messengers, and add monitoring, retries, and alerts.',
    },
    ourStory: { uk: 'Наша', en: 'Our' },
    story: { uk: 'історія', en: 'Story' },
    storyP1: { 
      uk: 'Заснований у 2023 році, AI Insider з\'явився з простого спостереження: бізнеси потопали в рутинних завданнях, поки AI-технології залишались замкненими в дослідницьких лабораторіях.',
      en: 'Founded in 2023, AI Insider emerged from a simple observation: businesses were drowning in repetitive tasks while AI technology remained locked in research labs.'
    },
    storyP2: { 
      uk: 'Ми побачили можливість подолати цей розрив — принести AI-можливості корпоративного рівня компаніям будь-якого розміру, зробивши інтелектуальну автоматизацію доступною.',
      en: 'We saw an opportunity to bridge this gap — to bring enterprise-grade AI capabilities to companies of all sizes, making intelligent automation accessible and affordable.'
    },
    storyP3: { 
      uk: 'Сьогодні ми допомогли понад 50 бізнесам автоматизувати процеси, впровадити голосових агентів та досягти нових рівнів ефективності. Наша місія незмінна: демократизувати AI та дати бізнесам змогу фокусуватись на тому, що справді важливо.',
      en: 'Today, we\'ve helped over 50 businesses automate their workflows, deploy voice agents, and unlock new levels of efficiency. Our mission remains unchanged: democratize AI and empower businesses to focus on what truly matters.'
    },
    stat1: { uk: 'Проектів виконано', en: 'Projects Delivered' },
    stat2: { uk: 'Задоволеність клієнтів', en: 'Client Satisfaction' },
    stat3: { uk: 'Доступність AI', en: 'AI Uptime' },
    stat4: { uk: 'Середнє зростання ROI', en: 'Avg. ROI Increase' },
    ourValues: { uk: 'Наші', en: 'Our' },
    values: { uk: 'цінності', en: 'Values' },
    valuesSubtitle: { uk: 'Принципи, що керують усім, що ми робимо.', en: 'The principles that guide everything we do.' },
    value1Title: { uk: 'Інновації передусім', en: 'Innovation First' },
    value1Desc: { uk: 'Ми розширюємо межі та використовуємо передові технології для створення рішень, що переосмислюють можливе.', en: 'We push boundaries and embrace cutting-edge technology to deliver solutions that redefine what\'s possible.' },
    value2Title: { uk: 'Орієнтація на результат', en: 'Results Driven' },
    value2Desc: { uk: 'Кожне рішення вимірюється його впливом. Ми одержимі досягненням відчутного ROI для клієнтів.', en: 'Every solution we build is measured by its impact. We\'re obsessed with delivering tangible ROI for our clients.' },
    value3Title: { uk: 'Швидкість та якість', en: 'Speed & Excellence' },
    value3Desc: { uk: 'Ми рухаємось швидко без втрати якості. Наш agile-підхід забезпечує швидке впровадження з точністю.', en: 'We move fast without sacrificing quality. Our agile approach ensures rapid deployment with precision.' },
    value4Title: { uk: 'Партнерство з клієнтами', en: 'Client Partnership' },
    value4Desc: { uk: 'Ми не просто виконуємо проекти — ми стаємо стратегічними партнерами, інвестованими у ваш довгостроковий успіх.', en: 'We don\'t just deliver projects — we become strategic partners invested in your long-term success.' },
    theTeam: { uk: 'Команда', en: 'The Team' },
    meetThe: { uk: 'Познайомтесь з', en: 'Meet the' },
    minds: { uk: 'командою', en: 'Minds' },
    behindAI: { uk: 'AI Insider', en: 'Behind AI Insider' },
    teamSubtitle: { uk: 'Пристрасна команда інноваторів, що трансформують ваш бізнес.', en: 'A passionate team of innovators dedicated to transforming your business.' },
    readyToWork: { uk: 'Готові працювати з нами?', en: 'Ready to Work with Us?' },
    letsDiscuss: { uk: 'Обговоримо як ми можемо трансформувати ваш бізнес за допомогою AI.', en: 'Let\'s discuss how we can transform your business with AI.' },
    bookFreeConsult: { uk: 'Замовити безкоштовну консультацію', en: 'Book a Free Consultation' },
    // Team members
    member1Name: { uk: 'Владислав Арчер', en: 'Vladyslav Archer' },
    member1Role: { uk: 'CEO', en: 'CEO' },
    member1Bio: {
      uk: 'CEO AI Insider. Поєднує інженерне мислення з growth-підходом — від стратегії автоматизації до запуску production-ready AI систем, які реально знімають рутину з команди. Фокус: чисті процеси, зрозумілі метрики та швидкі ітерації.',
      en: 'CEO at AI Insider. Blends engineering with growth thinking — from automation strategy to production-ready AI systems that remove bottlenecks and deliver measurable ROI. Focused on clean processes, clear metrics, and fast iteration.',
    },
    member2Name: { uk: 'Юлія', en: 'Yuliia' },
    member2Role: { uk: 'Product Designer (UI/UX)', en: 'Product Designer (UI/UX)' },
    member2Bio: {
      uk: 'Перетворює складні AI-процеси на зрозумілий UX, який хочеться використовувати. Відповідає за UI/UX, дизайн-систему та креативи для лендингів і performance-кампаній — з фокусом на ясність і конверсію.',
      en: 'Turns complex AI workflows into clear, conversion-friendly UX. Owns UI/UX, design systems, and landing/ad creatives for performance campaigns — with a focus on clarity and conversion.',
    },
    member3Name: { uk: 'Володимир', en: 'Volodymyr' },
    member3Role: { uk: 'Operations Manager', en: 'Operations Manager' },
    member3Bio: {
      uk: 'Відповідає за операційну частину: процеси, CRM-дисципліну, контроль якості та SLA. Також веде лідогенерацію — налаштовує воронки, тестує канали і забезпечує стабільний потік кваліфікованих лідів.',
      en: 'Owns operations: processes, CRM hygiene, quality control, and SLA. Also runs lead generation — builds funnels, tests channels, and keeps a steady flow of qualified leads.',
    },
    aiAssistant1Name: { uk: 'AI Помічник Дизайнера', en: 'AI Design Assistant' },
    aiAssistant1Role: { uk: 'AI Assistant · Design', en: 'AI Assistant · Design' },
    aiAssistant1Bio: {
      uk: 'Генерує варіанти лейаутів, підбирає палітри та створює мокапи за секунди. Автоматизує рутину дизайн-процесу — від ресайзу банерів до генерації UI-компонентів, звільняючи час на стратегічні рішення.',
      en: 'Generates layout variations, selects color palettes and creates mockups in seconds. Automates design routine — from banner resizing to UI component generation, freeing time for strategic decisions.',
    },
    aiAssistant2Name: { uk: 'AI SEO Спеціаліст', en: 'AI SEO Specialist' },
    aiAssistant2Role: { uk: 'AI Assistant · SEO', en: 'AI Assistant · SEO' },
    aiAssistant2Bio: {
      uk: 'Аналізує ключові слова, аудитує технічне SEO та генерує оптимізований контент. Моніторить позиції, знаходить точки росту трафіку і формує рекомендації на основі актуальних алгоритмів пошукових систем.',
      en: 'Analyzes keywords, audits technical SEO and generates optimized content. Monitors rankings, finds traffic growth opportunities and forms recommendations based on current search engine algorithms.',
    },
    aiAssistant3Name: { uk: 'AI SMM Менеджер', en: 'AI Social Media Manager' },
    aiAssistant3Role: { uk: 'AI Assistant · SMM', en: 'AI Assistant · SMM' },
    aiAssistant3Bio: {
      uk: 'Планує контент-календар, генерує пости та аналізує engagement. Відповідає за tone of voice бренду в соціальних мережах, автоматизує публікації та адаптує контент під кожну платформу.',
      en: 'Plans content calendar, generates posts and analyzes engagement. Maintains brand tone of voice across social media, automates publishing and adapts content for each platform.',
    },
    aiAssistantsTitle: { uk: 'AI Асистенти', en: 'AI Assistants' },
    aiAssistantsSubtitle: {
      uk: 'Наші AI-помічники працюють 24/7 — підсилюючи кожного члена команди',
      en: 'Our AI assistants work 24/7 — amplifying every team member',
    },
    aiAssistantNewBadge: { uk: 'Новий', en: 'New' },
  },
  
  // Testimonials Section (Roadmap Style)
  testimonials: {
    badge: { uk: 'Шлях клієнта', en: 'Client Journey' },
    title1: { uk: 'Від проблеми', en: 'From Problem' },
    title2: { uk: 'до результату', en: 'to Results' },
    subtitle: { uk: 'Подивіться як наші клієнти трансформували свій бізнес на кожному етапі.', en: 'See how our clients transformed their business at every stage.' },
    // Phase labels
    phase1: { uk: 'Виявлення потреби', en: 'Discovery' },
    phase2: { uk: 'Впровадження', en: 'Implementation' },
    phase3: { uk: 'Масштабування', en: 'Scaling' },
    phase4: { uk: 'Результат', en: 'Results' },
    // Testimonial quotes
    quote1: { 
      uk: 'Наша команда підтримки тонула в одних і тих же питаннях. AI Insider проаналізували наші процеси і знайшли ідеальне рішення.',
      en: 'Our support team was drowning in repetitive questions. AI Insider analyzed our workflows and found the perfect solution.'
    },
    quote2: { 
      uk: 'Голосовий агент бронює зустрічі швидше, ніж могла б наша команда продажів. Ми збільшили конверсії на 140%.',
      en: 'The voice agent books meetings faster than our sales team ever could. We increased conversions by 140%.'
    },
    quote3: { 
      uk: 'Інтеграція була бездоганною. Тепер наш AI обробляє 80% запитів автоматично, а команда фокусується на складних кейсах.',
      en: 'Integration was seamless. Now our AI handles 80% of inquiries automatically, and the team focuses on complex cases.'
    },
    quote4: { 
      uk: 'За 6 місяців AI-система повністю окупилась. ROI перевищив 400%. Це була найкраща інвестиція року.',
      en: 'Within 6 months, the AI system paid for itself. ROI exceeded 400%. It was the best investment of the year.'
    },
    // Companies
    company1: { uk: 'TechCorp', en: 'TechCorp' },
    company2: { uk: 'SalesFlow', en: 'SalesFlow' },
    company3: { uk: 'StartupXYZ', en: 'StartupXYZ' },
    company4: { uk: 'Innovate AG', en: 'Innovate AG' },
    // Results
    result1: { uk: 'Зменшено час підтримки на 70%', en: 'Reduced support time by 70%' },
    result2: { uk: '+140% конверсій за 3 місяці', en: '+140% conversions in 3 months' },
    result3: { uk: '80% запитів автоматизовано', en: '80% of inquiries automated' },
    result4: { uk: 'ROI 400%+ за 6 місяців', en: '400%+ ROI in 6 months' },
    // CTA
    ctaTitle: { uk: 'Готові почати свій шлях?', en: 'Ready to Start Your Journey?' },
    ctaSubtitle: { uk: 'Приєднуйтесь до 50+ компаній, що вже трансформували свій бізнес з AI.', en: 'Join 50+ companies that have already transformed their business with AI.' },
    ctaButton: { uk: 'Почати зараз', en: 'Start Your Journey' },
  },

  // Language switcher
  lang: {
    switchTo: { uk: 'EN', en: 'UA' },
    current: { uk: 'UA', en: 'EN' },
  },
  
  // Contact Section
  contact: {
    badge: { uk: 'Зв\'яжіться з нами', en: 'Get in Touch' },
    title1: { uk: 'Давайте створимо щось', en: 'Let\'s Build Something' },
    title2: { uk: 'Неймовірне', en: 'Extraordinary' },
    subtitle: { uk: 'Готові трансформувати ваш бізнес з AI? Давайте поговоримо.', en: 'Ready to transform your business with AI? Let\'s talk.' },
    nameLabel: { uk: 'Ім\'я', en: 'Name' },
    namePlaceholder: { uk: 'Ваше ім\'я', en: 'Your name' },
    emailLabel: { uk: 'Email', en: 'Email' },
    emailPlaceholder: { uk: 'ваш@email.com', en: 'your@email.com' },
    messageLabel: { uk: 'Повідомлення', en: 'Message' },
    messagePlaceholder: { uk: 'Розкажіть про ваш проект...', en: 'Tell us about your project...' },
    sendMessage: { uk: 'Надіслати повідомлення', en: 'Send Message' },
    bookCall: { uk: 'Замовити дзвінок', en: 'Book a Call' },
    telegram: { uk: 'Telegram', en: 'Telegram' },
    instantMessaging: { uk: 'Миттєві повідомлення', en: 'Instant messaging' },
    email: { uk: 'Email', en: 'Email' },
    forDetailed: { uk: 'Для детальних запитів', en: 'For detailed inquiries' },
    quickResponse: { uk: 'Швидка відповідь', en: 'Quick Response' },
    responseTime: { uk: 'Зазвичай відповідаємо протягом 24 годин. Для термінових питань — пишіть в Telegram.', en: 'We typically respond within 24 hours. For urgent matters, reach out on Telegram.' },
    usuallyOnline: { uk: 'Зазвичай онлайн', en: 'Usually online' },
  },

  // Products Page
  products: {
    badge: { uk: 'Продукти AI Insider', en: 'AI Insider Products' },
    title1: { uk: 'Готові AI‑продукти,', en: 'Ready AI products that' },
    title2: { uk: 'що приносять гроші', en: 'drive revenue' },
    subtitle: {
      uk: 'Ми не просто консалтинг — ми будуємо власні SaaS‑продукти, які щодня працюють у реальних бізнесах. Купуйте готове замість місяців розробки.',
      en: 'More than consulting — we build our own SaaS products running in real businesses every day. Skip months of development and buy production-ready.',
    },
    allProducts: { uk: 'Всі продукти', en: 'All products' },
    live: { uk: 'В production', en: 'Live' },
    beta: { uk: 'Бета', en: 'Beta' },
    comingSoon: { uk: 'Скоро', en: 'Coming soon' },
    viewProduct: { uk: 'Дивитись продукт', en: 'View product' },
    getNotified: { uk: 'Повідомити про запуск', en: 'Notify me at launch' },
    startFrom: { uk: 'від', en: 'from' },
    perMonth: { uk: '/міс', en: '/mo' },
    // Product: Content Factory
    p1Name: { uk: 'Content Factory', en: 'Content Factory' },
    p1Tag: { uk: 'AI‑контент 24/7', en: 'AI content 24/7' },
    p1Desc: {
      uk: '500+ постів на місяць на автопілоті: ресеч ідей, генерація постів і відео, Telegram‑апрув, автопостинг у всі соцмережі.',
      en: '500+ pieces per month on autopilot: idea research, AI post and video generation, Telegram approval, and auto-publishing to every social platform.',
    },
    p1Feat1: { uk: 'Research + генерація ідей', en: 'Research + idea generation' },
    p1Feat2: { uk: 'Telegram‑апрув перед публікацією', en: 'Telegram approval before publishing' },
    p1Feat3: { uk: 'Автопостинг в IG/TG/X/LinkedIn', en: 'Auto-publish to IG/TG/X/LinkedIn' },
    // Product: Sweezy
    p2Name: { uk: 'Sweezy', en: 'Sweezy' },
    p2Tag: { uk: 'AI‑агент знайомств', en: 'AI dating wingman' },
    p2Desc: {
      uk: 'AI‑продукт, що веде листування в додатках знайомств, домовляється про зустрічі та підвищує метчі й конверсію в побачення.',
      en: 'AI product that runs chats on dating apps, schedules meetings, and boosts matches and date conversion.',
    },
    p2Feat1: { uk: 'Розумні відповіді у стилі користувача', en: 'On-brand replies in user’s tone' },
    p2Feat2: { uk: 'Автодомовленості про зустрічі', en: 'Auto-scheduled meetings' },
    p2Feat3: { uk: 'Аналітика по метчам і побаченням', en: 'Analytics on matches & dates' },
    // Product: AI Receptionist
    p3Name: { uk: 'AI Receptionist', en: 'AI Receptionist' },
    p3Tag: { uk: 'Голосовий адміністратор', en: 'Voice front desk' },
    p3Desc: {
      uk: 'Голосовий AI‑агент, що приймає дзвінки 24/7, відповідає на питання, записує клієнтів і передає дані в CRM.',
      en: 'A voice AI agent answering calls 24/7, handling FAQs, booking appointments, and pushing data to your CRM.',
    },
    p3Feat1: { uk: 'Людський голос, 25+ мов', en: 'Human voice, 25+ languages' },
    p3Feat2: { uk: 'Запис у календар + CRM', en: 'Calendar + CRM booking' },
    p3Feat3: { uk: 'Ескалація на менеджера', en: 'Human escalation' },
    // Product: AI SDR
    p4Name: { uk: 'AI SDR', en: 'AI SDR' },
    p4Tag: { uk: 'Автоматичний пошук клієнтів', en: 'Automated outbound' },
    p4Desc: {
      uk: 'AI‑менеджер продажів: шукає ICP‑лідів, пише персоналізовані повідомлення, веде follow‑up і бронює зустрічі.',
      en: 'AI sales rep: sources ICP leads, writes personalized outreach, runs follow-ups, and books meetings.',
    },
    p4Feat1: { uk: 'ICP research + збагачення', en: 'ICP research + enrichment' },
    p4Feat2: { uk: 'Персоналізовані sequences', en: 'Personalized sequences' },
    p4Feat3: { uk: 'Автозапис у календар', en: 'Auto-booked meetings' },
    // Benefits
    benefitsTitle: { uk: 'Чому готовий продукт > розробка з нуля', en: 'Why our products > custom build' },
    benefit1Title: { uk: 'Запуск за дні, не місяці', en: 'Live in days, not months' },
    benefit1Desc: { uk: 'Продукти вже в production. Ми підключаємо ваші канали, дані й CRM — і запускаємо.', en: 'Products already in production. We connect your channels, data, and CRM — and go live.' },
    benefit2Title: { uk: 'Фіксована ціна', en: 'Flat pricing' },
    benefit2Desc: { uk: 'Прозорі плани замість “будемо обговорювати”. Без сюрпризів у рахунку.', en: 'Transparent plans instead of “let’s scope it out”. No invoice surprises.' },
    benefit3Title: { uk: 'Оновлення та підтримка', en: 'Updates & support' },
    benefit3Desc: { uk: 'Продукти розвиваються — ви отримуєте нові можливості без додаткової розробки.', en: 'Our products evolve — you get new features without custom work.' },
    benefit4Title: { uk: 'Перевірено в бою', en: 'Battle-tested' },
    benefit4Desc: { uk: 'Сотні клієнтських запусків. Ми вже знаємо, де ламається — і як це тримати.', en: 'Hundreds of deployments. We already know what breaks — and how to keep it running.' },
    // Bottom CTA
    ctaTitle: { uk: 'Не знайшли свій use‑case?', en: 'Don’t see your use case?' },
    ctaSubtitle: { uk: 'Ми будуємо кастомні AI‑системи під ваш бізнес.', en: 'We also build custom AI systems tailored to your business.' },
    ctaBtn: { uk: 'Обговорити кастомне рішення', en: 'Discuss a custom solution' },
  },

  // Partners Page (Referral Program)
  partners: {
    badge: { uk: 'Партнерська програма', en: 'Partner Program' },
    title1: { uk: 'Заробляйте разом з', en: 'Earn with' },
    title2: { uk: 'AI Insider', en: 'AI Insider' },
    subtitle: {
      uk: 'Приводьте бізнеси, яким потрібна AI‑автоматизація — ми закриваємо, впроваджуємо і виплачуємо вам до 25% від угоди. Регулярно, без стелі.',
      en: 'Bring us businesses that need AI automation — we close, we deliver, and we pay you up to 25% of the deal. Recurring, uncapped.',
    },
    becomeCTA: { uk: 'Стати партнером', en: 'Become a partner' },
    learnMore: { uk: 'Як це працює', en: 'How it works' },
    // Stats
    statCommission: { uk: 'Комісія з угоди', en: 'Deal commission' },
    statRecurring: { uk: 'Повторна виплата', en: 'Recurring payouts' },
    statPayout: { uk: 'Виплата за', en: 'Payout within' },
    // How it works
    howTitle: { uk: 'Як працює програма', en: 'How the program works' },
    howSubtitle: { uk: '3 кроки — і перша виплата вже у вас на рахунку.', en: '3 steps — and your first payout is in your account.' },
    step1Title: { uk: 'Реєструєтесь', en: 'Sign up' },
    step1Desc: { uk: 'Заповнюєте коротку заявку — ми розглядаємо протягом 48 годин і видаємо унікальне партнерське посилання та матеріали.', en: 'Fill in a short application — we approve within 48 hours and issue your unique partner link with sales assets.' },
    step2Title: { uk: 'Рекомендуєте', en: 'Refer' },
    step2Desc: { uk: 'Ділитесь нами з клієнтами, у мережі чи через своє агентство. Ми беремо на себе дзвінок, пропозицію та впровадження.', en: 'Share us with clients, your network, or through your agency. We handle the call, proposal, and delivery.' },
    step3Title: { uk: 'Отримуєте %', en: 'Get paid' },
    step3Desc: { uk: 'Угода закрита → ми платимо комісію. Клієнт на ретейнері → ви отримуєте повторні виплати щомісяця.', en: 'Deal closed → we pay commission. Retainer client → you get recurring payouts every month.' },
    // Tiers
    tiersTitle: { uk: 'Тіри комісії', en: 'Commission tiers' },
    tiersSubtitle: { uk: 'Чим більше закритих угод — тим вища твоя ставка.', en: 'The more deals you close — the higher your rate.' },
    tier1Name: { uk: 'Starter', en: 'Starter' },
    tier1Range: { uk: '1–2 клієнти', en: '1–2 clients' },
    tier1Rate: { uk: '15%', en: '15%' },
    tier1Desc: { uk: 'Стартова ставка від першої угоди.', en: 'Starting rate from your first deal.' },
    tier2Name: { uk: 'Partner', en: 'Partner' },
    tier2Range: { uk: '3–5 клієнтів', en: '3–5 clients' },
    tier2Rate: { uk: '20%', en: '20%' },
    tier2Desc: { uk: 'Повторні виплати + пріоритетна підтримка менеджером.', en: 'Recurring payouts + priority support from a partner manager.' },
    tier3Name: { uk: 'Elite', en: 'Elite' },
    tier3Range: { uk: '6+ клієнтів', en: '6+ clients' },
    tier3Rate: { uk: '25%', en: '25%' },
    tier3Desc: { uk: 'Максимальна ставка, co‑marketing, доступ до кастомних продуктів.', en: 'Top rate, co-marketing, access to custom products.' },
    // Who is this for
    whoTitle: { uk: 'Для кого це', en: 'Who is this for' },
    whoSubtitle: { uk: 'Якщо у вас є аудиторія бізнесів, яким потрібна AI‑автоматизація — ми спрацюємось.', en: 'If you have an audience of businesses that need AI automation — we’ll be a match.' },
    who1: { uk: 'Консультанти та фрілансери', en: 'Consultants & freelancers' },
    who2: { uk: 'Маркетингові/SMM‑агентства', en: 'Marketing/SMM agencies' },
    who3: { uk: 'Web‑студії та інтегратори', en: 'Web studios & integrators' },
    who4: { uk: 'Sales‑менеджери та лідогенератори', en: 'Sales managers & lead gen pros' },
    who5: { uk: 'Інфлюенсери B2B‑ніші', en: 'B2B niche influencers' },
    who6: { uk: 'Бухгалтери, юристи, фінансисти', en: 'Accountants, lawyers, finance pros' },
    // Benefits
    benefitsTitle: { uk: 'Що ви отримуєте', en: 'What you get' },
    benefit1Title: { uk: 'До 25% з угоди', en: 'Up to 25% per deal' },
    benefit1Desc: { uk: 'Виплата по факту отримання оплати від клієнта. Без “через 90 днів”.', en: 'Paid the moment the client pays us. No “wait 90 days”.' },
    benefit2Title: { uk: 'Повторна комісія', en: 'Recurring commission' },
    benefit2Desc: { uk: 'Клієнт платить щомісяця — ви отримуєте % кожного місяця, поки він активний.', en: 'Client pays monthly — you get % every month while they stay active.' },
    benefit3Title: { uk: 'Готові матеріали', en: 'Ready-made assets' },
    benefit3Desc: { uk: 'Декі, демо, кейси, посадочні сторінки. Вам не треба нічого придумувати.', en: 'Decks, demos, case studies, landing pages. Nothing for you to invent.' },
    benefit4Title: { uk: 'Персональний менеджер', en: 'Personal manager' },
    benefit4Desc: { uk: 'Виділена людина з нашого боку — від першого ліда до закриття угоди.', en: 'A dedicated person on our side — from first lead to deal close.' },
    benefit5Title: { uk: 'Прозоре відстеження', en: 'Transparent tracking' },
    benefit5Desc: { uk: 'Дашборд з лідами, статусами та нарахуваннями. Ніяких “чорних скриньок”.', en: 'Dashboard with leads, statuses, and earnings. No black boxes.' },
    benefit6Title: { uk: 'Без ексклюзиву', en: 'No exclusivity' },
    benefit6Desc: { uk: 'Можете працювати з іншими продуктами паралельно. Ми віримо в конкуренцію.', en: 'Work with other products in parallel. We believe in competition.' },
    // FAQ
    faqTitle: { uk: 'Часті питання', en: 'FAQ' },
    faq1Q: { uk: 'Коли я отримаю першу виплату?', en: 'When do I get my first payout?' },
    faq1A: { uk: 'Одразу після того, як клієнт оплатив нам. Зазвичай 7–14 днів від моменту заведення ліда до закриття угоди.', en: 'Right after the client pays us. Usually 7–14 days from first lead to closed deal.' },
    faq2Q: { uk: 'Чи потрібно мені самому продавати?', en: 'Do I need to sell anything myself?' },
    faq2A: { uk: 'Ні. Ваша роль — познайомити. Продаж, пропозицію і впровадження ведемо ми.', en: 'No. Your job is the intro. We handle the call, proposal, and delivery.' },
    faq3Q: { uk: 'Що рахується за “приведеного ліда”?', en: 'What counts as a referred lead?' },
    faq3A: { uk: 'Будь‑яка нова компанія, що потрапила до нас через ваше посилання або промокод. Відстеження прозоре в дашборді.', en: 'Any new company that reaches us via your link or code. Tracking is transparent in the dashboard.' },
    faq4Q: { uk: 'Чи є мінімум по клієнтах?', en: 'Is there a minimum number of clients?' },
    faq4A: { uk: 'Ні. Можете привести одного — і отримати виплату. Ми не ставимо квоти.', en: 'No. Bring just one — still get paid. No quotas.' },
    faq5Q: { uk: 'Можу я привести клієнта з іншої країни?', en: 'Can I refer clients from another country?' },
    faq5A: { uk: 'Так, ми працюємо глобально. Швейцарія, ЄС, США, UAE, Україна — всюди.', en: 'Yes, we work globally. Switzerland, EU, US, UAE, Ukraine — anywhere.' },
    // Bottom CTA
    bottomCtaTitle: { uk: 'Готові почати заробляти?', en: 'Ready to start earning?' },
    bottomCtaSubtitle: { uk: 'Розгляд заявки — 48 годин. Вхід безкоштовний.', en: 'Application review — 48 hours. Free to join.' },
    bottomCtaBtn: { uk: 'Стати партнером', en: 'Become a partner' },
  },

  // Become a Partner Page (Application form)
  becomePartner: {
    badge: { uk: 'Заявка на партнерство', en: 'Partner application' },
    title1: { uk: 'Давайте', en: 'Let’s' },
    title2: { uk: 'співпрацювати', en: 'team up' },
    subtitle: {
      uk: 'Заповніть форму — менеджер зв’яжеться протягом 48 годин, видасть партнерське посилання і матеріали.',
      en: 'Fill in the form — a manager will reach out within 48 hours with your partner link and sales assets.',
    },
    // Form labels
    nameLabel: { uk: 'Ім’я та прізвище *', en: 'Full name *' },
    namePlaceholder: { uk: 'Ваше ім’я', en: 'Your name' },
    emailLabel: { uk: 'Email *', en: 'Email *' },
    emailPlaceholder: { uk: 'you@company.com', en: 'you@company.com' },
    phoneLabel: { uk: 'Telegram / телефон', en: 'Telegram / phone' },
    phonePlaceholder: { uk: '@username або +380…', en: '@username or +41…' },
    companyLabel: { uk: 'Компанія / проект', en: 'Company / project' },
    companyPlaceholder: { uk: 'Назва компанії або сайт', en: 'Company name or website' },
    typeLabel: { uk: 'Тип партнера *', en: 'Partner type *' },
    typeAgency: { uk: 'Агентство / студія', en: 'Agency / studio' },
    typeFreelancer: { uk: 'Фрілансер / консультант', en: 'Freelancer / consultant' },
    typeInfluencer: { uk: 'Інфлюенсер / медіа', en: 'Influencer / media' },
    typeSales: { uk: 'Sales‑менеджер', en: 'Sales manager' },
    typeOther: { uk: 'Інше', en: 'Other' },
    audienceLabel: { uk: 'Розмір аудиторії / мережі', en: 'Audience / network size' },
    audience1: { uk: '< 500 контактів', en: '< 500 contacts' },
    audience2: { uk: '500–5K', en: '500–5K' },
    audience3: { uk: '5K–50K', en: '5K–50K' },
    audience4: { uk: '50K+', en: '50K+' },
    expectedLabel: { uk: 'Очікувана кількість лідів/місяць', en: 'Expected leads per month' },
    expected1: { uk: '1–3', en: '1–3' },
    expected2: { uk: '4–10', en: '4–10' },
    expected3: { uk: '10+', en: '10+' },
    messageLabel: { uk: 'Чому хочете стати партнером?', en: 'Why do you want to partner?' },
    messagePlaceholder: { uk: 'Коротко про вашу аудиторію, канали просування або план продажу…', en: 'Briefly about your audience, channels, or sales plan…' },
    submitBtn: { uk: 'Надіслати заявку', en: 'Submit application' },
    submitting: { uk: 'Надсилаємо…', en: 'Submitting…' },
    successTitle: { uk: 'Заявка прийнята ✓', en: 'Application received ✓' },
    successDesc: { uk: 'Ми зв’яжемось протягом 48 годин.', en: 'We’ll reach out within 48 hours.' },
    errorGeneric: { uk: 'Не вдалось надіслати. Спробуйте ще раз або напишіть у Telegram.', en: 'Couldn’t submit. Try again or reach out on Telegram.' },
    required: { uk: 'Обов’язкове поле', en: 'Required field' },
    // Side benefits
    sideTitle: { uk: 'Що ви отримаєте', en: 'What you get' },
    side1: { uk: 'До 25% з кожної угоди', en: 'Up to 25% per deal' },
    side2: { uk: 'Повторні виплати щомісяця', en: 'Recurring monthly payouts' },
    side3: { uk: 'Готові матеріали для продажів', en: 'Ready-made sales assets' },
    side4: { uk: 'Персонального менеджера', en: 'A personal manager' },
    side5: { uk: 'Прозорий дашборд по лідам', en: 'Transparent leads dashboard' },
  },

  // Careers Page
  careers: {
    badge: { uk: 'Приєднуйтесь до команди', en: 'Join the team' },
    title1: { uk: 'Будуємо майбутнє', en: 'Building the future of' },
    title2: { uk: 'AI‑автоматизації', en: 'AI automation' },
    subtitle: {
      uk: 'Ми — невелика, але амбітна команда. Працюємо віддалено, швидко приймаємо рішення і будуємо продукти, які реально впливають на бізнеси клієнтів.',
      en: 'We’re a small but ambitious team. Fully remote, fast decisions, and we build products that actually move our clients’ businesses.',
    },
    // Culture
    cultureTitle: { uk: 'Як у нас працюється', en: 'How we work' },
    culture1Title: { uk: 'Повністю віддалено', en: 'Fully remote' },
    culture1Desc: { uk: 'Без офісу, без мікроменеджменту. Ви обираєте, коли і звідки працювати.', en: 'No office, no micromanagement. You choose when and where to work.' },
    culture2Title: { uk: 'AI‑first культура', en: 'AI-first culture' },
    culture2Desc: { uk: 'Ми самі використовуємо все, що продаємо. Cursor, GPT‑5, Claude, n8n — у щоденному стеку.', en: 'We use what we sell. Cursor, GPT-5, Claude, n8n — in our daily stack.' },
    culture3Title: { uk: 'Швидкі ітерації', en: 'Fast iterations' },
    culture3Desc: { uk: 'Від ідеї до прод‑релізу — дні, а не місяці. Рішення приймають люди, що пишуть код.', en: 'Idea to production — days, not months. Decisions are made by the people writing the code.' },
    culture4Title: { uk: 'Чесна оплата', en: 'Fair pay' },
    culture4Desc: { uk: 'Конкурентні ставки + бонуси за результат. Платимо у крипті, USD або EUR — як зручно.', en: 'Competitive rates + performance bonuses. Paid in crypto, USD, or EUR — your choice.' },
    // Positions
    positionsTitle: { uk: 'Відкриті вакансії', en: 'Open positions' },
    positionsCount: { uk: '2 відкриті вакансії', en: '2 open positions' },
    remote: { uk: 'Remote', en: 'Remote' },
    fullTime: { uk: 'Full‑time', en: 'Full-time' },
    partTime: { uk: 'Part‑time', en: 'Part-time' },
    contract: { uk: 'Contract', en: 'Contract' },
    apply: { uk: 'Відгукнутись', en: 'Apply now' },
    viewDetails: { uk: 'Дивитись деталі', en: 'View details' },
    // Vacancy 1: AI Creator
    v1Title: { uk: 'AI Creator', en: 'AI Creator' },
    v1Tag: { uk: 'Контент · Креатив · AI‑tools', en: 'Content · Creative · AI tools' },
    v1Short: {
      uk: 'Створюєш контент за допомогою AI — відео, пости, візуали, сценарії. Перетворюєш нудні брифи на вірусні креативи.',
      en: 'Create content with AI — videos, posts, visuals, scripts. Turn boring briefs into viral creatives.',
    },
    v1Salary: { uk: '$1,500–3,500/міс + бонуси', en: '$1,500–3,500/mo + bonuses' },
    v1Type: { uk: 'Full‑time · Remote', en: 'Full-time · Remote' },
    v1AboutTitle: { uk: 'Про роль', en: 'About the role' },
    v1About: {
      uk: 'Ви будете створювати контент для AI Insider та наших клієнтів — короткі відео, reels, пости, scripts для voice‑агентів, візуали для лендингів. Працюєте разом з дизайнером і СЕО, маєте доступ до всього AI‑стеку (Runway, Midjourney, ElevenLabs, Veo, Suno, HeyGen, GPT‑5, Claude).',
      en: 'You’ll create content for AI Insider and our clients — short videos, reels, posts, voice-agent scripts, landing visuals. Working with our designer and CEO, with full access to our AI stack (Runway, Midjourney, ElevenLabs, Veo, Suno, HeyGen, GPT-5, Claude).',
    },
    v1RespTitle: { uk: 'Що треба робити', en: 'Responsibilities' },
    v1Resp1: { uk: 'Генерувати ідеї та скрипти для коротких відео (TikTok, Reels, Shorts)', en: 'Generate ideas and scripts for short-form video (TikTok, Reels, Shorts)' },
    v1Resp2: { uk: 'Монтажити/генерувати відео в Runway, Veo, HeyGen, CapCut', en: 'Edit/generate videos in Runway, Veo, HeyGen, CapCut' },
    v1Resp3: { uk: 'Створювати візуали та банери в Midjourney, Nano Banana, Figma', en: 'Create visuals and banners in Midjourney, Nano Banana, Figma' },
    v1Resp4: { uk: 'Писати пости для IG, LinkedIn, X, Telegram (UA + EN)', en: 'Write posts for IG, LinkedIn, X, Telegram (UA + EN)' },
    v1Resp5: { uk: 'Налаштовувати шаблони й воркфлоу у Content Factory', en: 'Set up templates and workflows in Content Factory' },
    v1Resp6: { uk: 'Аналізувати engagement і тестувати гіпотези по формату', en: 'Analyze engagement and test hypotheses on format' },
    v1ReqTitle: { uk: 'Кого ми шукаємо', en: 'Who we’re looking for' },
    v1Req1: { uk: '1+ рік досвіду з контентом (SMM, блог, відео, креатив)', en: '1+ year of content experience (SMM, blog, video, creative)' },
    v1Req2: { uk: 'Впевнено користуєтесь AI‑інструментами: MJ, Runway, ElevenLabs, GPT, Claude', en: 'Confident with AI tools: MJ, Runway, ElevenLabs, GPT, Claude' },
    v1Req3: { uk: 'Смак у дизайні, відчуття ритму й динаміки відео', en: 'Design taste, sense of rhythm and video flow' },
    v1Req4: { uk: 'Українська на рівні носія, англійська — В2+', en: 'Native Ukrainian, English — B2+' },
    v1Req5: { uk: 'Портфоліо робіт (TikTok/Reels/креативи)', en: 'Portfolio (TikTok/Reels/creatives)' },
    v1NiceTitle: { uk: 'Буде плюсом', en: 'Nice to have' },
    v1Nice1: { uk: 'Досвід з Figma або Adobe Suite', en: 'Figma or Adobe Suite experience' },
    v1Nice2: { uk: 'Знайомство з n8n або Zapier', en: 'Familiar with n8n or Zapier' },
    v1Nice3: { uk: 'Запускали власний блог/канал з 10K+', en: 'Ran your own blog/channel with 10K+' },
    v1OfferTitle: { uk: 'Що пропонуємо', en: 'What we offer' },
    v1Offer1: { uk: 'Повністю віддалена робота в міжнародній команді', en: 'Fully remote work in an international team' },
    v1Offer2: { uk: 'Доступ до всіх платних AI‑інструментів (~$500/міс за рахунок компанії)', en: 'Access to all paid AI tools (~$500/mo covered by company)' },
    v1Offer3: { uk: 'Бонуси за хіти (вірусні відео, зростання каналу)', en: 'Bonuses for hits (viral videos, channel growth)' },
    v1Offer4: { uk: 'Курси, конференції, менторство від СЕО', en: 'Courses, conferences, mentorship from CEO' },
    v1Offer5: { uk: 'Оплата в USD / EUR / крипті', en: 'Payment in USD / EUR / crypto' },
    // Vacancy 2: n8n Developer
    v2Title: { uk: 'n8n Developer (AI Automation)', en: 'n8n Developer (AI Automation)' },
    v2Tag: { uk: 'Автоматизація · Інтеграції · AI', en: 'Automation · Integrations · AI' },
    v2Short: {
      uk: 'Будуєш workflow‑автоматизації на n8n для клієнтів: CRM, месенджери, AI‑агенти, voice. Код, коли треба — low‑code, коли можна.',
      en: 'Build n8n workflow automations for clients: CRM, messengers, AI agents, voice. Code when needed — low-code when possible.',
    },
    v2Salary: { uk: '$2,000–5,000/міс + % з проектів', en: '$2,000–5,000/mo + % of projects' },
    v2Type: { uk: 'Full‑time · Remote', en: 'Full-time · Remote' },
    v2AboutTitle: { uk: 'Про роль', en: 'About the role' },
    v2About: {
      uk: 'Ви будете ядром нашої автоматизаційної команди: проектувати і впроваджувати складні workflow на n8n — з AI‑вузлами, webhooks, queueing, CRM‑інтеграціями і обробкою помилок. Працюєте з реальними продакшн‑системами, які обслуговують тисячі лідів на місяць.',
      en: 'You’ll be the core of our automation team: designing and deploying complex n8n workflows — with AI nodes, webhooks, queueing, CRM integrations, and error handling. Working on real production systems serving thousands of leads per month.',
    },
    v2RespTitle: { uk: 'Що треба робити', en: 'Responsibilities' },
    v2Resp1: { uk: 'Будувати складні workflow на n8n (self‑hosted + cloud)', en: 'Build complex n8n workflows (self-hosted + cloud)' },
    v2Resp2: { uk: 'Інтегрувати OpenAI / Anthropic / ElevenLabs / Twilio в автоматизації', en: 'Integrate OpenAI / Anthropic / ElevenLabs / Twilio into automations' },
    v2Resp3: { uk: 'Підключати CRM (HubSpot, Pipedrive, Salesforce, Zoho, custom)', en: 'Connect CRM (HubSpot, Pipedrive, Salesforce, Zoho, custom)' },
    v2Resp4: { uk: 'Писати кастомні ноди на JS/TypeScript при потребі', en: 'Write custom nodes in JS/TypeScript when needed' },
    v2Resp5: { uk: 'Налаштовувати моніторинг, retries, алерти на помилки', en: 'Set up monitoring, retries, and error alerts' },
    v2Resp6: { uk: 'Документувати workflow і передавати клієнту', en: 'Document workflows and hand off to clients' },
    v2ReqTitle: { uk: 'Кого ми шукаємо', en: 'Who we’re looking for' },
    v2Req1: { uk: '1+ рік досвіду з n8n (або Zapier/Make на просунутому рівні)', en: '1+ year with n8n (or advanced Zapier/Make)' },
    v2Req2: { uk: 'JavaScript/TypeScript на рівні впевненого користувача (async, fetch, JSON)', en: 'Confident JavaScript/TypeScript (async, fetch, JSON)' },
    v2Req3: { uk: 'Розуміння REST API, webhooks, OAuth, auth tokens', en: 'Solid REST API, webhooks, OAuth, auth tokens' },
    v2Req4: { uk: 'Досвід з OpenAI API / будь‑яким LLM‑провайдером', en: 'Experience with OpenAI API / any LLM provider' },
    v2Req5: { uk: 'Вміння дебажити проблеми у продакшені', en: 'Able to debug production issues' },
    v2Req6: { uk: 'Англійська B2+ (читати доки, писати клієнтам)', en: 'English B2+ (read docs, write to clients)' },
    v2NiceTitle: { uk: 'Буде плюсом', en: 'Nice to have' },
    v2Nice1: { uk: 'Досвід з Supabase / PostgreSQL / Redis', en: 'Experience with Supabase / PostgreSQL / Redis' },
    v2Nice2: { uk: 'Docker + self‑hosted n8n', en: 'Docker + self-hosted n8n' },
    v2Nice3: { uk: 'Знайомство з LangChain / LlamaIndex / vector DBs', en: 'Familiar with LangChain / LlamaIndex / vector DBs' },
    v2Nice4: { uk: 'Розуміння voice‑агентів (Retell, Vapi, Bland)', en: 'Voice agents understanding (Retell, Vapi, Bland)' },
    v2OfferTitle: { uk: 'Що пропонуємо', en: 'What we offer' },
    v2Offer1: { uk: 'Цікаві і складні проекти (не 100‑а інтеграція Mailchimp)', en: 'Interesting complex projects (not the 100th Mailchimp integration)' },
    v2Offer2: { uk: 'Self‑hosted інфраструктура, доступ до будь‑яких AI API', en: 'Self-hosted infra, access to any AI APIs' },
    v2Offer3: { uk: '% від проекту за успішний запуск у клієнта', en: '% from project on successful client delivery' },
    v2Offer4: { uk: 'Ріст до Tech Lead / Partner в команді', en: 'Growth path to Tech Lead / Partner' },
    v2Offer5: { uk: 'Оплата в USD / EUR / крипті, вільний графік', en: 'Payment in USD / EUR / crypto, flexible schedule' },
    // Process
    processTitle: { uk: 'Процес найму', en: 'Hiring process' },
    process1Title: { uk: 'Заявка', en: 'Application' },
    process1Desc: { uk: 'Надсилаєте форму. Дивимось портфоліо / GitHub / приклади.', en: 'You submit the form. We review portfolio / GitHub / examples.' },
    process2Title: { uk: 'Знайомство', en: 'Intro call' },
    process2Desc: { uk: '30 хвилин розмови — познайомитись, обговорити роль і очікування.', en: '30-minute call — get to know each other, discuss role and expectations.' },
    process3Title: { uk: 'Тестове', en: 'Test task' },
    process3Desc: { uk: 'Коротке практичне завдання (оплачується). 3–5 годин роботи.', en: 'Short paid test task. 3–5 hours of work.' },
    process4Title: { uk: 'Оффер', en: 'Offer' },
    process4Desc: { uk: 'Фінальна розмова, обговорення умов і старт.', en: 'Final call, terms discussion, and start.' },
    // Apply form
    applyTitle: { uk: 'Відгукнутись на вакансію', en: 'Apply for this position' },
    applySubtitle: { uk: 'Заповніть форму — ми відповімо протягом 3 робочих днів.', en: 'Fill in the form — we respond within 3 business days.' },
    applyName: { uk: 'Ім’я та прізвище *', en: 'Full name *' },
    applyEmail: { uk: 'Email *', en: 'Email *' },
    applyTelegram: { uk: 'Telegram *', en: 'Telegram *' },
    applyPortfolio: { uk: 'Посилання: портфоліо / GitHub / LinkedIn', en: 'Links: portfolio / GitHub / LinkedIn' },
    applyPortfolioPh: { uk: 'https://…', en: 'https://…' },
    applyExperience: { uk: 'Досвід з ключовим стеком *', en: 'Experience with key stack *' },
    applyExpJunior: { uk: 'до 1 року', en: 'less than 1 year' },
    applyExpMid: { uk: '1–3 роки', en: '1–3 years' },
    applyExpSenior: { uk: '3+ роки', en: '3+ years' },
    applyMotivation: { uk: 'Чому саме ця роль?', en: 'Why this role?' },
    applyMotivationPh: { uk: 'Коротко про ваш досвід і чому хочете працювати саме у нас…', en: 'Briefly about your experience and why you want to work with us…' },
    applySalary: { uk: 'Бажана ставка / міс (USD)', en: 'Expected rate / month (USD)' },
    applySalaryPh: { uk: 'наприклад, $2500', en: 'e.g. $2500' },
    applySubmit: { uk: 'Надіслати відгук', en: 'Send application' },
    applySuccess: { uk: 'Дякуємо! Ми розглянемо ваш відгук та повернемось протягом 3 днів.', en: 'Thanks! We’ll review your application and get back within 3 days.' },
    // Bottom CTA
    noMatchTitle: { uk: 'Не знайшли свою роль?', en: 'Don’t see your role?' },
    noMatchDesc: { uk: 'Пишіть нам у Telegram — завжди раді сильним людям.', en: 'DM us on Telegram — we’re always open to strong people.' },
    noMatchBtn: { uk: 'Написати в Telegram', en: 'Message on Telegram' },
  },

  // Home page: Products teaser section
  homeProducts: {
    badge: { uk: 'Наші продукти', en: 'Our products' },
    title1: { uk: 'SaaS‑продукти,', en: 'SaaS products' },
    title2: { uk: 'готові до запуску', en: 'ready to deploy' },
    subtitle: { uk: 'Купуйте готове замість місяців розробки. Ми вже запустили їх у десятках бізнесів.', en: 'Skip months of development. Already deployed in dozens of businesses.' },
    viewAll: { uk: 'Всі продукти', en: 'All products' },
  },

  // Home page: Partners teaser section
  homePartners: {
    badge: { uk: 'Партнерська програма', en: 'Partner program' },
    title1: { uk: 'Заробляйте до', en: 'Earn up to' },
    title2: { uk: '25% з кожної угоди', en: '25% per deal' },
    subtitle: { uk: 'Приводьте бізнеси — ми закриваємо. Повторні виплати, прозорий дашборд, без ексклюзиву.', en: 'Refer businesses — we close. Recurring payouts, transparent dashboard, no exclusivity.' },
    cta: { uk: 'Стати партнером', en: 'Become a partner' },
    secondaryCta: { uk: 'Як це працює', en: 'How it works' },
  },
};

// Helper function to get translation
export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let result: unknown = translations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  if (result && typeof result === 'object' && lang in result) {
    return (result as Record<Language, string>)[lang];
  }
  
  return key;
}

