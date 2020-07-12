const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:String,
    googleid:String
})

const User = mongoose.model('user',UserSchema);

module.exports = User;