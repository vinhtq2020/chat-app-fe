import { cookies } from "next/headers"
import { uuidv4 } from "../random/random"
import { getAuthService } from "../../features/auth/service"
import { Resource } from "../resource/resourse"

/**
 * Check authentication from acess token and refresh token.
 */
export const checkAuthentication = async (userAgent: string): Promise<boolean> => {
    const accessToken = cookies().get("accessToken")
    const userId = cookies().get("userId")
    const refreshToken = cookies().get("refreshToken")

    // refresh access token
    if (refreshToken && accessToken == undefined) {
        try {
            const ip = await getIP()
            const deviceId = getDeviceId()
            const res = await getAuthService().refresh(deviceId, ip, userAgent)
            return res > 0
        } catch (e) {
            throw e
        }
    }
    return accessToken != undefined && refreshToken != undefined && userId != undefined
}

/**
 * Get Device ID for device. If It hasn't already existed, created new one.
 */
export const getDeviceId = (): string => {
    let deviceId = Resource.getDeviceId()
    if (!deviceId) {
        deviceId = cookies().get("deviceId")?.value
        if (!deviceId) {
            const deviceId = uuidv4()
            cookies().set("deviceId", deviceId, { httpOnly: true, sameSite: 'strict', secure: true })
            Resource.setDeviceId(deviceId)
        }
    }
    return deviceId as string
}
/**
 * Get IP.
 */

export const getIP = async (): Promise<string> => {
    let ip = Resource.getIP()
    if (ip == undefined) {
        try {
            const res = await getAuthService().getIP()
            ip = res.ip
            Resource.setIP(res.ip)
        } catch (e) {
            throw e
        }
    }
    return ip
}
