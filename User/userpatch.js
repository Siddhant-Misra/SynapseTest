//RENAME THIS TO patchuser.js

var synapse = require('../Synapsecode/client.js');

//research how to get suynapse_user_id from mongo 
var synapse_user_id = "5e58c2d15b5a1e007de0d160";

var test_user = {
    user_id: synapse_user_id,
    fullDehydrate: true
}
const krypton_update_payload = {
    "SSN": "2222",
    "GOVT_ID": "data:image/gif;base64,SUQs=="
}

const fullDehydrate = true;

//update user function starts

function patchUser(userId, payload) {
    synapse.SynapseClient.getUser(userId, fullDehydrate).then(user => { return user 
    }).then((user) => {
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
                console.log(response);     
            }).catch(err => {
                    console.log("Patch User Error: ", err);
                }); 
        }).catch(err => {
            console.log("test User Error: ", err.response);
        }); 
}


// var testuser =  patchingUser(synapse_user_id, krypton_update_payload);
// console.log(testuser);

module.exports.patchuser = patchUser;

//update user function ends





