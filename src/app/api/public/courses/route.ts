import { NextRequest, NextResponse } from 'next/server';

// Mock courses data for development
const mockCourses = [
  {
    _id: 'course-halkbana',
    courseId: 'HALK-001',
    title: 'Halkbana',
    price: 599,
    description: 'Learn safe driving on slippery surfaces',
    duration: '3 hours',
    language: 'sv',
    category: 'safety',
    maxStudents: 12,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: 'course-riskettan',
    courseId: 'RISK1-001',
    title: 'Riskettan',
    price: 1800,
    description: 'Risk 1 - Traffic safety course',
    duration: '8 hours',
    language: 'sv',
    category: 'mandatory',
    maxStudents: 15,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    _id: 'course-handledarkurs',
    courseId: 'HANDL-001',
    title: 'Handledarkurs',
    price: 450,
    description: 'Course for driving supervisors',
    duration: '3 hours',
    language: 'sv',
    category: 'supervisor',
    maxStudents: 20,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const language = searchParams.get('language') || '';
    const active = searchParams.get('active') || 'true';
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let filteredCourses = [...mockCourses];

    // Apply filters
    if (search) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredCourses = filteredCourses.filter(course =>
        course.category === category
      );
    }

    if (language) {
      filteredCourses = filteredCourses.filter(course =>
        course.language === language
      );
    }

    if (active === 'true') {
      filteredCourses = filteredCourses.filter(course => course.active);
    }

    // Apply sorting
    filteredCourses.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1;
      }
      return aValue < bValue ? -1 : 1;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    // Calculate pagination info
    const totalCourses = filteredCourses.length;
    const totalPages = Math.ceil(totalCourses / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: paginatedCourses,
      message: `Found ${totalCourses} courses`,
      pagination: {
        currentPage: page,
        totalPages,
        totalCourses,
        hasNextPage,
        hasPrevPage
      }
    });

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Internal server error'
    }, { status: 500 });
  }
}
