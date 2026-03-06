import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/import',
  '/hands',
  '/settings',
  '/onboarding'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.has('sb-access-token') ||
    request.cookies.has('supabase-auth-token');

  if (!hasSession) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/import/:path*',
    '/hands/:path*',
    '/settings/:path*',
    '/onboarding/:path*'
  ]
};
