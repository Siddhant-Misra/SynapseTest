var dbo = require('./user.js');

// search via email and get email'id's user
//var dbo = db.db("synapsefi");

var usr_id = dbo.findOne( {"synapse_user_id": synapse_user_id} , function(err, result) {
    console.log(result);
});
console.log(usr_id );
