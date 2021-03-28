require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcryptjs');
// require models
const Admin = require('../models/admin.model');
const UserSchema = require('../models/user.model');
const Activation = require('../models/activation.model');
const QuestionSchema = require('../models/question.model');

// sign in
const authenticate = (req, res) => {
  // get admin
  Admin.findOne({ phone: req.body.phone }, (err, admin) => {
    if (err || !admin) res.json({ message: 'Acune donnée trovée' });

    // compare password
    const correct = bcrypt.compareSync(req.body.password, admin.password);
    if (correct) {
      // create token and stock in cookie
      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
      res.cookie('t', token, {
        expire: new Date() + 9999,
      });
      return res.json({
        token,
        admin,
      });
    }
  });
};

// get all compte where desactived
const getAllActivation = (req, res) => {
  Activation.find({ compte: 'desactiver' }, (err, activation) => {
    if (err || !activation) res.json({ error: err });
    res.json(activation);
  });
};

// change compte user from desactiver to actived
const updateAccountUser = async (req, res) => {
  try {
    actived = await Activation.findByIdAndUpdate(req.params.compteId);
    actived.compte = await req.body.compte;
    saveCompte = await actived.save((err, user) => {
      if (err) res.json(err);
      res.json(user);
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// change user from user to admin
const changeUser = async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(req.params.userId);
    user.status = await req.body.status;
    saveUser = await user.save((err, user) => {
      if (err) res.json(err);
      res.json(user);
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const createQuestion = async (req, res) => {
  const { question, option1, option2, answer, score } = req.body;
  // New Question
  const Question = new QuestionSchema({
    question,
    option1,
    option2,
    answer,
    score,
  });

  try {
    const saveQuestion = await Question.save();
    res.status(200).json({ question: saveQuestion });
  } catch (error) {
    res.status(400).json({ error: err });
  }
};

const getAllGuestion = async (req, res) => {
  try {
    const question = await QuestionSchema.find();
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  authenticate,
  updateAccountUser,
  getAllActivation,
  changeUser,
  createQuestion,
  getAllGuestion,
};
