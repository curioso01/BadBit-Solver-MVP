import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/import', '/hands', '/settings', '/onboarding'];

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (!isProtected) return NextResponse.next();

  const hasSession = request.cookies.has('sb-access-token') || request.cookies.has('supabase-auth-token');
  if (!hasSession && pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
