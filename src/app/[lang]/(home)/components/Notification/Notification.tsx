"use client";
import { useEffect, useState } from "react";
import { CloudIcon } from "./components/CloudIcon/CloudIcon";
import NotificationBoard from "./components/NotificationBoard/NotificationBoard";
import { Notification } from "@/src/app/features/notification/notification";
import { notificationSocket } from "@/src/app/core/socket";

interface InternalState {
  toggle: boolean;
  notifications: Notification[];
}

const initialState: InternalState = {
  toggle: false,
  notifications: [],
};

export default function NotificationComponent() {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const onConnected = () => {
      console.log("connected");
    };

    const onDisconnected = () => {
      console.log("disconnected");
    };

    const onNotified = (item: Notification) => {
      setState((prev) => ({...prev, notifications: [...prev.notifications, item]}))      
    };

    notificationSocket.on("connect", onConnected);

    notificationSocket.on("disconnect", onDisconnected);

    notificationSocket.on("notified", onNotified);

    return () => {
      notificationSocket.off("notified", onNotified);
      notificationSocket.off("connect", onConnected);
      notificationSocket.off("disconnect", onDisconnected);
    };
  }, []);
  function onCloudIconToggle(e: React.MouseEvent) {
    setState((prev) => ({ ...prev, toggle: !prev.toggle }));
  }
  return (
    <>
      <NotificationBoard visible={state.toggle} notifications={state.notifications} />
      <div onClick={(e) => onCloudIconToggle(e)}>
        <CloudIcon notificationTotal={state.notifications.length} />
      </div>
    </>
  );
}
