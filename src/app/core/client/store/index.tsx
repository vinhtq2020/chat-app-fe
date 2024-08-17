"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AlertProvider from "./alert/AlertProvider";
import LoadingProvider from "./loading/LoadingProvider";
import InternalizationProvider from "./internalization/InternalizationProvider";
import AuthProvider from "./auth/AuthProvider";
import SearchProvider from "./search/SearchProvider";
export * from "./alert/AlertProvider";
export * from "./loading/LoadingProvider";
export * from "./internalization/InternalizationProvider";
export * from "./auth/AuthProvider";
export interface Props {
  children: ReactNode;
}

export const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <InternalizationProvider>
          <AlertProvider>
            <SearchProvider>
              <LoadingProvider>{props.children}</LoadingProvider>
            </SearchProvider>
          </AlertProvider>
        </InternalizationProvider>
      </AuthProvider>
    </SessionProvider>
  );
};
