import { NextRequest, NextResponse, userAgent } from "next/server";
import { localeConfig } from "./app/utils/resource/locales";

interface AppPath {
  locale?: string;
  page?: string;
  subPage?: string;
}

const publicRoutes = ["/auth", ""];
const protectedRoutes = ["/home", "/chat", "/profile", ""];

function mapPath(request: NextRequest): Partial<AppPath> | undefined {
  const regex = new RegExp(
    "^\\/(?<locale>[a-z]{2})(\\/|((?<page>\\/[a-z0-9-_]+)(\\/|(?<subPage>\\/.+))?))?$",
    "g"
  );

  const res = regex.exec(request.nextUrl.pathname);
  if (res == null) {
    return undefined;
  }

  return res.groups;
}

function getBrowserLanguage(request: NextRequest) {
  return request.headers
    .get("accept-language")
    ?.split(",")
    .map((i) => i.split(";"))
    ?.reduce(
      (ac: { code: string; priority: string }[], lang) => [
        ...ac,
        {
          code: lang[0],
          priority: lang[1],
        },
      ],
      []
    )
    ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
    ?.find((i) => localeConfig.locales.includes(i.code.substring(0, 2)))
    ?.code?.substring(0, 2);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const appPath = mapPath(request);

  if (!appPath || !appPath.locale) {
    const locale = getBrowserLanguage(request) ?? localeConfig.defaultLocale;
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  let localePath = localeConfig.locales.find(
    (locale) => appPath?.locale === locale
  );

  const isProtectedRoute = protectedRoutes.includes(appPath.page ?? "");
  const isPublicRoutes = publicRoutes.includes(appPath.page ?? "");

  // check authentication
  const browser = userAgent(request).browser.name ?? "";
  let isLogin = false;
  try {
    // hard code
    // isLogin = await checkAuthentication(browser);
    isLogin = true;
  } catch (error) {
    isLogin = false;
  }

  if (isProtectedRoute) {
    // is Not Login
    if (!isLogin) {
      switch (pathname) {
        case `/${localePath}`:
          return NextResponse.rewrite(
            new URL(`/${localePath}/login`, request.url)
          );
        default:
          return NextResponse.redirect(new URL(`/${localePath}`, request.url));
      }
    } else {
      // is Login
      switch (pathname) {
        default:
          return NextResponse.next();
      }
    }
  }

  if (isPublicRoutes) {
    switch (pathname) {
      case `/${localePath}`:
        return NextResponse.rewrite(
          new URL(`/${localePath}/login`, request.url)
        );
      case `/${localePath}/auth`:
        return NextResponse.redirect(new URL(`/${localePath}`, request.url));
      default:
        return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },

    "/([a-z0-9]{2})/auth",
    "/([a-z0-9]{2})/",
    "/([a-z0-9]{2})/home",
    "/([a-z0-9]{2})/chat",
    "/([a-z0-9]{2})/profile",
  ],
};
