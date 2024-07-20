import { getDeviceId } from "../utils/auth";
import { HttpService } from "../utils/http/http-default";
import { userAgent } from "next/server";
import { Resource } from "../utils/resource/resourse";
import { useAuthService } from "./context";
import { storeCookies } from "../action";

let httpInstance = new HttpService({
  timeout: 30000,
});

httpInstance.interceptors.response.use(async (response, url, options) => {
  if (response.status == 401) {
    handleStatus401(url, options)
  }
  return response;
});

function handleStatus401(url: string, options: RequestInit) {
  const deviceId = getDeviceId();
  const ua = Resource.getUserAgent() ?? "";
  useAuthService()
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
      return useAuthService()
        .refresh(deviceId, res.ip, ua!)
        .then((res) => {
          if (res) {
            storeCookies({ accessToken: res });
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

export const getHTTPService = () => {
  if (!httpInstance) {
    httpInstance = new HttpService({
      timeout: 30000,
    });
  }
  return httpInstance;
};
