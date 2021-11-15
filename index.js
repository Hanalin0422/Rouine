const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));

// setting
app.set('view engine','ejs'); 
app.set('layout', './layout/full-width');
app.set("layout extractScripts",true);
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routes setting
app.use('/', require('./routes/main'));



// port setting
const port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});