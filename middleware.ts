import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareCookies } from './src/lib/cookies';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get current language from cookies or detect from headers
  let currentLanguage = MiddlewareCookies.getLanguage(request);
  
  // If no language cookie, try to detect from Accept-Language header
  if (!request.cookies.has('language')) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      // Parse Accept-Language header and find supported language
      const browserLanguages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].split('-')[0].toLowerCase())
        .filter(lang => ['en', 'sv', 'ar'].includes(lang));
      
      if (browserLanguages.length > 0) {
        // Prioritize Swedish if found, otherwise use first supported language
        currentLanguage = browserLanguages.includes('sv') 
          ? 'sv' 
          : browserLanguages[0] as 'en' | 'sv' | 'ar';
      }
    }
    
    // Set language cookie
    response.cookies.set('language', currentLanguage, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Add language and RTL info to response headers for server components
  response.headers.set('x-language', currentLanguage);
  response.headers.set('x-is-rtl', currentLanguage === 'ar' ? 'true' : 'false');
  
  // Add CORS headers for translation API
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
