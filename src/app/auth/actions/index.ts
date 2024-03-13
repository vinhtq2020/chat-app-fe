"use server"

import { getAuthService } from "../auth/service"
import { InputValidate, useSchemaItem } from "../../utils/validate/validate"
import { AuthService, User } from "../auth/auth"
import { cookies } from "next/headers"
import { ValidateErrors } from "../../utils/validate/model"
import { Error422Message, ResponseError } from "../../utils/exception/model/response"

type RegisterActionResult = number | ValidateErrors

export async function register(data: FormData): Promise<RegisterActionResult> {
    const user: User = {
        email: data.get("email") as string,
        username: data.get("username") as string,
        password: data.get("password") as string,
        confirmPassword: data.get("confirmPassword") as string,
        phone: data.get("phone") as string,
    }

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

export async function login(data: FormData): Promise<ValidateErrors | number> {
    const email = data.get("email") as string
    const password = data.get("password") as string

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
        const res = await getAuthService().login(email, password)
        if (res != null) {
            cookies().set("refreshToken", res.refreshToken, { httpOnly: true, secure: true, sameSite: true })
            cookies().set("accessToken", res.accessToken, { httpOnly: true, secure: true, sameSite: true })
        }

        return 1
    } catch (e) {
        throw e
    }



}
export async function logout(): Promise<number> {
    throw new Error("Method not implemented.")
}
