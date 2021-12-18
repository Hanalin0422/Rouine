const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const flash = require('connect-flash');
const util = require('./util');

//DB setting
mongoose.set('autoIndex', true);
mongoose.connect('mongodb+srv://hyunju:webproject2021@cluster0.ry9ap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => console.log('Successfully connected to mongodb!'))
  .catch(e => console.error(e));


app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));

// Passport
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  next();
});


// setting
app.set('view engine','ejs'); 
app.set('layout', './layout/full-width');
app.set("layout extractScripts",true);
app.use(expressLayouts);

// routes setting
app.use('/', require('./routes/main'));
app.use('/users', require('./routes/users'));
app.use('/boards', require('./routes/boards'));


// port setting
const port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});