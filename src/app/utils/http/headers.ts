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

export class Cookies {
    static accessToken = "accessToken"
    static userId = "userId"
}
export interface StoreRequestCookie {
    accessToken?: Cookie
    userId?: Cookie;
}
export const getSetCookieFromResponse = (response: Response) => {
    let tokenObject: StoreRequestCookie = {
        accessToken: undefined,
        userId: undefined
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
                console.log(tokenObject[key]);

            }
        }

    })
    return tokenObject
}

export const getCookieHeader = () => {
    return cookies().getAll().filter(item => item.name == Cookies.accessToken || item.name == Cookies.userId).toString()
}