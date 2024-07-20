"use server";

import { useFriendService } from "@/src/app/core/context";

export async function addFriend(friendId: string): Promise<number> {
  return useFriendService().addFriend(friendId);
}
