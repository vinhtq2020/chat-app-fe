"use client";
import { useState } from "react";
import PhoneSearchBar from "../PhoneSearchBar/PhoneSearchBar";
import Link from "next/link";

interface InternalState {
  showSearchBar: boolean;
}

const initialState = {
  showSearchBar: false,
};

export default function BottomBar() {
  const [state, setState] = useState<InternalState>(initialState);
  return (
    <div className="fixed z-50 inset-x-0 mx-auto md:hidden bottom-[64px] flex flex-col items-center">
      <div className="mb-4 mx-auto">
        <PhoneSearchBar hidden={!state.showSearchBar} />
      </div>
      <div className=" flex flex-row bg-white h-10 w-auto overflow-hidden shadow-md rounded-full p-1 gap-4 mx-auto ">
        <div className="rounded-full w-8 h-8 bg-blue-300 shadow-md "></div>
        <div
          className="rounded-full w-8 h-8 bg-red-300 shadow-md "
          onClick={() =>
            setState((prev) => ({
              ...prev,
              showSearchBar: !prev.showSearchBar,
            }))
          }
        ></div>
        <Link className="rounded-full w-8 h-8 bg-yellow-300 shadow-md " href={"/chat"}></Link>
      </div>
    </div>
  );
}
