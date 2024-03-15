import mongoose from "mongoose";
import {
  ListenToSocketParams,
  MessageListenersParams,
} from "../services/models/sockets_models";
import SocketsService from "../services/sockets/sockets_service";
import PostsModel, { PostDocument } from "./models/posts/posts";

export const listenForNewPosts = async (
  params: ListenToSocketParams
): Promise<void> => {
  try {
    const collectionExists = await mongoose.connection.db
      .listCollections({ name: "posts" })
      .next();

    if (!collectionExists) {
      console.log("Posts collection does not exist!");
    } else {
      //! COLLECTION EXISTS
      const changeStream = PostsModel.watch();

      changeStream.on("change", async (change: any) => {
        if (change.operationType === "insert") {
          const { socketName, socketIO } = params;

          const newPost = change.fullDocument as PostDocument;
          console.log("New post added:", newPost);

          const neededParams: MessageListenersParams = {
            theSocket: { socketName, socketIO },
            post: newPost,
          };

          new SocketsService().notifyListeners(neededParams);
        }
      });

      console.log("Listening for changes in the posts collection...");
    }
  } catch (error) {
    console.error("Error listening for changes:", error);
  }
};
