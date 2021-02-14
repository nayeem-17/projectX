const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    studentId: String,
    examid: String,
    answers: [Number],
    marks: Number
});
module.exports.singleStudentStat = mongoose.model('singlestat', schema);