const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  username: Number,
  marks: Number,
});

module.exports = mongoose.model("UserData", UserDataSchema);
