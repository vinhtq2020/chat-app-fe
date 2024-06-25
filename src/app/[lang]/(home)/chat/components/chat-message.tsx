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
            <img className="rounded-full h-16 w-16" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Truong Quang Vinh" />
            <div className={`min-h-(32px) ${!props.owner ? 'bg-slate-300' : 'bg-blue-500'}  items-center ${props.owner ? `rounded-tr-2xl rounded-bl-2xl`:`rounded-tl-2xl rounded-br-2xl`} min-w-32 max-w-16 p-3 text-white bold`}>
                <h4 className="text-wrap flex h-full justify-center">{props.content}</h4>
            </div>
        </ div>

            )
}