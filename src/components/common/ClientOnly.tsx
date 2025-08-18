'use client';

import { useEffect } from 'react';

// Component to handle hydration mismatches caused by browser extensions
export function ClientOnly({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Clean up any attributes that might cause hydration issues
    const body = document.body;
    
    // Remove common browser extension attributes that cause hydration mismatches
    const extensionAttributes = [
      'cz-shortcut-listen',
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed',
      'spellcheck',
    ];
    
    extensionAttributes.forEach(attr => {
      if (body.hasAttribute(attr)) {
        console.warn(`Removing browser extension attribute: ${attr}`);
        body.removeAttribute(attr);
      }
    });
  }, []);

  return <>{children}</>;
}

// Suppress hydration warnings for specific elements
export function NoSSR({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  useEffect(() => {
    // This component will only render on the client
  }, []);

  return <>{children}</>;
}
