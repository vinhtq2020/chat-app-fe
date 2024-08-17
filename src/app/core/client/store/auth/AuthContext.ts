import { createContext, Dispatch, SetStateAction } from "react";

/**
 * State interface for Loading Screen Context
 */
export interface AuthContext {
    userId?: string;
    setUserId: Dispatch<SetStateAction<string | undefined>>;
  }
  
  export const AuthContext = createContext<AuthContext | undefined>(
    undefined
  );
  