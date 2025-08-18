// Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PriceItem {
  title: string;
  description: string;
  duration?: string;
  price: number;
  currency: string;
  buttonText: string;
  isPhoneNumber: boolean;
  order: number;
}

export interface PriceCategory {
  name: string;
  items: PriceItem[];
}

export interface TermsContent {
  heading: string;
  text: string;
  order: number;
}

export interface InstallmentInfo {
  title: string;
  description: string;
}

export interface PriceContentData {
  _id: string;
  sectionTitle: string;
  sectionDescription: string;
  categories: PriceCategory[];
  termsAndConditions: {
    title: string;
    content: TermsContent[];
  };
  installmentInfo: InstallmentInfo;
  version: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

class PriceContentService {
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  private cache: PriceContentData | null = null;
  private cacheTime: number = 0;
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async getPriceContent(lang: string = 'en'): Promise<PriceContentData> {
    try {
      // Check cache first
      if (this.cache && Date.now() - this.cacheTime < this.cacheExpiry) {
        return this.cache;
      }

      const response = await fetch(
        `${this.baseUrl}/api/price-content?lang=${lang}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          next: { revalidate: 300 }, // Revalidate every 5 minutes
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<PriceContentData> = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch price content');
      }

      // Update cache
      this.cache = result.data;
      this.cacheTime = Date.now();

      return result.data;
    } catch (error) {
      console.error('Error fetching price content:', error);
      
      // Return fallback data if API fails
      if (this.cache) {
        console.warn('Using cached price content due to API error');
        return this.cache;
      }

      // Return default fallback
      return this.getFallbackData();
    }
  }

  private getFallbackData(): PriceContentData {
    return {
      _id: 'fallback',
      sectionTitle: 'Pricing & Packages',
      sectionDescription: 'Choose the perfect package for your driving journey. We offer competitive prices and flexible payment options.',
      categories: [
        {
          name: 'Courses',
          items: [
            {
              title: 'Handledarkurs',
              description: 'Get ready for private driving lessons with our Handledarkurs.',
              duration: '180 mins, ex.rest',
              price: 299,
              currency: 'kr',
              buttonText: 'Book Online',
              isPhoneNumber: false,
              order: 1
            }
          ]
        }
      ],
      termsAndConditions: {
        title: 'Terms & Conditions',
        content: [
          {
            heading: 'Payment Terms',
            text: 'Payment must be made before or at the start of lessons.',
            order: 1
          }
        ]
      },
      installmentInfo: {
        title: 'Installment Payment Available',
        description: 'Contact us for flexible payment options.'
      },
      version: '1.0.0',
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Clear cache manually if needed
  clearCache(): void {
    this.cache = null;
    this.cacheTime = 0;
  }

  // Get categories for filtering
  getCategories(priceContent: PriceContentData): string[] {
    return priceContent.categories.map(category => category.name);
  }

  // Get items by category
  getItemsByCategory(priceContent: PriceContentData, categoryName: string): PriceItem[] {
    const category = priceContent.categories.find(cat => cat.name === categoryName);
    return category?.items || [];
  }

  // Get all items flattened
  getAllItems(priceContent: PriceContentData): (PriceItem & { category: string })[] {
    return priceContent.categories.flatMap(category =>
      category.items.map(item => ({
        ...item,
        category: category.name
      }))
    );
  }
}

// Export singleton instance
export const priceContentService = new PriceContentService();
export default priceContentService;
