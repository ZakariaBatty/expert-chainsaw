const mongoose = require('mongoose');

// create schema
const admin = new mongoose.Schema(
  {
    phone: { type: String, required: true, trim: true },
    salt: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', admin);
