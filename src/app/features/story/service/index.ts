import { Story, StoryFilter, StoryService } from "../story";

export class StoryClient implements StoryService {
  constructor() {
    this.getPosts = this.getPosts.bind(this);
    this.delay = this.delay.bind(this);
  }

  async getPosts(filter: StoryFilter): Promise<Story[]> {
    await this.delay(1000);
    return [{id:"1"},{id:"2"},{id:"3"},{id:"4"}];
  }
  delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }
}

let storyService = new StoryClient();

export function getStoryService(): StoryService {
  if (storyService == null) {
    storyService = new StoryClient();
  }
  return storyService;
}
