import Topics, { TopicDocument } from "../../database/models/topics/topic";

//!
//!
export default class TopicsService {
  //!
  //!
  public async getTopics(): Promise<TopicDocument[]> {
    try {
      const topics = await Topics.find();

      return topics;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  }
}
