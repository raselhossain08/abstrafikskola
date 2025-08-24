# Google Cloud Translation API Integration

This document provides a comprehensive guide on how the Google Cloud Translation API is integrated into the Abstrafikskola Next.js application for Arabic (ar), Swedish (sv), and English (en) language support.

## Overview

The application uses Google Cloud Translation API to provide real-time translation capabilities across three languages:
- **English (en)** - Default language (LTR)
- **Swedish (sv)** - Svenska (LTR)
- **Arabic (ar)** - العربية (RTL)

## Features

- **Real-time Translation**: Translate text on-demand using Google Cloud Translation API
- **Batch Translation**: Efficiently translate multiple texts simultaneously
- **Translation Caching**: In-memory caching to improve performance and reduce API calls
- **Language Detection**: Automatic detection of source language
- **RTL Support**: Full right-to-left language support for Arabic
- **Server & Client Side**: Support for both server-side and client-side translation
- **Middleware Integration**: Automatic language detection from browser headers

## Setup

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Google Cloud Translation API
GOOGLE_TRANSLATE_API_KEY=your_api_key_here
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
```

### 2. Dependencies

The following package has been installed:

```bash
npm install @google-cloud/translate
```

## Core Files

### Translation Library (`src/lib/translation.ts`)
- Main translation functions
- Language configuration
- Server-side translation utilities

### API Routes
- `/api/translate` - Translation endpoint
- `/api/language` - Language preference management

### React Hooks
- `useTranslation` - Client-side translation hook with caching

### Components
- `TranslatedText` - Component for translating single text elements
- `TranslatedContent` - Component for batch translation
- `LanguageSwitcher` - Language selection component

### Services
- `translatedFooterService.ts` - Example service with translation support

## Usage Examples

### Basic Text Translation

```tsx
import { TranslatedText } from '@/components/common/TranslatedText';

function MyComponent() {
  return (
    <h1>
      <TranslatedText text="Welcome to our driving school" />
    </h1>
  );
}
```

### Batch Translation

```tsx
import { TranslatedContent } from '@/components/common/TranslatedText';

function MyComponent() {
  const texts = ['Home', 'About', 'Contact', 'Services'];
  
  return (
    <TranslatedContent texts={texts}>
      {(translations: string[]) => (
        <nav>
          {translations.map((text, index) => (
            <a key={index} href="#">{text}</a>
          ))}
        </nav>
      )}
    </TranslatedContent>
  );
}
```

### Language Switcher

```tsx
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

function Header() {
  return (
    <header>
      <LanguageSwitcher variant="buttons" showFlags />
    </header>
  );
}
```

### Using the Translation Hook

```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { translate, translateBatch, isTranslating } = useTranslation();
  
  const handleTranslate = async () => {
    const result = await translate('Hello World');
    console.log(result);
  };
  
  return (
    <div>
      <button onClick={handleTranslate} disabled={isTranslating}>
        Translate Text
      </button>
    </div>
  );
}
```

### Server-Side Translation

```tsx
import { translateText } from '@/lib/translation';

export async function getServerSideProps() {
  const translations = await translateText({
    text: ['Welcome', 'About Us', 'Contact'],
    targetLanguage: 'sv',
    sourceLanguage: 'en',
  });
  
  return {
    props: {
      translations: translations.map(t => t.translatedText),
    },
  };
}
```

## API Endpoints

### POST /api/translate

Translate text or array of texts.

**Request:**
```json
{
  "text": "Hello World" | ["Hello", "World"],
  "targetLanguage": "sv",
  "sourceLanguage": "en" // optional
}
```

**Response:**
```json
{
  "success": true,
  "translations": [
    {
      "translatedText": "Hej Världen",
      "detectedSourceLanguage": "en"
    }
  ]
}
```

### GET /api/translate?text=Hello

Detect language of given text.

**Response:**
```json
{
  "success": true,
  "detectedLanguage": "en"
}
```

### POST /api/language

Set language preference.

**Request:**
```json
{
  "language": "sv"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Language updated successfully",
  "language": "sv"
}
```

## Translation Services

### Creating Translated Services

You can create services that provide translated content:

```typescript
import { translateText, type Language } from '@/lib/translation';

export const getTranslatedContent = async (targetLanguage: Language) => {
  const originalData = await fetchOriginalData();
  
  if (targetLanguage === 'en') {
    return originalData; // No translation needed
  }
  
  const textsToTranslate = extractTexts(originalData);
  const translations = await translateText({
    text: textsToTranslate,
    targetLanguage,
    sourceLanguage: 'en',
  });
  
  return applyTranslations(originalData, translations);
};
```

## Best Practices

### 1. Caching
- Translations are cached in memory to reduce API calls
- Use the `clearCache()` function when needed
- Consider implementing persistent caching for production

### 2. Error Handling
- Always provide fallback text
- Handle translation failures gracefully
- Return original text if translation fails

### 3. Performance
- Use batch translation for multiple texts
- Avoid translating empty or very short strings
- Cache translations on the server side when possible

### 4. RTL Support
- Use the `isRTL` flag from `useLanguage()` hook
- Apply appropriate CSS for right-to-left languages
- Set `dir` attribute on containers

## Middleware

The application includes middleware that:
- Detects language from browser headers
- Sets language cookies
- Provides RTL information to components
- Handles CORS for translation API

## Testing

Visit `/translation-demo` to see a comprehensive demo of all translation features.

## Language Configuration

Supported languages are configured in `src/lib/translation.ts`:

```typescript
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
} as const;
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**: Ensure your Google Cloud Translation API key is valid and has the necessary permissions.

2. **Translation Not Loading**: Check network requests in browser dev tools. Ensure the API endpoint is accessible.

3. **RTL Issues**: Make sure to set the `dir` attribute and use appropriate CSS for Arabic text.

4. **Caching Issues**: Clear the translation cache using the `clearCache()` function or refresh the page.

### Debug Mode

Add console logs to see what's being translated:

```typescript
const { translate } = useTranslation();

const result = await translate(text);
console.log('Original:', text, 'Translated:', result);
```

## Security Considerations

- API key is stored in environment variables
- Server-side translation is recommended for sensitive content
- Client-side translation exposes the API key (use with caution)
- Consider implementing rate limiting for production

## Cost Optimization

- Use caching to reduce API calls
- Batch translate multiple texts
- Only translate when language changes
- Consider pre-translating static content

## Future Enhancements

- Persistent translation cache (Redis/Database)
- Translation management system
- A/B testing for translations
- Professional translation review workflow
- More language support

## Support

For issues related to Google Cloud Translation API, refer to the [official documentation](https://cloud.google.com/translate/docs).
