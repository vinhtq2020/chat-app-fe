interface Props {
    id: string
    avatar?: string
    name: string
    owner: boolean
    content: string
    createdAt?: Date
    UpdatedAt?: Date
}

export default function ChatMessage(props: Props) {
    return (
        <div className={`flex flex-row gap-2 items-center p-2 ${props.owner ? 'flex-row-reverse' : ''}`} >
            <img className="rounded-full h-16 w-16" src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/240818580_980225366093824_3076888226046381633_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=110&ccb=1-7&_nc_sid=5740b7&_nc_ohc=FWkAXelIOycAX_3IA4e&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfBwqVp24yRVbXfMVmmf-OuFEPlMBAqaeagWs6_sOF5pwA&oe=65D244CB" alt="Truong Quang Vinh" />
            <div className={`min-h-(32px) ${!props.owner ? 'bg-slate-300' : 'bg-blue-500'}  items-center ${props.owner ? `rounded-tr-2xl rounded-bl-2xl`:`rounded-tl-2xl rounded-br-2xl`} min-w-32 max-w-16 p-3 text-white bold`}>
                <h4 className="text-wrap flex h-full justify-center">{props.content}</h4>
            </div>
        </ div>

            )
}