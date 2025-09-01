import { NextRequest, NextResponse } from 'next/server';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  personNumber: string;
  courseTitle: string;
  coursePrice?: number;
  scheduleId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'mobile', 'personNumber', 'courseTitle'];
    const missingFields = requiredFields.filter(field => !bookingData[field as keyof BookingData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 });
    }

    // Validate phone number (Swedish format)
    const phoneRegex = /^(\+46|0)[1-9][0-9]{8,9}$/;
    if (!phoneRegex.test(bookingData.mobile.replace(/\s+/g, ''))) {
      return NextResponse.json({
        success: false,
        message: 'Invalid mobile number format'
      }, { status: 400 });
    }

    // Generate a booking ID
    const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Simulate booking creation
    const booking = {
      bookingId,
      courseTitle: bookingData.courseTitle,
      customerName: `${bookingData.firstName} ${bookingData.lastName}`,
      email: bookingData.email,
      mobile: bookingData.mobile,
      personNumber: bookingData.personNumber,
      scheduleId: bookingData.scheduleId,
      price: bookingData.coursePrice,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Log the booking (in a real app, this would save to database)
    console.log('New booking created:', booking);

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.bookingId,
        courseTitle: booking.courseTitle,
        customerName: booking.customerName,
        email: booking.email,
        status: booking.status
      },
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create booking'
    }, { status: 500 });
  }
}
