import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { LoadingScreenContext } from "./LoadingContext";

interface Props {
  children: ReactNode;
}

export default function LoadingProvider(props: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingScreenContext.Provider
      value={{ isLoading: isLoading, setLoading: setLoading }}
    >
        {props.children}
    </LoadingScreenContext.Provider>
  );
}
