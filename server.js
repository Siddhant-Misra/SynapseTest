var app = require('./app');
const hostname = '127.0.0.1';
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// // for when you do bring in everything from the synapse folder // const synapse = require("./synapse.js");
// const app = require('./app');

// const hostname = '127.0.0.1';

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api/users", (req, res) => {
//   synapse.getUser().then(function(result) {
//     res.json(result.body.legal_names[0]);
//   });
// });
// app.post("/api/messages", (req, res) => {
//   synapse.getMessage(req.body.question).then(function(result) {
//     res.json(result);
//   });
// });
// const port = 5000;

// app.listen(port, () => console.log(`Server running on port ${port}`));