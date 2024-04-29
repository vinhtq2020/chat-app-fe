import { config } from "../config";
import { UserSearchService } from "./user/service";

export class ApplicationContext {
    private userSearchService?: UserSearchService
    constructor() {
        this.getUserSearchService = this.getUserSearchService.bind(this)
    }
    getUserSearchService(): UserSearchService {
        if (!this.userSearchService) {
            this.userSearchService = new UserSearchService(config.user_url)
        }
        return this.userSearchService
    }
}

export const context = new ApplicationContext()

export const useUserSearchService = () => {
    return context.getUserSearchService()
}