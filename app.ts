import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import { createServer } from "http";
import { Server } from "socket.io";
import * as swaggerUI from "swagger-ui-express";
import { connectToDatabase } from "./database/db_connect";
import { listenForNewPosts } from "./database/listen_for_new_posts";
import { errorHandlerMiddleware } from "./middleware/error_handler";
import { RegisterRoutes } from "./routes/routes";
import { ListenToSocketParams } from "./services/models/sockets_models";
import SocketsService from "./services/sockets/sockets_service";
import * as swaggerJson from "./tsoa/tsoa.json";

//! DOT ENV
dotenv.config();
const app = express();

//!
//! LIST OF EVERYTHING THE APP USES
//! MIDDLE WARE FOR PARSING JSON
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

//! SWAGGER UI
//! SERVING SWAGGER UI
app.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson)
);

//! SERVE SWAGGER  JSON
app.get("/swagger.json", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(__dirname + "/tsoa/tsoa.json");
});

//! FILE UPLOADING SERVICE
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

RegisterRoutes(app);

//! ERROR HANDLER
app.use(errorHandlerMiddleware);

const port = process.env.PORT || process.env.BACKUP_PORT;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    console.log("Connecting to database...");

    await connectToDatabase(mongoUri);

    console.log(`Connected to database \nStarting server...`);

    const server = createServer(
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      })
    );

    const io = new Server(server, {
      cors: {
        origin: `http://localhost:${port}/`,
        methods: ["GET"],
        credentials: true,
      },
    });

    const params = {
      socketIO: io,
      socketName: "postSocket",
    } as ListenToSocketParams;

    new SocketsService().listenToSocket(params);
    await listenForNewPosts(params);

    server.listen(3000);
  } catch (e) {
    console.log(e);
  }
};

start();
