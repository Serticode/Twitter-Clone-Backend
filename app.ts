import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./database/db_connect";

dotenv.config();

const app = express();

const port = process.env.PORT || process.env.BACKUP_PORT;

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing in .env file");
    }
    console.log("Connecting to database...Retry");
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
