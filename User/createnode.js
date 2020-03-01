
var synapse = require('../Synapsecode/client.js');
var synapse_user_id = "5e58c2d15b5a1e007de0d160";

var test_user = {
    user_id: synapse_user_id,
    fullDehydrate: true
}
// const krypton_node_payload = {
//     "nickname": "My Deposit Account"
// }

const krypton_ach_node_payload = {
    bank_id: "synapse_good",
    bank_pw: "test1234",
    bank_name: "fake"
}

const fullDehydrate = true;
console.log("-----------------------------------------------------------------");

//create 1st node function starts
function createnodeach(user, payload) {
    const ach = {
        type: "ACH-US",
        info: {
            bank_id: payload.bank_id,
            bank_pw: payload.bank_pw,
            bank_name: payload.bank_name
        }
    };
    user.createNode(ach).then(achresponse => {
        console.log({ "response": achresponse.data, "status_code": achresponse.status });
        console.log(achresponse.data.mfa.access_token);
        return achresponse;
    })
        .then(achresponse => {
            user.verifyAchMfa(achresponse.data.mfa.access_token, 'test_answer').then(achCreated => {
                console.log({ "response": achCreated.data, "status_code": achCreated.status });
                console.log(achCreated.data);
            })
        }
        ).catch(err => {
            console.log("Create Node Error: ", err);
        });
}

//create 1st function ends

console.log("------------------------------------------------------------------------------------------------------------------");

//create 2nd node function starts
function createnodedeposit(user, payload) {
    const deposit = {
        type: "IB-DEPOSIT-US",
        info: {
            nickname: "My Deposit Account",
            document_id: user.body.documents[0].id
        }
    };
    user.createNode(deposit).then(response => {
        console.log({ "response": response.data, "status_code": response.status });
        console.log(response.data);
    })
        .catch(err => {
            console.log("Create Node Error: ", err);
        });
}

//create 2nd node function ends

function create_node(userId, payload) {
    synapse.SynapseClient.getUser(userId, fullDehydrate)
        .then(result => {
            return result;  
        }
        )
        .then((result) => {
            createnodeach(result, payload); 
            return result;           
        }
        ).then((result) => {
            createnodedeposit(result);
        });
}

var testing = create_node(synapse_user_id, krypton_ach_node_payload);


module.exports.createnode = create_node;