// Utility functions for category-based course and schedule fetching
export interface CategoryCourseItem {
  _id?: string;
  scheduleId?: string;
  courseId?: string;
  date: string;
  time: string;
  title: string;
  seats: string;
  price: string;
  category?: string;
  description?: string;
  language?: string;
  venue?: string;
  teacherName?: string;
  availableSeats?: number;
  totalSeats?: number;
  bookedSeats?: number;
  isAvailable?: boolean;
}

export interface CategoryAPIResponse {
  success: boolean;
  message: string;
  data: any[];
  category: string;
  totalCourses?: number;
  totalSchedules?: number;
  note?: string;
}

/**
 * Fetch courses and schedules by category
 * @param category - The category name (e.g., "Riskettan", "Risk2 (Halkbana)", etc.)
 * @returns Promise with transformed course data
 */
export const fetchCoursesByCategory = async (category: string): Promise<{
  data: CategoryCourseItem[];
  success: boolean;
  error?: string;
}> => {
  try {
    console.log(`🔍 Fetching courses for category: ${category}`);
    
    const response = await fetch(`/api/public/category/${encodeURIComponent(category)}`);
    const apiData: CategoryAPIResponse = await response.json();
    
    console.log(`📄 API Response for ${category}:`, apiData);

    if (!apiData.success) {
      return {
        data: [],
        success: false,
        error: apiData.message || 'Failed to fetch courses'
      };
    }

    if (!apiData.data || apiData.data.length === 0) {
      console.log(`⚠️ No courses found for category: ${category}`);
      return {
        data: [],
        success: true,
        error: `No courses available for ${category} at the moment`
      };
    }

    // Transform API data to match component format
    const transformedData: CategoryCourseItem[] = apiData.data.map((item: any) => {
      // Format date with day name
      let formattedDate = item.date;
      if (item.date && item.date !== 'Invalid Date') {
        try {
          const scheduleDate = new Date(item.date);
          if (!isNaN(scheduleDate.getTime())) {
            formattedDate = scheduleDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
          }
        } catch (e) {
          console.warn('Date formatting error:', e);
          formattedDate = item.date || 'Date TBD';
        }
      }

      // Use the time field if available, otherwise construct from start/end time
      const timeRange = item.time || 
        `${item.startTime || '09:00'} - ${item.endTime || '12:00'}`;

      // Handle seats information
      let seatsText = item.seats;
      if (!seatsText) {
        if (item.availableSeats !== undefined) {
          seatsText = item.availableSeats > 0 
            ? `${item.availableSeats} places left`
            : 'Fully booked';
        } else if (item.totalSeats && item.bookedSeats !== undefined) {
          const available = item.totalSeats - item.bookedSeats;
          seatsText = available > 0 
            ? `${available} places left`
            : 'Fully booked';
        } else {
          seatsText = 'Available';
        }
      }

      // Handle price formatting
      let priceText = item.price;
      if (typeof item.price === 'number') {
        priceText = `${item.price} kr`;
      } else if (item.price && !item.price.includes('kr')) {
        priceText = `${item.price} kr`;
      } else if (!item.price) {
        priceText = 'Price on request';
      }

      return {
        _id: item._id || item.scheduleId,
        scheduleId: item.scheduleId,
        courseId: item.courseId,
        date: formattedDate,
        time: timeRange,
        title: item.title || `${category} Course`,
        seats: seatsText,
        price: priceText,
        category: item.category || category,
        description: item.description,
        language: item.language,
        venue: item.venue,
        teacherName: item.teacherName,
        availableSeats: item.availableSeats,
        totalSeats: item.totalSeats,
        bookedSeats: item.bookedSeats,
        isAvailable: item.isAvailable !== false,
      };
    });

    console.log(`✅ Successfully transformed ${transformedData.length} courses for ${category}`);
    
    return {
      data: transformedData,
      success: true
    };

  } catch (error) {
    console.error(`❌ Error fetching courses for category ${category}:`, error);
    return {
      data: [],
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
  '/driving-lessons': 'Driving lessons',
} as const;

/**
 * Get category name from pathname
 * @param pathname - Current route pathname
 * @returns Category name or null
 */
export const getCategoryFromPath = (pathname: string): string | null => {
  return CATEGORY_MAPPINGS[pathname as keyof typeof CATEGORY_MAPPINGS] || null;
};

/**
 * Hook for using category-based course fetching
 * @param category - Category name
 * @returns Object with data, loading, error states
 */
export const useCategoryApi = (category: string) => {
  const [data, setData] = React.useState<CategoryCourseItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    if (!category) return;
    
    setLoading(true);
    setError(null);
    
    const result = await fetchCoursesByCategory(category);
    
    if (result.success) {
      setData(result.data);
    } else {
      setError(result.error || 'Failed to load courses');
      setData([]);
    }
    
    setLoading(false);
  }, [category]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Import React for the hook
import React from 'react';
