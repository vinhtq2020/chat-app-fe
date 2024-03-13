import { ContactItem } from "./contact-item"
import "./contact.css"


interface Props {
    user: User[]

}

interface User {
    avatar?: string
    userId?: string
    username: string
}
export default function ContactList(props: Props) {

    

    return (
        <div className=" w-1/6 shadow-xl z-10 flex flex-col overflow-y-auto scroll">
            <ContactItem isTarget={true} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
            <ContactItem isTarget={false} />
        </div>

    )
}