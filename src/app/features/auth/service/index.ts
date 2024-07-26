import { AuthService, Account } from "../auth";
import {
  ContentType,
  Cookie,
  HeaderType,
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
          email: email,
          password: password,
        },
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
            [HeaderType.deviceId]: deviceId,
            [HeaderType.userAgent]: userAgent,
            [HeaderType.xForwardedFor]: ip,
          },
          cache: "no-cache",
        }
      );
      const setCookies = getSetCookieFromResponse(res.headers);
      await storeCookies({
        accessToken: setCookies["accessToken"],
        refreshToken: setCookies["refreshToken"],
        userId: setCookies["userId"],
      });
      return res.body;
    } catch (err) {
      throw err;
    }
  }

  async register(user: Account): Promise<number> {
    try {
      const res = await this.httpInstance.post<number>(
        `${this.auth_url}/register`,
        user,
        {
          headers: {
            [HeaderType.contentType]: ContentType.applicationJson,
          },
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

  // Refresh access token when token expired. Used in middleware and interceptor http. So, cookie should be resolved in action or router handler
  async refresh(
    deviceId: string,
    ip: string,
    userAgent: string
  ): Promise<Cookie | undefined> {
    try {
      const res = await this.httpInstance.get<number>(
        `${this.auth_url}/refresh`,
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
      return setCookies.accessToken;
    } catch (err: unknown) {
      throw err;
    }
  }
}
