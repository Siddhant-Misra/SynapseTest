const express = require('express');
//var clienta = require('../Synapsecode/client.js');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var synapse = require('../Synapsecode/client.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/createbank', (req, res) => {
  client
    .getUser(req.body._id)
      .then((user) => {
        user
          .createNode({
            type: 'DEPOSIT-US',
            info: {
              nickname: 'Test Checking',
              balance: {
                amount: 100000
              }
            }
          })
          .then(({ data }) => {
            res.send(data);
          })
          .catch(err => console.log("CREATEBANK ERROR", err));
      })
      .catch((err) => {
        console.log('getUser Error', err)
      }) 
})