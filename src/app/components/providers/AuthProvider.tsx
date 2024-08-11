import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

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

export default function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string>();

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
}
