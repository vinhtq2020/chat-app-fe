export interface SuggestionSearchItem {
  q: string;
  type: "query" | "user";
  avatarURL?: string;
  id?: string;
  name?: string;
}

export interface SearchResult<T> {
  list: T[]
  total: number
}

export interface SuggestionSearchService<T> {
  search(q: string): Promise<SearchResult<T>>;
}
