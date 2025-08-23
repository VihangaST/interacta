const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const questionsSetSchema = new mongoose.Schema({
  topic: String,
  questions: [QuestionSchema],
});

module.exports = mongoose.model("QuestionsSet", questionsSetSchema);
