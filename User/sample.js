//RENAME THIS TO patchuser.js

//var db = require('./user.js');
var synapse = require('../Synapsecode/client.js');

//research how to get suynapse_user_id from mongo 
var synapse_user_id = "5e58c2d15b5a1e007de0d160";

// var usr_id = db.findOne( {"synapse_user_id": synapse_user_id} ).toArray(function(err, result) {
//     console.log(result);
// });
// console.log(usr_id);

var test_user = {
    user_id: synapse_user_id,
    fullDehydrate: true
}
const krypton_update_payload = {
    "SSN": "2222",
    "GOVT_ID": "data/application/bas64"
}

const fullDehydrate = true;

console.log("-----------------------------------------------------------------");
//update user function starts
function updateUser(user, payload) {
    const docs = {
        documents: [
            {
                id: user.body.documents[0].id,
                virtual_docs: [
                    {
                        document_value: payload.SSN,
                        document_type: "SSN"
                    }
                ],
                physical_docs: [
                    {
                      document_value: payload.GOVT_ID,
                      document_type: "GOVT_ID"
                    }
                ]
            }
        ]
    };
    user.updateUser(docs).then(response => {
        // console.log({ "response": response.data, "status_code": response.status });
        console.log(response.data);
        
        
    }).catch(err => {
            console.log("Create User Error: ", err);
        });
    
}

function patchUser(userId, payload) {
    synapse.SynapseClient.getUser(userId, fullDehydrate)
        .then(result => { return result }
        )
        .then((result) => {
            var testuser = updateUser(result, payload);
            console.log("-----------------------------------2--------------",testuser);
        }
        );
}


// var testuser =  patchUser(synapse_user_id, krypton_update_payload);
// console.log(testuser);

module.exports.patchuser = patchUser;

//update user function ends

console.log("-----------------------------------------------------------------");



