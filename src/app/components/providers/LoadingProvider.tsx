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
export interface LoadingScreenContext {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingScreenContext = createContext<
  LoadingScreenContext | undefined
>(undefined);

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
