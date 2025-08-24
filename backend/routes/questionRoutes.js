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
//     // const prompt = `Generate ${questionsCount} distinct quiz questions about ${festivalName}. For each question, give 4 options labeled 1, 2, 3, 4. After each question, mention only the number of the correct option (e.g., Correct Answer: 3).`;
//     const prompt = `Generate ${questionsCount} distinct quiz questions about ${festivalName}.
// Return the result as a JSON array of objects, where each object has:
// - "question": the question text,
// - "options": an array of 4 options labeled 1, 2, 3, 4,
// - "correctAnswer": the number of the correct option (e.g., 3).

// Example:
// [
//   {
//     "question": "What is the main festival of colors in India?",
//     "options": ["Diwali", "Holi", "Eid", "Christmas"],
//     "correctAnswer": 2
//   }
// ]`;
//     const result = await model.generateContent(prompt);
//     const questionsText = result?.response?.text();
//     console.log("Generated Questions Text:", questionsText);

//     // const questionBlocks = questionsText.split(/\n\d+\./).filter(Boolean);
//     // console.log("questionBlocks", questionBlocks);

//     // const questionsArray = questionBlocks.map((block) => {
//     //   const lines = block.trim().split("\n");
//     //   console.log("lines", lines);

//     //   const question = lines[0];

//     //   const options = lines
//     //     .slice(1, 5)
//     //     .map((line) => line.replace(/^[a-d]\)\s*/, ""));

//     //   const correctAnswerLine = lines.find((line) =>
//     //     line.toLowerCase().includes("correct answer")
//     //   );

//     //   const correctAnswer = correctAnswerLine
//     //     ? correctAnswerLine.split(":")[1].trim()
//     //     : null;
//     //   return { question, options, correctAnswer };
//     // });

//     // console.log(questionsArray);

//     // await QuestionsSet.create({
//     //   topic: festivalName,
//     //   questions: questionsArray,
//     // });

//     // *********************************

//     // Split by question label (Q1., Q2., etc.)
//     // Split by Q1., Q2., Q3., etc. (handles start of string and ensures no empty blocks)
//     const questionBlocks = questionsText
//       .split(/(?:^|\n)Q\d+\./)
//       .map((block) => block.trim())
//       .filter(Boolean);

//     const questionsArray = questionBlocks.map((block) => {
//       // Remove any leading/trailing asterisks and whitespace
//       const lines = block
//         .split("\n")
//         .map((line) => line.trim())
//         .filter(Boolean);

//       // Find the question line (first line not starting with a digit and not containing 'Correct Answer')
//       const questionLineIndex = lines.findIndex(
//         (line) => !/^\d+\./.test(line) && !/correct answer/i.test(line)
//       );
//       const question =
//         questionLineIndex !== -1
//           ? lines[questionLineIndex].replace(/^\*+|\*+$/g, "").trim()
//           : "";

//       // Get options (lines starting with 1., 2., 3., 4.)
//       const options = lines
//         .filter((line) => /^\d+\./.test(line))
//         .map((line) => line.replace(/^\d+\.\s*/, "").trim());

//       // Find correct answer line and extract the number
//       const correctAnswerLine = lines.find((line) =>
//         /correct answer/i.test(line)
//       );
//       let correctAnswer = null;
//       if (correctAnswerLine) {
//         const match = correctAnswerLine.match(/Correct Answer:\s*(\d+)/i);
//         if (match) {
//           correctAnswer = parseInt(match[1], 10) - 1; // zero-based index
//         }
//       }

//       return { question, options, correctAnswer };
//     });

//     // Store in MongoDB as a single document
//     await QuestionsSet.create({
//       topic: festivalName,
//       questions: questionsArray,
//     });
//     // ******************************

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

    const questionCount = questionList.length;
    console.log(`Total questions found: ${questionCount}`);

    console.log(questionList);
    res.json(questionList);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/questionCount", async (req, res) => {
  try {
    const questions = await QuestionsSet.find({ topic: "christmas" });
    const questionList = questions[0].questions;

    const questionCount = questionList.length;
    res.json({ questionCount });
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
