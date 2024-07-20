"use client";
import { useEffect, useState } from "react";
import "../CloudIcon/cloud-icon.css";
import EventEmitter from "events";
import { Socket } from "../../utils/socket/socket";
import { config } from "../../config";

export const CloudIcon = () => {
  const [notiCount, setNotiCount] = useState(0);
  useEffect(() => {
    const notificationSocket = new Socket(config.ws.notification_url);
    const onConnected = () => {
      console.log("connected");
    };

    const onDisconnected = () => {
      console.log("disconnected");
    };

    const onNotified = () => {
      setNotiCount(notiCount + 1);
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
  return (
    <div className="cloud relative w-16 h-16">
      <div
        className={`sun absolute w-6 h-6 ${
          notiCount == 0 ? "bg-yellow-300" : "bg-red-500 text-white"
        } rounded-full bottom-8 left-2 shadow-lg text-center`}
      >
        1
      </div>
      <div className="cloud-child absolute w-16 h-8 bg-white rounded-full shadow-lg bottom-1">
        <div className="absolute flex flex-row gap-1 bottom-0 top-0 left-0 right-0 m-auto items-center justify-center z-20">
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="mail-dot  w-2 h-2 rounded-full bg-blue-400"></div>
        </div>
      </div>
      <div className="cloud-child absolute w-6 h-6 bg-white rounded-full left-2 bottom-4"></div>
      <div className="cloud-child absolute w-8 h-8 bg-white rounded-full left-6 bottom-4"></div>
    </div>
  );
};
