/*!
 * Fast Auth
 * Copyright(c) 2018 Alec Johnson | alec_johnson@hotmail.com
 * MIT Licensed
 */

'use strict'

const crypto = require('crypto');
//////////////// Creating Our Token ////////////////
let createToken = function (payload, secret, exp) {
    try {
        // if no expiry is set use default 2.5hrs..
        // Will be checked on authToken against Date.now().
        let expiry = exp ? Date.now() + exp : Date.now() + 9000000,
        // get the date now for issued at.
        date = Date.now(),
        data = `{${payload},
               "iat":${date},
               "exp":${expiry}}`;
        // Convert the payload to base64.
        let base64 = Buffer.from(data).toString('base64');
        // join our base64 encoded payload & the encryption together seperated by an '.'.
        return base64 += '.' + crypto.createHmac('sha256', secret).update(base64).digest('base64');
    } catch (err) {
        return;
    }
}
////////////// Authenticate Our Token //////////////
let authToken = function (token, secret) {
    try {
        // Slice the Bearer out of the token and split it by the '.'
        let check = token.slice(7).split('.'),
        data = check[0],
        enc = check[1],
        // Decode the payload from the split at index 0.
        base64 = Buffer.from(data, 'base64').toString('utf8'),
        // Parse the payload data back to its original form [].
        payload = JSON.parse(base64);
        // var exp = payload["user"]["username"]
        // Here we check if the encryiton matches. Update is sent in base64, this way its easier and smaller to manage.
        if (enc === crypto.createHmac('sha256', secret).update(data).digest('base64')) {
            // Check if the token has expired.
            if (Date.now() > payload['exp'])
                return false;
            else
                // Decode the token and save it in the req.user to pass back.
                return true;
        } else
            return false;
    } catch (err) {
        // If there is a problem with the token throw an error.
        return false;
    }
}
module.exports = {
    createToken: createToken,
    authToken: authToken
};