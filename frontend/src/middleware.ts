import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/client"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const needsAuth = protectedRoutes.some((route) => path.startsWith(route));

  if (!needsAuth) {
    return NextResponse.next();
  }

  const token = req.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
