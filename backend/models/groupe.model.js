const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

// create schema
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admin: { type: ObjectId, ref: 'User' },
  members: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Groups', GroupSchema);
