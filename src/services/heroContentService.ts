// Hero Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface HeroContent {
  id: string;
  mainContent: {
    welcome: string;
    title: string;
    subtitle: string;
    cta: string;
  };
  backgroundImage: {
    url: string;
    alt: string;
  };
  centerIcon: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  features: Array<{
    id: string;
    icon: {
      url: string;
      alt: string;
    };
    title: string;
    text: string;
    order: number;
  }>;
  buttonStyle: {
    backgroundColor: string;
    textColor: string;
    width: number;
    height: number;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  version: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class HeroContentService {
  private cache = new Map<string, { content: HeroContent; expiry: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private listeners = new Set<() => void>();

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(lang: string): boolean {
    const cached = this.cache.get(lang);
    return cached !== undefined && Date.now() < cached.expiry;
  }

  private getCachedContent(lang: string): HeroContent | null {
    const cached = this.cache.get(lang);
    return cached ? cached.content : null;
  }

  private setCachedContent(lang: string, content: HeroContent): void {
    this.cache.set(lang, {
      content,
      expiry: Date.now() + this.CACHE_DURATION
    });
    // Notify all listeners when cache is updated
    this.listeners.forEach(listener => listener());
  }

  // Add listener for cache updates
  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async getHeroContent(lang: string = 'en'): Promise<HeroContent> {
    console.log(`🔍 [HeroService] Requesting content for language: ${lang}`);
    console.log(`🔍 [HeroService] API_BASE_URL: ${API_BASE_URL}`);
    
    // Check if we have valid cached content (including real API data)
    const cachedContent = this.getCachedContent(lang);
    if (cachedContent && cachedContent.id !== 'fallback') {
      console.log(`✅ [HeroService] Cache HIT with real data for ${lang}`);
      return cachedContent;
    }

    // Try to fetch real content first
    try {
      console.log(`🔄 [HeroService] Fetching real data for ${lang}...`);
      const response = await fetch(`${API_BASE_URL}/api/hero-content?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (response.ok) {
        const result: ApiResponse<HeroContent> = await response.json();
        if (result.success && result.data) {
          console.log(`✅ [HeroService] Real API data loaded for ${lang}`);
          this.setCachedContent(lang, result.data);
          return result.data;
        }
      }
      
      console.log(`⚠️ [HeroService] API failed, using fallback for ${lang}`);
    } catch (error) {
      console.log(`❌ [HeroService] API error, using fallback for ${lang}:`, error);
    }

    // Return fallback if API fails
    const fallbackContent = this.getFallbackContent(lang);
    this.setCachedContent(lang, fallbackContent);
    return fallbackContent;
  }

  private getFallbackContent(lang: string = 'en'): HeroContent {
    const fallbackContent = {
      en: {
        mainContent: {
          welcome: "WELCOME TO",
          title: "ABS TRAFIKSKOLA",
          subtitle: "Get your driving license with confidence and professional guidance. We offer comprehensive courses to help you become a safe and skilled driver.",
          cta: "Book Now"
        },
        backgroundImage: {
          alt: "ABS Trafikskola driving school background"
        },
        centerIcon: {
          alt: "ABS Trafikskola logo"
        },
        features: [
          {
            id: "feature-1",
            icon: { alt: "Experienced instructors icon" },
            title: "Experienced Instructors",
            text: "Learn from certified professionals with years of teaching experience."
          },
          {
            id: "feature-2", 
            icon: { alt: "Modern vehicles icon" },
            title: "Modern Vehicles",
            text: "Practice with well-maintained, safe, and modern training cars."
          },
          {
            id: "feature-3",
            icon: { alt: "Flexible scheduling icon" },
            title: "Flexible Scheduling",
            text: "Choose lesson times that fit your busy schedule and lifestyle."
          },
          {
            id: "feature-4",
            icon: { alt: "High success rate icon" },
            title: "High Success Rate",
            text: "Join thousands of students who passed their driving test with us."
          }
        ],
        seo: {
          title: "Professional Driving School - ABS Trafikskola",
          description: "Learn to drive with confidence at ABS Trafikskola. Professional instructors, modern vehicles, and flexible scheduling. Book your driving lessons today!"
        }
      },
      sv: {
        mainContent: {
          welcome: "VÄLKOMMEN TILL",
          title: "ABS TRAFIKSKOLA", 
          subtitle: "Få ditt körkort med självförtroende och professionell vägledning. Vi erbjuder omfattande kurser för att hjälpa dig bli en säker och skicklig förare.",
          cta: "Boka Nu"
        },
        backgroundImage: {
          alt: "ABS Trafikskola trafikskola bakgrund"
        },
        centerIcon: {
          alt: "ABS Trafikskola logotyp"
        },
        features: [
          {
            id: "feature-1",
            icon: { alt: "Erfarna instruktörer ikon" },
            title: "Erfarna Instruktörer",
            text: "Lär dig av certifierade proffs med många års undervisningsexperience."
          },
          {
            id: "feature-2",
            icon: { alt: "Moderna fordon ikon" },
            title: "Moderna Fordon", 
            text: "Öva med välunderhållna, säkra och moderna utbildningsbilar."
          },
          {
            id: "feature-3",
            icon: { alt: "Flexibel schemaläggning ikon" },
            title: "Flexibel Schemaläggning",
            text: "Välj lektionstider som passar ditt upptagna schema och livsstil."
          },
          {
            id: "feature-4",
            icon: { alt: "Hög framgångsgrad ikon" },
            title: "Hög Framgångsgrad",
            text: "Anslut dig till tusentals studenter som klarade körprovet med oss."
          }
        ],
        seo: {
          title: "Professionell Trafikskola - ABS Trafikskola",
          description: "Lär dig köra med självförtroende på ABS Trafikskola. Professionella instruktörer, moderna fordon och flexibel schemaläggning. Boka dina körlektioner idag!"
        }
      },
      ar: {
        mainContent: {
          welcome: "مرحباً بكم في",
          title: "ABS TRAFIKSKOLA",
          subtitle: "احصل على رخصة القيادة بثقة وإرشاد مهني. نحن نقدم دورات شاملة لمساعدتك في أن تصبح سائقاً آمناً وماهراً.",
          cta: "احجز الآن"
        },
        backgroundImage: {
          alt: "خلفية مدرسة القيادة ABS Trafikskola"
        },
        centerIcon: {
          alt: "شعار ABS Trafikskola"
        },
        features: [
          {
            id: "feature-1",
            icon: { alt: "أيقونة المدربين ذوي الخبرة" },
            title: "مدربون ذوو خبرة",
            text: "تعلم من محترفين معتمدين مع سنوات من خبرة التدريس."
          },
          {
            id: "feature-2",
            icon: { alt: "أيقونة المركبات الحديثة" },
            title: "مركبات حديثة",
            text: "تدرب مع سيارات تدريب آمنة ومُعتنى بها جيداً وحديثة."
          },
          {
            id: "feature-3",
            icon: { alt: "أيقونة الجدولة المرنة" },
            title: "جدولة مرنة",
            text: "اختر أوقات الدروس التي تناسب جدولك المزدحم ونمط حياتك."
          },
          {
            id: "feature-4",
            icon: { alt: "أيقونة معدل النجاح العالي" },
            title: "معدل نجاح عالي",
            text: "انضم إلى آلاف الطلاب الذين اجتازوا اختبار القيادة معنا."
          }
        ],
        seo: {
          title: "مدرسة قيادة مهنية - ABS Trafikskola",
          description: "تعلم القيادة بثقة في ABS Trafikskola. مدربون محترفون، مركبات حديثة، وجدولة مرنة. احجز دروس القيادة اليوم!"
        }
      }
    };

    const content = fallbackContent[lang as keyof typeof fallbackContent] || fallbackContent.en;

    return {
      id: 'fallback',
      mainContent: content.mainContent,
      backgroundImage: {
        url: '/img/hero/2.png',
        alt: content.backgroundImage.alt
      },
      centerIcon: {
        url: '/logo.svg',
        alt: content.centerIcon.alt,
        width: 518,
        height: 151
      },
      features: content.features.map((feature, index) => ({
        ...feature,
        icon: {
          url: `/img/hero/icon${index + 1}.svg`,
          alt: feature.icon.alt
        },
        order: index + 1
      })),
      buttonStyle: {
        backgroundColor: '#0063D5',
        textColor: '#FFFFFF',
        width: 200,
        height: 48,
        borderRadius: 30,
        fontSize: 18,
        fontWeight: 'medium'
      },
      seo: {
        title: content.seo.title,
        description: content.seo.description,
        keywords: ['driving school', 'körkort', 'trafikskola', 'driving lessons', 'ABS Trafikskola']
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }

  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Hero content cache cleared for all languages');
  }

  clearCacheForLanguage(lang: string): void {
    this.cache.delete(lang);
    console.log(`🗑️ Hero content cache cleared for language: ${lang}`);
  }

  async preloadContent(lang: string = 'en'): Promise<void> {
    try {
      await this.getHeroContent(lang);
      console.log(`⚡ Hero content preloaded successfully for language: ${lang}`);
    } catch (error) {
      console.error(`❌ Failed to preload hero content for language ${lang}:`, error);
    }
  }
}

// Export singleton instance
const heroContentService = new HeroContentService();
export default heroContentService;
