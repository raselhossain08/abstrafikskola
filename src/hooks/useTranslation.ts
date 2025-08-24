'use client';

import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

interface TranslationCache {
  [key: string]: string;
}

interface UseTranslationResult {
  translate: (text: string, targetLanguage?: Language) => Promise<string>;
  translateBatch: (texts: string[], targetLanguage?: Language) => Promise<string[]>;
  isTranslating: boolean;
  error: string | null;
  clearCache: () => void;
}

// In-memory cache for translations
const translationCache: TranslationCache = {};

const getCacheKey = (text: string, targetLanguage: string, sourceLanguage: string): string => {
  return `${sourceLanguage}-${targetLanguage}-${text}`;
};

export const useTranslation = (): UseTranslationResult => {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async (
    text: string, 
    targetLanguage: Language = language
  ): Promise<string> => {
    if (!text.trim()) return text;

    // Check cache first
    const cacheKey = getCacheKey(text, targetLanguage, 'auto');
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();
      
      if (data.success && data.translations && data.translations[0]) {
        const translatedText = data.translations[0].translatedText;
        
        // Cache the translation
        translationCache[cacheKey] = translatedText;
        
        return translatedText;
      } else {
        throw new Error('Translation response invalid');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      console.error('Translation error:', err);
      
      // Return original text if translation fails
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const translateBatch = useCallback(async (
    texts: string[], 
    targetLanguage: Language = language
  ): Promise<string[]> => {
    if (!texts.length) return texts;

    // Check cache for all texts
    const cachedResults: string[] = [];
    const uncachedTexts: string[] = [];
    const uncachedIndices: number[] = [];

    texts.forEach((text, index) => {
      if (!text.trim()) {
        cachedResults[index] = text;
        return;
      }

      const cacheKey = getCacheKey(text, targetLanguage, 'auto');
      if (translationCache[cacheKey]) {
        cachedResults[index] = translationCache[cacheKey];
      } else {
        uncachedTexts.push(text);
        uncachedIndices.push(index);
      }
    });

    // If all texts are cached, return cached results
    if (uncachedTexts.length === 0) {
      return cachedResults;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: uncachedTexts,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Batch translation request failed');
      }

      const data = await response.json();
      
      if (data.success && data.translations) {
        data.translations.forEach((result: { translatedText: string }, i: number) => {
          const originalIndex = uncachedIndices[i];
          const translatedText = result.translatedText;
          
          // Update result array
          cachedResults[originalIndex] = translatedText;
          
          // Cache the translation
          const cacheKey = getCacheKey(uncachedTexts[i], targetLanguage, 'auto');
          translationCache[cacheKey] = translatedText;
        });
        
        return cachedResults;
      } else {
        throw new Error('Batch translation response invalid');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Batch translation failed';
      setError(errorMessage);
      console.error('Batch translation error:', err);
      
      // Return original texts if translation fails
      return texts;
    } finally {
      setIsTranslating(false);
    }
  }, [language]);

  const clearCache = useCallback(() => {
    Object.keys(translationCache).forEach(key => {
      delete translationCache[key];
    });
  }, []);

  return {
    translate,
    translateBatch,
    isTranslating,
    error,
    clearCache,
  };
};
