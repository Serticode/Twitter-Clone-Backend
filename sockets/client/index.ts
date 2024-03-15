import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { io } from "socket.io-client";
import { PostDocument } from "../../database/models/posts/posts";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log(`Client connected to socket: ${socket.id}`);
});

socket.on("postSocket", async (data) => {
  console.log(`Connection message from: ${socket.id} - ${data}`);

  const { notificationName, post } = data;

  console.log(
    `Connection message from: ${
      socket.id
    } - Notification Name: ${notificationName} \nPosts: ${post as PostDocument}`
  );
});

//! DOT ENV
dotenv.config();
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from client</h1>");
  req.body.data;
  res.json;
});

const port = 4444;

const start = async () => {
  try {
    console.log("Starting Client server...");

    app.listen(port, () => {
      console.log(`Client Server is running on port ${port}`);
    });

    socket.connect();
  } catch (e) {
    console.log(e);
  }
};

start();
