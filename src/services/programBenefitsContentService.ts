// Program Benefits Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ProgramBenefit {
  id: string;
  title: string;
  description: string;
  icon: {
    type: 'image' | 'emoji' | 'svg';
    url: string;
    alt: string;
    emoji: string;
    svgContent: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    color: string;
  };
  active: boolean;
  order: number;
}

export interface ProgramBenefitsContent {
  id: string;
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  benefits: ProgramBenefit[];
  styling: {
    layout: {
      columns: {
        mobile: number;
        tablet: number;
        desktop: number;
      };
      gap: string;
    };
    colors: {
      background: string;
      cardBackground: string;
      cardBackgroundActive: string;
      textColor: string;
      textColorActive: string;
    };
    spacing: {
      sectionPadding: string;
      cardPadding: string;
    };
    card: {
      borderRadius: string;
      shadow: string;
      shadowActive: string;
    };
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

class ProgramBenefitsContentService {
  private cache: ProgramBenefitsContent | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }

  async getProgramBenefitsContent(lang: string = 'en'): Promise<ProgramBenefitsContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid()) {
        console.log('✅ Returning cached program benefits content');
        return this.cache!;
      }

      console.log('🔄 Fetching program benefits content from API...');
      
      const response = await fetch(`${API_BASE_URL}/program-benefits-content?lang=${lang}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ProgramBenefitsContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log('✅ Program benefits content loaded successfully');
      console.log('📊 Content stats:', {
        title: result.data.header.title,
        benefitsCount: result.data.benefits.length,
        activeBenefitsCount: result.data.benefits.filter(b => b.active).length,
        styling: {
          desktopColumns: result.data.styling.layout.columns.desktop,
          background: result.data.styling.colors.background,
        }
      });
      
      // Update cache
      this.cache = result.data;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching program benefits content:', error);
      
      // Return cached data if available
      if (this.cache) {
        console.log('⚠️ Returning cached data due to API error');
        return this.cache;
      }
      
      // Return fallback data
      console.log('⚠️ Returning fallback program benefits content');
      return this.getFallbackContent(lang);
    }
  }

  private getFallbackContent(lang: string = 'en'): ProgramBenefitsContent {
    const fallbackContent = {
      en: {
        header: {
          title: "Why Choose Our Driving School",
          subtitle: "Benefits of Learning with Us",
          description: "Discover what makes our driving school the best choice for your driving education."
        },
        benefits: [
          {
            id: "experienced-teachers",
            title: "Experienced Teachers",
            description: "Our instructors are highly experienced and passionate, ensuring you receive the best guidance throughout your learning journey with our driving school."
          },
          {
            id: "high-pass-rates",
            title: "Exceptional High Pass Rates", 
            description: "We have some of the highest pass rates in the region, reflecting the quality of our driving lessons and training programs."
          },
          {
            id: "competitive-prices",
            title: "Competitive Prices",
            description: "Enjoy top-notch driving lessons at the most competitive prices in the area."
          },
          {
            id: "central-location",
            title: "Central Location",
            description: "Located in the heart of Södertälje, close to Trafikverket exam centers."
          },
          {
            id: "comprehensive-guidance",
            title: "Comprehensive Guidance",
            description: "We guide you every step of the way to obtaining your driver's license."
          },
          {
            id: "flexible-payment",
            title: "Flexible Payment Options!",
            description: "Interest-free installment payments for up to 24 months with Resurs Bank."
          },
          {
            id: "flexible-hours",
            title: "Flexible Opening Hours",
            description: "Open on weekends and evenings to fit your schedule."
          },
          {
            id: "intensive-program",
            title: "Intensive Driving Lessons Program",
            description: "Quick completion for those needing a license fast."
          }
        ]
      },
      sv: {
        header: {
          title: "Varför Välja Vår Trafikskola",
          subtitle: "Fördelar med att Lära Sig Hos Oss",
          description: "Upptäck vad som gör vår trafikskola till det bästa valet för din körundervisning."
        },
        benefits: [
          {
            id: "experienced-teachers",
            title: "Erfarna Lärare",
            description: "Våra instruktörer är mycket erfarna och passionerade, vilket säkerställer att du får den bästa vägledningen under din inlärningsresa med vår trafikskola."
          },
          {
            id: "high-pass-rates", 
            title: "Exceptionellt Höga Godkänt-Procent",
            description: "Vi har några av de högsta godkänt-procenten i regionen, vilket speglar kvaliteten på våra körlektioner och utbildningsprogram."
          },
          {
            id: "competitive-prices",
            title: "Konkurrenskraftiga Priser",
            description: "Njut av förstklassiga körlektioner till de mest konkurrenskraftiga priserna i området."
          },
          {
            id: "central-location",
            title: "Centralt Läge",
            description: "Beläget i hjärtat av Södertälje, nära Trafikverkets provcentra."
          },
          {
            id: "comprehensive-guidance",
            title: "Omfattande Vägledning", 
            description: "Vi vägleder dig varje steg på vägen till att få ditt körkort."
          },
          {
            id: "flexible-payment",
            title: "Flexibla Betalningsalternativ!",
            description: "Räntefria delbetalningar i upp till 24 månader med Resurs Bank."
          },
          {
            id: "flexible-hours",
            title: "Flexibla Öppettider",
            description: "Öppet på helger och kvällar för att passa ditt schema."
          },
          {
            id: "intensive-program",
            title: "Intensivt Körkortsutbildningsprogram",
            description: "Snabbt slutförande för dem som behöver körkort snabbt."
          }
        ]
      },
      ar: {
        header: {
          title: "لماذا تختار مدرسة القيادة الخاصة بنا",
          subtitle: "فوائد التعلم معنا",
          description: "اكتشف ما يجعل مدرسة القيادة الخاصة بنا الخيار الأفضل لتعليم القيادة."
        },
        benefits: [
          {
            id: "experienced-teachers",
            title: "مدرسون ذوو خبرة",
            description: "مدربونا ذوو خبرة عالية ومتحمسون، مما يضمن حصولك على أفضل إرشاد طوال رحلة التعلم مع مدرسة القيادة لدينا."
          },
          {
            id: "high-pass-rates",
            title: "معدلات نجاح عالية استثنائية",
            description: "لدينا بعض من أعلى معدلات النجاح في المنطقة، مما يعكس جودة دروس القيادة وبرامج التدريب لدينا."
          },
          {
            id: "competitive-prices",
            title: "أسعار تنافسية",
            description: "استمتع بدروس قيادة من الدرجة الأولى بأكثر الأسعار تنافسية في المنطقة."
          },
          {
            id: "central-location", 
            title: "موقع مركزي",
            description: "يقع في قلب سودرتاليه، بالقرب من مراكز امتحان Trafikverket."
          },
          {
            id: "comprehensive-guidance",
            title: "إرشاد شامل",
            description: "نرشدك في كل خطوة على الطريق للحصول على رخصة القيادة الخاصة بك."
          },
          {
            id: "flexible-payment",
            title: "خيارات دفع مرنة!",
            description: "دفعات تقسيط بدون فوائد لمدة تصل إلى 24 شهراً مع Resurs Bank."
          },
          {
            id: "flexible-hours",
            title: "ساعات عمل مرنة",
            description: "مفتوح في عطلات نهاية الأسبوع والمساء ليناسب جدولك الزمني."
          },
          {
            id: "intensive-program",
            title: "برنامج دروس القيادة المكثفة",
            description: "إنجاز سريع لأولئك الذين يحتاجون إلى ترخيص بسرعة."
          }
        ]
      }
    };

    const content = fallbackContent[lang as keyof typeof fallbackContent] || fallbackContent.en;

    return {
      id: 'fallback',
      header: content.header,
      benefits: content.benefits.map((benefit, index) => ({
        id: benefit.id,
        title: benefit.title,
        description: benefit.description,
        icon: {
          type: 'emoji',
          url: '',
          alt: benefit.title,
          emoji: this.getDefaultEmoji(index),
          svgContent: '',
          size: 'lg',
          color: ''
        },
        active: index === 0, // First benefit is active by default
        order: index + 1
      })),
      styling: {
        layout: {
          columns: {
            mobile: 1,
            tablet: 2,
            desktop: 4
          },
          gap: '6'
        },
        colors: {
          background: '#f7f9fc',
          cardBackground: 'white',
          cardBackgroundActive: 'blue-500',
          textColor: 'black',
          textColorActive: 'white'
        },
        spacing: {
          sectionPadding: 'py-12 px-6 md:px-12 lg:px-24',
          cardPadding: 'p-6'
        },
        card: {
          borderRadius: 'rounded-xl',
          shadow: 'hover:shadow',
          shadowActive: 'shadow-md'
        }
      },
      seo: {
        title: content.header.title,
        description: content.header.description,
        keywords: ['driving school', 'benefits', 'education', 'ABS Trafikskola']
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }

  private getDefaultEmoji(index: number): string {
    const emojis = ['👨‍🏫', '📈', '💰', '📍', '🛡️', '💳', '🕒', '🏁'];
    return emojis[index] || '✨';
  }

  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ Program benefits content cache cleared');
  }

  async preloadContent(lang: string = 'en'): Promise<void> {
    try {
      await this.getProgramBenefitsContent(lang);
      console.log('⚡ Program benefits content preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload program benefits content:', error);
    }
  }
}

// Export singleton instance
const programBenefitsContentService = new ProgramBenefitsContentService();
export default programBenefitsContentService;
