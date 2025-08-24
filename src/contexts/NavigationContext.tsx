'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';

export interface PageInfo {
  id: string;
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  path: string;
  category: 'main' | 'course' | 'info' | 'service';
  isActive?: boolean;
  hasTranslation?: boolean;
}

interface NavigationContextType {
  currentPage: PageInfo | null;
  pages: PageInfo[];
  navigateTo: (path: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  breadcrumb: PageInfo[];
  isLoading: boolean;
  getPageByPath: (path: string) => PageInfo | null;
  getPagesByCategory: (category: string) => PageInfo[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

// Default pages configuration
const defaultPages: PageInfo[] = [
  {
    id: 'home',
    title: { en: 'Home', sv: 'Hem', ar: 'الرئيسية' },
    path: '/',
    category: 'main'
  },
  {
    id: 'contact',
    title: { en: 'Contact', sv: 'Kontakt', ar: 'اتصل بنا' },
    path: '/contact',
    category: 'main',
    hasTranslation: true
  },
  {
    id: 'about',
    title: { en: 'About', sv: 'Om oss', ar: 'معلومات عنا' },
    path: '/info/about',
    category: 'info',
    hasTranslation: true
  },
  {
    id: 'team',
    title: { en: 'Our Team', sv: 'Vårt team', ar: 'فريقنا' },
    path: '/info/team',
    category: 'info',
    hasTranslation: true
  },
  {
    id: 'terms',
    title: { en: 'Terms & Conditions', sv: 'Villkor', ar: 'الشروط والأحكام' },
    path: '/info/terms',
    category: 'info',
    hasTranslation: true
  },
  {
    id: 'riskettan',
    title: { en: 'Risk 1', sv: 'Risk 1', ar: 'المخاطر 1' },
    path: '/riskettan',
    category: 'course',
    hasTranslation: true
  },
  {
    id: 'r1-r2',
    title: { en: 'R1-R2 Package', sv: 'R1-R2 Paket', ar: 'حزمة R1-R2' },
    path: '/r1-r2',
    category: 'course',
    hasTranslation: true
  },
  {
    id: 'handledarkurs',
    title: { en: 'Handledarkurs', sv: 'Handledarkurs', ar: 'دورة المدرب' },
    path: '/handledarkurs',
    category: 'course',
    hasTranslation: true
  },
  {
    id: 'halkbana',
    title: { en: 'Halkbana', sv: 'Halkbana', ar: 'مضمار الانزلاق' },
    path: '/halkbana',
    category: 'course',
    hasTranslation: true
  },
  {
    id: 'price-list',
    title: { en: 'Price List', sv: 'Prislista', ar: 'قائمة الأسعار' },
    path: '/price-list',
    category: 'service',
    hasTranslation: true
  },
  {
    id: 'swish',
    title: { en: 'Swish Payment', sv: 'Swish Betalning', ar: 'دفع سويش' },
    path: '/swish',
    category: 'service',
    hasTranslation: true
  },
  {
    id: 'taxi',
    title: { en: 'Taxi Service', sv: 'Taxi Service', ar: 'خدمة التاكسي' },
    path: '/taxi',
    category: 'service',
    hasTranslation: true
  }
];

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useLanguage();
  
  const [pages, setPages] = useState<PageInfo[]>(defaultPages);
  const [currentPage, setCurrentPage] = useState<PageInfo | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  // Update current page when pathname changes
  useEffect(() => {
    const page = pages.find(p => p.path === pathname);
    setCurrentPage(page || null);
    
    // Update navigation history
    if (pathname !== navigationHistory[historyIndex]) {
      const newHistory = navigationHistory.slice(0, historyIndex + 1);
      newHistory.push(pathname);
      setNavigationHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [pathname, pages, navigationHistory, historyIndex]);

  // Mark pages as active/inactive based on current path
  useEffect(() => {
    setPages(prevPages => 
      prevPages.map(page => ({
        ...page,
        isActive: page.path === pathname
      }))
    );
  }, [pathname]);

  const navigateTo = (path: string) => {
    setIsLoading(true);
    router.push(path);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (canGoBack) {
      const newIndex = historyIndex - 1;
      const targetPath = navigationHistory[newIndex];
      setHistoryIndex(newIndex);
      router.push(targetPath);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newIndex = historyIndex + 1;
      const targetPath = navigationHistory[newIndex];
      setHistoryIndex(newIndex);
      router.push(targetPath);
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < navigationHistory.length - 1;

  const getPageByPath = (path: string): PageInfo | null => {
    return pages.find(page => page.path === path) || null;
  };

  const getPagesByCategory = (category: string): PageInfo[] => {
    return pages.filter(page => page.category === category);
  };

  // Generate breadcrumb based on current path
  const breadcrumb = React.useMemo(() => {
    if (!currentPage) return [];

    const crumbs: PageInfo[] = [];
    const pathSegments = pathname.split('/').filter(Boolean);
    
    // Always include home
    const homePage = pages.find(p => p.path === '/');
    if (homePage && pathname !== '/') {
      crumbs.push(homePage);
    }

    // Add intermediate pages based on path structure
    if (pathSegments.length > 1) {
      for (let i = 0; i < pathSegments.length - 1; i++) {
        const intermediatePath = '/' + pathSegments.slice(0, i + 1).join('/');
        const intermediatePage = pages.find(p => p.path === intermediatePath);
        if (intermediatePage && !crumbs.some(c => c.id === intermediatePage.id)) {
          crumbs.push(intermediatePage);
        }
      }
    }

    // Add current page if it's not already in breadcrumb
    if (currentPage && !crumbs.some(c => c.id === currentPage.id)) {
      crumbs.push(currentPage);
    }

    return crumbs;
  }, [currentPage, pathname, pages]);

  const value: NavigationContextType = {
    currentPage,
    pages,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    breadcrumb,
    isLoading,
    getPageByPath,
    getPagesByCategory,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
