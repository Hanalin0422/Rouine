const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const User = require('../models/User');
const mongoose = require('mongoose');

router.get('/', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('main/index', {
        username:username,
        errors:errors
    });
});

router.get('/teachMachine', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    if(!req.user){
        res.send("<script>alert('로그인을 진행해주세요!'); location.href='/';</script>");
    }else{
        res.render('main/teachMachine', {
            username:username,
            errors:errors
        });
    }
    
});

router.get('/face_information', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    if(!req.user){
        res.send("<script>alert('로그인을 진행해주세요!'); location.href='/';</script>");
    }else{
        res.render('main/face_information', {
            username:username,
            errors:errors
        });
    }
});

router.get('/board', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};

        res.render('main/board', {
            username:username,
            errors:errors
        });

});




module.exports = router;