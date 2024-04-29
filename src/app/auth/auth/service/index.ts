import { AuthService, Token, Account } from "../auth"
import { config } from "../../../config"
import { ResponseError } from "@/src/app/utils/exception/model/response"
import { Headers, getCookieHeader, getSetCookieFromResponse } from "@/src/app/utils/http/headers"
import { storeCookies } from "@/src/app/action"
import { METHOD } from "@/src/app/utils/http/method"

export class AuthServiceClient implements AuthService {
    private auth_url: string = config.auth_url
    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)
        this.getIP = this.getIP.bind(this)
        this.refresh = this.refresh.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    async getIP(): Promise<{ ip: string }> {
        try {
            // Make the request
            const res = await fetch('https://api.ipify.org?format=json')
            // Extract JSON body content from HTTP response

            const response = await res.json()

            if (!res.ok) {
                throw new ResponseError(response, res.status, response)
            }

            return response

        } catch (e: any) {

            throw new ResponseError(e.body.error.message, e.status, e.body)
        }

    }

    async login(email: string, password: string, userAgent: string, ip: string, deviceId: string): Promise<number> {
        try {
            const res = await fetch(`${this.auth_url}/login`, {
                method: METHOD.POST,
                headers: {
                    [Headers.contentType]: 'application/json',
                    [Headers.deviceId]: deviceId,
                    [Headers.userAgent]: userAgent,
                    [Headers.xForwardedFor]: ip,
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                cache: 'no-cache'
            })


            return this.handleResponse(res, () => {
                const setCookies = getSetCookieFromResponse(res)

                storeCookies({
                    accessToken: setCookies["accessToken"],
                    userId: setCookies["userId"],
                })
            })
        } catch (err: unknown) {
            throw err
        }

    }
    private async handleResponse<T>(res: Response, callback?: () => void): Promise<T> {
        const text = await res.text()
        if (!res.ok) {
            if (res.status == 422) {
                const response = JSON.parse(text)
                throw new ResponseError(res.statusText, res.status, response)
            }

            throw new ResponseError(res.statusText, res.status, null)
        }
        const response = JSON.parse(text) as T
        callback && callback()
        return response

    }
    async register(user: Account): Promise<number> {
        try {
            const res = await fetch(`${this.auth_url}/register`, {
                method: METHOD.POST,
                headers: {
                    [Headers.contentType]: 'application/json'
                },
                body: JSON.stringify(user),
            })

            return this.handleResponse<number>(res)
        } catch (err: unknown) {
            throw err
        }
    }
    async logout(deviceId: string, ip: string, userAgent: string): Promise<number> {
        try {
            const res = await fetch(`${this.auth_url}/logout`, {
                method: METHOD.GET,
                headers: {
                    [Headers.contentType]: 'application/json',
                    [Headers.deviceId]: deviceId,
                    [Headers.userAgent]: userAgent,
                    [Headers.xForwardedFor]: ip,
                    [Headers.Cookie]: getCookieHeader()
                },
                cache: "no-cache"
            })

            return this.handleResponse<number>(res)
        } catch (err: unknown) {
            throw err
        }

    }
    async refresh(deviceId: string, ip: string, userAgent: string): Promise<number> {
        try {
            const res = await fetch(`${this.auth_url}/register`, {
                method: METHOD.GET,
                headers: {
                    [Headers.contentType]: 'application/json',
                    [Headers.deviceId]: deviceId,
                    [Headers.userAgent]: userAgent,
                    [Headers.xForwardedFor]: ip,
                    [Headers.Cookie]: getCookieHeader(),
                },
               
                cache: 'no-cache'
            })

            return this.handleResponse<number>(res)
        } catch (err: unknown) {
            throw err
        }
    }

}

let authService = new AuthServiceClient()

export function getAuthService(): AuthService {
    if (authService == null) {
        authService = new AuthServiceClient()
    }
    return authService
}