import { config } from "../../config";
import { Socket } from "../../utils/socket/socket";


export const notificationSocket = new Socket<NotificationEvent>(config.ws.notification_url);

export type NotificationEvent = "notified" | "updated" | "connect" | "disconnect"