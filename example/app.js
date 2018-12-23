// Please use this to require fastauth ensure it is installed using npm i fastauth --save
// const auth = require('fastauth');
// For demo purposes only....
const auth = require('../index');

////////////////////////////////////
//////// Creating the Token ////////
////////////////////////////////////
let secret = '3748238949jkfndkcvniwe733' // Please use a secure secret.
userID = '1',
userName = 'AdminTest',
email = 'admin@test.com',
custom = 'custom',
expiry = 3000000,

// Create a payload and add information to our token that we wish to use later.
// Change the payload depending on the information you wish to store inside the token.
payload = `
    "user": {
        "_id":"${userID}",
        "username":"${userName}",
        "email":"${email}",
        "custom":"${custom}"
    }`;
// Now we create the token by passing the payload and secret and the expiry.
// If no expiry is passed the default will be used 9000000 2.5hrs.
let token = auth.createToken(payload, secret, expiry);
console.log(`Your token has been created: Bearer ${token}`);

console.log('Now checking sending the token to be authorised');

////////////////////////////////////
////// Authorizing the Token. //////
////////////////////////////////////
// Replicate a headers request with the authorasaiton token in. You would use something like.
// let token = req.headers['authorization'];
let checkToken = `Bearer ${token}`,

// Now we check if the token is valid.
goodToken = auth.authToken(checkToken, secret);
// If isAuth...
if(goodToken)
    console.log(`You're token is valid! Data: ${token}`);
else
    console.log(`Invalid Token!`);



////////////////////////////////////
///// Testing an Altered Token /////
////////////////////////////////////
// This token has been aletered so it will come back as invalid.
let checkBadToken = `Bearer k${token}`,
// Now we check if the token is valid.
badToken = auth.authToken(checkBadToken, secret);
// If isAuth...
if(badToken)
    console.log(`You're token is valid! Data: ${token}`);
else
    console.log(`The 2nd token is Invalid! Tampering detected!`);