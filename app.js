console.log(process.env.MONGO_URI);
console.log("Hello World - Start of a new beginning for Serticode.");

//! ENSURE ENVIRONMENT VARIABLES ARE LOADED
require("dotenv").config();

//! DATABASE LINK
const connectToDatabase = require("./database/db_connect");

//! ENFORCE EXPRESS
const express = require("express");
const app = express();

//! PICK UP PORT FROM .ENV AND CREATE FALL BACK
const port = process.env.PORT || process.env.BACKUP_PORT;

//! USING ROUTERS / HANDLING ROUTES
const customerRouter = require("./routes/customer");
app.use("/api/v1/customer", customerRouter);

//!
//! START FUNCTION TO START SERVER
const startServer = async () => {
  try {
    console.log("Connecting to database...");
    await connectToDatabase(process.env.MONGO_URI);
    console.log("Connected to database !");

    console.log("Starting server...");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
