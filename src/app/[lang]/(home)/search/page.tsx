"use client";

import { search } from "@/src/app/features/search/actions/action";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { SearchItem } from "@/src/app/features/search/search";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { AlertContext } from "@/src/app/components/Providers";
import dynamic from "next/dynamic";
import Loading from "../loading";
import { ResponseError } from "@/src/app/utils/exception/model/response";

const UserList = dynamic(() => import("./components/UserList"));

const SearchPage = () => {
  const [list, setList] = useState<SearchItem[]>([]);
  const alertContext = useContext(AlertContext);
  const params = useSearchParams();

  useEffect(() => {
    search(params.get("q") ?? "")
      .then((result) => {
        setList(result.list);        
      })
      .catch((error: ResponseError) => {
        showAlert(alertContext, error.message, error.body);
      });
  }, [params]);

  return (
    <div className="bg-transparent flex-1 rounded-lg flex sm:flex-col md:flex-row overflow-hidden gap-4 p-4 mx-auto w-3/4">
      <div className="">
        <h1 className="text-2xl font-bold text-white text-center">Search</h1>
        {list && <UserList list={list} />}
      </div>
    </div>
  );
};

export default SearchPage;
