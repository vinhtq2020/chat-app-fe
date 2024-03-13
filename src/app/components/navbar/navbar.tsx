import { SearchInput } from "../../home/components/search-input";

export default function Navbar() {
    return <>
        <nav className="z-10 flex h-14 sticky bg-transparent top-0 left-0 right-0 shadow-md justify-center items-center">
            <SearchInput/>
        </nav>
    </>
}