'use client';

import React, { useEffect, useState } from 'react';
import TopHeader from '@/components/common/Header/TopHeader';
import NavBar from './NavBar';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add margin to body when header is sticky to prevent layout shift
  useEffect(() => {
    if (isScrolled) {
      document.body.style.paddingTop = '110px'; // Adjust based on header height
    } else {
      document.body.style.paddingTop = '0';
    }
  }, [isScrolled]);

  return (
    <div
      className={`transition-all duration-300 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'}`}
      dir='ltr'
    >
      <TopHeader lang={language} isScrolled={isScrolled} />
      <NavBar lang={language} isScrolled={isScrolled} />
    </div>
  );
}
