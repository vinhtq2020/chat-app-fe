"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AlertContextProvider from "./AlertProvider";
import LoadingProvider from "./LoadingProvider";
import InternalizationProvider from "./InternalizationProvider";
import AuthProvider from "./AuthProvider";
export * from "./AlertProvider";
export * from "./LoadingProvider";
export * from "./InternalizationProvider";
export * from "./AuthProvider";
export interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <InternalizationProvider>
          <AlertContextProvider>
            <LoadingProvider>{props.children}</LoadingProvider>
          </AlertContextProvider>
        </InternalizationProvider>
      </AuthProvider>
    </SessionProvider>
  );
};
