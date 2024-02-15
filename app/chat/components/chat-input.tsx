export default function ChatInput () {
    return <form className="flex flex-row rounded-lg w-full  h-full text-white">
        <textarea className="w-full rounded-lg border-none bg-transparent shadow-lg resize-none p-4 focus:border-teal focus:outline-none focus:ring-0" placeholder="add your comment">

        </textarea>
        <button className="p-4 shadow-lg " type="button">
            Send
        </button>
    </form>
}