"use sever";

import { SuggestionSearchItem } from "../search";
import { getSuggestionSearchService } from "../service";

export function search(q: string): Promise<SuggestionSearchItem[] | number>{
    return getSuggestionSearchService().search(q)
}