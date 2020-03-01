var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js')
var User = require('./user.js');
var sample = require('./sample.js');
var createnode = require('./createnode.js');



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
)

//GET ALL USER NODES
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

// RETURNS ALL THE Nodes 
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

//RETURN ALL THE users 
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
    createaUser.createUser(payload).then(response => {        
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

// patch sub documents //
router.post('/:user_id/addsubdocuments', function(req, res){
    var payload = req.body;
   // const user_id = req.params.user_id;
    const userID = "5e58c2d15b5a1e007de0d160";
    sample.patchuser(userID, payload);
    res.status(200).json({"status":"success"});
});


// to create a node // 
router.post('/createnodesfi', function(req, res){
    console.log(req.body);
    createanode.createUser(body).then(response => {        
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


module.exports = router;





