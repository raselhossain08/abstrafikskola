// Pricing Section Service
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface PricingCard {
  title: string;
  price: string;
  details: string;
  url: string;
  active?: boolean;
  order?: number;
  _id?: string;
}

export interface PricingSectionData {
  _id?: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
  cards: PricingCard[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class PricingSectionService {
  private baseURL: string;
  private cache: Map<string, PricingSectionData> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = `${API_BASE_URL}/api/pricing-section`;
  }

  /**
   * Get pricing section with caching and language support
   */
  async getPricingSection(lang: string = 'en'): Promise<PricingSectionData> {
    const cacheKey = `pricing-${lang}`;
    
    // Return cached data if available and not expired
    if (this.cache.has(cacheKey) && Date.now() < (this.cacheExpiry.get(cacheKey) || 0)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Add language parameter to URL
      const url = `${this.baseURL}?lang=${lang}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<PricingSectionData> = await response.json();
      
      if (result.success && result.data) {
        // Sort cards by order
        if (result.data.cards) {
          result.data.cards.sort((a, b) => (a.order || 0) - (b.order || 0));
        }

        // Cache the successful response
        this.cache.set(cacheKey, result.data);
        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch pricing section');
      }
    } catch (error) {
      console.error('Error fetching pricing section:', error);
      
      // Return fallback data if API fails
      return this.getFallbackData(lang);
    }
  }

  /**
   * Clear cache - useful for testing or forcing refresh
   */
  clearCache(lang?: string): void {
    if (lang) {
      const cacheKey = `pricing-${lang}`;
      this.cache.delete(cacheKey);
      this.cacheExpiry.delete(cacheKey);
    } else {
      this.cache.clear();
      this.cacheExpiry.clear();
    }
  }

  /**
   * Fallback data when API is unavailable
   */
  private getFallbackData(lang: string = 'en'): PricingSectionData {
    const translations = {
      en: {
        title: "Our Pricing Plans",
        description: "Choose the best driving course for your needs",
        cards: {
          handledarkurs: {
            title: 'Handledarkurs',
            details: 'Ready to embark on your journey to becoming a confident driver?'
          },
          riskettan: {
            title: 'Riskettan',
            details: 'Ready to embark on your journey to becoming a confident driver?'
          },
          risk2: {
            title: 'Risk2 (Halkbana)',
            details: 'Ready to embark on your journey to becoming a confident driver?'
          },
          risk1risk2: {
            title: 'Risk1 + Risk2',
            details: 'Ready to embark on your journey to becoming a confident driver?'
          },
          driving: {
            title: 'Driving lessons',
            details: 'Ready to embark on your journey to becoming a confident driver?'
          }
        }
      },
      sv: {
        title: "Våra priser",
        description: "Välj den bästa körkursen för dina behov",
        cards: {
          handledarkurs: {
            title: 'Handledarkurs',
            details: 'Redo att påbörja din resa mot att bli en säker förare?'
          },
          riskettan: {
            title: 'Riskettan',
            details: 'Redo att påbörja din resa mot att bli en säker förare?'
          },
          risk2: {
            title: 'Risk2 (Halkbana)',
            details: 'Redo att påbörja din resa mot att bli en säker förare?'
          },
          risk1risk2: {
            title: 'Risk1 + Risk2',
            details: 'Redo att påbörja din resa mot att bli en säker förare?'
          },
          driving: {
            title: 'Körlektioner',
            details: 'Redo att påbörja din resa mot att bli en säker förare?'
          }
        }
      },
      ar: {
        title: "خطط الأسعار",
        description: "اختر أفضل دورة قيادة لاحتياجاتك",
        cards: {
          handledarkurs: {
            title: 'دورة المدرب',
            details: 'جاهز لبدء رحلتك لتصبح سائقاً واثقاً؟'
          },
          riskettan: {
            title: 'المخاطر الأولى',
            details: 'جاهز لبدء رحلتك لتصبح سائقاً واثقاً؟'
          },
          risk2: {
            title: 'المخاطر 2 (الطرق الزلقة)',
            details: 'جاهز لبدء رحلتك لتصبح سائقاً واثقاً؟'
          },
          risk1risk2: {
            title: 'المخاطر 1 + المخاطر 2',
            details: 'جاهز لبدء رحلتك لتصبح سائقاً واثقاً؟'
          },
          driving: {
            title: 'دروس القيادة',
            details: 'جاهز لبدء رحلتك لتصبح سائقاً واثقاً؟'
          }
        }
      }
    };

    const currentLang = translations[lang as keyof typeof translations] || translations.en;

    return {
      title: currentLang.title,
      description: currentLang.description,
      backgroundColor: "#F7FAFF",
      cards: [
        {
          title: currentLang.cards.handledarkurs.title,
          price: '299 kr',
          details: currentLang.cards.handledarkurs.details,
          url: '/handledarkurs',
          active: false,
          order: 1
        },
        {
          title: currentLang.cards.riskettan.title,
          price: '349 kr',
          details: currentLang.cards.riskettan.details,
          active: true,
          url: '/riskettan',
          order: 2
        },
        {
          title: currentLang.cards.risk2.title,
          price: '1890 kr',
          details: currentLang.cards.risk2.details,
          url: '/halkbana',
          active: false,
          order: 3
        },
        {
          title: currentLang.cards.risk1risk2.title,
          price: '2090 kr',
          details: currentLang.cards.risk1risk2.details,
          url: '/r1-r2',
          active: false,
          order: 4
        },
        {
          title: currentLang.cards.driving.title,
          price: '595 kr',
          details: currentLang.cards.driving.details,
          url: '/contact',
          active: false,
          order: 5
        }
      ]
    };
  }
}

// Export singleton instance
export const pricingSectionService = new PricingSectionService();
export default pricingSectionService;
