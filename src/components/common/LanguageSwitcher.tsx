'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

// Client-side supported languages configuration
const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
} as const;

interface LanguageSwitcherProps {
  className?: string;
  showFlags?: boolean;
  variant?: 'dropdown' | 'buttons' | 'inline';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showFlags = true,
  variant = 'dropdown',
}) => {
  const { language, setLanguage, isRTL } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      
      // Optional: Reload page to ensure all content is updated
      // setTimeout(() => window.location.reload(), 100);
    }
  };

  const languages = Object.entries(SUPPORTED_LANGUAGES) as [Language, typeof SUPPORTED_LANGUAGES[Language]][];

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map(([code, { name, nativeName, flag }]) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`
              px-3 py-2 rounded-md text-sm font-medium transition-colors
              ${language === code
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${isRTL ? 'text-right' : 'text-left'}
            `}
            aria-label={`Switch to ${name}`}
          >
            {showFlags && <span className="mr-2">{flag}</span>}
            {nativeName}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {languages.map(([code, { name, nativeName, flag }], index) => (
          <React.Fragment key={code}>
            <button
              onClick={() => handleLanguageChange(code)}
              className={`
                px-2 py-1 text-sm transition-colors
                ${language === code
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
                }
              `}
              aria-label={`Switch to ${name}`}
            >
              {showFlags && <span className="mr-1">{flag}</span>}
              {code.toUpperCase()}
            </button>
            {index < languages.length - 1 && (
              <span className="text-gray-400">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`}>
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value as Language)}
        className={`
          appearance-none bg-white border border-gray-300 rounded-md px-3 py-2
          text-sm font-medium text-gray-700 cursor-pointer
          hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
          ${isRTL ? 'text-right pl-8 pr-3' : 'text-left pr-8 pl-3'}
        `}
        aria-label="Select language"
      >
        {languages.map(([code, { name, nativeName, flag }]) => (
          <option key={code} value={code}>
            {showFlags ? `${flag} ${nativeName}` : nativeName}
          </option>
        ))}
      </select>
      
      {/* Dropdown arrow */}
      <div className={`
        absolute inset-y-0 flex items-center pointer-events-none
        ${isRTL ? 'left-0 pl-2' : 'right-0 pr-2'}
      `}>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
