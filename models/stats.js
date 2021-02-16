const mongoose = require('mongoose')
const { singleStudentStat } = require('./studentStat')

const schema = new mongoose.Schema({
    teacherId: String,
    examId: String,
    stats: [singleStudentStat]
});
module.exports.statModel = mongoose.model('stat', schema)
