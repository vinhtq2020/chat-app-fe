import Sidebar from "../../components/Sidebar/Sidebar"
import Header from "./components/Header/Header"

export interface Props {
    children: React.ReactNode
}
export default function HomeLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className='h-full' >
            <Header />
            < div className='w-full flex flex-row justify-between gap-4 p-4 h-[calc(100%-56px)]' >
                <Sidebar />
                {children}
                <Sidebar />
            </div >
        </div >
    )

}