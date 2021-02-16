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
