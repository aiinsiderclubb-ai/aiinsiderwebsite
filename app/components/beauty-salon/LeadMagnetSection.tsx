interface LeadMagnetSectionProps {
  status?: 'success' | 'error';
}

export default function LeadMagnetSection({ status }: LeadMagnetSectionProps) {
  return (
    <section id="lead-magnet" className="py-12 px-6 content-visibility-auto">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-bold text-white">Чек-лист автоматизації салону краси</h2>
          <p className="mt-3 text-gray-300">
            PDF на 15 пунктів: як прибрати no-show, не губити ліди в Direct і підняти repeat sales без хаосу в команді.
          </p>
          <ul className="mt-4 list-disc ml-5 text-sm text-gray-300 space-y-1">
            <li>Контрольний список процесів до запуску</li>
            <li>Шаблон базових KPI салону</li>
            <li>Матриця пріоритетів для впровадження</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-bold text-white">Завантажити чек-лист</h3>
          <p className="mt-2 text-sm text-gray-400">Отримаєте PDF на email + шаблон для розрахунку втрат.</p>

          {status === 'success' ? (
            <p className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/15 p-3 text-sm text-emerald-100">
              Дякуємо! Заявка прийнята. Ми надішлемо чек-лист на вашу пошту.
            </p>
          ) : status === 'error' ? (
            <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-100">
              Не вдалося надіслати форму. Перевірте поля та спробуйте ще раз.
            </p>
          ) : null}

          <form
            action="/api/lead-magnet"
            method="post"
            className="mt-4 space-y-3"
            data-cta="lead-magnet-form"
          >
            <input type="hidden" name="source" value="beauty-pillar" />
            <input type="hidden" name="formType" value="lead-magnet" />
            <input type="hidden" name="locale" value="uk" />
            <label className="block">
              <span className="text-sm text-gray-300">Ім'я</span>
              <input
                name="name"
                required
                minLength={2}
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Email</span>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Розмір салону</span>
              <select
                name="salonSize"
                required
                className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-white/40"
              >
                <option value="">Оберіть</option>
                <option value="1-2">1–2 майстри</option>
                <option value="3-7">3–7 майстрів</option>
                <option value="8-15">8–15 майстрів</option>
                <option value="15+">15+ майстрів</option>
              </select>
            </label>
            <button
              type="submit"
              data-cta="lead-magnet-submit"
              className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-gray-100 transition-colors"
            >
              Отримати чек-лист
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}
