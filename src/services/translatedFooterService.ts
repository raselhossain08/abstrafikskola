import { cache } from "react";
import type { Language } from '@/contexts/LanguageContext';
import type { FooterData } from './footerService';

// Helper function to check if translation is needed
const needsTranslation = (sourceLanguage: Language, targetLanguage: Language): boolean => {
  return sourceLanguage !== targetLanguage;
};

// Enhanced footer service with translation support
export const getTranslatedFooterData = cache(async (targetLanguage: Language = 'en'): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_BASE_URL}/footer`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    let footerData: FooterData;

    if (!response.ok) {
      console.error('Failed to fetch footer data, using default');
      const { getFooterData } = await import('./footerService');
      footerData = await getFooterData();
    } else {
      const result = await response.json();
      if (result.success && result.data) {
        footerData = result.data;
      } else {
        const { getFooterData } = await import('./footerService');
        footerData = await getFooterData();
      }
    }

    // If target language is English or no translation needed, return as is
    if (targetLanguage === 'en' || !needsTranslation('en', targetLanguage)) {
      return footerData;
    }

    // Translate footer content using API
    return await translateFooterContent(footerData, targetLanguage);
  } catch (error) {
    console.error('Error fetching translated footer data:', error);
    const { getFooterData } = await import('./footerService');
    return await getFooterData();
  }
});

// Translate footer content using API endpoint
async function translateFooterContent(footerData: FooterData, targetLanguage: Language): Promise<FooterData> {
  try {
    // Collect all text content that needs translation
    const textsToTranslate: string[] = [
      footerData.description,
      footerData.companySection.title,
      footerData.contactsSection.title,
      footerData.subscribeSection.title,
      footerData.subscribeSection.subtitle,
      footerData.subscribeSection.placeholder,
      footerData.subscribeSection.buttonText,
      footerData.footerBottom.text,
      ...footerData.companySection.links.map(link => link.name),
      ...footerData.socialLinks.map(link => link.name),
    ];

    // Call the translation API
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: textsToTranslate,
        targetLanguage,
        sourceLanguage: 'en',
      }),
    });

    if (!response.ok) {
      throw new Error('Translation API failed');
    }

    const result = await response.json();
    if (!result.success || !result.translations) {
      throw new Error('Translation response invalid');
    }

    const translations = result.translations;
    let translationIndex = 0;

    // Apply translations
    const translatedFooterData: FooterData = {
      ...footerData,
      description: translations[translationIndex++]?.translatedText || footerData.description,
      companySection: {
        ...footerData.companySection,
        title: translations[translationIndex++]?.translatedText || footerData.companySection.title,
        links: footerData.companySection.links.map(link => ({
          ...link,
          name: translations[translationIndex++]?.translatedText || link.name,
        })),
      },
      contactsSection: {
        ...footerData.contactsSection,
        title: translations[translationIndex++]?.translatedText || footerData.contactsSection.title,
      },
      subscribeSection: {
        ...footerData.subscribeSection,
        title: translations[translationIndex++]?.translatedText || footerData.subscribeSection.title,
        subtitle: translations[translationIndex++]?.translatedText || footerData.subscribeSection.subtitle,
        placeholder: translations[translationIndex++]?.translatedText || footerData.subscribeSection.placeholder,
        buttonText: translations[translationIndex++]?.translatedText || footerData.subscribeSection.buttonText,
      },
      footerBottom: {
        ...footerData.footerBottom,
        text: translations[translationIndex++]?.translatedText || footerData.footerBottom.text,
      },
      socialLinks: footerData.socialLinks.map(link => ({
        ...link,
        name: translations[translationIndex++]?.translatedText || link.name,
      })),
    };

    return translatedFooterData;
  } catch (error) {
    console.error('Error translating footer content:', error);
    return footerData; // Return original data if translation fails
  }
}

// Client-side fetch function for React components with translation
export const fetchTranslatedFooterData = async (targetLanguage: Language = 'en'): Promise<FooterData> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const response = await fetch(`${API_BASE_URL}/footer`);

    let footerData: FooterData;

    if (!response.ok) {
      console.error('Failed to fetch footer data');
      const { fetchFooterData } = await import('./footerService');
      footerData = await fetchFooterData();
    } else {
      const result = await response.json();
      if (result.success && result.data) {
        footerData = result.data;
      } else {
        const { fetchFooterData } = await import('./footerService');
        footerData = await fetchFooterData();
      }
    }

    // If target language is English or no translation needed, return as is
    if (targetLanguage === 'en') {
      return footerData;
    }

    // For client-side, use the translation API
    return await translateFooterContentClient(footerData, targetLanguage);
  } catch (error) {
    console.error('Error fetching translated footer data:', error);
    const { fetchFooterData } = await import('./footerService');
    return await fetchFooterData();
  }
};

// Client-side translation using the API
async function translateFooterContentClient(footerData: FooterData, targetLanguage: Language): Promise<FooterData> {
  try {
    // Collect all text content that needs translation
    const textsToTranslate: string[] = [
      footerData.description,
      footerData.companySection.title,
      footerData.contactsSection.title,
      footerData.subscribeSection.title,
      footerData.subscribeSection.subtitle,
      footerData.subscribeSection.placeholder,
      footerData.subscribeSection.buttonText,
      footerData.footerBottom.text,
      ...footerData.companySection.links.map(link => link.name),
      ...footerData.socialLinks.map(link => link.name),
    ];

    // Call the translation API
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: textsToTranslate,
        targetLanguage,
        sourceLanguage: 'en',
      }),
    });

    if (!response.ok) {
      throw new Error('Translation API failed');
    }

    const result = await response.json();
    if (!result.success || !result.translations) {
      throw new Error('Translation response invalid');
    }

    const translations = result.translations;
    let translationIndex = 0;

    // Apply translations
    const translatedFooterData: FooterData = {
      ...footerData,
      description: translations[translationIndex++]?.translatedText || footerData.description,
      companySection: {
        ...footerData.companySection,
        title: translations[translationIndex++]?.translatedText || footerData.companySection.title,
        links: footerData.companySection.links.map(link => ({
          ...link,
          name: translations[translationIndex++]?.translatedText || link.name,
        })),
      },
      contactsSection: {
        ...footerData.contactsSection,
        title: translations[translationIndex++]?.translatedText || footerData.contactsSection.title,
      },
      subscribeSection: {
        ...footerData.subscribeSection,
        title: translations[translationIndex++]?.translatedText || footerData.subscribeSection.title,
        subtitle: translations[translationIndex++]?.translatedText || footerData.subscribeSection.subtitle,
        placeholder: translations[translationIndex++]?.translatedText || footerData.subscribeSection.placeholder,
        buttonText: translations[translationIndex++]?.translatedText || footerData.subscribeSection.buttonText,
      },
      footerBottom: {
        ...footerData.footerBottom,
        text: translations[translationIndex++]?.translatedText || footerData.footerBottom.text,
      },
      socialLinks: footerData.socialLinks.map(link => ({
        ...link,
        name: translations[translationIndex++]?.translatedText || link.name,
      })),
    };

    return translatedFooterData;
  } catch (error) {
    console.error('Error translating footer content client-side:', error);
    return footerData; // Return original data if translation fails
  }
}
