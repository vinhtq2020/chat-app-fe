import "./OutlineInput.css"
export interface Props {}
export default function OutlineInput(props: Props) {
  return (
    <div className="relative bg-white">
      <input
        type="text"
        placeholder=""
        className="h-20 w-96 px-6 text-4xl bg-inherit border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 focus:text-black transition duration-200"
      />
      <span className="text-4xl text-black text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text">
        Input
      </span>
    </div>
  );
}
