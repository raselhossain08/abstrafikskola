// Service for Riskettan content API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// TypeScript interfaces
export interface RiskettanBenefit {
  title: string;
  description: string;
  order: number;
  _id?: string;
}

export interface RiskettanCourseItem {
  title: string;
  order: number;
  _id?: string;
}

export interface RiskettanAdditionalInfo {
  title: string;
  description: string;
  order: number;
  _id?: string;
}

export interface RiskettanContentData {
  _id: string;
  pageContent: {
    title: string;
    description: string;
    mainTitle: string;
    subtitle: string;
    introText: string;
  };
  whyRisk1: {
    title: string;
    benefits: RiskettanBenefit[];
  };
  courseContent: {
    title: string;
    items: RiskettanCourseItem[];
  };
  additionalInfo: RiskettanAdditionalInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class RiskettanContentService {
  private baseUrl: string;
  private cache: RiskettanContentData | null = null;
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseUrl = `${API_BASE_URL}/riskettan-content`;
  }

  // Get Riskettan content with caching
  async getRiskettanContent(): Promise<RiskettanContentData | null> {
    try {
      // Return cached data if valid
      if (this.cache && Date.now() < this.cacheExpiry) {
        console.log('🚀 RiskettanContentService: Using cached data');
        return this.cache;
      }

      console.log('🌐 RiskettanContentService: Fetching from API');
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<RiskettanContentData> = await response.json();
      
      if (result.success && result.data) {
        // Update cache
        this.cache = result.data;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        
        console.log('✅ RiskettanContentService: Content fetched successfully');
        return result.data;
      } else {
        console.error('❌ RiskettanContentService: API returned unsuccessful response', result);
        return this.getFallbackContent();
      }

    } catch (error) {
      console.error('❌ RiskettanContentService: Error fetching content:', error);
      return this.getFallbackContent();
    }
  }

  // Fallback content matching the original static content
  private getFallbackContent(): RiskettanContentData {
    return {
      _id: 'fallback',
      pageContent: {
        title: "Riskettan Schedule and Prices",
        description: "Riskettan (Risk 1) training covers crucial aspects of road safety and traffic behavior, essential for obtaining your Swedish driving license. We offer flexible online schedules to fit your busy life, and competitive prices to ensure you get the best value. Enroll now and start your journey towards a safer driving experience.",
        mainTitle: "Risk1 Course at ABS Traffic School Södertälje 🚧🚦",
        subtitle: "Prepare for the challenges of the road with our Risk1 course!",
        introText: "At ABS Trafikskola Södertälje, we offer a Risk1 course which is an important step in your driving education. This course is compulsory for anyone taking a car driving license and focuses on increasing awareness of risks in traffic."
      },
      whyRisk1: {
        title: "Why Risk1?",
        benefits: [
          {
            title: "Increased Safety",
            description: "Learn to manage and understand risks on the road.",
            order: 1
          },
          {
            title: "Important Knowledge",
            description: "The course covers important topics such as alcohol, drugs, fatigue and how these affect driving.",
            order: 2
          }
        ]
      },
      courseContent: {
        title: "Course Content",
        items: [
          {
            title: "Interactive and engaging training on road safety.",
            order: 1
          },
          {
            title: "Discussions and practical exercises.",
            order: 2
          }
        ]
      },
      additionalInfo: [
        {
          title: "Course Length and Certification:",
          description: "Risk training part 1 is approximately 3 hours long theoretical training, excluding breaks. After completing the course, we report directly to the Swedish Transport Agency online within 24 hours. Please note that no paper certificate is given to participants after the course.",
          order: 1
        },
        {
          title: "For More Information:",
          description: "Visit The Swedish Transport Agency's website for further information on the content and requirements of the Risk1 course.",
          order: 2
        },
        {
          title: "Get Ready:",
          description: "Get ready for a safer driving experience with our Risk1 course at ABS Trafikskola Södertälje.",
          order: 3
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Clear cache (useful for admin updates)
  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ RiskettanContentService: Cache cleared');
  }
}

// Export singleton instance
export const riskettanContentService = new RiskettanContentService();
