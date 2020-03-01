
//var db = require('./user.js');
var synapse = require('../Synapsecode/client.js');

//research how to get suynapse_user_id from mongo 
var synapse_user_id = "5e58c2d15b5a1e007de0d160";

// var usr_id = db.findOne( {"synapse_user_id": synapse_user_id} ).toArray(function(err, result) {
//     console.log(result);
// });
// console.log(usr_id);
console.log("-----------------------------------------------------------------");


function viewallnodes(userId) {

    synapse.SynapseClient.getUser(userId)
        .then(result => { return result }
        )
        .then((result) => {
            result.getAllUserNodes().then(response => {
                var nodes = response.data.nodes;
                console.log(nodes);
                var achNode;
                var depNode;
                nodes.forEach(node => {
                    if (node.type == 'ACH-US') {
                        if (!achNode) {
                            achNode = node;
                        }
                    }
                    if (node.type == 'IB-DEPOSIT-US') {
                        if (!depNode) {
                            depNode = node;
                        }
                    }
                });
                const achtransc = {
                    to: {
                        type: depNode.type,
                        id: depNode._id,
                    },
                    amount: {
                        amount: 100.1,
                        currency: "USD"
                    },
                    extra: {
                        ip: "127.0.0.1",
                        note: "Test transaction"
                    }
                };
                result.createTransaction(achNode._id, achtransc).then((response) => {
                    console.log(response.data);
                    return response;
                })
            }
            ).catch(err => {
                console.log("Transaction Error: ", err);
            });
        })
}


console.log("-----------------------------------------------------------------");

viewallnodes(synapse_user_id);

// function createachtransaction(user, payload) {
//     const achtransc = {
//             to: {
//                 type: payload.type,
//                 id: user.body.nodes[0].id,
//             },
//             amount: {
//                 amount: 100.1,
//                 currency: "USD"
//             },
//             extra: {
//                 ip: "127.0.0.1",
//                 note: "Test transaction"
//             }        
//     };
//     user.createTransaction(node_id, achtransc).then(response => {
//         console.log({ "response": response.data, "status_code": response.status });
//         console.log(response.data);
//     })
//         .catch(err => {
//             console.log("Transaction Error: ", err);
//         });
// }

// function transactioncreate(userId, payload) {
//     synapse.SynapseClient.getUser(userId, fullDehydrate)
//         .then(result => { return result }
//         )
//         .then((result) => {
//             createachtransaction(result, payload);            
//         }
//     );
// }

// var testing = transactioncreate(synapse_user_id, transaction_payload);



