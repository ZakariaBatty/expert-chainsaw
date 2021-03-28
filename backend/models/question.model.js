const mongoose = require('mongoose');

// create schema
const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    answer: { type: String, required: true, trim: true },
    score: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', QuestionSchema);
