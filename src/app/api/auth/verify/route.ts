import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: 'No auth token found' },
        { status: 401 }
      );
    }

    // Verify token with backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/auth/verify`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        user: data.user,
        valid: true,
      });
    } else {
      // Token is invalid, remove cookies
      const nextResponse = NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );

      nextResponse.cookies.delete('auth_token');
      nextResponse.cookies.delete('refresh_token');

      return nextResponse;
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
