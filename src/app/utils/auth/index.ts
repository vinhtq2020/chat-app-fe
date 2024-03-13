import { cookies } from "next/headers"

export const checkAuthentication = () => {
    const accessToken = cookies().get("accessToken")
    const refreshToken = cookies().get("refreshToken")
    
    return accessToken != undefined && refreshToken != undefined
}