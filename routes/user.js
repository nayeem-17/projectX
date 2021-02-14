const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares');
const { userReg, getQuestions, submitAnswers } = require('../controllers/userController');
const router = express.Router()

router.post('/registration', userReg);
router.use(isValidJWTToken);

router.post('/getquestionset/:examId', getQuestions);
router.post('/submit', submitAnswers)

module.exports = router