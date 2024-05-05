import { AuthService, Token, Account } from "../auth"
import { config } from "../../../config"
import { ResponseError } from "@/src/app/utils/exception/model/response"
import { Headers, getCookieHeader, getSetCookieFromResponse } from "@/src/app/utils/http/headers"
import { storeCookies } from "@/src/app/action"
import { METHOD } from "@/src/app/utils/http/method"
import { HttpService, httpInstance } from "@/src/app/utils/http/http-default"

export class AuthServiceClient implements AuthService {
    private httpInstance: HttpService
    private auth_url: string = config.auth_url
    constructor(httpInstance: HttpService) {
        this.httpInstance = httpInstance
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
            const res = await this.httpInstance.get('https://api.ipify.org?format=json')
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
            const res = await this.httpInstance.post(`${this.auth_url}/login`, {
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
    private async handleResponse<T>(res: Response, onSuccess?: () => void): Promise<T> {
        return res.json().then(
            (response) => {
                if (!res.ok) {
                    switch (res.status) {
                        case 422: throw new ResponseError(res.statusText, res.status, response)
                        default: throw new ResponseError(res.statusText, res.status, null)
                    }
                }
                response = response as T
                onSuccess && onSuccess()
                return response
            }
        ).catch((e:Error) => {
            throw new ResponseError(e.message, res.status, null)
        })



    }
    async register(user: Account): Promise<number> {
        try {
            const res = await this.httpInstance.post(`${this.auth_url}/register`, {
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
            const res = await this.httpInstance.get(`${this.auth_url}/logout`, {
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
            const res = await this.httpInstance.get(`${this.auth_url}/register`, {
                headers: {
                    [Headers.contentType]: 'application/json',
                    [Headers.deviceId]: deviceId,
                    [Headers.userAgent]: userAgent,
                    [Headers.xForwardedFor]: ip,
                    [Headers.Cookie]: getCookieHeader(),
                },

                cache: 'no-cache'
            })

            return this.handleResponse<number>(res, () => {
                const setCookies = getSetCookieFromResponse(res)
                storeCookies({
                    accessToken: setCookies["accessToken"],
                })
            })
        } catch (err: unknown) {
            throw err
        }
    }

}

let authService = new AuthServiceClient(httpInstance)

export function getAuthService(): AuthService {
    if (authService == null) {
        authService = new AuthServiceClient(httpInstance)
    }
    return authService
}