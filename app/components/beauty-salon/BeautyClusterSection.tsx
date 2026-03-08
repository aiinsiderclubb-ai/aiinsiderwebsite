import Link from 'next/link';

type ClusterArticle = {
  slug: string;
  title: string;
  summary: string;
  cta: string;
};

type ClusterGroup = {
  id: 'lead-capture' | 'no-show' | 'retention' | 'ops';
  title: string;
  description: string;
  articles: ClusterArticle[];
};

const groups: ClusterGroup[] = [
  {
    id: 'lead-capture',
    title: 'Захоплення лідів (Lead capture)',
    description: 'Як не губити звернення в Direct і швидше переводити їх у запис.',
    articles: [
      {
        slug: 'instagram-direct-leads-beauty-salon',
        title: 'Ліди з Instagram Direct для салону краси: як перестати втрачати гарячі звернення',
        summary:
          'Як салону краси перетворювати звернення з Instagram Direct у записи: скрипти, логіка маршрутизації та автоматизація.',
        cta: 'Читати playbook',
      },
      {
        slug: 'online-booking-automation-for-beauty-salon',
        title: 'Автоматизація онлайн-запису для салону краси: практичний rollout',
        summary:
          'Покрокове впровадження автоматизації онлайн-запису в салоні краси: логіка слотів, синхронізація календаря і конверсія.',
        cta: 'Побудувати запис 24/7',
      },
    ],
  },
  {
    id: 'no-show',
    title: 'Зниження no-show',
    description: 'Як повернути “згорілі” слоти через підтвердження, нагадування і перенесення без хаосу.',
    articles: [
      {
        slug: 'beauty-salon-no-show-reduction-system',
        title: 'Система зниження no-show в салоні краси: від втрачених слотів до прогнозованого графіка',
        summary:
          'Практична система зниження no-show у салоні краси через підтвердження, нагадування та логіку перенесення.',
        cta: 'Зменшити no-show',
      },
      {
        slug: 'beauty-salon-reminders-sms-dm-workflows',
        title: 'SMS і DM нагадування для салону краси: workflow, який реально знижує no-show',
        summary:
          'Побудуйте сценарії SMS/DM нагадувань для салону: таймінг, шаблони, логіка підтвердження і вплив на no-show.',
        cta: 'Налаштувати нагадування',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Утримання та повторні продажі',
    description: 'Як монетизувати базу: сегментація, тригери повторного візиту й реактивація.',
    articles: [
      {
        slug: 'salon-crm-segmentation-playbook',
        title: 'CRM сегментація для салону краси: від масових розсилок до прибуткового retention',
        summary: 'Як сегментувати клієнтів салону краси в CRM для росту retention, повторних записів і ROI кампаній.',
        cta: 'Сегментувати базу',
      },
      {
        slug: 'beauty-salon-repeat-sales-automation',
        title: 'Автоматизація повторних продажів у салоні краси: модель прогнозованої виручки',
        summary:
          'Побудуйте автоматизацію повторних продажів у салоні: тригери за циклом послуг, реактивація і стратегія росту LTV.',
        cta: 'Запустити repeat sales',
      },
    ],
  },
  {
    id: 'ops',
    title: 'Операційка та аналітика',
    description: 'Як тримати контроль: репутація, KPI, прозорість по каналах і рішення на цифрах.',
    articles: [
      {
        slug: 'beauty-salon-review-automation-system',
        title: 'Автоматизація відгуків для салону краси: ріст репутації без ручного “догону”',
        summary:
          'Автоматизуйте збір відгуків у салоні краси через post-visit тригери, маршрутизацію і сценарій захисту репутації.',
        cta: 'Побудувати review-систему',
      },
      {
        slug: 'beauty-salon-kpi-dashboard-automation',
        title: 'Автоматизація KPI-дашборду салону краси: метрики для рішень по виручці',
        summary:
          'Як автоматизувати KPI-дашборд салону краси: no-show, конверсія, retention і виручка в одному операційному view.',
        cta: 'Зібрати KPI-дашборд',
      },
    ],
  },
];

export default function BeautyClusterSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto" aria-labelledby="beauty-cluster-title" data-source-section="beauty-cluster">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 id="beauty-cluster-title" className="text-3xl md:text-4xl font-bold text-white">
              Beauty Automation Cluster
            </h2>
            <p className="mt-3 text-gray-300 max-w-3xl">
              Це повний knowledge hub для власників салонів: 8 практичних матеріалів, які закривають весь цикл — від
              захоплення ліда до повторного візиту й контролю KPI.
            </p>
          </div>
          <Link
            href="/uk/blog"
            data-cta="beauty-cluster-view-blog"
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Всі статті → 
          </Link>
        </div>

        <div className="mt-10 space-y-10">
          {groups.map((group) => (
            <section key={group.id} aria-label={group.title}>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{group.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {group.articles.map((a) => {
                  const href = `/uk/blog/${a.slug}`;
                  return (
                    <article
                      key={a.slug}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 transition-colors"
                    >
                      <h4 className="text-lg font-semibold text-white leading-snug">
                        <Link
                          href={href}
                          data-cta="beauty-cluster-title"
                          data-article={a.slug}
                          data-group={group.id}
                          className="hover:text-white/90 transition-colors"
                        >
                          {a.title}
                        </Link>
                      </h4>
                      <p className="mt-2 text-sm text-gray-300">{a.summary}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Link
                          href={href}
                          data-cta="beauty-cluster-cta"
                          data-article={a.slug}
                          data-group={group.id}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"
                        >
                          {a.cta} <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                          href="/uk/avtomatizaciya-salonu-krasy#roi-calculator"
                          data-cta="beauty-cluster-roi"
                          data-article={a.slug}
                          className="text-xs rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-gray-200 hover:bg-white/10"
                        >
                          ROI-калькулятор
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
