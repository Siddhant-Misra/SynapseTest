# SynapseTest
```
FILES TO INSTALL
npm install 
npm init
npm install body-parser
npm install express
npm install mongodb
npm install mongoose
npm install synapsenode
```

>`npm start` to run the server. - server starts at `PORT 3000`

FLOW 
 1. Create User - `https://localhost:3000/postuserfi`

Use the payload on `payload.txt` file.  
 . 
Please make sure to add a valid phone number, a proper address that actually exists, a proper entity scope and entity type.

Patch User
Use the payload on payload.txt file. 
Open Postman and use the endpoint of `/<USER_ID>/addsubdocuments".
Please enter a proper UserID. You can get this UserID from the MongoDB database. 
Please make sure to add a valid SSN number.

At this point if a user logsout, they can log back in with a username and a password. 
parameters: email and password
output : {"synapse_user_id": user_id} if successful. Here they can get back their UserID to continue with the application. 

At this point, after the patch call, the user should have the permission of "SEND-AND-RECEIVE".

Now we can create two nodes ACH-US and DEPOSIT-US.

We are simulating a transaction every 30 seconds ONLY AND ONLY IF their user's permission is in the status of "SEND-AND-RECEIVE"
wity a scheduler. 

```
POST USER - 
```
```
payload: 
{
}
```
```
response
1. createUser payload
    {
    "phone_number": "8622858854",
    "legal_names": "payload legalnames1",
    "name": "payload legalnames1",
    "alias": "payload legalnames1", 
    "email": "payload1@email.com",    
    "entity_scope": "Airport",
    "entity_type": "M",
    "ip_address": "::1",
    "day": 1,
    "month": 12,
    "year": 1990,
    "address_street": "304 Harrison Avenue",
	  "address_city":"Harrison",
    "address_subdivision": "NJ",
    "address_postal_code": "07029",
    "address_country_code": "US",
    "password":"IamShrek!2",
    "supp":"testing"
}

2. patch user payload
{
    "SSN": "2222",
    "GOVT_ID": "data/application/bas64"
}

3. createNode payload for ACH-US
{
    bank_id: "synapse_good",
    bank_pw: "test1234",
    bank_name: "fake"
}

4. Login ->  
parameters: email and password
output : {"synapse_user_id": user_id} if successful

5. get all nodes for user 

