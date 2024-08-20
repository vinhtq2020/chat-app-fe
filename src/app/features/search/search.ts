export interface SearchItem {
  type?: "user";
  avatarURL?: string;
  id?: string;
  name?: string;
  description?:string;
  friendStatus?: FriendStatus;
}

export type FriendStatus = null | "A" | "P" | "R" | "C"

export interface SearchResult<T> {
  list: T[]
  total: number
}

export interface SuggestionSearchService {
  search(q: string): Promise<SearchResult<SearchItem>>;
}

export interface SearchService {
  search(q: string): Promise<SearchResult<SearchItem>>;
}
