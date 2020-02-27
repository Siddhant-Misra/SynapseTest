// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  address: String,  
  fingerprint: String,
  synapse_user_id: String

});

var subdocuments = new mongoose.Schema({
  SSN: String, 
  TIN: String,
});

mongoose.model('User', UserSchema);
mongoose.model('Docs', subdocuments);

module.exports = mongoose.model('User');
module.exports = mongoose.model('Docs');