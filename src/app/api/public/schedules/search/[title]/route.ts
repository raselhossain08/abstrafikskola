import { NextRequest, NextResponse } from 'next/server';

// Mock schedule data for development
const mockSchedules = {
  'Halkbana': [
    {
      _id: 'halkbana-1',
      scheduleId: 'HALK-2025-001',
      title: 'Halkbana',
      date: '2025-09-15',
      startTime: '09:00',
      endTime: '12:00',
      price: 599,
      maxStudents: 12,
      currentBookings: 4,
      availableSlots: 8,
      venue: 'Testbana Södertälje',
      instructor: 'Lars Andersson',
      isAvailable: true
    },
    {
      _id: 'halkbana-2',
      scheduleId: 'HALK-2025-002',
      title: 'Halkbana',
      date: '2025-09-22',
      startTime: '13:00',
      endTime: '16:00',
      price: 599,
      maxStudents: 12,
      currentBookings: 6,
      availableSlots: 6,
      venue: 'Testbana Södertälje',
      instructor: 'Maria Pettersson',
      isAvailable: true
    },
    {
      _id: 'halkbana-3',
      scheduleId: 'HALK-2025-003',
      title: 'Halkbana',
      date: '2025-09-28',
      startTime: '10:00',
      endTime: '13:00',
      price: 599,
      maxStudents: 12,
      currentBookings: 8,
      availableSlots: 4,
      venue: 'Testbana Södertälje',
      instructor: 'Erik Johansson',
      isAvailable: true
    }
  ],
  'Riskettan': [
    {
      _id: 'risk1-1',
      scheduleId: 'RISK1-2025-001',
      title: 'Riskettan',
      date: '2025-09-20',
      startTime: '08:30',
      endTime: '17:00',
      price: 1800,
      maxStudents: 15,
      currentBookings: 10,
      availableSlots: 5,
      venue: 'Körskola Södertälje',
      instructor: 'Anna Lindberg',
      isAvailable: true
    },
    {
      _id: 'risk1-2',
      scheduleId: 'RISK1-2025-002',
      title: 'Riskettan',
      date: '2025-09-27',
      startTime: '08:30',
      endTime: '17:00',
      price: 1800,
      maxStudents: 15,
      currentBookings: 12,
      availableSlots: 3,
      venue: 'Körskola Södertälje',
      instructor: 'Peter Svensson',
      isAvailable: true
    }
  ],
  'Handledarkurs': [
    {
      _id: 'handl-1',
      scheduleId: 'HANDL-2025-001',
      title: 'Handledarkurs',
      date: '2025-09-25',
      startTime: '18:00',
      endTime: '21:00',
      price: 450,
      maxStudents: 20,
      currentBookings: 15,
      availableSlots: 5,
      venue: 'Körskola Södertälje',
      instructor: 'Gunnar Eriksson',
      isAvailable: true
    }
  ]
};

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  try {
    const title = decodeURIComponent(params.title);
    
    // Get schedules for the requested title
    const schedules = mockSchedules[title as keyof typeof mockSchedules] || [];
    
    // Filter out past schedules and unavailable ones
    const currentDate = new Date();
    const availableSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= currentDate && schedule.isAvailable;
    });

    if (availableSchedules.length === 0) {
      return NextResponse.json({
        success: false,
        data: [],
        message: `No available schedules found for "${title}". All courses may be fully booked or dates may be in the past.`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: availableSchedules,
      message: `Found ${availableSchedules.length} available schedules for ${title}`
    });

  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json({
      success: false,
      data: [],
      message: 'Internal server error'
    }, { status: 500 });
  }
}
