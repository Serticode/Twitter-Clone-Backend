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
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const seconds = new Date().getSeconds();
  req.accessGranted = seconds % 2 === 0;
  req.requestSeconds = seconds;
  next();
});

//!
//!
//! WITH URLS
app.get("/", (req, res) => {
  const seconds = req.requestSeconds;
  if (req.accessGranted) {
    res.status(200).json({ msg: `Access granted at ${seconds}` });
  } else {
    res.status(403).json({ msg: `Access denied at ${seconds}` });
  }
});

//! BELOW GET REQUEST HOUSES TWO MIDDLE WARES.
//! FIRST - PERFORMING AUTH ACTION BASED ON USER ID / URL PARAM
//! SECOND RETURNS A RESPONSE AND STATUS BASED ON IF USER IS AUTHORIZED.
app.get(
  "/customer/:id",
  (req, res, next) => {
    const customerId = req.params.id;
    req.authorized = customerId === "123";
    next();
  },
  (req, res, next) => {
    if (req.authorized === true) {
      res.status(200).json({ msg: "You are customer 123 and authorized" });
    } else {
      res.status(401).json({ msg: "You are not authorized" });
    }
    next();
  }
);

app.use((req, res, next) => {
  console.log("Middle ware chain ended");
});

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
