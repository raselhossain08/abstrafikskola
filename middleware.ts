import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareCookies } from './src/lib/cookies';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get current language from cookies
  const currentLanguage = MiddlewareCookies.getLanguage(request);

  // Set language cookie if not present
  if (!request.cookies.has('language')) {
    response.cookies.set('language', currentLanguage, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Add language to response headers for server components
  response.headers.set('x-language', currentLanguage);

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
