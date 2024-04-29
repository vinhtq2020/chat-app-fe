"use server"

import { getAuthService } from "../auth/service"
import { InputValidate, useSchemaItem } from "../../utils/validate/validate"
import { Account } from "../auth/auth"
import { ValidateErrors } from "../../utils/validate/model"
import { Error422Message, ResponseError } from "../../utils/exception/model/response"
import { cookies } from "next/headers"
import { getDeviceId } from "../../utils/auth"
import { removeCookies, storeCookies } from "../../action"

type RegisterActionResult = number | ValidateErrors

export async function register(user: Account): Promise<RegisterActionResult> {
    const errs = InputValidate.object({
        email: useSchemaItem("email").isRequired().email("email is not valid"),
        username: useSchemaItem("username").isRequired().hasMaxLength(12).hasMinLength(3),
        password: useSchemaItem("password").isRequired().hasMaxLength(12).hasMinLength(3),
        confirmPassword: useSchemaItem("confirm password").isRequired().match("password", "password is not match"),
        phone: useSchemaItem("phone").isRequired().phone("phone is not valid")
    }).validate(user)


    if (JSON.stringify(errs) !== "{}") {
        return errs
    }

    try {
        const res = await getAuthService().register(user)
        return res
    } catch (e: any) {
        if (e instanceof ResponseError) {
            switch (e.status) {
                case 422:
                    const fieldErrs: ValidateErrors = {}
                    e.body.forEach((item: Error422Message) => {
                        fieldErrs[item.field] = item.message
                    });
                    return fieldErrs
                default:
                    throw e
            }
        } else {
            throw e
        }
    }

}

export async function login(email: string, password: string, userAgent: string): Promise<ValidateErrors | number> {

    const errs = InputValidate.object({
        email: useSchemaItem("email").isRequired().email("email is not valid"),
        password: useSchemaItem("password").isRequired(),
    }).validate({
        email: email,
        password: password
    })

    if (JSON.stringify(errs) != "{}") {
        return errs
    }

    try {
        const ip = (await getAuthService().getIP()).ip
        const deviceId = getDeviceId()
        const res = await getAuthService().login(email, password, userAgent, ip, deviceId)
        return 1
    } catch (e) {

        throw e
    }



}
export async function logout(userAgent: string): Promise<number> {
    try {
        const deviceId = getDeviceId()
        const ip = (await getAuthService().getIP()).ip

        if (deviceId.length == 0 || ip.length == 0 || userAgent.length == 0 || ip.length == 0) {
            return -1
        }

        const res = await getAuthService().logout(deviceId, ip, userAgent)
        if (res > 0) {
            await removeCookies()
        }
        return res
    } catch (e) {
        throw e
    }
}
