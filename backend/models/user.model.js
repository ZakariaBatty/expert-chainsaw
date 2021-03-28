const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema;

// create schema
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    status: { type: String, required: true, trim: true },
    salt: String,
    hashed_password: { type: String, required: true },
    group: [{ type: ObjectId, ref: 'Groups' }],
  },
  { timestamps: true }
);

UserSchema.virtual('password')
  .get(function () {
    return this._password;
  })
  .set(function (password) {
    this._password = password;
    let salt = (this.salt = bcrypt.genSaltSync(10));
    this.hashed_password = bcrypt.hashSync(password, salt);
  });

// compare password is err or is Match
UserSchema.methods.comparePassword = function (passwordToCheck, cb) {
  bcrypt.compare(
    passwordToCheck,
    this.hashed_password,
    function (err, isMatch) {
      if (err) cb(err);
      cb(null, isMatch);
    }
  );
};

module.exports = mongoose.model('User', UserSchema);
