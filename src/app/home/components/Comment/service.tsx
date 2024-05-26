export interface Comment {
  Comment: string;
  Emotion: Emotion;
  Images: string[];
  Reply: Comment[];
}

export interface Emotion {
  Happy: number;
  Sad: number;
  Like: number;
  Surprise: number;
  Angry: number;
  Cry: number;
}
