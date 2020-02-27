const Synapse = require('synapsenode');
const Client = require('./Synapsecode/client.js');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const client = synapse.client;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//create bank account



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