import { ChangeEvent, useContext, useRef, useState } from "react";

import { register } from "@/src/app/features/auth/actions";
import { AlertContext } from "@/src/app/components/Providers";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { ValidateErrors } from "@/src/app/utils/validate/model";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import { Account } from "@/src/app/features/auth/auth";

export interface Props {
  onRegisterSuccess: () => void;
}

interface InternalState {
  email: string;
  username: string;
  password: string;
  phone: string;
  confirmPassword: string;
  fieldErrors: ValidateErrors;
}

const initialState: InternalState = {
  email: "",
  username: "",
  password: "",
  phone: "",
  confirmPassword: "",
  fieldErrors: {},
};

export const SignUpForm = (props: Props) => {
  const [state, setState] = useState<InternalState>(initialState);
  const alertContext = useContext(AlertContext);
  const refForm = useRef<HTMLFormElement>();
  const onClickRegister = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {        
      const res = await register({
        email: state.email,
        username: state.username,
        password: state.password,
        phone: state.phone,
      });
      if (typeof res === "number") {
        showAlert(alertContext, "Success", "register account success", () =>
          props.onRegisterSuccess()
        );
      } else {
        setState((prevState) => ({
          ...prevState,
          fieldErrors: { ...(res as ValidateErrors) },
        }));
      }
    } catch (err: unknown) {
      console.log((err as ResponseError).body);
      showAlert(alertContext, "Error", (err as ResponseError).body);
    }
  };

  const updateState = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <div className="rounded-xl bg-white px-4 pb-4">
        <h1 className="text-center text-blue-500 text-3xl font-semibold">
          Sign Up
        </h1>
        <form ref={refForm as any}>
          <div className="flex flex-col pt-4">
            <input
              className="border px-2 rounded-md h-9 text-base"
              type="text"
              placeholder="Email"
              name="email"
              id="email"
              value={state.email}
              onChange={(e) => updateState(e)}
            />
            <span className={`text-red-500 text-sm h-5 px-2 `}>
              {state.fieldErrors["email"] ?? ""}
            </span>
          </div>
          <div className="flex flex-col">
            <input
              className="border px-2 rounded-md h-9 text-base"
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              value={state.username}
              onChange={(e) => updateState(e)}
            />
            <span className="text-red-500 text-sm h-5 px-2 ">
              {state.fieldErrors["username"] ?? ""}
            </span>
          </div>
          <div className="flex flex-col">
            <input
              className="border px-2 rounded-md h-9 text-base"
              type="password"
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
          <div className="flex flex-col">
            <input
              className="border px-2 rounded-md h-9 text-base"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              value={state.confirmPassword}
              onChange={(e) => updateState(e)}
            />
            <span className={`text-red-500 text-sm h-5 px-2 `}>
              {state.fieldErrors["confirmPassword"] ?? ""}
            </span>
          </div>

          <div className="flex flex-col">
            <input
              className="border px-2 rounded-md h-9 text-base"
              type="tel"
              placeholder="Phone number"
              name="phone"
              id="phone"
              value={state.phone}
              onChange={(e) => updateState(e)}
            />
            <span className={`text-red-500 text-sm h-5 px-2 `}>
              {state.fieldErrors["phone"] ?? ""}
            </span>
          </div>

          <div className="flex flex-col">
            <button
              className=" mx-auto bg-blue-500 text-white font-bold py-2 px-8 hover:bg-blue-700 rounded-full"
              type="button"
              onClick={onClickRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
