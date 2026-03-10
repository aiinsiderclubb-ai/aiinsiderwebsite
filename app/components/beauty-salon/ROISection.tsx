import ROICalculator from './ROICalculator';
import type { RoiConfig } from '@/app/lib/verticals/types';

export default function ROISection({ content }: { content: RoiConfig }) {
  return (
    <section id="roi-calculator" className="py-12 px-6 content-visibility-auto" data-source-section="roi">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.title}</h2>
        <p className="text-gray-300 max-w-3xl mb-8">{content.subtitle}</p>
        <ROICalculator content={content.calculator} />
      </div>
    </section>
  );
}
