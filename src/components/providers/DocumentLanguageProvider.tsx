'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * This component handles document-level language and direction changes
 * without causing hydration mismatches
 */
export function DocumentLanguageProvider() {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    // Update document attributes on language change
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'ltr' : 'ltr';
    
    // Update body class for RTL styling if needed
    if (isRTL) {
      document.body.classList.add('ltr');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('ltr');
    }
  }, [language, isRTL]);

  // This component doesn't render anything
  return null;
}
