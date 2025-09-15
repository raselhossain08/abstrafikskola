'use client';

import Contact from '@/components/common/Contact';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { aboutContentService } from '@/services/aboutContentService';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ContactSection {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  buttonStyle: {
    backgroundColor: string;
    hoverColor: string;
    width: string;
    height: string;
    borderRadius: string;
  };
  containerHeight: {
    mobile: string;
    desktop: string;
  };
  textStyles: {
    fontSize: {
      mobile: string;
      desktop: string;
    };
    titleColor: string;
    fontWeight: string;
    textAlign: string;
    marginBottom: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function AboutPage() {
  const { language } = useLanguage();
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [contactSection, setContactSection] = useState<ContactSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about content from API
  useEffect(() => {
    const fetchAboutContent = async () => {
      setLoading(true);
      try {
        const result = await aboutContentService.getAboutContent(language);
        if (result.success && result.data) {
          setAboutContent(result.data);
        } else {
          throw new Error(result.error || 'Failed to load about content');
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        setError(error instanceof Error ? error.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, [language]);

  // Fetch contact section data
  useEffect(() => {
    const fetchContactSection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact-section`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setContactSection(result.data);
        }
      } catch (error) {
        console.error('Error fetching contact section:', error);
      }
    };

    fetchContactSection();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1474FC] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading about content...</p>
        </div>
      </div>
    );
  }

  if (error || !aboutContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load about content</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#1474FC] text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { history, services } = aboutContent;
  return (
    <>
      <div className="bg-white pt-16 pb-24 px-4">
        <div className="w-full xl:w-[1320px] mx-auto">
          {/* History Section */}
          <div className="flex items-end md:flex-row flex-col-reverse w-full">
            <div className="w-full md:w-1/2 md:pr-8">
              <h1 className="text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                {history?.title || 'Our History'}
              </h1>
              
              {/* Dynamic History Sections */}
              {history?.sections?.map((section: any, index: number) => (
                <div key={section.id || index} className="mb-5 text-16 tracking-[0.5%] text-[#4A4C56]">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                      <FaCheck />
                    </div>
                    <h2 className="text-[#4A4C56] font-[600] text-18 md:text-24">
                      {section.title}
                    </h2>
                  </div>
                  <p className="">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="w-full md:w-1/2 h-full">
              <div className="flex justify-end items-end h-full">
                {/* Dynamic History Images */}
                {history?.images?.desktop?.url && (
                  <Image
                    src={history.images.desktop.url}
                    alt={history?.images?.desktop?.alt || 'Our History'}
                    width={667}
                    height={426}
                    className="md:block hidden"
                  />
                )}
                {history?.images?.mobile?.url && (
                  <Image
                    src={history.images.mobile.url}
                    alt={history?.images?.mobile?.alt || 'Our History Mobile'}
                    width={667}
                    height={500}
                    className="md:hidden block mb-10"
                  />
                )}
                
                {/* Fallback images if API doesn't provide images */}
                {!history?.images?.desktop?.url && (
                  <Image
                    src="/img/about-us/1.png"
                    alt="Our History"
                    width={667}
                    height={426}
                    className="md:block hidden"
                  />
                )}
                {!history?.images?.mobile?.url && (
                  <Image
                    src="/img/about-us/3.png"
                    alt="Our History Mobile"
                    width={667}
                    height={500}
                    className="md:hidden block mb-10"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex items-end md:flex-row flex-col mt-16">
            <div className="w-full md:w-1/2 h-full">
              <div className="flex items-end h-full">
                {/* Dynamic Services Images */}
                {services?.images?.desktop?.url && (
                  <Image
                    src={services.images.desktop.url}
                    alt={services?.images?.desktop?.alt || 'Our Services'}
                    width={608}
                    height={500}
                    className="md:block hidden"
                  />
                )}
                {services?.images?.mobile?.url && (
                  <Image
                    src={services.images.mobile.url}
                    alt={services?.images?.mobile?.alt || 'Our Services Mobile'}
                    width={608}
                    height={500}
                    className="md:hidden block my-8"
                  />
                )}
                
                {/* Fallback images if API doesn't provide images */}
                {!services?.images?.desktop?.url && (
                  <Image
                    src="/img/about-us/2.png"
                    alt="Our Services"
                    width={608}
                    height={500}
                    className="md:block hidden"
                  />
                )}
                {!services?.images?.mobile?.url && (
                  <Image
                    src="/img/about-us/4.png"
                    alt="Our Services Mobile"
                    width={608}
                    height={500}
                    className="md:hidden block my-8"
                  />
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2 pr-8">
              <h1 className="text-[#1D1F2C] text-24 md:text-[50px] font-bold text-left mb-5">
                {services?.title || 'What We Do'}
              </h1>
              
              {/* Dynamic Services Sections */}
              {services?.sections?.map((section: any, index: number) => (
                <div key={section.id || index} className="mb-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="border-[1.5px] w-[28px] h-[28px] border-[#1474FC] rounded-full flex items-center justify-center text-12 text-[#1474FC]">
                      <FaCheck />
                    </div>
                    <h2 className="text-[#4A4C56] font-[600] text-18 md:text-24">
                      {section.title}
                    </h2>
                  </div>
                  <p>
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      
      <Contact />
    </>
  );
}