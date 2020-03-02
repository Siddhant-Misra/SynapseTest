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
