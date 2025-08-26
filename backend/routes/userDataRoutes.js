const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const UserDataSchema = require("../models/UsersDataModel");
dotenv.config();

router.post("/save", async (req, res) => {
  const { username, marks } = req.body;
  console.log(username, marks);

  if (!username) {
    res.status(400).json({ error: "username is required" });
  }

  try {
    await UserDataSchema.create({
      username: username,
      marks: marks,
    });

    res.json({ message: "User data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
