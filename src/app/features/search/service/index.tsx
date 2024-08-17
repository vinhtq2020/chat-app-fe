import { HttpService } from "@/src/app/utils/http/http-default";
import {
  SearchResult,
  SearchItem,
  SuggestionSearchService,
  SearchService,
} from "../search";
import { config } from "@/src/app/config";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import {
  ContentType,
  getCookieHeader,
  HeaderType,
} from "@/src/app/utils/http/headers";

export class SuggestionSearchClient<T> implements SuggestionSearchService {
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
      const res = await this.http.get<SearchResult<T>>(`${this.search_url}`);
      return res.body;
    } catch (e: any) {
      throw new ResponseError(e.body.error.message ?? "", e.status, e.body);
    }
  }
}

export class SearchClient implements SearchService {
  constructor(private http: HttpService, private search_url: string) {
    this.search = this.search.bind(this);
    this.delay = this.delay.bind(this);
  }
  delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  async search<T>(q: string): Promise<SearchResult<T>> {
    try {
      const searchParams = new URLSearchParams({
        q: q,
      });
      const res = await this.http.get<SearchResult<T>>(
        `${this.search_url}?${searchParams}`,
        {
          cache: "no-cache",
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
            [HeaderType.cookie]: getCookieHeader(),
          },
        }
      );
      return res.body;
      // this.delay(3000);
      // return {
      //   list: [
      //     {
      //       id: "1",
      //       avatarURL: "xzxc",
      //       name: "HKT",
      //       description: "Song tai thanh pho Ho Chi Minh",
      //       friendStatus: "none",
      //     },
      //     {
      //       id: 2,
      //       avatarURL: "xzxc",
      //       name: "HKT",
      //       description: "Song tai thanh pho Ho Chi Minh",
      //       friendStatus: "friended",
      //     },
      //     {
      //       id: 3,
      //       avatarURL: "xzxc",
      //       name: "HKT",
      //       description: "Song tai thanh pho Ho Chi Minh",
      //       friendStatus: "pending",

      //     },
      //     {
      //       id: 4,
      //       avatarURL: "xzxc",
      //       name: "HKT",
      //       description: "Song tai thanh pho Ho Chi Minh",
      //       friendStatus: "none",

      //     },
      //     {
      //       id: 5,
      //       avatarURL: "xzxc",
      //       name: "HKT",
      //       description: "Song tai thanh pho Ho Chi Minh",
      //       friendStatus: "none",
      //     },
      //   ],
      //   total: 1,
      // } as SearchResult<T>;
    } catch (e) {
      throw e;
    }
  }
}
