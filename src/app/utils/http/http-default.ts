interface HttpDefault {
    baseURL?: string,
    timeout: number,
}

export class Http {
    private baseRequestInit: RequestInit = {}

    constructor(httpDefault: HttpDefault) {
        if (httpDefault.timeout) {
            this.setRequestTimeout(httpDefault.timeout)
        }

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.patch = this.patch.bind(this)
        this.delete = this.delete.bind(this)
        this.setRequestTimeout = this.setRequestTimeout.bind(this)
    }
    private setRequestTimeout(timeout: number) {
        const abortController = new AbortController()
        setTimeout(() => abortController.abort(), timeout)
        this.baseRequestInit.signal = abortController.signal
    }
    get(url: string, options?: RequestInit): Promise<Response> {
        options = { ...this.baseRequestInit, ...options }
        return fetch(url, { ...options, method: "GET" })

    }
    post(url: string, options?: RequestInit): Promise<Response> {
        options = { ...this.baseRequestInit, ...options }
        return fetch(url, { ...options, method: "POST" })
    }
    put(url: string, options?: RequestInit): Promise<Response> {
        options = { ...this.baseRequestInit, ...options }
        return fetch(url, { ...options, method: "PUT" })
    }
    patch(url: string, options?: RequestInit): Promise<Response> {
        options = { ...this.baseRequestInit, ...options }
        return fetch(url, { ...options, method: "PATCH" })
    }
    delete(url: string, options?: RequestInit): Promise<Response> {
        options = { ...this.baseRequestInit, ...options }
        return fetch(url, { ...options, method: "DELETE" })
    }
}