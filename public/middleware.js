// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const skipToken = request.cookies.get('skipToken')?.value;

  // Skip API routes and static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Handle skip token verification
  if (skipToken) {
    try {
      jwt.verify(skipToken, process.env.JWT_SECRET);
      
      // If on sign-in page with valid token, redirect to home
      if (pathname.startsWith('/signin')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      return NextResponse.next();
    } catch (error) {
      // Invalid token - clear it
      const response = NextResponse.next();
      response.cookies.delete('skipToken');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/', // Add other protected paths as needed
  ],
};