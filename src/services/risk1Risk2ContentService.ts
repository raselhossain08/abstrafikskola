// Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface WhyImportantSection {
  title: string;
  description: string;
  order: number;
}

export interface CourseFeature {
  title: string;
  description: string;
  order: number;
}

export interface CourseContentItem {
  title: string;
  order: number;
}

export interface AdditionalInfoItem {
  title: string;
  description: string;
  order: number;
}

export interface ProductImage {
  url: string;
  alt: string;
  order: number;
}

export interface Images {
  productImages: ProductImage[];
  mainImage: {
    url: string;
    alt: string;
  };
}

export interface Risk1Risk2ContentData {
  _id: string;
  sectionTitle: string;
  sectionDescription: string;
  pageContent: {
    mainTitle: string;
    subtitle: string;
    description: string;
  };
  whyImportant: {
    title: string;
    sections: WhyImportantSection[];
  };
  courseOffers: {
    title: string;
    features: CourseFeature[];
  };
  courseContent: {
    title: string;
    items: CourseContentItem[];
  };
  additionalInfo: AdditionalInfoItem[];
  images?: Images;
  language: string;
  isActive: boolean;
  version: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

class Risk1Risk2ContentService {
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  private cache: Risk1Risk2ContentData | null = null;
  private cacheTime: number = 0;
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async getRisk1Risk2Content(lang: string = 'en'): Promise<Risk1Risk2ContentData> {
    try {
      // Check cache first
      if (this.cache && Date.now() - this.cacheTime < this.cacheExpiry) {
        return this.cache;
      }

      const response = await fetch(
        `${this.baseUrl}/api/risk1risk2-content?lang=${lang}`,
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

      const result: ApiResponse<Risk1Risk2ContentData> = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch Risk1Risk2 content');
      }

      // Update cache
      this.cache = result.data;
      this.cacheTime = Date.now();

      return result.data;
    } catch (error) {
      console.error('Error fetching Risk1Risk2 content:', error);
      
      // Return fallback data if API fails
      if (this.cache) {
        console.warn('Using cached Risk1Risk2 content due to API error');
        return this.cache;
      }

      // Return default fallback
      return this.getFallbackData();
    }
  }

  private getFallbackData(): Risk1Risk2ContentData {
    return {
      _id: 'fallback',
      sectionTitle: 'Risk1 + Risk2 Schedule and Prices',
      sectionDescription: 'Complete your risk education with our Risk1 and Risk2 courses. These mandatory courses cover essential traffic safety knowledge for all new drivers. Check out our upcoming schedule and prices, and book your sessions online.',
      pageContent: {
        mainTitle: 'Risk1 + Risk2 Courses at ABS Trafikskola Södertälje 🚗🚦',
        subtitle: 'Complete your risk education with our comprehensive courses! 🌟',
        description: 'At ABS Trafikskola Södertälje, we offer both Risk1 and Risk2 courses that are mandatory requirements for obtaining your Swedish driving license. These courses provide essential knowledge about road safety and traffic behavior.'
      },
      whyImportant: {
        title: 'Why are Risk1 + Risk2 Important?',
        sections: [
          {
            title: 'Risk1 Course',
            description: 'Covers alcohol, drugs, fatigue and how these affect driving ability. Essential foundation for understanding traffic risks.',
            order: 1
          },
          {
            title: 'For the Instructor',
            description: 'Update knowledge on current driving laws, learn effective teaching methods, and become certified to instruct privately.',
            order: 2
          }
        ]
      },
      courseOffers: {
        title: 'What Our Course Offers:',
        features: [
          {
            title: 'Experienced Instructors',
            description: 'Our teachers are experts at making learning both fun and effective.',
            order: 1
          },
          {
            title: 'Modern Education',
            description: 'We use the latest technology and teaching materials.',
            order: 2
          }
        ]
      },
      courseContent: {
        title: 'Course Content',
        items: [
          { title: 'Basic Traffic Rules', order: 1 },
          { title: 'Risk Awareness', order: 2 },
          { title: 'Practical Driving Tips', order: 3 },
          { title: 'First Aid and Emergency Preparedness', order: 4 }
        ]
      },
      additionalInfo: [
        {
          title: 'Who Should Participate?',
          description: 'Anyone planning to learn to drive privately - both students and their private instructors. The course is crucial to ensure a safe and informed driving experience for all involved.',
          order: 1
        },
        {
          title: 'Book Your Spot Today!',
          description: 'Contact us to secure your place in our next Introduction Course. Don\'t wait – spaces fill up quickly!',
          order: 2
        },
        {
          title: 'Additional Information',
          description: 'For more information on supervision and practice driving, visit Transportstyrelsen\'s website.',
          order: 3
        },
        {
          title: 'Welcome Message',
          description: 'Remember, a good start is half the journey! We look forward to welcoming you to ABS Trafikskola Södertälje. 🚗🎉',
          order: 4
        }
      ],
      images: {
        productImages: [
          {
            url: '/img/product/1.png',
            alt: 'Risk1 course image 1',
            order: 1
          },
          {
            url: '/img/product/2.png', 
            alt: 'Risk2 course image 2',
            order: 2
          },
          {
            url: '/img/product/3.png',
            alt: 'Training facility',
            order: 3
          },
          {
            url: '/img/product/4.png',
            alt: 'Course materials',
            order: 4
          }
        ],
        mainImage: {
          url: '/img/product/main.png',
          alt: 'Risk1 + Risk2 courses at ABS Trafikskola'
        }
      },
      language: 'en',
      isActive: true,
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

  // Get sections by order
  getSectionsByOrder(sections: WhyImportantSection[] | CourseFeature[]): any[] {
    return sections.sort((a, b) => a.order - b.order);
  }

  // Get items by order
  getItemsByOrder(items: CourseContentItem[] | AdditionalInfoItem[]): any[] {
    return items.sort((a, b) => a.order - b.order);
  }
}

// Export singleton instance
export const risk1Risk2ContentService = new Risk1Risk2ContentService();
export default risk1Risk2ContentService;
