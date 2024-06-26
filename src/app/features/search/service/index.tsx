import { HttpService, httpInstance } from "@/src/app/utils/http/http-default";
import { SuggestionSearchItem, SuggestionSearchService } from "../search";
import { config } from "@/src/app/config";
import { ResponseError } from "@/src/app/utils/exception/model/response";

export class SuggestionSearchClient implements SuggestionSearchService {
    private search_url = config.search_url 
    constructor(private http: HttpService){
        this.search =this.search.bind(this)
    }
    async search(q: string): Promise<number | SuggestionSearchItem[]> {
        try {
            const res = await this.http.get(`${this.search_url}`)
            const response = await res.json()
            if (!res.ok){
                throw new ResponseError(response, res.status, response)
            }
            return response
        } catch (e: any) {

            throw new ResponseError(e.body.error.message, e.status, e.body)
        }
    }


}

let suggestionSearchService = new SuggestionSearchClient(httpInstance)

export const getSuggestionSearchService = () => {
    if(!suggestionSearchService) {
        suggestionSearchService = new SuggestionSearchClient(httpInstance)
    }
    return suggestionSearchService
}