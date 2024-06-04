'use client';

import { useContext, useRef, useState } from "react"
import { GoogleLoginBtn } from "../../../components/GoogleLoginButton";
import { SignUpForm } from "./sign-up-form";
import { ValidateErrors } from "../../../utils/validate/model";
import { RedirectType, redirect } from "next/navigation";
import { showAlert } from "../../../components/Toast/Toast";
import { AlertContext } from "../../../components/Providers";
import { Modal } from "../../../components/Modal/Modal";
import { login } from "@/src/app/features/auth/actions";

export interface Props {
}

interface InternalState {
    email: string;
    password: string;
    fieldErrors: ValidateErrors;
    showModal: boolean;
}

const initialState: InternalState = {
    email: "",
    password: "",
    fieldErrors: {},
    showModal: false,
}

export const SignInForm = (props: Props) => {
    const [state, setState] = useState<InternalState>(initialState)
    const refForm = useRef<HTMLFormElement>()
    const alertContext = useContext(AlertContext)

    const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setState((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const onCloseSignUpModal = () => {

        setState({ ...state, showModal: false })
    }

    const onShowSignUpModal = (e: React.MouseEvent) => {
        e.preventDefault()
        setState({ ...state, showModal: true })
    }

    const onRegisterSuccess = () => {
        onCloseSignUpModal()
        
    }

    const onSignIn = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            const res = await login(state.email, state.password, navigator.userAgent)
            
            if (res as ValidateErrors) {
                setState((prevState) => ({ ...prevState, fieldErrors:  { ...(res as ValidateErrors) }}))
                
            } else if (res == 1) {
                redirect("/", RedirectType.replace)
            }
        } catch (err: any) {

            showAlert(alertContext, "Error", err.message)
        }


    }
    return (
        <>
            <form className="pt-12" ref={refForm as any}>
                <div className="rounded-xl max-w-md mx-auto bg-white p-4 shadow-lg">
                    <h1 className="text-center text-blue-500 text-4xl font-semibold pt-4">
                        Sign In
                    </h1>
                    <div className="flex flex-col pt-4">
                        <input className="border px-4 rounded-md w-full h-8 text-base" type="text" placeholder="Email" name="email" id="email" value={state.email} onChange={(e) => updateState(e)} />
                        <span className={`text-red-500 text-sm h-5 px-2`}>{state.fieldErrors['email'] ?? ""}</span>

                    </div>
                    <div className="flex flex-col">
                        <input className="border rounded-md px-4 w-full h-8 text-base" type="text" placeholder="Password" name="password" id="password" value={state.password} onChange={(e) => updateState(e)} />
                        <span className={`text-red-500 text-sm h-5 px-2 `}>{state.fieldErrors['password'] ?? ""}</span>
                    </div>
                    <div className="flex flex-col pt-4">
                        <button className=" mx-auto bg-blue-500 text-white font-bold py-2 px-8 hover:bg-blue-700 rounded-full" type="button" onClick={e => onSignIn(e)} >Login</button>
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


            </form>
            <Modal isVisible={state.showModal} closeModal={onCloseSignUpModal} >
                <SignUpForm onRegisterSuccess={onRegisterSuccess} />
            </Modal>

        </>
    )
}
