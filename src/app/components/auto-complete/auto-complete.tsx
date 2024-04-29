import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
interface Props {

}

interface InternalState {
    q?: string
}

const internalState: InternalState = {

}

export const AutoComplete = (props: Props) => {
    const [state, setState] = useState(internalState)
    useEffect(()=> {
        if (state.q) {
            
            setState((prev)=>({...prev, }))
            return 
        }
    },[state.q])
    return (
        <div className="search-container">
            <div className="search-inner">
                <input type="text" value={state.q} />
                <button type="submit">Search</button>
            </div>
        </div>
    )
}