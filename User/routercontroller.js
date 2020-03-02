var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js')
var User = require('./user.js');
var patch = require('./userpatch.js');
var createnode = require('./createnode.js');
var dbo = require('./user.js');

var cron = require('./createtransaction.js');

// starting scheduler to create multiple transactions
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

//CREATE A USER AND STORE VALUES ON MONGODB
router.post('/createmongo', function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
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
router.post('/postusersfi', function (req, res) {
    console.log(req.body);
    console.log();
    synapse.SynapseClient.createUser(payload).then(response => {
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
router.patch('/:user_id/addsubdocuments', function (req, res) {
    var payload = req.body;
    // const user_id = req.params.user_id;
    const userID = "5e58c2d15b5a1e007de0d160";
    patch.patchuser(userID, payload);
    res.status(200).json({ "status": "success" });
    synapse.SynapseClient.getUser(userID).then(function (result) {
        result = result.data;
        try {
            res.status(200).status(result);
        } catch (e) {
            console.log(e);
        }
    })
});


// CREATE A NODE
router.post('/createnodesfi', function (req, res) {
    console.log(req.body);
    createnode.createUser(body).then(response => {
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





