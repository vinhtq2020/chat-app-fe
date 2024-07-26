import { config } from "../config";
import { Socket } from "../utils/socket/socket";

export const notificationSocket = new Socket(config.ws.notification_url);
