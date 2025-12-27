'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

type BookingsMap = Record<string, string[]>;

const STORAGE_KEY = 'ai-insider-bookings';

const SLOT_START_HOUR = 8;
const SLOT_START_MINUTE = 30;
const SLOT_END_HOUR = 20;
const SLOT_END_MINUTE = 0;

const generateSlots = () => {
  const slots: string[] = [];
  const current = new Date();
  current.setHours(SLOT_START_HOUR, SLOT_START_MINUTE, 0, 0);
  const end = new Date();
  end.setHours(SLOT_END_HOUR, SLOT_END_MINUTE, 0, 0);

  while (current < end) {
    const h = String(current.getHours()).padStart(2, '0');
    const m = String(current.getMinutes()).padStart(2, '0');
    slots.push(`${h}:${m}`);
    current.setMinutes(current.getMinutes() + 30);
  }

  return slots;
};

const HALF_HOUR_SLOTS = generateSlots();
const TOTAL_SLOTS_PER_DAY = HALF_HOUR_SLOTS.length;

const getDateKey = (monthDate: Date, day: number) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export default function BookCall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingsMap>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const benefits = [
    { icon: '💬', title: 'Q&A', desc: 'Get answers to all your questions' },
    { icon: '🎯', title: 'Customized marketing', desc: 'Suggestions and follow up with key highlights' },
    { icon: '📈', title: 'Product growth discussion', desc: 'Strategy for scaling your business' },
    { icon: '🚀', title: 'Essential guidance', desc: 'On the quickest way to reach point B' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setBookings(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    const key = getDateKey(currentMonth, selectedDate);
    setBookings((prev) => {
      const dayBookings = prev[key] || [];
      if (dayBookings.includes(selectedTime)) return prev;
      return { ...prev, [key]: [...dayBookings, selectedTime] };
    });
    setConfirmation(`Slot booked for ${monthName.split(' ')[0]} ${selectedDate} at ${selectedTime} (CET)`);
  };

  return (
    <section id="bookcall" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background - no animation */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(153, 69, 255, 0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 uppercase tracking-wider text-sm mb-4">
              Want to know more?
            </p>

            <h2 className="text-6xl md:text-7xl font-bold font-heading mb-6 leading-tight">
              BOOK<br />
              <span className="gradient-text">INTRO CALL</span>
            </h2>

            <p className="text-xl text-gray-300 mb-12">
              What do you get on this free meeting?
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-400">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-strong rounded-3xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Select a Day</h3>

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={previousMonth}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center transition-colors duration-200 hover:bg-white/10 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-semibold">{monthName}</span>
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-lg glass flex items-center justify-center transition-colors duration-200 hover:bg-white/10 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs text-gray-400 font-medium">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days - Pure CSS hover */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {Array.from({ length: (firstDay + 6) % 7 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const key = getDateKey(currentMonth, day);
                const bookedCount = bookings[key]?.length ?? 0;
                const isFullyBooked = bookedCount >= TOTAL_SLOTS_PER_DAY;
                const isSelected = selectedDate === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      if (isFullyBooked) return;
                      setSelectedDate(day);
                      setSelectedTime(null);
                      setConfirmation(null);
                    }}
                    disabled={isFullyBooked}
                    className={`
                      aspect-square rounded-lg text-sm font-semibold
                      transition-all duration-150 ease-out
                      ${isFullyBooked 
                        ? 'text-gray-600 cursor-not-allowed opacity-40' 
                        : 'text-white hover:bg-white/15 hover:scale-110 active:scale-95'
                      }
                      ${isSelected ? 'bg-gradient-to-br from-cyan-500 to-violet-500 text-white hover:scale-100' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Select a time</span>
                  <span className="text-xs text-gray-500">{monthName.split(' ')[0]} {selectedDate}</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {HALF_HOUR_SLOTS.map((slot) => {
                    const key = getDateKey(currentMonth, selectedDate);
                    const bookedForDay = bookings[key] || [];
                    const isBooked = bookedForDay.includes(slot);
                    const isSelectedTime = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          if (isBooked) return;
                          setSelectedTime(slot);
                          setConfirmation(null);
                        }}
                        disabled={isBooked}
                        className={`
                          text-xs md:text-sm px-3 py-2 rounded-full border transition-all duration-150
                          ${isBooked
                            ? 'border-white/10 text-gray-500 cursor-not-allowed line-through bg-white/5'
                            : isSelectedTime
                            ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                            : 'border-white/15 text-gray-200 hover:border-cyan-400 hover:bg-white/10'
                          }
                        `}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Slots are 30 minutes from 08:30 to 20:00. All times in Central European Time.
                </p>
              </div>
            )}

            {/* Time Zone */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Time zone</span>
                <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg transition-colors duration-200 hover:bg-white/10">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Central European Time (16:18)</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            {selectedDate && selectedTime && (
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full font-bold 
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30 active:scale-[0.98]"
              >
                Continue with {monthName.split(' ')[0]} {selectedDate} at {selectedTime}
              </button>
            )}

            {confirmation && (
              <p className="mt-3 text-xs text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {confirmation}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
