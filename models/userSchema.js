const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userId: String
});
module.exports.UserModel = mongoose.model('user', schema);