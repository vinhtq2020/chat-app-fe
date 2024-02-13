export interface Props {
    children: React.ReactElement
    hidden: boolean
    closeModal: () => void
}

interface InternalState {
}

export const Modal = (props: Props) => {
    const onCloseModal = (e: React.MouseEvent) => {
        e.preventDefault()
        
        props.closeModal()
    }
    return (
        <div id="modal" hidden={props.hidden} aria-labelledby="modal-title" role="dialog" tabIndex={-1} aria-modal={true}>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>
            <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full max-h-full md:inset-0" >
                <div className="relative w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-4">
                        {/* Modal header */}
                        <div className="flex items-center  rounded-lg-t">
                            <button onClick={e => onCloseModal(e)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}