export interface AuthService{
    login(username: string, password: string): Promise<number>
}

export interface User {
    username?: string
    password?: string
}