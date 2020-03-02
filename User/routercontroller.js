var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js')
var User = require('./user.js');
var patch = require('./userpatch.js');
// var createUser = require('./createuser.js');
var create_node = require('./createnode.js');
var dbo = require('./user.js');

var cron = require('./createtransaction.js');

// starting scheduler to create multiple transactions from ACH accounts to IB-DEPOSIT accounts
console.log("Starting scheduler");
var timer = setInterval(function () {
    console.log('You will see this message every second');
    cron();
}, 30000);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL THE USERS IN SYNAPSE DATABASE
router.get('/getallusers', function (req, res) {
    synapse.SynapseClient.getAllUsers().then(function (result) {
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    });
});

// USER LOGIN
router.get('/userLogin', function (req, res) {
    var usr_id = dbo.find({ "email": req.query.email }, function (err, result) {
        if (result === undefined || result.length == 0) {
            res.status(500).send({ "error": "Could not find user" });
        }
        else {
            var mongoUser = result[0];
            if (mongoUser.password == req.query.password) {
                console.log(mongoUser.synapse_user_id);
                userID = mongoUser.synapse_user_id;
                res.status(200).send({ "synapse_user_id": userID });
            }
            else {
                console.log("Invalid Password");
                res.status(500).send({ "error": "INVALID password" });
            }
        }
    });
});


// RETURN ONE USER FROM SYNAPSE DB WITH A USERID
router.get('/oneuser/:userID', (req, res) => {
    const userID = req.params.userID;
    const fullDehydrate = true;
    console.log(userID);
    synapse.SynapseClient.getUser(userID, fullDehydrate).then(response => {
        console.log("GETONE SUCCESS", response);
        res.json(response);
        //res.send(response);
    }).catch(err => {
        console.log("GETONE USER ERROR");
        res.status(500).json("get user error");
    });
}
);

//GET ALL USER NODES
router.get('/getallnodes', function (req, res) {
    user.getAllUserNodes().then(function (result) {
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    });
});

//CREATE USER WITH BASE DOCS ON SYNAPSEFI
router.post('/postusersfi', function (req, res) {
    payload = req.body;
    const basedocs = {
        logins: [
            {
            email: payload.email,
            password: payload.password
          }
      ],
        phone_numbers: [payload.phone_number],
        legal_names: [payload.legal_names],
        documents: [
                  {   
                      name: payload.name,
                      alias: payload.name, 
                      email: payload.email,    
                      phone_number: payload.phone_number,            
                      entity_scope: payload.entity_scope,
                      entity_type: payload.entity_type,
                      ip: payload.ip_address,
                      day: payload.day,
                      month: payload.month,
                      year: payload.year,
                      address_street: payload.address_street,
                      address_city:payload.address_city,
                      address_subdivision: payload.address_subdivision,
                      address_postal_code: payload.address_postal_code,
                      address_country_code: payload.address_country_code
                  }
              ],
        extra: {
                supp_id: payload.supp,
                cip_tag:1,
                is_business: false
              }
      }; 
    synapse.SynapseClient.createUser(basedocs,payload.ip_address).then(response => {
        // console.log({ "response": response.data, "status_code": response.status });
        console.log(); 
        var id = response.id;
        var address = payload.address_street + " " + payload.address_city + " " +  
                        payload.address_subdivision + " " + payload.address_postal_code + " " + 
                        payload.address_country_code;
        User.create({
            name:  payload.name,
            email: payload.email,
            password: payload.password,
            address: address,
            synapse_user_id: id
        },
            function (err, User) {
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
            });
        res.status(200).send(response.body);
        
    }).catch(err => {
            console.log("Create User Error: ", err);
        });  
    });  

    

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/getallusers', function (req, res) {
    synapse.SynapseClient.getAllUsers().then(function (result) {
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    });
});

// PATCH SUB DOCUMENTS 
router.patch('/:userID/addsubdocuments', function (req, res) {
    var payload = req.body;
    const userID = req.params.userID;
    patch.patchuser(userID, payload);
    res.status(200).send({"response":"Success"});
});


// CREATE A NODE
router.post('/:userID/createnodesfi', function (req, res) {
    console.log(req.body);
    body = req.body;
    const userID = req.params.userID;
    create_node.createnode(userID,body)
    
});

// RETURNS ALL THE Nodes 
router.get('/getallnodes', function (req, res) {
    synapse.SynapseClient.getPlatformNodes().then(function (result) {
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
        }
    });
});

// CREATE TRANSACTIONS
router.post('/createtransaction', function (req, res) {
    console.log(req.body);
    createtransaction.createTransaction(body).then(response => {
        console.log(response);
        response = JSON.stringify(response);
        res.status(200).send(response);
        console.log(response);
    })
        .catch(err => {
            console.log("Create transaction Error: ", err);
            res.status(500).json("create t error");
        });
});

module.exports = router;





