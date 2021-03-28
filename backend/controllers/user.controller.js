const UserSchema = require('../models/user.model');
const Activation = require('../models/activation.model');

// registre
const registre = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const status = 'user';
  // insert user to table
  const user = new UserSchema({ firstName, lastName, email, password, status });
  user.save((err, user) => {
    if (err) res.json({ error: err });
    const userId = user._id;
    const lastName = user.lastName;
    const compte = 'desactiver';
    // send id user and dfault value to table activation
    const compteuser = new Activation({ userId, compte, lastName });
    compteuser.save((err, compte) => {
      if (err) res.json({ error: err });
      console.log('compte désactive');
    });
    res.json(user);
  });
};
// get user by user id 
const getUserById = (req, res, next, id) => {
  UserSchema.findById(id)
    .populate('group', '_id name')
    .exec((err, user) => {
      if (err || !user) res.json({ error: err });
      req.profile = user;
      next();
    });
};

// recover user
const getUser = (req, res) => {
  res.json(req.profile);
};

// get all users
const getAllUsers = (req, res) => {
  UserSchema.find((err, users) => {
    if (err || !users) res.json({ error: err });
    res.json(users);
  });
};

module.exports = {
  registre,
  getUserById,
  getUser,
  getAllUsers,
};

// registre
// const registreadmin = async (req, res) => {
//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash('123456', salt);
//   const phone = '0687904633';
//   const admin = new Admin({ phone, password });
//   admin.save((err, admin) => {
//     if (err) res.json({ error: err });
//     res.json(admin);
//   });
// };
