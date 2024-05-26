"use client";
import { use } from "react";
import { logout } from "../../../auth/actions";
import { showAlert } from "../../../components/toast/toast";
import { AlertContext } from "../../../components/providers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MessageIcon from "../../../components/MessageIcon/MessageIcon";
import { SearchBar } from "../SearchBar/SearchBar";

export default function Header() {
  const alertContext = use(AlertContext);
  const router = useRouter();

  const onLogout = () => {
    logout(navigator.userAgent)
      .then(() => {
        showAlert(alertContext, "Success", "Logout success");
        router.refresh();
      })
      .catch((e: any) => {
        showAlert(alertContext, "Error", e.message);
      });
  };
  return (
    <>
      <nav className="z-10 flex flex-row justify-around h-14 sticky bg-transparent top-0 left-0 right-0 shadow-md items-center">
        <div className=""></div>
          <SearchBar
            list={[]}
            handleInputSearch={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        <div className="flex flex-row items-center gap-4 h-auto">
          <Link href={"/profile"}>
            <img
              src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
              alt=""
              className="w-8 h-8 rounded-full border-2 shadow-md"
            />
          </Link>
          <Link href={"/chat"}>
            <MessageIcon />
          </Link>
          <button
            className="btn-outline-none rounded-full border-white px-3 border text-white h-8 hover:bg-gray-500 shadow-md"
            type="button"
            onClick={() => onLogout()}
          >
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}
