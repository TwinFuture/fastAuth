# Fast Auth
# A simple yet fast Token Authorization / Authentication method. No need for bulky modules
This module is lightwight and simply gets straight to the point of creating and authorizing tokens with expiry built in.

## Main functions & Features

| Features | Description |
| ------------------------------- | ------------------------- |
| `createToken(payload,secret)` | This simply encodes our payload \*data* to base 64 and signs the token using hmac sha256 for productive security 2018* |
| `authToken(token, secret)` | This will check the token is valid and that the data has not been tampered with. |
| `expiry` default `9000000` 2.5hrs | You can set your own expiry by using `createToken(payload,secret,expiry)` |
| Authorization: Bearer | This currently works using tokens that contain Bearer, see examples to add this so it will also parse your token if not. |

## Requires
- Tested on Node.js v10.14+.
- Uses crypto for the hmac sha256 token signing.

## Installation
Install using NPM
```
npm i fastauth --save
```
### Test example using
Make sure you are inside the fastauth directory and use
```
node example/app.js
```
# Example Usage
## Creating a token
```js
// Require our module.
const auth = require('fastauth');

let secret = '3748238949jkfndkcvniwe733' // Please use a secure secret.
userID = '1',
userName = 'AdminTest',
email = 'admin@test.com',
custom = 'custom',
expiry = 3000000,

payload = `
    "user": {
        "_id":"${userID}",
        "username":"${userName}",
        "email":"${email}",
        "custom":"${custom}"
    }`;
let token = auth.createToken(payload, secret);
console.log(`Your token has been created: Bearer ${token}`);
```
## Sample output

### PAYLOAD IN BASE64 SEPREATED BY . WHICH IS THE SIGNATURE
`ewogICAgInVzZXIiOiB7CiAgICAgICAgIl9pZCI6IjEiLAogICAgICAgICJ1c2VybmFtZSI6IkFkbWluVGVzdCIsCiAgICAgICAgImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLAogICAgICAgICJjdXN0b20iOiJjdXN0b20iCiAgICB9LCJpYXQiOjE1NDQ3OTU3NTY5MjYsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICJleHAiOjE1NDQ3OTg3NTY5MjYKICAgICAgICB9.Hwv18Lpc7QSd/RVROVbWhIMnVDmsB+uPsepeLjbycTE=`

## Authenticating a token
```js
// Require our module.
const auth = require('fastauth');

let token = req.headers['authorization']; // OR
// If the token has does not have Bearer use
let token = `Bearer ${token from req}`;

let isAuth = auth.authToken(checkToken, secret);
// If isAuth...
if(isAuth)
    // Do stuff after the token has been verified.
    console.log(`You're token is valid! Data: ${token}`);
else
    // Invalid token.
    console.log(`Invalid Token!`);
```
## Updates
v1.0.4 -- This is the first stable release.
## To do
Possibly improve some of the code
Improve the readme / doc, to better undersand the function.
## Feedback
Feedback and improvments are always appreciated and help us to improve so please leave some!
## License
Licensed under MIT.
