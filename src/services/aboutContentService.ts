// About content service with multi-language support
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface AboutSectionInterface {
  id: string;
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  content: {
    en: string;
    sv: string;
    ar: string;
  };
  order: number;
  isActive: boolean;
}

export interface AboutImageInterface {
  url: string;
  publicId: string;
  alt: {
    en: string;
    sv: string;
    ar: string;
  };
}

export interface AboutImagesInterface {
  desktop: AboutImageInterface;
  mobile: AboutImageInterface;
}

export interface AboutHistoryInterface {
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  sections: AboutSectionInterface[];
  images: AboutImagesInterface;
}

export interface AboutServicesInterface {
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  sections: AboutSectionInterface[];
  images: AboutImagesInterface;
}

export interface AboutSEOInterface {
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
  keywords: {
    en: string;
    sv: string;
    ar: string;
  };
}

export interface AboutContentInterface {
  _id?: string;
  history: AboutHistoryInterface;
  services: AboutServicesInterface;
  seo: AboutSEOInterface;
  isActive: boolean;
  version: number;
  publishedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Cache interface for storing translations
interface CacheEntry {
  data: AboutContentInterface;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class AboutContentService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Get about content from API with language support
  async getAboutContent(language: string = 'en'): Promise<{ success: boolean; data?: AboutContentInterface; error?: string }> {
    try {
      // Check cache first
      const cacheKey = `about-content-${language}`;
      const cached = this.getCachedData(cacheKey);
      if (cached) {
        console.log(`📦 Returning cached about content for ${language}`);
        return { success: true, data: cached };
      }

      console.log(`🌍 Fetching about content for language: ${language}`);

      const response = await fetch(`${API_BASE_URL}/api/about-content?lang=${language}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data from API
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch about content');
      }

      if (result.success && result.data) {
        // Cache the result
        this.setCachedData(cacheKey, result.data);
        
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error fetching about content for ${language}:`, error);
      
      // Return fallback data if API fails
      const fallbackData = this.getFallbackData();
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: fallbackData,
      };
    }
  }

