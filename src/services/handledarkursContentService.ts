const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface HandledarkursContent {
  _id: string;
  hero: {
    title: {
      en: string;
      sv: string;
      ar: string;
    };
    description: {
      en: string;
      sv: string;
      ar: string;
    };
  };
  course: {
    welcomeTitle: {
      en: string;
      sv: string;
      ar: string;
    };
    subtitle: {
      en: string;
      sv: string;
      ar: string;
    };
    description: {
      en: string;
      sv: string;
      ar: string;
    };
    whyImportantTitle: {
      en: string;
      sv: string;
      ar: string;
    };
    benefits: Array<{
      title: {
        en: string;
        sv: string;
        ar: string;
      };
      description: {
        en: string;
        sv: string;
        ar: string;
      };
    }>;
    whatOffersTitle: {
      en: string;
      sv: string;
      ar: string;
    };
    features: Array<{
      title: {
        en: string;
        sv: string;
        ar: string;
      };
      description: {
        en: string;
        sv: string;
        ar: string;
      };
    }>;
    courseContent: {
      title: {
        en: string;
        sv: string;
        ar: string;
      };
      items: Array<{
        en: string;
        sv: string;
        ar: string;
      }>;
    };
    additionalInfo: Array<{
      en: string;
      sv: string;
      ar: string;
    }>;
    images: Array<{
      src: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export const handledarkursContentService = {
  async getHandledarkursContent(lang: string = 'en'): Promise<HandledarkursContent | null> {
    try {
      console.log(`🔄 Fetching handledarkurs content from: ${API_BASE_URL}/api/handledarkurs-content?lang=${lang}`);
      
      const response = await fetch(`${API_BASE_URL}/api/handledarkurs-content?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
      });

      if (!response.ok) {
        console.error('❌ API response not ok:', response.status, response.statusText);
        return null;
      }

      const result: ApiResponse<HandledarkursContent> = await response.json();
      console.log(`✅ API response received for ${lang}:`, result.success ? 'Success' : 'Failed');

      if (result.success && result.data) {
        return result.data;
      } else {
        console.error('❌ API returned no data or failed:', result.message);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error fetching handledarkurs content for ${lang}:`, error);
      return null;
    }
  },

  async getAvailableLanguages(): Promise<string[]> {
    try {
      console.log(`🔄 Fetching available languages from: ${API_BASE_URL}/api/handledarkurs-content/languages`);
      
      const response = await fetch(`${API_BASE_URL}/api/handledarkurs-content/languages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error('❌ Languages API response not ok:', response.status, response.statusText);
        return ['en', 'sv', 'ar']; // Fallback to default languages
      }

      const result = await response.json();
      console.log('✅ Available languages:', result.data);

      if (result.success && result.data && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.error('❌ Languages API returned invalid data:', result);
        return ['en', 'sv', 'ar']; // Fallback
      }
    } catch (error) {
      console.error('❌ Error fetching available languages:', error);
      return ['en', 'sv', 'ar']; // Fallback
    }
  },
};

export default handledarkursContentService;
