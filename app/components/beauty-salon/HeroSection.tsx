import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="pt-28 pb-12 md:pt-32 md:pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 mb-5">
          Автоматизація салону краси в Україні
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-5xl">
          Менше неявок, швидша обробка Instagram-лідів і стабільніший графік майстрів без роздування штату.
        </h1>
        <p className="mt-5 text-lg text-gray-300 max-w-3xl">
          Якщо салон втрачає записи через повільні відповіді, ручні підтвердження та хаос у Direct — ця сторінка покаже,
          які автоматизації дають реальний фінансовий ефект і за який термін окупаються.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#audit-form"
            data-cta="hero-audit"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-100 transition-colors"
          >
            Замовити безкоштовний аудит
          </a>
          <Link
            href="/uk/cases"
            data-cta="hero-cases"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Подивитись кейси автоматизації
          </Link>
        </div>
      </div>
    </section>
  );
}
