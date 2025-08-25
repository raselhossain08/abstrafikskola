// Terms Content API Service for Frontend with Multi-Language Support
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface TermItem {
  text: string;
  isBold: boolean;
}

export interface Term {
  id: string;
  title: string;
  description: string;
  items: TermItem[];
  order: number;
  isActive: boolean;
}

export interface TermsContent {
  id: string;
  title: string;
  subtitle: string;
  heroImage: {
    url: string;
    publicId: string;
    alt: string;
  };
  terms: Term[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  version: string;
  language?: string; // Added to track current language
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class TermsContentService {
  private cache: Map<string, TermsContent> = new Map(); // Cache per language
  private cacheExpiry: Map<string, number> = new Map(); // Expiry per language
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(language: string = 'en'): boolean {
    const cached = this.cache.get(language);
    const expiry = this.cacheExpiry.get(language);
    return cached !== null && expiry !== undefined && Date.now() < expiry;
  }

  /**
   * Get Terms content in specified language
   * @param language - Language code ('en', 'sv', 'ar')
   * @returns Promise<TermsContent>
   */
  async getTermsContent(language: string = 'en'): Promise<TermsContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid(language)) {
        console.log(`✅ Returning cached terms content for ${language}`);
        return this.cache.get(language)!;
      }

      console.log(`🔄 Fetching terms content for language: ${language}...`);
      
      // Try language-specific endpoint first
      let url = `${API_BASE_URL}/api/terms-content/${language}`;
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      // Fallback to query parameter method if direct endpoint fails
      if (!response.ok && language !== 'en') {
        console.log(`⚠️ Direct endpoint failed, trying query parameter method...`);
        url = `${API_BASE_URL}/api/terms-content?lang=${language}`;
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TermsContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log(`✅ Terms content loaded successfully for ${language}`);
      console.log('📊 Terms stats:', {
        title: result.data.title,
        language: language,
        termsCount: result.data.terms.length,
        activeTerms: result.data.terms.filter(t => t.isActive).length,
      });
      
      // Update cache
      this.cache.set(language, result.data);
      this.cacheExpiry.set(language, Date.now() + this.CACHE_DURATION);
      
      return result.data;

    } catch (error) {
      console.error(`❌ Error fetching terms content for ${language}:`, error);
      
      // Return cached data if available
      const cached = this.cache.get(language);
      if (cached) {
        console.log(`⚠️ Returning cached data for ${language} due to API error`);
        return cached;
      }
      
      // Return cached English as fallback
      const englishCached = this.cache.get('en');
      if (englishCached && language !== 'en') {
        console.log(`⚠️ Returning cached English content as fallback`);
        return englishCached;
      }
      
      // Return fallback data
      console.log(`⚠️ Returning fallback terms content for ${language}`);
      return this.getFallbackContent(language);
    }
  }

  /**
   * Get Terms content for multiple languages at once
   * Useful for preloading
   */
  async getTermsContentMultiLang(lang: string = 'en'): Promise<{
    en: TermsContent;
    sv: TermsContent;
    ar: TermsContent;
  }> {
    try {
      const [english, swedish, arabic] = await Promise.allSettled([
        this.getTermsContent('en'),
        this.getTermsContent('sv'),
        this.getTermsContent('ar')
      ]);

      return {
        en: english.status === 'fulfilled' ? english.value : this.getFallbackContent('en'),
        sv: swedish.status === 'fulfilled' ? swedish.value : this.getFallbackContent('sv'),
        ar: arabic.status === 'fulfilled' ? arabic.value : this.getFallbackContent('ar')
      };
    } catch (error) {
      console.error('❌ Error fetching multi-language content:', error);
      return {
        en: this.getFallbackContent('en'),
        sv: this.getFallbackContent('sv'),
        ar: this.getFallbackContent('ar')
      };
    }
  }

