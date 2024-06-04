import ChatInput from "./components/chat-input"
import ChatMessage from "./components/chat-message"
import ContactList from "./components/contact-list"

const ChatPage = () => {
    return (
        <div className="bg-transparent flex-1 rounded-lg flex flex-row overflow-hidden gap-4 p-4">
            <ContactList user={[]} />
            <div className="flex flex-col w-5/6 items-center h-full">
                <div className=" w-full flex flex-col p-4 shadow-xl h-5/6 rounded-lg">
                    <ChatMessage id={""} owner={false} content={"chat 1"} name={"Truong Quang Vinh"} />
                    <ChatMessage id={""} owner={true} content={"chat 1"} name={"Truong Quang Vinh"} />
                    <ChatMessage id={""} owner={true} content={"chat 1"} name={"Truong Quang Vinh"} />
                    <ChatMessage id={""} owner={true} content={"chat 1"} name={"Truong Quang Vinh"} />
                </div>
                <div className="h-1/6 w-full pt-4">
                    <ChatInput/>
                </div>
            </div>


        </div>)
}

export default ChatPage