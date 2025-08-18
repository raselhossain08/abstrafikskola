const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
  async getHandledarkursContent(): Promise<HandledarkursContent | null> {
    try {
      console.log('🔄 Fetching handledarkurs content from:', `${API_BASE_URL}/handledarkurs-content`);
      
      const response = await fetch(`${API_BASE_URL}/handledarkurs-content`, {
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
      console.log('✅ API response received:', result.success ? 'Success' : 'Failed');

      if (result.success && result.data) {
        return result.data;
      } else {
        console.error('❌ API returned no data or failed:', result.message);
        return null;
      }
    } catch (error) {
      console.error('❌ Error fetching handledarkurs content:', error);
      return null;
    }
  },
};

export default handledarkursContentService;
