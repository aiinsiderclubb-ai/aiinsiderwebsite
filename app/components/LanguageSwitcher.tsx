'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 
        transition-all duration-200 hover:bg-white/10 hover:border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={lang === 'uk' ? 'Switch to English' : 'Перемкнути на українську'}
    >
      <Globe className="w-4 h-4 text-gray-400" />
      <div className="flex items-center gap-1">
        <span 
          className={`text-xs font-bold transition-colors ${
            lang === 'uk' ? 'text-white' : 'text-gray-500'
          }`}
        >
          UA
        </span>
        <span className="text-gray-600">/</span>
        <span 
          className={`text-xs font-bold transition-colors ${
            lang === 'en' ? 'text-white' : 'text-gray-500'
          }`}
        >
          EN
        </span>
      </div>
    </motion.button>
  );
}

