import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}


export default function AuthProvider(props: Props) {
  const [userId, setUserId] = useState<string>();

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </AuthContext.Provider>
  );
}
