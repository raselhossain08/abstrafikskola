import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export type Language = 'en' | 'sv' | 'ar';

// Server-side cookie utilities for Next.js App Router
export class ServerCookies {
  // Get language from cookies (server-side)
  static async getLanguage(): Promise<Language> {
    const cookieStore = await cookies();
    const languageCookie = cookieStore.get('language');
    const language = languageCookie?.value as Language;

    if (language && ['en', 'sv', 'ar'].includes(language)) {
      return language;
    }
    return 'en'; // Default language
  }

  // Set language cookie (server-side) - Use in API routes or Server Actions
  static async setLanguage(language: Language): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('language', language, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Get auth token from cookies (server-side)
  static async getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('auth_token');
    return tokenCookie?.value || null;
  }

  // Set auth token cookie (server-side) - Use in API routes or Server Actions
  static async setAuthToken(
    token: string,
    maxAge: number = 7 * 24 * 60 * 60
  ): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      maxAge,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Remove auth token cookie (server-side) - Use in API routes or Server Actions
  static async removeAuthToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    cookieStore.delete('refresh_token');
  }
}

// Middleware cookie utilities for Next.js
export class MiddlewareCookies {
  // Get language from request cookies
  static getLanguage(request: NextRequest): Language {
    const language = request.cookies.get('language')?.value as Language;
    if (language && ['en', 'sv', 'ar'].includes(language)) {
      return language;
    }
    return 'en';
  }

  // Set language in response cookies
  static setLanguage(response: NextResponse, language: Language): NextResponse {
    response.cookies.set('language', language, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  }

  // Get auth token from request cookies
  static getAuthToken(request: NextRequest): string | null {
    return request.cookies.get('auth_token')?.value || null;
  }

  // Set auth token in response cookies
  static setAuthToken(
    response: NextResponse,
    token: string,
    maxAge: number = 7 * 24 * 60 * 60
  ): NextResponse {
    response.cookies.set('auth_token', token, {
      maxAge,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  }

  // Remove auth token from response cookies
  static removeAuthToken(response: NextResponse): NextResponse {
    response.cookies.delete('auth_token');
    response.cookies.delete('refresh_token');
    return response;
  }
}

// Client-side cookie utilities
export class ClientCookies {
  // Get cookie value (client-side)
  static get(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  // Set cookie (client-side)
  static set(name: string, value: string, days: number = 365): void {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const secure = location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax${secure}`;
  }

  // Remove cookie (client-side)
  static remove(name: string): void {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  // Get language (client-side)
  static getLanguage(): Language {
    const language = this.get('language') as Language;
    if (language && ['en', 'sv', 'ar'].includes(language)) {
      return language;
    }
    return 'en';
  }

  // Set language (client-side)
  static setLanguage(language: Language): void {
    this.set('language', language, 365);
  }
}

export default {
  ServerCookies,
  MiddlewareCookies,
  ClientCookies,
};
