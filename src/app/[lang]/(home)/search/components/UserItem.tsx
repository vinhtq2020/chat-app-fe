import { InternalizationContext } from "@/src/app/core/client/store/internalization/InternalizationContext";
import { FriendStatus, SearchItem } from "@/src/app/features/search/search";
import React, { useContext } from "react";

interface Props {
  handleAddFriend?: (userId: string) => Promise<boolean>;
  handleUnFriend?: (friendId: string) => Promise<boolean>;
  handleCancelAddFriend?: (friendId: string) => Promise<boolean>;
  user: SearchItem;
}

export const UserItem = (props: Props) => {
  const handleAddFriendOnClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.handleAddFriend && props.handleAddFriend(props.user.id ?? "");
    
  };
  const internalization = useContext(InternalizationContext);
  const handleUnFriendOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (props.handleUnFriend) {
      props.handleUnFriend && props.handleUnFriend(props.user.id ?? "");
    }
  };

  const handleCancelAddFriendOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    props.handleCancelAddFriend && props.handleCancelAddFriend(props.user.id ?? "");

  };

  const renderButton = (friendStatus?: FriendStatus) => {
    let content;
    let action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
    switch (friendStatus) {
      case "A":
        // show unfriend button
        content = internalization?.localize("unfriend");
        action = handleUnFriendOnClick
        break;
      case "C":
      case "R":
      case null:
        // show add friend button
        content = internalization?.localize("friend_request_send");
        action = handleAddFriendOnClick
        break;
      case "P":
        // show cancel friend request button
        content = internalization?.localize("friend_request_cancel");
        action = handleCancelAddFriendOnClick
        break;
      default:
        break;
    }
    return (
      <button
        type="button"
        className="ml-auto rounded-full shadow-lg block text-sm h-8 bg-[--color-glass-200] px-2 border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]"
        onClick={
         (e) => action(e)
        }
      >
        {content}
      </button>
    );
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
      {props.user.friendStatus && renderButton(props.user.friendStatus)}
    </div>
  );
};
