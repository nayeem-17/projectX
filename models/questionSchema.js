const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    question: String,
    options: {
        type: [String],
        validate: {
            validator: (options) => {
                return options.length == 4;
            },
            message: 'dadaaa'
        }
    },
    answer: Number
});
module.exports.QuestionModel = schema
