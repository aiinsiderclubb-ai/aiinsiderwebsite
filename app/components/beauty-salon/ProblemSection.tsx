const problemCards = [
  {
    title: 'No-show та згорілі слоти',
    text: 'Неявки 10–15% з’їдають касу. Без нагадувань і підтвердження слот втрачається разом з апселом.',
    metric: 'до -50 000 грн/міс',
  },
  {
    title: 'Перевантаження адміністратора',
    text: 'Ручні переноси, відповіді в Direct, дзвінки та таблиці одночасно знижують швидкість і якість сервісу.',
    metric: '-30% продуктивності',
  },
  {
    title: 'Втрати лідів з Instagram',
    text: 'Якщо перша відповідь приходить через 15+ хвилин, частина потенційних клієнтів іде до конкурентів.',
    metric: 'до -20% записів',
  },
  {
    title: 'Низьке повернення клієнтів',
    text: 'Без сегментації та тригерів база не монетизується: клієнт приходить один раз і не повертається.',
    metric: 'мінус LTV',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto" data-source-section="problems">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Де салон втрачає гроші щодня</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          До автоматизації ми фіксуємо базові втрати: no-show, втрачені Direct-ліди, ручну перевантаженість та низький
          repeat rate. Це ваша стартова точка для ROI-моделі.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {problemCards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-rose-300">{item.metric}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
