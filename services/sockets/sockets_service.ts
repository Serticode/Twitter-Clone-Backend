import {
  ListenToSocketParams,
  MessageListenersParams,
} from "../../services/models/sockets_models";

export default class SocketsService {
  public async listenToSocket(params: ListenToSocketParams) {
    const { socketIO } = params;

    socketIO.on("connection", (socket) => {
      socket.emit("postSocket", "Message from server, you are connected.");
    });
  }

  //!
  public async notifyListeners(params: MessageListenersParams) {
    const { theSocket, post } = params;
    const { socketName, socketIO } = theSocket;

    socketIO.emit(socketName, {
      notificationName: "New Post",
      post: JSON.stringify(post),
    });
  }
}
