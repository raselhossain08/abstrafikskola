// API configuration and types
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const courseAPI = {
  getAll: (params?: Parameters<typeof apiClient.getPublicCourses>[0]) =>
    apiClient.getPublicCourses(params),
  getById: (id: string) => apiClient.getPublicCourse(id),
};

export const bookingAPI = {
  create: (bookingData: BookingData) =>
    apiClient.createPublicBooking(bookingData),
};

export const scheduleAPI = {
  getByCourseId: (courseId: string) => apiClient.getCourseSchedules(courseId),
  getByTitle: (title: string) => apiClient.getSchedulesByTitle(title),
};
