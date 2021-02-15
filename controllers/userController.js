const crypto = require('crypto')
const { makeHash } = require("../authentication/authServices");
const { QuestionSetModel } = require('../models/questionset');
const { statModel } = require('../models/stats');
const { UserModel } = require("../models/userSchema");
const { checkanswer } = require('../services/marking');

module.exports.userReg = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashPassword = makeHash(password);
        if (!email) return res.status(401).json({ error: 'No email' });
        if (!username) return res.status(401).json({ error: 'No username' });
        const existingUser = await UserModel.find({ username: username });
        if (existingUser[0]) return res.json({ error: ' Username exists!' });
        const userInfo = {
            username: username,
            email: email,
            password: hashPassword,
            userId: crypto.randomBytes(32).toString('base64')
        }
        const data = await UserModel.create(userInfo);
        res.status(200).json({
            isSuccessful: true,
            userId: data.userId
        })
    } catch (error) {
        res.status(403).json({ error: error })
    }

}

module.exports.getQuestions = async (req, res) => {
    try {
        const userId = req.body.userId;
        const examId = req.params.examId;
        let questionSet = await QuestionSetModel.find({ uuid: examId });
        console.log(questionSet)
        questionSet[0].studentId.push(userId);
        await QuestionSetModel.findOneAndUpdate({ uuid: examId }, questionSet[0], {
            new: true,
            useFindAndModify: false

        });
        res.json({
            questions: questionSet[0].questions
        });

    } catch (error) {
        res.status(403).json({ error: error })
    }
}

module.exports.submitAnswers = async (req, res) => {
    try {
        const userId = req.body.userId;
        const examId = req.params.examId;
        const answerScript = req.body.answers;
        const marks = await checkanswer(examId, answerScript);
        const userStat = {
            marks: marks,
            studentId: userId,
            answers: answerScript,
            examid: examId
        };
        const stat = await statModel.find({ examId: examId });
        stat[0].stats.push(userStat);
        const data = await statModel.findByIdAndUpdate(stat[0]._id, stat[0], {
            new: true,
            useFindAndModify: false
        });
        res.json({
            isSuccessful: true,
            marks: marks
        })
    } catch (error) {
        res.status(403).json({ error: error })
    }
}