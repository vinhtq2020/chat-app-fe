"use server";

import { SearchResult, SearchItem } from "../search";
import { useSearchService } from "@/src/app/core/server/context";

export async function search(q: string): Promise<SearchResult<SearchItem>> {
    return useSearchService().search(q);
}
