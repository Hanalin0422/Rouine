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
    res.render('main/teachMachine', {
        username:username,
        errors:errors
    });
});

router.get('/generic', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('main/generic', {
        username:username,
        errors:errors
    });
});

router.get('/landing', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('main/landing', {
        username:username,
        errors:errors
    });
});

router.get('/elements', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('main/elements', {
        username:username,
        errors:errors
    });
});
    

module.exports = router;