export default function Sidebar() {
    return (
        <>
            <section className="fixed top-24 md:flex flex-col w-48 justify-start gap-4 sm:hidden h-full">
                <div className=" bg-[--color-glass-100] shadow-lg border backdrop-blur-md border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200] rounded-lg p-4">
                    <div>
                        <div className="py-2">
                            Profile
                        </div>
                        <div className="py-2">
                            Find Friend
                        </div>
                        <div className="py-2">
                            Group
                        </div>
                        <div className="py-2">
                            Video
                        </div>
                    </div>

                </div>

                <div className=" bg-[--color-glass-100] border backdrop-blur-md shadow-lg  border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200] rounded-lg p-4">
                    <div>
                        <div className="py-2">
                            Profile
                        </div>
                        <div className="py-2">
                            Find Friend
                        </div>
                        <div className="py-2">
                            Group
                        </div>
                        <div className="py-2">
                            Video
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}