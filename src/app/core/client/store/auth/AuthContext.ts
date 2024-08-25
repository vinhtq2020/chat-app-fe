import { createContext, Dispatch, SetStateAction } from "react";
import { AuthAction, AuthState } from "./reducer";

/**
 * State interface for Loading Screen Context
 */
export interface AuthContext {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContext>({
  state: {
    userId: undefined,
  },
  dispatch: () => {},
});
