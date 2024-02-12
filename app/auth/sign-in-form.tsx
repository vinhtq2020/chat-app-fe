'use client';

import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { getAuthService } from "./auth";
import { GoogleLoginBtn } from "../components/google-loginbtn";

export interface Props {
}

interface InternalState {
    username: string;
    password: string;
}

const initialState: InternalState = {
    username: "",
    password: "",
}

export const SignInForm = (props: Props) => {
    const [state, setState] = useState<InternalState>(initialState)
    const service = getAuthService()
    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({...prev,  username: e.target.value}))
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({...prev, password: e.target.value}))
    }

    const onClickLogin = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            const res = await service.login(state.username, state.password)
            console.log("ok");
            
        } catch(e) {
            console.log(e);
            
        }
    }

    return (
        <div>
            <div>
                <input type="text" name="username" id="" value={state.username} onChange={(e) => onUsernameChange(e)} />
            </div>
            <div>
                <input type="text" name="password" id="" value={state.password} onChange={(e) => onPasswordChange(e)}/>
            </div>
            <input type="button" value="Login" onClick={onClickLogin}/>
            <GoogleLoginBtn/>
        </div>
    )
}