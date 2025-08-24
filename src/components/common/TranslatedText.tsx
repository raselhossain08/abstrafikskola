'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/contexts/LanguageContext';

interface TranslatedTextProps {
  text: string;
  targetLanguage?: Language;
  className?: string;
  fallback?: string;
  enableCaching?: boolean;
}

/**
 * TranslatedText component that automatically translates text based on the current language context
 */
export const TranslatedText: React.FC<TranslatedTextProps> = ({
  text,
  targetLanguage,
  className,
  fallback,
  enableCaching = true,
}) => {
  const { language } = useLanguage();
  const { translate, isTranslating } = useTranslation();
  const [translatedText, setTranslatedText] = useState<string>(text);

  const currentTargetLanguage = targetLanguage || language;

  useEffect(() => {
    const performTranslation = async () => {
      if (!text || text.trim() === '') {
        setTranslatedText(fallback || text);
        return;
      }

      try {
        const result = await translate(text, currentTargetLanguage);
        setTranslatedText(result || fallback || text);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(fallback || text);
      }
    };

    performTranslation();
  }, [text, currentTargetLanguage, translate, fallback]);

  return (
    <span className={className}>
      {isTranslating ? (fallback || text) : translatedText}
    </span>
  );
};

interface TranslatedContentProps {
  children: React.ReactNode | ((translations: string[]) => React.ReactNode);
  texts: string[];
  targetLanguage?: Language;
  onTranslationsReady?: (translations: string[]) => void;
}

/**
 * TranslatedContent component that translates multiple texts and provides them to children
 */
export const TranslatedContent: React.FC<TranslatedContentProps> = ({
  children,
  texts,
  targetLanguage,
  onTranslationsReady,
}) => {
  const { language } = useLanguage();
  const { translateBatch } = useTranslation();
  const [translations, setTranslations] = useState<string[]>(texts);

  const currentTargetLanguage = targetLanguage || language;

  useEffect(() => {
    const performBatchTranslation = async () => {
      if (!texts.length) return;

      try {
        const results = await translateBatch(texts, currentTargetLanguage);
        setTranslations(results);
        onTranslationsReady?.(results);
      } catch (error) {
        console.error('Batch translation error:', error);
        setTranslations(texts);
        onTranslationsReady?.(texts);
      }
    };

    performBatchTranslation();
  }, [texts, currentTargetLanguage, translateBatch, onTranslationsReady]);

  return (
    <>
      {typeof children === 'function'
        ? (children as (translations: string[]) => React.ReactNode)(translations)
        : children}
    </>
  );
};
