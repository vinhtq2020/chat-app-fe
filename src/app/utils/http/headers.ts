import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export class Headers {
    static contentType = "Content-Type"
    static deviceId = "Device-Id"
    static userAgent = "User-Agent"
    static xForwardedFor = "X-Forwarded-For"
    static Cookie = "Cookie"
}
export interface Cookie {
    value: string
    secure?: boolean
    httpOnly?: boolean
    expires?: string
    [key: string]: any
}

export interface PassportKeys {
    [key: string]: string
}
export const PassportKeys: PassportKeys = {
    accessToken: 'accessToken',
    userId: 'userId'
}

export interface StoreRequestCookie {
    accessToken?: Cookie
    userId?: Cookie;
}
export const getSetCookieFromResponse = (response: Response) => {
    let tokenObject: StoreRequestCookie = {
      accessToken: undefined,
      userId: undefined,
    }
    response.headers.getSetCookie().forEach(item => {

        const props = item.split(";")
        if (props.length > 1) {
            const propsPart = props[0].split("=")

            if (Object.hasOwn(tokenObject, propsPart[0])) {

                const key = propsPart[0] as keyof StoreRequestCookie
                const cookieItem: Cookie = {
                    value: propsPart[1]
                }
                tokenObject[key] = cookieItem

                for (let index = 1; index < props.length; index++) {
                    const element = props[index];
                    const elementPart = element.split("=")
                    elementPart[0] = elementPart[0].trim()
                    const keyprops = elementPart[0].charAt(0).toLowerCase() + elementPart[0].slice(1)

                    if (elementPart.length > 1) {
                        cookieItem[keyprops] = elementPart[1]
                    } else if (elementPart.length == 1) {
                        cookieItem[keyprops] = true
                    }
                }
            }
        }

    })
    return tokenObject
}

export const getCookieHeader = () => {
    Object.keys(PassportKeys).forEach((item) => {
        const key = cookies().get(item)

    })

    let cookieHeader = ""
    cookies().getAll().filter(item => item.name == PassportKeys.accessToken || item.name == PassportKeys.userId).forEach(item => {
        cookieHeader += parseCookietoString(item)
    })
    return cookieHeader
}

const parseCookietoString = (cookie: RequestCookie) => {
    return cookie.name + "=" + cookie.value + ";"
}