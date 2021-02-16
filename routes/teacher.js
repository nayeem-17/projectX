const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares')
const { deleteStat, deleteAllStats, updateQuestionSet, getExamStats, createQuestionSet } = require('../controllers/teacherController')
const router = express.Router()

// checking if jwt token is valid or not

router.use(isValidJWTToken);

router.post('/createquestionset', createQuestionSet)

router.post('/getexamstats/:uuid', getExamStats)

router.patch('/updatequestions/:examid', updateQuestionSet)

router.delete('/deleteallstats', deleteAllStats)

router.delete('/deletestat/:id', deleteStat)

module.exports = router