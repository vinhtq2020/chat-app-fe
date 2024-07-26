import { config } from "../config";
import { AuthService } from "../features/auth/auth";
import { AuthServiceClient } from "../features/auth/service";
import { FriendService } from "../features/friend/friend";
import { FriendClient } from "../features/friend/service";
import {
  SearchItem,
  SearchService,
  SuggestionSearchService,
} from "../features/search/search";
import {
  SearchClient,
  SuggestionSearchClient,
} from "../features/search/service";
import { UserSearchService } from "../services/user/service";
import { HttpService } from "../utils/http/http-default";
import { getHTTPService } from "./http-config";

export class ApplicationContext {
  private userSearchService?: UserSearchService;
  private authService?: AuthService;
  private suggestionSearchService?: SuggestionSearchService<SearchItem>;
  private friendService?: FriendService;
  private httpService: HttpService;
  private searchService?: SearchService<SearchItem>;

  constructor(httpService: HttpService) {
    this.getUserSearchService = this.getUserSearchService.bind(this);
    this.httpService = httpService;
    this.getAuthService = this.getAuthService.bind(this);
    this.getHttpService = this.getHttpService.bind(this);
    this.getSearchService = this.getSearchService.bind(this);
    this.getSuggestionSearchService =
      this.getSuggestionSearchService.bind(this);
    this.getFriendService = this.getFriendService.bind(this);
  }
  getSuggestionSearchService(): SuggestionSearchService<SearchItem> {
    if (!this.suggestionSearchService) {
      this.suggestionSearchService = new SuggestionSearchClient(
        this.httpService
      );
    }
    return this.suggestionSearchService;
  }

  getSearchService = () => {
    if (!this.searchService) {
      this.searchService = new SearchClient<SearchItem>(
        this.httpService,
        config.search_url
      );
    }
    return this.searchService;
  };

  getUserSearchService(): UserSearchService {
    if (!this.userSearchService) {
      this.userSearchService = new UserSearchService(config.user_url);
    }
    return this.userSearchService;
  }
  getAuthService(): AuthService {
    if (!this.authService) {
      this.authService = new AuthServiceClient(
        this.httpService,
        config.auth_url
      );
    }
    return this.authService;
  }

  getFriendService(): FriendService {
    if (!this.friendService) {
      this.friendService = new FriendClient(
        this.httpService,
        config.friend_url,
        config.friend_request_url
      );
    }
    return this.friendService;
  }

  getHttpService(): HttpService {
    if (!this.httpService) {
      this.httpService = new HttpService({
        timeout: 30000,
      });
    }
    return this.httpService;
  }
}

let context = new ApplicationContext(getHTTPService());
export const getApplicationContext = () => {
  if (!context) {
    context = new ApplicationContext(
      new HttpService({
        timeout: 30000,
      })
    );
  }
  return context;
};

export const useUserSearchService = () => {
  return getApplicationContext().getUserSearchService();
};

export const useAuthService = () => {
  return getApplicationContext().getAuthService();
};

export const useSearchService = () => {
  return getApplicationContext().getSearchService();
};

export const useSuggestionSearchService = () => {
  return getApplicationContext().getSuggestionSearchService();
};

export const useFriendService = () => {
  return getApplicationContext().getFriendService();
};
