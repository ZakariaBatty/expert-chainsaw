const express = require('express');
const router = express.Router();
const {
  registre,
  getUserById,
  getUser,
  getAllUsers,
} = require('../controllers/user.controller');

const { signin, requireSignin, signout } = require('../controllers/auth');

// the reuters
router.post('/api/user/registre', registre);
router.post('/api/auth/signin', signin);
router.get('/api/auth/signout', signout);
router.get('/api/users', requireSignin, getAllUsers);
router.get('/api/user/:userId', requireSignin, getUser);


router.param('userId', getUserById);

// exeport router
module.exports = router;
