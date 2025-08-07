'use client';

import { useState, useEffect } from 'react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

export interface HeaderContactInfo {
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface HeaderSocialMedia {
  facebook: string;
  instagram: string;
}

export interface HeaderTopHeader {
  contact: HeaderContactInfo;
  socialMedia: HeaderSocialMedia;
}

export interface HeaderDropdownItem {
  id: string;
  name: string;
  href: string;
}

export interface HeaderMenuItem {
  id: string;
  name: string;
  href: string;
  hasDropdown: boolean;
  dropdownItems: HeaderDropdownItem[];
}

export interface HeaderNavigation {
  menuItems: HeaderMenuItem[];
}

export interface HeaderLanguage {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
}

export interface HeaderContent {
  topHeader: HeaderTopHeader;
  navigation: HeaderNavigation;
  languages: HeaderLanguage[];
  loginButton: string;
  meta: {
    version: string;
    direction: 'ltr' | 'rtl';
  };
}

export interface UseHeaderContentReturn {
  headerContent: HeaderContent | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export const useHeaderContent = (): UseHeaderContentReturn => {
  const { language } = useLanguage();
  const [headerContent, setHeaderContent] = useState<HeaderContent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHeaderContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${BACKEND_URL}/api/header-content?lang=${language}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setHeaderContent(data.data);
        console.log(`✅ Header content loaded for language: ${language}`);
      } else {
        throw new Error('Invalid response format from header content API');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch header content';
      setError(errorMessage);
      console.error('❌ Error fetching header content:', errorMessage);

      // Set fallback static content if API fails
      setHeaderContent(getFallbackHeaderContent(language));
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch header content when language changes
  useEffect(() => {
    fetchHeaderContent();
  }, [language]);

  const refetch = async () => {
    await fetchHeaderContent();
  };

  return {
    headerContent,
    isLoading,
    error,
    refetch,
  };
};

// Fallback static content (same as current static data)
const getFallbackHeaderContent = (lang: Language): HeaderContent => {
  const fallbackTranslations = {
    en: {
      location: 'Dalgatan 11, 15133 Södertälje',
      loginButton: 'Login',
      menuItems: [
        {
          id: 'home',
          name: 'Home',
          href: '/',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'price-list',
          name: 'Price List',
          href: '/price-list',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'handledarkurs',
          name: 'Handledarkurs',
          href: '/handledarkurs',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'riskettan',
          name: 'Riskettan',
          href: '/riskettan',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'halkbana',
          name: 'Halkbana',
          href: '/halkbana',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'r1-r2',
          name: 'Risk1 + Risk2',
          href: '/r1-r2',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'taxi',
          name: 'Taxi',
          href: '/taxi',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'info',
          name: 'Info',
          href: '/info/about',
          hasDropdown: true,
          dropdownItems: [
            { id: 'about', name: 'About ABS Trafiksola', href: '/info/about' },
            { id: 'team', name: 'ABS Team', href: '/info/team' },
            { id: 'swish', name: 'Swish/BG', href: '/info/swish' },
            { id: 'terms', name: 'Terms Of Purchase', href: '/info/terms' },
          ],
        },
        {
          id: 'contact',
          name: 'Contact',
          href: '/contact',
          hasDropdown: false,
          dropdownItems: [],
        },
      ],
    },
    sv: {
      location: 'Dalagatan 1 L, 15133 Södertälje',
      loginButton: 'Logga in',
      menuItems: [
        {
          id: 'home',
          name: 'Hem',
          href: '/',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'price-list',
          name: 'Prislista',
          href: '/price-list',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'handledarkurs',
          name: 'Handledarkurs',
          href: '/handledarkurs',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'riskettan',
          name: 'Riskettan',
          href: '/riskettan',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'halkbana',
          name: 'Halkbana',
          href: '/halkbana',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'r1-r2',
          name: 'Risk1 + Risk2',
          href: '/r1-r2',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'taxi',
          name: 'Taxi',
          href: '/taxi',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'info',
          name: 'Info',
          href: '/info/about',
          hasDropdown: true,
          dropdownItems: [
            { id: 'about', name: 'Om ABS Trafiksola', href: '/info/about' },
            { id: 'team', name: 'ABS Team', href: '/info/team' },
            { id: 'swish', name: 'Swish/BG', href: '/info/swish' },
            { id: 'terms', name: 'Köpvillkor', href: '/info/terms' },
          ],
        },
        {
          id: 'contact',
          name: 'Kontakt',
          href: '/contact',
          hasDropdown: false,
          dropdownItems: [],
        },
      ],
    },
    ar: {
      location: 'دالاغاتان 1 لتر، 15133 سودرتاليا',
      loginButton: 'تسجيل الدخول',
      menuItems: [
        {
          id: 'home',
          name: 'الرئيسية',
          href: '/',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'price-list',
          name: 'قائمة الأسعار',
          href: '/price-list',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'handledarkurs',
          name: 'دورة القيادة',
          href: '/handledarkurs',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'riskettan',
          name: 'ريسكيتان',
          href: '/riskettan',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'halkbana',
          name: 'هالكبانا',
          href: '/halkbana',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'r1-r2',
          name: 'Risk1 + Risk2',
          href: '/r1-r2',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'taxi',
          name: 'تاكسي',
          href: '/taxi',
          hasDropdown: false,
          dropdownItems: [],
        },
        {
          id: 'info',
          name: 'معلومات',
          href: '/info/about',
          hasDropdown: true,
          dropdownItems: [
            { id: 'about', name: 'حول ABS Trafiksola', href: '/info/about' },
            { id: 'team', name: 'فريق ABS', href: '/info/team' },
            { id: 'swish', name: 'Swish/BG', href: '/info/swish' },
            { id: 'terms', name: 'شروط الشراء', href: '/info/terms' },
          ],
        },
        {
          id: 'contact',
          name: 'اتصل بنا',
          href: '/contact',
          hasDropdown: false,
          dropdownItems: [],
        },
      ],
    },
  };

  const t = fallbackTranslations[lang];

  return {
    topHeader: {
      contact: {
        location: t.location,
        email: 'info@abstrafikskola.se',
        phone: '08 598 66666',
        whatsapp: '073 998 8241',
      },
      socialMedia: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
      },
    },
    navigation: {
      menuItems: t.menuItems,
    },
    languages: [
      {
        code: 'en',
        name: 'English',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197374.png',
        direction: 'ltr',
        isDefault: false,
      },
      {
        code: 'sv',
        name: 'Swedish',
        flag: 'https://cdn-icons-png.flaticon.com/512/197/197564.png',
        direction: 'ltr',
        isDefault: true,
      },
      {
        code: 'ar',
        name: 'Arabic',
        flag: 'https://cdn-icons-png.flaticon.com/512/323/323301.png',
        direction: 'rtl',
        isDefault: false,
      },
    ],
    loginButton: t.loginButton,
    meta: {
      version: '1.0',
      direction: lang === 'ar' ? 'rtl' : 'ltr',
    },
  };
};
