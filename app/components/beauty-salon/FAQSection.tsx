import type { FaqEntry } from '@/app/lib/schema/faqSchema';

interface FAQSectionProps {
  title: string;
  faqs: FaqEntry[];
}

export default function FAQSection({ title, faqs }: FAQSectionProps) {
  return (
    <section id="faq" className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-1/4 w-[600px] h-[300px] opacity-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-[0.2em]">FAQ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-8">{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 open:border-white/20 open:bg-white/[0.06]">
              <summary className="cursor-pointer px-6 py-5 text-white font-semibold flex items-center justify-between">
                <span>{faq.question}</span>
                <span className="ml-4 text-white/40 transition-transform duration-300 group-open:rotate-45 text-xl leading-none flex-shrink-0">+</span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