  private getFallbackContent(language: string = 'en'): TermsContent {
    // Fallback content with basic translations
    const fallbackData = {
      en: {
        title: 'Terms and Conditions',
        subtitle: '',
        heroAlt: 'ABS Trafikskola',
        terms: [
          {
            id: 'term-1',
            title: 'Full Payment Required',
            description: 'Full prices must be paid at the time of booking for all driving lessons, risk training, or package deals.',
            items: [],
            order: 1,
            isActive: true
          },
          {
            id: 'term-2',
            title: 'Cancellation Policy',
            description: '',
            items: [
              {
                text: 'Driving Lessons: Cancellations must be made by 13:00 the day before on weekdays, and by 13:00 on Friday for Monday lessons.',
                isBold: true
              },
              {
                text: 'Risk Training: Cancellations must be made at least 2 working days in advance by 13:00. Otherwise, the full price will be charged.',
                isBold: true
              }
            ],
            order: 2,
            isActive: true
          }
        ],
        seo: {
          title: 'Terms and Conditions - ABS Trafikskola',
          description: 'Terms and conditions for driving lessons and services at ABS Trafikskola AB.',
          keywords: ['terms', 'conditions', 'driving lessons', 'ABS Trafikskola', 'policy']
        }
      },
      sv: {
        title: 'Villkor och bestämmelser',
        subtitle: '',
        heroAlt: 'ABS Trafikskola',
        terms: [
          {
            id: 'term-1',
            title: 'Full betalning krävs',
            description: 'Fulla priser måste betalas vid bokningstillfället för alla körlektioner, riskutbildning eller paketavtal.',
            items: [],
            order: 1,
            isActive: true
          },
          {
            id: 'term-2',
            title: 'Avbokningspolicy',
            description: '',
            items: [
              {
                text: 'Körlektioner: Avbokningar måste göras senast kl. 13:00 dagen före på vardagar, och senast kl. 13:00 på fredag för måndagslektioner.',
                isBold: true
              },
              {
                text: 'Riskutbildning: Avbokningar måste göras minst 2 arbetsdagar i förväg senast kl. 13:00. Annars debiteras hela priset.',
                isBold: true
              }
            ],
            order: 2,
            isActive: true
          }
        ],
        seo: {
          title: 'Villkor och bestämmelser - ABS Trafikskola',
          description: 'Villkor och bestämmelser för körlektioner och tjänster hos ABS Trafikskola AB.',
          keywords: ['villkor', 'bestämmelser', 'körlektioner', 'ABS Trafikskola', 'policy']
        }
      },
      ar: {
        title: 'الشروط والأحكام',
        subtitle: '',
        heroAlt: 'مدرسة ABS للقيادة',
        terms: [
          {
            id: 'term-1',
            title: 'الدفع الكامل مطلوب',
            description: 'يجب دفع الأسعار الكاملة وقت الحجز لجميع دروس القيادة أو تدريب المخاطر أو صفقات الحزم.',
            items: [],
            order: 1,
            isActive: true
          },
          {
            id: 'term-2',
            title: 'سياسة الإلغاء',
            description: '',
            items: [
              {
                text: 'دروس القيادة: يجب إلغاء الدروس قبل الساعة 13:00 من اليوم السابق في أيام الأسبوع، وقبل الساعة 13:00 يوم الجمعة لدروس الاثنين.',
                isBold: true
              },
              {
                text: 'تدريب المخاطر: يجب إجراء الإلغاء قبل يومين عمل على الأقل قبل الساعة 13:00. وإلا سيتم تحميل السعر الكامل.',
                isBold: true
              }
            ],
            order: 2,
            isActive: true
          }
        ],
        seo: {
          title: 'الشروط والأحكام - مدرسة ABS للقيادة',
          description: 'الشروط والأحكام لدروس القيادة والخدمات في مدرسة ABS للقيادة.',
          keywords: ['الشروط', 'الأحكام', 'دروس القيادة', 'مدرسة ABS للقيادة', 'السياسة']
        }
      }
    };

    const langData = fallbackData[language as keyof typeof fallbackData] || fallbackData.en;

    return {
      id: 'fallback',
      title: langData.title,
      subtitle: langData.subtitle,
      heroImage: {
        url: '/img/terms/1.png',
        publicId: 'terms/hero-image',
        alt: langData.heroAlt
      },
      terms: langData.terms,
      seo: langData.seo,
      lastUpdated: new Date().toISOString(),
      version: '1.0',
      language: language
    };
  }

  /**
   * Clear cache for specific language or all languages
   */
  clearCache(language?: string): void {
    if (language) {
      this.cache.delete(language);
      this.cacheExpiry.delete(language);
      console.log(`🗑️ Terms content cache cleared for ${language}`);
    } else {
      this.cache.clear();
      this.cacheExpiry.clear();
      console.log('🗑️ All terms content cache cleared');
    }
  }

  /**
   * Preload content for all languages
   */
  async preloadAllLanguages(): Promise<void> {
    try {
      console.log('⚡ Preloading terms content for all languages...');
      await this.getTermsContentMultiLang();
      console.log('⚡ Terms content preloaded successfully for all languages');
    } catch (error) {
      console.error('❌ Failed to preload terms content:', error);
    }
  }

  /**
   * Preload content for specific language
   */
  async preloadContent(language: string = 'en'): Promise<void> {
    try {
      await this.getTermsContent(language);
      console.log(`⚡ Terms content preloaded successfully for ${language}`);
    } catch (error) {
      console.error(`❌ Failed to preload terms content for ${language}:`, error);
    }
  }

  /**
   * Get cache status for debugging
   */
  getCacheStatus(lang: string = 'en'): { language: string; cached: boolean; expires: string }[] {
    const status: { language: string; cached: boolean; expires: string }[] = [];
    
    ['en', 'sv', 'ar'].forEach(lang => {
      const cached = this.cache.has(lang);
      const expiry = this.cacheExpiry.get(lang);
      
      status.push({
        language: lang,
        cached,
        expires: expiry ? new Date(expiry).toISOString() : 'Not cached'
      });
    });
    
    return status;
  }
}

// Export singleton instance
const termsContentService = new TermsContentService();
export default termsContentService;
