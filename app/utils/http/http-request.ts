import { Axios } from "axios"
import { axiosInstant } from "./axios-instance"

export class HttpRequest {
    private axios: Axios
    constructor(axios: Axios) {
        this.axios = axios
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.patch = this.patch.bind(this)
    }
    get(url: string): Promise<any> {
        return this.axios.get(url)
    }

    post(url: string, obj: any): Promise<any> {
        return this.axios.post(url, obj)
    }
    put(url: string, obj: any): Promise<any> {
        return this.axios.put(url, obj)
    }
    patch(url: string, obj: any): Promise<any> {
        return this.axios.patch(url, obj)
    }
    delete(url: string): Promise<any> {
        return this.axios.delete(url)
    }
}

export const httpRequest = new HttpRequest(axiosInstant)