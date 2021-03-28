require('dotenv').config({path : '../config/.env'});
const User = require('../models/user.model');
const Activation = require('../models/activation.model');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// sign in
const signin = (req, res) => {
  // get one user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) res.json({ message: 'Acune donnée trovée' });

    // compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        res.json({ error: 'Email and password doesnot match' });
      }
      // select from table activation one compte by id user
      Activation.findOne({ userId: user.id }, (err, compte) => {
        // check if error
        if (err || !compte) res.json({ error: err });

        // check if compte user desactiver
        if (compte.compte === 'desactiver') {
          res.json({ error: 'your compte desactiver' });

          // if compte active
        } else {
          // create token and stock in cookie
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.cookie('t', token, {
            expire: new Date() + 9999,
          });
          return res.json({
            token,
            user,
          });
        }
      });
    });
  });
};

// sign out
const signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: Déconnection });
};

//middlewers
const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.json({ statuserror: 'Non authorisé' });
  }
  next();
};

module.exports = {
  signin,
  signout,
  hasAuthorization,
  requireSignin,
};
