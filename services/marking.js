const { QuestionSetModel } = require("../models/questionset")

module.exports.checkanswer = (examId, answerScript) => {
    try {
        const questions = await QuestionSetModel.find({ uuid: examId })[0].questions;
        let marks = 0;
        for (let i = 0; i < questions.length; i++) {
            if (answerScript[i] == questions[i].answer) marks++;
        }
        return marks;
    } catch (error) {
        throw error;
    }
}