const { QuestionSetModel } = require("../models/questionset");
const { statModel } = require("../models/stats");

module.exports.createQuestionSet = async (req, res) => {
    const questionSet = {
        teacherid: req.body.userId,
        questions: req.body.questions
    };
    if (req.body.duration) questionSet.duration = req.body.duration;
    try {
        const data = await QuestionSetModel.create(questionSet);
        res.status(200).json({
            uuid: data.uuid,
            isSuccessful: true
        })
    } catch (error) {
        res.status(401).json({
            isSuccessful: false,
            error: error
        })
    }
}

module.exports.getExamStats = async (req, res) => {
    const teacherId = req.body.userId;
    const examuuid = req.body.uuid;
    try {
        const stats = await statModel.find({ teacherId: teacherId, examId: examuuid });
        res.status(200).json({
            examstats: stats[0].stats
        });
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}
module.exports.updateQuestionSet = async (req, res) => {
    const examId = req.params.examid;
    const questions = await QuestionSetModel.find({ teacherId: req.body.userId, uuid: examId });
    if (questions.length == 0) {
        res.status(403).json({
            error: "No exam found!"
        })
    }
    else if (questions.studentId.length > 0) {
        res.stats(401).json({
            error: "Cannot modify the questions."
        })
    } else {
        try {
            const updated = {
                teacherId: req.body.userId,
                questions: req.body.questions
            }
            if (req.body.duration) updated.duration = req.body.duration;

            const updatedQuestions = await QuestionSetModel.findOneAndUpdate({
                teacherId: req.body.userId,
                uuid: examId
            }, updated, {
                new: true,
                useFindAndModify: true
            });
            res.status(200).send({
                message: "updated"
            })
        } catch (error) {
            res.status(401).json({
                error: error
            })
        }
    }
}
module.exports.deleteAllStats = async (req, res) => {
    try {
        const teacherId = req.body.userId;
        await statModel.deleteMany({ teacherId: teacherId });
        res.status(200).json({
            isSuccessful: true
        })
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}
module.exports.deleteStat = async (req, res) => {
    try {
        const examId = req.params.examid;
        await statModel.deleteOne({ teacherId: req.body.userId, uuid: examId });
        res.status(200).json({
            isSuccessful: true
        })
    } catch (error) {
        res.status(401).json({
            error: error
        })
    }
}