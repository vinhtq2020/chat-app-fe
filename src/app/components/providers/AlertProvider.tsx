import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

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

export const AlertContext = createContext<AlertContext | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export default function AlertContextProvider(props: Props) {
  const [alertState, setAlertState] = useState<AlertState>();
  return (
    <AlertContext.Provider
      value={{ alertState, setAlertState }}
    >{props.children}</AlertContext.Provider>
  );
}
