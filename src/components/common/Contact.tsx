'use client';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { language } = useLanguage();

  // Multi-language content
  const content = {
    en: {
      title: "Ready to Start Your Driving Journey?<br/>Contact Us Today!",
      buttonText: "Contact Us",
      buttonLink: "/contact"
    },
    sv: {
      title: "Redo att Börja Din Körresa?<br/>Kontakta Oss Idag!",
      buttonText: "Kontakta Oss",
      buttonLink: "/contact"
    },
    ar: {
      title: "مستعد لبدء رحلة القيادة؟<br/>اتصل بنا اليوم!",
      buttonText: "اتصل بنا",
      buttonLink: "/contact"
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <div
      style={{
        backgroundImage: "url('/img/contact/contact-bg.png')",
        backgroundSize: 'cover',
      }}
      className="h-[400px] md:h-[600px] flex items-center justify-center"
    >
      <div className="container h-full px-4 lg:px-0">
        <div className="flex items-center justify-center h-full flex-col">
          <h3 
            className="font-raleway font-bold text-24 md:text-32 leading-[31px] md:leading-[42px] tracking-normal text-center text-white mb-4"
            dangerouslySetInnerHTML={{ __html: currentContent.title }}
          />
          <Link href={currentContent.buttonLink}>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 w-auto h-12 rounded-full font-raleway font-medium text-[18px] leading-[26px] tracking-normal text-white mt-4 cursor-pointer px-8"
            >
              {currentContent.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
