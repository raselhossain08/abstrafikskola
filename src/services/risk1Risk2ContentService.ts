// Types for new API structure
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface HeroData {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface CourseContentType {
  title: string;
  items: string[];
}

export interface ImageType {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface CourseData {
  welcomeTitle: string;
  subtitle: string;
  description: string;
  whyImportantTitle: string;
  benefits: Benefit[];
  whatOffersTitle: string;
  features: Feature[];
  courseContent: CourseContentType;
  additionalInfo: string[];
  images: ImageType[];
}

export interface Risk1Risk2Content {
  _id?: string;
  hero: HeroData;
  course: CourseData;
  isActive?: boolean;
  version?: number;
  createdAt?: string;
  updatedAt?: string;
}

class Risk1Risk2ContentService {
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  private cache: Risk1Risk2Content | null = null;
  private cacheTime: number = 0;
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async getRisk1Risk2Content(lang: string = 'en'): Promise<Risk1Risk2Content> {
    try {
      // Check cache first (but invalidate on language change)
      const cacheKey = `risk1risk2_${lang}`;
      if (this.cache && Date.now() - this.cacheTime < this.cacheExpiry) {
        return this.cache;
      }

      console.log(`Fetching Risk1Risk2 content for language: ${lang}`);
      
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

      const result: ApiResponse<Risk1Risk2Content> = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch Risk1Risk2 content');
      }

      // Update cache
      this.cache = result.data;
      this.cacheTime = Date.now();

      console.log(`Successfully fetched Risk1Risk2 content in ${lang}:`, result.data);
      return result.data;
    } catch (error) {
      console.error('Error fetching Risk1Risk2 content:', error);
      
      // Return fallback data if API fails
      if (this.cache) {
        console.warn('Using cached Risk1Risk2 content due to API error');
        return this.cache;
      }

      // Return default fallback
      return this.getFallbackData(lang);
    }
  }

  private getFallbackData(lang: string = 'en'): Risk1Risk2Content {
    const fallbackData = {
      en: {
        hero: {
          title: 'Risk 1 & Risk 2 Courses',
          description: 'Essential Safety Training for New Drivers'
        },
        course: {
          welcomeTitle: 'Welcome to Risk Training',
          subtitle: 'Complete your mandatory risk training with expert guidance',
          description: 'Learn essential safety skills and hazard recognition for safer driving',
          whyImportantTitle: 'Why is Risk Training Important?',
          benefits: [
            {
              title: 'Hazard Recognition',
              description: 'Learn to identify potential dangers on the road'
            },
            {
              title: 'Safe Driving Techniques',
              description: 'Master defensive driving strategies and techniques'
            }
          ],
          whatOffersTitle: 'What Our Course Offers',
          features: [
            {
              title: 'Interactive Learning',
              description: 'Hands-on training with real-world scenarios'
            },
            {
              title: 'Expert Instructors',
              description: 'Learn from experienced driving professionals'
            }
          ],
          courseContent: {
            title: 'Course Content',
            items: [
              'Understanding traffic risks',
              'Identifying dangerous situations',
              'Proper response to emergencies'
            ]
          },
          additionalInfo: [
            'Mandatory for all new drivers',
            'Government approved curriculum',
            'Valid certificate upon completion'
          ],
          images: []
        }
      },
      sv: {
        hero: {
          title: 'Risk 1 & Risk 2 Kurser',
          description: 'Grundläggande säkerhetsutbildning för nya förare'
        },
        course: {
          welcomeTitle: 'Välkommen till riskutbildning',
          subtitle: 'Genomför din obligatoriska riskutbildning med experthjälp',
          description: 'Lär dig viktiga säkerhetsfärdigheter och faroigenkänning för säkrare körning',
          whyImportantTitle: 'Varför är riskutbildning viktig?',
          benefits: [
            {
              title: 'Faroigenkänning',
              description: 'Lär dig att identifiera potentiella faror på vägen'
            },
            {
              title: 'Säker körning tekniker',
              description: 'Behärska defensiva körstrategier och tekniker'
            }
          ],
          whatOffersTitle: 'Vad vår kurs erbjuder',
          features: [
            {
              title: 'Interaktiv inlärning',
              description: 'Praktisk utbildning med verkliga scenarier'
            },
            {
              title: 'Expert instruktörer',
              description: 'Lär av erfarna körproffs'
            }
          ],
          courseContent: {
            title: 'Kursinnehåll',
            items: [
              'Förstå trafikrisker',
              'Identifiera farliga situationer',
              'Rätt respons på nödsituationer'
            ]
          },
          additionalInfo: [
            'Obligatorisk för alla nya förare',
            'Regeringsgodkänd läroplan',
            'Giltigt certifikat vid slutförande'
          ],
          images: []
        }
      },
      ar: {
        hero: {
          title: 'دورات المخاطر 1 و 2',
          description: 'التدريب الأساسي على السلامة للسائقين الجدد'
        },
        course: {
          welcomeTitle: 'أهلاً بك في تدريب المخاطر',
          subtitle: 'أكمل تدريب المخاطر الإلزامي مع الإرشاد الخبير',
          description: 'تعلم مهارات السلامة الأساسية والتعرف على المخاطر للقيادة الآمنة',
          whyImportantTitle: 'لماذا يعتبر تدريب المخاطر مهماً؟',
          benefits: [
            {
              title: 'التعرف على المخاطر',
              description: 'تعلم كيفية تحديد المخاطر المحتملة على الطريق'
            },
            {
              title: 'تقنيات القيادة الآمنة',
              description: 'أتقن استراتيجيات وتقنيات القيادة الدفاعية'
            }
          ],
          whatOffersTitle: 'ما تقدمه دورتنا',
          features: [
            {
              title: 'التعلم التفاعلي',
              description: 'تدريب عملي مع سيناريوهات من العالم الحقيقي'
            },
            {
              title: 'مدربون خبراء',
              description: 'تعلم من محترفي القيادة ذوي الخبرة'
            }
          ],
          courseContent: {
            title: 'محتوى الدورة',
            items: [
              'فهم مخاطر المرور',
              'تحديد المواقف الخطيرة',
              'الاستجابة المناسبة للطوارئ'
            ]
          },
          additionalInfo: [
            'إلزامي لجميع السائقين الجدد',
            'منهج معتمد من الحكومة',
            'شهادة صالحة عند الإنجاز'
          ],
          images: []
        }
      }
    };

    const validLang = lang as 'en' | 'sv' | 'ar';
    return {
      _id: 'fallback',
      ...(fallbackData[validLang] || fallbackData['en']),
      isActive: true,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Clear cache manually if needed
  clearCache(): void {
    this.cache = null;
    this.cacheTime = 0;
  }
}

// Export singleton instance
export const risk1Risk2ContentService = new Risk1Risk2ContentService();
export default risk1Risk2ContentService;
