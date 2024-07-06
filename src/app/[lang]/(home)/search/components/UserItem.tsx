import { SearchItem } from "@/src/app/features/search/search";
import React from "react";

interface Props {
  handleAddFriend?: () => boolean;
  handleUnFriend?: () => boolean;
  handleCancelAddFriend?: () => boolean;
  user: SearchItem;
}

export const UserItem = (props: Props) => {
  const handleAddFriendOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (props.handleAddFriend) {
      props.handleAddFriend();
    }
    alert("ok");
  };

  const handleUnFriendOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (props.handleUnFriend) {
      props.handleUnFriend();
    }
  };

  const handleCancelAddFriendOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (props.handleCancelAddFriend) {
      props.handleCancelAddFriend();
    }
  };

  return (
    <div
      className="flex flex-row gap-2 text-white rounded-lg items-center shadow-lg p-2 bg-[--color-glass-100]  border border-l-[--color-glass-500] backdrop-blur-md border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]"
      key={props.user.id}
    >
      <div className="flex shadow-md items-center justify-center h-12 w-12 rounded-full bg-[--color-glass-200] border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
        <img
          className="h-full w-full rounded-full border-2 border-white"
          src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
          alt=""
          srcSet="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold text-lg">{props.user.name}</div>
        <div className="font-normal text-sm">{props.user.description}</div>
      </div>
      {props.user.friendStatus && (
        <button
          type="button"
          className="ml-auto rounded-full shadow-lg block text-sm h-8 bg-[--color-glass-200] px-2 border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]"
          onClick={
            props.user.friendStatus === "none"
              ? (e) => handleAddFriendOnClick(e)
              : (e) => handleCancelAddFriendOnClick(e)
          }
        >
          {props.user.friendStatus === "none" ? "Kết bạn": props.user.friendStatus === "pending" ? "Huỷ lời mời": "Hủy kết bạn" }
        </button>
      )}
    </div>
  );
};
