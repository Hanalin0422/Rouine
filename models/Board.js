const mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
    title : String,
    contents : String,
    author : String,
    createAt : {
        type:Date,
        default : Date.now()
    }
});

var Board = mongoose.model('board', boardSchema);
module.exports = Board;
