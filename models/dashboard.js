const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: String,
    exams: [{
        questionId: String,
        marks: {
            type: Number,
            default: 0
        }
    }],
    myquestionId: [String]
});
module.exports.dashboardModel = mongoose.model('dashboard', schema)