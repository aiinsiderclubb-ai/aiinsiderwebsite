'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, X, Loader2, Send, User, Mail, Building2, MessageSquare } from 'lucide-react';

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

const formatDateForEmail = (monthDate: Date, day: number) => {
  const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function BookCall() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingsMap>({});
  const [confirmation, setConfirmation] = useState<string | null>(null);
  
  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;
    setShowBookingForm(true);
    setFormError(null);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) return;
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Please fill in your name and email');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim() || undefined,
          date: formatDateForEmail(currentMonth, selectedDate),
          time: selectedTime,
          timezone: 'Central European Time (CET)',
          message: formData.message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book');
      }

      // Save booking locally
      const key = getDateKey(currentMonth, selectedDate);
      setBookings((prev) => {
        const dayBookings = prev[key] || [];
        if (dayBookings.includes(selectedTime)) return prev;
        return { ...prev, [key]: [...dayBookings, selectedTime] };
      });

      setBookingSuccess(true);
      setConfirmation(`Booked for ${monthName.split(' ')[0]} ${selectedDate} at ${selectedTime} (CET)`);
      
      // Reset form after success
      setTimeout(() => {
        setShowBookingForm(false);
        setBookingSuccess(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Booking error:', error);
      setFormError(error instanceof Error ? error.message : 'Failed to book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
    setFormError(null);
    setBookingSuccess(false);
  };

  return (
    <section id="bookcall" className="relative py-32 px-6 overflow-hidden">
      {/* Static Background - no animation */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full gpu-accelerated"
        style={{ 
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-xl">
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
                      ${isSelected ? 'bg-white text-black hover:scale-100' : ''}
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
                            ? 'border-white bg-white text-black font-bold'
                            : 'border-white/15 text-gray-200 hover:border-white/40 hover:bg-white/10'
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
                  <span className="text-sm">Central European Time</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Continue Button */}
            {selectedDate && selectedTime && (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full mt-6 px-6 py-4 bg-white text-black rounded-full font-bold 
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30 active:scale-[0.98]"
              >
                Continue with {monthName.split(' ')[0]} {selectedDate} at {selectedTime}
              </button>
            )}

            {confirmation && !showBookingForm && (
              <p className="mt-3 text-xs text-green-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {confirmation}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeBookingForm}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-strong rounded-3xl border border-white/20 overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(255, 255, 255, 0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">Complete Your Booking</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {formatDateForEmail(currentMonth, selectedDate!)} at {selectedTime}
                </p>
              </div>
              <button
                onClick={closeBookingForm}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form */}
            {!bookingSuccess ? (
              <form onSubmit={handleSubmitBooking} className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@company.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company (optional)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your Company"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    What would you like to discuss? (optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your project or questions..."
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {formError && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <X className="w-4 h-4" /> {formError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black rounded-full font-bold flex items-center justify-center gap-2
                    transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/30 
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By booking, you agree to receive a confirmation email from AI Insider.
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </motion.div>
                <h4 className="text-2xl font-bold text-white mb-2">Booking Confirmed! ✨</h4>
                <p className="text-gray-400 mb-4">
                  Check your email for confirmation details.
                </p>
                <div className="glass rounded-xl p-4 text-left">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Date:</strong> {formatDateForEmail(currentMonth, selectedDate!)}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    <strong className="text-white">Time:</strong> {selectedTime} (CET)
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
