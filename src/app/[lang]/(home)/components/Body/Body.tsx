"use client"
import { search } from "@/src/app/features/story/action";
import Loading from "@/src/app/[lang]/(home)/components/Story/Story/Loading";
import { StoryComponent } from "@/src/app/[lang]/(home)/components/Story/Story/Story";
import { StoryPost } from "@/src/app/[lang]/(home)/components/Story/Story/StoryPost";
import { Story } from "@/src/app/features/story/story";
import React, { Suspense, useEffect, useState } from "react";

export const Body = () => {
  const [posts, setPosts] = useState<Story[]>([])

  useEffect(() => {
    search({}).then((val) => setPosts(val))
  },[])

  return (
    <div className="mx-auto flex flex-col gap-4">
      <StoryPost />
      { posts &&
            posts.map((item) => <div key={item.id}><Suspense fallback={<Loading/>}><StoryComponent story={item} /></Suspense></div>)}
    </div>
  );
};
