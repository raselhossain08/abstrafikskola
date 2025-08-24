// Payment Content API Service for Frontend with Multi-language Support
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export type SupportedLanguage = 'en' | 'sv' | 'ar';

export interface PaymentContent {
  id: string;
  title: string;
  description: string;
  swish: {
    companyName: string;
    number: string;
    qrImage: {
      url: string;
      publicId: string;
    };
  };
  bankGiro: {
    companyName: string;
    number: string;
    logo: {
      url: string;
      publicId: string;
    };
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  version: string;
  language?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class PaymentContentService {
  private cache: Map<SupportedLanguage, PaymentContent> = new Map();
  private cacheExpiry: Map<SupportedLanguage, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private currentLanguage: SupportedLanguage = 'en';

  setLanguage(language: SupportedLanguage): void {
    this.currentLanguage = language;
    console.log(`🌐 Payment service language set to: ${language}`);
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(language: SupportedLanguage): boolean {
    const cached = this.cache.get(language);
    const expiry = this.cacheExpiry.get(language) || 0;
    return cached !== undefined && Date.now() < expiry;
  }

  async getPaymentContent(language?: SupportedLanguage): Promise<PaymentContent> {
    const lang = language || this.currentLanguage;
    
    try {
      // Return cached data if valid
      if (this.isCacheValid(lang)) {
        console.log(`✅ Returning cached payment content for language: ${lang}`);
        return this.cache.get(lang)!;
      }

      console.log(`🔄 Fetching payment content from API for language: ${lang}...`);
      console.log(`🌐 API URL: ${API_BASE_URL}/payment-content/${lang}`);
      console.log(`🔍 Environment check:`, {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        API_BASE_URL: API_BASE_URL,
        isClient: typeof window !== 'undefined'
      });
      
      const response = await fetch(`${API_BASE_URL}/payment-content/${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      console.log(`📡 Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<PaymentContent> = await response.json();
      console.log(`📦 Response data:`, result);
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log(`✅ Payment content loaded successfully for language: ${lang}`);
      console.log('📊 Content stats:', {
        title: result.data.title,
        swishNumber: result.data.swish.number,
        bankGiroNumber: result.data.bankGiro.number,
        descriptionLength: result.data.description.length,
        language: lang
      });
      
      // Update cache
      this.cache.set(lang, result.data);
      this.cacheExpiry.set(lang, Date.now() + this.CACHE_DURATION);
      
      return result.data;

    } catch (error) {
      console.error(`❌ Error fetching payment content for language ${lang}:`, error);
      
      // Return cached data if available
      const cached = this.cache.get(lang);
      if (cached) {
        console.log(`⚠️ Returning cached data due to API error for language: ${lang}`);
        return cached;
      }
      
      // Try fallback language (English) if not already English
      if (lang !== 'en') {
        console.log('🔄 Trying fallback to English...');
        try {
          return await this.getPaymentContent('en');
        } catch (fallbackError) {
          console.error('❌ Fallback to English also failed:', fallbackError);
        }
      }
      
      // Return fallback data
      console.log(`⚠️ Returning fallback payment content for language: ${lang}`);
      return this.getFallbackContent(lang);
    }
  }

  private getFallbackContent(language: SupportedLanguage = 'en'): PaymentContent {
    const fallbackData = {
      en: {
        title: 'Swish/BG',
        description: 'Please use the following swish or bank giro number to pay ABS Trafikskola AB. Please put your name and personnumber in message with payment.',
        seo: {
          title: 'Payment Methods - Swish & Bank Giro - ABS Trafikskola',
          description: 'Pay for your driving lessons using Swish or Bank Giro. Secure and convenient payment options available.',
          keywords: ['payment', 'swish', 'bank giro', 'driving lessons payment', 'ABS Trafikskola']
        }
      },
      sv: {
        title: 'Swish/BG',
        description: 'Använd följande Swish- eller bankgironummer för att betala ABS Trafikskola AB. Lägg till ditt namn och personnummer i meddelandet med betalningen.',
        seo: {
          title: 'Betalningsmetoder - Swish & Bankgiro - ABS Trafikskola',
          description: 'Betala för dina körlektioner med Swish eller Bankgiro. Säkra och bekväma betalningsalternativ tillgängliga.',
          keywords: ['betalning', 'swish', 'bankgiro', 'körlektion betalning', 'ABS Trafikskola']
        }
      },
      ar: {
        title: 'سويش/جيرو البنك',
        description: 'يرجى استخدام رقم سويش أو جيرو البنك التالي للدفع لـ ABS Trafikskola AB. يرجى وضع اسمك ورقمك الشخصي في الرسالة مع الدفع.',
        seo: {
          title: 'طرق الدفع - سويش وجيرو البنك - ABS Trafikskola',
          description: 'ادفع مقابل دروس القيادة باستخدام سويش أو جيرو البنك. خيارات دفع آمنة ومريحة متاحة.',
          keywords: ['دفع', 'سويش', 'جيرو البنك', 'دفع دروس القيادة', 'ABS Trafikskola']
        }
      }
    };

    const langData = fallbackData[language] || fallbackData.en;

    return {
      id: `fallback-${language}`,
      title: langData.title,
      description: langData.description,
      swish: {
        companyName: 'ABS Trafikskola AB',
        number: '1234323788',
        qrImage: {
          url: '/img/switch/qr.svg',
          publicId: 'payment/qr-code'
        }
      },
      bankGiro: {
        companyName: 'ABS Trafikskola AB',
        number: '5158-3573',
        logo: {
          url: '/img/switch/bankgirot.svg',
          publicId: 'payment/bankgiro-logo'
        }
      },
      seo: langData.seo,
      lastUpdated: new Date().toISOString(),
      version: '1.0',
      language
    };
  }

  clearCache(language?: SupportedLanguage): void {
    if (language) {
      this.cache.delete(language);
      this.cacheExpiry.delete(language);
      console.log(`🗑️ Payment content cache cleared for language: ${language}`);
    } else {
      this.cache.clear();
      this.cacheExpiry.clear();
      console.log('🗑️ All payment content cache cleared');
    }
  }

  async preloadContent(language?: SupportedLanguage): Promise<void> {
    const lang = language || this.currentLanguage;
    try {
      await this.getPaymentContent(lang);
      console.log(`⚡ Payment content preloaded successfully for language: ${lang}`);
    } catch (error) {
      console.error(`❌ Failed to preload payment content for language ${lang}:`, error);
    }
  }

  // Preload all supported languages
  async preloadAllLanguages(): Promise<void> {
    const languages: SupportedLanguage[] = ['en', 'sv', 'ar'];
    const promises = languages.map(lang => this.preloadContent(lang));
    
    try {
      await Promise.allSettled(promises);
      console.log('⚡ All payment content languages preloaded');
    } catch (error) {
      console.error('❌ Failed to preload some payment content languages:', error);
    }
  }

  // Get available languages (for language switching UI)
  getAvailableLanguages(): { code: SupportedLanguage; name: string; nativeName: string }[] {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
    ];
  }

  // Check if content is cached for a specific language
  isCachedForLanguage(language: SupportedLanguage): boolean {
    return this.isCacheValid(language);
  }
}

// Export singleton instance
const paymentContentService = new PaymentContentService();
export default paymentContentService;
