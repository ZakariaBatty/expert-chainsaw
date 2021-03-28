const express = require('express');
const router = express.Router();

const {
  authenticate,
  updateAccountUser,
  getAllActivation,
  changeUser,
  createQuestion,
  getAllGuestion,
} = require('../controllers/admin');
const { requireSignin, signout } = require('../controllers/auth');

router.post('/api/admin', authenticate);
router.put('/api/compte/:compteId', requireSignin, updateAccountUser);
router.get('/api/compte/', requireSignin, getAllActivation);
router.get('/api/auth/signout', signout);
router.put('/api/change/user/:userId', requireSignin, changeUser);
router.post('/api/quetion/create', createQuestion);
router.get('/api/quetion', getAllGuestion);

// exeport router
module.exports = router;
