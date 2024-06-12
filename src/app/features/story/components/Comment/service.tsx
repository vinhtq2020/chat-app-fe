import { Emotions, ShortUserInfo } from "../../story";

export interface Comment {
  id: number;
  postId: number;
  owner: ShortUserInfo;
  comment: string;
  emotions: Emotions;
  images: string[];
  reply: Comment[];
  status: 'DELETED' | 'CREATED' | 'EDITTED'
  histories: History[];
}
