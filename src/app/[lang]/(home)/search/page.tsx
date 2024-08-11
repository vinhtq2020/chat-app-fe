"use client";

import { search } from "@/src/app/features/search/actions/action";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SearchItem } from "@/src/app/features/search/search";
import { showAlert } from "@/src/app/components/Toast/Toast";
import dynamic from "next/dynamic";
import Loading from "../loading";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import { addFriend } from "@/src/app/features/friend/action";
import { AlertContext } from "@/src/app/components/Providers/AlertProvider";

const UserList = dynamic(() => import("./components/UserList"));

const SearchPage = () => {
  const [list, setList] = useState<SearchItem[]>([]);
  const alertContext = useContext(AlertContext);
  const params = useSearchParams();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function handleAddFriend(friendId: string): Promise<boolean> {
    
    try {
      const res = await addFriend(friendId);
      if (res > 0) {
        const newList = list.map((item) => {
          if (item.id == friendId) {
            item.friendStatus = "pending";
          }
          return item;
        });
        setList(newList);
      }
      return res > 0;
    } catch (err: any) {
      showAlert(alertContext, err.message, err.body);
      return false;
    }
  }

  useEffect(() => {
    setLoading(true);
    search(params.get("q") ?? "")
      .then((result) => {
        setList(result.list);
      })
      .catch((error: ResponseError) => {
        showAlert(alertContext, error.message, error.body);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  return (
    <div className="bg-transparent flex-1 rounded-lg flex sm:flex-col md:flex-row overflow-hidden gap-4 p-4 mx-auto w-3/4">
      <div className="">
        <h1 className="text-2xl font-bold text-white text-center">Search</h1>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          list && <UserList list={list} handleAddFriend={handleAddFriend} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
