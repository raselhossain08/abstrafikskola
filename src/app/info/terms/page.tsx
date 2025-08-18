'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge'; // shadcn badge
import { CheckCircle } from 'lucide-react';
import { FaCheck } from 'react-icons/fa6';
import Contact from '@/components/common/Contact';
import termsContentService, { TermsContent } from '@/services/termsContentService';

export default function Page() {
  const [content, setContent] = useState<TermsContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTermsContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const termsData = await termsContentService.getTermsContent();
        setContent(termsData);
      } catch (err) {
        console.error('Failed to load terms content:', err);
        setError('Failed to load terms information');
      } finally {
        setLoading(false);
      }
    };

    loadTermsContent();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F7FAFF] py-12 md:py-[80px] px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="flex justify-between w-full items-start md:flex-row flex-col-reverse">
            <div className="w-full md:w-1/2 xl:w-[648px]">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-300 rounded w-80 mb-10"></div>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i}>
                      <div className="h-6 bg-gray-300 rounded w-64 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-[648px] pb-12 md:pb-0">
              <div className="h-[516px] bg-gray-200 rounded-[24px]"></div>
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
          <h1 className="text-red-600 text-2xl font-bold mb-4">Error Loading Terms & Conditions</h1>
          <p className="text-gray-600">{error || 'Unable to load terms content'}</p>
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
        <div className="w-full xl:w-[1320px] mx-auto ">
          <div className="flex justify-between w-full items-start md:flex-row flex-col-reverse">
            {/* Left Content */}
            <div className="w-full md:w-1/2 xl:w-[648px] ">
              <h1 className="text-24 md:text-56 font-bold my-4 md:mb-10 md:mt-0 text-[#1D1F2C]">
                {content.title}
              </h1>

              {content.subtitle && (
                <p className="text-[#4A4C56] mb-6">
                  {content.subtitle}
                </p>
              )}

              <div className="space-y-6">
                {activeTerms.map((term) => (
                  <div key={term.id}>
                    <div className="flex space-x-2 items-center mb-2">
                      <div className="flex w-[28px] h-[28px] items-center justify-center rounded-full border-[1.5px] border-[#1474FC] text-[#1474FC] text-12">
                        <FaCheck />
                      </div>
                      <h3 className="text-18 md:text-24 text-[#4A4C56] tracking-[0.5%] leading-[140%] font-semibold ">
                        {term.title}
                      </h3>
                    </div>
                    
                    {term.description && (
                      <p className="text-16 tracking-[0.5%] font-normal leading-[140%] mb-2">
                        {term.description}
                      </p>
                    )}

                    {term.items && term.items.length > 0 && (
                      <ul className="space-y-1">
                        {term.items.map((item, index) => (
                          <li key={index}>
                            <div className="flex items-start space-x-2">
                              <div className="dot mt-2"></div>
                              <p className={`text-18 font-medium ${term.id === 'term-2' || term.id === 'term-4' ? 'w-[632px]' : ''}`}>
                                {item.isBold && item.text.includes(':') ? (
                                  <>
                                    <strong>{item.text.split(':')[0]}:</strong>
                                    {item.text.split(':').slice(1).join(':')}
                                  </>
                                ) : (
                                  item.text
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
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 xl:w-[648px] pb-12 md:pb-0">
              <div className="h-[516px] sm:h-[500px] p-3">
                <Image 
                  src={content.heroImage.url} 
                  alt={content.heroImage.alt} 
                  width={600}
                  height={400}
                  className="rounded-[24px] w-full h-[516px] md:h-[500px] relative z-10"
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
