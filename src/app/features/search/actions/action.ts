"use server";

import { list } from "postcss";
import { SearchResult, SearchItem } from "../search";
import { getSearchService, getSuggestionSearchService } from "../service";

export async function search(q: string): Promise<SearchResult<SearchItem>> {
    return getSearchService().search(q);
}
