interface Props {
  hidden: boolean;
}

export default function PhoneSearchBar(props: Props) {
  return (
    !props.hidden && (
      <div className="flex flex-col-reverse gap-2 min-w-64 items-center p-1">
        <form>
          <input
            type="text"
            className="z-50 px-2 py-1 outline-none rounded-full bg-white text-black border "
            placeholder="search something here ..."
          />
        </form>
        <div className="flex flex-col bg-white rounded-2xl overflow-auto border h-64 w-full p-2">
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
            <div className="h-8">test 1</div>
          
        </div>
      </div>
    )
  );
}
