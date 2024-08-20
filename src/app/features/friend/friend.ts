export interface FriendService {
    addFriend(friendId: string):Promise<number>
    accept(requestId: string): Promise<number>
    reject(requestId: string): Promise<number>
    cancel(friendId: string): Promise<number>
    unfriend(friendId: string): Promise<number>
}

export interface FriendRequest {
    requesteeId?: string
    action?: string
}