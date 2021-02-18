const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userSchema');
const { isPasswordValid } = require('./authServices');

module.exports.login = async (req, res, next) => {
    const { email, username, password } = req.body;
    // Fetching userData from database 
    if (email) console.log(email);
    let userInfo;
    if (email) userInfo = await UserModel.find({ email: email })
    else userInfo = await UserModel.find({ username: username })
    if (userInfo.length == 0) {
        return res.json({ error: 'No account found with this username' });
    } else {

        const hashPass = userInfo[0].password;
        const { userId, email } = userInfo[0];

        if (hashPass && isPasswordValid(hashPass, password)) {
            req.body = {
                userId: userId,
                username: username,
                email: email
            }
            next();
        } else {
            res.status(400).send({ error: ['Invalid password'] });
        }
    }
}
module.exports.isValidJWTToken = (req, res, next) => {

    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const userData = jwt.decode(authorization[1], process.env.JWT_SECRET);
                //    add necessary data to request body. Here i added only userId
                req.body.userId = userData.userId;
                next();
            }
        } catch (err) {
            return res.status(403).send(err);
        }
    } else {
        return res.status(401).send({ error: "Please attach access token in headers." });
    }
}