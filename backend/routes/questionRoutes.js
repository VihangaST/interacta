const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const QuestionsSet = require("../models/QuestionsModel");

router.post("/generate", async (req, res) => {
  const formData = req.body;
  const festivalName = formData.festivalName;
  const questionsCount = formData.questionsCount;
  if (!festivalName) {
    return res.status(400).json({ error: "festivalName is required" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate ${questionsCount} quiz questions about ${festivalName} and give 4 options and mention correct answer for each one.`;
    const result = await model.generateContent(prompt);
    const questionsText = result?.response?.text();
    const questionBlocks = questionsText.split(/\n\d+\./).filter(Boolean);

    const questionsArray = questionBlocks.map((block) => {
      const lines = block.trim().split("\n");
      const question = lines[0];
      console.log("-----------", lines[0]);

      const options = lines
        .slice(1, 5)
        .map((line) => line.replace(/^[a-d]\)\s*/, ""));

      const correctAnswerLine = lines.find((line) =>
        line.toLowerCase().includes("correct answer")
      );

      const correctAnswer = correctAnswerLine
        ? correctAnswerLine.split(":")[1].trim()
        : null;
      return { question, options, correctAnswer };
    });

    await QuestionsSet.create({
      topic: festivalName,
      questions: questionsArray,
    });
    res.json({ msg: "Question generated and saved successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Failed to generate questions: ${error.message}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const questions = await QuestionsSet.find({ topic: "christmas" });
    const questionList = questions[0].questions;

    console.log(questionList);
    res.json(questionList);
  } catch (err) {
    res.json({ message: err.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const formData = req.body;
//     const festivalName = formData.festivalName;
//     const questionsCount = formData.questionsCount;

//     res.json({ message: "Data received", data: formData });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// });
module.exports = router;
