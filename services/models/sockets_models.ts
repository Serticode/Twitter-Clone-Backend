import { Server } from "socket.io";
import { PostDocument } from "../../database/models/posts/posts";

export interface ListenToSocketParams {
  socketName: string;
  socketIO: Server;
}

export interface MessageListenersParams {
  theSocket: ListenToSocketParams;
  post: PostDocument;
}
