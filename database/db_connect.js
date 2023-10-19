const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = function (url) {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDatabase;
