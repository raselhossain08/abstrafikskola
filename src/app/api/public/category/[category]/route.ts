import { NextRequest, NextResponse } from 'next/server';

// Define the backend API URL
const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

// Sample fallback data for different categories
const getSampleData = (category: string) => {
  const baseDate = new Date();
  const sampleSchedules = [];
  
  // Generate 3 sample schedules for the category
  for (let i = 0; i < 3; i++) {
    const scheduleDate = new Date(baseDate.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000);
    const times = [
      { start: '09:00', end: '12:00' },
      { start: '14:00', end: '17:00' },
      { start: '18:00', end: '21:00' }
    ];
    const timeSlot = times[i % 3];
    
    sampleSchedules.push({
      _id: `sample-${category.toLowerCase()}-${i + 1}`,
      scheduleId: `S${String(i + 1).padStart(6, '0')}`,
      courseId: `course-${category.toLowerCase()}-${i + 1}`,
      title: `${category} Course ${i + 1}`,
      category: category,
      price: category === 'Riskettan' ? '1200' : 
             category === 'Risk2 (Halkbana)' ? '800' : 
             category === 'Handledarkurs' ? '2500' : 
             category === 'Risk1 + Risk2' ? '1800' : '1500',
      description: `Professional ${category} training course`,
      language: 'Svenska',
      maxStudents: 15,
      
      date: scheduleDate.toLocaleDateString('sv-SE'),
      time: `${timeSlot.start} - ${timeSlot.end}`,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      venue: 'ABS Trafikskola Södertälje',
      teacherName: 'Certified Instructor',
      
      totalSeats: 15,
      bookedSeats: Math.floor(Math.random() * 8),
      availableSeats: 15 - Math.floor(Math.random() * 8),
      seats: `${15 - Math.floor(Math.random() * 8)} places left`,
      
      status: true,
      isAvailable: true,
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return {
    success: true,
    message: `Sample data for ${category} category`,
    data: sampleSchedules,
    category: category,
    totalCourses: 1,
    totalSchedules: sampleSchedules.length,
    note: 'This is sample data - backend server may not be running'
  };
};

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { category } = params;
    
    console.log(`🔍 Frontend API: Fetching courses for category: ${category}`);
    
    // Make request to backend API
    const backendUrl = `${BACKEND_API_URL}/public/category/${encodeURIComponent(category)}`;
    console.log(`📡 Calling backend URL: ${backendUrl}`);
    
    try {
      const response = await fetch(backendUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        console.error(`❌ Backend API error: ${response.status} ${response.statusText}`);
        throw new Error(`Backend API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Backend response for ${category}:`, data);

      // Return the backend response if successful
      return NextResponse.json(data);

    } catch (fetchError) {
      console.warn(`⚠️ Backend not available, returning sample data for ${category}:`, fetchError);
      
      // Return sample data when backend is not available
      const sampleData = getSampleData(category);
      return NextResponse.json(sampleData);
    }

  } catch (error) {
    console.error(`❌ API route error for category ${params.category}:`, error);
    
    // Return sample data as fallback
    const sampleData = getSampleData(params.category);
    return NextResponse.json(sampleData);
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
