const { QuestionSetModel } = require("../models/questionset")

module.exports.checkanswer = async (examId, answerScript) => {
    const result = await QuestionSetModel.find({ uuid: examId });
    console.log(answerScript);
    const questions = result[0].questions;
    marks = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answerScript[i] == questions[i].answer) marks++;
    }
    console.log(marks);
    return marks * 1;
}