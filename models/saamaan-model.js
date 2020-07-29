const mongoose = require('mongoose');
//Schema Setup
var saamaanSchema = new mongoose.Schema({
    name:String,
    img:String,
    desc:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
})
//Converting schema into model which has a bunch of method
module.exports = mongoose.model('saamaan',saamaanSchema);