import { getDeviceId } from "../utils/auth";
import { HttpService } from "../utils/http/http-default";
import { userAgent } from "next/server";
import { Resource } from "../utils/resource/resourse";
import { useAuthService } from "./context";

let httpInstance = new HttpService({
  timeout: 30000,
});

httpInstance.interceptors.response.use(async (response, url, options) => {
  if (response.status == 401) {
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

export const getHTTPService = () => {
  if (!httpInstance) {
    httpInstance = new HttpService({
      timeout: 30000,
    });
  }
  return httpInstance
};
