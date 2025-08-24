# Google Cloud Translation API Integration

This documentation explains how to integrate Google Cloud Translation API with your Next.js application for Arabic, Swedish, and English language support.

## ✅ What's Already Set Up

### 1. Environment Variables
- Added `GOOGLE_TRANSLATE_API_KEY` to `.env.local`
- Configuration is ready for production deployment

### 2. API Integration
- **Server-side Translation**: `/api/translate` endpoint for secure translation
- **Language Management**: `/api/language` endpoint for language preferences
- **Middleware**: Automatic language detection and cookie management

### 3. Translation Services
- **Server-side**: `translation.server.ts` for API routes
- **Client-side**: `translation.ts` for browser compatibility
- **Hooks**: `useTranslation` hook for React components
- **Components**: Pre-built translation components

## 🚀 Usage Examples

### 1. Basic Translation Hook

```tsx
import { useTranslation } from '@/hooks/useTranslation';

function MyComponent() {
  const { translate, isTranslating } = useTranslation();
  
  const handleTranslate = async () => {
    const result = await translate('Hello World');
    console.log(result); // Translated text
  };
  
  return (
    <div>
      {isTranslating && <p>Translating...</p>}
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
}
```

### 2. Automatic Translation Component

```tsx
import { TranslatedText } from '@/components/common/TranslatedText';

function MyComponent() {
  return (
    <div>
      <h1>
        <TranslatedText text="Welcome to our website" />
      </h1>
      <p>
        <TranslatedText 
          text="Learn to drive with confidence" 
          fallback="Default text if translation fails"
        />
      </p>
    </div>
  );
}
```

### 3. Language Switcher

```tsx
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

function Header() {
  return (
    <header>
      <nav>
        <LanguageSwitcher 
          variant="buttons" 
          showFlags={true}
        />
      </nav>
    </header>
  );
}
```

### 4. Batch Translation

```tsx
import { TranslatedContent } from '@/components/common/TranslatedContent';

function MyComponent() {
  const texts = [
    'Welcome',
    'About Us',
    'Contact',
    'Services'
  ];

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

## 🔧 API Endpoints

### POST /api/translate
Translate text using Google Cloud Translation API

**Request:**
```json
{
  "text": "Hello World",
  "targetLanguage": "sv",
  "sourceLanguage": "en"
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

### POST /api/language
Set user language preference

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

## 🌐 Supported Languages

- **English (en)**: Default language, left-to-right
- **Swedish (sv)**: Svenska, left-to-right  
- **Arabic (ar)**: العربية, right-to-left (RTL support included)

## 📱 RTL Support

The system automatically handles RTL layout for Arabic:

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, isRTL } = useLanguage();
  
  return (
    <div 
      className={isRTL ? 'rtl text-right' : 'ltr text-left'}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <p>This text will be properly oriented</p>
    </div>
  );
}
```

## 🏗️ Architecture

### Client-Side Flow
1. User interacts with language switcher
2. Language preference saved to cookies
3. Translation requests sent to `/api/translate`
4. Translated content cached for performance

### Server-Side Flow
1. API routes use Google Cloud Translation
2. Secure API key handling
3. Error handling and fallbacks
4. Response caching

## 🎯 Current Status

✅ **Working Features:**
- Translation API endpoint (`POST /api/translate`)
- Language switching and cookie management
- Client-side translation hooks
- RTL support for Arabic
- Caching system for performance

⚠️ **Known Issues:**
- Google Cloud library bundling with client-side code
- Some components may need server-side rendering for full functionality

## 🔄 Next Steps

1. **Test the Translation Demo**: Visit `/translation-demo` to see the system in action
2. **Integrate with Components**: Add translation to your existing components
3. **Deploy**: The system is ready for production deployment

## 🚀 Quick Integration Guide

To add translation to any existing component:

1. **Wrap text with TranslatedText:**
```tsx
// Before
<h1>Welcome</h1>

// After  
<h1><TranslatedText text="Welcome" /></h1>
```

2. **Add Language Switcher:**
```tsx
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

// Add to your header/navigation
<LanguageSwitcher variant="dropdown" />
```

3. **Handle RTL layouts:**
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const { isRTL } = useLanguage();
return <div dir={isRTL ? 'rtl' : 'ltr'}>{content}</div>;
```

The translation system is now ready to use across your entire website! 🎉
