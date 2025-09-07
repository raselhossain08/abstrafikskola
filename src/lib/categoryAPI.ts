// Direct API for fetching schedules with category filtering
export interface CategoryCourseItem {
  _id: string;
  scheduleId: string;
  courseId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  category: string;
  description?: string;
  language?: string;
  venue?: string;
  teacherName?: string;
  availableSeats?: number;
  totalSeats?: number;
  bookedSeats?: number;
  isAvailable?: boolean;
  startTime?: string;
  endTime?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleAPIResponse {
  success: boolean;
  message: string;
  data: CategoryCourseItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalSchedules: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Supported categories for filtering
export const SUPPORTED_CATEGORIES = [
  "Handledarkurs",
  "Riskettan", 
  "Risk2 (Halkbana)",
  "Risk1 + Risk2"
] as const;

export type SupportedCategory = typeof SUPPORTED_CATEGORIES[number];

// Get API base URL from environment or use default
const getApiBaseUrl = (): string => {
  // Check for environment variables
  if (typeof window !== 'undefined') {
    // Client-side: use window location or environment
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  } else {
    // Server-side: use environment variable or default
    return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
};

// Helper function to check if a date is in the future
const isFutureDate = (dateString: string): boolean => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    let scheduleDate: Date;
    
    // Handle different date formats
    if (dateString.includes('-')) {
      // Format: "2025-09-28"
      scheduleDate = new Date(dateString);
    } else if (dateString.includes('/')) {
      // Format: "09/28/2025" or "Saturday, 09/28/2025"
      const cleanDate = dateString.split(',').pop()?.trim() || dateString;
      const [month, day, year] = cleanDate.split('/');
      scheduleDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      console.warn('Unknown date format:', dateString);
      return true; // Keep schedule if format is unknown
    }
    
    return scheduleDate >= today;
  } catch (error) {
    console.warn('Error parsing date:', dateString, error);
    return true; // Keep schedule if there's a parsing error
  }
};

/**
 * Fetch all schedules directly from the API and filter by category
 * @param category - The category to filter by
 * @returns Promise with filtered schedule data
 */
export const fetchCoursesByCategory = async (category: string): Promise<{
  data: CategoryCourseItem[];
  success: boolean;
  error?: string;
}> => {
  try {
    const baseUrl = getApiBaseUrl();
    const apiUrl = `${baseUrl}/public/schedules`;
    
    console.log(`🔍 Fetching all schedules from: ${apiUrl}`);
    console.log(`📋 Filtering by category: "${category}"`);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData: ScheduleAPIResponse = await response.json();
    
    console.log(`📄 API Response:`, apiData);

    if (!apiData.success) {
      return {
        data: [],
        success: false,
        error: apiData.message || 'Failed to fetch schedules'
      };
    }

    if (!apiData.data || apiData.data.length === 0) {
      console.log(`⚠️ No schedules found in API response`);
      return {
        data: [],
        success: true,
        error: `No schedules available at the moment`
      };
    }

    // Filter by category and future dates
    const filteredSchedules = apiData.data.filter((schedule) => {
      // Check category match (case insensitive)
      const categoryMatch = schedule.category && 
        schedule.category.toLowerCase().trim() === category.toLowerCase().trim();
      
      // Check if schedule is in the future
      const isFuture = isFutureDate(schedule.date);
      
      if (!categoryMatch) {
        console.log(`❌ Category mismatch: "${schedule.category}" !== "${category}"`);
      }
      
      if (!isFuture) {
        console.log(`⏰ Past schedule filtered out: ${schedule.title} on ${schedule.date}`);
      }
      
      return categoryMatch && isFuture;
    });

    console.log(`✅ Filtered ${filteredSchedules.length} schedules from ${apiData.data.length} total for category "${category}"`);

    // Transform data to ensure consistent format
    const transformedSchedules: CategoryCourseItem[] = filteredSchedules.map((schedule) => ({
      _id: schedule._id,
      scheduleId: schedule.scheduleId,
      courseId: schedule.courseId,
      date: schedule.date,
      time: schedule.time,
      title: schedule.title,
      seats: schedule.seats,
      price: schedule.price,
      category: schedule.category,
      description: schedule.description,
      language: schedule.language || 'Svenska',
      venue: schedule.venue || 'ABS Trafikskola Södertälje',
      teacherName: schedule.teacherName || 'Available Instructor',
      availableSeats: schedule.availableSeats,
      totalSeats: schedule.totalSeats,
      bookedSeats: schedule.bookedSeats,
      isAvailable: schedule.isAvailable !== false,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      status: schedule.status,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt
    }));
    
    return {
      data: transformedSchedules,
      success: true
    };

  } catch (error) {
    console.error(`❌ Error fetching schedules for category ${category}:`, error);
    return {
      data: [],
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Fetch all future schedules for all supported categories
 * @returns Promise with all future schedules grouped by category
 */
export const fetchAllCategoriesSchedules = async (): Promise<{
  data: Record<SupportedCategory, CategoryCourseItem[]>;
  success: boolean;
  error?: string;
}> => {
  try {
    const baseUrl = getApiBaseUrl();
    const apiUrl = `${baseUrl}/public/schedules`;
    
    console.log(`🔍 Fetching all schedules from: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const apiData: ScheduleAPIResponse = await response.json();

    if (!apiData.success) {
      return {
        data: {} as Record<SupportedCategory, CategoryCourseItem[]>,
        success: false,
        error: apiData.message || 'Failed to fetch schedules'
      };
    }

    if (!apiData.data || apiData.data.length === 0) {
      return {
        data: {} as Record<SupportedCategory, CategoryCourseItem[]>,
        success: true,
        error: `No schedules available at the moment`
      };
    }

    // Filter future schedules only
    const futureSchedules = apiData.data.filter(schedule => isFutureDate(schedule.date));

    // Group by category
    const groupedSchedules = SUPPORTED_CATEGORIES.reduce((acc, category) => {
      acc[category] = futureSchedules
        .filter(schedule => 
          schedule.category && 
          schedule.category.toLowerCase().trim() === category.toLowerCase().trim()
        )
        .map(schedule => ({
          _id: schedule._id,
          scheduleId: schedule.scheduleId,
          courseId: schedule.courseId,
          date: schedule.date,
          time: schedule.time,
          title: schedule.title,
          seats: schedule.seats,
          price: schedule.price,
          category: schedule.category,
          description: schedule.description,
          language: schedule.language || 'Svenska',
          venue: schedule.venue || 'ABS Trafikskola Södertälje',
          teacherName: schedule.teacherName || 'Available Instructor',
          availableSeats: schedule.availableSeats,
          totalSeats: schedule.totalSeats,
          bookedSeats: schedule.bookedSeats,
          isAvailable: schedule.isAvailable !== false,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          status: schedule.status,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt
        }));
      return acc;
    }, {} as Record<SupportedCategory, CategoryCourseItem[]>);

    console.log(`✅ Grouped schedules by categories:`, 
      Object.entries(groupedSchedules).map(([cat, scheds]) => `${cat}: ${scheds.length}`).join(', ')
    );

    return {
      data: groupedSchedules,
      success: true
    };

  } catch (error) {
    console.error(`❌ Error fetching all categories schedules:`, error);
    return {
      data: {} as Record<SupportedCategory, CategoryCourseItem[]>,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Category mapping for different pages
 */
export const CATEGORY_MAPPINGS = {
  '/riskettan': 'Riskettan',
  '/halkbana': 'Risk2 (Halkbana)',
  '/handledarkurs': 'Handledarkurs',
  '/r1-r2': 'Risk1 + Risk2',
  '/driving-lessons': 'Driving lessons', // Not in supported categories but kept for compatibility
} as const;

/**
 * Get category name from pathname
 * @param pathname - Current route pathname
 * @returns Category name or null
 */
export const getCategoryFromPath = (pathname: string): string | null => {
  return CATEGORY_MAPPINGS[pathname as keyof typeof CATEGORY_MAPPINGS] || null;
};