var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js');
var mongocre = require('./functions.js');

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


router.post('/postusers', function(req, res){
    console.log(req.body);
    const info = {
      logins: [
        {
        //   email: [req.body.email],
        //   password: [req.body.password] // req.body.email
          email: "msiddhant22@gmail.com",
          password: "AgeofEmpires!2"
        }
      ],
      phone_numbers: "8622858445",
      legal_names: "Test User",
      documents: [
            {
                name: "sidd",
                email: "some@some.com",
                entity_scope: "M",
                entity_type: "Arts & Entertainment",
                ip: '::1',
                day: 2,
                month: 5,
                year: 1989,
                address_street: '304 Harrison Avenue',
                address_city: 'Harrison',
                address_subdivision: 'NJ',
                address_postal_code: '07029',
                address_country_code: 'US'
                }
          ],
    //   phone_numbers: [req.body.phone_numbers],
    //   legal_names: [req.body.legal_names]
    
    }
    
    synapse.SynapseClient.createUser(info).then(function(info1){
        console.log(info1);
        info1 = JSON.stringify(info);
        info1 = info1.data.users;
        try {
            res.status(200).send(info1);
        } catch(e) {
            console.log(e);
        }
    }).catch(function (e){
        console.log(e.data);
    });
    //   documents: [
    //     {
    //         email: req.body.email,
    //         phone_number: req.body.phoneNumber,
    //         ip: '::1',
    //         day: 2,
    //         month: 5,
    //         year: 1989,
    //         address_street: '944 Market St.',
    //         address_city: 'SF',
    //         address_subdivision: 'CA',
    //         address_postal_code: '94102',
    //         address_country_code: 'US',
    //         }
    //   ],
    //   extra: {
    //     supp_id: "122eddfgbeafrfvbbb",
    //     cip_tag: 1,
    //     is_business: false
    //}
});
// -------------------------- //

// return userid from mongo with getuser and then check if it has subdocuments

// patch sub documents //
router.patch('/addsubdocuments', function(req, res){
    console.log(req.body);
    const info2 = {
        documents: [
            {
              id: "5e56fd15b68b62007279e176",
              virtual_docs: [
                {
                  document_value: "2222",
                  document_type: "SSN"
                }
              ]
            }
          ]
    }
    synapse.SynapseClient.updateUser(info2).then(function(info3){
        console.log(info3);
        info1 = JSON.stringify(info2);
        info1 = info3.data.users;
        try {
            res.status(200).send(info3);
        } catch(e) {
            console.log(e);
        }
    }).catch(function (e){
        console.log(e.data);
    });
});


// to create a node // 
router.post('/createnode', function(req, res){
    console.log(req.body);
    const body = {
        "type": "DEPOSIT-US",
        "info": {
          "nickname": "My Dummy Deposit Account",
          "document_id": "5e4857793c4e280088ee1a8b" //how to get this
    }
}
    
    synapse.SynapseClient.createNode(body).then(function(info1){
        console.log(info1);
        info1 = JSON.stringify(body);
        info1 = info1.data.users;
        try {
            res.status(200).send(info1);
        } catch(e) {
            console.log(e);
        }
    }).catch(function (e){
        console.log(e.data);
    });
});

var fingerprint = 1234;

// router.post('/postUsers', function (req, res) {
    
    
// });

// router.post('/postUsers', (req, res) => {
  
//     var testUserCreate = test.createUser({
//           "logins": [
//             {
//               "email": "test@synapsepay.com"
//             }
//           ],
//           "phone_numbers": [
//             "901.111.1111",
//             "test@synapsepay.com"
//           ],
//           "legal_names": [
//             ""
//           ],
//           "extra": {
//             "supp_id": "122eddfgbeafrfvbbb",
//             "cip_tag":1,
//             "is_business": true
//           }
//         });
//     });


module.exports = router;
// CREATES A NEW USER AND ADDS TO MONGODB
// router.post('/postUsers', function (req, res) {
   
//     var fingerprint = 1234;
//     createmongo(req, fingerprint);
//     // User.create({
//     //         name : req.body.name,
//     //         email : req.body.email,
//     //         password : req.body.password,
//     //         address : req.body.address,
//     //         // synapse_user_id : req.body.synapse // use user_id here
//     //     }, 
//     //     function (err, user) {
//     //         if (err) return res.status(500).send("There was a problem adding the information to the database.");
//     //         res.status(200).send(user);
//     //     });
//     // mongocre.createmongo();
// });

// CREATES A NEW USER AND ADDS TO MONGODB


// //add new user
// router.post('/newuser', (req, res) => {
//     console.log(req.body);
//     const info = {
//       logins: [
//         {
//           email: req.body.email
//         }
//       ],
//       phone_numbers: [req.body.phoneNumber],
//       legal_names: [req.body.name],
//       documents: [
//         {
//             email: req.body.email,
//             phone_number: req.body.phoneNumber,
//             ip: '::1',
//             name: req.body.name,
//             alias: req.body.name,
//             entity_type: 'M',
//             entity_scope: 'Arts & Entertainment',
//             day: 2,
//             month: 5,
//             year: 1989,
//             address_street: '944 Market St.',
//             address_city: 'SF',
//             address_subdivision: 'CA',
//             address_postal_code: '94102',
//             address_country_code: 'US',

// THIS NEEDS TO BE DONE IN ONE PATCH CALL
            // virtual_docs: [
            //   {
            //     document_value: '2222',
            //     document_type: 'SSN'
            //   }
            // ],
            // physical_docs: [
            //   {
            //     document_value: 'data:image/gif;base64,SUQs==',
            //     document_type: 'GOVT_ID'
            //   }
            // ],
// THIS NEEDS TO BE DONE IN ONE PATCH CALL

//             social_docs: [
//               {
//                 document_value: 'https://www.facebook.com/valid',
//                 document_type: 'FACEBOOK'
//               }
//             ]
//           }
//       ],
//       extra: {
//         supp_id: "122eddfgbeafrfvbbb",
//         cip_tag: 1,
//         is_business: false
//       }
//     };
//     client
//       .createUser(info)
//       .then(response => {
//         res.json(response);
//       })
//       .catch(err => {
//         console.log("Create User Error: ", err);
//         res.status(500).json("create user error");
//       });
//   }

// )

// CREATES A NEW USER AND ADDS TO SYNAPSEFI
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


// // testUserCreate.then(function(result) {
// //   console.log(result);
// // });




// router.get('/:id', function (req, res) {   
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//      if (!user) return res.status(404).send("No user found.");
//      res.status(200).send(user) 
//     });
// });


