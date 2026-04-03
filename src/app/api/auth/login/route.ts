import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Mock user database (in real app: DB lookup)
const MOCK_USERS = [
  { id: 'usr_1', email: 'admin@example.com', password: 'password123', name: 'Admin User' },
  { id: 'usr_2', email: 'editor@example.com', password: 'password123', name: 'Editor User' },
];

// Request validation schema
const LoginRequestBodySchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginRequestBody = z.infer<typeof LoginRequestBodySchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = LoginRequestBodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data as LoginRequestBody;

    // Simple mock auth check
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate minimal mock session token (JWT-like, not signed)
    const mockToken = `mock_${Date.now()}_${user.id}`;

    // Set secure, httpOnly cookie in production (dev: sameSite=lax for testing)
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: mockToken,
      },
      { status: 200 }
    );

    // Set auth cookie (for SSR auth guard compatibility)
    response.cookies.set({
      name: 'auth_token',
      value: mockToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[AUTH_LOGIN_ROUTE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}