import { createContext, Dispatch, SetStateAction } from "react";

/**
 * State interface for Loading Screen Context
 */
export interface LoadingScreenContext {
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  export const LoadingScreenContext = createContext<
    LoadingScreenContext | undefined
  >(undefined);