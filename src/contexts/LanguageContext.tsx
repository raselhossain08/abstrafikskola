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
  // Simple initialization - always start with 'sv' default and then update from cookie
  const [language, setLanguageState] = useState<Language>('sv');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load saved language from cookie after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
    
    // Get saved language from cookie
    const savedLang = getCookie('language') as Language;
    console.log(`🍪 [LanguageContext] Checking cookie on mount: ${savedLang}`);
    
    if (savedLang && ['en', 'sv', 'ar'].includes(savedLang)) {
      console.log(`🔄 [LanguageContext] Setting language from cookie: ${savedLang}`);
      setLanguageState(savedLang);
    } else if (initialLanguage && initialLanguage !== language) {
      console.log(`🔄 [LanguageContext] Using initial language: ${initialLanguage}`);
      setLanguageState(initialLanguage);
    } else {
      console.log(`🔄 [LanguageContext] Keeping default language: sv`);
    }
  }, []); // Run only once on mount

  const setLanguage = async (lang: Language) => {
    if (lang === language) {
      console.log(`🌐 [LanguageContext] Language ${lang} already active, skipping`);
      return; // Don't update if same language
    }
    
    console.log(`🌐 [LanguageContext] Switching language from ${language} to ${lang}`);
    setIsChangingLanguage(true);
    
    try {
      // Update state immediately for responsive UI
      setLanguageState(lang);
      setCookie('language', lang, 365); // Cookie expires in 1 year
      console.log(`🍪 [LanguageContext] Language cookie set to: ${lang}`);
      
      // Verify cookie was set
      const verification = getCookie('language');
      console.log(`🔍 [LanguageContext] Cookie verification: ${verification}`);

      // Call Next.js API route to set server-side cookie (non-blocking)
      fetch('/api/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: lang }),
      }).catch(console.error);
      
    } catch (error) {
      console.error('❌ [LanguageContext] Error setting language:', error);
    } finally {
      // Add small delay for smooth transition
      setTimeout(() => {
        setIsChangingLanguage(false);
      }, 300);
    }
  };

  const isRTL = language === 'ar';

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
  };

  // Prevent hydration mismatch by not rendering transition until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className={`transition-opacity duration-200 ${isChangingLanguage ? 'opacity-90' : 'opacity-100'}`}>
        {children}
      </div>
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
