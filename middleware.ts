// middleware.ts
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname, origin } = request.nextUrl;

  // Page Routes (existing logic)
  if (
    (pathname.startsWith("/chat") || pathname.startsWith("/connection")) &&
    !session?.user
  ) {
    return NextResponse.redirect(`${origin}/login`);
  }

  if (session?.user && pathname === "/login") {
    return NextResponse.redirect(`${origin}/chat`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
