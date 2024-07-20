export interface FriendService {
    addFriend(userId: string):Promise<number>
}