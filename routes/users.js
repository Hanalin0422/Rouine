const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const User = require('../models/User');
const util = require('../util');

// New
router.get('/signup', function(req, res){
    var user = req.flash('user')[0] || {};
    var errors = req.flash('errors')[0] || {};
  res.render('users/signup', { user:user, errors:errors });
});

router.get('/login', function(req, res){
    var username = req.flash('username')[0];
    var errors = req.flash('errors')[0] || {};
    res.render('users/login', { 
        username:username, 
        errors:errors
    });
});

// create
router.post('/', function(req, res , next){
  User.create(req.body, function(err, user){
    if(err){
      req.flash('user', req.body);
      req.flash('errors', util.parseError(err));
      return res.redirect('/users/signup');
    }
    next();
  })},
  function(req, res, next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.username = 'ID를 입력해주세요!';
    }
    if(!req.body.password){
      isValid = false;
      errors.password = '비밀번호를 입력해주세요!';
    }
    if(isValid){
      next();
    }
    else {
      req.flash('errors',errors);
      res.redirect('/');
    }
  },
  passport.authenticate('local-login',{
    successRedirect : '/',
    failureRedirect : '/'
  }
  )
);


//Login 
router.post('/login',
  function(req,res,next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.username = 'ID를 입력해주세요!';
    }
    if(!req.body.password){
      isValid = false;
      errors.password = '비밀번호를 입력해주세요!';
    }
    if(isValid){
      next();
    }
    else {
      req.flash('errors',errors);
      res.redirect('/users/login');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/users/check',
    failureRedirect : '/users/login'
  }
));

router.get('/check', function(req,res){
  if(typeof req.user == "undefined"){
    res.redirect('/users/login');
  }

  if(req.user.right == true){
    res.redirect('/admin/index');
  }
  else{
    res.redirect('/');
  }
})

// Logout // 4
router.get('/logout', function(req, res) {
  req.logout();
  delete req.session.cart;
  res.redirect('/');
});


module.exports = router;

// functions
function parseError(errors){
  var parsed = {};
  if(errors.name == 'ValidationError'){
    for(var name in errors.errors){
      var validationError = errors.errors[name];
      parsed[name] = { message:validationError.message };
    }
  }
  else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'이 아이디는 이미 존재합니다!' };
  }
  else {
    parsed.unhandled = JSON.stringify(errors);
  }
  return parsed;
}

// private functions // 2
function checkPermission(req, res, next){
  User.findOne({username:req.params.username}, function(err, user){
   if(err) return res.json(err);
   if(user.id != req.user.id) return util.noPermission(req, res);

   next();
  });
 }