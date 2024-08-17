import { ReactNode, useReducer } from "react";
import { initialSearchState, searchToolReducer } from "./reducer";
import { SearchContext } from "./SearchContext";

interface Props {
  children: ReactNode;
}
export default function SearchProvider(props: Props) {
  const [searchState, searchDispatch] = useReducer(
    searchToolReducer,
    initialSearchState
  );
  return (
    <SearchContext.Provider
      value={{ state: searchState, searchDispatch: searchDispatch }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
