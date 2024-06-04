import {  getDictionary } from "./locales"
import { Session } from "./session/session"

export class Resource {
    private static session: Session = {
        
    }

    static getSession(): Session {
        return this.session
    }

    static setSession(ip: string, deviceId: string, userAgent: string, userId: string): void {
        this.session = {
            ip,
            deviceId,
            userAgent,
            userId
        }
    }

    static setIP(ip: string): void {
        this.session.ip = ip
    }

    static getIP(): string | undefined {
        return this.session.ip
    }

    static getDeviceId(): string | undefined {
        return this.session.deviceId
    }

    static setDeviceId(deviceId: string): void {
        this.session.deviceId = deviceId
    }

    static getUserAgent(): string | undefined {
        return this.session.userAgent
    }

    static setUserAgent(userAgent: string): void {
        this.session.userAgent = userAgent
    }

    static getUserId(): string | undefined{
        return this.session.userId
    }

    static setUserId(userId: string): void {
        this.session.userId = userId
    }
}