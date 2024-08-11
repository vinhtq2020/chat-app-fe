"use server";
import { cookies } from "next/headers";
import { Cookie, StoreRequestCookies } from "./utils/http/headers";
import { getDeviceId, getIP } from "./utils/auth";
import { useAuthService } from "./core/context";

export async function storeCookies(req: StoreRequestCookies) {
  let k: keyof StoreRequestCookies;
  for (k in req) {
    const cookie = req[k];
    if (cookie) {
      await storeCookie(k, cookie);
    }
  }
}

export async function storeCookie(key: string, cookie: Cookie) {
  cookies().set(key, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    expires: new Date(cookie.expires ?? ""),
  });
}

export async function removeCookies() {
  cookies().delete("userId");
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
}

/**
 * Check authentication from acess token and refresh token.
 */
export const checkAuthentication = ():
  | "token_expired"
  | "authenticated"
  | "need_refresh" => {
  const accessToken = cookies().get("accessToken");
  const userId = cookies().get("userId");
  const refreshToken = cookies().get("refreshToken");

  if (refreshToken && accessToken == undefined) {
    return "need_refresh";
  }
  if (
    accessToken != undefined &&
    refreshToken != undefined &&
    userId != undefined
  ) {
    return "authenticated";
  }
  return "token_expired";
};

export const getNewAccessTokenAction = async (
  userAgent: string
): Promise<Cookie | undefined> => {
  const accessToken = cookies().get("accessToken");
  const refreshToken = cookies().get("refreshToken");
  // refresh access token
  if (refreshToken && accessToken == undefined) {
    const ip = await getIP();
    const deviceId = getDeviceId();
    return useAuthService()
      .refresh(deviceId, ip, userAgent)
      .then((accessTokenCookie) => accessTokenCookie)
      .catch((e) => {
        throw e;
      });
  }
  return undefined;
};

export const getUserId = async () => {
  const userIdCookie = cookies().get("userId");
  if (userIdCookie) {
    return userIdCookie.value;
  } else {
    return "";
  }
};
