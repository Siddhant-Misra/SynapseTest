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

```
> Screenshot From `uat-dashboard.synapsefi.com`
```

```

2. Patch - `https://localhost:3000/<USER-ID>/addsubdocuments`

> Sample Payload:

```
{
    "SSN": "2222",
    "GOVT_ID": "data/application/bas64"
}
```
> Sample Response:
```

```
> Screenshot From `uat-dashboard.synapsefi.com`
```

```
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

```
> Screenshot From `uat-dashboard.synapsefi.com`
```

```


At this point if a user logs out, they can log back in with a username and a password. 
parameters: email and password
output : {"synapse_user_id": user_id} if successful. 

Here they can get back their UserID to continue with the application. 

At this point, after the patch call, the user should have the permission of "SEND-AND-RECEIVE".

We are simulating a transaction every 30 seconds ONLY AND ONLY IF their user's permission is in the status of "SEND-AND-RECEIVE"
with a scheduler. 
