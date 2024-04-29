import { BaseSearchServiceImpl } from "../base/search/service";
import { User, UserFilter } from "./user";

export class UserSearchService extends BaseSearchServiceImpl<User, UserFilter> implements UserSearchService {
    constructor(url: string){
        super(url)
    }
}