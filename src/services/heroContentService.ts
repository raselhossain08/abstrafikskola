// Hero Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    variant: 'primary' | 'secondary' | 'outline';
    size: 'sm' | 'md' | 'lg';
    icon: boolean;
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
  private cache: HeroContent | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }

  async getHeroContent(lang: string = 'en'): Promise<HeroContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid()) {
        console.log('✅ Returning cached hero content');
        return this.cache!;
      }

      console.log('🔄 Fetching hero content from API...');
      
      const response = await fetch(`${API_BASE_URL}/hero-content?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<HeroContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log('✅ Hero content loaded successfully');
      console.log('📊 Content stats:', {
        title: result.data.mainContent.title,
        featuresCount: result.data.features.length,
        backgroundImage: result.data.backgroundImage.url,
        centerIcon: result.data.centerIcon.url,
      });
      
      // Update cache
      this.cache = result.data;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching hero content:', error);
      
      // Return cached data if available
      if (this.cache) {
        console.log('⚠️ Returning cached data due to API error');
        return this.cache;
      }
      
      // Return fallback data
      console.log('⚠️ Returning fallback hero content');
      return this.getFallbackContent(lang);
    }
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
        url: '/img/hero-bg.jpg',
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
          url: `/icons/feature-${index + 1}.svg`,
          alt: feature.icon.alt
        },
        order: index + 1
      })),
      buttonStyle: {
        variant: 'primary',
        size: 'lg',
        icon: true
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
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ Hero content cache cleared');
  }

  async preloadContent(lang: string = 'en'): Promise<void> {
    try {
      await this.getHeroContent(lang);
      console.log('⚡ Hero content preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload hero content:', error);
    }
  }
}

// Export singleton instance
const heroContentService = new HeroContentService();
export default heroContentService;
