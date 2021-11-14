const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');



app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));

// setting
app.set('view engine','ejs'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// routes setting
app.use('/', require('./routes/main'));



// port setting
const port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});