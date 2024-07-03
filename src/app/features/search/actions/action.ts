"use server";

import { SearchResult, SuggestionSearchItem } from "../search";
import { getSuggestionSearchService } from "../service";

export async function search(
  q: string
): Promise<SearchResult<SuggestionSearchItem>> {
//   return getSuggestionSearchService().search(q);
return new Promise<SearchResult<SuggestionSearchItem>>((v)=>{
    return {
        list: [],
        total: 0,
    }
})
}
