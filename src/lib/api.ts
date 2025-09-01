// API configuration and types
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export interface Course {
  _id: string;
  courseId: string;
  title: string;
  price: number;
  discount?: string;
  description?: string;
  duration?: string;
  language: string;
  category: string;
  maxStudents: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Schedule {
  _id: string;
  scheduleId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  maxStudents: number;
  currentBookings: number;
  availableSlots: number;
  venue: string;
  instructor: string;
  isAvailable: boolean;
}

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  personNumber: string;
  courseTitle: string;
  coursePrice?: number;
  scheduleId?: string;
}

export interface BookingResponse {
  bookingId: string;
  courseTitle: string;
  customerName: string;
  email: string;
  status: string;
}

export interface SubscriptionData {
  email: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCourses: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// API client class
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Public endpoints - no authentication required
  async getPublicCourses(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    language?: string;
    active?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<ApiResponse<Course[]>> {
    const queryString = params
      ? new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined) {
                acc[key] = String(value);
              }
              return acc;
            },
            {} as Record<string, string>
          )
        ).toString()
      : '';

    const endpoint = queryString
      ? `/public/courses?${queryString}`
      : '/public/courses';
    return this.request<Course[]>(endpoint);
  }

  async getPublicCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/public/courses/${id}`);
  }

  async createPublicBooking(
    bookingData: BookingData
  ): Promise<ApiResponse<BookingResponse>> {
    return this.request<BookingResponse>('/public/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getCourseSchedules(courseId: string): Promise<ApiResponse<Schedule[]>> {
    return this.request<Schedule[]>(`/public/courses/${courseId}/schedules`);
  }

  async getSchedulesByTitle(title: string): Promise<ApiResponse<Schedule[]>> {
    return this.request<Schedule[]>(
      `/public/schedules/search/${encodeURIComponent(title)}`
    );
  }

  async getCoursesByCategory(category: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(
      `/public/category/${encodeURIComponent(category)}`
    );
  }

  async createSubscription(
    subscriptionData: SubscriptionData
  ): Promise<ApiResponse<SubscriptionResponse>> {
    return this.request<SubscriptionResponse>('/subscription', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async createContact(
    contactData: ContactData
  ): Promise<ApiResponse<ContactResponse>> {
    return this.request<ContactResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const courseAPI = {
  getAll: (params?: Parameters<typeof apiClient.getPublicCourses>[0]) =>
    apiClient.getPublicCourses(params),
  getById: (id: string) => apiClient.getPublicCourse(id),
  getByCategory: (category: string) => apiClient.getCoursesByCategory(category),
};

export const bookingAPI = {
  create: (bookingData: BookingData) =>
    apiClient.createPublicBooking(bookingData),
};

export const scheduleAPI = {
  getByCourseId: (courseId: string) => apiClient.getCourseSchedules(courseId),
  getByTitle: (title: string) => apiClient.getSchedulesByTitle(title),
};

export const subscriptionAPI = {
  create: (subscriptionData: SubscriptionData) =>
    apiClient.createSubscription(subscriptionData),
};

export const contactAPI = {
  create: (contactData: ContactData) => apiClient.createContact(contactData),
};

// Risk1Risk2 combined package API
export const risk1Risk2API = {
  // Get combined Risk1 + Risk2 courses
  getCombinedCourses: async () => {
    try {
      console.log('🔍 Risk1Risk2 API: Searching for Risk1 + Risk2 category courses only');
      
      // Only try to get courses by "Risk1 + Risk2" category - no individual fallback
      const combinedResponse = await courseAPI.getByCategory('Risk1 + Risk2');
      
      if (combinedResponse.success && combinedResponse.data && combinedResponse.data.length > 0) {
        console.log(`✅ Risk1Risk2 API: Found ${combinedResponse.data.length} Risk1 + Risk2 category courses`);
        
        // Transform category courses to schedule format
        const combinedCourses = combinedResponse.data.map((course: any) => ({
          _id: course._id,
          scheduleId: course._id,
          title: course.title || 'Risk1 + Risk2',
          date: course.nextAvailableDate || new Date().toISOString().split('T')[0],
          startTime: course.startTime || '09:00',
          endTime: course.endTime || '15:00',
          price: course.price || 1200,
          maxStudents: course.maxStudents || 15,
          currentBookings: course.currentBookings || 0,
          availableSlots: course.maxStudents - (course.currentBookings || 0),
          venue: course.venue || 'ABS Trafikskola Södertälje',
          instructor: course.instructor || 'Certified Instructor',
          isAvailable: course.active !== false,
          courseType: 'risk1-risk2-combined',
          packageType: 'combined',
          category: 'Risk1 + Risk2'
        }));

        return {
          success: true,
          data: combinedCourses,
          message: 'Risk1 + Risk2 courses fetched successfully from category'
        };
      }

      // No fallback to individual courses - this API is specifically for combined Risk1 + Risk2
      console.log('❌ Risk1Risk2 API: No Risk1 + Risk2 category courses found');
      return {
        success: false,
        data: [],
        message: 'No Risk1 + Risk2 category courses available'
      };
      
    } catch (error) {
      console.error('❌ Risk1Risk2 API: Error fetching combined courses:', error);
      return {
        success: false,
        data: [],
        message: 'Failed to fetch Risk1 + Risk2 courses'
      };
    }
  },

  // Get package pricing information
  getPackagePricing: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/risk1-risk2/pricing`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching package pricing:', error);
      return {
        success: false,
        data: {
          risk1Price: 1800,
          risk2Price: 2200, 
          packagePrice: 3800,
          discount: 5,
          savings: 200
        },
        message: 'Using default pricing'
      };
    }
  },

  // Book a Risk1+Risk2 package
  bookPackage: async (bookingData: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    personNumber: string;
    packageType: 'risk1-risk2';
    preferredDates?: {
      risk1Date?: string;
      risk2Date?: string;
    };
    notes?: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/risk1-risk2/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error booking package:', error);
      return {
        success: false,
        message: 'Failed to book package. Please try again.'
      };
    }
  },

  // Get available package deals
  getAvailablePackages: async (filters?: {
    dateFrom?: string;
    dateTo?: string;
    language?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);
      if (filters?.language) queryParams.append('language', filters.language);

      const response = await fetch(
        `${API_BASE_URL}/public/risk1-risk2/availability?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching available packages:', error);
      // Fallback to combined courses
      return risk1Risk2API.getCombinedCourses();
    }
  }
};
