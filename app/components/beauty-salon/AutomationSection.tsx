import Link from 'next/link';

const solutions = [
  {
    title: 'Онлайн-запис 24/7',
    text: 'Клієнт бронює час без участі адміністратора. Календар майстрів синхронізований, помилки ручного запису знижуються.',
  },
  {
    title: 'AI Instagram чатбот',
    text: 'Бот відповідає за секунди, збирає контакт, кваліфікує запит і передає в CRM або адміністратору за правилами.',
  },
  {
    title: 'SMS/DM нагадування',
    text: 'Сценарії 24h/2h до візиту з підтвердженням або переносом. Це прямо знижує no-show і повертає слоти.',
  },
  {
    title: 'CRM-сегментація клієнтів',
    text: 'Розбиття на сегменти (нові, VIP, ризик відтоку, сплячі) дозволяє робити персональні офери замість масових розсилок.',
  },
  {
    title: 'Repeat sales automation',
    text: 'Автокампанії на повторний візит по циклу послуги підвищують LTV і стабілізують щомісячну виручку.',
  },
  {
    title: 'Автоматизація відгуків',
    text: 'Після процедури запускається збір фідбеку: позитивний досвід конвертується в публічні відгуки, ризики — в сервісні задачі.',
  },
];

export default function AutomationSection() {
  return (
    <section className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Автоматизації, які реально впливають на виручку</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          Ми впроваджуємо не абстрактні “AI-рішення”, а конкретні процеси, прив’язані до KPI салону: conversion, no-show,
          repeat rate, revenue per slot.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {solutions.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/uk/ai-automation-for-business"
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            AI automation for business
          </Link>
          <Link
            href="/uk/ai-chatbots-for-business"
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            AI чатботи для бізнесу
          </Link>
          <Link
            href="/uk/services"
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Всі послуги
          </Link>
        </div>
      </div>
    </section>
  );
}
