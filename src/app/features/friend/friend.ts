export interface FriendService {
    addFriend(userId: string):Promise<number>
}

export interface FriendRequest {
    requesteeId?: string
    action?: string
}