import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Remove all auth-related cookies
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully' 
    });

    // List of all possible auth cookies to clear
    const cookiesToClear = [
      'auth_token',
      'refresh_token',
      'token',
      'access_token',
      'jwt_token',
      'authorization_token',
      'session',
      'sessionId',
      'user',
      'userId',
      'userInfo',
      'authToken',
      'accessToken',
      'refreshToken',
      'bearer_token',
      'user_session',
      'login_token',
      'remember_token'
    ];

    // Clear each cookie
    for (const cookieName of cookiesToClear) {
      response.cookies.delete(cookieName);
      
      // Also set expired cookies for thorough cleanup
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        domain: undefined // Let browser decide
      });
    }

    console.log('🧹 All authentication cookies cleared on logout');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
