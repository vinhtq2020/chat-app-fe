import { UserInfo } from "@/src/app/[lang]/auth/auth/auth";

export interface Comment {
  id: number;
  postId: number;
  owner: UserInfo;
  comment: string;
  emotions: Emotions;
  images: string[];
  reply: Comment[];
  status: 'DELETED' | 'CREATED' | 'EDITTED'
  histories: History[];
}

export interface Emotions {
  happy: Emotion;
  sad: Emotion;
  like: Emotion;
  surprise: Emotion;
  angry: Emotion;
  cry: Emotion;
}

export interface Emotion {
  name: string;
  total: number;
  users: UserInfo[];
}