const express = require('express');
const router = express.Router();

const { postAnswer, getAllAnswer } = require('../controllers/answer.controller');

router.post('/api/answer/post', postAnswer);
router.get('/api/answer', getAllAnswer);

// exeport router
module.exports = router;