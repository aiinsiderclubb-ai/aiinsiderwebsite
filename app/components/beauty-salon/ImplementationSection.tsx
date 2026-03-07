const stages = [
  {
    title: 'Discovery',
    duration: '2–4 дні',
    text: 'Аудитуємо поточну воронку: Instagram, записи, no-show, повторні продажі. Фіксуємо baseline KPI.',
  },
  {
    title: 'Setup',
    duration: '3–7 днів',
    text: 'Проєктуємо сценарії для запису, підтверджень, сегментації, реактивації. Погоджуємо правила передачі на людину.',
  },
  {
    title: 'Integration',
    duration: '3–7 днів',
    text: 'Зв’язуємо канали (DM/SMS), CRM, календарі та трекінг. Перевіряємо цілісність даних по подіях і статусах.',
  },
  {
    title: 'Testing',
    duration: '3–5 днів',
    text: 'Тестуємо edge-cases: переноси, відміни, дублікати, пікові години. Усуваємо ризики до повного релізу.',
  },
  {
    title: 'Optimization',
    duration: '2–4 тижні',
    text: 'Покращуємо конверсію скриптів, тексти нагадувань, сегменти і офери на основі фактичних метрик.',
  },
];

export default function ImplementationSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">План впровадження: від аудиту до стабільного результату</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          Процес розбитий на етапи, щоб не ламати операційку салону. Спочатку швидкі перемоги, потім масштабування.
        </p>
        <ol className="space-y-4">
          {stages.map((stage, idx) => (
            <li key={stage.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-400">Етап {idx + 1}</p>
              <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
              <p className="text-sm text-emerald-200 mt-1">{stage.duration}</p>
              <p className="text-gray-300 mt-2">{stage.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
