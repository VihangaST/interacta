const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/Shopping";

mongoose.set("strictQuery", true, "useUnifiedTopology", true);

const connection = () => {
  try {
    mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection failed", err);
  }
};

module.exports = connection;
