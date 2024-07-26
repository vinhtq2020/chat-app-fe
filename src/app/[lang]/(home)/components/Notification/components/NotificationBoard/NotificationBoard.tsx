"use client";

import { Notification } from "@/src/app/features/notification/notification";
import "../NotificationBoard/notification-board.css";
interface Props {
  visible: boolean;
  notifications: Notification[];
}

export default function NotificationBoard(props: Props) {
  function NotificationElement({ noti }: { noti: Notification }) {
    return (
      <div className="flex flex-row gap-2 items-center">
        <div className="flex-initial shadow-md items-center justify-center h-10 w-10 rounded-full bg-[--color-glass-200] border border-t-[--color-glass-500] border-l-[--color-glass-500] border-r-[--color-glass-200] border-b-[--color-glass-200]">
          <img
            className="h-full w-full rounded-full border-2 border-white"
            src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
            alt=""
            srcSet="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
          />
        </div>
        <div
          className="flex flex-1 bg-yellow-100 border border-l-[--color-glass-600] bg-scroll border-t-[--color-glass-600] border-r-[--color-glass-300] border-b-[--color-glass-300] backdrop-blur-md rounded-lg shadow-xl  "
          key={noti.id}
        >
          <p className="text-sm p-2">{noti.content}</p>
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
