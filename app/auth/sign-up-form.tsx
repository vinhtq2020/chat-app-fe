import { useState } from "react"
import { getAuthService } from "./auth"
import { GoogleLoginBtn } from "../components/google-loginbtn"

export interface Props {

}

interface InternalState {
    username: string
    password: string
}

const initialState: InternalState = {
    username: "",
    password: ""
}

export const SignUpForm = (props: Props) => {
    const [state, setState] = useState<InternalState>(initialState)
    const service = getAuthService()
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, username: e.target.value }))
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, password: e.target.value }))
    }

    const onClickLogin = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            const res = await service.register(state.username, state.password)
            console.log("ok");

        } catch (e) {
            console.log(e);

        }
    }

    return (
        <div className="flex flex-col">
            <div className="rounded-xl bg-white px-4 pb-4">
                <h1 className="text-center text-blue-500 text-3xl font-semibold">
                    Sign Up
                </h1>
                <div className="flex flex-row gap-7 pt-4">
                    <input className="border px-4 rounded-md w-full h-8 text-base" type="text" placeholder="Email" name="email" id="email" value={state.username} onChange={(e) => onUsernameChange(e)} />
                </div>
                <div className="flex flex-row gap-7 pt-4">
                    <input className="border px-4 rounded-md w-full h-8 text-base" type="text" placeholder="Username" name="username" id="username" value={state.username} onChange={(e) => onUsernameChange(e)} />
                </div>
                <div className="flex flex-row gap-7 pt-4">
                    <input className="border rounded-md px-4 w-full h-8 text-base" type="text" placeholder="Password" name="password" id="password" value={state.password} onChange={(e) => onPasswordChange(e)} />
                </div>
                <div className="flex flex-row gap-7 pt-4">
                    <input className="border rounded-md px-4 w-full h-8 text-base" type="text" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" value={state.password} onChange={(e) => onPasswordChange(e)} />
                </div>
                <div className="flex flex-row gap-7 pt-4">
                    <input className="border px-4 rounded-md w-full h-8 text-base" type="text" placeholder="Phone number" name="phoneNumber" id="email" value={state.username} onChange={(e) => onUsernameChange(e)} />
                </div>
                <div className="flex flex-col pt-4">
                    <button className=" mx-auto bg-blue-500 text-white font-bold py-2 px-8 hover:bg-blue-700 rounded-full" type="button" onClick={onClickLogin} >Register</button>
                </div>
            </div>


        </div>
    )
}