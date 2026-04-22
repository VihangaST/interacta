const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const UserDataSchema = require("../models/UsersDataModel");
dotenv.config();

router.post("/save", async (req, res) => {
  const { username, marks, seasonId } = req.body;
  console.log(username, marks, seasonId);

  if (!username || !seasonId) {
    return res
      .status(400)
      .json({ error: "username and seasonId are required" });
  }

  try {
    // Check if user already participated in this season
    const existingUser = await UserDataSchema.findOne({ username, seasonId });
    if (existingUser) {
      return res.status(409).json({
        error:
          "You have already participated in this season. Participation is allowed only once per season.",
        marks: existingUser.marks,
      });
    }

    await UserDataSchema.create({
      username: username,
      marks: marks,
      seasonId: seasonId,
    });

    res.json({ message: "User data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
