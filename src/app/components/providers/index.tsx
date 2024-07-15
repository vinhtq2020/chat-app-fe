"use client";

import { SessionProvider } from "next-auth/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  use,
  useState,
} from "react";
import { LocaleConfig, localeConfig } from "../../utils/resource/locales";

export interface Props {
  children: ReactNode;
}

/**
 * State interface for alert toast
 */
export interface AlertState {
  message?: string;
  title?: string;
  onClose?: () => void;
  visible?: boolean;
}

/**
 * type interface for alert context
 */
export interface AlertContext {
  alertState: AlertState | undefined;
  setAlertState: Dispatch<SetStateAction<AlertState | undefined>>;
}

/**
 * State interface for Internalization context
 */

export interface InternalizationContext {
  localeConfig: LocaleConfig;
  changeLanguage: () => void;
}

/**
 * State interface for Loading Screen Context
 */

export interface LoadingScreenContext {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const AlertContext = createContext<AlertContext | undefined>(undefined);
export const LoadingScreenContext = createContext<
  LoadingScreenContext | undefined
>(undefined);
export const InternalizationContext = createContext<
  InternalizationContext | undefined
>(undefined);

export const Providers = (props: Props) => {
  const [alertState, setAlertState] = useState<AlertState>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const changeLanguage = () => {};

  return (
    <SessionProvider>
      <InternalizationContext.Provider
        value={{
          localeConfig: localeConfig,
          changeLanguage: function () {},
        }}
      >
        <AlertContext.Provider value={{ alertState, setAlertState }}>
          <LoadingScreenContext.Provider
            value={{ isLoading: isLoading, setLoading: setLoading }}
          >
            {props.children}
          </LoadingScreenContext.Provider>
        </AlertContext.Provider>
      </InternalizationContext.Provider>
    </SessionProvider>
  );
};
