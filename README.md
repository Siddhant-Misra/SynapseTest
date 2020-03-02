# SynapseTest

### FILES TO INSTALL
```
npm install 
npm init
npm install body-parser
npm install express
npm install mongodb
npm install mongoose
npm install synapsenode
```

>`npm start` to run the server. - server starts at `PORT 3000`

### FLOW 
 1. Create User - `https://localhost:3000/postuserfi`

> Sample Payload:

```
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
```
> Sample Response:
```
{
    "_id": "5e5ccbb1c256c300730d861e",
    "_links": {
        "self": {
            "href": "https://uat-api.synapsefi.com/v3.1/users/5e5ccbb1c256c300730d861e"
        }
    },
    "account_closure_date": null,
    "client": {
        "id": "5e484d83cb3cd400528c2edb",
        "name": "Siddhant Misra"
    },
    "documents": [
        {
            "entity_scope": "Airport",
            "entity_type": "M",
            "id": "4ff1d6a246520fb452c8a6bd9d342fa118db835f5a5ee7f35df3a1912109621c",
            "id_score": null,
            "is_active": true,
            "name": "payload legalname1s",
            "permission_scope": "UNVERIFIED",
            "physical_docs": [],
            "required_edd_docs": [],
            "social_docs": [
                {
                    "document_type": "EMAIL",
                    "id": "6f6337ab8e67de3c865de94d6108aba7fa93d4d602910451bf617d5ee6a7ec4c",
                    "last_updated": 1583139759192,
                    "status": "SUBMITTED|REVIEWING"
                },
                {
                    "document_type": "IP",
                    "id": "28d9177b22c127d9a51d8903893864accf6e553ac326704a4c0d585eaad2516a",
                    "last_updated": 1583139759233,
                    "status": "SUBMITTED|REVIEWING"
                },
                {
                    "document_type": "DATE",
                    "id": "e31324e577afaa98b6884b0f68ed19110f2957b02f8799c18834f4d83fc92c4e",
                    "last_updated": 1583139759269,
                    "status": "SUBMITTED|REVIEWING"
                },
                {
                    "document_type": "ADDRESS",
                    "id": "29bdeb357ac3df135623d25092466307bdd1d764f370684098e80c7bfccb77f9",
                    "last_updated": 1583139759259,
                    "status": "SUBMITTED|REVIEWING"
                },
                {
                    "document_type": "PHONE_NUMBER",
                    "id": "3c545f89ce4526eaa44ee7d76fb238eaf3025b0edc853a112b06f44ad42eda0d",
                    "last_updated": 1583139759203,
                    "status": "SUBMITTED|REVIEWING"
                }
            ],
            "virtual_docs": [],
            "watchlists": "PENDING"
        }
    ],
    "emails": [],
    "extra": {
        "cip_tag": 1,
        "date_joined": 1583139757987,
        "extra_security": false,
        "is_business": false,
        "is_trusted": false,
        "last_updated": 1583139757987,
        "public_note": null,
        "supp_id": "testing"
    },
    "flag": "NOT-FLAGGED",
    "flag_code": null,
    "is_hidden": false,
    "legal_names": [
        "payload legalname1s"
    ],
    "logins": [
        {
            "email": "payloa1d@email.com",
            "scope": "READ_AND_WRITE"
        }
    ],
    "permission": "UNVERIFIED",
    "permission_code": null,
    "phone_numbers": [
        "8622858854"
    ],
    "photos": [],
    "refresh_token": "refresh_ZK50HAJO9gUlmG7rVjLp3su18okMItc6dSyfx2NF",
    "watchlists": "PENDING"
}
```
> Link to Screenshot From `uat-dashboard.synapsefi.com`  
<a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/synapseusers.png" target="_blank">CREATE USER</a>



2. Patch User  - `https://localhost:3000/<USER-ID>/addsubdocuments`

> Sample Payload:

```
{
    "SSN": "2222",
    "GOVT_ID": "data/application/bas64"
}
```
> Sample Response:
```
{
    "response": "Success"
}
```
> Link to Screenshot From `uat-dashboard.synapsefi.com`  
<a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/patchuser.png" target="_blank">PATCH USERS</a>

3. Create a Node - `https://localhost:3000/<USER-ID>/createnodesfi`

> Sample Payload:

```
{
    bank_id: "synapse_good",
    bank_pw: "test1234",
    bank_name: "fake"
}
```
> Sample Response:
```
{
    "response": "Success"
}
```
> Link to Screenshot From `uat-dashboard.synapsefi.com`  
<a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/create2nodes.png" target="_blank">CREATE 2 NODES</a>


4. Login(Get) - `https://localhost:3000/userLogin`

> Sample Parameters:

```
?email=payloa1d@email.com&password=IamShrek!2
```
> Sample Response:
```
{
    "synapse_user_id": "5e5ccbb1c256c300730d861e"
}
```
> Link to Screenshot from POSTMAN <br>
<a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/loginauthentication.png" target="_blank">LOGIN AUTHENTICATION</a>



5. Get User/id
> Link to Screenshot from POSTMAN<br><a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/getbyid.png" target="_blank"> GET BY ID SCREENSHOT</a>

6. Simulating a CRON job from send and receive 
> Link to Screenshot from POSTMAN<br><a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/transaction.png" target="_blank"> TRANSACTION SCREENSHOT</a>



> Process of Savings Application:

```
This API takes Money from the ACH account once a month - right now the default amount is about 100.1 $ but in the future development of this application we could create dynamic values.

This simulates a transaction every 30 seconds ONLY AND ONLY if the user's permission is in the status of "SEND-AND-RECEIVE" and skips for the others.
To save time, I have assumed that every 30 seconds is 30 days. We pull a small amount of money from an ACH-US ndoe to a IB-DEPOSIT-US node. 

This will allow the user to save money every 30 days (in my scheduler, 30 seconds).

To see this simulation, start the server and wait for 30 seconds - then you can see the Transactions.
```

FLOW DIAGRAM
<a href= "https://github.com/Siddhant-Misra/SynapseTest/blob/master/Screenshots/FLOW.png" target="_blank"> FLOW DIAGRAM</a>