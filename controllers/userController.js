const crypto = require('crypto')
const { makeHash } = require("../authentication/authServices");
const { dashboardModel } = require('../models/dashboard');
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
        const existingUsername = await UserModel.find({ username: username });
        if (existingUsername[0]) return res.json({ error: ' Username exists!' });
        const existingEmail = await UserModel.find({ email: email });
        // console.log(existingEmail);
        if (existingEmail.length) return res.json({ error: ' Email exists!' });
        const userInfo = {
            username: username,
            email: email,
            password: hashPassword,
            userId: crypto.randomBytes(32).toString('base64')
        }
        // creating user
        const data = await UserModel.create(userInfo);
        // creating dashboard
        await dashboardModel.create({ userId: data.userId });
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
        // updating stat
        let questionSet = await QuestionSetModel.find({ uuid: examId });
        const startingTime = questionSet[0].startingTime;
        const { duration } = questionSet[0];
        // let currentDuration = Date.now() - startingTime.getTime();
        // currentDuration = currentDuration / 6000000;
        // if (currentDuration >= (duration)) {
        //     res.status(402).json({ 'error': 'No time left' })
        // } else {
        questionSet[0].studentId.push(userId);
        await QuestionSetModel.findOneAndUpdate({ uuid: examId }, questionSet[0], {
            new: true,
            useFindAndModify: false

        });

        // updating dashboard
        let userDashBoard = await dashboardModel.find({ userId: userId });
        // console.log(userDashBoard);
        userDashBoard = userDashBoard[0];
        userDashBoard.exams.push({
            questionId: examId,
            marks: 0
        });
        await dashboardModel.findOneAndUpdate({ userId: userId }, userDashBoard, {
            new: true,
            useFindAndModify: false

        });
        let questions = questionSet[0].toJSON();
        questions = questions.questions;
        // console.log(questions);

        for (let i = 0; i < questions.length; i++) {
            delete questions[i].answer;
            delete questions[i]._id;
        }
        // console.log(questions);
        console.log(startingTime);
        res.json({
            'questions': questions,
            start: {
                'year': startingTime.getFullYear(),
                'month': startingTime.getUTCMonth() + 1,
                'date': startingTime.getUTCDate(),
                'hour': startingTime.getUTCHours(),
                'minute': startingTime.getUTCMinutes(),
                'second': startingTime.getUTCSeconds()
            }
        });
        // }

    } catch (error) {
        res.status(403).json({ 'error': error })
    }
}

module.exports.submitAnswers = async (req, res) => {
    try {
        const userId = req.body.userId;
        const examId = req.params.examId;
        const answerScript = req.body.answers;
        const marks = await checkanswer(examId, answerScript);
        let correctAnswers = [];
        const questions = (await QuestionSetModel.find({ uuid: examId }))[0].questions;
        questions.forEach(element => {
            correctAnswers.push(element.answer)
        });
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
        let userDashBoard = await dashboardModel.find({ userId: userId });
        userDashBoard = userDashBoard[0];
        for (let i = 0; i < userDashBoard.exams.length; i++) {
            if (userDashBoard.exams[i].questionId == examId) {
                userDashBoard.exams[i].marks = marks;
                break;
            }
        }
        await dashboardModel.findOneAndUpdate({ userId: userId }, userDashBoard, {
            new: true,
            useFindAndModify: false

        });
        res.json({
            isSuccessful: true,
            marks: marks,
            correctAnswers
        })
    } catch (error) {
        res.status(403).json({ error: error })
    }
}

module.exports.dashBoard = async (req, res) => {
    try {
        const userId = req.body.userId;
        let userDashBoard = await dashboardModel.find({ userId: userId });
        userDashBoard = userDashBoard[0];
        console.log(userDashBoard)
        if (userDashBoard) {
            res.json({
                dashBoard: userDashBoard
            })
        } else {
            res.status(403).json({ error: "Can't find any dashboard information." });
        }
    } catch (error) {
        res.status(403).json({ error: error });
    }
}