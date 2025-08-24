// This file should only be imported on the server-side
import { Translate } from '@google-cloud/translate/build/src/v2';

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

// Check if translation is needed
export const needsTranslation = (sourceLanguage: Language, targetLanguage: Language): boolean => {
  return sourceLanguage !== targetLanguage;
};

// Server-side only translation function
export const translateTextServerSide = async (
  options: TranslationOptions
): Promise<TranslationResult[]> => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
  }

  const translate = new Translate({
    key: apiKey,
  });
  
  const [translations, metadata] = await translate.translate(
    Array.isArray(options.text) ? options.text : [options.text],
    {
      from: options.sourceLanguage,
      to: options.targetLanguage,
    }
  );

  const results = Array.isArray(translations) 
    ? translations 
    : [translations];

  return results.map((text, index) => ({
    translatedText: text,
    detectedSourceLanguage: metadata?.data?.translations?.[index]?.detectedSourceLanguage,
  }));

};

// Server-side language detection
export const detectLanguageServerSide = async (text: string): Promise<string> => {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not configured');
  }

  const translate = new Translate({
    key: apiKey,
  });
  
  const [detection] = await translate.detect(text);
  return detection.language || 'en';
};
