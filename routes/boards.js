const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

router.get('/', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('main/board', {
        username:username,
        errors:errors
    });
});

router.get('/write', function(req, res){
    var board = new Board();
    console.log("이건 뭐지");
});


module.exports = router;