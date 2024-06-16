import { NextRequest, NextResponse } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, {
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  });

  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();
  
  
  if (session && user && req.nextUrl.pathname === "/") {
    const redirectUrl = new URL("/home", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  
  if ((!session || !user) && req.nextUrl.pathname.startsWith("/home")) {
    const redirectUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/', '/home/:path*', '/login'],
};
