import { useReducer } from "react";
import { SearchItem } from "../../../../features/search/search";

export interface SearchState {
  list: SearchItem[];
}

export const initialSearchState: SearchState = {
  list: [],
};

type SearchToolActionType = "UPDATE" | "SEARCH" | "REMOVE";

export interface SearchAction {
  type: SearchToolActionType;
  payload: {
    id?: string;
    list?: SearchItem[];
  };
}

export const searchToolReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  const { type, payload } = action;
  const { id, list } = payload;

  switch (type) {
    case "UPDATE":
      if(list && list.length == 1 && id){
        const idx = state.list.findIndex(item => item.id == id) 
        if(idx != -1){
          state.list[idx] = list[0]
        }
        return {...state}
      }
    case "SEARCH":
      if (list) {        
        return {...state, list: list};
      }
      return state
    case "REMOVE":
      if (id != undefined) {
        const newList = state.list.filter((item) => item.id != id);
        return { ...state, list: newList };
      }
      return state;
    default:
      return state;
  }
};

