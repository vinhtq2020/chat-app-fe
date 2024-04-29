import { useSearchParams } from "next/navigation"
import { useState } from "react"

interface Props {

}

interface InternalState {

}

const initialState: InternalState = {

}
function SearchPage(props: Props) {
    const [state, setState] = useState(initialState)
    const params = useSearchParams()
    return (
        <div>
            
        </div>
    )
}

export default SearchPage