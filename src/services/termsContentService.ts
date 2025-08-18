// Terms Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class TermsContentService {
  private cache: TermsContent | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }

  async getTermsContent(): Promise<TermsContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid()) {
        console.log('✅ Returning cached terms content');
        return this.cache!;
      }

      console.log('🔄 Fetching terms content from API...');
      
      const response = await fetch(`${API_BASE_URL}/terms-content`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<TermsContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log('✅ Terms content loaded successfully');
      console.log('📊 Terms stats:', {
        title: result.data.title,
        termsCount: result.data.terms.length,
        activeTerms: result.data.terms.filter(t => t.isActive).length,
      });
      
      // Update cache
      this.cache = result.data;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching terms content:', error);
      
      // Return cached data if available
      if (this.cache) {
        console.log('⚠️ Returning cached data due to API error');
        return this.cache;
      }
      
      // Return fallback data
      console.log('⚠️ Returning fallback terms content');
      return this.getFallbackContent();
    }
  }

  private getFallbackContent(): TermsContent {
    return {
      id: 'fallback',
      title: 'Terms and Conditions',
      subtitle: '',
      heroImage: {
        url: '/img/terms/1.png',
        publicId: 'terms/hero-image',
        alt: 'ABS Trafikskola'
      },
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
        },
        {
          id: 'term-3',
          title: 'Validity and Refunds',
          description: '',
          items: [
            {
              text: 'Purchases must be used within 12 months from the purchase date',
              isBold: false
            },
            {
              text: 'No open purchase is available for our products and services.',
              isBold: false
            },
            {
              text: 'A 20% fee will be deducted from advance payments in case of refunds.',
              isBold: false
            }
          ],
          order: 3,
          isActive: true
        },
        {
          id: 'term-4',
          title: 'Instructor and Test Rights',
          description: '',
          items: [
            {
              text: 'We reserve the right to cancel pre-booked driving tests under our school\'s code if the responsible instructor deems the student not competent in all aspects of the training plan.',
              isBold: false
            },
            {
              text: 'A medical certificate is required to cancel lessons or risk training due to illness. Only certificates from a doctor or health center are accepted.',
              isBold: false
            }
          ],
          order: 4,
          isActive: true
        },
        {
          id: 'term-5',
          title: 'Privacy Policy',
          description: '',
          items: [
            {
              text: 'We do not disclose information about students or instructors without their consent.',
              isBold: false
            },
            {
              text: 'Thank you for your understanding and cooperation.',
              isBold: false
            }
          ],
          order: 5,
          isActive: true
        }
      ],
      seo: {
        title: 'Terms and Conditions - ABS Trafikskola',
        description: 'Terms and conditions for driving lessons and services at ABS Trafikskola AB.',
        keywords: ['terms', 'conditions', 'driving lessons', 'ABS Trafikskola', 'policy']
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }

  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ Terms content cache cleared');
  }

  async preloadContent(): Promise<void> {
    try {
      await this.getTermsContent();
      console.log('⚡ Terms content preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload terms content:', error);
    }
  }
}

// Export singleton instance
const termsContentService = new TermsContentService();
export default termsContentService;
