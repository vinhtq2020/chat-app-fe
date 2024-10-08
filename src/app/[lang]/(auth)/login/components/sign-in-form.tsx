"use client";

import { useContext, useRef, useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { useRouter } from "next/navigation";

import { login } from "@/src/app/features/auth/action";
import { ValidateErrors } from "@/src/app/utils/validate/model";

import { GoogleLoginBtn } from "@/src/app/components/GoogleLoginButton";
import { Modal } from "@/src/app/components/Modal/Modal";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import { AlertContext } from "@/src/app/core/client/store/alert/AlertContext";
import { LoadingScreenContext } from "@/src/app/core/client/store/loading/LoadingContext";

export interface Props {}

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
};

export const SignInForm = (props: Props) => {
  const [state, setState] = useState<InternalState>(initialState);
  const refForm = useRef<HTMLFormElement>();
  const alertContext = useContext(AlertContext);
  const loadingContext = useContext(LoadingScreenContext);

  const router = useRouter();
  const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onCloseSignUpModal = () => {
    setState({ ...state, showModal: false });
  };

  const onShowSignUpModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setState({ ...state, showModal: true });
  };

  const onRegisterSuccess = () => {
    onCloseSignUpModal();
  };

  const onSignIn = async (e: React.MouseEvent) => {
    loadingContext?.setLoading(true);
    return login(state.email, state.password, navigator.userAgent)
      .then((res) => {
        loadingContext?.setLoading(false);
        if (res as ValidateErrors) {
          setState((prevState) => ({
            ...prevState,
            fieldErrors: { ...(res as ValidateErrors) },
          }));
        } else if (res == 1) {
          router.refresh();
        }

      })
      .catch((err: ResponseError) => {
        loadingContext?.setLoading(false);
        showAlert(alertContext, "Error", err.message);
      });
  };
  return (
    <>
      <form className="pt-12 m-4" ref={refForm as any}>
        <div className="rounded-xl max-w-md mx-auto bg-white p-4 shadow-lg">
          <h1 className="text-center text-blue-500 text-4xl font-semibold pt-4">
            Sign In
          </h1>
          <div className="flex flex-col pt-4">
            <span className={`text-red-500 text-sm h-5 px-2 `}>
              {state.fieldErrors["common"] ?? ""}
            </span>
          </div>
          <div className="flex flex-col pt-2">
            <input
              className="border px-4 rounded-md w-full h-8 text-base"
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={state.email}
              onChange={(e) => updateState(e)}
            />
            <span className={`text-red-500 text-sm h-5 px-2`}>
              {state.fieldErrors["email"] ?? ""}
            </span>
          </div>
          <div className="flex flex-col">
            <input
              className="border rounded-md px-4 w-full h-8 text-base"
              type="text"
              placeholder="Password"
              name="password"
              id="password"
              value={state.password}
              onChange={(e) => updateState(e)}
            />
            <span className={`text-red-500 text-sm h-5 px-2 `}>
              {state.fieldErrors["password"] ?? ""}
            </span>
          </div>
          <div className="flex flex-col pt-4">
            <button
              className=" mx-auto bg-blue-500 text-white font-bold py-2 px-8 hover:bg-blue-700 rounded-full"
              type="button"
              onClick={(e) => onSignIn(e)}
            >
              Login
            </button>
            <h4 className="pt-4 text-sm text-gray-500 text-center">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={(e) => onShowSignUpModal(e)}
              >
                Sign up
              </span>
            </h4>
          </div>
          <div className="flex flex-row pt-6 mx-auto items-center w-1/2">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-base text-gray-500 font-semibold">
              Or
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="py-4 flex flex-col">
            <div className="text-gray-500 text-center text-sm pb-4">
              Sign in with
            </div>
            <div className="flex flex-row gap-4 mx-auto">
              <GoogleLoginBtn />
              <GoogleLoginBtn />
              <GoogleLoginBtn />
            </div>
          </div>
        </div>
      </form>
      <Modal isVisible={state.showModal} closeModal={onCloseSignUpModal}>
        <SignUpForm onRegisterSuccess={onRegisterSuccess} />
      </Modal>
    </>
  );
};
