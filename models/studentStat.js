const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    studentId: String,
    examid: String,
    answers: [Number],
    marks: Number
});
module.exports.singleStudentStat = schema

/**
 * @swagger
 * components:
 *  singleStudentStatSchema:
 *      properties:
 *          studentId:
 *              type: string
 *              example: 2wdftyhjk5678iujk098uygvbhreswefcv
 *          examid:
 *              type: string
 *              example: 12exaef13
 *          marks:
 *              type: integer
 *              example: 50
 *          answers:
 *              type: array
 *              items:
 *                  type: integer
 *              example: [1,2,4,1,2]
 */