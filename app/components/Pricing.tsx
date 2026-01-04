'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles, Zap, Rocket } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';

const plans = [
  {
    name: 'Starter',
    price: 'Індивідуально',
    desc: 'Ідеально для малих автоматизацій',
    icon: Zap,
    features: [
      'Проста автоматизація процесів',
      'Базова інтеграція AI',
      'Підтримка по email',
      'Налаштування за 30 днів',
      'До 1,000 операцій/міс',
    ],
  },
  {
    name: 'Pro',
    price: 'Індивідуально',
    desc: 'Кастомний AI-агент для вашого бізнесу',
    icon: Rocket,
    features: [
      'Голосовий/чат агент на замовлення',
      'Просунуті AI-моделі',
      'Пріоритетна підтримка',
      'Повна інтеграція',
      'Налаштування за 14 днів',
      'Необмежені операції',
      'Персональний менеджер',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Індивідуально',
    desc: 'Комплексна AI-система',
    icon: Sparkles,
    features: [
      'Повна AI-інфраструктура',
      'Багато агентів та процесів',
      'Виділена команда підтримки',
      'Навчання кастомних моделей',
      'Гарантія SLA',
      'White-label рішення',
      'Розширена аналітика',
    ],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background - Monochrome */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-strong rounded-full mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white">Тарифи</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
            <span className="block text-white">Оберіть ваш</span>
            <span 
              className="block text-6xl md:text-8xl mt-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Рівень
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Усі плани адаптовані під ваші потреби. Без прихованих комісій.
          </p>
        </motion.div>

        {/* Pricing Cards - Monochrome */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div 
                    className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-white text-black rounded-full text-sm font-bold z-10 flex items-center gap-2"
                    style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                  >
                    <Sparkles className="w-4 h-4" fill="currentColor" />
                    НАЙПОПУЛЯРНІШИЙ
                  </div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full p-8 glass-strong rounded-3xl overflow-hidden border
                    ${plan.popular ? 'border-white/40' : 'border-white/10'}
                    transform transition-all duration-300 ease-out
                    hover:scale-[1.03] hover:-translate-y-2 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]`}
                >
                  {/* Gradient Background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-white
                        transform transition-transform duration-300 group-hover:scale-110"
                      style={{ boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)' }}
                    >
                      <Icon className="w-8 h-8 text-black" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-3xl font-bold font-heading mb-2 text-white">
                      {plan.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6">{plan.desc}</p>

                    {/* Price */}
                    <div className="mb-8">
                      <span 
                        className="text-5xl font-bold"
                        style={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {plan.price}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href={SCHEDULING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-4 rounded-full font-bold text-center 
                        transform transition-all duration-300 hover:scale-105
                        ${plan.popular
                          ? 'bg-white text-black'
                          : 'glass border border-white/30 text-white hover:bg-white/10'
                        }`}
                      style={plan.popular ? { boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)' } : {}}
                    >
                      {plan.popular ? 'Почати зараз' : 'Дізнатися більше'}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Потрібне індивідуальне рішення? <a href="#contact" className="text-white hover:underline font-semibold">Зв&apos;яжіться з нами</a>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Без прихованих комісій</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Скасувати будь-коли</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Швейцарська якість</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
