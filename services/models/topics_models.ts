import { TopicDocument } from "database/models/topics/topic";

export interface UserTopicsCreationParams {
  userID: string;
  topics: TopicDocument[];
}
