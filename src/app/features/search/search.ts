export interface SearchItem {
  type?: "user";
  avatarURL?: string;
  id?: string;
  name?: string;
  description?:string;
  friendStatus?: FriendStatus;
}

type FriendStatus = "none" | "friended" | "pending"

export interface SearchResult<T> {
  list: T[]
  total: number
}

export interface SuggestionSearchService<T> {
  search(q: string): Promise<SearchResult<T>>;
}

export interface SearchService<T> {
  search(q: string): Promise<SearchResult<T>>;
}
