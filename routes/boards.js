const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const util = require('../util');

router.get('/board', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    if(!req.user){
        res.send("<script>alert('로그인을 진행해주세요!'); location.href='/';</script>");
    }else{
        res.render('boards/board', {
            username:username,
            errors:errors
        });
    }
});

router.get('/boardlist', function(req,res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};

    Board.findById({_id : req.user._id})
    .exec(function(err, board){
        if(err) return res.json(err);
        res.render('boards/boardlist', { 
            boardArray : [board],
            board : board, 
            errors:errors
        });
    });
});


//create
router.post('/', function(req,res){
    const board = new Board({
        title : req.body.title,
        contents : req.body.contents,
        author : req.user.username
    });

    Board.create(board, function(err, board){
        if(err){
            req.flash('board', board);
            req.flash('errors',util.parseError_(err));
            return res.redirect('boards/board');
        }
        res.render('boards/boardlist', { 
            board : [board],
            errors :errors
        });
    })},
    function(req, res, next){
        var errors = {};
        var isValid = true;

        if(!req.body.title){
            isValid = false; 
            errors.tile = "제목을 입력해주세요!";
        }
        if(!req.body.contents){
            isValid = false;
            errors.contents = "내용을 입력해주세요!";
        }
        if(isValid){
            next();
        }
        else{
            req.flash('errors',errors);
            res.redirect('boards/boardlist');
        }
    }
);





module.exports = router;