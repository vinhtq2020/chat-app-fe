"use client";

import { search } from "@/src/app/features/search/actions/action";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { SuggestionSearchItem } from "@/src/app/features/search/search";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { AlertContext } from "@/src/app/components/Providers";
import dynamic from "next/dynamic";
import Loading from "../loading";

const UserList = dynamic(() => import("./components/UserList/UserList"));

const SearchPage = () => {
  const [list, setList] = useState<SuggestionSearchItem[]>([]);
  const alertContext = useContext(AlertContext);
  const params = useSearchParams();

  useEffect(() => {
    search(params.get("q") ?? "")
      .then((result) => {
        setList(result.list);
      })
      .catch((error) => {
        showAlert(alertContext, "error", error);
      });
  }, []);

  return (
    <div className="bg-transparent flex-1 rounded-lg flex sm:flex-col md:flex-row overflow-hidden gap-4 p-4 mx-auto w-3/4">
      <div className="w-1/3 mx-auto">
        <h1 className="text-2xl font-bold text-white text-center">Search</h1>
        {list && <Suspense fallback={<Loading/>}><UserList list={list} /></Suspense>}
      </div>
    </div>
  );
};

export default SearchPage;
