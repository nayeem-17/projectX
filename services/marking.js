const { QuestionSetModel } = require("../models/questionset")

module.exports.checkanswer = async (examId, answerScript) => {
    const questions = (await QuestionSetModel.find({ uuid: examId }))[0].questions;
    marks = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answerScript[i] == questions[i].answer) marks++;
    }
    console.log(marks);
    return marks * 1;
}