// Contact content service
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface ContactMethodInterface {
  icon: string;
  alt: string;
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  detail: string;
  href: string;
}

export interface HoursInterface {
  title: {
    en: string;
    sv: string;
    ar: string;
  };
  detail: string;
}

export interface FeatureInterface {
  en: string;
  sv: string;
  ar: string;
}

export interface MapInterface {
  src: string;
  width: number;
  height: number;
  alt: {
    en: string;
    sv: string;
    ar: string;
  };
}

export interface ContactContentInterface {
  hero: {
    title: {
      en: string;
      sv: string;
      ar: string;
    };
    subtitle: {
      en: string;
      sv: string;
      ar: string;
    };
    desktopImage: string;
    mobileImage: string;
    altText: {
      en: string;
      sv: string;
      ar: string;
    };
  };
  contactSection: {
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
    contactMethods: ContactMethodInterface[];
    hours: HoursInterface[];
    features: FeatureInterface[];
    map: MapInterface;
  };
  form: {
    title: {
      en: string;
      sv: string;
      ar: string;
    };
  };
}

class ContactContentService {
  
  // Get contact content from API
  async getContactContent(): Promise<{ success: boolean; data?: ContactContentInterface; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact-content`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch contact content');
      }

      if (result.success && result.data) {
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('❌ Error fetching contact content:', error);
      
      // Return fallback data if API fails
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: this.getFallbackData(),
      };
    }
  }

  // Fallback data in case API fails
  private getFallbackData(): ContactContentInterface {
    return {
      hero: {
        title: {
          en: 'Contact Us',
          sv: 'Kontakta oss',
          ar: 'اتصل بنا',
        },
        subtitle: {
          en: 'A driving school in Södertälje with most affordable prices',
          sv: 'En körskola i Södertälje med de mest prisvärda priserna',
          ar: 'مدرسة تعليم قيادة في سودرتاليا بأسعار معقولة جداً',
        },
        desktopImage: '/img/contact/2.png',
        mobileImage: '/img/contact/mobile.png',
        altText: {
          en: 'Contact Us Hero Image',
          sv: 'Kontakt Hjältbild',
          ar: 'صورة اتصل بنا الرئيسية',
        },
      },
      contactSection: {
        title: {
          en: 'Contact',
          sv: 'Kontakt',
          ar: 'تواصل معنا',
        },
        description: {
          en: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat.',
          sv: 'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat.',
          ar: 'هذا النص هو مجرد مثال لاستخدام المحتوى التجريبي في التصميم.',
        },
        contactMethods: [
          {
            icon: '/icons/social/facebook.svg',
            alt: 'facebook',
            title: {
              en: 'Call Us',
              sv: 'Ring oss',
              ar: 'اتصل بنا',
            },
            detail: '08 550 66666',
            href: 'tel:0855066666',
          },
          {
            icon: '/icons/social/whatsapp.svg',
            alt: 'whatsapp',
            title: {
              en: 'WhatsApp/SMS',
              sv: 'WhatsApp/SMS',
              ar: 'واتساب / رسالة نصية',
            },
            detail: '073 938 8424',
            href: 'https://wa.me/0739388424',
          },
          {
            icon: '/icons/social/sms.svg',
            alt: 'sms',
            title: {
              en: 'Send Us Mail',
              sv: 'Skicka e-post',
              ar: 'أرسل لنا بريدًا',
            },
            detail: 'info@abstraflkskola.se',
            href: 'mailto:info@abstraflkskola.se',
          },
          {
            icon: '/icons/social/location.svg',
            alt: 'location',
            title: {
              en: 'Find the Studio',
              sv: 'Hitta studion',
              ar: 'اعثر على موقعنا',
            },
            detail: 'Dalgatan 1 1, 15133 Södertälje',
            href: 'https://maps.google.com/?q=Dalgatan+1+1,+15133+Södertälje',
          },
        ],
        hours: [
          {
            title: {
              en: 'Tel/Reception',
              sv: 'Telefon/Reception',
              ar: 'الهاتف / الاستقبال',
            },
            detail: 'Mon-Fri 09.00-17.00',
          },
          {
            title: {
              en: 'Driving lessons/Courses',
              sv: 'Körlektioner/Kurser',
              ar: 'دروس القيادة / الدورات',
            },
            detail: '7 days a week 07.00-19.30',
          },
        ],
        features: [
          {
            en: 'We are open seven days a week for driving lessons, risk1, risk2 and introduktionsutbildning.',
            sv: 'Vi har öppet sju dagar i veckan för körlektioner, risk1, risk2 och introduktionsutbildning.',
            ar: 'نحن متاحون طوال الأسبوع لدروس القيادة، Risk1، Risk2، والتعليم التمهيدي.',
          },
          {
            en: 'Our reception and telephone hours are open Monday to Friday 09.00 - 17.00.',
            sv: 'Vår reception och telefontid är öppen måndag till fredag 09.00 - 17.00.',
            ar: 'ساعات الاستقبال والهاتف من الإثنين إلى الجمعة 09:00 - 17:00.',
          },
          {
            en: 'If you have any questions or queries, please call us, email us or stop by our driving school.',
            sv: 'Om du har några frågor, ring oss, skicka ett mejl eller besök vår körskola.',
            ar: 'إذا كان لديك أي استفسار، يرجى الاتصال بنا أو إرسال بريد إلكتروني أو زيارتنا.',
          },
        ],
        map: {
          src: '/img/map.png',
          width: 591,
          height: 279,
          alt: {
            en: 'Driving School Location Map',
            sv: 'Platskarta för körskola',
            ar: 'خريطة موقع مدرسة القيادة',
          },
        },
      },
      form: {
        title: {
          en: 'Get In Touch With Us',
          sv: 'Kontakta oss',
          ar: 'تواصل معنا',
        },
      },
    };
  }
}

// Export a singleton instance
export const contactContentService = new ContactContentService();
