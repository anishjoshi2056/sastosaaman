const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    googleid:String,
    photo:String
})

const User = mongoose.model('User',UserSchema);

module.exports = User;