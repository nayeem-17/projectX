const mongoose = require('mongoose')
const { singleStudentStat } = require('./studentStat')

const schema = new mongoose.Schema({
    teacherId: String,
    examId: String,
    stats: [singleStudentStat]
});
module.exports.statModel = mongoose.model('stat', schema)
/**
 * @swagger
 * components:
 *  schemas:
 *      statSchema:
 *          properties:
 *              teacherId:
 *                  type: string
 *                  example: 2wdftyhjk5678iujk098uygvbhreswefcv
 *              examId:
 *                  type: string
 *                  example: 12exaef13
 *              stats:
 *                  type: array
 *                  items:
 *                     $ref: "#/components/schemas/singleStudentStatSchema"
 */