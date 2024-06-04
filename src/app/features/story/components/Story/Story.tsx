"use client";

import { Author, Story } from "../../story";
import StoryDetailComponent from "../StoryDetail/StoryDetail";
import { timeSince, useDate } from "@/src/app/hooks/useDate";

interface Props {
   story: Story
}

export const StoryComponent = (props: Props) => {
  return (
    <div className="relative max-h-[400px] w-1/2 mx-auto bg-[--color-glass-100] rounded-lg p-4 shadow-lg border border-l-[--color-glass-500] backdrop-blur-md border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
      <div className="inline-flex flex-row gap-2 min-w-[200px] bg-[--color-glass-200] rounded-full p-2 border shadow-md border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
        <div className="flex shadow-md items-center justify-center h-12 w-12 rounded-full bg-[--color-glass-200] border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <img
            className="h-full w-full rounded-full border-2 border-white"
            src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
            alt=""
            srcSet="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
          />
        </div>
        <div className="flex flex-col tracking-wide text-black text-sm my-auto">
          <span className="font-bold">{props.story?.author?.username}</span>
          <span>{timeSince(props.story?.createdAt ?? new Date())}</span>
        </div>
      </div>
      <StoryDetailComponent content="" />
      <div className="flex flex-row m-0 mt-4 gap-3 tracking-wide">
        <div className="flex justify-center items-center border rounded-full h-8 min-w-8 align-center px-4 py-2 font-normal text-black shadow-md bg-[--color-glass-200] border-l-[--color-glass-500] border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <label>Like</label>
        </div>
        <div className="flex justify-center items-center border rounded-full h-8 min-w-8 align-center px-4 py-2 font-normal text-black shadow-md bg-[--color-glass-200] border-l-[--color-glass-500] border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <label>Share</label>
        </div>
        <div className="flex justify-center items-center border rounded-full h-8 min-w-8 align-center px-4 py-2 font-normal text-black shadow-md bg-[--color-glass-200] border-l-[--color-glass-500] border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <label>Comment</label>
        </div>
      </div>
      <div className="flex flex-col rounded-md border tracking-wide text-sm  mt-4 p-4 gap-4 bg-[--color-glass-200]  border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1 items-center">
            <div className="w-6 h-6 rounded-full  bg-yellow-300 shadow-md"></div>
            <span className="">100</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="w-6 h-6 rounded-full  bg-blue-300 shadow-md"></div>
            <span>100</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="w-6 h-6 rounded-full  bg-green-300 shadow-md"></div>
            <span>100</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          {/* <Comment comment={undefined}/> */}
        </div>
      </div>
    </div>
  );
};
