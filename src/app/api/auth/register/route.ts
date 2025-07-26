import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Mock registration - Replace with actual backend call
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Create the response
      const nextResponse = NextResponse.json({
        user: data.user,
        token: data.token,
        message: 'Registration successful',
      });

      // Set auth cookie
      nextResponse.cookies.set('auth_token', data.token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });

      if (data.refreshToken) {
        nextResponse.cookies.set('refresh_token', data.refreshToken, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }

      return nextResponse;
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Registration failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
