const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares');
const { userReg, getQuestions, submitAnswers } = require('../controllers/userController');
const router = express.Router()

router.post('/registration', userReg);

// checking if given token is valid or not

router.use(isValidJWTToken);

router.post('/getquestionset/:examId', getQuestions);

router.post('/submit/:examId', submitAnswers)

module.exports = router