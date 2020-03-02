var express = require('express');
var app = express();
var db = require('./db');
var routercontroller = require('./user/routercontroller');
app.use('/', routercontroller);

app.post('/createuser', routercontroller);

//app.get user? - makes no sense you're doing this there already'

app.patch("/:user_id/subdocuments", routercontroller);
app.post('/createnode', routercontroller);
app.post('/createtransaction', routercontroller);

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;