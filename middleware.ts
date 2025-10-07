import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  // Routes that require authentication
  const protectedPaths = ["/chat"];
  // Routes that should be inaccessible if logged in
  const authPages = ["/login"];

  const pathname = req.nextUrl.pathname;

  // Protect routes
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const loginUrl = new URL("/", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from login/register pages
  if (authPages.some((path) => pathname.startsWith(path))) {
    if (token) {
      const chatUrl = new URL("/chat", req.url);
      return NextResponse.redirect(chatUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/chat/:path*", "/login"], // protect /chat and handle /login
};
