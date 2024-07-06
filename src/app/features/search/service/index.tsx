import { getHTTPService, HttpService } from "@/src/app/utils/http/http-default";
import {
  SearchResult,
  SearchItem,
  SuggestionSearchService,
  SearchService,
} from "../search";
import { config } from "@/src/app/config";
import { ResponseError } from "@/src/app/utils/exception/model/response";
const httpInstance = getHTTPService();
export class SuggestionSearchClient<T> implements SuggestionSearchService<T> {
  private search_url = config.search_url;
  constructor(private http: HttpService) {
    this.search = this.search.bind(this);
    this.delay = this.delay.bind(this);
  }

  delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  async search<T>(q: string): Promise<SearchResult<T>> {
    try {
      const res = await this.http.get(`${this.search_url}`);
      const response = await res.json();
      if (!res.ok) {
        throw new ResponseError(response, res.status, response);
      }
      return response;
    } catch (e: any) {
      throw new ResponseError(e.body.error.message, e.status, e.body);
    }
  }
}

export class SearchClient<T> implements SearchService<T> {
  private search_url = config.search_url;
  constructor(private http: HttpService) {
    this.search = this.search.bind(this);
    this.delay = this.delay.bind(this);
  }
  delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
  async search<T>(q: string): Promise<SearchResult<T>> {
    // try {
    //   const res = await this.http.get(`${this.search_url}`);
    //   const response = await res.json();
    //   if (!res.ok) {
    //     throw new ResponseError(response, res.status, response);
    //   }
    //   return response;
    // } catch (e: any) {
    //   throw new ResponseError(e.body.error.message, e.status, e.body);
    // }
    this.delay(3000);
    return {
      list: [
        {
          id: "1",
          avatarURL: "xzxc",
          name: "HKT",
          description: "Song tai thanh pho Ho Chi Minh",
          friendStatus: "none",
        },
        {
          id: 2,
          avatarURL: "xzxc",
          name: "HKT",
          description: "Song tai thanh pho Ho Chi Minh",
          friendStatus: "friended",
        },
        {
          id: 3,
          avatarURL: "xzxc",
          name: "HKT",
          description: "Song tai thanh pho Ho Chi Minh",
          friendStatus: "pending",

        },
        {
          id: 4,
          avatarURL: "xzxc",
          name: "HKT",
          description: "Song tai thanh pho Ho Chi Minh",
          friendStatus: "none",

        },
        {
          id: 5,
          avatarURL: "xzxc",
          name: "HKT",
          description: "Song tai thanh pho Ho Chi Minh",
          friendStatus: "none",
        },
      ],
      total: 1,
    } as SearchResult<T>;
  }
}

let suggestionSearchService = new SuggestionSearchClient(httpInstance);
let searchService = new SearchClient(httpInstance);

export const getSuggestionSearchService = () => {
  if (!suggestionSearchService) {
    suggestionSearchService = new SuggestionSearchClient(httpInstance);
  }
  return suggestionSearchService;
};

export const getSearchService = () => {
  if (!searchService) {
    searchService = new SearchClient<SearchItem>(httpInstance);
  }
  return searchService;
};
