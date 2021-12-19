const mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
    title : {
        type : String,
        required:[true, "제목을 입력해주세요!"]
    },
    contents : {
        type : String,
        required : [true, "내용을 입력해주세요!"]
    },
    author : String,
    createAt : {
        type:Date,
        default : Date.now()
    }
});

var Board = mongoose.model('board', boardSchema);
module.exports = Board;
