'use client';

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

export interface Props {
    children: ReactNode;
}
export const Providers = (props: Props) => {
    return (<SessionProvider>
        {props.children}
    </SessionProvider>)
}