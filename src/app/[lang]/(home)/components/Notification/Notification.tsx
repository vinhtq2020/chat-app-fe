"use client";
import { Suspense, use, useEffect, useState } from "react";
import { CloudIcon } from "./components/CloudIcon/CloudIcon";
import NotificationBoard from "./components/NotificationBoard/NotificationBoard";
import { Notification } from "@/src/app/features/notification/notification";
import { notificationSocket } from "@/src/app/core/client/socket";
import { SearchContext } from "@/src/app/core/client/store/search/SearchContext";

interface Props {
  userId: string;
  notifications: Notification[];
}

interface InternalState {
  toggle: boolean;
  notifications: Notification[];
}

interface SocketMsg {
  name: string;
  data: any;
}

const initialState: InternalState = {
  toggle: false,
  notifications: [],
};

export default function NotificationComponent(props: Props) {
  initialState.notifications = props.notifications;
  const [state, setState] = useState<InternalState>(initialState);
  const searchContext = use(SearchContext) 
  const [socketMsg, setSocketMsg] = useState<SocketMsg>({
    name: "",
    data: undefined
  })
  function handleSocketMessage(name: string, data: any) {
    switch (name) {
      case "connect":
        console.log("connected");
        break;
      case "disconnect":
        console.log("disconnected");
        break;
      case "notified":
        const notifiedItem = data as Notification;
        setState((prevState) => ({
          ...prevState,
          notifications: [...prevState.notifications, notifiedItem],
        }));
        break;
      case "updated":
        console.log("updated");
        const updateItem = data as Notification;
        const notiIdx = state.notifications.findIndex(
          (noti) => {
            return noti.id == updateItem.id
          }
        );

        if (notiIdx >= 0) {
          console.log(notiIdx);
          const newNotifications = [...state.notifications];
          newNotifications[notiIdx] = updateItem;
          
          setState((prevState) => ({
            ...prevState,
            notifications: newNotifications,
          }));
        }
        break;
      default:
        break;
    }
  }

  // work around case that state not updated in websocket of useEffect 
  useEffect(() => {
    const messageHandler = (name: string, data: any) => {
      setSocketMsg({name: name, data: data})
    };

    notificationSocket.addMessageHandler(messageHandler);

    return () => {
      notificationSocket.removeMessageHandler(messageHandler);
    };
  }, []);

  useEffect(()=>{
    handleSocketMessage(socketMsg.name, socketMsg.data)
  },[socketMsg])

  function onCloudIconToggle(e: React.MouseEvent) {
    e.preventDefault();
    setState((prev) => ({ ...prev, toggle: !prev.toggle }));
  }
  return (
    <Suspense fallback={<>Loading</>}>
      <NotificationBoard
        userId={props.userId}
        visible={state.toggle}
        notifications={state.notifications}
      />
      <div onClick={(e) => onCloudIconToggle(e)}>
        <CloudIcon notificationTotal={state.notifications.length} />
      </div>
    </Suspense>
  );
}
