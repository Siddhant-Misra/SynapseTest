
//var db = require('./user.js');
var synapse = require('../Synapsecode/client.js');

//research how to get suynapse_user_id from mongo 
var synapse_user_id = "5e58c2d15b5a1e007de0d160";

// get all users from synpase
// if send and receive get nodes if success then transaction 
// ille na go create nodes

// then run transaction

function runTransaction(nodes, user) {
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
    user.createTransaction(achNode._id, achtransc).then((response) => {
        console.log(response.data);
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

function transactioncreate(userId) {
    synapse.SynapseClient.getUser(userId)
        .then(user => { return user }
        )
        .then((user) => {
            user.getAllUserNodes().then(function (result) {
                var nodes = result.data.nodes;
                // If no nodes, error
                if (!nodes || nodes.length == 0) {
                    console.log("No nodes for user, please create new nodes ");
                    return;
                }
                else {
                    // Create transaction
                    runTransaction(nodes, user);
                }
            }).catch(err => {
                console.log("Transaction Error: ", err);
            });
        })
}

function cron() {
    // 1. Get all users;
    synapse.SynapseClient.getAllUsers().then(function (result) {
        var users = result.data.users;
        // 2. For each user
        for (var index in users) {
            var user = users[index];
            // 3. Check if permission
            if (user.permission == "SEND-AND-RECEIVE") {
                console.log(user)
                transactioncreate(user._id);
                // 4. Get all user nodes
            } else {
                console.log("User " + index + " with ID " + user._id + "does not have send receive permission");
            }
        }
    });
}

module.exports = cron;

