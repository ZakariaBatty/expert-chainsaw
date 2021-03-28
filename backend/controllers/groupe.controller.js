const GroupSchema = require('../models/groupe.model');
const UserSchema = require('../models/user.model');

// create group
const createGroup = (req, res) => {
  const { name, admin } = req.body;
  const group = new GroupSchema({ name, admin });
  group.save((err, date) => {
    if (err) res.json({ error: err });
    res.json(date);
  });
};
// add members groupe
const addmembers = (req, res) => {
  GroupSchema.findOne({ _id: req.body.groupId }, (err, group) => {
    if (err || !group) res.json({ message: 'Acune donnée trovée' });

    if (group.members.length >= 3) {
      res.json({ message: 'dzl' });
    } else {
      // add members groupe
      GroupSchema.findByIdAndUpdate(
        req.body.groupId,
        { $push: { members: req.body.userId } },
        { new: true }
      ).exec((err, result) => {
        if (err) res.json({ error: err });
      });
      // add group to table user by id user
      UserSchema.findByIdAndUpdate(
        req.body.userId,
        { $push: { group: req.body.groupId } },
        { new: true }
      ).exec((err, result) => {
        if (err) res.json({ error: err });
        res.json(result);
      });
    }
  });
};

// get all group
const getAllgroup = (req, res) => {
  GroupSchema.find((err, group) => {
    if (err || !group) res.json({ error: err });
    res.json(group);
  });
};

module.exports = {
  createGroup,
  addmembers,
  getAllgroup,
};
