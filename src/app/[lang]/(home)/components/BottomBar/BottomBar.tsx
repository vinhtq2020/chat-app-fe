"use client";
import { use, useState } from "react";
import Link from "next/link";
import { logout } from "@/src/app/features/auth/action";
import { useRouter } from "next/navigation";
import { AlertContext, LoadingScreenContext } from "@/src/app/components/Providers";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { ResponseError } from "@/src/app/utils/exception/model/response";
import PhoneSearchBar from "../PhoneSearchBar/PhoneSearchBar";

interface InternalState {
  showSearchBar: boolean;
}

const initialState = {
  showSearchBar: false,
};

export default function BottomBar() {
  const [state, setState] = useState<InternalState>(initialState);
  const alertContext = use(AlertContext);
  const loadingContext = use(LoadingScreenContext);
  const router = useRouter();
  const onClickLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loadingContext) {
      loadingContext.isLoading = true;
    }
    logout(navigator.userAgent)
      .then((res) => {
        if (res > 0) {
          router.refresh();
        }
      })
      .catch((e: ResponseError) => {
        showAlert(alertContext, e.name, e.message);
      })
      .finally(() => {
        if (loadingContext) {
          loadingContext.isLoading = true;          
        }
      });
  };
  return (
    <div className="fixed z-50 left-[50%] translate-x-[-50%] mx-auto md:hidden bottom-[64px] flex flex-col items-center">
      <div className="mb-4 mx-auto">
        <PhoneSearchBar hidden={!state.showSearchBar} />
      </div>
      <div className=" flex flex-row bg-white h-10 w-auto overflow-hidden shadow-md rounded-full p-1 gap-4 mx-auto ">
        <Link href={"/"}>
          <div className="rounded-full w-8 h-8 bg-blue-300 shadow-md "></div>
        </Link>
        <div
          className="rounded-full w-8 h-8 bg-red-300 shadow-md "
          onClick={() =>
            setState((prev) => ({
              ...prev,
              showSearchBar: !prev.showSearchBar,
            }))
          }
        >
          <div className="flex items-center rounded-full justify-center p-1 shadow-md w-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-2 h-full w-full stroke-white shadow-sm"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <Link
          className="rounded-full w-8 h-8 bg-yellow-300 shadow-md "
          href={"/chat"}
        ></Link>
        <button
          className="rounded-full w-8 h-8 bg-green-300 shadow-md "
          onClick={(e) => onClickLogout(e)}
        ></button>
      </div>
    </div>
  );
}
