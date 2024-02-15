'use client';

import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { getAuthService } from "./auth";
import { GoogleLoginBtn } from "../components/google-loginbtn";
import { Modal } from "../components/modal/modal";
import { SignUpForm } from "./sign-up-form";

export interface Props {
}

interface InternalState {
    username: string;
    password: string;
    signUpHidden: boolean;
}

const initialState: InternalState = {
    username: "",
    password: "",
    signUpHidden : true
}

export const SignInForm = (props: Props) => {
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

    const onCloseSignUpModal = () => {
        console.log("close");
        
        setState({...state, signUpHidden: true})
    }

    const onShowSignUpModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setState({...state, signUpHidden: false})
    }

    return (
        <>
            <div className="pt-12">
                <div className="rounded-xl max-w-md mx-auto bg-white p-4 shadow-lg">
                    <h1 className="text-center text-blue-500 text-4xl font-semibold pt-4">
                        Sign In
                    </h1>
                    <div className="flex flex-row gap-7 pt-4">
                        <input className="border px-4 rounded-md w-full h-8 text-base" type="text" placeholder="Username" name="username" id="" value={state.username} onChange={(e) => onUsernameChange(e)} />
                    </div>
                    <div className="flex flex-row gap-7 pt-4">
                        <input className="border rounded-md px-4 w-full h-8 text-base" type="text" placeholder="Password" name="password" id="" value={state.password} onChange={(e) => onPasswordChange(e)} />
                    </div>
                    <div className="flex flex-col pt-4">
                        <button className=" mx-auto bg-blue-500 text-white font-bold py-2 px-8 hover:bg-blue-700 rounded-full" type="button" onClick={onClickLogin} >Login</button>
                        <h4 className="pt-4 text-sm text-gray-500 text-center">Don't have an account? <span className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={(e) => onShowSignUpModal(e)}>Sign up</span></h4>
                    </div>
                    <div className="flex flex-row pt-6 mx-auto items-center w-1/2">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-base text-gray-500 font-semibold" >Or</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>

                    <div className="py-4 flex flex-col">
                        <div className="text-gray-500 text-center text-sm pb-4">Sign in with</div>
                        <div className="flex flex-row gap-4 mx-auto">
                            <GoogleLoginBtn />
                            <GoogleLoginBtn />
                            <GoogleLoginBtn />
                        </div>
                    </div>

                </div>


            </div>
            <Modal hidden={state.signUpHidden} children={<SignUpForm />} closeModal={onCloseSignUpModal}>
                    
            </Modal>
        </>
    )
}