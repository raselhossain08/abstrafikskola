'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type Language = 'en' | 'sv' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

// Cookie utility functions
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguageState] = useState<Language>(
    initialLanguage || 'en'
  );

  useEffect(() => {
    // Load language from cookies on mount
    const savedLang = getCookie('language') as Language;
    if (savedLang && ['en', 'sv', 'ar'].includes(savedLang)) {
      setLanguageState(savedLang);
      // Update document direction immediately
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    } else if (initialLanguage) {
      setLanguageState(initialLanguage);
      // Update document direction immediately
      document.documentElement.dir = initialLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = initialLanguage;
    }
  }, [initialLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCookie('language', lang, 365); // Cookie expires in 1 year

    // Also call API to set server-side cookie
    fetch(`${API_BASE_URL}/language`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: lang }),
    }).catch(console.error);

    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const isRTL = language === 'ar';

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
