import { axiosInstant } from "@/app/utils/http/axios-instance"
import { AuthService } from "./user"
import { Axios } from "axios"
import { HttpRequest, httpRequest } from "@/app/utils/http/http-request"
import { register } from "module"
import { config } from "@/app/config"

export class AuthServiceImpl implements AuthService {
    private http: HttpRequest
    private url: string
    constructor(http: HttpRequest, url: string){
        this.http = http
        this.url = url

        this.register = this.register.bind(this)
    
    }
    register(username: string, password: string): Promise<number> {
        return this.http.post(`${this.url}/register`, {username, password})
    }


}

export function getAuthService(): AuthService {
    return new AuthServiceImpl(httpRequest, config.auth_url)
}