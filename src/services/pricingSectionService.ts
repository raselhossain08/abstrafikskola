// Pricing Section Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
  private cache: PricingSectionData | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = `${API_BASE_URL}/pricing-section`;
  }

  /**
   * Get pricing section with caching
   */
  async getPricingSection(): Promise<PricingSectionData> {
    // Return cached data if available and not expired
    if (this.cache && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      const response = await fetch(this.baseURL, {
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
        this.cache = result.data;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch pricing section');
      }
    } catch (error) {
      console.error('Error fetching pricing section:', error);
      
      // Return fallback data if API fails
      return this.getFallbackData();
    }
  }

  /**
   * Clear cache - useful for testing or forcing refresh
   */
  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
  }

  /**
   * Fallback data when API is unavailable
   */
  private getFallbackData(): PricingSectionData {
    return {
      title: "Our Pricing Plans",
      description: "Choose the best driving course for your needs",
      backgroundColor: "#F7FAFF",
      cards: [
        {
          title: 'Handledarkurs',
          price: '299 kr',
          details: 'Ready to embark on your journey to becoming a confident driver?',
          url: '/handledarkurs',
          active: false,
          order: 1
        },
        {
          title: 'Riskettan',
          price: '349 kr',
          details: 'Ready to embark on your journey to becoming a confident driver?',
          active: true,
          url: '/riskettan',
          order: 2
        },
        {
          title: 'Risk2 (Halkbana)',
          price: '1890 kr',
          details: 'Ready to embark on your journey to becoming a confident driver?',
          url: '/halkbana',
          active: false,
          order: 3
        },
        {
          title: 'Risk1 + Risk2',
          price: '2090 kr',
          details: 'Ready to embark on your journey to becoming a confident driver?',
          url: '/r1-r2',
          active: false,
          order: 4
        },
        {
          title: 'Driving lessons',
          price: '595 kr',
          details: 'Ready to embark on your journey to becoming a confident driver?',
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
