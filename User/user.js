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

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

//{"user_id":asdf df ,  "fingerprint": sdfasdf, "stats":{"bank_balance":12312, "income": 0-7000, "expenditure": 0-7000}}
// if exp > income - dont pull money; if bank_balance > 3000: 500 extra