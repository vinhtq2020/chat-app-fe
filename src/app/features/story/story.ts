export interface StoryService {
  getStories(): Story[];
}

export interface Story {
  id?: string;
  author?: ShortUserInfo;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  history?: string;
  content?: string;
  media?: "images" | "video";
  comment?: string;
}

interface Expression {
  emotions: Emotions;
  shared: {
    total: number;
    users: ShortUserInfo[];
  };
}

interface Emotions extends Record<EmotionType, Emotion> { 
}

interface Emotion {
  total: number;
  users: ShortUserInfo[];
}

type EmotionType = "like" | "hate" | "suprised" | "cry"

interface ShortUserInfo {
  authorId: string;
  username: string;
  avatarURL: string;
}
