export interface AuthService {
    login(email: string, password: string): Promise<Token>
    register(user: User): Promise<number>
}

export interface Token {
    accessToken: string
    refreshToken: string
    tokenType: string
    expires: number

}

export interface User {
    id?: string
    username?: string
    password?: string
    confirmPassword?: string
    email?: string
    phone?: string
}