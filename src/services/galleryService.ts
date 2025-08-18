// Gallery API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface GalleryItem {
  _id?: string;
  image: string;
  alt?: string;
  category: 'theory' | 'practical' | 'certificate' | 'other';
  isActive: boolean;
  order?: number;
  width?: number;
  height?: number;
  socialLinks?: {
    facebook: string;
    instagram: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

class GalleryService {
  private static instance: GalleryService;
  private baseUrl = `${API_BASE_URL}/gallery`;

  public static getInstance(): GalleryService {
    if (!GalleryService.instance) {
      GalleryService.instance = new GalleryService();
    }
    return GalleryService.instance;
  }

  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
      };

      console.log('🚀 Making request to:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'no-cache',
        ...options,
      });

      console.log('📥 Response received:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP Error:', response.status, errorText);
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText}`,
        };
      }

      const data = await response.json();
      console.log('✅ Response data parsed successfully');
      
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('💥 Request failed:', error);
      
      // Provide more specific error information
      let errorMessage = 'Unknown error occurred';
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Network error: Cannot connect to API server. Please check if the backend server is running on port 8000.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Public method - get all active gallery items
  async getPublicGallery(): Promise<ApiResponse<GalleryItem[]>> {
    console.log('🔍 Starting gallery fetch...');
    console.log('📍 API URL:', `${this.baseUrl}/public`);
    console.log('🌐 Environment:', process.env.NODE_ENV);
    console.log('🔗 Base URL:', API_BASE_URL);
    
    try {
      const response = await this.makeRequest<any>(`${this.baseUrl}/public`);
      
      if (!response.success || !response.data) {
        console.error('❌ API request failed:', response.error);
        return {
          success: false,
          error: response.error || 'Failed to fetch gallery data'
        };
      }

      let galleryItems: GalleryItem[] = [];
      const apiData = response.data;

      console.log('🔍 Processing API response structure...');

      // Handle different API response formats
      if (apiData?.success && Array.isArray(apiData.data)) {
        console.log('📦 Found nested success structure');
        const nestedData = apiData.data;
        if (nestedData.length > 0 && nestedData[0].items && Array.isArray(nestedData[0].items)) {
          console.log('🎯 Extracting items from embedded structure');
          galleryItems = nestedData[0].items;
        } else {
          console.log('📋 Using direct nested array structure');
          galleryItems = nestedData;
        }
      } else if (Array.isArray(apiData) && apiData.length > 0 && apiData[0].items && Array.isArray(apiData[0].items)) {
        console.log('📦 Found direct embedded structure');
        galleryItems = apiData[0].items;
      } else if (Array.isArray(apiData)) {
        console.log('📋 Found direct array structure');
        galleryItems = apiData;
      } else {
        console.error('❌ Unexpected API response format:', apiData);
        return {
          success: false,
          error: 'Unexpected response format from API'
        };
      }

      // Filter active items and sort by order
      const activeItems = galleryItems.filter((item: any) => item.isActive !== false);
      const sortedItems = activeItems.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

      console.log(`✅ Gallery loaded successfully: ${sortedItems.length} items`);

      return {
        success: true,
        data: sortedItems
      };

    } catch (error) {
      console.error('💥 Critical error in getPublicGallery:', error);
      
      // Return a more user-friendly error message
      let errorMessage = 'Failed to load gallery';
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to the server. Please check your internet connection and try again.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

// Export singleton instance
export const galleryService = GalleryService.getInstance();
export default galleryService;
