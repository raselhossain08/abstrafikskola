// Intensive Driving Content Service
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

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
  private cache: Map<string, IntensiveDrivingContentData> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = `${API_BASE_URL}/api/intensive-driving-content`;
  }

  /**
   * Get intensive driving content with caching and language support
   */
  async getIntensiveDrivingContent(lang: string = 'en'): Promise<IntensiveDrivingContentData> {
    // Return cached data if available and not expired
    const cacheKey = `intensive-driving-${lang}`;
    const cachedData = this.cache.get(cacheKey);
    const cacheExpiry = this.cacheExpiry.get(cacheKey) || 0;
    
    if (cachedData && Date.now() < cacheExpiry) {
      console.log(`📦 Using cached intensive driving content for ${lang}`);
      return cachedData;
    }

    try {
      console.log(`🔄 Fetching intensive driving content for ${lang}...`);
      
      const response = await fetch(`${this.baseURL}?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<IntensiveDrivingContentData> = await response.json();
      
      if (result.success && result.data) {
        // Cache the successful response
        this.cache.set(cacheKey, result.data);
        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
        console.log(`✅ Intensive driving content loaded successfully for ${lang}`);
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch intensive driving content');
      }
    } catch (error) {
      console.error(`❌ Error fetching intensive driving content for ${lang}:`, error);
      
      // Return fallback data if API fails
      return this.getFallbackContent(lang);
    }
  }

  /**
   * Clear cache - useful for testing or forcing refresh
   */
  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }

  /**
   * Fallback content when API is unavailable
   */
  private getFallbackContent(lang: string = 'en'): IntensiveDrivingContentData {
    const content = {
      en: {
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
        }
      },
      sv: {
        title: "Intensivkörprogram",
        subtitle: "Få ditt körkort på bara 1–3 veckor!",
        programFeatures: {
          title: "Programfunktioner",
          items: [
            {
              title: "Accelererat schema:",
              description: "Genomför alla körlektioner och övningssessioner på 1–3 veckor..."
            },
            {
              title: "Anpassade lektioner:",
              description: "Dagliga lektioner anpassade efter dina körfärdigheter..."
            },
            {
              title: "Expertinstruktörer:",
              description: "Lär dig av erfarna, passionerade lärare som vägleder dig varje steg."
            },
            {
              title: "Omfattande utbildning:",
              description: "Bemästra alla köraspekter, från grundläggande färdigheter till avancerade manövrar."
            },
            {
              title: "Flexibla tider:",
              description: "Kvälls- och helgsessioner för att passa ditt schema."
            },
            {
              title: "Samma bil som Trafikverket:",
              description: "Öva i samma typ av bil som du kommer att använda för ditt körprov."
            }
          ]
        },
        whyChoose: {
          title: "Varför välja vårt intensivprogram?",
          items: [
            {
              title: "Höga godkännanden:",
              description: "Exceptionella godkännandefrekvenser tack vare fokuserad utbildning."
            },
            {
              title: "Centralt läge:",
              description: "Bekvämt beläget i Södertälje, nära Trafikverkets provcentra."
            },
            {
              title: "Fullständigt stöd:",
              description: "Hjälp med att boka provtider efter att du slutfört programmet."
            }
          ]
        }
      },
      ar: {
        title: "برنامج دروس القيادة المكثفة",
        subtitle: "احصل على رخصتك في 1-3 أسابيع فقط!",
        programFeatures: {
          title: "ميزات البرنامج",
          items: [
            {
              title: "جدول زمني مُسَرَّع:",
              description: "أكمل جميع دروس القيادة وجلسات التدريب في 1-3 أسابيع..."
            },
            {
              title: "دروس مُخصصة:",
              description: "دروس يومية مُصممة خصيصاً لمهاراتك في القيادة..."
            },
            {
              title: "مدربون خبراء:",
              description: "تعلم من معلمين متمرسين ومتحمسين يرشدونك في كل خطوة."
            },
            {
              title: "تدريب شامل:",
              description: "اتقن جميع جوانب القيادة، من المهارات الأساسية إلى المناورات المتقدمة."
            },
            {
              title: "توقيت مرن:",
              description: "جلسات مسائية وفي عطلة نهاية الأسبوع لتناسب جدولك."
            },
            {
              title: "نفس سيارة Trafikverket:",
              description: "تدرب في نفس نوع السيارة التي ستستخدمها في اختبار القيادة."
            }
          ]
        },
        whyChoose: {
          title: "لماذا تختار برنامجنا المكثف؟",
          items: [
            {
              title: "معدلات نجاح عالية:",
              description: "معدلات نجاح استثنائية بفضل التدريب المركز."
            },
            {
              title: "موقع مركزي:",
              description: "يقع بشكل مريح في سودرتاليه، بالقرب من مراكز امتحانات Trafikverket."
            },
            {
              title: "دعم كامل:",
              description: "المساعدة في حجز مواعيد الامتحانات بعد إكمال البرنامج."
            }
          ]
        }
      }
    };

    const selectedContent = content[lang as keyof typeof content] || content.en;

    return {
      ...selectedContent,
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
