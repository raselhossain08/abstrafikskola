// Student Feedback Service
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export interface Feedback {
  _id?: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  content: string;
  order?: number;
}

export interface StudentFeedbackData {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  feedbacks: Feedback[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class StudentFeedbackService {
  private baseURL: string;
  private cache: StudentFeedbackData | null = null;
  private currentLang: string = 'en';
  private cacheExpiry: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseURL = `${API_BASE_URL}/api/student-feedback`;
  }

  /**
   * Get student feedback with caching and language support
   */
  async getStudentFeedback(lang: string = 'en'): Promise<StudentFeedbackData> {
    // Language-specific cache key
    const cacheKey = `studentFeedback_${lang}`;
    
    // Return cached data if available and not expired
    if (this.cache && Date.now() < this.cacheExpiry && this.currentLang === lang) {
      return this.cache;
    }

    try {
      const url = `${this.baseURL}?lang=${lang}`;
      console.log(`📡 Fetching Student Feedback for language: ${lang}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<StudentFeedbackData> = await response.json();
      
      if (result.success && result.data) {
        // Sort feedbacks by order
        if (result.data.feedbacks) {
          result.data.feedbacks.sort((a, b) => (a.order || 0) - (b.order || 0));
        }

        // Cache the successful response with language info
        this.cache = result.data;
        this.currentLang = lang;
        this.cacheExpiry = Date.now() + this.CACHE_DURATION;
        
        console.log(`✅ Student Feedback loaded for language: ${lang}`);
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to fetch student feedback');
      }
    } catch (error) {
      console.error('Error fetching student feedback:', error);
      
      // Return fallback data if API fails
      return this.getFallbackData(lang);
    }
  }

  /**
   * Clear cache - useful for testing or forcing refresh
   */
  clearCache(): void {
    this.cache = null;
    this.currentLang = 'en';
    this.cacheExpiry = 0;
  }

  /**
   * Fallback data when API is unavailable
   */
  private getFallbackData(lang: string = 'en'): StudentFeedbackData {
    return {
      title: "What Our Students Are Saying",
      subtitle: "The Best Trafikskola in Stockholm!",
      description: "Discover the top-rated driving school in Stockholm, renowned for its exceptional atmosphere, effective teaching methods, and multilingual trainers. Instructors are highly skilled and professional- Anik Akanda",
      feedbacks: [
        {
          name: 'Sarah K',
          title: 'Risk2 online Student',
          image: '/img/profile/1.png',
          rating: 5,
          content: 'I passed my driving test on the first try thanks to DriveWise! The instructors were so patient and knowledgeable.'
        },
        {
          name: 'John D',
          title: 'Student online Course',
          image: '/img/profile/2.png',
          rating: 5,
          content: 'Highly recommend DriveWise for anyone learning to drive. They make the process easy and stress-free!'
        },
        {
          name: 'Sarah Johnson',
          title: 'Student',
          image: '/img/profile/3.png',
          rating: 5,
          content: 'I passed my driving test on the first try thanks to DriveWise! The instructors were so patient and knowledgeable.'
        },
        {
          name: 'Michael T',
          title: 'Beginner Driver',
          image: '/img/profile/4.png',
          rating: 5,
          content: 'The online course materials were incredibly helpful and easy to understand.'
        },
        {
          name: 'Emma S',
          title: 'International Student',
          image: '/img/profile/5.png',
          rating: 5,
          content: 'As an international student, I appreciated the multilingual support from the instructors.'
        },
        {
          name: 'David L',
          title: 'Refresher Course',
          image: '/img/profile/6.png',
          rating: 5,
          content: 'Great refresher course after not driving for many years. Very professional instructors.'
        }
      ]
    };
  }
}

// Export singleton instance
export const studentFeedbackService = new StudentFeedbackService();
export default studentFeedbackService;
