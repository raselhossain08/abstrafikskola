import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { Language } from '@/contexts/LanguageContext';

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();

    if (!language || !['en', 'sv', 'ar'].includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ 
      success: true, 
      message: 'Language updated successfully',
      language 
    });
    
    // Set cookie that expires in 1 year
    response.cookies.set('language', language as Language, {
      maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (error) {
    console.error('Language setting error:', error);
    return NextResponse.json(
      { error: 'Failed to set language' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value || 'en';

    return NextResponse.json({
      success: true,
      language,
    });
  } catch (error) {
    console.error('Language getting error:', error);
    return NextResponse.json(
      { error: 'Failed to get language' },
      { status: 500 }
    );
  }
}
