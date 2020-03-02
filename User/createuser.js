
//var db = require('./user.js');
var synapse = require('../Synapsecode/client.js');

var synapse_user_id = "5e58c2d15b5a1e007de0d160";

// var usr_id = db.findOne( {"synapse_user_id": synapse_user_id} ).toArray(function(err, result) {
//     console.log(result);
// });
// console.log(usr_id);

var test_user = {
    user_id: synapse_user_id,
    fullDehydrate: true
}
const krypton_create_payload = {
    "phone_numbers": [payload.phone_numbers],
    "legal_names": [payload.legal_names],
    "name": payload.name,
    "alias": payload.name, 
    "email": payload.email,    
    "phone_number": payload.phone_number,            
    "entity_scope": payload.entity_scope,
    "entity_type": payload.entity_type,
    "ip": payload.ip,
    "day": payload.day,
    "month": payload.month,
    "year": payload.year,
    "address_street": payload.address_street,
    "address_city":payload.address_city,
    "address_subdivision": payload.address_subdivision,
    "address_postal_code": payload.address_postal_code,
    "address_country_code": payload.address_country_code
}

const fullDehydrate = true;

console.log("-----------------------------------------------------------------");

//create user function starts
function createaUser(user, payload) {
    const basedocs = {
        logins: [
            {
            email: user.email,
            password: user.password
          }
      ],
        phone_numbers: [payload.phone_numbers],
        legal_names: [payload.legal_names],
        documents: [
                  {   
                      name: payload.name,
                      alias: payload.name, 
                      email: payload.email,    
                      phone_number: payload.phone_number,            
                      entity_scope: payload.entity_scope,
                      entity_type: payload.entity_type,
                      ip: payload.ip,
                      day: payload.day,
                      month: payload.month,
                      year: payload.year,
                      address_street: payload.address_street,
                      address_city:payaddress_city,
                      address_subdivision: payload.address_subdivision,
                      address_postal_code: payload.address_postal_code,
                      address_country_code: payload.address_country_code
                  }
              ]
      }; 
    synapse.SynapseClient.createUser(basedocs,payload).then(response => {
        // console.log({ "response": response.data, "status_code": response.status });
        console.log(response.data);       
    }).catch(err => {
            console.log("Create User Error: ", err);
        });    
}

module.exports = createaUser;


// function patchUser(userId, payload) {
//     synapse.SynapseClient.getUser(userId, fullDehydrate)
//         .then(result => { return result }
//         )
//         .then((result) => {
//             var testuser = createUser(result, payload);
//             console.log("-----------------------------------2--------------",testuser);
//         }
//         );
// }


// var testuser =  patchUser(synapse_user_id, krypton_update_payload);
// console.log(testuser);

module.exports.patchuser = patchUser;

//update user function ends

console.log("-----------------------------------------------------------------");



