import mongoose from "mongoose";
import TopicsModel, {
  TopicDocument,
  TopicEnums,
} from "../../database/models/topics/topic";

export const populateTopicsCollection = async (): Promise<void> => {
  try {
    //! CHECK IF COLLECTION EXISTS
    const collectionExists = await mongoose.connection.db
      .listCollections({ name: "topics" })
      .next();

    if (!collectionExists) {
      //! COLLECTION DOESN'T EXIST, CREATE AND POPULATE IT
      const topics: TopicDocument[] = [];

      //! CREATE DOCUMENTS FROM EACH ENUM
      Object.values(TopicEnums).forEach((topicName) => {
        const topic = new TopicsModel({ name: topicName, posts: [] });
        topics.push(topic);
      });

      //! INSERT THE DOCUMENT INTO THE COLLECTION
      await TopicsModel.insertMany(topics);
      console.log("Topics collection created and populated!");
    } else {
      //! COLLECTION EXISTS, CHECK IF IT'S EMPTY
      const count = await TopicsModel.countDocuments();

      if (count === 0) {
        //! COLLECTION EXISTS BUT IS EMPTY, POPULATE IT
        const topics: TopicDocument[] = [];

        Object.values(TopicEnums).forEach((topicName) => {
          const topic = new TopicsModel({ name: topicName, posts: [] });
          topics.push(topic);
        });

        await TopicsModel.insertMany(topics);
        console.log("Topics collection populated!");
      } else {
        console.log("Topics collection is already populated.");
      }
    }
  } catch (error) {
    console.error("Error populating topics collection:", error);
  }
};
