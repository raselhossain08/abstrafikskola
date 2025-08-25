// Service for Riskettan content API
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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
  
  // Language-specific caches
  private en_cache: RiskettanContentData | null = null;
  private sv_cache: RiskettanContentData | null = null;
  private ar_cache: RiskettanContentData | null = null;
  private en_expiry: number = 0;
  private sv_expiry: number = 0;
  private ar_expiry: number = 0;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/riskettan-content`;
  }

  // Get Riskettan content with language support and caching
  async getRiskettanContent(lang: string = 'en'): Promise<RiskettanContentData | null> {
    try {
      // Get cache and expiry for specific language
      let cachedData: RiskettanContentData | null = null;
      let cacheExpiry: number = 0;
      
      switch (lang) {
        case 'sv':
          cachedData = this.sv_cache;
          cacheExpiry = this.sv_expiry;
          break;
        case 'ar':
          cachedData = this.ar_cache;
          cacheExpiry = this.ar_expiry;
          break;
        default: // 'en'
          cachedData = this.en_cache;
          cacheExpiry = this.en_expiry;
          break;
      }
      
      // Return cached data if valid for this language
      if (cachedData && Date.now() < cacheExpiry) {
        console.log(`🚀 RiskettanContentService: Using cached data for ${lang.toUpperCase()}`);
        return cachedData;
      }

      console.log(`🌐 RiskettanContentService: Fetching ${lang.toUpperCase()} content from API`);
      const response = await fetch(`${this.baseUrl}?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (!response.ok) {
        console.warn(`⚠️ API request failed with status ${response.status}, using fallback`);
        return this.getFallbackContent(lang);
      }

      const result: ApiResponse<any> = await response.json();
      
      if (result.success && result.data) {
        // Transform API response to frontend structure
        const transformedData = this.transformApiResponse(result.data, lang);
        
        // Update cache for this language
        const expiryTime = Date.now() + this.CACHE_DURATION;
        
        switch (lang) {
          case 'sv':
            this.sv_cache = transformedData;
            this.sv_expiry = expiryTime;
            break;
          case 'ar':
            this.ar_cache = transformedData;
            this.ar_expiry = expiryTime;
            break;
          default: // 'en'
            this.en_cache = transformedData;
            this.en_expiry = expiryTime;
            break;
        }
        
        console.log(`✅ RiskettanContentService: ${lang.toUpperCase()} content fetched and transformed successfully from database`);
        return transformedData;
      } else {
        console.error('❌ RiskettanContentService: API returned unsuccessful response', result);
        return this.getFallbackContent(lang);
      }

    } catch (error) {
      console.error(`❌ RiskettanContentService: Error fetching ${lang.toUpperCase()} content:`, error);
      return this.getFallbackContent(lang);
    }
  }

  // Transform API response structure to frontend structure
  private transformApiResponse(apiData: any, lang: string): RiskettanContentData {
    return {
      _id: apiData._id || `fallback-${lang}`,
      pageContent: {
        title: apiData.hero?.title || apiData.course?.welcomeTitle || 'Risk 1 Course',
        description: apiData.hero?.description || apiData.course?.description || 'Learn essential driving skills and road safety regulations',
        mainTitle: apiData.course?.welcomeTitle || 'Complete Risk 1 Training Program',
        subtitle: apiData.course?.subtitle || 'Professional Driving Education',
        introText: apiData.course?.description || 'Our comprehensive Risk 1 course covers all fundamental aspects of safe driving'
      },
      whyRisk1: {
        title: apiData.course?.whyImportantTitle || 'Why Choose Risk 1 Course',
        benefits: (apiData.course?.benefits || []).map((benefit: any, index: number) => ({
          title: benefit.title || 'Benefit',
          description: benefit.description || 'Description',
          order: index + 1,
          _id: benefit._id
        }))
      },
      courseContent: {
        title: apiData.course?.courseContent?.title || 'Course Content Overview',
        items: (apiData.course?.courseContent?.items || []).map((item: any, index: number) => ({
          title: item || 'Course item',
          order: index + 1
        }))
      },
      additionalInfo: (apiData.course?.additionalInfo || []).map((info: any, index: number) => {
        // Handle both string and object formats
        if (typeof info === 'string') {
          return {
            title: 'Information',
            description: info,
            order: index + 1
          };
        } else {
          return {
            title: info.title || 'Information',
            description: info.description || info,
            order: index + 1,
            _id: info._id
          };
        }
      }),
      createdAt: apiData.createdAt || new Date().toISOString(),
      updatedAt: apiData.updatedAt || new Date().toISOString()
    };
  }

  // Fallback content with multi-language support
  private getFallbackContent(lang: string = 'en'): RiskettanContentData {
    const fallbacks = {
      en: {
        _id: 'fallback-en',
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
        ]
      },
      sv: {
        _id: 'fallback-sv',
        pageContent: {
          title: "Risk 1 Schema och Priser",
          description: "Risk 1-utbildning täcker viktiga aspekter av trafiksäkerhet och trafikbeteende, nödvändigt för att få ditt svenska körkort. Vi erbjuder flexibla onlinescheman för att passa ditt upptagna liv och konkurrenskraftiga priser för att säkerställa att du får bästa värdet. Anmäl dig nu och börja din resa mot en säkrare körupplevelse.",
          mainTitle: "Risk1-kurs på ABS Trafikskola Södertälje 🚧🚦",
          subtitle: "Förbered dig för vägutmaningarna med vår Risk1-kurs!",
          introText: "På ABS Trafikskola Södertälje erbjuder vi en Risk1-kurs som är ett viktigt steg i din körutbildning. Denna kurs är obligatorisk för alla som tar körkortsutbildning för bil och fokuserar på att öka medvetenheten om risker i trafiken."
        },
        whyRisk1: {
          title: "Varför Risk1?",
          benefits: [
            {
              title: "Ökad säkerhet",
              description: "Lär dig hantera och förstå risker på vägen.",
              order: 1
            },
            {
              title: "Viktig kunskap",
              description: "Kursen täcker viktiga ämnen som alkohol, droger, trötthet och hur dessa påverkar körningen.",
              order: 2
            }
          ]
        },
        courseContent: {
          title: "Kursinnehåll",
          items: [
            {
              title: "Interaktiv och engagerande utbildning om trafiksäkerhet.",
              order: 1
            },
            {
              title: "Diskussioner och praktiska övningar.",
              order: 2
            }
          ]
        },
        additionalInfo: [
          {
            title: "Kurslängd och certifiering:",
            description: "Riskutbildning del 1 är ungefär 3 timmar lång teoretisk utbildning, exklusive pauser. Efter avslutad kurs rapporterar vi direkt till Transportstyrelsen online inom 24 timmar. Observera att inget papperscertifikat ges till deltagare efter kursen.",
            order: 1
          },
          {
            title: "För mer information:",
            description: "Besök Transportstyrelsens webbplats för ytterligare information om innehållet och kraven för Risk1-kursen.",
            order: 2
          },
          {
            title: "Gör dig redo:",
            description: "Gör dig redo för en säkrare körupplevelse med vår Risk1-kurs på ABS Trafikskola Södertälje.",
            order: 3
          }
        ]
      },
      ar: {
        _id: 'fallback-ar',
        pageContent: {
          title: "جدولة وأسعار المخاطر 1",
          description: "تدريب المخاطر 1 يغطي الجوانب المهمة لسلامة الطرق وسلوك المرور، وهو ضروري للحصول على رخصة القيادة السويدية. نحن نقدم جداول زمنية مرنة عبر الإنترنت لتناسب حياتك المزدحمة، وأسعار تنافسية لضمان حصولك على أفضل قيمة. سجل الآن وابدأ رحلتك نحو تجربة قيادة أكثر أمانًا.",
          mainTitle: "دورة المخاطر 1 في مدرسة ABS لتعليم القيادة سودرتالية 🚧🚦",
          subtitle: "استعد لتحديات الطريق مع دورة المخاطر 1 الخاصة بنا!",
          introText: "في ABS Trafikskola Södertälje، نقدم دورة المخاطر 1 والتي تعتبر خطوة مهمة في تعليم القيادة الخاص بك. هذه الدورة إلزامية لأي شخص يأخذ رخصة قيادة السيارة وتركز على زيادة الوعي بالمخاطر في المرور."
        },
        whyRisk1: {
          title: "لماذا المخاطر 1؟",
          benefits: [
            {
              title: "زيادة الأمان",
              description: "تعلم كيفية إدارة وفهم المخاطر على الطريق.",
              order: 1
            },
            {
              title: "معرفة مهمة",
              description: "تغطي الدورة مواضيع مهمة مثل الكحول والمخدرات والتعب وكيف تؤثر هذه على القيادة.",
              order: 2
            }
          ]
        },
        courseContent: {
          title: "محتوى الدورة",
          items: [
            {
              title: "تدريب تفاعلي وجذاب على سلامة الطرق.",
              order: 1
            },
            {
              title: "مناقشات وتمارين عملية.",
              order: 2
            }
          ]
        },
        additionalInfo: [
          {
            title: "مدة الدورة والشهادة:",
            description: "تدريب المخاطر الجزء 1 هو تدريب نظري يستغرق حوالي 3 ساعات، باستثناء فترات الراحة. بعد إكمال الدورة، نقوم بالإبلاغ مباشرة إلى وكالة النقل السويدية عبر الإنترنت في غضون 24 ساعة. يرجى ملاحظة أنه لا يتم إعطاء شهادة ورقية للمشاركين بعد الدورة.",
            order: 1
          },
          {
            title: "لمزيد من المعلومات:",
            description: "قم بزيارة موقع وكالة النقل السويدية للحصول على مزيد من المعلومات حول محتوى ومتطلبات دورة المخاطر 1.",
            order: 2
          },
          {
            title: "استعد:",
            description: "استعد لتجربة قيادة أكثر أمانًا مع دورة المخاطر 1 في ABS Trafikskola Södertälje.",
            order: 3
          }
        ]
      }
    };

    const selectedFallback = fallbacks[lang as keyof typeof fallbacks] || fallbacks.en;
    
    return {
      ...selectedFallback,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Clear cache for all languages (useful for admin updates)
  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    
    // Clear language-specific caches
    this.en_cache = null;
    this.sv_cache = null;
    this.ar_cache = null;
    this.en_expiry = 0;
    this.sv_expiry = 0;
    this.ar_expiry = 0;
    
    console.log('🗑️ RiskettanContentService: All caches cleared');
  }
}

// Export singleton instance
export const riskettanContentService = new RiskettanContentService();
