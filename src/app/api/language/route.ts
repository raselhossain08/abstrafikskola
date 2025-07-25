import { NextRequest, NextResponse } from 'next/server';
import { MiddlewareCookies } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();

    // Validate language
    if (!language || !['en', 'sv', 'ar'].includes(language)) {
      return NextResponse.json(
        { message: 'Invalid language' },
        { status: 400 }
      );
    }

    // Create response and set language cookie
    const response = NextResponse.json({
      message: 'Language updated successfully',
      language,
    });

    response.cookies.set('language', language, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Language switch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