  // Cache management
  private getCachedData(key: string): AboutContentInterface | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCachedData(key: string, data: AboutContentInterface): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: this.CACHE_TTL
    });
  }

  // Clear all cached data
  clearCache(): void {
    this.cache.clear();
    console.log('🧹 About content cache cleared');
  }

  // Update about content (admin functionality)
  async updateAboutContent(
    id: string,
    data: Partial<AboutContentInterface>,
    token: string
  ): Promise<{ success: boolean; data?: AboutContentInterface; error?: string }> {
    try {
      console.log(`📝 Updating about content: ${id}`);

      const response = await fetch(`${API_BASE_URL}/api/about-content/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update about content');
      }

      if (result.success) {
        // Clear cache since data has been updated
        this.clearCache();
        
        console.log(`✅ About content updated successfully`);
        
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error updating about content:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get cached data info
  getCacheInfo(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Fallback data in case API fails
  private getFallbackData(): AboutContentInterface {
    return {
      history: {
        title: {
          en: 'Our History',
          sv: 'Vår historia',
          ar: 'تاريخنا',
        },
        sections: [
          {
            id: 'history-1',
            title: {
              en: 'Established Excellence',
              sv: 'Etablerad excellens',
              ar: 'التميز المؤسس',
            },
            content: {
              en: 'We have been providing quality driving education for over a decade, helping thousands of students achieve their driving goals.',
              sv: 'Vi har tillhandahållit kvalitetskörutbildning i över ett decennium och hjälpt tusentals studenter att nå sina körmål.',
              ar: 'لقد كنا نقدم تعليم القيادة عالي الجودة لأكثر من عقد، مما ساعد آلاف الطلاب على تحقيق أهدافهم في القيادة.',
            },
            order: 1,
            isActive: true,
          },
          {
            id: 'history-2',
            title: {
              en: 'Certified Instructors',
              sv: 'Certifierade instruktörer',
              ar: 'مدربون معتمدون',
            },
            content: {
              en: 'Our team consists of experienced and certified driving instructors who are passionate about road safety and education.',
              sv: 'Vårt team består av erfarna och certifierade körinstruktörer som brinner för trafiksäkerhet och utbildning.',
              ar: 'يتكون فريقنا من مدربي قيادة ذوي خبرة ومعتمدين ومتحمسين لسلامة الطرق والتعليم.',
            },
            order: 2,
            isActive: true,
          },
          {
            id: 'history-3',
            title: {
              en: 'Modern Approach',
              sv: 'Modernt tillvägagångssätt',
              ar: 'نهج حديث',
            },
            content: {
              en: 'We combine traditional driving instruction with modern technology and teaching methods to ensure effective learning.',
              sv: 'Vi kombinerar traditionell körinstruktion med modern teknik och undervisningsmetoder för att säkerställa effektiv inlärning.',
              ar: 'نحن نجمع بين تعليم القيادة التقليدي والتكنولوجيا الحديثة وطرق التدريس لضمان التعلم الفعال.',
            },
            order: 3,
            isActive: true,
          },
        ],
        images: {
          desktop: {
            url: '/img/about-us/1.png',
            publicId: 'about-history-desktop',
            alt: {
              en: 'Our driving school history',
              sv: 'Vår körkolas historia',
              ar: 'تاريخ مدرسة القيادة لدينا',
            },
          },
          mobile: {
            url: '/img/about-us/3.png',
            publicId: 'about-history-mobile',
            alt: {
              en: 'Our driving school history mobile',
              sv: 'Vår körkolas historia mobil',
              ar: 'تاريخ مدرسة القيادة - الجوال',
            },
          },
        },
      },
      services: {
        title: {
          en: 'Our Services',
          sv: 'Våra tjänster',
          ar: 'خدماتنا',
        },
        sections: [
          {
            id: 'services-1',
            title: {
              en: 'Practical Driving Lessons',
              sv: 'Praktiska körlektioner',
              ar: 'دروس القيادة العملية',
            },
            content: {
              en: 'Professional one-on-one driving instruction with experienced certified instructors in modern vehicles.',
              sv: 'Professionell enskild körinstruktion med erfarna certifierade instruktörer i moderna fordon.',
              ar: 'تعليم قيادة مهني فردي مع مدربين معتمدين ذوي خبرة في مركبات حديثة.',
            },
            order: 1,
            isActive: true,
          },
          {
            id: 'services-2',
            title: {
              en: 'Risk 1 & Risk 2 Courses',
              sv: 'Risk 1 & Risk 2 kurser',
              ar: 'دورات الخطر 1 والخطر 2',
            },
            content: {
              en: 'Mandatory risk education courses that help you understand traffic hazards and develop safe driving habits.',
              sv: 'Obligatoriska riskutbildningskurser som hjälper dig att förstå trafikrisker och utveckla säkra körvanor.',
              ar: 'دورات تعليم المخاطر الإجبارية التي تساعدك على فهم مخاطر المرور وتطوير عادات القيادة الآمنة.',
            },
            order: 2,
            isActive: true,
          },
          {
            id: 'services-3',
            title: {
              en: 'Intensive Courses',
              sv: 'Intensivkurser',
              ar: 'الدورات المكثفة',
            },
            content: {
              en: 'Fast-track driving programs designed for those who want to get their license quickly with comprehensive training.',
              sv: 'Snabbspårkörprogram utformade för dem som vill få sitt körkort snabbt med omfattande utbildning.',
              ar: 'برامج قيادة سريعة مصممة لأولئك الذين يريدون الحصول على رخصتهم بسرعة مع التدريب الشامل.',
            },
            order: 3,
            isActive: true,
          },
          {
            id: 'services-4',
            title: {
              en: 'Theory Support',
              sv: 'Teoristöd',
              ar: 'دعم النظرية',
            },
            content: {
              en: 'Comprehensive theory preparation including practice tests, study materials, and personalized guidance.',
              sv: 'Omfattande teoriförberedelse inklusive övningsprov, studiematerial och personlig vägledning.',
              ar: 'إعداد نظري شامل يشمل اختبارات الممارسة ومواد الدراسة والإرشاد الشخصي.',
            },
            order: 4,
            isActive: true,
          },
        ],
        images: {
          desktop: {
            url: '/img/about-us/2.png',
            publicId: 'about-services-desktop',
            alt: {
              en: 'Our driving school services',
              sv: 'Våra körskoltjänster',
              ar: 'خدمات مدرسة القيادة لدينا',
            },
          },
          mobile: {
            url: '/img/about-us/4.png',
            publicId: 'about-services-mobile',
            alt: {
              en: 'Our driving school services mobile',
              sv: 'Våra körskoltjänster mobil',
              ar: 'خدمات مدرسة القيادة - الجوال',
            },
          },
        },
      },
      seo: {
        title: {
          en: 'About Our Driving School - Professional Driving Education',
          sv: 'Om vår körskola - Professionell körutbildning',
          ar: 'حول مدرسة القيادة لدينا - تعليم قيادة مهني',
        },
        description: {
          en: 'Learn about our driving school\'s history, experienced instructors, and comprehensive driving education services in Södertälje.',
          sv: 'Lär dig om vår körkolas historia, erfarna instruktörer och omfattande körutbildningstjänster i Södertälje.',
          ar: 'تعرف على تاريخ مدرسة القيادة لدينا، والمدربين ذوي الخبرة، وخدمات تعليم القيادة الشاملة في سودرتاليا.',
        },
        keywords: {
          en: 'driving school history, certified instructors, Södertälje, driving education, professional training',
          sv: 'körskola historia, certifierade instruktörer, Södertälje, körutbildning, professionell utbildning',
          ar: 'تاريخ مدرسة القيادة، مدربون معتمدون، سودرتاليا، تعليم القيادة، تدريب مهني',
        },
      },
      isActive: true,
      version: 1,
    };
  }
}

// Export a singleton instance
export const aboutContentService = new AboutContentService();
