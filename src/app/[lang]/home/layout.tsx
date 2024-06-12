import { Suspense } from "react"
import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import Loading from "./loading"
import BottomBar from "./components/BottomBar/BottomBar"

export interface Props {
    children: React.ReactNode
}
export default function HomeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className='h-full overflow-auto' >
            {/* <div className="background absolute backdrop-blur-[150px]">

            </div> */}
            <Header/>
            < div className='w-full flex flex-row justify-between gap-4 p-4 h-[calc(100%-56px)]' >
                <Sidebar />
                <Suspense fallback={<Loading/>}>
                {children}
                </Suspense>
            </div >
            <BottomBar/>
        </div >
    )

}