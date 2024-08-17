import { createContext, Dispatch } from "react";
import { SearchAction, SearchState } from "./reducer";
export interface SearchContext {
  state: SearchState;
  searchDispatch: Dispatch<SearchAction>;
}

export const SearchContext = createContext<SearchContext | undefined>(
  undefined
);
