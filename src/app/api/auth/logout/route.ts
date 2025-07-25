import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Remove auth cookies
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.delete('auth_token');
    response.cookies.delete('refresh_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
