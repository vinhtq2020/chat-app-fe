import { Story, StoryService } from "../story";

export class StoryClient implements StoryService {
  constructor() {
    this.getStories = this.getStories.bind(this);
  }

  getStories():Story[] {
    return []
  }
}
