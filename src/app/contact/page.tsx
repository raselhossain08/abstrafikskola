'use client';

import ContactForm from '@/components/common/ContactForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaSpinner } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { contactContentService, type ContactContentInterface } from '@/services/contactContentService';

// Metadata will be handled by layout or a separate metadata file

export default function ContactPage() {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [contactContent, setContactContent] = useState<ContactContentInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contact content from API
  useEffect(() => {
    const fetchContactContent = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`🌍 Fetching contact content for language: ${language}...`);
        const result = await contactContentService.getContactContent(language);
        if (result.success && result.data) {
          // Validate the data structure before setting state
          const validatedData = validateContactContent(result.data);
          setContactContent(validatedData);
          console.log(`✅ Contact content loaded for ${language}`);
        } else {
          setError(result.error || 'Failed to load contact content');
          // Use fallback data
          setContactContent(result.data || null);
          console.error(`❌ Failed to load contact content for ${language}:`, result.error);
        }
      } catch (err) {
        setError('Failed to load contact content');
        console.error('Contact content fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, [language]); // Re-fetch when language changes

  // Validate and sanitize contact content data
  const validateContactContent = (data: any): ContactContentInterface => {
    // Ensure all required fields exist and have proper structure
    const validated = {
      ...data,
      hero: {
        ...data.hero,
        title: data.hero?.title || { en: 'Contact Us', sv: '', ar: '' },
        subtitle: data.hero?.subtitle || { en: '', sv: '', ar: '' },
        desktopImage: data.hero?.desktopImage || '/img/contact/2.png',
        mobileImage: data.hero?.mobileImage || '/img/contact/mobile.png',
      },
      contactSection: {
        ...data.contactSection,
        title: data.contactSection?.title || { en: 'Contact', sv: '', ar: '' },
        description: data.contactSection?.description || { en: '', sv: '', ar: '' },
        contactMethods: Array.isArray(data.contactSection?.contactMethods) ? data.contactSection.contactMethods : [],
        hours: Array.isArray(data.contactSection?.hours) ? data.contactSection.hours : [],
        features: Array.isArray(data.contactSection?.features) ? data.contactSection.features : [],
        location: data.contactSection?.location || {
          address: 'Dalgatan 1 1, 15133 Södertälje',
          googleMapsLink: 'https://maps.app.goo.gl/YvEdbMgu1tmbxVRf8',
          embedUrl: ''
        }
      },
      form: {
        ...data.form,
        title: data.form?.title || { en: 'Get In Touch With Us', sv: '', ar: '' }
      }
    };

    return validated as ContactContentInterface;
  };

  // Translation helper function with enhanced error handling
  const t = (content: any): string => {
    // Handle null/undefined
    if (!content) return '';
    
    // If it's already a string, return it (for single-language content)
    if (typeof content === 'string') return content;
    
    // Handle multi-language objects
    if (typeof content === 'object' && content !== null) {
      // Try the current language first
      if (content[language] && typeof content[language] === 'string' && content[language].trim()) {
        return content[language];
      }
      
      // Fallback to English
      if (content.en && typeof content.en === 'string' && content.en.trim()) {
        return content.en;
      }
      
      // Fallback to any available language
      const availableLanguages = ['sv', 'ar'];
      for (const lang of availableLanguages) {
        if (content[lang] && typeof content[lang] === 'string' && content[lang].trim()) {
          return content[lang];
        }
      }
      
      // If it's an object but doesn't have language properties, 
      // it might be something that shouldn't be rendered
      console.warn('Attempted to render object as text:', content);
      return '';
    }
    
    // For any other type, convert to string safely
    return String(content);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFF]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  // Error state or no content
  if (error || !contactContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7FAFF]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Contact Information</h1>
          <p className="text-gray-600 mb-4">{error || 'Contact information is temporarily unavailable'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <header
        style={{
          backgroundImage: `url(${contactContent.hero.desktopImage})`,
        }}
        className="h-[400px] hidden md:flex items-center justify-center flex-col px-4 bg-no-repeat  bg-cover"
        aria-label="Contact Us Hero"
      >
        <h1 className="text-48 font-bold text-[#3F8FEE]">
          {t(contactContent.hero.title)}
        </h1>
        <p className="text-white font-normal text-16 text-center">
          {t(contactContent.hero.subtitle)}
        </p>
      </header>
      <header
        style={{
          backgroundImage: `url(${contactContent.hero.mobileImage})`,
        }}
        className="h-[400px] md:hidden flex items-center justify-center flex-col px-4 bg-no-repeat bg-right"
        aria-label="Contact Us Hero Mobile"
      >
        <h1 className="text-24 sm:text-48 font-bold text-[#3F8FEE]">
          {t(contactContent.hero.title)}
        </h1>
        <p className="text-white font-normal text-16 text-center">
          {t(contactContent.hero.subtitle)}
        </p>
      </header>

      {/* Contact Section */}
      <main className="bg-white py-20 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          <div className="w-full flex justify-between items-start md:flex-row flex-col">
            {/* Contact Info */}
            <section
              className="w-full xl:w-[588px]"
              aria-labelledby="contact-heading"
            >
              <h2
                id="contact-heading"
                className="text-[#1D1F2C] font-semibold text-18 sm:text-32 pb-4 md:pb-8"
              >
                {t(contactContent.contactSection.title)}
              </h2>
              <p className="text-[#4A4C56] font-normal text-16 leading-[140%] tracking-[0.5%]">
                {t(contactContent.contactSection.description)}
              </p>

              {/* Contact Methods */}
              {contactContent.contactSection.contactMethods.map(
                (method, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 mb-4 mt-4"
                  >
                    <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#ECF4FD33] border-[#ECF4FD] border">
                      <Image
                        src={method.icon}
                        alt={method.alt}
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[#1D1F2C] font-[600] text-16 sm:text-18 leading-[26px]">
                        {t(method.title)}
                      </h3>
                      <a
                        href={method.href}
                        className="text-[#4A4C56] font-[400] text-16 leading-[140%] tracking-[0.5%] hover:underline"
                        aria-label={t(method.title)}
                      >
                        {method.detail}
                      </a>
                    </div>
                  </div>
                )
              )}

              {/* Hours */}
              {contactContent.contactSection.hours.map((hour, index) => (
                <div
                  key={index}
                  className="bg-[#ECF4FD] inline-flex items-center justify-center px-[16px] py-[10px] rounded-[30px] mb-4 mr-2"
                >
                  <p className="text-[#3F8FEE] font-semibold text-16 sm:text-18">
                    {t(hour.title)}: {hour.detail}
                  </p>
                </div>
              ))}

              {/* Features */}
              {contactContent.contactSection.features.map(
                (feature, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                        <FaCheck aria-hidden="true" />
                      </div>
                      <p className="text-16 font-normal leading-[140%] text-[#4A4C56] w-10/12 tracking-[0.5%]">
                        {t(feature)}
                      </p>
                    </div>
                  </div>
                )
              )}

              {/* Map */}
              <div className="map mb-20 sm:mb-0">
                <div className="relative w-full">
                  <iframe
                    src={
                      contactContent.contactSection.location?.embedUrl || 
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.397!2d17.6248!3d59.1957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7d7c4c8b1f11%3A0x9a8b7c6d5e4f3a2b!2sDalgatan%201%2C%20151%2033%20S%C3%B6dert%C3%A4lje%2C%20Sweden!5e0!3m2!1sen!2sse!4v1642680000000!5m2!1sen!2sse"
                    }
                    width="100%"
                    height="279"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Driving School Location Map"
                    className="w-full rounded-lg shadow-sm"
                    onError={(e) => {
                      console.error('Map failed to load');
                      // Fallback: show a link to Google Maps
                      const target = e.target as HTMLIFrameElement;
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = 'w-full h-[279px] bg-gray-100 rounded-lg shadow-sm flex items-center justify-center flex-col border';
                      fallbackDiv.innerHTML = `
                        <div class="text-center p-4">
                          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <p class="text-gray-600 mb-4">Interactive map unavailable</p>
                          <a href="https://maps.google.com/?q=Dalgatan+1+1,+15133+Södertälje" target="_blank" rel="noopener noreferrer" 
                             class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            View on Google Maps
                          </a>
                        </div>
                      `;
                      target.parentNode?.replaceChild(fallbackDiv, target);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section
              className="w-full xl:w-[632px] rounded-[16px] border border-[#ECF4FD] px-[24px] py-[26px] bg-[#F7FAFF]"
              aria-labelledby="form-heading"
            >
              <h2
                id="form-heading"
                className="text-[#1D1F2C] font-bold sm:font-semibold text-18 sm:text-32 text-center mb-4"
              >
                {t(contactContent.form.title)}
              </h2>
              <ContactForm />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
