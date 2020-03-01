const Synapse = require('synapsenode');
const Client = Synapse.Client;
const New_User = Synapse.User;

const client = new Client({
  client_id: "client_id_pTnLwjEimlbugyQI6e7BkodXcJtGvx4fD3sMAWRZ",
  client_secret: "client_secret_BjZvJowtKDqLyxQV1F0lrIpOCN6aiu5Wkb87U4nh",
  fingerprint: "e0a65e2d87df33a88c7a30579776f76a",
  ip_address: "192.168.1.10",
  // isProduction boolean determines if production (true) or sandbox (false) endpoint is used
  isProduction: false  
});



exports.SynapseClient = client;
exports.SynapseUser = New_User;

// module.exports = {
//     test
// };

// var url = 'https://uat-api.synapsefi.com';

//var headers = { 
//    'Content-Type' : 'application/json',
//    'X-SP-GATEWAY' : '{{client_id}}|{{client_secret}}',
//    'X-SP-USER-IP' : '{{ip}}',
//    'X-SP-USER' : '|{{fp}}'
//};

//var users = client.getAllUsers();
// var testUserCreate = test.createUser({
//   "logins": [
//     {
//       "email": "test@synapsepay.com"
//     }
//   ],
//   "phone_numbers": [
//     "901.111.1111",
//     "test@synapsepay.com"
//   ],
//   "legal_names": [
//     ""
//   ],
//   "extra": {
//     "supp_id": "122eddfgbeafrfvbbb",
//     "cip_tag":1,
//     "is_business": true
//   }
// });


// testUserCreate.then(function(result) {
//   console.log(result);
// });

// var testNodeGet = test.getPlatformNodes();
//   testNodeGet.then(function(result) {
//     console.log(result);
//   });