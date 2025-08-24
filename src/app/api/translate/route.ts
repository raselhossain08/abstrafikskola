import { NextRequest, NextResponse } from 'next/server';
import { translateTextServerSide, detectLanguageServerSide, type Language } from '@/lib/translation.server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage, sourceLanguage } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    const results = await translateTextServerSide({
      text,
      targetLanguage: targetLanguage as Language,
      sourceLanguage: sourceLanguage as Language,
    });

    return NextResponse.json({
      success: true,
      translations: results,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
}

// GET endpoint for language detection
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');

    if (!text) {
      return NextResponse.json(
        { error: 'Text parameter is required' },
        { status: 400 }
      );
    }

    const detectedLanguage = await detectLanguageServerSide(text);

    return NextResponse.json({
      success: true,
      detectedLanguage,
    });
  } catch (error) {
    console.error('Language detection error:', error);
    return NextResponse.json(
      { error: 'Language detection failed' },
      { status: 500 }
    );
  }
}
