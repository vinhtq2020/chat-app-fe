"use client";

import { search } from "@/src/app/features/search/action/action";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { showAlert } from "@/src/app/components/Toast/Toast";
import dynamic from "next/dynamic";
import Loading from "../loading";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import { addFriend, cancel } from "@/src/app/features/friend/action";
import { AlertContext } from "@/src/app/core/client/store/alert/AlertContext";
import { SearchContext } from "@/src/app/core/client/store/search/SearchContext";

const UserList = dynamic(() => import("./components/UserList"));

const SearchPage = () => {
  const alertContext = useContext(AlertContext);
  const searchContext = useContext(SearchContext);
  const params = useSearchParams();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function handleAddFriend(friendId: string): Promise<boolean> {
    try {
      const res = await addFriend(friendId);
      if (res > 0) {
        const newList = searchContext?.state.list.map((item) => {
          if (item.id == friendId) {
            item.friendStatus = "P";
          }
          return item;
        });

        searchContext?.searchDispatch({
          type: "SEARCH",
          payload: { list: newList },
        });
      }
      return res > 0;
    } catch (err: any) {
      showAlert(alertContext, err.message, err.body);
      return false;
    }
  }

  async function handleUnFriend(friendId: string): Promise<boolean> {
    try {
      const res = await addFriend(friendId);
      if (res > 0) {
        const newList = searchContext?.state.list.map((item) => {
          if (item.id == friendId) {
            item.friendStatus = "A";
          }
          return item;
        });

        searchContext?.searchDispatch({
          type: "SEARCH",
          payload: { list: newList },
        });
      }
      return res > 0;
    } catch (err: any) {
      showAlert(alertContext, err.message, err.body);
      return false;
    }
  }

  async function handleCancelAddFriend(friendId: string): Promise<boolean> {
    try {
      const res = await cancel(friendId);
      if (res > 0) {
        const newList = searchContext?.state.list.map((item) => {
          if (item.id == friendId) {
            item.friendStatus = "P";
          }
          return item;
        });

        searchContext?.searchDispatch({
          type: "SEARCH",
          payload: { list: newList },
        });
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
        searchContext?.searchDispatch({
          type: "SEARCH",
          payload: { list: result.list },
        });
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
          searchContext &&
          searchContext.state.list && (
            <UserList
              list={searchContext.state.list}
              handleAddFriend={handleAddFriend}
              handleCancelAddFriend={handleCancelAddFriend}
              handleUnFriend={handleUnFriend}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
