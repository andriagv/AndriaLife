
import React, { createContext, useContext, useState, useEffect } from 'react';

// Language data
import { translations } from '../utils/translations';

type Language = 'en' | 'ka';

interface LanguageContextType {
  language: Language;
  t: (key: keyof typeof translations.en) => string;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ka');

  useEffect(() => {
    // Check if user previously selected a language
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: keyof typeof translations.en): string => {
    return (translations as any)[language][key] || (translations as any).en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
