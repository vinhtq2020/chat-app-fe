import { NextRequest, NextResponse, userAgent } from "next/server";
import { localeConfig } from "./app/utils/resource/locales";
import { Resource } from "./app/utils/resource/resourse";
import { checkAuthentication, getNewAccessTokenAction } from "./app/action";
import { Cookie, PassportKeys } from "./app/utils/http/headers";
import { sources } from "next/dist/compiled/webpack/webpack";

interface AppPath {
  locale?: string;
  page?: string;
  subPage?: string;
}

const publicRoutes = ["login", ""];
const protectedRoutes = ["/chat", "/profile", "/search", ""];

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

// function getBrowserLanguage(request: NextRequest) {
//   return request.headers
//     .get("accept-language")
//     ?.split(",")
//     .map((i) => i.split(";"))
//     ?.reduce(
//       (ac: { code: string; priority: string }[], lang) => [
//         ...ac,
//         {
//           code: lang[0],
//           priority: lang[1],
//         },
//       ],
//       []
//     )
//     ?.sort((a, b) => (a.priority > b.priority ? -1 : 1))
//     ?.find((i) => localeConfig.locales.includes(i.code.substring(0, 2)))
//     ?.code?.substring(0, 2);
// }

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("middleware");

  const appPath = mapPath(request);

  if (!appPath || !appPath.locale) {
    // const locale = getBrowserLanguage(request) ?? Resource.getLocale();
    const locale = Resource.getLocale();
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  let localePath = localeConfig.locales.find(
    (locale) => appPath?.locale === locale
  );

  const isProtectedRoute = protectedRoutes.includes(appPath.page ?? "");
  const isPublicRoutes = publicRoutes.includes(appPath.page ?? "");

  const userAgent = request.headers.get("user-agent") ?? "";
  let newAccessToken: Cookie | undefined = undefined;

  // check authentication
  let isAuthenticated = false;
  const tmp = checkAuthentication();

  switch (tmp) {
    case "token_expired":
      isAuthenticated = false;
      break;
    case "authenticated":
      isAuthenticated = true;
      break;
    case "need_refresh":
      isAuthenticated = await getNewAccessTokenAction(userAgent)
        .then((res) => {
          if (res) {
            newAccessToken = res;
            return true;
          }
          return false;
        })
        .catch((e) => {
          console.log(e);

          return false;
        });
      break;
  }

  console.log(
    tmp,
    "is ProtectedRoute",
    isProtectedRoute,
    "is Authenticated",
    isAuthenticated
  );

  if (isProtectedRoute) {
    // is Not Login
    if (!isAuthenticated) {
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
          // refresh token
          if (newAccessToken) {
            return storeCookieInMiddleware(
              NextResponse.next(),
              PassportKeys.accessToken,
              newAccessToken
            );
          }

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

function storeCookieInMiddleware(
  response: NextResponse,
  key: string,
  cookie: Cookie
): NextResponse {
  response.cookies.set(key, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    expires: new Date(cookie.expires ?? ""),
  });
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
        { type: "header", key: "next-action" },
      ],
    },
    // "/([a-z0-9]{2})/login",
    // "/([a-z0-9]{2})/",
    // "/([a-z0-9]{2})",
    // "/([a-z0-9]{2})/chat",
    // "/([a-z0-9]{2})/profile",
    // "/([a-z0-9]{2})/search",
  ],
};
