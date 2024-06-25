import { search } from "@/src/app/features/story/action";
import { StoryComponent } from "@/src/app/features/story/components/Story/Story";
import { StoryPost } from "@/src/app/features/story/components/StoryPost/StoryPost";
import { getStoryService } from "@/src/app/features/story/service";
import { Story } from "@/src/app/features/story/story";
import { fetchData } from "next-auth/client/_utils";
import { lazy, useEffect, useState } from "react";


export const Body = async () => {

  const posts = await search({});
  // setState((prevState) => ({
  //   ...prevState,
  //   stories: posts,
  // }));

  return (
    <div className="mx-auto flex flex-col gap-4">
      <StoryPost/>
      {posts &&
        posts.map((item) => <StoryComponent key={item.id} story={item} />)}
    </div>
  );
};
