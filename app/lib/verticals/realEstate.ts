import type { RealEstateClusterGroupId, VerticalPillarConfig } from '@/app/lib/verticals/types';

export const realEstatePillarUk: VerticalPillarConfig<RealEstateClusterGroupId> = {
  vertical: 'real_estate',
  locale: 'uk',

  chrome: {
    brand: { href: '/uk', label: 'AI Insider' },
    topCta: { href: '#bookcall', label: 'Замовити консультацію' },
    breadcrumbs: {
      items: [
        { href: '/uk', label: 'Головна' },
        { href: '/uk/services', label: 'Послуги' },
      ],
      current: 'Автоматизація нерухомості',
    },
  },

  hero: {
    badge: 'Автоматизація нерухомості в Україні',
    title: 'Автоматизація нерухомості: AI для агентств та ріелторів',
    subtitle: 'Від кваліфікації лідів до ведення угод — AI бере рутину на себе',
    primaryCta: { href: '#bookcall', label: 'Замовити консультацію' },
    secondaryCta: { href: '/uk/cases', label: 'Подивитись кейси автоматизації' },
    stats: ['3x більше лідів', '85% економії часу', '24/7 обробка заявок'],
  },

  problems: {
    title: 'Чому ріелтори втрачають клієнтів',
    subtitle:
      'Ручна обробка заявок, хаос у CRM і відсутність наскрізної аналітики з’їдають час команди та гроші агентства ще до першого показу.',
    cards: [
      {
        title: 'Ліди не обробляються вчасно',
        text: 'Поки менеджер передзвонює, клієнт уже залишив заявку в іншому агентстві. Гарячі ліди холоднішають за лічені хвилини.',
        metric: 'до -35% конверсії',
      },
      {
        title: 'Рутинні дзвінки з’їдають день',
        text: 'Кваліфікація, підтвердження показів і follow-up забирають години, які мають іти на переговори та закриття угод.',
        metric: '40+ год/міс на менеджера',
      },
      {
        title: 'CRM не оновлюється, угоди губляться',
        text: 'Менеджери не встигають фіксувати статуси, коментарі та джерела ліда, тому pipeline перестає бути керованим.',
        metric: 'хаос у pipeline',
      },
      {
        title: 'Немає аналітики по рекламних каналах',
        text: 'Керівник не бачить, який канал реально приносить угоди, а де бюджет просто згорає без прогнозованого ROI.',
        metric: 'сліпі рекламні витрати',
      },
    ],
  },

  automation: {
    title: 'Як AI вирішує ці проблеми',
    subtitle:
      'Ми збираємо стек автоматизації навколо ключових вузьких місць агентства: швидкість відповіді, кваліфікація, CRM-дисципліна та управління каналами.',
    cards: [
      {
        title: 'AI кваліфікація лідів',
        text: 'AI асистент миттєво відповідає, уточнює бюджет, район, тип об’єкта та готовність до перегляду, а потім передає кваліфікований lead у воронку.',
        href: '/uk/solutions/ai-for-real-estate-agencies',
        ctaLabel: 'Відкрити solution',
      },
      {
        title: 'AI голосовий агент',
        text: 'Голосовий агент бере на себе перший дзвінок, нагадування про покази, reactivation і первинний скринінг без втрати SLA.',
        href: '/uk/services/ai-voice-agent',
        ctaLabel: 'Перейти до сервісу',
      },
      {
        title: 'Автоматизація CRM',
        text: 'Статуси, нотатки, завдання та follow-up синхронізуються автоматично, тому агентство бачить реальний pipeline, а не ручні уривки.',
        href: '/uk/services/workflow-automation',
        ctaLabel: 'Налаштувати CRM-потік',
      },
      {
        title: 'AI аналітика',
        text: 'AI-дашборд показує джерела якісних лідів, швидкість обробки, втрати по воронці та навантаження на кожного менеджера.',
        href: '/uk/services/analytics-assistants',
        ctaLabel: 'Подивитися аналітику',
      },
    ],
    links: [
      { href: '/uk/solutions/ai-for-real-estate-agencies', label: 'AI для агентств нерухомості' },
      { href: '/uk/services/ai-automation-for-real-estate', label: 'Послуга для real estate' },
      { href: '/uk/services', label: 'Всі послуги' },
    ],
  },

  cluster: {
    title: 'Більше про автоматизацію нерухомості',
    subtitle:
      'Починаємо real estate cluster з практичних матеріалів про дзвінки, lead qualification та контроль швидкості відповіді. Далі сюди легко додавати нові playbooks.',
    viewAll: { href: '/uk/blog', label: 'Всі статті →' },
    roiCta: { href: '/uk/avtomatizaciya-nerukhomosti#roi-calculator', label: 'Порахувати ROI' },
    articleBaseHref: '/uk/blog',
    groups: [
      {
        id: 'current',
        title: 'Поточні матеріали',
        description: 'Перший supporting article для real estate cluster. Наступні матеріали можна додавати в цю саму групу.',
        articles: [
          {
            slug: 'ai-voice-agent-for-real-estate',
            title: 'AI voice agent для нерухомості: як не втрачати дзвінки та швидше призначати покази',
            summary:
              'Практичний розбір, як голосовий AI-агент знімає рутину з команди продажів, кваліфікує заявки й підтримує SLA 24/7.',
            ctaLabel: 'Читати статтю',
          },
        ],
      },
    ],
  },

  roi: {
    title: 'Порахуйте вашу економію',
    subtitle: 'Орієнтовна модель економіки для агентства нерухомості.',
    calculator: {
      title: 'ROI calculator',
      subtitle: 'Placeholder config; page uses a dedicated real estate calculator.',
      fields: [
        { key: 'monthlyBookings', label: 'Leads', defaultValue: 180, min: 0 },
        { key: 'averageCheck', label: 'Average check', defaultValue: 1, min: 0 },
        { key: 'noShowRate', label: 'No show', defaultValue: 0, min: 0, max: 100 },
        { key: 'instagramLeads', label: 'Inbound', defaultValue: 180, min: 0 },
        { key: 'responseMinutes', label: 'Response time', defaultValue: 10, min: 0 },
      ],
      resultsTitle: 'Results',
      results: [
        { key: 'noShowLoss', label: 'Placeholder' },
        { key: 'lostInstagramRevenue', label: 'Placeholder' },
        { key: 'estimatedMonthlyLoss', label: 'Placeholder' },
        { key: 'potentialRevenueRecovery', label: 'Placeholder' },
      ],
      cta: { href: '#bookcall', label: 'Замовити консультацію' },
    },
  },

  cases: {
    title: 'Реальні результати для нерухомості',
    subtitle: 'Три формати впровадження, де AI зняв вузькі місця з lead processing, телефонії та операційного контролю.',
    labels: {
      whatWeDid: 'Що зробили',
      metrics: 'Метрики',
      timeline: 'Термін:',
    },
    items: [
      {
        title: 'Кейс: кваліфікація лідів у реальному часі',
        problem:
          'Заявки з реклами та месенджерів приходили швидше, ніж команда встигала їх обробляти, тому частина гарячих контактів просто зникала.',
        implementation: [
          'Налаштували AI-кваліфікацію лідів за бюджетом, районом та типом об’єкта',
          'Автоматично передавали статус і коментар у CRM',
          'Побудували SLA-маршрутизацію між AI і менеджером',
        ],
        metrics: ['First response time: 12 хв → 1 хв', 'Кваліфіковані ліди: +43%', 'Втрати заявок: -61%'],
        timeline: '4 тижні',
        href: '/uk/cases/real-estate-lead-qualification',
        linkLabel: 'Відкрити кейс',
      },
      {
        title: 'Кейс: voice concierge для показів',
        problem:
          'Менеджери витрачали день на повторні дзвінки, підтвердження і переноси показів, а клієнти випадали з процесу через затримки.',
        implementation: [
          'Запустили AI voice agent для первинного дзвінка та нагадувань',
          'Автоматизували підтвердження і перенесення показів',
          'Зв’язали телефонію з CRM і календарем',
        ],
        metrics: ['Підтвердження показів: +31%', 'Ручні дзвінки: -68%', 'SLA 24/7 без нових FTE'],
        timeline: '3 тижні',
        href: '/uk/cases/real-estate-voice-concierge',
        linkLabel: 'Подивитися кейс',
      },
      {
        title: 'Кейс: operations OS для агентства',
        problem:
          'Керівник не бачив цілісної картини по завданнях, воронці та джерелах лідів, тому команда працювала реактивно.',
        implementation: [
          'Об’єднали CRM, задачі та звітність у єдиний workflow',
          'Додали автоматичні нагадування і статуси для угод',
          'Побудували dashboard по каналах і навантаженню команди',
        ],
        metrics: ['Швидкість оновлення CRM: +85%', 'Пропущені задачі: -57%', 'Прозорість по каналах: 100%'],
        timeline: '5 тижнів',
        href: '/uk/cases/real-estate-operations-os',
        linkLabel: 'Розібрати кейс',
      },
    ],
  },

  implementation: {
    title: 'Як запустити AI в агентстві',
    subtitle: 'Починаємо з аудиту поточної воронки, потім збираємо інтеграції і запускаємо MVP без зупинки команди. Типовий timeframe — від 2 тижнів.',
    stageLabel: 'Крок',
    stages: [
      {
        title: 'Аудит',
        duration: '2–3 дні',
        text: 'Розбираємо поточний потік лідів, дзвінків, CRM і рекламних каналів. Фіксуємо, де втрачається час і конверсія.',
      },
      {
        title: 'Налаштування',
        duration: '5–7 днів',
        text: 'Проєктуємо сценарії AI-кваліфікації, правила ескалації, CRM-автоматизацію та аналітичний контур під ваш stack.',
      },
      {
        title: 'Запуск',
        duration: 'від 2 тижнів',
        text: 'Вмикаємо MVP, дивимося на перші метрики, калібруємо скрипти й розширюємо автоматизацію на інші джерела та етапи угоди.',
      },
    ],
  },

  objections: {
    title: 'Що найчастіше зупиняє агентства перед запуском',
    items: [
      {
        q: 'AI не зможе говорити як наші менеджери',
        a: 'Ми налаштовуємо tone of voice, сценарії кваліфікації та точки передачі на людину. AI не замінює переговори, а прибирає рутину перед ними.',
      },
      {
        q: 'У нас уже є CRM, навіщо щось міняти?',
        a: 'Мета не змінити CRM, а змусити її працювати дисципліновано: автоматично заносити статуси, задачі, дзвінки і джерела ліда.',
      },
      {
        q: 'Чи не буде це занадто дорого для команди?',
        a: 'Порівнюємо впровадження не з “нічого не робити”, а з вартістю додаткового менеджера і втрачених угод через повільну обробку.',
      },
    ],
  },

  faq: {
    title: 'Часті запитання',
    items: [
      {
        question: 'Скільки коштує AI-автоматизація для агентства нерухомості?',
        answer:
          'Вартість залежить від кількості процесів, каналів і інтеграцій. Зазвичай ми починаємо з MVP: кваліфікація лідів, voice agent або CRM-автоматизація, а далі масштабуємося по метриках.',
      },
      {
        question: 'За який термін можна запустити перший сценарій?',
        answer:
          'Перший робочий MVP зазвичай запускається за 2–4 тижні залежно від кількості інтеграцій і готовності вашої CRM та телефонії.',
      },
      {
        question: 'Чи можна інтегрувати це з нашою CRM?',
        answer:
          'Так. Ми підключаємося до наявної CRM, телефонії, форм і месенджерів, щоб дані по лідах і угодах оновлювалися автоматично.',
      },
      {
        question: 'Як ви забезпечуєте безпеку даних?',
        answer:
          'Ми обмежуємо доступи за ролями, логуюємо зміни, мінімізуємо ручне копіювання даних і працюємо через контрольовані інтеграційні контури.',
      },
      {
        question: 'Що потрібно від агентства для старту?',
        answer:
          'Достатньо доступу до поточних каналів заявок, CRM/телефонії та короткого воркшопу з командою, щоб описати pipeline, SLA і логіку передачі ліда.',
      },
    ],
  },

  leadMagnet: {
    title: 'Чек-лист автоматизації для агентства нерухомості',
    description: 'Запасний контентний блок для майбутнього lead magnet.',
    bullets: ['Аудит каналів', 'CRM-потік', 'SLA для лідів'],
    form: {
      title: 'Отримати чек-лист',
      subtitle: 'Підготуємо playbook під ваш pipeline.',
      successMessage: 'Дякуємо! Ми надішлемо матеріали на вашу пошту.',
      errorMessage: 'Не вдалося надіслати форму. Спробуйте ще раз.',
      networkErrorMessage: 'Не вдалося надіслати форму. Спробуйте ще раз.',
      fields: {
        nameLabel: "Ім'я",
        emailLabel: 'Email',
        salonSizeLabel: 'Розмір агентства',
        salonSizePlaceholder: 'Оберіть',
        salonSizeOptions: [
          { value: '1-5', label: '1–5 агентів' },
          { value: '6-15', label: '6–15 агентів' },
          { value: '16-30', label: '16–30 агентів' },
          { value: '30+', label: '30+ агентів' },
        ],
      },
      submitLabel: 'Отримати чек-лист',
      submittingLabel: 'Відправляємо…',
    },
  },

  finalCta: {
    title: 'Готові прибрати рутину з відділу продажів?',
    subtitle: 'Заплануйте аудит і отримаєте дорожню карту впровадження AI для вашого агентства.',
    benefits: {
      title: 'Що входить в аудит',
      bullets: ['Аналіз воронки', 'Оцінка SLA', 'План інтеграцій', 'Прогноз ROI'],
      riskReversal: 'Починаємо з найкоротшого дохідного сценарію.',
      chips: ['MVP-first', 'Без хаосу в команді', 'Метрики з першого тижня'],
    },
    form: {
      title: 'Запит на аудит',
      successMessage: 'Дякуємо! Ваш запит отримано.',
      errorMessage: 'Не вдалося надіслати запит. Спробуйте ще раз.',
      networkErrorMessage: 'Не вдалося надіслати запит. Спробуйте ще раз.',
      fields: {
        nameLabel: "Ім'я",
        phoneLabel: 'Телефон',
        salonSizeLabel: 'Розмір агентства',
        salonSizePlaceholder: 'Оберіть',
        salonSizeOptions: [
          { value: '1-5', label: '1–5 агентів' },
          { value: '6-15', label: '6–15 агентів' },
          { value: '16-30', label: '16–30 агентів' },
          { value: '30+', label: '30+ агентів' },
        ],
        monthlyBookingsLabel: 'Лідів на місяць',
      },
      submitLabel: 'Отримати аудит',
      submittingLabel: 'Відправляємо…',
    },
    bottomLinkText: 'Або почніть з сервісної сторінки:',
    bottomLink: { href: '/uk/services/ai-automation-for-real-estate', label: 'AI automation for real estate' },
  },
};
