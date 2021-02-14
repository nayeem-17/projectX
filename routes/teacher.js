const express = require('express')
const { deleteStat, deleteAllStats, updateQuestionSet, getExamStats, createQuestionSet } = require('../controllers/teacherController')
const router = express.Router()

router.post('/createquestionset', createQuestionSet)
router.post('/getexamstats', getExamStats)
router.patch('/updatequestions', updateQuestionSet)
router.delete('/deleteallstats', deleteAllStats)
router.delete('/deletestat/:id', deleteStat)

module.exports = router