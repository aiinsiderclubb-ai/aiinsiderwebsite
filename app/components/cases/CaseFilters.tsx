'use client';

import { motion } from 'framer-motion';
import { categoryFilters, CaseCategory, getLocalizedText } from '@/app/lib/casesData';
import { useLanguage } from '@/app/context/LanguageContext';

interface CaseFiltersProps {
  activeFilter: CaseCategory | 'all';
  onFilterChange: (filter: CaseCategory | 'all') => void;
  caseCounts: Record<CaseCategory | 'all', number>;
}

export default function CaseFilters({ activeFilter, onFilterChange, caseCounts }: CaseFiltersProps) {
  const { lang } = useLanguage();
  
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categoryFilters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = caseCounts[filter.id];
        
        return (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium
              transition-all duration-200 border
              ${isActive 
                ? 'bg-white text-black border-white shadow-lg shadow-white/20' 
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <span className="text-base">{filter.icon}</span>
            <span>{getLocalizedText(filter.label, lang)}</span>
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${isActive 
                ? 'bg-black/10 text-black/70' 
                : 'bg-white/10 text-gray-400'
              }
            `}>
              {count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
