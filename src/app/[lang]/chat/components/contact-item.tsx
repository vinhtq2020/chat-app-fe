interface Props {
    isTarget: boolean
}
export const ContactItem = (props: Props) => {
    return <div className="">
        <div className={`contact-item flex flex-row justify-end items-center ${props.isTarget ? 'bg-blue-500 rounded-bl-full shadow-lg' : ''}  p-2 overflow-hidden gap-4`}>
            <div className="flex flex-col flex-1 ml-4">
                <h4 className={`username ${props.isTarget ? "text-white " : ""} font-semibold text-xs hover:text-white`}>Truong Quang Vinh</h4>
                <h4 className={`new-message ${props.isTarget ? "text-white" : ""} font-light text-xs hover:text-white`}> Something to say ...</h4>
            </div>
            <img className="h-12 w-12 rounded-full " src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/240818580_980225366093824_3076888226046381633_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5740b7&_nc_ohc=FWkAXelIOycAX_3IA4e&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBwqVp24yRVbXfMVmmf-OuFEPlMBAqaeagWs6_sOF5pwA&oe=65D244CB" alt="" />

        </div>
    </div >
}