import { createContext, Dispatch } from "react";
import { initialSearchState, SearchAction, SearchState } from "./reducer";
export interface SearchContext {
  state: SearchState;
  searchDispatch: Dispatch<SearchAction>;
}

export const SearchContext = createContext<SearchContext>({
  state: initialSearchState,
  searchDispatch: () => {},
});
