"use client";
import { use, useEffect, useState } from "react";
import { CloudIcon } from "./components/CloudIcon/CloudIcon";
import NotificationBoard from "./components/NotificationBoard/NotificationBoard";
import { Notification } from "@/src/app/features/notification/notification";
import { notificationSocket } from "@/src/app/core/socket";
import { search } from "@/src/app/features/notification/action";
import { showAlert } from "@/src/app/components/Toast/Toast";
import { AlertContext } from "@/src/app/components/Providers/AlertProvider";
import { getUserId } from "@/src/app/action";

interface InternalState {
  toggle: boolean;
  notifications: Notification[];
  userId: string;
}

const initialState: InternalState = {
  toggle: false,
  notifications: [],
  userId: "",
};

export default function NotificationComponent() {
  const [state, setState] = useState(initialState);
  const alertContext = use(AlertContext);
  useEffect(() => {
    getUserId().then((id) => setState((prev) => ({ ...prev, userId: id }))).catch((e) => {
      
      showAlert(alertContext, e.message, e.message);
    });
    search()
      .then((notifications) => {
        setState((prev) => ({ ...prev, notifications: notifications }));
      })
      .catch((e) => {
        showAlert(alertContext, e.message, e.message);
      });

    const onConnected = () => {
      console.log("connected");
    };

    const onDisconnected = () => {
      console.log("disconnected");
    };

    const onNotified = (item: Notification) => {
      setState((prev) => ({
        ...prev,
        notifications: [...prev.notifications, item],
      }));
    };

    const onUpdateNotified = (item: Notification) => {
      console.log("updated notification: ", item);
      const newNotifications = [...state.notifications];
      const noti = newNotifications.findIndex((noti) => noti.id == item.id);
      newNotifications[noti] = item;
      setState((prev) => ({ ...prev, notifications: newNotifications }));
    };

    notificationSocket.on("connect", onConnected);
    notificationSocket.on("disconnect", onDisconnected);
    notificationSocket.on("notified", onNotified);
    notificationSocket.on("updated", onUpdateNotified);

    return () => {
      notificationSocket.off("notified", onNotified);
      notificationSocket.on("disconnect", onUpdateNotified);
      notificationSocket.off("connect", onConnected);
      notificationSocket.off("disconnect", onDisconnected);
    };
  }, []);
  function onCloudIconToggle(e: React.MouseEvent) {
    setState((prev) => ({ ...prev, toggle: !prev.toggle }));
  }
  return (
    <>
      <NotificationBoard
        userId={state.userId}
        visible={state.toggle}
        notifications={state.notifications}
      />
      <div onClick={(e) => onCloudIconToggle(e)}>
        <CloudIcon notificationTotal={state.notifications.length} />
      </div>
    </>
  );
}
