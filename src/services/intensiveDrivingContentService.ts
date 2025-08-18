// Intensive Driving Content Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface IntensiveDrivingItem {
  title: string;
  description: string;
  order?: number;
  _id?: string;
}

export interface IntensiveDrivingContentData {
  _id?: string;
  title: string;
  subtitle: string;
  programFeatures: {
    title: string;
    items: IntensiveDrivingItem[];
  };
  whyChoose: {
    title: string;
    items: IntensiveDrivingItem[];
  };
  image: {
    url: string;
    alt: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class IntensiveDrivingContentService {
  private baseURL: string;
  private cache: IntensiveDrivingContentData | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = `${API_BASE_URL}/intensive-driving-content`;
  }

  /**
   * Get intensive driving content with caching
   */
  async getIntensiveDrivingContent(): Promise<IntensiveDrivingContentData> {
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

      const result: ApiResponse<IntensiveDrivingContentData> = await response.json();
      
      if (result.success && result.data) {
        // Cache the successful response
        this.cache = result.data;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch intensive driving content');
      }
    } catch (error) {
      console.error('Error fetching intensive driving content:', error);
      
      // Return fallback data if API fails
      return this.getFallbackContent();
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
   * Fallback content when API is unavailable
   */
  private getFallbackContent(): IntensiveDrivingContentData {
    return {
      title: "Intensive Driving Lessons Program",
      subtitle: "Get Your License in Just 1–3 Weeks!",
      programFeatures: {
        title: "Program Features",
        items: [
          {
            title: "Accelerated Schedule:",
            description: "Complete all driving lessons and practice sessions in 1–3 weeks..."
          },
          {
            title: "Customized Lessons:",
            description: "Daily lessons tailored to your driving skills..."
          },
          {
            title: "Expert Instructors:",
            description: "Learn from experienced, passionate teachers guiding you every step."
          },
          {
            title: "Comprehensive Training:",
            description: "Master all driving aspects, from basic skills to advanced maneuvers."
          },
          {
            title: "Flexible Timing:",
            description: "Evening and weekend sessions to fit your schedule."
          },
          {
            title: "Same Car as Trafikverket:",
            description: "Practice in the same type of car you'll use for your driving test."
          }
        ]
      },
      whyChoose: {
        title: "Why Choose Our Intensive Program?",
        items: [
          {
            title: "High Pass Rates:",
            description: "Exceptional pass rates due to focused training."
          },
          {
            title: "Central Location:",
            description: "Conveniently located in Sodertalje, close to Trafikverket exam centers."
          },
          {
            title: "Full Support:",
            description: "Assistance with booking exam slots after completing the program."
          }
        ]
      },
      image: {
        url: "/img/home/abs-driving.png",
        alt: "ABS Trafikskola Students"
      }
    };
  }
}

// Export singleton instance
export const intensiveDrivingContentService = new IntensiveDrivingContentService();
export default intensiveDrivingContentService;
