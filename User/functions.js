// The essence of this function.js is to create a payload so we can check the userid from the mongodb db and 
// the synapse db. This would happen after the post of creation. After all this happens then we let them add 
// base documents using a patch call. 

const express = require('express');
//var clienta = require('../Synapsecode/client.js');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

var fingerprint = 1234;
exports.createmongo = async(req, res, fingerprint) => { 
    const createPayLoad = {
            logins: [
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    fingerprint: fingerprint,
                    read_only: false
                }
            ],
            phone_numbers: [req.body.phone_numbers],
            legal_names: [req.body.legal_names],
            extra: {
                note: 'Personal User',
            }
        }; 
    return createPayLoad;
    
};




// router.post('/createUser', (req, res) => {
// //var id = req.params.id;
// var o_id = new mongoDB.ObjectID(id);
// console.log('id: ' + id);
//not able to figure out how to fingerprint

// function(createmongo) {
// const createPayLoad = {
//         logins: [
//             {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//                 fingerprint: 1234,
//                 read_only: false,
//             },
//         ],
//         phone_numbers: [req.body.phone_numbers],
//         legal_names: [req.body.legal_names],
//         extra: {
//             note: 'Personal User',
//         },
//     };
// });
// }

//     var testUserCreate = test.createUser({
//     "logins": [
//     {
//         "email": "test@synapsepay.com"
//     }
//     ],
//     "phone_numbers": [
//     "901.111.1111",
//     "test@synapsepay.com"
//     ],
//     "legal_names": [
//     ""
//     ],
//     "extra": {
//     "supp_id": "122eddfgbeafrfvbbb",
//     "cip_tag":1,
//     "is_business": true
//     }
//     });

// // clienta
// //     .createUser(createPayLoad)
// //     .then(response => {
// //         res.json(response);
// //         response = JSON.stringify(response);
// //         console.log(response);
// //         try {
// //             res.status(200).send(result);
// //         } catch (e) {
// //             console.log(e);
// //         }
// //     })
// //     .catch(err => {
// //         console.log("Create User Error: ", err);
// //         res.status(500).json("create user error");
// //         console.log(o_id);
// //         console.log(createPayload);
// //         console.log('2');
// //     });
// });

// function some_user(payload) {
//     await clienta.createUser(payload);
    
//     if createPayLoad.response == 200:
//         var some = clienta.getuserID(response.json());  
//         //details add tatti, fingerprint
//         payload = Object(details)

//         create mongo_object(payload)
        
//     else:
//         failed user creation on synapse
// }



// console.log(createPayLoad);



// module.exports = router;

// function mongo_object(payload){
//   var something = defaultObjectMongo //mongo object ID
//   fuckit.username = payload.username
// }

// generate fingerprint():
//     return random_number
//     //use random js lib here to generate random number

// create some_user(payload):
//     fingerprint = generate fingerprint():
//     await create synapse user // add fingerprint here

//     if response == 200:
//         var some = getuserID(response.json())  
//         //details add tatti, fingerprint
//         payload = Object(details)

//         create mongo_object(payload)
        
//     else:
//         failed user creation on synapse


//     return response.json()



// patch tatti_user(user_id, payload):
//     user = getUser(user_id)
//     check payload
//     response = userPatch(payload)
//     if response == 200:
//         return response.json()
//     else:
//         fuck off
    

// // This is some code i pulled off on some REST API transactions that I was working on a different project. 
// // this is to just maybe help you how to structure it with validation per call. 
// // I tried doing it by req.body.id and get params.body.id and both just seemed wrong. 

// // if(err.name === 'ValidationError') {
// //     const messages = Object.values(err.errors).map(val => val.message);

// //     return res.status(400).json({
// //       success: false,
// //       error: messages
// //     });
// //   } else {
// //     return res.status(500).json({
// //       success: false,
// //       error: 'Server Error'
// //     });
// //   }

