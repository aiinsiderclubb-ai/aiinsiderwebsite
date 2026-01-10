// Translations for Ukrainian and English

export type Language = 'uk' | 'en';

export const translations = {
  // Navbar
  nav: {
    about: { uk: 'Про нас', en: 'About' },
    cases: { uk: 'Кейси', en: 'Cases' },
    solutions: { uk: 'Рішення', en: 'Solutions' },
    pricing: { uk: 'Ціни', en: 'Pricing' },
    contact: { uk: 'Контакт', en: 'Contact' },
    bookCall: { uk: 'Замовити дзвінок', en: 'Book a Call' },
  },
  
  // Hero Section
  hero: {
    badge: { uk: 'AI-автоматизація', en: 'AI-Powered Automation' },
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
    linkSolutions: { uk: 'Рішення', en: 'Solutions' },
    linkCases: { uk: 'Кейси', en: 'Case Studies' },
    linkPricing: { uk: 'Ціни', en: 'Pricing' },
    linkContact: { uk: 'Контакт', en: 'Contact' },
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
    member1Name: { uk: 'Олексій Мориссон', en: 'Alex Morrison' },
    member1Role: { uk: 'CEO та засновник', en: 'CEO & Founder' },
    member1Bio: { uk: 'Візіонер з 15+ роками досвіду в AI та технологіях. Колишній ML Lead в Google, зараз будує майбутнє інтелектуальної автоматизації.', en: 'Visionary leader with 15+ years in AI and tech. Former ML Lead at Google, now building the future of intelligent automation.' },
    member2Name: { uk: 'Сара Чен', en: 'Sarah Chen' },
    member2Role: { uk: 'Співзасновник та CTO', en: 'Co-Founder & CTO' },
    member2Bio: { uk: 'Технічний геній за нашою AI-архітектурою. PhD в Machine Learning з MIT, пристрасна до етичного розвитку AI.', en: 'Technical genius behind our AI architecture. PhD in Machine Learning from MIT, passionate about ethical AI development.' },
    member3Name: { uk: 'Маркус Джонсон', en: 'Marcus Johnson' },
    member3Role: { uk: 'Керівник продукту', en: 'Head of Product' },
    member3Bio: { uk: 'Продуктовий стратег з талантом до user-centric дизайну. Раніше керував продуктовими командами в Stripe та Figma.', en: 'Product strategist with a knack for user-centric design. Previously led product teams at Stripe and Figma.' },
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

