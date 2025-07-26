import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const updateData = await request.json();

    // Update user with backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'}/api/auth/update`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        user: data.user,
        message: 'User updated successfully',
      });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Update failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
