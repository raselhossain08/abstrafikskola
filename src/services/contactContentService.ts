// Contact content service with multi-language support
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

export interface LocationInterface {
  address: string;
  googleMapsLink: string;
  embedUrl?: string;
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
  embedUrl?: string;
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
    map?: MapInterface; // Legacy support
    location?: LocationInterface; // New structure
  };
  form: {
    title: {
      en: string;
      sv: string;
      ar: string;
    };
  };
}

// Cache interface for storing translations
interface CacheEntry {
  data: ContactContentInterface;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class ContactContentService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  // Get contact content from API with language support
  async getContactContent(language: string = 'en'): Promise<{ success: boolean; data?: ContactContentInterface; error?: string }> {
    try {
      // Check cache first
      const cacheKey = `contact-content-${language}`;
      const cached = this.getCachedData(cacheKey);
      if (cached) {
        console.log(`📦 Returning cached contact content for ${language}`);
        return { success: true, data: cached };
      }

      console.log(`🌍 Fetching contact content for language: ${language}`);

      const response = await fetch(`${API_BASE_URL}/api/contact-content?lang=${language}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data from API
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch contact content');
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
      console.error(`❌ Error fetching contact content for ${language}:`, error);
      
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
  private getCachedData(key: string): ContactContentInterface | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCachedData(key: string, data: ContactContentInterface): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: this.CACHE_TTL
    });
  }

  // Clear all cached data
  clearCache(): void {
    this.cache.clear();
    console.log('🧹 Contact content cache cleared');
  }

  // Upload contact method icon
  async uploadContactMethodIcon(
    file: File, 
    methodIndex: number, 
    contactId?: string, 
    token?: string,
    language: string = 'en'
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log(`📤 Uploading icon for contact method ${methodIndex}`);

      const formData = new FormData();
      formData.append('icon', file);
      formData.append('methodIndex', methodIndex.toString());
      
      if (contactId) {
        formData.append('contactId', contactId);
      }

      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/contact-content/upload-icon?lang=${language}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload contact method icon');
      }

      if (result.success) {
        // Clear cache since data has been updated
        this.clearCache();
        
        console.log(`✅ Contact method icon uploaded successfully:`, result.data?.url);
        
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error uploading contact method icon:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Update contact content (admin functionality)
  async updateContactContent(
    id: string,
    data: Partial<ContactContentInterface>,
    token: string,
    language: string = 'en'
  ): Promise<{ success: boolean; data?: ContactContentInterface; error?: string }> {
    try {
      console.log(`📝 Updating contact content: ${id}`);

      const response = await fetch(`${API_BASE_URL}/api/contact-content/admin/${id}?lang=${language}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update contact content');
      }

      if (result.success) {
        // Clear cache since data has been updated
        this.clearCache();
        
        console.log(`✅ Contact content updated successfully`);
        
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error updating contact content:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get all contact contents (admin functionality)
  async getAllContactContents(token: string, language: string = 'en'): Promise<{ success: boolean; data?: ContactContentInterface[]; error?: string }> {
    try {
      console.log('📋 Fetching all contact contents');

      const response = await fetch(`${API_BASE_URL}/api/contact-content/admin/all?lang=${language}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch contact contents');
      }

      if (result.success) {
        return {
          success: true,
          data: result.data,
        };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error fetching contact contents:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get cached data info
  getCacheInfo(lang: string = 'en'): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Fallback data in case API fails
  private getFallbackData(lang: string = 'en'): ContactContentInterface {
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
          embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.397!2d17.6248!3d59.1957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f7d7c4c8b1f11%3A0x9a8b7c6d5e4f3a2b!2sDalgatan%201%2C%20151%2033%20S%C3%B6dert%C3%A4lje%2C%20Sweden!5e0!3m2!1sen!2sse!4v1642680000000!5m2!1sen!2sse',
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
