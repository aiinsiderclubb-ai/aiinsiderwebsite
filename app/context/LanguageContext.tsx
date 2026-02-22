'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, t } from '../lib/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Language;
}) {
  const [lang, setLangState] = useState<Language>(initialLang);

  // Keep state in sync with route-based initialLang
  useEffect(() => {
    setLangState(initialLang);
  }, [initialLang]);

  // Keep <html lang="..."> in sync (useful for accessibility and SEO hints)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'uk' ? 'uk-UA' : 'en';
    }
  }, [lang]);

  // Save language to localStorage when it changes
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiinsider-lang', newLang);
    }
  };

  // Toggle between languages
  const toggleLang = () => {
    setLang(lang === 'uk' ? 'en' : 'uk');
  };

  // Wrapper for translation function
  const translate = (key: string): string => {
    return t(key, lang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

