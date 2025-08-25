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
  private cache: Map<string, { data: PriceContentData; time: number }> = new Map();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async getPriceContent(lang: string = 'en'): Promise<PriceContentData> {
    try {
      // Check cache first
      const cached = this.cache.get(lang);
      if (cached && Date.now() - cached.time < this.cacheExpiry) {
        return cached.data;
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
      this.cache.set(lang, {
        data: result.data,
        time: Date.now()
      });

      return result.data;
    } catch (error) {
      console.error('Error fetching price content:', error);
      
      // Return fallback data if API fails
      const cached = this.cache.get(lang);
      if (cached) {
        console.warn('Using cached price content due to API error');
        return cached.data;
      }

      // Return default fallback
      return this.getFallbackData(lang);
    }
  }

  private getFallbackData(lang: string = 'en'): PriceContentData {
    const fallbackTranslations = {
      en: {
        sectionTitle: 'Pricing & Packages',
        sectionDescription: 'Choose the perfect package for your driving journey. We offer competitive prices and flexible payment options.',
        categoryName: 'Courses',
        itemTitle: 'Handledarkurs',
        itemDescription: 'Get ready for private driving lessons with our Handledarkurs.',
        buttonText: 'Book Online',
        termsTitle: 'Terms & Conditions',
        termHeading: 'Payment Terms',
        termText: 'Payment must be made before or at the start of lessons.',
        installmentDescription: 'Contact us for flexible payment options.'
      },
      sv: {
        sectionTitle: 'Priser & Paket',
        sectionDescription: 'Välj det perfekta paketet för din körresa. Vi erbjuder konkurrenskraftiga priser och flexibla betalningsalternativ.',
        categoryName: 'Kurser',
        itemTitle: 'Handledarkurs',
        itemDescription: 'Förbered dig för privata körlektioner med vår Handledarkurs.',
        buttonText: 'Boka Online',
        termsTitle: 'Villkor',
        termHeading: 'Betalningsvillkor',
        termText: 'Betalning måste göras före eller vid lektionens början.',
        installmentDescription: 'Kontakta oss för flexibla betalningsalternativ.'
      },
      ar: {
        sectionTitle: 'الأسعار والحزم',
        sectionDescription: 'اختر الباقة المثالية لرحلة تعلم القيادة الخاصة بك. نحن نقدم أسعار تنافسية وخيارات دفع مرنة.',
        categoryName: 'الدورات',
        itemTitle: 'دورة المرشد',
        itemDescription: 'استعد لدروس القيادة الخاصة مع دورة المرشد الخاصة بنا.',
        buttonText: 'احجز أونلاين',
        termsTitle: 'الشروط والأحكام',
        termHeading: 'شروط الدفع',
        termText: 'يجب أن يتم الدفع قبل أو في بداية الدروس.',
        installmentDescription: 'اتصل بنا للحصول على خيارات دفع مرنة.'
      }
    };

    const translations = fallbackTranslations[lang as keyof typeof fallbackTranslations] || fallbackTranslations.en;

    return {
      _id: 'fallback',
      sectionTitle: translations.sectionTitle,
      sectionDescription: translations.sectionDescription,
      categories: [
        {
          name: translations.categoryName,
          items: [
            {
              title: translations.itemTitle,
              description: translations.itemDescription,
              duration: '180 mins, ex.rest',
              price: 299,
              currency: 'kr',
              buttonText: translations.buttonText,
              isPhoneNumber: false,
              order: 1
            }
          ]
        }
      ],
      termsAndConditions: {
        title: translations.termsTitle,
        content: [
          {
            heading: translations.termHeading,
            text: translations.termText,
            order: 1
          }
        ]
      },
      installmentInfo: {
        title: 'Installment Payment Available',
        description: translations.installmentDescription
      },
      version: '1.0.0',
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Clear cache manually if needed
  clearCache(lang?: string): void {
    if (lang) {
      this.cache.delete(lang);
    } else {
      this.cache.clear();
    }
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
