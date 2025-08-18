// Payment Content API Service for Frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface PaymentContent {
  id: string;
  title: string;
  description: string;
  swish: {
    companyName: string;
    number: string;
    qrImage: {
      url: string;
      publicId: string;
    };
  };
  bankGiro: {
    companyName: string;
    number: string;
    logo: {
      url: string;
      publicId: string;
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

class PaymentContentService {
  private cache: PaymentContent | null = null;
  private cacheExpiry = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() < this.cacheExpiry;
  }

  async getPaymentContent(): Promise<PaymentContent> {
    try {
      // Return cached data if valid
      if (this.isCacheValid()) {
        console.log('✅ Returning cached payment content');
        return this.cache!;
      }

      console.log('🔄 Fetching payment content from API...');
      
      const response = await fetch(`${API_BASE_URL}/payment-content`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<PaymentContent> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error('Invalid response format from API');
      }

      console.log('✅ Payment content loaded successfully');
      console.log('📊 Content stats:', {
        title: result.data.title,
        swishNumber: result.data.swish.number,
        bankGiroNumber: result.data.bankGiro.number,
        descriptionLength: result.data.description.length,
      });
      
      // Update cache
      this.cache = result.data;
      this.cacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return result.data;

    } catch (error) {
      console.error('❌ Error fetching payment content:', error);
      
      // Return cached data if available
      if (this.cache) {
        console.log('⚠️ Returning cached data due to API error');
        return this.cache;
      }
      
      // Return fallback data
      console.log('⚠️ Returning fallback payment content');
      return this.getFallbackContent();
    }
  }

  private getFallbackContent(): PaymentContent {
    return {
      id: 'fallback',
      title: 'Swish/BG',
      description: 'Please use the following swish or bank giro number to pay ABS Trafikskola AB. Please put your name and personnumber in message with payment.',
      swish: {
        companyName: 'ABS Trafikskola AB',
        number: '1234323788',
        qrImage: {
          url: '/img/switch/qr.svg',
          publicId: 'payment/qr-code'
        }
      },
      bankGiro: {
        companyName: 'ABS Trafikskola AB',
        number: '5158-3573',
        logo: {
          url: '/img/switch/bankgirot.svg',
          publicId: 'payment/bankgiro-logo'
        }
      },
      seo: {
        title: 'Payment Methods - Swish & Bank Giro - ABS Trafikskola',
        description: 'Pay for your driving lessons using Swish or Bank Giro. Secure and convenient payment options available.',
        keywords: ['payment', 'swish', 'bank giro', 'driving lessons payment', 'ABS Trafikskola']
      },
      lastUpdated: new Date().toISOString(),
      version: '1.0'
    };
  }

  clearCache(): void {
    this.cache = null;
    this.cacheExpiry = 0;
    console.log('🗑️ Payment content cache cleared');
  }

  async preloadContent(): Promise<void> {
    try {
      await this.getPaymentContent();
      console.log('⚡ Payment content preloaded successfully');
    } catch (error) {
      console.error('❌ Failed to preload payment content:', error);
    }
  }
}

// Export singleton instance
const paymentContentService = new PaymentContentService();
export default paymentContentService;
