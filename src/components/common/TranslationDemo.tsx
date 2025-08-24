'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslatedText, TranslatedContent } from '@/components/common/TranslatedText';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { fetchTranslatedFooterData } from '@/services/translatedFooterService';
import type { FooterData } from '@/services/footerService';

export const TranslationDemo: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const { translate, translateBatch, isTranslating, error, clearCache } = useTranslation();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [customText, setCustomText] = useState('');
  const [translatedCustomText, setTranslatedCustomText] = useState('');

  // Load footer data with translations
  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const data = await fetchTranslatedFooterData(language);
        setFooterData(data);
      } catch (error) {
        console.error('Error loading footer data:', error);
      }
    };

    loadFooterData();
  }, [language]);

  // Handle custom text translation
  const handleTranslateCustomText = async () => {
    if (!customText.trim()) return;
    
    const result = await translate(customText);
    setTranslatedCustomText(result);
  };

  const sampleTexts = [
    'Welcome to our driving school',
    'Learn to drive with confidence',
    'Professional driving instructors',
    'Book your lesson today',
  ];

  return (
    <div className={`p-6 space-y-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          <TranslatedText text="Google Cloud Translation Demo" />
        </h1>
        <p className="text-gray-600">
          <TranslatedText text="This page demonstrates the Google Cloud Translation API integration for Arabic, Swedish, and English." />
        </p>
        
        {/* Language Switcher */}
        <div className="flex justify-center space-x-4">
          <LanguageSwitcher variant="buttons" showFlags />
        </div>
        
        <div className="text-sm text-gray-500">
          Current Language: <strong>{language.toUpperCase()}</strong> 
          {isRTL && <span className="ml-2">(RTL)</span>}
        </div>
      </div>

      {/* Translation Status */}
      {isTranslating && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800">Translating...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Translation Error: {error}
        </div>
      )}

      {/* Single Text Translation */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <TranslatedText text="Single Text Translation" />
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <TranslatedText text="Enter text to translate:" />
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your text here..."
              />
              <button
                onClick={handleTranslateCustomText}
                disabled={!customText.trim() || isTranslating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TranslatedText text="Translate" />
              </button>
            </div>
          </div>
          
          {translatedCustomText && (
            <div className="bg-gray-50 p-3 rounded-md">
              <strong>
                <TranslatedText text="Translation:" />
              </strong>
              <p className="mt-1">{translatedCustomText}</p>
            </div>
          )}
        </div>
      </div>

      {/* Batch Translation Example */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <TranslatedText text="Batch Translation Example" />
        </h2>
        
        <TranslatedContent texts={sampleTexts}>
          {(translations: string[]) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleTexts.map((original, index) => (
                <div key={index} className="border border-gray-200 p-3 rounded-md">
                  <div className="text-sm text-gray-500 mb-1">Original (EN):</div>
                  <div className="mb-2">{original}</div>
                  <div className="text-sm text-gray-500 mb-1">
                    Translated ({language.toUpperCase()}):
                  </div>
                  <div className="font-medium text-blue-600">{translations[index]}</div>
                </div>
              ))}
            </div>
          )}
        </TranslatedContent>
      </div>

      {/* Dynamic Content Translation (Footer Example) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <TranslatedText text="Dynamic Content Translation" />
        </h2>
        
        {footerData ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                <TranslatedText text="Website Description:" />
              </h3>
              <p className="text-gray-600">{footerData.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                <TranslatedText text="Company Links:" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {footerData.companySection.links.slice(0, 4).map(link => (
                  <span
                    key={link._id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {link.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">
                <TranslatedText text="Subscribe Section:" />
              </h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium">{footerData.subscribeSection.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{footerData.subscribeSection.subtitle}</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="email"
                    placeholder={footerData.subscribeSection.placeholder}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
                    disabled
                  />
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    disabled
                  >
                    {footerData.subscribeSection.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Loading footer data...</div>
        )}
      </div>

      {/* Translation Cache Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <TranslatedText text="Translation Cache Management" />
        </h2>
        
        <p className="text-gray-600 mb-4">
          <TranslatedText text="Translations are cached to improve performance. You can clear the cache if needed." />
        </p>
        
        <button
          onClick={clearCache}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <TranslatedText text="Clear Translation Cache" />
        </button>
      </div>

      {/* Language Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <TranslatedText text="Language Information" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong>English (en)</strong>
            <p className="text-gray-600">Default language, left-to-right</p>
          </div>
          <div>
            <strong>Swedish (sv)</strong>
            <p className="text-gray-600">Svenska, left-to-right</p>
          </div>
          <div>
            <strong>Arabic (ar)</strong>
            <p className="text-gray-600">العربية, right-to-left</p>
          </div>
        </div>
      </div>
    </div>
  );
};
