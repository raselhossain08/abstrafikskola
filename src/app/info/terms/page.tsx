'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'; // shadcn badge
import { CheckCircle } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import Contact from '@/components/common/Contact';
import termsContentService from '@/services/termsContentService';
import type { TermsContent } from '@/services/termsContentService';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
  // All hooks must be at the top level and in consistent order
  const [content, setContent] = useState<TermsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get current language from context - must be after state hooks
  const { language, isRTL } = useLanguage();

  // Load content when language changes
  useEffect(() => {
    const loadTermsContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔄 Loading terms content for language: ${language}`);
        const termsData = await termsContentService.getTermsContent(language);
        
        setContent(termsData);
        console.log(`✅ Terms content loaded successfully for ${language}`, termsData.title);
      } catch (err) {
        console.error(`❌ Failed to load terms content for ${language}:`, err);
        setError('Failed to load terms information');
      } finally {
        setLoading(false);
      }
    };

    loadTermsContent();
  }, [language]); // Reload when language changes

  if (loading) {
    return (
      <section className="bg-[#F7FAFF] py-12 md:py-[80px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="flex justify-between w-full items-start md:flex-row flex-col-reverse">
            <div className="w-full md:w-1/2 xl:w-[648px]">
              <div className="animate-pulse">
                {/* Title skeleton */}
                <div className="h-12 bg-gray-300 rounded-lg w-80 mb-10"></div>
                
                {/* Terms skeleton */}
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="space-y-2">
                      {/* Term title skeleton */}
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
                        <div className="h-6 bg-gray-300 rounded w-64"></div>
                      </div>
                      {/* Term description skeleton */}
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      {/* Term items skeleton */}
                      <div className="space-y-1 ml-9">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-[648px] pb-12 md:pb-0">
              <div className="h-[516px] bg-gray-300 rounded-[24px] animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !content) {
    return (
      <section className="bg-[#F7FAFF] py-12 md:py-[80px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto text-center">
          <h1 className="text-red-600 text-2xl font-bold mb-4">
            {language === 'sv' ? 'Fel vid laddning av Villkor & Bestämmelser' :
             language === 'ar' ? 'خطأ في تحميل الشروط والأحكام' :
             'Error Loading Terms & Conditions'}
          </h1>
          <p className="text-gray-600">
            {error || (
              language === 'sv' ? 'Kunde inte ladda villkorens innehåll' :
              language === 'ar' ? 'غير قادر على تحميل محتوى الشروط' :
              'Unable to load terms content'
            )}
          </p>
        </div>
      </section>
    );
  }

  // Filter and sort active terms
  const activeTerms = content.terms
    .filter(term => term.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="bg-[#F7FAFF] py-12 md:py-[80px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className={`flex justify-between w-full items-start ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col-reverse`}>
            {/* Content */}
            <div className="w-full md:w-1/2 xl:w-[648px]">
              <h1 className={`text-24 md:text-56 font-bold my-4 md:mb-10 md:mt-0 text-[#1D1F2C] ${isRTL ? 'text-right' : 'text-left'}`}>
                {content.title}
              </h1>

              {content.subtitle && (
                <p className={`text-[#4A4C56] mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {content.subtitle}
                </p>
              )}

              <div className="space-y-6">
                {activeTerms.map((term) => (
                  <div key={term.id}>
                    <div className={`flex items-center mb-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                      <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12 shrink-0">
                        <FaCheck />
                      </div>
                      <h3 className={`text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ${isRTL ? 'text-right' : 'text-left'}`}>
                        {term.title}
                      </h3>
                    </div>
                    
                    {term.description && (
                      <p className={`text-16 tracking-[0.5%] font-normal leading-[140%] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {term.description}
                      </p>
                    )}

                    {term.items && term.items.length > 0 && (
                      <ul className="space-y-1">
                        {term.items.map((item, index) => (
                          <li key={index}>
                            <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                              <div className={`dot mt-2 shrink-0 ${isRTL ? 'ml-2' : 'mr-2'}`}></div>
                              <p className={`text-18 font-medium ${isRTL ? 'text-right' : 'text-left'} ${term.id === 'term-2' || term.id === 'term-4' ? 'max-w-[632px]' : ''}`}>
                                {item.isBold && item.text.includes(':') ? (
                                  <>
                                    <strong>{item.text.split(':')[0]}:</strong>
                                    {item.text.split(':').slice(1).join(':')}
                                  </>
                                ) : (
                                  <span className={item.isBold ? 'font-bold' : 'font-medium'}>
                                    {item.text}
                                  </span>
                                )}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full md:w-1/2 xl:w-[648px] pb-12 md:pb-0">
              <div className="h-[516px] sm:h-[500px] p-3">
                <Image 
                  src={content.heroImage.url} 
                  alt={content.heroImage.alt} 
                  width={600}
                  height={400}
                  className="rounded-[24px] w-full h-[516px] md:h-[500px] relative z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
