'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroContentService, { type HeroContent } from '@/services/heroContentService';

interface UseHeroContentReturn {
  content: HeroContent | null;
  isLoading: boolean;
  error: string | null;
}

export const useHeroContent = (): UseHeroContentReturn => {
  const { language } = useLanguage();
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      console.log(`🎯 [useHeroContent] Loading content for language: ${language}`);
      
      try {
        setIsLoading(true);
        const data = await heroContentService.getHeroContent(language);
        
        setContent(data);
        setError(null);
        
        console.log(`✅ [useHeroContent] Content set for ${language}:`, {
          title: data.mainContent.title,
          welcome: data.mainContent.welcome,
          subtitle: data.mainContent.subtitle.substring(0, 50) + '...',
          backgroundImageUrl: data.backgroundImage.url,
          centerIconUrl: data.centerIcon.url,
          featuresCount: data.features.length,
          isRealData: data.id !== 'fallback'
        });
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load hero content';
        setError(errorMessage);
        console.error(`❌ [useHeroContent] Error loading hero content for ${language}:`, errorMessage, err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();

    // Listen for cache updates
    const unsubscribe = heroContentService.addListener(() => {
      console.log(`� [useHeroContent] Cache updated, reloading content for ${language}`);
      loadContent();
    });

    return unsubscribe;
  }, [language]);

  return {
    content,
    isLoading,
    error,
  };
};
