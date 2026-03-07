const objections = [
  {
    q: 'Це дорого для невеликого салону',
    a: 'Дорого — втрачати оплачувані слоти. Ми починаємо з MVP-блоку, який впливає на касу одразу: no-show, Direct та записи.',
  },
  {
    q: 'Адміністратор і так справляється',
    a: 'Питання не в старанності адміністратора, а в межі людської пропускної здатності. Автоматизація дає швидкість та контроль 24/7.',
  },
  {
    q: 'Боюсь, що система зламає процес',
    a: 'Запуск йде поетапно: тестове середовище, сценарії edge-cases, контрольні KPI, лише потім масштабування.',
  },
  {
    q: 'AI зіпсує сервіс і тон спілкування',
    a: 'Скрипти погоджуються з вашою командою. Складні діалоги одразу передаються людині, а не залишаються в боті.',
  },
];

export default function ObjectionSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Заперечення власників салонів — і практичні відповіді</h2>
        <div className="space-y-3">
          {objections.map((item) => (
            <details key={item.q} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 open:bg-white/[0.05]">
              <summary className="cursor-pointer text-white font-semibold">{item.q}</summary>
              <p className="mt-2 text-gray-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
