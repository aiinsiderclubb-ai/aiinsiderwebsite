import ROICalculator from './ROICalculator';

export default function ROISection() {
  return (
    <section id="roi-calculator" className="py-12 px-6 content-visibility-auto" data-source-section="roi">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Фінансовий ефект: рахуємо до старту</h2>
        <p className="text-gray-300 max-w-3xl mb-8">
          Перед впровадженням ми рахуємо базові втрати та потенціал повернення виручки. Так ви приймаєте рішення по цифрах,
          а не по обіцянках.
        </p>
        <ROICalculator />
      </div>
    </section>
  );
}
