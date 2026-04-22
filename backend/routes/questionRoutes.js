const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const QuestionsSet = require("../models/QuestionsModel");

// router.post("/generate", async (req, res) => {
//   const formData = req.body;
//   const festivalName = formData.festivalName;
//   const questionsCount = formData.questionsCount;
//   if (!festivalName) {
//     return res.status(400).json({ error: "festivalName is required" });
//   }

//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     // const prompt = `Generate ${questionsCount} quiz questions about ${festivalName} and give 4 options and mention correct answer for each one.`;
//     const prompt = `Generate ${questionsCount} distinct quiz questions about ${festivalName}. For each question, give 4 options labeled 1, 2, 3, 4. After each question, mention only the number of the correct option (e.g., Correct Answer: 3).`;
//     const result = await model.generateContent(prompt);
//     const questionsText = result?.response?.text();
//     const questionBlocks = questionsText.split(/\n\d+\./).filter(Boolean);

//     console.log("questionsText", questionsText);

//     const questionsArray = questionBlocks.map((block) => {
//       const lines = block.trim().split("\n");
//       const question = lines[0];
//       console.log("-----------", lines[0]);

//       const options = lines
//         .slice(1, 5)
//         .map((line) => line.replace(/^[a-d]\)\s*/, ""));

//       const correctAnswerLine = lines.find((line) =>
//         line.toLowerCase().includes("correct answer")
//       );

//       const correctAnswer = correctAnswerLine
//         ? correctAnswerLine.split(":")[1].trim()
//         : null;
//       return { question, options, correctAnswer };
//     });

//     await QuestionsSet.create({
//       topic: festivalName,
//       questions: questionsArray,
//     });
//     res.json({ msg: "Question generated and saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: `Failed to generate questions: ${error.message}` });
//   }
// });

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
    const prompt = `Generate ${questionsCount} distinct quiz questions about ${festivalName}. Return ONLY a valid JSON array of objects, where each object has: "question" (string), "options" (array of 4 strings labeled 1, 2, 3, 4), and "correctAnswer" (number, the index of the correct option starting from 0). Do not include any explanation, code block, or extra text. Example: [{"question": "What is Holi?", "options": ["Festival of Lights", "Festival of Colors", "Harvest Festival", "New Year"], "correctAnswer": 1}]`;
    const result = await model.generateContent(prompt);
    let questionsText = result?.response?.text();
    console.log("Generated Questions Text:", questionsText);

    // Clean output: remove code block markers and trim whitespace
    let questionsTextClean = questionsText.trim();
    if (questionsTextClean.startsWith("```")) {
      questionsTextClean = questionsTextClean.replace(/```(json)?/g, "").trim();
    }

    let questionsArray = [];
    try {
      questionsArray = JSON.parse(questionsTextClean);
    } catch (err) {
      console.error("Failed to parse JSON from LLM output", err);
      return res.status(500).json({
        error: "Failed to parse questions from LLM output. Please try again.",
      });
    }

    await QuestionsSet.create({
      topic: festivalName,
      questions: questionsArray,
      image: req.body.image,
    });
    res.json({ msg: "Question generated and saved successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `Failed to generate questions: ${error.message}` });
  }
});

router.post("/generate-description", async (req, res) => {
  const { festivalName, questionsCount, description } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Read the following content and generate ${questionsCount} distinct quiz questions based on it. Return ONLY a valid JSON array of objects, where each object has: "question" (string), "options" (array of 4 strings labeled 1, 2, 3, 4), and "correctAnswer" (number, the index of the correct option starting from 0). Do not include any explanation, code block, or extra text. Content: ${description}`;
    const result = await model.generateContent(prompt);
    let questionsText = result?.response?.text();
    console.log("Generated Product Questions Text:", questionsText);

    // Clean output: remove code block markers and trim whitespace
    let questionsTextClean = questionsText.trim();
    if (questionsTextClean.startsWith("```")) {
      questionsTextClean = questionsTextClean.replace(/```(json)?/g, "").trim();
    }

    let questionsArray = [];
    try {
      questionsArray = JSON.parse(questionsTextClean);
    } catch (err) {
      console.error("Failed to parse JSON from LLM output", err);
      return res.status(500).json({
        error: "Failed to parse questions from LLM output. Please try again.",
      });
    }

    await QuestionsSet.create({
      topic: festivalName, // use provided festivalName or default to 'product'
      questions: questionsArray,
      image: req.body.image,
    });
    res.json({ msg: "Product questions generated and saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Failed to generate product questions: ${error.message}`,
    });
  }
});

router.post("/question-data/:id", async (req, res) => {
  try {
    console.log("Fetching question data...");
    const { topic } = req.body;
    const questionNo = req.params.id;
    const questionList = await QuestionsSet.find({
      topic: topic,
    });
    const questionData = questionList[0].questions[questionNo];

    console.log(questionData);
    res.json(questionData);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/questionCount", async (req, res) => {
  try {
    const { topic } = req.body;
    console.log("topic", topic);
    const questions = await QuestionsSet.find({ topic: topic });
    const questionCount = questions[0].questions.length;

    console.log(questionCount);
    res.json({ questionCount });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/types", async (req, res) => {
  try {
    // find distrinct topics
    const topics = await QuestionsSet.distinct("topic");
    res.json({ topics });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// In questionRoutes.js
router.get("/image/:topic", async (req, res) => {
  try {
    // const topic = req.params.topic;
    const topic = "Cream Cracker";
    console.log("Fetching image for topic:", topic);
    const doc = await QuestionsSet.findOne({ topic });
    if (doc && doc.image) {
      res.json({ image: doc.image });
    } else {
      res.status(404).json({ error: "Image not found for this topic" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
