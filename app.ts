import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { connectToDatabase } from "./database/db_connect";

dotenv.config();
const app = express();

//! MIDDLE WARE FOR PARSING JSON
app.use(urlencoded({ extended: true }));
app.use(json());

//! SWAGGER UI
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./tsoa/tsoa.json";

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

import { RegisterRoutes } from "./routes/routes";
RegisterRoutes(app);

//! ERROR HANDLER
import { errorHandlerMiddleware } from "./middleware/error_handler";
app.use(errorHandlerMiddleware);

const port = process.env.PORT || process.env.BACKUP_PORT;

const start = async () => {
  2;
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    console.log("Connecting to database...");
    await connectToDatabase(mongoUri);
    console.log("Connected to database");
    console.log("Starting server...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
