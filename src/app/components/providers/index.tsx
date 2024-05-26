'use client';

import { SessionProvider } from "next-auth/react"
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

export interface Props {
    children: ReactNode;
}

/**
 * State interface for alert toast
 */
export interface AlertState {
    message?: string
    title?: string
    onClose?: () => void
    visible?: boolean
}

/**
 * type interface for alert context
 */
export interface AlertContext {
    alertState: AlertState | undefined,
    setAlertState: Dispatch<SetStateAction<AlertState | undefined>>
}

export const AlertContext = createContext<AlertContext | undefined>(undefined)



export const Providers = (props: Props) => {
    const [alertState, setAlertState] = useState<AlertState>()
    return (<SessionProvider>
        <AlertContext.Provider value={{ alertState, setAlertState }}>
            {props.children}
        </AlertContext.Provider>
    </SessionProvider>)
}