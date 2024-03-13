import { AuthService, Token, User } from "../auth"
import { config } from "../../../config"
import { ResponseError } from "@/src/app/utils/exception/model/response"

export class AuthServiceImpl implements AuthService {
    private auth_url: string = config.auth_url
    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    async login(email: string, password: string): Promise<Token> {
        try {
            const res = await fetch(`${this.auth_url}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                cache:'no-cache'
            })

            const response = await res.json()
            
            if (!res.ok) {
                throw new ResponseError(response, res.status, response)
            }
            
            return response as Token
          
        } catch (err: unknown) {
            throw err
        }

    }

    async register(user: User): Promise<number> {
        try {
            const res = await fetch(`${this.auth_url}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })

            const body = await res.json()
            if (!res.ok) {
                throw new ResponseError( body, res.status, body)
            }

            return await body as number
        } catch (err: unknown) {
            throw err
        }
    }



}

export function getAuthService(): AuthService {
    return new AuthServiceImpl()
}