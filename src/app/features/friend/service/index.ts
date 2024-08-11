import { HttpService } from "@/src/app/utils/http/http-default";
import { FriendService } from "../friend";
import {
  ContentType,
  getCookieHeader,
  HeaderType,
} from "@/src/app/utils/http/headers";

export class FriendClient implements FriendService {
  constructor(
    private httpInstance: HttpService,
    private friend_url: string,
    private friend_request_url: string
  ) {
    this.addFriend = this.addFriend.bind(this);
  }
  async accept(requestId: string): Promise<number> {
    const res = await this.httpInstance.patch<number>(
      `${this.friend_request_url}/${requestId}/accept`,
      {},
      {
        headers: {
          [HeaderType.contentType]: ContentType.applicationJson,
          [HeaderType.cookie]: getCookieHeader(),
        },
        cache: "no-cache",
      }
    );
    return res.body;
  }
  async reject(requestId: string): Promise<number> {
    const res = await this.httpInstance.patch<number>(
      `${this.friend_request_url}/${requestId}/reject`,
      {},
      {
        headers: {
          [HeaderType.contentType]: ContentType.applicationJson,
          [HeaderType.cookie]: getCookieHeader(),
        },
        cache: "no-cache",
      }
    );
    return res.body;
  }

  async addFriend(requesteeId: string): Promise<number> {
    const res = await this.httpInstance.post<number>(
      this.friend_request_url,
      {
        requesteeId: requesteeId,
      },
      {
        headers: {
          [HeaderType.contentType]: ContentType.applicationJson,
          [HeaderType.cookie]: getCookieHeader(),
        },
        cache: "no-cache",
      }
    );
    return res.body;
  }
}
