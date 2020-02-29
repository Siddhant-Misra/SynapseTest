var express = require('express');
var app = express();
var db = require('./db');// ADD THESE TWO LINES
var UserController = require('./user/UserController');

app.use('/', UserController);



app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});




module.exports = app;