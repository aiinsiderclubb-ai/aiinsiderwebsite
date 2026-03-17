import ROICalculator from './ROICalculator';
import type { RoiConfig } from '@/app/lib/verticals/types';

interface ROISectionProps {
  content: RoiConfig;
  accentGradient?: string;
  glowRgb?: string;
}

export default function ROISection({
  content,
  accentGradient = 'from-rose-400 to-pink-500',
  glowRgb = '244, 63, 94',
}: ROISectionProps) {
  return (
    <section id="roi-calculator" className="relative py-20 px-6 overflow-hidden" data-source-section="roi">
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/4 w-[600px] h-[500px]"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.1) 0%, transparent 60%)`, filter: 'blur(80px)' }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6"
          style={{ background: `rgba(${glowRgb}, 0.07)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${glowRgb}, 1)` }} />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">ROI</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">{content.title}</h2>
        <p className="text-gray-400 max-w-3xl mb-10 leading-relaxed">{content.subtitle}</p>
        <ROICalculator content={content.calculator} glowRgb={glowRgb} accentGradient={accentGradient} />
      </div>
    </section>
  );
}
