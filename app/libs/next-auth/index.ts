import { AuthOptions, User } from "next-auth"
import NextAuth from "next-auth/next"
import { googleProvider } from "./providers/google"
import { JWT } from "next-auth/jwt"

export const authOptions: AuthOptions = {
    providers: [googleProvider],
    callbacks: {
        async jwt({token, account, profile}) {
            
            return token;
        }
    },
}