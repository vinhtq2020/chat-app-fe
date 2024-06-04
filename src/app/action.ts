"use server"
import { cookies } from "next/headers";
import { StoreRequestCookie } from "./utils/http/headers";

export async function storeCookies(req: StoreRequestCookie) {
    let k: keyof StoreRequestCookie
    for (k in req) {
        const cookie = req[k]
        if (cookie) {
            cookies().set(k, cookie.value, { httpOnly: cookie.httpOnly, secure: cookie.secure, expires: new Date(cookie.expires ?? "") })
        }
    }
}

export async function removeCookies() {
    cookies().delete("userId")
    cookies().delete("accessToken")
    cookies().delete("refreshToken")
}