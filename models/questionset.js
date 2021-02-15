const mongoose = require('mongoose');
const crypto = require('crypto')
const { QuestionModel } = require('./questionSchema');
const schema = new mongoose.Schema({
    teacherId: String,
    studentId: [String],
    questions: [QuestionModel],
    uuid: {
        type: String,
        default: crypto.randomBytes(5).toString('hex')
    },
    duration: {
        type: Number,
        default: 10
    }
});
module.exports.QuestionSetModel = mongoose.model('question', schema);

/**
 * @swagger
 * components:
 *  schemas:
 *      questionSetSchema:
 *          properties:
 *              teacherId:
 *                  type: string
 *              studentId:
 *                  type: array
 *                  items:
 *                      type: string
 *              uuid:
 *                  type: string
 *                  description: auto-generated unique id
 *              duration:
 *                  type: integer
 *                  description: duration in mintues
 *                  example: 15
 *              questions:
 *                  type: array
 *                  items:
 *                      $ref: "#/components/schemas/questionSchema"
 */