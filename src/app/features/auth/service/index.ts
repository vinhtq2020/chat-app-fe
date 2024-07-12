import { AuthService, Token, Account } from "../auth";
import { config } from "../../../config";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import {
  ContentType,
  HeaderType,
  PassportKeys,
  getCookieHeader,
  getSetCookieFromResponse,
} from "@/src/app/utils/http/headers";
import { storeCookies } from "@/src/app/action";
import { HttpService } from "@/src/app/utils/http/http-default";

export class AuthServiceClient implements AuthService {
  constructor(private httpInstance: HttpService, private auth_url: string) {
    this.httpInstance = httpInstance;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.getIP = this.getIP.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async getIP(): Promise<{ ip: string }> {
    try {
      // Make the request
      const res = await this.httpInstance.get<{ ip: string }>(
        "https://api.ipify.org?format=json"
      );
      // Extract JSON body content from HTTP response
      return res.body;
    } catch (e) {
      throw e;
    }
  }

  async login(
    email: string,
    password: string,
    userAgent: string,
    ip: string,
    deviceId: string
  ): Promise<number> {
    try {
      const res = await this.httpInstance.post<number>(
        `${this.auth_url}/login`,
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
            [HeaderType.deviceId]: deviceId,
            [HeaderType.userAgent]: userAgent,
            [HeaderType.xForwardedFor]: ip,
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          cache: "no-cache",
        }
      );
      const setCookies = getSetCookieFromResponse(res.headers);

      storeCookies({
        accessToken: setCookies["accessToken"],
        refreshToken: setCookies["refreshToken"],
        userId: setCookies["userId"],
      });
      return res.body;
    } catch (err: unknown) {
      throw err;
    }
  }

  async register(user: Account): Promise<number> {
    try {
      const res = await this.httpInstance.post<number>(
        `${this.auth_url}/register`,
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
          },
          body: JSON.stringify(user),
        }
      );

      return res.body;
    } catch (err: unknown) {
      throw err;
    }
  }
  async logout(
    deviceId: string,
    ip: string,
    userAgent: string
  ): Promise<number> {
    try {
      const res = await this.httpInstance.get<number>(
        `${this.auth_url}/logout`,
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
            [HeaderType.deviceId]: deviceId,
            [HeaderType.userAgent]: userAgent,
            [HeaderType.xForwardedFor]: ip,
            [HeaderType.cookie]: getCookieHeader(),
          },
          cache: "no-cache",
        }
      );

      return res.body;
    } catch (err: unknown) {
      throw err;
    }
  }
  async refresh(
    deviceId: string,
    ip: string,
    userAgent: string
  ): Promise<number> {
    try {
      const res = await this.httpInstance.get<number>(
        `${this.auth_url}/register`,
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
            [HeaderType.deviceId]: deviceId,
            [HeaderType.userAgent]: userAgent,
            [HeaderType.xForwardedFor]: ip,
            [HeaderType.cookie]: getCookieHeader(),
          },
          cache: "no-cache",
        }
      );

      const setCookies = getSetCookieFromResponse(res.headers);
      storeCookies({
        accessToken: setCookies["accessToken"],
      });
      return res.body
    } catch (err: unknown) {
      throw err;
    }
  }
}
