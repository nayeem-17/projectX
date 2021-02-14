const crypto = require('crypto')
const { makeHash } = require("../authentication/authServices");
const { UserModel } = require("../models/userSchema");

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
    res.json({
        questions: " Bazzinga!"
    })
}

module.existingUser.submitAnswers = async (req, res) => {

}