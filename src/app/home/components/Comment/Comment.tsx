export interface Props {}

export const Comment = () => {
  return (
    <>
      <div className="flex flex-shrink-0 shadow-md items-center justify-center h-12 w-12 rounded-full bg-[--color-glass-200] border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
        <img
          className="h-full w-full rounded-full border-2 border-white"
          src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
          alt=""
          srcSet="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
        />
      </div>

      <div className=" text-black inline-flex flex-col bg-[--color-glass-300] rounded-lg p-2 border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
        <label htmlFor="" className="font-bold">
          Username
        </label>
        <span className="">
          Something to say Something to say Something to say Something to say
          Something to say
        </span>
      </div>
    </>
  );
};
