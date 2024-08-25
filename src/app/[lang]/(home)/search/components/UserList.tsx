import { SearchItem } from "@/src/app/features/search/search";
import { UserItem } from "./UserItem";
import { Suspense } from "react";
import Loading from "../../loading";

interface Props {
  userId?: string;
  list: SearchItem[];
  handleAddFriend?: (userId: string) => Promise<boolean>;
  handleUnFriend?: (friendId: string) => Promise<boolean>;
  handleCancelAddFriend?: (requestId: string) => Promise<boolean>;
}
function UserList({
  list,
  handleAddFriend,
  handleUnFriend,
  handleCancelAddFriend,
  userId,
}: Props) {

  return (
    <div className="flex flex-col gap-4 h-full overflow-clip p-4">
      {list.map((item) => {
        switch (item.type) {
          case "user":
            return (
              <Suspense fallback={<Loading />} key={item.id}>
                <UserItem
                userId={userId}
                  item={item}
                  handleAddFriend={handleAddFriend}
                  handleUnFriend={handleUnFriend}
                  handleCancelFriendRequest={handleCancelAddFriend}
                />
              </Suspense>
            );
          default:
            return <></>
        }
      })}
    </div>
  );
}

export default UserList;
