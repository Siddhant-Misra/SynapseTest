var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js')
var User = require('./user.js');
//var newuser = require('./synapsenode/User.js');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// -------------------------- //
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/getallusers', function(req, res){
    synapse.SynapseClient.getAllUsers().then(function(result){
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch(e) {
            console.log(e);
        }
    });
});

router.get('/oneuser/:userID', (req, res) => {   
    const userID = req.params.userID;
    // const user_id = '5e548ff4b68b62007279e00a';
    const fullDehydrate = true;
    console.log(userID);
    synapse.SynapseClient.getUser(userID, fullDehydrate).then(response => {  
        console.log("GETONE SUCCESS",response);
        res.json(response);
        //res.send(response);
    }).catch(err => {
        console.log("GETONE USER ERROR");
        res.status(500).json("get user error");
        });
    }
)



// RETURNS ALL THE Nodes IN THE DATABASE
router.get('/getallnodes', function(req, res){
    
    synapse.SynapseClient.getPlatformNodes().then(function(result){
        result = result.data.users;
        result = JSON.stringify(result);
        try {
            res.status(200).send(result);
        } catch(e) {
            console.log(e);
        }
    });
});

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

router.post('/createmongo', function (req, res) {    
    User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    address: req.body.address,  
    fingerprint: req.body.fingerprint,
    synapse_user_id: req.body.synapse_user_id
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
});

//CREATE USER WITH BASE DOCS ON SYNAPSEFI
router.post('/postusersfi', function(req, res){
    console.log(req.body);
    console.log();
    const info = {
      logins: [
          {
          email: req.body.email,
          password: req.body.password
        }
    ],
      phone_numbers: [req.body.phone_numbers],
      legal_names: [req.body.legal_names],
      documents: [
                {   
                    name: req.body.name,
                    alias: req.body.name, 
                    email: req.body.email,    
                    phone_number: req.body.phone_number,            
                    entity_scope: req.body.entity_scope,
                    entity_type: req.body.entity_type,
                    ip: req.body.ip,
                    day: req.body.day,
                    month: req.body.month,
                    year: req.body.year,
                    address_street: req.body.address_street,
                    address_city: req.body.address_city,
                    address_subdivision: req.body.address_subdivision,
                    address_postal_code: req.body.address_postal_code,
                    address_country_code: req.body.address_country_code
                }
            ]
    }; 
    synapse.SynapseClient.createUser(info).then(response => {        
        console.log(response);

        response = response.body;
        // var user_id = response.body._id;
        // var new_address = info.address_street + " " + info.address_city
        // User.create({
        //     name : req.body.name,
        //     email : req.body.email,
        //     password : req.body.password,
        //     address: info.new_address,  
        //     fingerprint: req.body.fingerprint,
        //     synapse_user_id: user_id
        //},
        // synapse.SynapseClient.getUser(response.id).then(responseUser => {  
        //     console.log(responseUser);
        //     res.send(responseUser);
        // });
        response = response.documents[0]["id"];
        response = JSON.stringify(response);
        res.status(200).send(response);
        console.log(response);
        
    })
    .catch(err => {
        console.log("Create User Error: ", err);
        res.status(500).json("create user error");
    });
});

// patch sub documents //
router.patch('/addsubdocuments', function(req, res){
    // req.body.user
    console.log(req.body);
    const docs = {
        documents: [
            {
              id: req.body.id,
              virtual_docs: [
                {
                  document_value: req.body.document_value,
                  document_type: req.body.document_type
                }
              ]
            }
          ]
    };
   synapse.New_User.updateUser(docs).then(response => {             
        response = JSON.stringify(response);
        console.log(response);
        res.status(200).send(response);        
    })
    .catch(err => {
        console.log("Create User Error: ", err);
        res.status(500).json("create user error");
    });
});


// to create a node // 
router.post('/createnodesfi', function(req, res){
    console.log(req.body);
    console.log();
    const body = {
        type: "DEPOSIT-US",
        info: {
          "nickname": "My Dummy Deposit Account",
          "document_id": "5e4857793c4e280088ee1a8b" //how to get this
    }
}; 
    synapse.SynapseClient.createUser(body).then(response => {        
        console.log(response);
        response = JSON.stringify(response);
        res.status(200).send(response);
        console.log(response);
        
    })
    .catch(err => {
        console.log("Create User Error: ", err);
        res.status(500).json("create user error");
    });
});

//for node creation
router.post('/createnode', function(req, res){
    console.log(req.body);
    const body = {
        "type": "DEPOSIT-US",
        "info": {
          "nickname": "My Dummy Deposit Account",
          "document_id": "5e4857793c4e280088ee1a8b" //how to get this
    }
};    
    synapse.SynapseClient.createNode(body).then(response => {        
        console.log(response);
        response = JSON.stringify(response);
        res.status(200).send(response);
        console.log(response);

    })
    .catch(err => {
        console.log("Create User Error: ", err);
        res.status(500).json("create user error");
    });
});

var fingerprint = 1234;


module.exports = router;


// CREATES A NEW USER AND ADDS TO MONGODB




