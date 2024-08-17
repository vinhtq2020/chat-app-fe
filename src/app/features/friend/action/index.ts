"use server";

import { useFriendService } from "@/src/app/core/server/context";

export async function addFriend(friendId: string): Promise<number> {
  return useFriendService().addFriend(friendId);
}

export async function accept(requestId: string): Promise<number> {
    return useFriendService().accept(requestId)
}

export async function reject(requestId: string): Promise<number> {
  return useFriendService().reject(requestId)
}