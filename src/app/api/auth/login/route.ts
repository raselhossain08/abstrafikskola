import { NextRequest, NextResponse } from 'next/server';
import { ServerCookies } from '@/lib/cookies';

// This is a mock implementation. Replace with your actual backend API calls
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock authentication - Replace with actual backend call
    const response = await fetch(
      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Create the response
      const nextResponse = NextResponse.json({
        user: data.user,
        token: data.token,
        message: 'Login successful',
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
        { message: errorData.message || 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
