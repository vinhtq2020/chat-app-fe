export const SearchInput = () => {
    return (
        <div className="inline-flex rounded-full border items-center p-2 gap-1 border-white">
            <button className="h-5 w-5">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="strokeWhite stroke-2">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </g>
                </svg>
            </button>
            <input className="text-base border-none outline-none bg-transparent text-white placeholder-white" type="text" placeholder="Tìm kiếm"/>
        </div>
    )
}