var express = require('express');
var app = express();
var db = require('./db');
var UserController = require('./user/UserController');
var sample = require('./User/sample.js');

app.use('/', UserController);


//app.post("/:user_id/subdocuments", UserController);
//createnode

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });




module.exports = app;