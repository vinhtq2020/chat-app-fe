import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "./reducer";

interface Props {
  children: ReactNode;
}


export default function AuthProvider(props: Props) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  
  return (
    <AuthContext.Provider value={{state: state, dispatch: dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}
