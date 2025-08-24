// Client-side compatible translation utilities
export type Language = 'en' | 'sv' | 'ar';

export interface TranslationOptions {
  text: string | string[];
  targetLanguage: Language;
  sourceLanguage?: Language;
}

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

// Language configuration
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
} as const;

export const DEFAULT_LANGUAGE: Language = 'en';

// Check if translation is needed
export const needsTranslation = (sourceLanguage: Language, targetLanguage: Language): boolean => {
  return sourceLanguage !== targetLanguage;
};

// Get browser language preference
export const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.split('-')[0];
  return Object.keys(SUPPORTED_LANGUAGES).includes(browserLang)
    ? browserLang as Language
    : DEFAULT_LANGUAGE;
};

// Client-side API call for translation
export const translateTextClient = async (
  options: TranslationOptions
): Promise<TranslationResult[]> => {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });

  if (!response.ok) {
    throw new Error('Translation API request failed');
  }

  const data = await response.json();
  
  if (!data.success || !data.translations) {
    throw new Error('Translation API response invalid');
  }

  return data.translations;
};
