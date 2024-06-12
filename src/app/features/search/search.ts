export interface SuggestionSearchItem {
  q: string;
  type: "query" | "user";
  avatarURL?: string;
  id?: string;
  name?: string;
}

export interface SuggestionSearchService {
  search(q: string): Promise<SuggestionSearchItem[] | number>;
}
