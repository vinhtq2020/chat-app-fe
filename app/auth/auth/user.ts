export interface AuthService{
    register(username: string, password: string): Promise<number>
}

export interface User {
    username?: string
    password?: string
}