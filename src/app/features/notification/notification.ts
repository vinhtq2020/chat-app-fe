export interface Notification {
  id?: string;
  title?: string;
  content?: string;
  requestor?: Requestor;
  type?: NotificationType;
  url?: string;
  createdAt: string;
  createdBy: string;
  isRead?: boolean;
}

interface Requestor {
  id?: string;
  name?: string;
  avatarURL?: string;
}

type NotificationType = "inform" | "invite"