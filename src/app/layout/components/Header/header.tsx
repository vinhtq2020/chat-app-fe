"use client";
import { useContext } from "react";
import { logout } from "../../../auth/actions";
import { SearchInput } from "../../../home/components/search-input";
import { showAlert } from "../../../components/toast/toast";
import { AlertContext } from "../../../components/providers";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import MessageIcon from "../../../components/message-icon/message-icon";

export default function Header() {
    const alertContext = useContext(AlertContext)
    const router = useRouter()

    const onLogout = () => {
        logout(navigator.userAgent).then(() => {
            showAlert(alertContext, "Success", "Logout success")
            router.refresh()

        }).catch((e: any) => {
            showAlert(alertContext, "Error", e.message)
        }
        )
    }
    return <>
        <nav className="z-10 flex justify-around h-14 sticky bg-transparent top-0 left-0 right-0 shadow-md items-center">
            <div></div>
            <SearchInput />
            <div className="flex flex-row  items-center gap-4">
                <Link href={"/profile"} >
                    <img src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" alt="" className="w-8 h-8 rounded-full border-2" />
                </Link>
                <Link href={"/chat"}>
                    <MessageIcon/>
                </Link>
                <button className="btn-outline-none rounded-full border-white px-3 border text-white h-8 hover:bg-gray-500" type="button" onClick={() => onLogout()}>Sign Out</button>
            </div>
        </nav>
    </>
}