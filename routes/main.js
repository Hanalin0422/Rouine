const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    res.render('main/index');
});

router.get('/generic', function(req, res){
    res.render('main/generic');
});

router.get('/landing', function(req, res){
    res.render('main/landing');
});

router.get('/elements', function(req, res){
    res.render('main/elements');
});
    

module.exports = router;