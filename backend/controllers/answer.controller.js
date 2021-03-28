const answerSchema = require('../models/answer.model');

const postAnswer = (req, res) => {
  let answer = { answer: req.body.answer };
  answer.userId = req.body.userId;
  answer.score = req.body.score;
  answer.groupId = req.body.groupId;
  answerSchema
    .findByIdAndUpdate(
      req.body.answerId,
      { $push: { answers: answer } },
      { new: true }
    )
    .exec((err, result) => {
      if (err) res.json({ error: err });
      res.json(result);
    });
};

const getAllAnswer = (req, res) => {
  answerSchema.find((err, answer) => {
    if (err || !answer) res.json({ error: err });
    res.json(answer);
  });
};

module.exports = { postAnswer, getAllAnswer };
