const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// create schema
const answerSchema = new mongoose.Schema(
  {
    questionId: [{ type: ObjectId, ref: 'Questions' }],
    answer: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User' },
    score: { type: String, required: true },
    groupId: { type: ObjectId, ref: 'Groupes' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema);
