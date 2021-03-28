const express = require('express');
const router = express.Router();

const {
  createGroup,
  addmembers,
  getAllgroup,
} = require('../controllers/groupe.controller');
const { requireSignin } = require('../controllers/auth');

router.post('/api/group/create', requireSignin, createGroup);
router.put('/api/group/addmember', addmembers);
router.get('/api/groups', requireSignin, getAllgroup);

// exeport router
module.exports = router;
