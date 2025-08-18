const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface HalkbanaContent {
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
    title: {
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
    duration: {
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
      linkText: {
        en: string;
        sv: string;
        ar: string;
      };
      linkUrl: string;
    };
    images: Array<{
      src: string;
      width: number;
      height: number;
      alt: {
        en: string;
        sv: string;
        ar: string;
      };
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

export const halkbanaContentService = {
  async getHalkbanaContent(): Promise<HalkbanaContent | null> {
    try {
      console.log('🔄 Fetching halkbana content from:', `${API_BASE_URL}/halkbana-content`);
      
      const response = await fetch(`${API_BASE_URL}/halkbana-content`, {
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

      const result: ApiResponse<HalkbanaContent> = await response.json();
      console.log('✅ API response received:', result.success ? 'Success' : 'Failed');

      if (result.success && result.data) {
        return result.data;
      } else {
        console.error('❌ API returned no data or failed:', result.message);
        return null;
      }
    } catch (error) {
      console.error('❌ Error fetching halkbana content:', error);
      return null;
    }
  },
};

export default halkbanaContentService;
