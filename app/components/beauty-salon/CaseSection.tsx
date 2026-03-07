const cases = [
  {
    title: 'Кейс: Instagram → CRM за секунди',
    problem:
      'Ліди губилися в Direct, перша відповідь займала 15–20 хв, менеджери не бачили повної картини по джерелах.',
    implementation: [
      'Підключили AI-бот до Instagram і сценарії первинної кваліфікації',
      'Додали автопередачу контактів та статусів у CRM',
      'Впровадили SLA і контроль first response time',
    ],
    metrics: ['FRT: 15 хв → 1 хв', 'Конверсія Direct→запис: +26%', 'Втрати лідів: -58%'],
    timeline: '4 тижні',
  },
  {
    title: 'Кейс: no-show та повторні візити',
    problem:
      'No-show тримався на рівні 11%, повторні візити росли повільно через відсутність тригерів і сегментації.',
    implementation: [
      'Запустили SMS/DM-нагадування з підтвердженням',
      'Налаштували сегменти “ризик відтоку” та “повторний цикл”',
      'Додали автоматичні офери для re-activation',
    ],
    metrics: ['No-show: 11% → 6.7%', 'Repeat rate: +13 п.п.', 'Виручка: +18% за 2 місяці'],
    timeline: '6 тижнів',
  },
];

export default function CaseSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Кейси з вимірюваними результатами</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          Нижче приклади форматів впровадження для салонів краси: проблема, технічне рішення, метрики та термін.
        </p>

        <div className="grid lg:grid-cols-2 gap-5">
          {cases.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-gray-300">{item.problem}</p>

              <h4 className="mt-4 text-sm font-semibold text-white">Що зробили</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-300 list-disc ml-5">
                {item.implementation.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <h4 className="mt-4 text-sm font-semibold text-white">Метрики</h4>
              <ul className="mt-2 space-y-1 text-sm text-emerald-200 list-disc ml-5">
                {item.metrics.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-gray-400">Термін: {item.timeline}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
