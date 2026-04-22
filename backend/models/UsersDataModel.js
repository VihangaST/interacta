const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  username: Number,
  marks: Number,
  seasonId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserData", UserDataSchema);
