import { NextRequest, NextResponse, userAgent } from "next/server";
import { checkAuthentication } from "./app/utils/auth";

const publicRoutes = ["/auth", "/"];
const protectedRoutes = ["/home", "/chat", "/profile"];
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);

  // check authentication
  const browser = userAgent(request).browser.name ?? "";
  let isLogin = false
  try {
    // isLogin = await checkAuthentication(browser);
    isLogin = true
  } catch (error) {
    isLogin = false;
  }

  if (isProtectedRoute) {
    // is Not Login
    if (!isLogin) {
      switch (path) {
        case "/":
          return NextResponse.rewrite(new URL("/auth", request.url));
        case "/auth":
          return NextResponse.redirect(new URL("/", request.url));
        case "/home":
          console.log("sadsad");
          return NextResponse.redirect(new URL("/", request.url));
        default:
          return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      // is Login
      switch (path) {
        case "/":
          return NextResponse.rewrite(new URL("/home", request.url));
        case "/auth":
          return NextResponse.redirect(new URL("/", request.url));
        default:
          return NextResponse.next();
      }
    }
  }

  if (isPublicRoutes) {
    switch (path) {
      case "/":
        return NextResponse.rewrite(new URL("/auth", request.url));
      case "/auth":
        return NextResponse.redirect(new URL("/", request.url));
      default:
        return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/", "/home", "/chat", "/profile"],
};
