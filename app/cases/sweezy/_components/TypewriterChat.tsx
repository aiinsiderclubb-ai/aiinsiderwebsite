'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowUp } from 'lucide-react';

export interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

interface TypewriterChatProps {
  title: string;
  online: string;
  placeholder: string;
  messages: ChatMessage[];
  chips?: string[];
}

/**
 * Scripted AI chat with word-chunked typewriter animation.
 * Pauses entirely when the component is off-screen (IntersectionObserver),
 * and yields to requestAnimationFrame to keep the main thread responsive.
 */
export default function TypewriterChat({ title, online, placeholder, messages, chips = [] }: TypewriterChatProps) {
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let cancelled = false;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          if (!cancelled) resolve();
        }, ms);
        return () => clearTimeout(id);
      });

    // Split text into word-chunks (keeping trailing spaces/newlines with the word).
    const chunkWords = (text: string): string[] => {
      const out: string[] = [];
      const regex = /\S+\s*|\s+/g;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        out.push(match[0]);
      }
      return out;
    };

    const run = async () => {
      while (!cancelled) {
        setVisibleMessages([]);
        setTypingText('');
        await delay(500);

        for (let i = 0; i < messages.length; i++) {
          if (cancelled) return;
          const msg = messages[i];

          if (msg.role === 'user') {
            setVisibleMessages((prev) => [...prev, msg]);
            await delay(850);
          } else {
            setIsTyping(true);
            await delay(500);
            const chunks = chunkWords(msg.text);
            let built = '';
            for (let c = 0; c < chunks.length; c++) {
              if (cancelled) return;
              built += chunks[c];
              setTypingText(built);
              // Pause by word length — short words fly, punctuation hangs a bit.
              const base = 42;
              const pause =
                base +
                Math.min(80, chunks[c].length * 8) +
                (/[.!?]\s*$/.test(chunks[c]) ? 140 : 0) +
                (/\n/.test(chunks[c]) ? 180 : 0);
              await delay(pause);
            }
            setIsTyping(false);
            setVisibleMessages((prev) => [...prev, { role: 'ai', text: msg.text }]);
            setTypingText('');
            await delay(650);
          }
        }

        await delay(6000);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [messages, isVisible]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, typingText]);

  return (
    <div
      ref={rootRef}
      className="relative w-full rounded-3xl border border-white/10 overflow-hidden"
      style={{
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(0,87,184,0.08) 50%, rgba(255,215,0,0.04) 100%)',
        boxShadow: '0 20px 60px -20px rgba(0,87,184,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#0a0c12]/70">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0057B8] to-[#6eb1ff] flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0c12]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-white">{title}</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {online}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/60">GPT-5</div>
        </div>
      </div>

      <div ref={scrollRef} className="px-5 py-6 min-h-[340px] max-h-[420px] overflow-y-auto space-y-3">
        <AnimatePresence initial={false}>
          {visibleMessages.map((msg, idx) => (
            <motion.div
              key={`${idx}-${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057B8] to-[#6eb1ff] flex items-center justify-center mr-2 flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[78%] px-4 py-3 text-sm whitespace-pre-line leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-2xl rounded-br-md bg-gradient-to-br from-[#0057B8] to-[#004494] text-white shadow-lg shadow-[#0057B8]/30'
                    : 'rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 text-white/90'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057B8] to-[#6eb1ff] flex items-center justify-center mr-2 flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="max-w-[78%] px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 text-sm text-white/90 whitespace-pre-line leading-relaxed">
              {typingText}
              <span className="inline-block w-[2px] h-4 bg-[#FFD700] ml-0.5 -mb-0.5 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {chips.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {chips.map((chip, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs text-white/70 bg-white/5 border border-white/10 hover:border-[#FFD700]/40 transition-colors"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      <div className="px-5 pb-5">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-black/30 border border-white/10">
          <span className="text-sm text-white/40 flex-1">{placeholder}</span>
          <button className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFB800] text-black flex items-center justify-center shadow-lg shadow-[#FFD700]/30">
            <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
