import { getStoryService } from "../service"
import { StoryFilter } from "../story"

export const search = async (filter: StoryFilter) => {
    return getStoryService().getPosts(filter)
     
}