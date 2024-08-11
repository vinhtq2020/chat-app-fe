"use client";

import { Notification } from "@/src/app/features/notification/notification";
import "../NotificationBoard/notification-board.css";
import { accept } from "@/src/app/features/friend/action";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { use } from "react";
import { AlertContext } from "@/src/app/components/Providers/AlertProvider";
import { internalizationContext } from "@/src/app/components/Providers/InternalizationProvider";
import { AuthContext } from "@/src/app/components/Providers";

interface Props {
  visible: boolean;
  notifications: Notification[];
  userId: string;
}

export default function NotificationBoard(props: Props) {
  function NotificationElement({ noti }: { noti: Notification }) {
    const internalization = use(internalizationContext);
    const alertContext = use(AlertContext);
    const onAcceptClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (noti.requester && noti.requester.requestId) {
        accept(noti.requester.requestId).catch((err) =>
          showAlert(alertContext, "Error", err)
        );
      }
    };

    const onRejectClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (noti.requester && noti.requester.requestId) {
        accept(noti.requester.requestId).catch((err) =>
          showAlert(alertContext, "Error", err)
        );
      }
    };

    const renderContent = () => {
      let contentString = noti.content;
      if (internalization) {
        switch (noti.content) {
          case "add_friend":
            contentString = internalization?.localize(
              noti.content,
              noti.requester.name
            );

            break;
          case "accept_add_friend":
            contentString = internalization.localize(
              noti.content,
              noti.requester.name
            );

            break;
          case "reject_add_friend":
            contentString = internalization.localize(
              noti.content,
              noti.requester.name
            );

            break;
          case "accept_add_friended":
            contentString = internalization.localize(
              noti.content,
              noti.requester.name
            );
            break;
          default:
            break;
        }
      }

      return contentString;
    };

    const renderColor = () => {
      
      if (props.userId) {
        const subscriber = noti.subscribers.find(
          (subscriber) => subscriber.id == props.userId
        );        
        if (subscriber) {
          return subscriber.readed ? "bg-yellow-200 hover:bg-yellow-300" : "bg-yellow-100  hover:bg-yellow-200";
        }
        return "";
      }
    };
    return (
      <div className={`flex flex-row gap-2 items-center rounded-lg  ${renderColor()} p-2 border hover:border-black`}>
        <div className="flex-initial shadow-md items-center justify-center h-8 w-8 rounded-full bg-[--color-glass-200] border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <img
            className="h-full w-full rounded-full border-2 border-white"
            src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
            alt=""
            srcSet="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
          />
        </div>
        <div
          className={`flex flex-1 flex-col gap-2 p-2 border border-l-[--color-glass-600] bg-scroll border-t-[--color-glass-600] border-r-[--color-glass-300] border-b-[--color-glass-300] backdrop-blur-md rounded-lg shadow-xl`}
          key={noti.id}
        >
          <p className="text-sm">{renderContent()}</p>
          {noti.type == "addfriend" && (
            <div className="flex flex-row gap-2 justify-center">
              <div
                className="rounded-full w-8 h-8 text-white bg-green-400 shadow-md p-2 flex items-center justify-center cursor-pointer"
                onClick={(e) => onAcceptClick(e)}
              >
                v
              </div>
              <div
                className="rounded-full w-8 h-8 text-white bg-red-400 shadow-md p-2 flex items-center justify-center  cursor-pointer"
                onClick={(e) => onRejectClick(e)}
              >
                X
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-[visibility,_opacity] flex flex-col delay-100 duration-300 bg-[--color-glass-100] p-2 ease-in-out shadow-lg rounded-xl over overflow-y-auto min-h-40 max-h-80 w-64 gap-2 border border-l-[--color-glass-500] overflow-clip no-scroll  border-t-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200] backdrop-blur-md ${
        props.visible ? "visible opacity-1" : "invisible opacity-0"
      }`}
    >
      {props.notifications.length > 0 ? (
        props.notifications.map((item) => (
          <NotificationElement noti={item} key={item.id} />
        ))
      ) : (
        <div className="text-justify m-auto text-white w-25 text-sm">
          Tạm thời không có thông báo mới
        </div>
      )}
    </div>
  );
}
