'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();
  const isDark = theme === 'dark';
  const label = isDark
    ? lang === 'uk'
      ? 'Переключити на світлу тему'
      : 'Switch to light theme'
    : lang === 'uk'
      ? 'Переключити на темну тему'
      : 'Switch to dark theme';

  return (
    <motion.button
      onClick={toggleTheme}
      type="button"
      className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 transition-all duration-200 hover:bg-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={label}
      aria-label={label}
      aria-pressed={!isDark}
    >
      {isDark ? <Sun className="w-4 h-4 text-gray-300" /> : <Moon className="w-4 h-4 text-gray-700" />}
      <span className={`text-xs font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {isDark ? (lang === 'uk' ? 'Світла' : 'Light') : lang === 'uk' ? 'Темна' : 'Dark'}
      </span>
    </motion.button>
  );
}
