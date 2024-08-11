export interface FriendService {
    addFriend(userId: string):Promise<number>
    accept(requestId: string): Promise<number>
    reject(requestId: string): Promise<number>
}

export interface FriendRequest {
    requesteeId?: string
    action?: string
}