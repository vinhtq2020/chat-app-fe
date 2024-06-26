"use client";

import { SessionProvider } from "next-auth/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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

export const AlertContext = createContext<AlertContext | undefined>(undefined);
export const InternalizationContext = createContext<
  InternalizationContext | undefined
>(undefined);

export const Providers = (props: Props) => {
  const [alertState, setAlertState] = useState<AlertState>();

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
          {props.children}
        </AlertContext.Provider>
      </InternalizationContext.Provider>
    </SessionProvider>
  );
};
