import { getAuthService } from "../../features/auth/service";
import { METHOD } from "./method";
import { Interceptors } from "./interceptor";
import { getDeviceId } from "../auth";
import { use } from "react";
import { userAgent } from "next/server";
import { Resource } from "../resource/resourse";

interface HttpDefault {
  timeout: number;
}

export class HttpService {
  private baseRequestInit: RequestInit = {};
  interceptors: Interceptors;
  isRefreshing: boolean = false;
  requestTimeout?: NodeJS.Timeout;
  // interceptorSubscribers: (() => Promise<Response>)[] = []

  constructor(httpDefault: HttpDefault) {
    this.interceptors = new Interceptors();
    if (httpDefault.timeout) {
      this.setRequestTimeout(httpDefault.timeout);
    }
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
    this.setRequestTimeout = this.setRequestTimeout.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  private setRequestTimeout(timeout: number) {
    const abortController = new AbortController();
    this.baseRequestInit.signal = abortController.signal;
    this.requestTimeout = setTimeout(() => {
      abortController.abort();
    }, timeout);
  }

  private async sendRequest(url: string, options: RequestInit) {
    let mergeOptions = { ...this.baseRequestInit, ...options };
    if (this.interceptors.request.config) {
      const configInterceptor = this.interceptors.request.config(options);
      mergeOptions = { ...this.baseRequestInit, ...configInterceptor };
    }

    if (this.isRefreshing) {
      // this.interceptorSubscribers.push(() => {
      //     return fetch(url, mergeOptions)
      // })
      console.log("refreshing ...");
      return new Promise<Response>((resolve, reject) => {
        reject("token is refreshing");
      }).finally(() => clearTimeout(this.requestTimeout));
    } else {
      const res = await fetch(url, mergeOptions).finally(() =>
        clearTimeout(this.requestTimeout)
      );
      return this.handleResponse(res, url, options);
    }
  }

  private async handleResponse(
    response: Response,
    url: string,
    options: RequestInit
  ) {
    if (this.interceptors.response.onIntercepterResponse) {
      return this.interceptors.response.onIntercepterResponse(
        response,
        url,
        options
      );
    }
    return response;
  }

  get(url: string, options?: RequestInit): Promise<Response> {
    options = { ...this.baseRequestInit, ...options };
    return this.sendRequest(url, { ...options, method: METHOD.GET });
  }
  post(url: string, options?: RequestInit): Promise<Response> {
    options = { ...this.baseRequestInit, ...options };
    return this.sendRequest(url, { ...options, method: METHOD.POST });
  }
  put(url: string, options?: RequestInit): Promise<Response> {
    options = { ...this.baseRequestInit, ...options };
    return this.sendRequest(url, { ...options, method: METHOD.PUT });
  }
  patch(url: string, options?: RequestInit): Promise<Response> {
    options = { ...this.baseRequestInit, ...options };
    return this.sendRequest(url, { ...options, method: METHOD.PATCH });
  }
  delete(url: string, options?: RequestInit): Promise<Response> {
    options = { ...this.baseRequestInit, ...options };
    return this.sendRequest(url, { ...options, method: METHOD.DELETE });
  }
}

export const httpInstance = new HttpService({
  timeout: 30000,
});

httpInstance.interceptors.response.use(async (response, url, options) => {
  if (response.status == 401) {
    const deviceId = getDeviceId();
    const ua = Resource.getUserAgent() ?? "";
    getAuthService()
      .getIP()
      .then(async (res) => {
        if (
          deviceId.length == 0 ||
          userAgent == undefined ||
          userAgent.length == 0 ||
          res.ip.length == 0
        ) {
          Promise.reject(
            new Response(undefined, { status: 400, statusText: "Bad Request" })
          );
        }
        return getAuthService()
          .refresh(deviceId, res.ip, ua!)
          .then((res) => {
            if (res == 1) {
              return httpInstance.get(url, options);
            } else {
              Promise.reject(
                new Response(undefined, {
                  status: 400,
                  statusText: "Bad Request",
                })
              );
            }
          })
          .catch((e) => {
            throw e;
          });
      })
      .finally(() => (httpInstance.isRefreshing = false));
  }
  return response;
});
