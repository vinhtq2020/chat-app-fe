import { BaseSearchClient } from "../base/search/client";
import { User, UserFilter } from "./user";

export class UserSearchService extends BaseSearchClient<User, UserFilter> implements UserSearchService {
    constructor(url: string){
        super(url)
    }
}