import { cookies } from "next/headers"
import { uuidv4 } from "../random/random"

/**
 * Check authentication from acess token and refresh token
 */
export const checkAuthentication = (): boolean => {
    const accessToken = cookies().get("accessToken")
    const userId = cookies().get("userId")

    return accessToken != undefined && userId != undefined
}

/**
 * Get Device ID for device. If It hasn't already existed, created new one.
 */
export const getDeviceId = (): string => {
    let deviceId = cookies().get("deviceId")?.value
    if (!deviceId) {
        const newDeviceId = uuidv4()
        cookies().set("deviceId",  newDeviceId, {httpOnly: true, sameSite: 'strict', secure: true})
        return newDeviceId

    }
    return deviceId
}