const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares');
const { userReg, getQuestions } = require('../controllers/userController');
const router = express.Router()

router.post('/registration', userReg);
router.use(isValidJWTToken);

router.post('/getquestions', getQuestions);

module.exports = router