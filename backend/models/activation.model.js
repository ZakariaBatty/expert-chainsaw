const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// create schema
const activation = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },
  compte: { type: String, required: true, trim: true },
  lastName: { type: String, required: true },
});

module.exports = mongoose.model('activation', activation);
