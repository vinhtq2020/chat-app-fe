import { SearchItem } from "@/src/app/features/search/search";
import { list } from "postcss";
import { UserItem } from "./UserItem";
import { Suspense } from "react";
import Loading from "../../loading";

interface Props {
  list: SearchItem[];
  handleAddFriend?: (userId: string) => Promise<boolean>;
}
function UserList({ list, handleAddFriend }: Props) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-clip p-4">
      {list.map((item) => (
        <Suspense fallback={<Loading/>} key={item.id}><UserItem user={item}  handleAddFriend={handleAddFriend}/></Suspense>
      ))}
    </div>
  );
}

export default UserList;
