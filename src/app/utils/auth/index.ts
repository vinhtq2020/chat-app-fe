import { cookies } from "next/headers"
import { uuidv4 } from "../random/random"
import { Resource } from "../resource/resourse"
import { useAuthService } from "../../core/context"



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
            const res = await useAuthService().getIP()
            ip = res.ip
            Resource.setIP(res.ip)
        } catch (e) {
            throw e
        }
    }
    return ip
}